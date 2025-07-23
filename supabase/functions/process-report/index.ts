import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.51.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

serve(async (req) => {
  console.log('Process Report function called', { method: req.method, url: req.url });
  
  if (req.method === 'OPTIONS') {
    console.log('Handling OPTIONS request');
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Processing report request...');
    const requestBody = await req.text();
    console.log('Request body received:', requestBody?.substring(0, 200));
    
    const { reportData, language } = JSON.parse(requestBody);
    console.log('Parsed report data:', { language, reportDataKeys: Object.keys(reportData || {}) });
    
    if (!openAIApiKey) {
      console.error('OpenAI API key not found');
      throw new Error('OpenAI API key not configured');
    }
    
    const supabase = createClient(supabaseUrl, supabaseKey);
    console.log('Supabase client created');

    // AI processing prompts for different languages
    const processingPrompts = {
      en: "You are processing a sensitive report about gender-based violence. Rewrite this report in a clear, compassionate, and professional tone while preserving all important details. Remove any identifying information. Make it suitable for support services to understand the situation and provide appropriate help. Keep the same language.",
      yo: "O n ṣiṣẹ jakejado ti o ro mọ iwa-ipa ti o da lori ako-abo. Tun kọ ijabọ yii ni ọna ti o han, ti o ni ifeme, ati ti alamọdaju lakoko ti o n pa gbogbo awon alaye pataki mọ. Yọ eyikeyi alaye idanimọ kuro. Jẹ ki o yẹ fun awon iṣẹ atilẹyin lati ni oye ipo naa ki o si pese iranlọwọ ti o yẹ.",
      ha: "Kana sarrafa rahoto mai mahimmanci game da tashin hankalin da aka yi saboda jinsi. Ka sake rubuta wannan rahoto a cikin bayani mai saukakawa, mai tausayi, da na sana'a yayin da kake adana duk muhimman bayanai. Ka cire duk wani bayani mai ganewar mutum. Ka yi shi ya dace da ayyukan tallafi don fahimtar yanayin da kuma ba da tallafi da ya dace.",
      ig: "Ị na-edozi akụkọ dị mkpa gbasara ime ihe ike dabere na nwoke na nwanyị. Degharịa akụkọ a n'ụzọ doro anya, nwere ọmịiko, na ọkachamara ebe ị na-echekwa nkọwa niile dị mkpa. Wepu ozi ọ bụla na-achọpụta onye. Mee ka ọ kwesị maka ọrụ nkwado iji ghọta ọnọdụ ahụ ma nye enyemaka kwesịrị ekwesị.",
      pcm: "You dey process one important report about gender violence. Rewrite dis report for clear, kind, and professional way while you keep all important details. Remove any information wey fit identify person. Make am good for support services to understand the situation and give proper help."
    };

    const prompt = processingPrompts[language as keyof typeof processingPrompts] || processingPrompts.en;
    console.log('Using processing prompt for language:', language);

    // Combine report data into a cohesive narrative
    const rawReport = `
Incident Type: ${reportData?.incident_type || 'Not specified'}
Date: ${reportData?.incident_date || 'Not specified'}
Time: ${reportData?.incident_time || 'Not specified'}
Location: ${reportData?.location_state || ''} ${reportData?.location_details || ''}
Relationship to perpetrator: ${reportData?.perpetrator_relationship || 'Not specified'}
Description: ${reportData?.description || ''}
    `.trim();

    console.log('Raw report prepared, making OpenAI API call...');

    // Try OpenAI API first, fallback to basic processing if quota exceeded
    let processedSummary;
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${openAIApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            { 
              role: 'system', 
              content: prompt
            },
            { 
              role: 'user', 
              content: rawReport 
            }
          ],
          max_tokens: 500,
          temperature: 0.3,
        }),
      });

      console.log('OpenAI response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('OpenAI API error:', errorText);
        
        // If quota exceeded, use fallback processing
        if (response.status === 429) {
          console.log('OpenAI quota exceeded, using fallback processing');
          throw new Error('QUOTA_EXCEEDED');
        }
        
        throw new Error(`OpenAI API error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log('OpenAI response received');
      processedSummary = data.choices[0].message.content;
    } catch (error) {
      console.log('OpenAI API failed, using fallback processing:', error.message);
      
      // Fallback: Create a basic structured summary without AI processing
      const fallbackSummaries = {
        en: `Report Summary:\nIncident Type: ${reportData?.incident_type || 'Not specified'}\nDate: ${reportData?.incident_date || 'Not specified'} at ${reportData?.incident_time || 'Not specified'}\nLocation: ${reportData?.location_state || 'Not specified'} - ${reportData?.location_details || 'No additional details'}\nRelationship to perpetrator: ${reportData?.perpetrator_relationship || 'Not specified'}\nDescription: ${reportData?.description || 'No description provided'}\n\nThis report has been submitted and will be reviewed by appropriate support services.`,
        yo: `Akopọ Ijabọ:\nIru Iṣẹlẹ: ${reportData?.incident_type || 'Ko wa'}\nOjọ: ${reportData?.incident_date || 'Ko wa'} ni ${reportData?.incident_time || 'Ko wa'}\nIbi: ${reportData?.location_state || 'Ko wa'} - ${reportData?.location_details || 'Ko si alaye miiran'}\nIbatan si ẹni ipalara: ${reportData?.perpetrator_relationship || 'Ko wa'}\nApejuwe: ${reportData?.description || 'Ko si apejuwe'}\n\nIjabọ yii ti fi silẹ ati pe yoo ṣe ayẹwo nipasẹ awọn iṣẹ atilẹyin ti o yẹ.`,
        ha: `Taƙaitaccen Rahoto:\nNau'in Abin da ya Faru: ${reportData?.incident_type || 'Ba a bayyana ba'}\nRana: ${reportData?.incident_date || 'Ba a bayyana ba'} da ${reportData?.incident_time || 'Ba a bayyana ba'}\nWuri: ${reportData?.location_state || 'Ba a bayyana ba'} - ${reportData?.location_details || 'Babu ƙarin cikakkun bayanai'}\nAlaka da mai laifi: ${reportData?.perpetrator_relationship || 'Ba a bayyana ba'}\nBayani: ${reportData?.description || 'Babu bayani da aka bayar'}\n\nAn shigar da wannan rahoto kuma za a duba shi ta hanyar ayyukan tallafi masu dacewa.`,
        ig: `Nchịkọta Akụkọ:\nỤdị Ihe Mere: ${reportData?.incident_type || 'Akọwaghị'}\nỤbọchị: ${reportData?.incident_date || 'Akọwaghị'} na ${reportData?.incident_time || 'Akọwaghị'}\nEbe: ${reportData?.location_state || 'Akọwaghị'} - ${reportData?.location_details || 'Enweghị nkọwa ọzọ'}\nMmekọrịta na onye mebiri iwu: ${reportData?.perpetrator_relationship || 'Akọwaghị'}\nNkọwa: ${reportData?.description || 'Enyeghị nkọwa'}\n\nEnyela akụkọ a ma ga-enyocha ya site na ọrụ nkwado kwesịrị ekwesị.`,
        pcm: `Report Summary:\nWetin Happen: ${reportData?.incident_type || 'Dem no talk am'}\nDay: ${reportData?.incident_date || 'Dem no talk am'} for ${reportData?.incident_time || 'Dem no talk am'}\nWhere: ${reportData?.location_state || 'Dem no talk am'} - ${reportData?.location_details || 'No extra details'}\nHow person take relate with the bad person: ${reportData?.perpetrator_relationship || 'Dem no talk am'}\nWetin happen: ${reportData?.description || 'No description'}\n\nDem don submit dis report and proper support people go check am.`
      };
      
      processedSummary = fallbackSummaries[language as keyof typeof fallbackSummaries] || fallbackSummaries.en;
    }

    console.log('Saving report to database...');
    // Save to database
    const { data: savedReport, error } = await supabase
      .from('gbv_reports')
      .insert({
        ...reportData,
        ai_processed_summary: processedSummary,
        language_code: language
      })
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      throw new Error(`Database error: ${error.message}`);
    }

    console.log('Report saved successfully:', savedReport.id);

    // Get relevant support resources
    console.log('Fetching support resources...');
    const { data: resources } = await supabase
      .from('support_resources')
      .select('*')
      .or(`state.eq.${reportData?.location_state},state.eq.National`)
      .eq('is_active', true)
      .order('type');

    console.log('Support resources fetched:', resources?.length || 0);

    const result = { 
      reportId: savedReport.id,
      processedSummary,
      supportResources: resources || []
    };

    console.log('Sending successful response');
    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in process-report function:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    return new Response(JSON.stringify({ 
      error: errorMessage 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});