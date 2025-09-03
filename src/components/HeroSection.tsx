import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, ShoppingBag, Heart, Star } from "lucide-react";
import luxuryHeroImage from "@/assets/luxury-hero.jpg";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
        style={{ backgroundImage: `url(${luxuryHeroImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
      
      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
        <div className="flex items-center justify-center gap-3 mb-8 animate-fade-in">
          <div className="p-3 bg-gradient-to-r from-purple-500/20 to-rose-500/20 rounded-2xl backdrop-blur-sm border border-white/10">
            <Sparkles className="w-6 h-6 text-purple-400" />
          </div>
          <span className="text-lg font-medium text-purple-300 tracking-wide">
            AI-POWERED LUXURY CONCIERGE
          </span>
        </div>
        
        <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
          <span className="bg-gradient-to-r from-white via-purple-200 to-rose-200 bg-clip-text text-transparent">
            SpoiledRotten
          </span>
          <span className="text-purple-400">.AI</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
          Stop spending hours searching. Our AI finds the perfect luxury items for you and your loved ones in seconds.
        </p>

        {/* Key Benefits */}
        <div className="flex flex-wrap justify-center gap-6 mb-12 text-sm">
          <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10">
            <Star className="w-4 h-4 text-yellow-400" />
            <span>Curated by AI</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10">
            <Heart className="w-4 h-4 text-rose-400" />
            <span>Perfect for Gifts</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10">
            <ShoppingBag className="w-4 h-4 text-purple-400" />
            <span>Luxury Brands</span>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Button variant="hero" className="group text-xl px-12 py-8 rounded-3xl">
            <ShoppingBag className="w-6 h-6 mr-2" />
            Start Shopping
            <ArrowRight className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
          
          <Button variant="gradient" size="lg" className="text-lg px-8 py-8 rounded-3xl">
            View Pricing
          </Button>
        </div>
        
        <p className="text-gray-400 mt-6 text-base">
          <span className="text-purple-300 font-semibold">From $69/month</span> • Cancel anytime • 24/7 AI concierge
        </p>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl floating-animation" />
      <div className="absolute bottom-20 right-20 w-40 h-40 bg-rose-500/10 rounded-full blur-3xl floating-animation" style={{animationDelay: '2s'}} />
      <div className="absolute top-1/2 right-10 w-24 h-24 bg-yellow-500/10 rounded-full blur-2xl floating-animation" style={{animationDelay: '4s'}} />
    </section>
  );
};