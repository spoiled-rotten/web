import { HeroSection } from "@/components/HeroSection";
import { PricingSection } from "@/components/PricingSection";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { MessageCircle, Sparkles, Shield, Clock, Brain, Zap, Crown, Gift, Star, Settings } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Crown className="w-8 h-8 text-yellow-400" />
            <span className="text-2xl font-bold">SpoiledRotten.AI</span>
          </div>
          
          <div className="flex items-center gap-6">
            <Button variant="ghost" className="luxury-button">
              Automation
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
              Start Automating
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <HeroSection />

      {/* How It Works Section */}
      <section className="py-24 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-950/10 to-transparent" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Brain className="w-6 h-6 text-purple-400" />
              <span className="text-purple-300 font-medium">HOW IT WORKS</span>
            </div>
            <h2 className="text-5xl font-bold mb-6">Complete Automation in 3 Steps</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Set it up once, then never think about luxury shopping again
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="luxury-card p-8 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500/20 to-purple-600/10 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-purple-500/30">
                <Settings className="w-10 h-10 text-purple-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4">1. Set Preferences</h3>
              <p className="text-gray-300 leading-relaxed">
                Tell our AI about yourself, your loved ones, budget, and what you care about. Takes 5 minutes.
              </p>
            </div>

            <div className="luxury-card p-8 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-rose-500/20 to-rose-600/10 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-rose-500/30">
                <Brain className="w-10 h-10 text-rose-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4">2. AI Learns Everything</h3>
              <p className="text-gray-300 leading-relaxed">
                Our AI studies your taste, important dates, relationships, and automatically curates perfect purchases.
              </p>
            </div>

            <div className="luxury-card p-8 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-emerald-500/30">
                <Gift className="w-10 h-10 text-emerald-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4">3. Automatic Surprises</h3>
              <p className="text-gray-300 leading-relaxed">
                Sit back and enjoy as luxury items, experiences, and gifts appear automatically within your budget.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6">The Ultimate Luxury is Doing Nothing</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              AI handles every aspect of luxury while you enjoy the results
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="luxury-card p-6 text-center">
              <Clock className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
              <h3 className="text-lg font-bold mb-3">Auto Gift Timing</h3>
              <p className="text-gray-400 text-sm">
                Never miss birthdays, anniversaries, or special moments again
              </p>
            </div>

            <div className="luxury-card p-6 text-center">
              <Sparkles className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-lg font-bold mb-3">Taste Learning</h3>
              <p className="text-gray-400 text-sm">
                AI learns preferences through purchases and feedback
              </p>
            </div>

            <div className="luxury-card p-6 text-center">
              <Shield className="w-12 h-12 text-rose-400 mx-auto mb-4" />
              <h3 className="text-lg font-bold mb-3">Budget Protection</h3>
              <p className="text-gray-400 text-sm">
                Smart spending within your set monthly limits
              </p>
            </div>

            <div className="luxury-card p-6 text-center">
              <Zap className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-lg font-bold mb-3">Instant Execution</h3>
              <p className="text-gray-400 text-sm">
                Same-day delivery and immediate booking when needed
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <PricingSection />

      {/* CTA Section */}
      <section className="py-24 px-6 bg-gradient-to-r from-purple-950/20 to-rose-950/20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <Crown className="w-16 h-16 text-yellow-400 mx-auto mb-6" />
            <h2 className="text-5xl font-bold mb-6">Ready to Do Absolutely Nothing?</h2>
            <p className="text-xl text-gray-300 mb-10">
              Join the ultimate luxury experience where AI handles everything and you enjoy the results
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
            <Button 
              variant="hero"
              onClick={() => navigate('/chat')}
              className="group text-xl px-12 py-8"
            >
              <Zap className="w-6 h-6 mr-3" />
              Start Full Automation
              <MessageCircle className="w-6 h-6 ml-3 group-hover:scale-110 transition-transform" />
            </Button>
          </div>
          
          <p className="text-gray-400">
            Perfect for: Busy executives • Generous partners • Sugar daddies • Anyone who deserves the best without effort
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Crown className="w-6 h-6 text-yellow-400" />
            <span className="text-xl font-bold">SpoiledRotten.AI</span>
          </div>
          <p className="text-gray-400">
            Full luxury automation • AI-powered • Cancel anytime • Premium concierge support
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;