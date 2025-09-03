import { HeroSection } from "@/components/HeroSection";
import { PricingSection } from "@/components/PricingSection";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { MessageCircle, Sparkles, Shield, Clock } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-8 h-8 text-primary" />
            <span className="text-2xl font-bold">SpoiledRotten.AI</span>
          </div>
          
          <div className="flex items-center gap-6">
            <Button variant="ghost" className="luxury-button">
              Pricing
            </Button>
            <Button variant="ghost" className="luxury-button">
              How it Works
            </Button>
            <Button 
              variant="luxury"
              onClick={() => navigate('/chat')}
              className="group"
            >
              <MessageCircle className="w-4 h-4 group-hover:scale-110 transition-transform" />
              Start Shopping
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6">Why Choose SpoiledRotten.AI?</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We handle the thinking, you enjoy the luxury
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="luxury-card p-8 text-center">
              <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Clock className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Save Time</h3>
              <p className="text-muted-foreground leading-relaxed">
                Stop spending hours searching. Our AI finds exactly what you need in seconds.
              </p>
            </div>

            <div className="luxury-card p-8 text-center">
              <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Curated Luxury</h3>
              <p className="text-muted-foreground leading-relaxed">
                Access exclusive brands and products that match your taste and budget perfectly.
              </p>
            </div>

            <div className="luxury-card p-8 text-center">
              <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Trusted Service</h3>
              <p className="text-muted-foreground leading-relaxed">
                White-glove delivery and customer service that exceeds expectations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <PricingSection />

      {/* CTA Section */}
      <section className="py-24 px-6 bg-card">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-6">Ready to be Spoiled?</h2>
          <p className="text-xl text-muted-foreground mb-10">
            Join thousands who've discovered the art of effortless luxury shopping
          </p>
          <Button 
            variant="hero"
            onClick={() => navigate('/chat')}
            className="group"
          >
            Start Your Luxury Experience
            <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-6 h-6 text-primary" />
            <span className="text-xl font-bold">SpoiledRotten.AI</span>
          </div>
          <p className="text-muted-foreground">
            Luxury AI shopping concierge • Cancel anytime • Premium support
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
