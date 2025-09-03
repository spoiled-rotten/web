import { useCart } from '@/contexts/CartContext';
import { useEffect, useState, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Crown, Zap, ShoppingBag, CreditCard } from 'lucide-react';
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
          rotate: Math.min(100, Math.max(0, overshoot)) * 1.8 - 90,
          transition: { duration: 0.3, type: "spring", stiffness: 100 }
        });
        
        await controls.start({
          rotate: spoiledLevel * 1.8 - 90,
          transition: { duration: 0.2, type: "spring", stiffness: 200 }
        });
      } else {
        controls.set({ rotate: spoiledLevel * 1.8 - 90 });
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

  // Calculate speed zones
  const getZoneColor = (level: number) => {
    if (level < 20) return 'from-gray-600 to-gray-500';
    if (level < 40) return 'from-blue-600 to-blue-500';
    if (level < 60) return 'from-purple-600 to-purple-500';
    if (level < 80) return 'from-pink-600 to-pink-500';
    if (level < 100) return 'from-orange-600 to-orange-500';
    return 'from-yellow-500 to-yellow-400';
  };

  const getStatusText = (level: number) => {
    if (level < 20) return 'BROWSING';
    if (level < 40) return 'TREATING';
    if (level < 60) return 'SPLURGING';
    if (level < 80) return 'LUXURIOUS';
    if (level < 100) return 'LAVISH';
    return 'SPOILED';
  };

  return (
    <>
      <div className="fixed bottom-6 left-6 z-50">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative w-72 h-72"
        >
          {/* Outer ring with luxury finish */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gray-900 via-black to-gray-900 p-1 shadow-2xl">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gray-800 via-black to-gray-800 p-3">
              <div className="relative w-full h-full rounded-full bg-black flex items-center justify-center">
                
                {/* Speed markings */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200">
                  {/* Background arc */}
                  <path
                    d="M 40 150 A 70 70 0 1 1 160 150"
                    fill="none"
                    stroke="rgb(31, 41, 55)"
                    strokeWidth="3"
                  />
                  
                  {/* Progress arc */}
                  <path
                    d="M 40 150 A 70 70 0 1 1 160 150"
                    fill="none"
                    stroke="url(#gradient)"
                    strokeWidth="4"
                    strokeDasharray={`${displayLevel * 2.2} 220`}
                    className="transition-all duration-1000"
                  />
                  
                  {/* Gradient definition */}
                  <defs>
                    <linearGradient id="gradient">
                      <stop offset="0%" stopColor="#10b981" />
                      <stop offset="33%" stopColor="#8b5cf6" />
                      <stop offset="66%" stopColor="#ec4899" />
                      <stop offset="100%" stopColor="#eab308" />
                    </linearGradient>
                  </defs>
                  
                  {/* Speed markers */}
                  {[0, 20, 40, 60, 80, 100].map((mark, i) => {
                    const angle = -90 + (mark * 1.8);
                    const rad = (angle * Math.PI) / 180;
                    const x1 = 100 + 65 * Math.cos(rad);
                    const y1 = 100 + 65 * Math.sin(rad);
                    const x2 = 100 + 55 * Math.cos(rad);
                    const y2 = 100 + 55 * Math.sin(rad);
                    
                    return (
                      <g key={mark}>
                        <line
                          x1={x1}
                          y1={y1}
                          x2={x2}
                          y2={y2}
                          stroke={mark === 100 ? '#eab308' : '#6b7280'}
                          strokeWidth="2"
                        />
                        <text
                          x={100 + 45 * Math.cos(rad)}
                          y={100 + 45 * Math.sin(rad)}
                          fill={mark === 100 ? '#eab308' : '#9ca3af'}
                          fontSize="10"
                          fontWeight="bold"
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          {mark === 0 ? '0' : mark === 100 ? 'MAX' : mark}
                        </text>
                      </g>
                    );
                  })}
                  
                  {/* Minor tick marks */}
                  {Array.from({ length: 20 }, (_, i) => i * 5).map(mark => {
                    if (mark % 20 === 0) return null;
                    const angle = -90 + (mark * 1.8);
                    const rad = (angle * Math.PI) / 180;
                    const x1 = 100 + 65 * Math.cos(rad);
                    const y1 = 100 + 65 * Math.sin(rad);
                    const x2 = 100 + 60 * Math.cos(rad);
                    const y2 = 100 + 60 * Math.sin(rad);
                    
                    return (
                      <line
                        key={`minor-${mark}`}
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        stroke="#4b5563"
                        strokeWidth="1"
                      />
                    );
                  })}
                </svg>
                
                {/* Needle */}
                <motion.div
                  className="absolute w-1 h-20 origin-bottom"
                  style={{ bottom: '50%', left: '50%', marginLeft: '-2px' }}
                  initial={{ rotate: -90 }}
                  animate={controls}
                >
                  <div className="w-full h-full bg-gradient-to-t from-red-500 via-red-600 to-red-400 rounded-full shadow-lg" />
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-red-500 rounded-full" />
                </motion.div>
                
                {/* Center cap */}
                <div className="absolute w-8 h-8 bg-gradient-to-br from-gray-700 via-gray-800 to-black rounded-full border-2 border-gray-600 shadow-xl flex items-center justify-center">
                  <Crown className="w-4 h-4 text-yellow-400" />
                </div>
                
                {/* Digital display */}
                <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 text-center">
                  <div className="text-3xl font-bold text-white font-mono tabular-nums">
                    {Math.round(displayLevel)}%
                  </div>
                  <div className={cn(
                    "text-xs font-bold tracking-wider mt-1",
                    displayLevel === 100 ? "text-yellow-400 animate-pulse" : "text-gray-400"
                  )}>
                    {getStatusText(displayLevel)}
                  </div>
                </div>
                
                {/* Stats */}
                <div className="absolute top-16 left-1/2 transform -translate-x-1/2 flex items-center gap-4 text-xs">
                  <div className="flex items-center gap-1">
                    <ShoppingBag className="w-3 h-3 text-gray-400" />
                    <span className="text-gray-300 font-mono">{totalItems}</span>
                  </div>
                  <div className="text-emerald-400 font-bold font-mono">
                    {formatAmount(totalAmount)}
                  </div>
                </div>
                
                {/* Warning zones */}
                {displayLevel >= 80 && displayLevel < 100 && (
                  <div className="absolute top-8 left-1/2 transform -translate-x-1/2">
                    <Zap className="w-4 h-4 text-orange-400 animate-pulse" />
                  </div>
                )}
                
                {displayLevel === 100 && (
                  <div className="absolute top-8 left-1/2 transform -translate-x-1/2">
                    <Crown className="w-5 h-5 text-yellow-400 animate-bounce" />
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Checkout button */}
          {totalItems > 0 && (
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-full px-8">
              <Button
                variant="luxury"
                size="sm"
                onClick={() => setShowCheckout(true)}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white shadow-lg"
              >
                <CreditCard className="w-4 h-4 mr-2" />
                Checkout
              </Button>
            </div>
          )}
          
          {/* Luxury badge */}
          <div className="absolute -top-2 -right-2">
            <div className="bg-gradient-to-r from-gray-700 to-gray-600 text-white text-[10px] px-2 py-1 rounded-full font-bold tracking-wider">
              BMW LUXURY
            </div>
          </div>
        </motion.div>
      </div>

      <CheckoutModal 
        isOpen={showCheckout} 
        onClose={() => setShowCheckout(false)} 
      />
    </>
  );
};