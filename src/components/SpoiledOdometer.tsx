import { useCart } from '@/contexts/CartContext';
import { useEffect, useState } from 'react';
import { Crown, ShoppingBag, Sparkles, Star, Heart, Gem, CreditCard } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { CheckoutModal } from '@/components/CheckoutModal';

const MILESTONES = [
  { level: 0, label: '0', icon: ShoppingBag, color: 'text-gray-400' },
  { level: 20, label: 'TREATING', icon: Star, color: 'text-yellow-400' },
  { level: 40, label: 'SPLURGING', icon: Heart, color: 'text-rose-400' },
  { level: 60, label: 'INDULGING', icon: Sparkles, color: 'text-purple-400' },
  { level: 80, label: 'LUXURIOUS', icon: Gem, color: 'text-cyan-400' },
  { level: 100, label: 'SPOILED', icon: Crown, color: 'text-yellow-500' },
];

export const SpoiledOdometer = () => {
  const { spoiledLevel, totalAmount, totalItems } = useCart();
  const [displayLevel, setDisplayLevel] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showPulse, setShowPulse] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);

  // Get current milestone
  const currentMilestone = MILESTONES.reduce((prev, curr) => {
    if (spoiledLevel >= curr.level) return curr;
    return prev;
  }, MILESTONES[0]);

  // Get next milestone for progress indication
  const nextMilestone = MILESTONES.find(m => m.level > spoiledLevel) || MILESTONES[MILESTONES.length - 1];

  // Animate level changes
  useEffect(() => {
    if (displayLevel !== spoiledLevel) {
      setIsAnimating(true);
      const duration = 1500; // Animation duration in ms
      const steps = 60; // Number of animation frames
      const increment = (spoiledLevel - displayLevel) / steps;
      let currentStep = 0;

      const interval = setInterval(() => {
        currentStep++;
        if (currentStep >= steps) {
          setDisplayLevel(spoiledLevel);
          setIsAnimating(false);
          clearInterval(interval);
          
          // Trigger pulse effect when reaching a new milestone
          if (spoiledLevel > 0 && spoiledLevel % 20 === 0) {
            setShowPulse(true);
            setTimeout(() => setShowPulse(false), 1000);
          }
        } else {
          setDisplayLevel(prev => prev + increment);
        }
      }, duration / steps);

      return () => clearInterval(interval);
    }
  }, [spoiledLevel, displayLevel]);

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const CurrentIcon = currentMilestone.icon;

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <div className={cn(
        "luxury-card p-6 backdrop-blur-xl bg-black/80 border border-white/20 rounded-3xl transition-all duration-500 hover:scale-105",
        showPulse && "animate-pulse ring-4 ring-yellow-400/50"
      )}>
        {/* Main Odometer Display */}
        <div className="flex items-center gap-4 mb-4">
          <div className={cn(
            "w-16 h-16 rounded-2xl bg-gradient-to-br flex items-center justify-center transition-all duration-500",
            displayLevel === 100 
              ? "from-yellow-500/30 to-yellow-600/20 border-2 border-yellow-400 animate-pulse" 
              : "from-purple-500/20 to-rose-500/10 border border-white/20"
          )}>
            <CurrentIcon className={cn(
              "w-8 h-8 transition-all duration-500",
              currentMilestone.color,
              isAnimating && "animate-spin"
            )} />
          </div>
          
          <div className="flex flex-col">
            <div className="flex items-baseline gap-2">
              <span className={cn(
                "text-3xl font-bold transition-colors duration-500",
                displayLevel === 100 ? "text-yellow-400" : "text-white"
              )}>
                {Math.round(displayLevel)}%
              </span>
              <span className={cn(
                "text-sm font-medium transition-all duration-500",
                currentMilestone.color
              )}>
                {currentMilestone.label}
              </span>
            </div>
            
            {/* Progress Bar */}
            <div className="w-48 h-2 bg-white/10 rounded-full overflow-hidden mt-2">
              <div 
                className={cn(
                  "h-full rounded-full transition-all duration-1500 ease-out",
                  displayLevel === 100 
                    ? "bg-gradient-to-r from-yellow-400 to-yellow-500"
                    : "bg-gradient-to-r from-purple-500 to-rose-500"
                )}
                style={{ width: `${displayLevel}%` }}
              />
            </div>
            
            {/* Next Milestone Hint */}
            {displayLevel < 100 && (
              <div className="flex items-center gap-1 mt-1">
                <span className="text-xs text-gray-400">Next:</span>
                <nextMilestone.icon className={cn("w-3 h-3", nextMilestone.color)} />
                <span className={cn("text-xs font-medium", nextMilestone.color)}>
                  {nextMilestone.label}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Stats Display */}
        <div className="flex items-center justify-between pt-3 border-t border-white/10">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-300">
              {totalItems} {totalItems === 1 ? 'item' : 'items'}
            </span>
          </div>
          <div className={cn(
            "text-sm font-bold transition-colors duration-500",
            totalAmount >= 20000 ? "text-yellow-400" : "text-emerald-400"
          )}>
            {formatAmount(totalAmount)}
          </div>
        </div>

        {/* Achievement Badge */}
        {displayLevel === 100 && (
          <div className="absolute -top-3 -right-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-3 py-1 rounded-full text-xs font-bold animate-bounce">
            FULLY SPOILED! 👑
          </div>
        )}

        {/* Checkout Button */}
        {totalItems > 0 && (
          <div className="mt-3">
            <Button
              variant="luxury"
              size="sm"
              className="w-full group"
              onClick={() => setShowCheckout(true)}
            >
              <CreditCard className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
              Checkout
            </Button>
          </div>
        )}
      </div>

      {/* Checkout Modal */}
      <CheckoutModal 
        isOpen={showCheckout} 
        onClose={() => setShowCheckout(false)} 
      />
    </div>
  );
};