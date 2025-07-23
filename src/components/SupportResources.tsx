import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Phone, Mail, Globe, MapPin, Heart } from 'lucide-react';

interface SupportResourcesProps {
  language: string;
  resources: any[];
  onComplete: () => void;
}

const SupportResources = ({ language, resources, onComplete }: SupportResourcesProps) => {
  const content = {
    en: {
      title: "Support Resources",
      subtitle: "Help is available. You are not alone.",
      emergency: "Emergency Hotlines",
      legal: "Legal Aid",
      medical: "Medical Support",
      shelter: "Shelter & Safe Houses",
      call: "Call",
      email: "Email",
      visit: "Visit Website",
      location: "Location",
      backHome: "Back to Home",
      rememberText: "Remember: You are brave, you are strong, and you deserve support. Healing takes time, and help is always available."
    },
    yo: {
      title: "Awọn Ohun Elo Atilẹyin",
      subtitle: "Iranlọwọ wa. Iwọ ko wa nikan.",
      emergency: "Awọn Laini Pajawiri",
      legal: "Iranlọwọ Ofin",
      medical: "Atilẹyin Iṣoogun",
      shelter: "Ibi Aabo & Ile Aabo",
      call: "Pe",
      email: "Imeeli",
      visit: "Ṣabẹwo si Oju Opo Wẹẹbu",
      location: "Ipo",
      backHome: "Pada si Ile",
      rememberText: "Ranti: O ni igboya, o lagbara, o si yẹ fun atilẹyin. Iwọsan gba akoko, ati pe iranlọwọ wa nigbagbogbo."
    }
  };

  const text = content[language as keyof typeof content] || content.en;

  const groupedResources = resources.reduce((acc, resource) => {
    if (!acc[resource.type]) {
      acc[resource.type] = [];
    }
    acc[resource.type].push(resource);
    return acc;
  }, {} as Record<string, any[]>);

  const resourceTypes = {
    hotline: { title: text.emergency, icon: Phone, color: 'bg-red-100 text-red-700' },
    legal_aid: { title: text.legal, icon: Globe, color: 'bg-blue-100 text-blue-700' },
    medical: { title: text.medical, icon: Heart, color: 'bg-green-100 text-green-700' },
    shelter: { title: text.shelter, icon: MapPin, color: 'bg-purple-100 text-purple-700' }
  };

  const handleCall = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  const handleEmail = (email: string) => {
    window.location.href = `mailto:${email}`;
  };

  const handleWebsite = (website: string) => {
    window.open(website, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">{text.title}</h1>
          <p className="text-lg text-muted-foreground">{text.subtitle}</p>
        </div>

        <div className="space-y-8">
          {Object.entries(groupedResources).map(([type, typeResources]) => {
            const typeConfig = resourceTypes[type as keyof typeof resourceTypes];
            if (!typeConfig) return null;

            const Icon = typeConfig.icon;

            return (
              <div key={type}>
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-2 rounded-lg ${typeConfig.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <h2 className="text-xl font-semibold text-foreground">{typeConfig.title}</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(typeResources as any[]).map((resource: any) => (
                    <Card key={resource.id} className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-semibold text-foreground">{resource.name}</h3>
                        {resource.state && (
                          <Badge variant="secondary" className="text-xs">
                            {resource.state}
                          </Badge>
                        )}
                      </div>

                      <div className="space-y-3">
                        {resource.phone && (
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <Button 
                              variant="link" 
                              className="p-0 h-auto font-normal"
                              onClick={() => handleCall(resource.phone)}
                            >
                              {resource.phone}
                            </Button>
                          </div>
                        )}

                        {resource.email && (
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            <Button 
                              variant="link" 
                              className="p-0 h-auto font-normal"
                              onClick={() => handleEmail(resource.email)}
                            >
                              {resource.email}
                            </Button>
                          </div>
                        )}

                        {resource.website && (
                          <div className="flex items-center gap-2">
                            <Globe className="h-4 w-4 text-muted-foreground" />
                            <Button 
                              variant="link" 
                              className="p-0 h-auto font-normal"
                              onClick={() => handleWebsite(resource.website)}
                            >
                              {text.visit}
                            </Button>
                          </div>
                        )}

                        {resource.address && (
                          <div className="flex items-start gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                            <span className="text-sm text-muted-foreground">
                              {resource.address}
                            </span>
                          </div>
                        )}

                        {resource.phone && (
                          <Button 
                            variant="safe" 
                            size="sm" 
                            className="w-full mt-3"
                            onClick={() => handleCall(resource.phone)}
                          >
                            <Phone className="h-4 w-4 mr-2" />
                            {text.call}
                          </Button>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <Card className="mt-12 p-6 bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
          <div className="text-center">
            <Heart className="h-8 w-8 text-primary mx-auto mb-4" />
            <p className="text-foreground font-medium leading-relaxed">
              {text.rememberText}
            </p>
          </div>
        </Card>

        <div className="text-center mt-8">
          <Button variant="outline" onClick={onComplete}>
            {text.backHome}
          </Button>
        </div>
      </div>
    </div>
  );
};

export { SupportResources };