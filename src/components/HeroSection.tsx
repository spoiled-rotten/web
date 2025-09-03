import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-bg.jpg";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-background/80" />
      
      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <div className="flex items-center justify-center gap-2 mb-8">
          <Sparkles className="w-8 h-8 text-primary" />
          <span className="text-xl font-semibold text-muted-foreground tracking-wide">
            LUXURY AI SHOPPING
          </span>
        </div>
        
        <h1 className="text-7xl md:text-8xl font-bold mb-8 leading-tight">
          <span className="bg-gradient-to-r from-primary to-foreground bg-clip-text text-transparent">
            SpoiledRotten
          </span>
          <span className="text-primary">.AI</span>
        </h1>
        
        <p className="text-2xl md:text-3xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed">
          Don't think, let us do the shopping. The ultimate AI concierge for busy professionals and those who deserve extraordinary.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Button variant="hero" className="group">
            Start Shopping with AI
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </Button>
          
          <Button variant="premium" size="lg">
            View Pricing
          </Button>
        </div>
        
        <p className="text-muted-foreground mt-8 text-lg">
          From $69/month • Cancel anytime • White-glove service
        </p>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-primary/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-20 w-40 h-40 bg-primary/5 rounded-full blur-3xl animate-pulse delay-1000" />
    </section>
  );
};