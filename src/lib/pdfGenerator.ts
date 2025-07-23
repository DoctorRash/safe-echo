import jsPDF from 'jspdf';

interface ReportData {
  reportId?: string;
  processedSummary: string;
  language: string;
}

interface PDFContent {
  title: string;
  reportId: string;
  generated: string;
  processed: string;
  privacy: string;
  privacyText: string;
  footer: string;
}

export const generateReportPDF = (reportData: ReportData): void => {
  const content: Record<string, PDFContent> = {
    en: {
      title: "ECHOSAFE INCIDENT REPORT",
      reportId: "Report ID",
      generated: "Generated",
      processed: "AI-Processed Summary",
      privacy: "Privacy Notice",
      privacyText: "This report has been anonymized and no personal identifying information has been stored. Your privacy and safety are our top priority.",
      footer: "EchoSafe - Supporting survivors of gender-based violence"
    },
    yo: {
      title: "IJABO IṢẸLẸ ECHOSAFE",
      reportId: "ID Ijabọ",
      generated: "Ti ṣe ni",
      processed: "Akopọ Ti AI Ṣe",
      privacy: "Ikede Aṣiri",
      privacyText: "Ijabọ yii ti di alakọkọ ati pe ko si alaye idanimọ ti ara ẹni ti a fi pamọ. Aṣiri ati aabo rẹ ni pataki julọ fun wa.",
      footer: "EchoSafe - Atilẹyin fun awọn ti o ye laye nipasẹ iwa-ipa"
    },
    ha: {
      title: "RAHOTON ABIN DA YA FARU NA ECHOSAFE",
      reportId: "ID Rahoto",
      generated: "An samar da shi",
      processed: "Taƙaitaccen AI",
      privacy: "Sanarwar Sirri",
      privacyText: "An mayar da wannan rahoto kamar ba a san wanda ya aiko ba kuma ba a adana wani bayani na sirri ba. Sirrinku da lafiyarku sun fi kome muhimmanci a gare mu.",
      footer: "EchoSafe - Tallafawa wadanda suka ji rauni ta hanyar tashin hankali"
    },
    ig: {
      title: "AKỤKỌ IHE MERE NA ECHOSAFE",
      reportId: "ID Akụkọ",
      generated: "Emepụtara",
      processed: "Nchịkọta AI",
      privacy: "Ọkwa Nzuzo",
      privacyText: "Emere akụkọ a ka ọ ghara ịmata onye zitere ya ma ọ dịghị ozi nkeonwe ọ bụla echekwara. Nzuzo gị na nchekwa gị ka anyị na-ebute ụzọ.",
      footer: "EchoSafe - Na-akwado ndị merụrụ ahụ site na ime ihe ike"
    },
    pcm: {
      title: "ECHOSAFE INCIDENT REPORT",
      reportId: "Report ID",
      generated: "Dem create am",
      processed: "AI-Processed Summary",
      privacy: "Privacy Notice",
      privacyText: "Dem don make dis report anonymous and no personal information dey stored. Your privacy and safety na our top priority.",
      footer: "EchoSafe - Dey support people wey bad thing happen to dem"
    }
  };

  const text = content[reportData.language] || content.en;
  
  // Create new PDF document
  const doc = new jsPDF();
  
  // Set font size and add title
  doc.setFontSize(20);
  doc.text(text.title, 20, 30);
  
  // Add date
  doc.setFontSize(12);
  doc.text(`${text.generated}: ${new Date().toLocaleDateString()}`, 20, 50);
  
  // Add report ID if available
  if (reportData.reportId) {
    doc.text(`${text.reportId}: ${reportData.reportId}`, 20, 65);
  }
  
  // Add processed summary section
  doc.setFontSize(14);
  doc.text(text.processed, 20, 85);
  
  // Add processed summary content with text wrapping
  doc.setFontSize(11);
  const summaryLines = doc.splitTextToSize(reportData.processedSummary, 170);
  doc.text(summaryLines, 20, 100);
  
  // Calculate position for privacy section (after summary)
  const summaryHeight = summaryLines.length * 5;
  const privacyY = 110 + summaryHeight;
  
  // Add privacy section
  doc.setFontSize(14);
  doc.text(text.privacy, 20, privacyY);
  
  doc.setFontSize(11);
  const privacyLines = doc.splitTextToSize(text.privacyText, 170);
  doc.text(privacyLines, 20, privacyY + 15);
  
  // Add footer at bottom
  doc.setFontSize(10);
  doc.text(text.footer, 20, 280);
  
  // Save the PDF
  const fileName = `echosafe-report-${reportData.reportId?.slice(-8) || Date.now()}.pdf`;
  doc.save(fileName);
};