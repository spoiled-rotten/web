import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { SpoiledRottenLogo } from '@/components/SpoiledRottenLogo';
import { useAuth } from '@/contexts/AuthContext';
import { 
  TrendingUp, Users, User, LogIn, Search, Menu, X
} from 'lucide-react';
import { toast } from 'sonner';

export const ModernHeader = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`sticky top-0 z-40 transition-all duration-300 ${
      scrolled ? 'bg-black/95 backdrop-blur-xl' : 'bg-black/80 backdrop-blur-lg'
    } border-b border-white/10`}>
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo - animates between full and minimal */}
          <motion.div 
            className="flex items-center"
            animate={{ width: scrolled ? 'auto' : 'auto' }}
          >
            <AnimatePresence mode="wait">
              {scrolled ? (
                <motion.div
                  key="minimal"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                >
                  <SpoiledRottenLogo size="sm" variant="gradient" showLotus={true} />
                </motion.div>
              ) : (
                <motion.div
                  key="full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <SpoiledRottenLogo size="md" variant="gradient" showLotus={true} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Center Navigation - Hidden on mobile */}
          <div className="hidden md:flex items-center gap-6">
            <button 
              className="text-gray-400 hover:text-white transition-colors text-sm font-medium"
              onClick={() => navigate('/')}
            >
              Shop
            </button>
            <button 
              className="text-gray-400 hover:text-white transition-colors text-sm font-medium"
              onClick={() => toast.info('Collections coming soon!')}
            >
              Collections
            </button>
            <button 
              className="text-gray-400 hover:text-white transition-colors text-sm font-medium"
              onClick={() => toast.info('Brands coming soon!')}
            >
              Brands
            </button>
            <button 
              className="text-gray-400 hover:text-white transition-colors text-sm font-medium"
              onClick={() => navigate('/pricing')}
            >
              Membership
            </button>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            {/* Search - Hidden on mobile */}
            <button className="hidden sm:block p-2 text-gray-400 hover:text-white transition-colors">
              <Search className="w-5 h-5" />
            </button>

            {/* Trending */}
            <button className="relative group">
              <TrendingUp className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            </button>

            {/* Social */}
            <button 
              className="hidden sm:block"
              onClick={() => toast.info('Social features coming soon!')}
            >
              <Users className="w-5 h-5 text-gray-400 hover:text-white transition-colors" />
            </button>
            
            {/* Auth */}
            {isAuthenticated && user ? (
              <Button
                onClick={() => navigate('/account')}
                variant="ghost"
                size="sm"
                className="flex items-center gap-2 text-gray-400 hover:text-white"
              >
                <User className="w-5 h-5" />
                <span className="hidden sm:inline">{user.name.split(' ')[0]}</span>
              </Button>
            ) : (
              <Button
                onClick={() => navigate('/login')}
                size="sm"
                className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-medium"
              >
                <LogIn className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">Sign In</span>
              </Button>
            )}

            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden p-2 text-gray-400 hover:text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden border-t border-gray-800 py-4"
            >
              <div className="flex flex-col gap-4">
                <button 
                  className="text-left text-gray-400 hover:text-white transition-colors"
                  onClick={() => { navigate('/'); setMobileMenuOpen(false); }}
                >
                  Shop
                </button>
                <button 
                  className="text-left text-gray-400 hover:text-white transition-colors"
                  onClick={() => { toast.info('Collections coming soon!'); setMobileMenuOpen(false); }}
                >
                  Collections
                </button>
                <button 
                  className="text-left text-gray-400 hover:text-white transition-colors"
                  onClick={() => { toast.info('Brands coming soon!'); setMobileMenuOpen(false); }}
                >
                  Brands
                </button>
                <button 
                  className="text-left text-gray-400 hover:text-white transition-colors"
                  onClick={() => { navigate('/pricing'); setMobileMenuOpen(false); }}
                >
                  Membership
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};