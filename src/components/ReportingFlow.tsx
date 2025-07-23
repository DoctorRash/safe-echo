import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ReportForm } from './ReportForm';
import { ChatAssistant } from './ChatAssistant';
import { ReportSummary } from './ReportSummary';
import { SupportResources } from './SupportResources';
import { ArrowLeft, MessageCircle, FileText } from 'lucide-react';

interface ReportingFlowProps {
  language: string;
  onBack: () => void;
}

type FlowStep = 'choose' | 'form' | 'chat' | 'summary' | 'resources';

const ReportingFlow = ({ language, onBack }: ReportingFlowProps) => {
  const [currentStep, setCurrentStep] = useState<FlowStep>('choose');
  const [reportData, setReportData] = useState<any>(null);
  const [supportResources, setSupportResources] = useState<any[]>([]);

  const content = {
    en: {
      title: "How would you like to report?",
      subtitle: "Choose the method that feels most comfortable for you",
      formOption: {
        title: "Step-by-step Form",
        description: "Fill out a guided form with clear questions"
      },
      chatOption: {
        title: "Chat with AI Assistant",
        description: "Talk with our compassionate AI helper"
      }
    },
    yo: {
      title: "Bawo ni o ṣe fẹ lati ṣe ijabọ?",
      subtitle: "Yan ọna ti o dabi eniti o rọrun fun ọ julọ",
      formOption: {
        title: "Fọọmu Igbesẹ-nipasẹ-igbesẹ",
        description: "Kọ fọọmu itọsọna pẹlu awon ibeere ti o han"
      },
      chatOption: {
        title: "Bọ sọrọ pẹlu Oluranlọwọ AI",
        description: "Bọ sọrọ pẹlu oluranlọwọ AI wa ti o ni ifeme"
      }
    }
  };

  const text = content[language as keyof typeof content] || content.en;

  const handleReportComplete = (data: any, resources: any[]) => {
    setReportData(data);
    setSupportResources(resources);
    setCurrentStep('summary');
  };

  if (currentStep === 'form') {
    return (
      <ReportForm 
        language={language}
        onBack={() => setCurrentStep('choose')}
        onComplete={handleReportComplete}
      />
    );
  }

  if (currentStep === 'chat') {
    return (
      <ChatAssistant 
        language={language}
        onBack={() => setCurrentStep('choose')}
        onComplete={handleReportComplete}
      />
    );
  }

  if (currentStep === 'summary') {
    return (
      <ReportSummary 
        language={language}
        reportData={reportData}
        onContinue={() => setCurrentStep('resources')}
      />
    );
  }

  if (currentStep === 'resources') {
    return (
      <SupportResources 
        language={language}
        resources={supportResources}
        onComplete={onBack}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="mb-6 hover:bg-muted"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {text.title}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {text.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          <Card 
            className="p-8 text-center cursor-pointer hover:shadow-soft transition-all duration-300 border-2 hover:border-primary/20"
            onClick={() => setCurrentStep('form')}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
              <FileText className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-3">
              {text.formOption.title}
            </h3>
            <p className="text-muted-foreground mb-6">
              {text.formOption.description}
            </p>
            <Button variant="outline" className="w-full">
              Start Form
            </Button>
          </Card>

          <Card 
            className="p-8 text-center cursor-pointer hover:shadow-soft transition-all duration-300 border-2 hover:border-primary/20"
            onClick={() => setCurrentStep('chat')}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
              <MessageCircle className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-3">
              {text.chatOption.title}
            </h3>
            <p className="text-muted-foreground mb-6">
              {text.chatOption.description}
            </p>
            <Button variant="safe" className="w-full">
              Start Chat
            </Button>
          </Card>
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 bg-muted px-4 py-2 rounded-full text-sm text-muted-foreground">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            Your privacy is protected - no personal information is stored
          </div>
        </div>
      </div>
    </div>
  );
};

export { ReportingFlow };