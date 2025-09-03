import React from 'react';
import { cn } from '@/lib/utils';

interface LotusLogoProps {
  className?: string;
  size?: number;
  variant?: 'default' | 'gold' | 'white' | 'gradient';
}

export const LotusLogo: React.FC<LotusLogoProps> = ({ 
  className = '', 
  size = 32,
  variant = 'default' 
}) => {
  const getColor = () => {
    switch (variant) {
      case 'gold':
        return '#FFD700';
      case 'white':
        return '#FFFFFF';
      case 'gradient':
        return 'url(#lotus-gradient)';
      default:
        return 'currentColor';
    }
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={cn("transition-all duration-300", className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      {variant === 'gradient' && (
        <defs>
          <linearGradient id="lotus-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFD700" />
            <stop offset="50%" stopColor="#FFA500" />
            <stop offset="100%" stopColor="#FF6B6B" />
          </linearGradient>
        </defs>
      )}
      
      {/* Lotus Flower - Minimal, Zen Design */}
      <g fill={getColor()} fillOpacity="0.95">
        {/* Center petal */}
        <path d="M50 25 C50 25, 45 35, 45 45 C45 52, 50 55, 50 55 C50 55, 55 52, 55 45 C55 35, 50 25, 50 25Z" />
        
        {/* Left petals */}
        <path d="M35 35 C35 35, 30 40, 30 48 C30 54, 35 57, 38 57 C41 57, 44 54, 44 48 C44 42, 40 37, 35 35Z" opacity="0.9" />
        <path d="M25 45 C25 45, 20 48, 20 54 C20 59, 24 62, 28 62 C32 62, 35 59, 35 54 C35 49, 31 46, 25 45Z" opacity="0.8" />
        
        {/* Right petals */}
        <path d="M65 35 C65 35, 70 40, 70 48 C70 54, 65 57, 62 57 C59 57, 56 54, 56 48 C56 42, 60 37, 65 35Z" opacity="0.9" />
        <path d="M75 45 C75 45, 80 48, 80 54 C80 59, 76 62, 72 62 C68 62, 65 59, 65 54 C65 49, 69 46, 75 45Z" opacity="0.8" />
        
        {/* Bottom petals */}
        <path d="M50 55 C50 55, 45 58, 42 65 C40 70, 42 74, 45 75 C48 76, 50 73, 50 68 C50 73, 52 76, 55 75 C58 74, 60 70, 58 65 C55 58, 50 55, 50 55Z" opacity="0.85" />
        
        {/* Stem hint */}
        <line x1="50" y1="68" x2="50" y2="78" stroke={getColor()} strokeWidth="1.5" opacity="0.5" />
      </g>
    </svg>
  );
};

// Animated version for special occasions
export const AnimatedLotusLogo: React.FC<LotusLogoProps> = (props) => {
  return (
    <div className="relative">
      <LotusLogo {...props} className={cn("animate-pulse", props.className)} />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-2 h-2 bg-yellow-400 rounded-full animate-ping" />
      </div>
    </div>
  );
};