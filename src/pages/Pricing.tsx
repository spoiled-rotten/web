import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LotusLogo } from '@/components/LotusLogo';
import { 
  Check, X, Crown, Sparkles, Zap, Shield, 
  CreditCard, ArrowRight, Star, Gem
} from 'lucide-react';
import { toast } from 'sonner';

interface PlanFeature {
  text: string;
  included: boolean;
}

interface PricingPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  period: string;
  icon: React.ReactNode;
  popular?: boolean;
  features: PlanFeature[];
  color: string;
}

const plans: PricingPlan[] = [
  {
    id: 'starter',
    name: 'ESSENTIAL',
    description: 'Start getting spoiled',
    price: 69,
    period: '/month',
    icon: <Star className="w-6 h-6" />,
    color: 'from-gray-600 to-gray-500',
    features: [
      { text: 'AI Shopping Assistant', included: true },
      { text: 'Up to $10,000 monthly spending', included: true },
      { text: 'Smart product recommendations', included: true },
      { text: 'Priority email support', included: true },
      { text: 'Exclusive member deals', included: true },
      { text: 'Personal shopper', included: false },
      { text: 'VIP early access', included: false },
      { text: 'Concierge service', included: false },
    ],
  },
  {
    id: 'premium',
    name: 'LUXE',
    description: 'The ultimate shopping AI',
    price: 299,
    period: '/month',
    icon: <Crown className="w-6 h-6" />,
    color: 'from-purple-600 to-pink-600',
    popular: true,
    features: [
      { text: 'Advanced AI Shopping Brain', included: true },
      { text: 'Up to $50,000 monthly spending', included: true },
      { text: 'Hyper-personalized AI curation', included: true },
      { text: '24/7 VIP support', included: true },
      { text: 'Dedicated personal shopper', included: true },
      { text: 'First access to drops', included: true },
      { text: 'Private sale invites', included: true },
      { text: 'Concierge service', included: false },
    ],
  },
  {
    id: 'elite',
    name: 'ROYALTY',
    description: 'Infinite luxury, zero limits',
    price: 1299,
    period: '/month',
    icon: <Gem className="w-6 h-6" />,
    color: 'from-yellow-500 to-yellow-400',
    features: [
      { text: 'Quantum AI Shopping Engine', included: true },
      { text: 'Unlimited spending power', included: true },
      { text: 'White-glove AI butler service', included: true },
      { text: 'C-suite account executive', included: true },
      { text: 'Celebrity stylist team', included: true },
      { text: 'Pre-launch exclusive access', included: true },
      { text: '24/7 luxury concierge', included: true },
      { text: 'Private jet shopping trips', included: true },
    ],
  },
];

export default function Pricing() {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState<string>('premium');
  const [isYearly, setIsYearly] = useState(false);

  const handleSubscribe = (planId: string) => {
    // Store subscription in localStorage for demo
    localStorage.setItem('subscription', JSON.stringify({
      plan: planId,
      subscribedAt: new Date().toISOString(),
      isYearly,
    }));
    
    toast.success(
      <div className="flex items-center gap-2">
        <Crown className="w-4 h-4 text-yellow-400" />
        <span>Welcome to the luxury life!</span>
      </div>
    );
    
    // Redirect to feed after subscription
    setTimeout(() => navigate('/'), 1500);
  };

  const getPrice = (basePrice: number) => {
    if (isYearly) {
      // 20% discount for yearly
      return Math.floor(basePrice * 0.8 * 12);
    }
    return basePrice;
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Luxury gradient background */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-900/20 via-black to-pink-900/20" />
      
      {/* Header */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-center mb-12">
            <LotusLogo size={48} variant="gradient" />
          </div>
          
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">
              Choose Your Luxury Level
            </h1>
            <p className="text-xl text-gray-400 mb-8">
              AI-powered shopping that learns your taste and automates luxury
            </p>
            
            {/* Billing toggle */}
            <div className="flex items-center justify-center gap-4">
              <span className={isYearly ? 'text-gray-500' : 'text-white'}>Monthly</span>
              <button
                onClick={() => setIsYearly(!isYearly)}
                className="relative w-16 h-8 bg-gray-800 rounded-full transition-colors"
              >
                <div className={cn(
                  "absolute top-1 w-6 h-6 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full transition-transform",
                  isYearly ? 'translate-x-8' : 'translate-x-1'
                )} />
              </button>
              <span className={isYearly ? 'text-white' : 'text-gray-500'}>
                Yearly
                <span className="ml-2 text-green-400 text-sm">Save 20%</span>
              </span>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={cn(
                  "w-full",
                  plan.popular && "md:col-span-2 lg:col-span-1"
                )}
              >
                <Card className={cn(
                  "relative overflow-hidden bg-gray-950 border transition-all duration-300 h-full",
                  plan.popular 
                    ? 'border-yellow-500/50 shadow-2xl shadow-yellow-500/20 lg:scale-105' 
                    : 'border-gray-800 hover:border-gray-700'
                )}>
                  {plan.popular && (
                    <div className="absolute top-0 right-0 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black text-xs font-bold px-3 py-1 rounded-bl-lg">
                      MOST POPULAR
                    </div>
                  )}
                  
                  <div className="p-6 sm:p-8">
                    {/* Plan header */}
                    <div className={cn(
                      "w-16 h-16 rounded-2xl bg-gradient-to-br flex items-center justify-center mb-4",
                      plan.color
                    )}>
                      {plan.icon}
                    </div>
                    
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                    <p className="text-gray-400 mb-6">{plan.description}</p>
                    
                    {/* Price */}
                    <div className="mb-6">
                      <span className="text-4xl font-bold">
                        ${getPrice(plan.price)}
                      </span>
                      <span className="text-gray-400 ml-2">
                        {isYearly ? '/year' : plan.period}
                      </span>
                    </div>
                    
                    {/* Features */}
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3">
                          {feature.included ? (
                            <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                          ) : (
                            <X className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
                          )}
                          <span className={feature.included ? 'text-gray-200' : 'text-gray-600'}>
                            {feature.text}
                          </span>
                        </li>
                      ))}
                    </ul>
                    
                    {/* CTA Button */}
                    <Button
                      onClick={() => handleSubscribe(plan.id)}
                      className={cn(
                        "w-full py-6 text-lg font-semibold transition-all duration-300",
                        plan.popular
                          ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black'
                          : 'bg-gray-800 hover:bg-gray-700 text-white'
                      )}
                    >
                      <CreditCard className="w-5 h-5 mr-2" />
                      {plan.popular ? 'Start Free Trial' : 'Subscribe Now'}
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Trust badges */}
          <div className="mt-16 text-center">
            <div className="flex items-center justify-center gap-8 mb-8">
              <div className="flex items-center gap-2 text-gray-400">
                <Shield className="w-5 h-5" />
                <span>Bank-level security</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Zap className="w-5 h-5" />
                <span>Cancel anytime</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Sparkles className="w-5 h-5" />
                <span>AI-powered</span>
              </div>
            </div>
            
            <p className="text-sm text-gray-500">
              All plans include a 7-day free trial. No credit card required to start.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}