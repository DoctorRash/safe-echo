import { Phone, Heart, Scale, Home } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface SupportInfoProps {
  language: string;
}

const supportContent = {
  en: {
    title: "Immediate Support Available",
    subtitle: "You don't have to face this alone",
    services: [
      {
        icon: Phone,
        title: "24/7 Helplines",
        description: "Confidential crisis support available anytime",
        action: "Get Numbers"
      },
      {
        icon: Heart,
        title: "Counseling Services",
        description: "Professional emotional support and trauma counseling",
        action: "Find Centers"
      },
      {
        icon: Scale,
        title: "Legal Aid",
        description: "Free legal assistance and guidance for your situation",
        action: "Legal Help"
      },
      {
        icon: Home,
        title: "Safe Shelters",
        description: "Secure accommodation and protection services",
        action: "Find Shelter"
      }
    ]
  },
  yo: {
    title: "Iranwọ Taara Wa",
    subtitle: "Iwọ ko ni dojuko eyi nikan",
    services: [
      {
        icon: Phone,
        title: "Awọn Laini Iranwọ 24/7",
        description: "Atilẹyin ikọkọ wa nigbagbogbo",
        action: "Gba Awọn Nọmba"
      },
      {
        icon: Heart,
        title: "Awọn Iṣẹ Iṣọkan",
        description: "Atilẹyin ẹmi alamọdaju ati iṣọkan trauma",
        action: "Wa Awọn Ile-iṣẹ"
      },
      {
        icon: Scale,
        title: "Iranwọ Ofin",
        description: "Iranwọ ofin ọfẹ ati itọsọna fun ipo rẹ",
        action: "Iranwọ Ofin"
      },
      {
        icon: Home,
        title: "Awọn Ibi Aabo",
        description: "Ibugbe to daju ati awọn iṣẹ aabo",
        action: "Wa Ibi Aabo"
      }
    ]
  },
  ha: {
    title: "Taimako Na Gaggawa",
    subtitle: "Ba lallai ka fuskanci wannan kadai",
    services: [
      {
        icon: Phone,
        title: "Layukan Taimako 24/7",
        description: "Tallafin sirri yana samuwa koyaushe",
        action: "Samo Lambobi"
      },
      {
        icon: Heart,
        title: "Ayyukan Shawarwari",
        description: "Tallafin tunani na kwakwalwa da shawarwarin trauma",
        action: "Nemo Cibiyoyi"
      },
      {
        icon: Scale,
        title: "Taimakon Doka",
        description: "Taimakon doka kyauta da jagoranci don yanayinku",
        action: "Taimakon Doka"
      },
      {
        icon: Home,
        title: "Wuraren Aminci",
        description: "Masauki mai tsaro da ayyukan kariya",
        action: "Nemo Mafaka"
      }
    ]
  },
  ig: {
    title: "Nkwado Ozugbo Dị",
    subtitle: "Ị gaghị eche ihu na nke a naanị gị",
    services: [
      {
        icon: Phone,
        title: "Ahịrị Enyemaka 24/7",
        description: "Nkwado nzuzo dịrị mgbe niile",
        action: "Nweta Ọnụọgụgụ"
      },
      {
        icon: Heart,
        title: "Ọrụ Ndụmọdụ",
        description: "Nkwado mmetụta ọkachamara na ndụmọdụ trauma",
        action: "Chọta Ebe"
      },
      {
        icon: Scale,
        title: "Enyemaka Iwu",
        description: "Enyemaka iwu efu na nduzi maka ọnọdụ gị",
        action: "Enyemaka Iwu"
      },
      {
        icon: Home,
        title: "Ebe Nchebe",
        description: "Ebe obibi echekwara na ọrụ nchebe",
        action: "Chọta Ebe Nchebe"
      }
    ]
  },
  pcm: {
    title: "Help Dey Available Now",
    subtitle: "You no need face this thing alone",
    services: [
      {
        icon: Phone,
        title: "Helpline 24/7",
        description: "Private support dey available anytime",
        action: "Get Numbers"
      },
      {
        icon: Heart,
        title: "Counseling Service",
        description: "Professional emotional support and trauma help",
        action: "Find Centers"
      },
      {
        icon: Scale,
        title: "Legal Help",
        description: "Free legal assistance for your situation",
        action: "Legal Help"
      },
      {
        icon: Home,
        title: "Safe Places",
        description: "Secure accommodation and protection services",
        action: "Find Shelter"
      }
    ]
  }
};

export function SupportInfo({ language }: SupportInfoProps) {
  const content = supportContent[language as keyof typeof supportContent] || supportContent.en;

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">{content.title}</h2>
        <p className="text-lg text-muted-foreground">{content.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {content.services.map((service, index) => (
          <Card key={index} className="p-6 text-center hover:shadow-soft transition-all duration-300 hover:-translate-y-1">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-4">
              <service.icon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">{service.title}</h3>
            <p className="text-sm text-muted-foreground mb-4">{service.description}</p>
            <Button variant="outline" size="sm" className="w-full">
              {service.action}
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}