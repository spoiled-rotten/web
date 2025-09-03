import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Crown, Diamond, Star, Sparkles, Gift, Zap } from "lucide-react";

const pricingTiers = [
  {
    name: "Spoiled",
    price: "$69",
    period: "/month",
    description: "Perfect for regular treats & gifts",
    icon: Star,
    color: "from-emerald-500/20 to-emerald-600/10",
    accent: "border-emerald-500/30",
    features: [
      "AI Shopping Assistant 24/7",
      "Personal recommendations",
      "Budget optimization",
      "Gift suggestions for occasions",
      "Basic concierge service",
      "Email support"
    ]
  },
  {
    name: "Rotten",
    price: "$199", 
    period: "/month",
    description: "Elevated luxury shopping experience",
    icon: Crown,
    popular: true,
    color: "from-purple-500/20 to-rose-500/10",
    accent: "border-purple-500/50",
    features: [
      "Everything in Spoiled",
      "VIP brand partnerships",
      "Exclusive sales access",
      "Personal stylist consultation",
      "Premium concierge service",
      "Same-day delivery options",
      "WhatsApp priority support"
    ]
  },
  {
    name: "Ultimate",
    price: "$999",
    period: "/month", 
    description: "No limits, pure indulgence",
    icon: Diamond,
    color: "from-yellow-500/20 to-amber-600/10",
    accent: "border-yellow-500/40",
    features: [
      "Everything in Rotten",
      "Unlimited shopping budget",
      "Private label access",
      "Personal shopper on-demand",
      "White-glove delivery service",
      "Exclusive events & experiences",
      "Custom luxury sourcing",
      "Dedicated account manager"
    ]
  }
];

export const PricingSection = () => {
  return (
    <section className="py-24 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-950/20 to-transparent" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Sparkles className="w-6 h-6 text-purple-400" />
            <span className="text-purple-300 font-medium">PRICING PLANS</span>
          </div>
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Choose Your Level of Luxury
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Don't think, let us do the shopping. Cancel anytime, upgrade anytime.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {pricingTiers.map((tier, index) => {
            const IconComponent = tier.icon;
            return (
              <Card
                key={tier.name}
                className={`luxury-card relative p-8 overflow-hidden ${
                  tier.popular ? `border-2 ${tier.accent} luxury-glow` : 'border border-white/10'
                }`}
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${tier.color} opacity-50`} />
                
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="bg-gradient-to-r from-purple-500 to-rose-500 text-white px-6 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                      <Crown className="w-4 h-4" />
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="relative z-10">
                  <div className="text-center mb-8">
                    <div className={`w-16 h-16 bg-gradient-to-br ${tier.color} rounded-2xl flex items-center justify-center mx-auto mb-4 border ${tier.accent}`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                    <p className="text-gray-400 mb-4">{tier.description}</p>
                    <div className="flex items-baseline justify-center">
                      <span className="text-5xl font-bold">{tier.price}</span>
                      <span className="text-gray-400 ml-2">{tier.period}</span>
                    </div>
                  </div>

                  <ul className="space-y-4 mb-8">
                    {tier.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400 flex items-center justify-center flex-shrink-0">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button 
                    variant={tier.popular ? "hero" : "luxury"}
                    className="w-full"
                    size="lg"
                  >
                    <Gift className="w-4 h-4 mr-2" />
                    Get Started
                    <Zap className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-16">
          <p className="text-gray-400 mb-4">All plans include:</p>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400" />
              <span>7-day money-back guarantee</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400" />
              <span>Cancel anytime</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400" />
              <span>No setup fees</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};