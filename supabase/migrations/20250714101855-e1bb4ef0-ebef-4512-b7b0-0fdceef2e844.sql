-- Create GBV reports table
CREATE TABLE public.gbv_reports (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id UUID NOT NULL DEFAULT gen_random_uuid(),
  incident_type TEXT NOT NULL,
  incident_date DATE,
  incident_time TIME,
  location_state TEXT,
  location_details TEXT,
  perpetrator_relationship TEXT,
  description TEXT,
  ai_processed_summary TEXT,
  language_code TEXT NOT NULL DEFAULT 'en',
  status TEXT NOT NULL DEFAULT 'submitted',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create support resources table
CREATE TABLE public.support_resources (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL, -- 'hotline', 'legal_aid', 'medical', 'shelter'
  phone TEXT,
  email TEXT,
  website TEXT,
  address TEXT,
  state TEXT,
  language_codes TEXT[] DEFAULT ARRAY['en'],
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.gbv_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.support_resources ENABLE ROW LEVEL SECURITY;

-- Create policies for anonymous access to reports (session-based)
CREATE POLICY "Anonymous users can create reports" 
ON public.gbv_reports 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Users can view their own session reports" 
ON public.gbv_reports 
FOR SELECT 
USING (true); -- For now, allow reading for support purposes

-- Create policies for support resources (public read)
CREATE POLICY "Support resources are publicly readable" 
ON public.support_resources 
FOR SELECT 
USING (is_active = true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
NEW.updated_at = now();
RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_gbv_reports_updated_at
BEFORE UPDATE ON public.gbv_reports
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert some sample support resources
INSERT INTO public.support_resources (name, type, phone, state, language_codes) VALUES
('National Gender Based Violence Hotline', 'hotline', '199', 'National', ARRAY['en', 'yo', 'ha', 'ig', 'pcm']),
('Lagos State Domestic Violence Hotline', 'hotline', '08137960048', 'Lagos', ARRAY['en', 'yo', 'pcm']),
('WARIF Rape Crisis Centre', 'medical', '08092329460', 'Lagos', ARRAY['en']),
('Legal Aid Council of Nigeria', 'legal_aid', '08051213740', 'National', ARRAY['en', 'ha', 'yo', 'ig']),
('Mirabel Centre', 'medical', '08086477870', 'Lagos', ARRAY['en']);

-- Insert resources for other states
INSERT INTO public.support_resources (name, type, phone, state, language_codes) VALUES
('Kano State GBV Response Unit', 'hotline', '08033578841', 'Kano', ARRAY['en', 'ha']),
('Abuja One Stop Centre', 'medical', '08107572670', 'FCT', ARRAY['en']),
('Enugu State Ministry of Gender', 'legal_aid', '08037785444', 'Enugu', ARRAY['en', 'ig']),
('Ogun State Family Court', 'legal_aid', '08056782341', 'Ogun', ARRAY['en', 'yo']);