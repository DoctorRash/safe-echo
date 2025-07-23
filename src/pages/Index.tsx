import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LanguageSelector } from "@/components/LanguageSelector";
import { PrivacyBanner } from "@/components/PrivacyBanner";
import { SupportInfo } from "@/components/SupportInfo";
import { ReportingFlow } from "@/components/ReportingFlow";
import { Shield, MessageCircle, Users, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-safety.jpg";

const Index = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>('');
  const [showReportFlow, setShowReportFlow] = useState(false);

  const platformContent = {
    en: {
      hero: {
        title: "EchoSafe",
        subtitle: "Your Voice Matters. Your Safety Comes First.",
        description: "A safe, anonymous, and multilingual platform for reporting Gender-Based Violence. Get support, access resources, and know that you are not alone.",
        cta: "Start Your Report",
        learnMore: "Learn More"
      },
      features: [
        {
          icon: Shield,
          title: "Complete Privacy",
          description: "Anonymous reporting with no personal information required"
        },
        {
          icon: Globe,
          title: "Multilingual Support",
          description: "Available in English, Yoruba, Hausa, Igbo, and Pidgin"
        },
        {
          icon: MessageCircle,
          title: "AI Support",
          description: "Compassionate AI assistant to guide you through the process"
        },
        {
          icon: Users,
          title: "Professional Help",
          description: "Connect with verified support services and hotlines"
        }
      ]
    },
    yo: {
      hero: {
        title: "EchoSafe",
        subtitle: "Ohun Rẹ Ṣe Pataki. Aabo Rẹ Wa Lọkọ.",
        description: "Ẹrọ aabo, alakọkọ, ati alagbedemeji fun ijabọ Iwa-ipa ti o da lori Akọ-abo. Gba atilẹyin, wọle si awọn ohun elo, ki o si mọ pe iwọ ko wa nikan.",
        cta: "Bẹrẹ Ijabọ Rẹ",
        learnMore: "Kọ Diẹ Sii"
      },
      features: [
        {
          icon: Shield,
          title: "Ikọkọ Pipe",
          description: "Ijabọ alakọkọ laisi alaye ti ara ẹni kankan"
        },
        {
          icon: Globe,
          title: "Atilẹyin Alagbedemeji",
          description: "Wa ni Gẹẹsi, Yoruba, Hausa, Igbo, ati Pidgin"
        },
        {
          icon: MessageCircle,
          title: "Atilẹyin AI",
          description: "Oluranlọwọ AI onife-ọkàn lati ṣamọna rẹ nipasẹ ilana naa"
        },
        {
          icon: Users,
          title: "Iranwọ Alamọdaju",
          description: "Sopọ pẹlu awọn iṣẹ atilẹyin ti a ṣe idanimọ ati awọn laini"
        }
      ]
    },
    ha: {
      hero: {
        title: "EchoSafe",
        subtitle: "Muryarku Tana Da Mahimmanci. Lafiyarku Ta Fara.",
        description: "Dandali mai tsaro, mai boye, da yaruka da yawa don bayar da rahoton cin zarafin jinsi. Samun tallafi, samun kayan aiki, kuma ku san cewa ba ku kadai baku.",
        cta: "Fara Rahoton Ku",
        learnMore: "Koyi Kari"
      },
      features: [
        {
          icon: Shield,
          title: "Cikakken Sirri",
          description: "Bayar da rahoto a boye ba tare da bukatun bayanan sirri ba"
        },
        {
          icon: Globe,
          title: "Tallafin Harsuna Da Yawa",
          description: "Akwai a cikin Turanci, Yoruba, Hausa, Igbo, da Pidgin"
        },
        {
          icon: MessageCircle,
          title: "Tallafin AI",
          description: "Mataimakin AI mai tausayi don jagorar ku cikin tsarin"
        },
        {
          icon: Users,
          title: "Taimakon Kwararru",
          description: "Haɗa kai da ingantattun ayyukan tallafi da layukan taimako"
        }
      ]
    },
    ig: {
      hero: {
        title: "EchoSafe",
        subtitle: "Olu Gị Dị Mkpa. Nchebe Gị Bụ Nke Mbụ.",
        description: "Ebe nchebe, nke na-akpọghị aha, na nke dị n'asụsụ dị iche iche maka ịkọ ihe banyere ime ihe ike dabere na nwoke na nwanyị. Nweta nkwado, banye n'ime akụ, ma mara na ị nọghị naanị gị.",
        cta: "Malite Akụkọ Gị",
        learnMore: "Mụtakwuo"
      },
      features: [
        {
          icon: Shield,
          title: "Nzuzo Zuru Oke",
          description: "Akụkọ nke na-akpọghị aha na-achọghị ozi onwe onye"
        },
        {
          icon: Globe,
          title: "Nkwado Asụsụ Dị Iche Iche",
          description: "Dịrị na Bekee, Yoruba, Hausa, Igbo, na Pidgin"
        },
        {
          icon: MessageCircle,
          title: "Nkwado AI",
          description: "Onye inyeaka AI nwere ọmịiko iji duzie gị na usoro ahụ"
        },
        {
          icon: Users,
          title: "Enyemaka Ọkachamara",
          description: "Jikọta na ọrụ nkwado echetara na ahịrị enyemaka"
        }
      ]
    },
    pcm: {
      hero: {
        title: "EchoSafe",
        subtitle: "Your Voice Important. Your Safety First.",
        description: "Safe, anonymous, and multilingual platform to report Gender-Based Violence. Get support, access resources, and know say you no dey alone.",
        cta: "Start Your Report",
        learnMore: "Learn More"
      },
      features: [
        {
          icon: Shield,
          title: "Complete Privacy",
          description: "Anonymous reporting without any personal information"
        },
        {
          icon: Globe,
          title: "Multilingual Support",
          description: "Available for English, Yoruba, Hausa, Igbo, and Pidgin"
        },
        {
          icon: MessageCircle,
          title: "AI Support",
          description: "Kind AI assistant to guide you through the process"
        },
        {
          icon: Users,
          title: "Professional Help",
          description: "Connect with verified support services and hotlines"
        }
      ]
    }
  };

  const content = platformContent[selectedLanguage as keyof typeof platformContent] || platformContent.en;

  if (showReportFlow) {
    return (
      <ReportingFlow 
        language={selectedLanguage}
        onBack={() => setShowReportFlow(false)}
      />
    );
  }

  if (!selectedLanguage) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Shield className="h-4 w-4" />
              Safe • Anonymous • Confidential
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
              Echo<span className="text-primary">Safe</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Your voice matters. Your safety comes first. A multilingual platform for reporting Gender-Based Violence.
            </p>
          </div>
          
          <LanguageSelector 
            onLanguageSelect={setSelectedLanguage}
            selectedLanguage={selectedLanguage}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Shield className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-foreground">
              Echo<span className="text-primary">Safe</span>
            </span>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setSelectedLanguage('')}
          >
            Change Language
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-gradient opacity-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${heroImage})` }}
        ></div>
        <div className="relative container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Shield className="h-4 w-4" />
              Safe • Anonymous • Confidential
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              {content.hero.title}
            </h1>
            
            <h2 className="text-2xl md:text-3xl font-semibold text-primary mb-6">
              {content.hero.subtitle}
            </h2>
            
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              {content.hero.description}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="safe" 
                size="lg"
                onClick={() => setShowReportFlow(true)}
                className="text-lg"
              >
                {content.hero.cta}
              </Button>
              <Link to="/about">
                <Button variant="outline" size="lg">
                  {content.hero.learnMore}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy Banner */}
      <section className="container mx-auto px-4 py-8">
        <PrivacyBanner language={selectedLanguage} />
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {content.features.map((feature, index) => (
            <Card key={index} className="p-6 text-center hover:shadow-soft transition-all duration-300">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-4">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Support Information */}
      <section className="bg-secondary/30 py-16">
        <div className="container mx-auto px-4">
          <SupportInfo language={selectedLanguage} />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground text-sm">
            EchoSafe - Empowering survivors, preserving privacy, building trust.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
