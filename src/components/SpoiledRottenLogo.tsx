import React from 'react';
import { cn } from '@/lib/utils';

interface SpoiledRottenLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'gold' | 'gradient';
  showLotus?: boolean;
}

export const SpoiledRottenLogo: React.FC<SpoiledRottenLogoProps> = ({ 
  className = '', 
  size = 'md',
  variant = 'default',
  showLotus = true
}) => {
  const sizes = {
    sm: { lotus: 24, text: 'text-2xl' },
    md: { lotus: 32, text: 'text-3xl' },
    lg: { lotus: 40, text: 'text-4xl' },
    xl: { lotus: 48, text: 'text-5xl' }
  };

  const getTextColor = () => {
    switch (variant) {
      case 'gold':
        return 'text-yellow-400';
      case 'gradient':
        return 'bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-400 bg-clip-text text-transparent';
      default:
        return 'text-white';
    }
  };

  return (
    <div className={cn("flex items-center gap-3", className)}>
      {showLotus && (
        <svg
          width={sizes[size].lotus}
          height={sizes[size].lotus}
          viewBox="0 0 100 100"
          className="transition-all duration-500 hover:rotate-12"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="lotus-gold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFD700" />
              <stop offset="50%" stopColor="#FFA500" />
              <stop offset="100%" stopColor="#FF6B6B" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Enhanced Lotus Design */}
          <g fill="url(#lotus-gold)" filter="url(#glow)">
            {/* Center petal - elongated and elegant */}
            <path d="M50 20 C48 20, 42 30, 42 42 C42 52, 46 58, 50 58 C54 58, 58 52, 58 42 C58 30, 52 20, 50 20Z" opacity="0.95" />
            
            {/* Left petals - layered for depth */}
            <path d="M38 32 C36 32, 28 38, 28 46 C28 53, 32 58, 37 58 C42 58, 45 54, 45 47 C45 39, 40 33, 38 32Z" opacity="0.9" />
            <path d="M28 40 C26 40, 18 44, 18 52 C18 58, 22 62, 28 62 C33 62, 36 58, 36 51 C36 44, 30 40, 28 40Z" opacity="0.85" />
            <path d="M20 48 C18 48, 12 52, 12 58 C12 63, 15 66, 20 66 C24 66, 27 63, 27 57 C27 52, 22 48, 20 48Z" opacity="0.8" />
            
            {/* Right petals - mirrored */}
            <path d="M62 32 C64 32, 72 38, 72 46 C72 53, 68 58, 63 58 C58 58, 55 54, 55 47 C55 39, 60 33, 62 32Z" opacity="0.9" />
            <path d="M72 40 C74 40, 82 44, 82 52 C82 58, 78 62, 72 62 C67 62, 64 58, 64 51 C64 44, 70 40, 72 40Z" opacity="0.85" />
            <path d="M80 48 C82 48, 88 52, 88 58 C88 63, 85 66, 80 66 C76 66, 73 63, 73 57 C73 52, 78 48, 80 48Z" opacity="0.8" />
            
            {/* Bottom petals - fuller design */}
            <path d="M50 58 C50 58, 44 60, 40 68 C37 74, 40 78, 44 79 C48 80, 50 76, 50 70 C50 76, 52 80, 56 79 C60 78, 63 74, 60 68 C56 60, 50 58, 50 58Z" opacity="0.85" />
            <path d="M50 62 C50 62, 45 64, 42 70 C40 74, 42 77, 45 77.5 C47 78, 48 75, 48 72 C48 75, 49 78, 52 77.5 C55 77, 57 74, 55 70 C52 64, 50 62, 50 62Z" opacity="0.75" />
            
            {/* Center detail */}
            <circle cx="50" cy="45" r="3" fill="#FFD700" opacity="0.8" />
            <circle cx="50" cy="45" r="1.5" fill="#FFF" opacity="0.9" />
          </g>
        </svg>
      )}
      
      {/* Cursive Wordmark */}
      <div className="flex flex-col leading-none">
        <span 
          className={cn(
            sizes[size].text,
            "font-serif italic tracking-wide",
            getTextColor()
          )}
          style={{
            fontFamily: "'Playfair Display', 'Bodoni Moda', 'DM Serif Display', serif",
            fontStyle: 'italic',
            fontWeight: 700,
            letterSpacing: '0.05em',
            textShadow: variant === 'gradient' ? '0 2px 10px rgba(255,215,0,0.3)' : 'none'
          }}
        >
          SPOILED
        </span>
        <span 
          className={cn(
            sizes[size].text,
            "font-serif italic tracking-wider -mt-2",
            variant === 'gradient' 
              ? 'bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400 bg-clip-text text-transparent'
              : getTextColor()
          )}
          style={{
            fontFamily: "'Playfair Display', 'Bodoni Moda', 'DM Serif Display', serif",
            fontStyle: 'italic',
            fontWeight: 700,
            letterSpacing: '0.08em',
            textShadow: variant === 'gradient' ? '0 2px 10px rgba(255,105,180,0.3)' : 'none'
          }}
        >
          ROTTEN
        </span>
      </div>
    </div>
  );
};

// Animated version for special effects
export const AnimatedSpoiledRottenLogo: React.FC<SpoiledRottenLogoProps> = (props) => {
  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-pink-400/20 blur-xl group-hover:blur-2xl transition-all duration-500" />
      <SpoiledRottenLogo {...props} className={cn("relative", props.className)} />
    </div>
  );
};