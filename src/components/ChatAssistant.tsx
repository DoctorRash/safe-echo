import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, Send, Bot, User } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface ChatAssistantProps {
  language: string;
  onBack: () => void;
  onComplete: (data: any, resources: any[]) => void;
}

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const ChatAssistant = ({ language, onBack, onComplete }: ChatAssistantProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(() => crypto.randomUUID());
  const [reportData, setReportData] = useState<any>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const content = {
    en: {
      title: "Chat with AI Assistant",
      subtitle: "I'm here to help you report safely and provide support",
      placeholder: "Type your message here...",
      initialMessage: "Hello, I'm here to support you. You're brave for reaching out. Please tell me what happened in your own words, and I'll help you create a clear report. Take your time - there's no pressure.",
      generateReport: "Generate Report"
    },
    yo: {
      title: "Bọ sọrọ pẹlu Oluranlọwọ AI",
      subtitle: "Mo wa nibi lati ran ọ lọwọ lati ṣe ijabọ ni ailewu ati pese atilẹyin",
      placeholder: "Kọ ifiranṣẹ rẹ nibi...",
      initialMessage: "Kaabo, Mo wa nibi lati ṣe atilẹyin fun ọ. O ni igboya fun wiwa iranlọwọ. Jọwọ sọ fun mi ohun ti o ṣẹlẹ ni awọn ọrọ tirẹ, Emi yoo ran ọ lọwọ lati ṣẹda ijabọ ti o han. Mu akoko rẹ - ko si titẹ kankan.",
      generateReport: "Ṣẹda Ijabọ"
    }
  };

  const text = content[language as keyof typeof content] || content.en;

  useEffect(() => {
    // Add initial message
    setMessages([{
      id: '1',
      type: 'assistant',
      content: text.initialMessage,
      timestamp: new Date()
    }]);
  }, [text.initialMessage]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = async () => {
    if (!currentMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: currentMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setCurrentMessage('');
    setIsLoading(true);

    try {
      const response = await supabase.functions.invoke('ai-chat-assistant', {
        body: {
          message: currentMessage,
          language: language,
          context: messages.slice(-5), // Send last 5 messages for context
          sessionId: sessionId
        }
      });

      if (response.error) {
        throw response.error;
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: response.data.response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);

      // Extract potential report data from conversation
      extractReportData(currentMessage);

    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const extractReportData = (message: string) => {
    // Simple keyword extraction - in a real app, this would be more sophisticated
    const lowerMessage = message.toLowerCase();
    
    // Extract incident type
    if (lowerMessage.includes('rape') || lowerMessage.includes('sexual')) {
      setReportData((prev: any) => ({ ...prev, incident_type: 'sexual_assault' }));
    } else if (lowerMessage.includes('beat') || lowerMessage.includes('hit') || lowerMessage.includes('violence')) {
      setReportData((prev: any) => ({ ...prev, incident_type: 'domestic_violence' }));
    } else if (lowerMessage.includes('harass')) {
      setReportData((prev: any) => ({ ...prev, incident_type: 'harassment' }));
    }

    // This would be enhanced with AI processing to extract structured data
    setReportData((prev: any) => ({ 
      ...prev, 
      description: messages.filter(m => m.type === 'user').map(m => m.content).join(' ')
    }));
  };

  const generateReport = async () => {
    setIsLoading(true);
    
    try {
      const conversationText = messages
        .filter(m => m.type === 'user')
        .map(m => m.content)
        .join(' ');

      const finalReportData = {
        ...reportData,
        description: conversationText,
        incident_type: reportData.incident_type || 'other'
      };

      const response = await supabase.functions.invoke('process-report', {
        body: {
          reportData: finalReportData,
          language: language
        }
      });

      if (response.error) {
        throw response.error;
      }

      toast({
        title: "Report generated successfully",
        description: "Your conversation has been processed into a structured report.",
      });

      onComplete(response.data, response.data.supportResources);
    } catch (error) {
      console.error('Error generating report:', error);
      toast({
        title: "Error generating report",
        description: "Please try again or contact support.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex items-center justify-between mb-6">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="hover:bg-muted"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          
          {messages.length > 3 && (
            <Button 
              variant="safe" 
              onClick={generateReport}
              disabled={isLoading}
            >
              {text.generateReport}
            </Button>
          )}
        </div>

        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-foreground mb-2">{text.title}</h1>
          <p className="text-muted-foreground">{text.subtitle}</p>
        </div>

        <Card className="flex flex-col h-[600px]">
          {/* Messages Area */}
          <div className="flex-1 p-6 overflow-y-auto space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`flex max-w-[80%] ${
                    message.type === 'user' ? 'flex-row-reverse' : 'flex-row'
                  }`}
                >
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    message.type === 'user' ? 'bg-primary ml-3' : 'bg-muted mr-3'
                  }`}>
                    {message.type === 'user' ? (
                      <User className="h-4 w-4 text-primary-foreground" />
                    ) : (
                      <Bot className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                  <div
                    className={`p-3 rounded-lg ${
                      message.type === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex max-w-[80%]">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted mr-3 flex items-center justify-center">
                    <Bot className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="bg-muted p-3 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t p-4">
            <div className="flex space-x-2">
              <Input
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={text.placeholder}
                disabled={isLoading}
                className="flex-1"
              />
              <Button 
                onClick={sendMessage} 
                disabled={!currentMessage.trim() || isLoading}
                size="icon"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export { ChatAssistant };