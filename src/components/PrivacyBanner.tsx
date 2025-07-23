import { Shield, Lock, Eye } from "lucide-react";
import { Card } from "@/components/ui/card";

interface PrivacyBannerProps {
  language: string;
}

const privacyMessages = {
  en: {
    title: "Your Privacy & Safety First",
    points: [
      "We do not store your name or personal details",
      "No login required - completely anonymous",
      "All data is automatically deleted after submission",
      "Your location and identity remain private"
    ],
    assurance: "You are safe here. We are here to help you."
  },
  yo: {
    title: "Aabo ati Ikọkọ Rẹ Lọkọ",
    points: [
      "A ko n fi orukọ tabi alaye ti ara ẹ pamọ",
      "Iwọle ko nilo - gbogbo rẹ jẹ alakọkọ",
      "Gbogbo data yoo parẹ lẹhin fifi ranṣẹ",
      "Ipo ati idanimọ rẹ wa ni aabo"
    ],
    assurance: "O wa ni aabo nibi. A wa nibi lati ran ọ lọwọ."
  },
  ha: {
    title: "Sirrinku da Lafiyarku Na Farko",
    points: [
      "Ba ma adana sunaku ko bayananku na sirri",
      "Babu bukata ta shiga - gaba daya a boye",
      "Duk bayanan za su goge bayan aikawa",
      "Wurinku da sanninku suna cikin tsaro"
    ],
    assurance: "Kuna cikin tsaro a nan. Muna nan don taimaka muku."
  },
  ig: {
    title: "Nzuzo na Gị na Nchebe Mbụ",
    points: [
      "Anyị anaghị echekwa aha gị ma ọ bụ nkọwa gị",
      "Enweghị ịbanye - kpamkpam na nzuzo",
      "A ga-ehichapụ data niile mgbe e zitere ya",
      "Ebe gị nọ na onye ị bụ nọ n'echebe"
    ],
    assurance: "Ị dị nchebe ebe a. Anyị nọ ebe a iji nyere gị aka."
  },
  pcm: {
    title: "Your Privacy & Safety First",
    points: [
      "We no dey keep your name or personal things",
      "No need to login - everything na private",
      "All information go delete after you send am",
      "Where you dey and who you be go stay secret"
    ],
    assurance: "You safe for here. We dey here to help you."
  }
};

export function PrivacyBanner({ language }: PrivacyBannerProps) {
  const messages = privacyMessages[language as keyof typeof privacyMessages] || privacyMessages.en;

  return (
    <Card className="bg-card-gradient border-primary/20 shadow-soft p-6 mb-8">
      <div className="flex items-center gap-3 mb-4">
        <Shield className="h-6 w-6 text-primary" />
        <h3 className="text-lg font-semibold text-foreground">{messages.title}</h3>
      </div>
      
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        {messages.points.map((point, index) => (
          <div key={index} className="flex items-start gap-3">
            {index === 0 && <Lock className="h-4 w-4 text-primary mt-1 flex-shrink-0" />}
            {index === 1 && <Eye className="h-4 w-4 text-primary mt-1 flex-shrink-0" />}
            {index === 2 && <Shield className="h-4 w-4 text-primary mt-1 flex-shrink-0" />}
            {index === 3 && <Lock className="h-4 w-4 text-primary mt-1 flex-shrink-0" />}
            <p className="text-sm text-muted-foreground">{point}</p>
          </div>
        ))}
      </div>
      
      <div className="text-center p-4 bg-primary/5 rounded-lg border border-primary/20">
        <p className="text-primary font-medium">{messages.assurance}</p>
      </div>
    </Card>
  );
}