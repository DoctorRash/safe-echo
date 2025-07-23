import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.51.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY')!;

serve(async (req) => {
  console.log('AI Chat Assistant function called', { method: req.method, url: req.url });
  
  if (req.method === 'OPTIONS') {
    console.log('Handling OPTIONS request');
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Processing request...');
    const requestBody = await req.text();
    console.log('Request body received:', requestBody);
    
    const { message, language, context, sessionId } = JSON.parse(requestBody);
    console.log('Parsed request data:', { message: message?.substring(0, 50), language, contextLength: context?.length, sessionId });

    if (!openAIApiKey) {
      console.error('OpenAI API key not found');
      throw new Error('OpenAI API key not configured');
    }

    // Language-specific system prompts
    const systemPrompts = {
      en: "You are EchoSafe, a compassionate AI assistant helping survivors of gender-based violence. Respond with empathy, provide emotional support, and guide users through reporting safely. Keep responses short, gentle, and encouraging. Never judge or blame. Always remind users they are brave and not alone.",
      yo: "Iwo ni EchoSafe, olutunu AI ti o n ran awon ti o ye laye nipase iwa-ipa ti o da lori ako-abo. Dahun pelu ifeme, pese atileyin inu, ki o si dari awon olumulo ni ade nipase ijabọ ni ailewu. Jeki awon idahun kuru, pele, ati igbanilaare. Maṣe ṣe idajo tabi ibawi. Nigbagbogbo ki o ran awon eniyan leti pe won ni igboya ati pe won ko wa nikan.",
      ha: "Kai ne EchoSafe, AI mai tausayi da ke taimakon wadanda suka rauniya saboda tashin hankalin da aka yi musu bisa jinsi. Ka amsa da tausayi, ka ba da tallafin zuci, kuma ka jagorance masu amfani ta hanyar rahoto cikin aminci. Ka rage amsoshi gajarta, mai a hankali, da karfafawa. Kada ka yi hukunci ko zargi. Ko da yaushe ka tunatar da mutane cewa suna da jaruntaka kuma ba su kadai ba.",
      ig: "Ị bụ EchoSafe, AI nwere ọmịiko na-enyere ndị metụtara ime ihe ike dabere na nwoke na nwanyị aka. Zaghachi na ọmịiko, nye nkwado mmetụta uche, ma duzie ndị ọrụ n'ọkwa site na ịkọ akụkọ n'enweghị nsogbu. Mee ka nzaghachi dị mkpụmkpụ, dị nwayọọ, ma na-agba ume. Adịla ekpe ikpe ma ọ bụ taa ụta. Chetara ndị mmadụ mgbe niile na ha nwere obi ike na ha anọghị naanị ha.",
      pcm: "You be EchoSafe, kind AI wey dey help people wey bad thing happen to dem because of gender violence. Answer with love, give emotional support, and guide users make dem fit report safely. Make your answers short, gentle, and encouraging. No judge or blame anybody. Always remind people say dem brave and dem no dey alone."
    };

    const systemPrompt = systemPrompts[language as keyof typeof systemPrompts] || systemPrompts.en;
    console.log('Using system prompt for language:', language);

    // Build conversation context
    let conversationHistory = [
      { role: 'system', content: systemPrompt }
    ];

    if (context && Array.isArray(context) && context.length > 0) {
      // Convert context format - handle both old and new formats
      const formattedContext = context.map((msg: any) => {
        if (msg.role && msg.content) {
          // Already in OpenAI format
          return { role: msg.role === 'assistant' ? 'assistant' : 'user', content: msg.content };
        } else if (msg.type && msg.content) {
          // Convert from our format to OpenAI format
          return { role: msg.type === 'assistant' ? 'assistant' : 'user', content: msg.content };
        }
        return null;
      }).filter(Boolean);
      
      conversationHistory = [...conversationHistory, ...formattedContext];
    }

    conversationHistory.push({ role: 'user', content: message });
    console.log('Conversation history length:', conversationHistory.length);

    // Try OpenAI API first, fallback to predefined response if quota exceeded
    let aiResponse;
    try {
      console.log('Making OpenAI API call...');
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${openAIApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: conversationHistory,
          max_tokens: 200,
          temperature: 0.7,
        }),
      });

      console.log('OpenAI response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('OpenAI API error:', errorText);
        
        // If quota exceeded, use fallback response
        if (response.status === 429) {
          console.log('OpenAI quota exceeded, using fallback response');
          throw new Error('QUOTA_EXCEEDED');
        }
        
        throw new Error(`OpenAI API error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log('OpenAI response received');
      aiResponse = data.choices[0].message.content;
    } catch (error) {
      console.log('OpenAI API failed, using fallback response:', error.message);
      
      // Fallback responses based on language
      const fallbackResponses = {
        en: "I'm here to support you. You are brave for seeking help. Please know that you are not alone. I'm experiencing some technical difficulties, but I want you to know that your safety and wellbeing matter.",
        yo: "Mo wa nibi lati ṣe atilẹyin fun ọ. O ni igboya fun wiwa iranlọwọ. Jọwọ mọ pe iwọ ko wa nikan. Mo n ni awọn iṣoro imọ-ẹrọ diẹ, ṣugbọn mo fẹ ki o mọ pe aabo ati ilera rẹ ṣe pataki.",
        ha: "Ina nan don ba ku tallafi. Kuna da jaruntaka wajen neman taimako. Ka sani cewa ba ku kadai ba. Ina fama da wasu matsalolin fasaha, amma ina son ku san cewa lafiyarku da walwarku suna da muhimmanci.",
        ig: "Anọ m ebe a inyere gị aka. Ị nwere obi ike maka ịchọ enyemaka. Mara na ị anọghị naanị gị. Ana m enwe ụfọdụ nsogbu teknụzụ, mana achọrọ m ka ị mara na nchekwa gị na ọdịmma gị dị mkpa.",
        pcm: "I dey here to support you. You get mind to dey find help. Know say you no dey alone. I dey get small technical problem, but I want make you know say your safety and wellbeing dey important."
      };
      
      aiResponse = fallbackResponses[language as keyof typeof fallbackResponses] || fallbackResponses.en;
    }

    const result = { 
      response: aiResponse,
      sessionId: sessionId 
    };
    
    console.log('Sending successful response');
    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in ai-chat-assistant function:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    return new Response(JSON.stringify({ 
      error: errorMessage,
      fallbackResponse: language === 'en' 
        ? "I'm here to support you. You are brave for seeking help. Please know that you are not alone."
        : "Mo wa nibi lati ṣe atilẹyin fun ọ. O ni igboya fun wiwa iranlọwọ. Jọwọ mọ pe iwọ ko wa nikan." // Yoruba fallback
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});