import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Crown, Diamond, Star } from "lucide-react";

const pricingTiers = [
  {
    name: "Spoiled",
    price: "$69",
    period: "/month",
    description: "Perfect for regular treats",
    icon: Star,
    features: [
      "AI Shopping Assistant 24/7",
      "Personal shopping recommendations",
      "Budget optimization",
      "Gift suggestions",
      "Basic concierge service"
    ]
  },
  {
    name: "Rotten",
    price: "$199", 
    period: "/month",
    description: "Elevated luxury experience",
    icon: Crown,
    popular: true,
    features: [
      "Everything in Spoiled",
      "VIP brand partnerships",
      "Exclusive access to sales",
      "Personal stylist consultation",
      "Premium concierge service",
      "Same-day delivery options"
    ]
  },
  {
    name: "Ultimate",
    price: "$999",
    period: "/month", 
    description: "No limits, pure indulgence",
    icon: Diamond,
    features: [
      "Everything in Rotten",
      "Unlimited shopping budget",
      "Private label access",
      "Personal shopper on-demand",
      "White-glove delivery service",
      "Exclusive events & experiences",
      "Custom luxury sourcing"
    ]
  }
];

export const PricingSection = () => {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6">Choose Your Level of Luxury</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Don't think, let us do the shopping. Cancel anytime.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {pricingTiers.map((tier, index) => {
            const IconComponent = tier.icon;
            return (
              <Card
                key={tier.name}
                className={`luxury-card relative p-8 ${
                  tier.popular ? 'border-2 border-primary luxury-glow' : ''
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary text-primary-foreground px-6 py-2 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                  <p className="text-muted-foreground mb-4">{tier.description}</p>
                  <div className="flex items-baseline justify-center">
                    <span className="text-5xl font-bold">{tier.price}</span>
                    <span className="text-muted-foreground ml-2">{tier.period}</span>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  variant={tier.popular ? "hero" : "luxury"}
                  className="w-full"
                  size="lg"
                >
                  Get Started
                </Button>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};