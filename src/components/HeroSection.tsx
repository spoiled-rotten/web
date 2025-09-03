import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, ShoppingBag, Heart, Star, Zap, Crown, Gift } from "lucide-react";
import luxuryHeroImage from "@/assets/luxury-hero.jpg";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
        style={{ backgroundImage: `url(${luxuryHeroImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/85 to-background" />
      
      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-7xl mx-auto">
        <div className="flex items-center justify-center gap-3 mb-8 animate-fade-in">
          <div className="p-4 bg-gradient-to-r from-purple-500/20 to-rose-500/20 rounded-3xl backdrop-blur-sm border border-white/10">
            <Crown className="w-8 h-8 text-yellow-400" />
          </div>
          <span className="text-xl font-semibold text-purple-300 tracking-wide">
            THE HEIGHT OF LUXURY IS DOING NOTHING
          </span>
        </div>
        
        <h1 className="text-7xl md:text-8xl font-bold mb-8 leading-tight">
          <span className="bg-gradient-to-r from-white via-purple-200 to-rose-200 bg-clip-text text-transparent">
            SpoiledRotten
          </span>
          <span className="text-yellow-400">.AI</span>
        </h1>
        
        <p className="text-2xl md:text-3xl text-gray-300 mb-6 max-w-5xl mx-auto leading-relaxed">
          Set your budget. We learn everything about you. 
        </p>
        <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-4xl mx-auto">
          AI automatically buys the perfect gifts, clothes, experiences, and surprises. You do absolutely nothing.
        </p>

        {/* Automation Features */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-4xl mx-auto">
          <div className="flex flex-col items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/10">
            <Gift className="w-8 h-8 text-rose-400" />
            <span className="text-sm font-medium">Auto Gifts</span>
          </div>
          <div className="flex flex-col items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/10">
            <ShoppingBag className="w-8 h-8 text-purple-400" />
            <span className="text-sm font-medium">Auto Shopping</span>
          </div>
          <div className="flex flex-col items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/10">
            <Star className="w-8 h-8 text-yellow-400" />
            <span className="text-sm font-medium">Auto Events</span>
          </div>
          <div className="flex flex-col items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/10">
            <Heart className="w-8 h-8 text-emerald-400" />
            <span className="text-sm font-medium">Auto Surprises</span>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
          <Button variant="hero" className="group text-xl px-16 py-10 rounded-3xl">
            <Zap className="w-6 h-6 mr-3" />
            Start Doing Nothing
            <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
          </Button>
          
          <Button variant="gradient" size="lg" className="text-lg px-10 py-10 rounded-3xl">
            <Crown className="w-5 h-5 mr-2" />
            See Automation Plans
          </Button>
        </div>
        
        <div className="bg-gradient-to-r from-purple-500/10 to-rose-500/10 rounded-3xl p-8 border border-purple-500/20 max-w-4xl mx-auto">
          <p className="text-lg text-gray-300 mb-4">
            <span className="text-yellow-300 font-bold text-xl">Perfect for:</span> Busy executives, generous partners, anyone who deserves to be spoiled without lifting a finger
          </p>
          <p className="text-gray-400">
            <span className="text-purple-300 font-semibold">From $199/month</span> • Fully automated • AI learns your taste • Cancel anytime
          </p>
        </div>
      </div>
      
      {/* Enhanced Floating Elements */}
      <div className="absolute top-20 left-20 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl floating-animation" />
      <div className="absolute bottom-20 right-20 w-48 h-48 bg-rose-500/10 rounded-full blur-3xl floating-animation" style={{animationDelay: '2s'}} />
      <div className="absolute top-1/2 right-10 w-32 h-32 bg-yellow-500/10 rounded-full blur-2xl floating-animation" style={{animationDelay: '4s'}} />
      <div className="absolute top-1/3 left-1/4 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl floating-animation" style={{animationDelay: '6s'}} />
    </section>
  );
};