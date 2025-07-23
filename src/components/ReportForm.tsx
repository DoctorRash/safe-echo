import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface ReportFormProps {
  language: string;
  onBack: () => void;
  onComplete: (data: any, resources: any[]) => void;
}

const ReportForm = ({ language, onBack, onComplete }: ReportFormProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    incident_type: '',
    incident_date: '',
    incident_time: '',
    location_state: '',
    location_details: '',
    perpetrator_relationship: '',
    description: ''
  });

  const content = {
    en: {
      title: "Report Incident",
      steps: {
        1: { title: "What happened?", subtitle: "Tell us about the type of incident" },
        2: { title: "When and where?", subtitle: "Help us understand the context" },
        3: { title: "Additional details", subtitle: "Share anything else that might help" }
      },
      fields: {
        incident_type: "Type of incident",
        incident_date: "Date of incident",
        incident_time: "Time of incident (optional)",
        location_state: "State where it happened",
        location_details: "Location details (optional)",
        perpetrator_relationship: "Relationship to perpetrator (optional)",
        description: "Description of what happened"
      },
      incidentTypes: [
        { value: 'sexual_assault', label: 'Sexual assault' },
        { value: 'domestic_violence', label: 'Domestic violence' },
        { value: 'harassment', label: 'Sexual harassment' },
        { value: 'stalking', label: 'Stalking' },
        { value: 'psychological', label: 'Psychological abuse' },
        { value: 'other', label: 'Other' }
      ],
      relationships: [
        { value: 'unknown', label: 'Unknown person' },
        { value: 'acquaintance', label: 'Acquaintance' },
        { value: 'colleague', label: 'Work colleague' },
        { value: 'partner', label: 'Current/former partner' },
        { value: 'family', label: 'Family member' },
        { value: 'other', label: 'Other' }
      ],
      next: "Next",
      back: "Back",
      submit: "Submit Report"
    }
  };

  const text = content[language as keyof typeof content] || content.en;

  const nigerianStates = [
    'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 
    'Borno', 'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 
    'FCT', 'Gombe', 'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 
    'Kogi', 'Kwara', 'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 
    'Oyo', 'Plateau', 'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara'
  ];

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      const response = await supabase.functions.invoke('process-report', {
        body: {
          reportData: formData,
          language: language
        }
      });

      if (response.error) {
        throw response.error;
      }

      toast({
        title: "Report submitted successfully",
        description: "Your report has been processed and support resources are being prepared.",
      });

      onComplete(response.data, response.data.supportResources);
    } catch (error) {
      console.error('Error submitting report:', error);
      toast({
        title: "Error submitting report",
        description: "Please try again or contact support.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="mb-6 hover:bg-muted"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-foreground">{text.title}</h1>
            <span className="text-sm text-muted-foreground">Step {currentStep} of 3</span>
          </div>
          
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 3) * 100}%` }}
            />
          </div>
        </div>

        <Card className="p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-foreground mb-2">
              {text.steps[currentStep as keyof typeof text.steps].title}
            </h2>
            <p className="text-muted-foreground">
              {text.steps[currentStep as keyof typeof text.steps].subtitle}
            </p>
          </div>

          {currentStep === 1 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="incident_type">{text.fields.incident_type}</Label>
                <Select onValueChange={(value) => updateFormData('incident_type', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select incident type" />
                  </SelectTrigger>
                  <SelectContent>
                    {text.incidentTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="description">{text.fields.description}</Label>
                <Textarea
                  id="description"
                  placeholder="Describe what happened..."
                  value={formData.description}
                  onChange={(e) => updateFormData('description', e.target.value)}
                  className="min-h-[120px]"
                />
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="incident_date">{text.fields.incident_date}</Label>
                <Input
                  id="incident_date"
                  type="date"
                  value={formData.incident_date}
                  onChange={(e) => updateFormData('incident_date', e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="incident_time">{text.fields.incident_time}</Label>
                <Input
                  id="incident_time"
                  type="time"
                  value={formData.incident_time}
                  onChange={(e) => updateFormData('incident_time', e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="location_state">{text.fields.location_state}</Label>
                <Select onValueChange={(value) => updateFormData('location_state', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    {nigerianStates.map((state) => (
                      <SelectItem key={state} value={state}>
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="location_details">{text.fields.location_details}</Label>
                <Input
                  id="location_details"
                  placeholder="Area, landmark, or general location"
                  value={formData.location_details}
                  onChange={(e) => updateFormData('location_details', e.target.value)}
                />
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="perpetrator_relationship">{text.fields.perpetrator_relationship}</Label>
                <Select onValueChange={(value) => updateFormData('perpetrator_relationship', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select relationship (optional)" />
                  </SelectTrigger>
                  <SelectContent>
                    {text.relationships.map((rel) => (
                      <SelectItem key={rel.value} value={rel.value}>
                        {rel.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="bg-muted p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  Your report will be processed by our AI assistant to create a clear summary while protecting your privacy. 
                  No identifying information will be stored.
                </p>
              </div>
            </div>
          )}

          <div className="flex justify-between mt-8">
            <Button 
              variant="outline" 
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              {text.back}
            </Button>

            {currentStep < 3 ? (
              <Button 
                onClick={handleNext}
                disabled={currentStep === 1 && !formData.incident_type}
              >
                {text.next}
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button 
                variant="safe" 
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : text.submit}
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export { ReportForm };