import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

const languages: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
  { code: 'yo', name: 'Yoruba', nativeName: 'Yorùbá', flag: '🇳🇬' },
  { code: 'ha', name: 'Hausa', nativeName: 'Hausa', flag: '🇳🇬' },
  { code: 'ig', name: 'Igbo', nativeName: 'Igbo', flag: '🇳🇬' },
  { code: 'pcm', name: 'Pidgin', nativeName: 'Naija', flag: '🇳🇬' },
];

interface LanguageSelectorProps {
  onLanguageSelect: (languageCode: string) => void;
  selectedLanguage?: string;
}

export function LanguageSelector({ onLanguageSelect, selectedLanguage }: LanguageSelectorProps) {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-foreground mb-2">
          Choose Your Language
        </h2>
        <p className="text-muted-foreground">
          Select your preferred language for a comfortable experience
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {languages.map((language) => (
          <Card 
            key={language.code}
            className={`p-6 cursor-pointer transition-all duration-300 hover:shadow-soft border-2 ${
              selectedLanguage === language.code 
                ? 'border-primary bg-primary/5' 
                : 'border-border hover:border-primary/30'
            }`}
            onClick={() => onLanguageSelect(language.code)}
          >
            <div className="text-center space-y-3">
              <div className="text-3xl">{language.flag}</div>
              <div>
                <h3 className="font-semibold text-foreground">{language.nativeName}</h3>
                <p className="text-sm text-muted-foreground">{language.name}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}