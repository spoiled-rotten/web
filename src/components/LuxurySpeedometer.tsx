import { useCart } from '@/contexts/CartContext';
import { useEffect, useState, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ShoppingBag, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CheckoutModal } from '@/components/CheckoutModal';

export const LuxurySpeedometer = () => {
  const { spoiledLevel, totalAmount, totalItems } = useCart();
  const [displayLevel, setDisplayLevel] = useState(0);
  const [showCheckout, setShowCheckout] = useState(false);
  const controls = useAnimation();
  const previousLevel = useRef(0);

  // Animate needle on level change
  useEffect(() => {
    const animateNeedle = async () => {
      // Add realistic needle movement
      if (Math.abs(spoiledLevel - previousLevel.current) > 0.1) {
        // Slight overshoot for realism
        const overshoot = spoiledLevel > previousLevel.current ? spoiledLevel + 2 : spoiledLevel - 2;
        
        await controls.start({
          rotate: Math.min(100, Math.max(0, overshoot)) * 2.4 - 120,
          transition: { duration: 0.3, type: "spring", stiffness: 100 }
        });
        
        await controls.start({
          rotate: spoiledLevel * 2.4 - 120,
          transition: { duration: 0.2, type: "spring", stiffness: 200 }
        });
      } else {
        controls.set({ rotate: spoiledLevel * 2.4 - 120 });
      }
      
      previousLevel.current = spoiledLevel;
      setDisplayLevel(spoiledLevel);
    };
    
    animateNeedle();
  }, [spoiledLevel, controls]);

  const formatAmount = (amount: number) => {
    if (amount >= 1000000) return `$${(amount / 1000000).toFixed(1)}M`;
    if (amount >= 1000) return `$${(amount / 1000).toFixed(1)}k`;
    return `$${amount.toFixed(0)}`;
  };

  const getStatusText = (level: number) => {
    if (level === 0) return '';
    if (level < 20) return 'BROWSING';
    if (level < 40) return 'TREATING';
    if (level < 60) return 'SPLURGING';
    if (level < 80) return 'LUXURIOUS';
    if (level < 100) return 'LAVISH';
    return 'SPOILED ROTTEN';
  };

  const getStatusColor = (level: number) => {
    if (level < 20) return 'text-gray-400';
    if (level < 40) return 'text-blue-400';
    if (level < 60) return 'text-purple-400';
    if (level < 80) return 'text-pink-400';
    if (level < 100) return 'text-orange-400';
    return 'text-yellow-400';
  };

  return (
    <>
      <div className="fixed bottom-6 left-6 z-50">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative w-48 h-48"
        >
          {/* Glass effect container */}
          <div className="absolute inset-0 rounded-full bg-black/80 backdrop-blur-xl border border-gray-800 shadow-2xl p-4">
            <div className="relative w-full h-full rounded-full bg-gradient-to-br from-gray-950 to-black flex items-center justify-center">
              
              {/* Minimalist gauge */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200">
                {/* Background arc */}
                <path
                  d="M 30 140 A 80 80 0 1 1 170 140"
                  fill="none"
                  stroke="rgb(31, 41, 55)"
                  strokeWidth="8"
                  strokeLinecap="round"
                />
                
                {/* Progress arc */}
                <path
                  d="M 30 140 A 80 80 0 1 1 170 140"
                  fill="none"
                  stroke="url(#progressGradient)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${displayLevel * 2.4} 240`}
                  className="transition-all duration-1000"
                />
                
                {/* Gradient definition */}
                <defs>
                  <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFD700" />
                    <stop offset="100%" stopColor="#FFA500" />
                  </linearGradient>
                </defs>

                {/* Minimal tick marks */}
                {[0, 50, 100].map((mark) => {
                  const angle = -120 + (mark * 2.4);
                  const rad = (angle * Math.PI) / 180;
                  const x1 = 100 + 75 * Math.cos(rad);
                  const y1 = 100 + 75 * Math.sin(rad);
                  const x2 = 100 + 65 * Math.cos(rad);
                  const y2 = 100 + 65 * Math.sin(rad);
                  
                  return (
                    <line
                      key={mark}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke={mark === 100 ? '#FFD700' : '#6b7280'}
                      strokeWidth="2"
                    />
                  );
                })}
              </svg>
              
              {/* Elegant needle */}
              <motion.div
                className="absolute w-0.5 h-16 origin-bottom"
                style={{ bottom: '50%', left: '50%', marginLeft: '-1px' }}
                initial={{ rotate: -120 }}
                animate={controls}
              >
                <div className="w-full h-full bg-gradient-to-t from-white/80 to-white/40 rounded-full" />
              </motion.div>
              
              {/* Center dot */}
              <div className="absolute w-3 h-3 bg-white rounded-full shadow-lg" />
              
              {/* Digital display */}
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
                <div className="text-2xl font-light text-white tracking-wider">
                  {Math.round(displayLevel)}
                  <span className="text-xs text-gray-500 ml-0.5">%</span>
                </div>
                {displayLevel > 0 && (
                  <div className={cn(
                    "text-[10px] font-medium tracking-widest mt-1 transition-colors",
                    getStatusColor(displayLevel),
                    displayLevel === 100 && "animate-pulse"
                  )}>
                    {getStatusText(displayLevel)}
                  </div>
                )}
              </div>

              {/* Minimal stats */}
              {totalItems > 0 && (
                <div className="absolute top-6 left-1/2 transform -translate-x-1/2">
                  <div className="text-yellow-400 font-light text-sm">
                    {formatAmount(totalAmount)}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Checkout button - cleaner design */}
          {totalItems > 0 && (
            <motion.div 
              className="absolute -bottom-3 left-1/2 transform -translate-x-1/2"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Button
                onClick={() => setShowCheckout(true)}
                className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-medium px-4 py-2 rounded-full shadow-lg flex items-center gap-2"
                size="sm"
              >
                <ShoppingBag className="w-3 h-3" />
                <span className="text-xs">{totalItems}</span>
                <span className="text-xs">•</span>
                <CreditCard className="w-3 h-3" />
              </Button>
            </motion.div>
          )}
        </motion.div>
      </div>

      <CheckoutModal 
        isOpen={showCheckout} 
        onClose={() => setShowCheckout(false)} 
      />
    </>
  );
};