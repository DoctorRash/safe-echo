import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle, Download, ArrowRight } from 'lucide-react';
import { generateReportPDF } from "@/lib/pdfGenerator";

interface ReportSummaryProps {
  language: string;
  reportData: any;
  onContinue: () => void;
}

const ReportSummary = ({ language, reportData, onContinue }: ReportSummaryProps) => {
  const content = {
    en: {
      title: "Report Summary",
      subtitle: "Your report has been processed and is ready",
      processed: "AI-Processed Summary",
      reportId: "Report ID",
      privacy: "Privacy Notice",
      privacyText: "This report has been anonymized and no personal identifying information has been stored. Your privacy and safety are our top priority.",
      download: "Download Report",
      continue: "View Support Resources"
    },
    yo: {
      title: "Akopọ Ijabọ",
      subtitle: "Ijabọ rẹ ti ṣee ati pe o ti ṣetan",
      processed: "Akopọ Ti AI Ṣe",
      reportId: "ID Ijabọ",
      privacy: "Ikede Aṣiri",
      privacyText: "Ijabọ yii ti di alakọkọ ati pe ko si alaye idanimọ ti ara ẹni ti a fi pamọ. Aṣiri ati aabo rẹ ni pataki julọ fun wa.",
      download: "Gba Ijabọ Sile",
      continue: "Wo Awọn Ohun Elo Atilẹyin"
    }
  };

  const text = content[language as keyof typeof content] || content.en;

  const downloadReport = () => {
    generateReportPDF({
      reportId: reportData.reportId,
      processedSummary: reportData.processedSummary,
      language: language
    });
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">{text.title}</h1>
          <p className="text-lg text-muted-foreground">{text.subtitle}</p>
        </div>

        <div className="space-y-6">
          {reportData.reportId && (
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-2">{text.reportId}</h3>
              <p className="text-sm text-muted-foreground font-mono bg-muted p-2 rounded">
                {reportData.reportId}
              </p>
            </Card>
          )}

          <Card className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">{text.processed}</h3>
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-foreground leading-relaxed">
                {reportData.processedSummary}
              </p>
            </div>
          </Card>

          <Card className="p-6 bg-blue-50 border-blue-200">
            <h3 className="text-lg font-semibold text-foreground mb-2">{text.privacy}</h3>
            <p className="text-sm text-muted-foreground">
              {text.privacyText}
            </p>
          </Card>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="outline" 
              onClick={downloadReport}
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              {text.download}
            </Button>
            
            <Button 
              variant="safe" 
              onClick={onContinue}
              className="flex items-center gap-2"
            >
              {text.continue}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm">
            <CheckCircle className="h-4 w-4" />
            Your report is secure and anonymous
          </div>
        </div>
      </div>
    </div>
  );
};

export { ReportSummary };