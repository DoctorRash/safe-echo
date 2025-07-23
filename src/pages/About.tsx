import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Shield, Heart, Globe, Users, ArrowLeft, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
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
          <Link to="/">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-16">
        <div className="absolute inset-0 bg-hero-gradient opacity-10"></div>
        <div className="relative container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              About EchoSafe
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              EchoSafe is a compassionate, technology-driven platform designed to empower survivors of gender-based violence by providing safe, anonymous, and accessible reporting tools.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 bg-primary/5 border-primary/20">
            <div className="text-center mb-8">
              <Heart className="h-12 w-12 text-primary mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-foreground mb-4">Our Mission</h2>
            </div>
            <p className="text-lg text-muted-foreground text-center leading-relaxed">
              To break the silence surrounding gender-based violence by providing a secure, culturally sensitive platform that prioritizes survivor safety, dignity, and empowerment. We believe every voice matters and every survivor deserves support without fear of judgment or exposure.
            </p>
          </Card>
        </div>
      </section>

      {/* Key Features */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Why Choose EchoSafe?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our platform combines cutting-edge technology with compassionate design to create a safe space for survivors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="p-6">
            <Shield className="h-8 w-8 text-primary mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-3">Complete Anonymity</h3>
            <p className="text-muted-foreground">
              No personal information required. Your identity remains completely protected throughout the reporting process.
            </p>
          </Card>

          <Card className="p-6">
            <Globe className="h-8 w-8 text-primary mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-3">Multilingual Support</h3>
            <p className="text-muted-foreground">
              Available in English, Yoruba, Hausa, Igbo, and Nigerian Pidgin to serve diverse communities.
            </p>
          </Card>

          <Card className="p-6">
            <Heart className="h-8 w-8 text-primary mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-3">AI-Powered Assistance</h3>
            <p className="text-muted-foreground">
              Compassionate AI assistant trained to provide emotional support and guide you through the process.
            </p>
          </Card>

          <Card className="p-6">
            <Users className="h-8 w-8 text-primary mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-3">Professional Resources</h3>
            <p className="text-muted-foreground">
              Direct connections to verified support services, hotlines, and professional help in your area.
            </p>
          </Card>

          <Card className="p-6">
            <CheckCircle className="h-8 w-8 text-primary mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-3">Secure Technology</h3>
            <p className="text-muted-foreground">
              Built with the latest security measures to ensure your data remains private and protected.
            </p>
          </Card>

          <Card className="p-6">
            <Shield className="h-8 w-8 text-primary mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-3">No Data Retention</h3>
            <p className="text-muted-foreground">
              We don't store personal information. Reports are anonymized and processed securely.
            </p>
          </Card>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-secondary/30 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">How EchoSafe Works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our simple, three-step process ensures your safety and privacy while connecting you with support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full text-white text-2xl font-bold mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Choose Your Method</h3>
              <p className="text-muted-foreground">
                Select between a guided form or chat with our AI assistant in your preferred language.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full text-white text-2xl font-bold mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Share Your Story</h3>
              <p className="text-muted-foreground">
                Provide details about your experience at your own pace, with support every step of the way.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full text-white text-2xl font-bold mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Get Support</h3>
              <p className="text-muted-foreground">
                Receive personalized resources and connections to professional support services in your area.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy Commitment */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 border-2 border-primary/20">
            <div className="text-center">
              <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-foreground mb-6">Our Privacy Commitment</h2>
              <div className="text-left space-y-4 text-muted-foreground">
                <p>✓ No personal identification required</p>
                <p>✓ All reports are automatically anonymized</p>
                <p>✓ No tracking of user activity or location</p>
                <p>✓ Secure, encrypted data transmission</p>
                <p>✓ No data sharing with third parties</p>
                <p>✓ Right to delete reports at any time</p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-primary/5 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">Ready to Start Your Journey?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Take the first step towards healing and justice. Your voice matters, and we're here to support you.
          </p>
          <Link to="/">
            <Button variant="safe" size="lg" className="text-lg">
              Get Started
            </Button>
          </Link>
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

export default About;