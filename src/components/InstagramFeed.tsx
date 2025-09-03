import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Masonry from 'react-masonry-css';
import { useCart } from '@/contexts/CartContext';
import { useAIPreference, FashionItem } from '@/contexts/AIPreferenceContext';
import { useAuth } from '@/contexts/AuthContext';
import { useInView } from 'react-intersection-observer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LotusLogo } from '@/components/LotusLogo';
import { toast } from 'sonner';
import { 
  Heart, ShoppingBag, Bookmark, Eye, TrendingUp, 
  Users, Crown, Sparkles, Star, Share2, User, LogIn
} from 'lucide-react';

// Generate more sample items
const generateFashionItems = (): FashionItem[] => {
  const brands = ['Balenciaga', 'Gucci', 'Chanel', 'Versace', 'Prada', 'Louis Vuitton', 'Hermès', 'Dior', 'Fendi', 'Bottega Veneta'];
  const categories = ['Bags', 'Shoes', 'Dresses', 'Outerwear', 'Accessories', 'Jewelry', 'Watches'];
  const images = [
    'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400',
    'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400', 
    'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=400',
    'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400',
    'https://images.unsplash.com/photo-1556306535-38febf6782e7?w=400',
    'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400',
    'https://images.unsplash.com/photo-1609803384069-b2884e3b5a3d?w=400',
    'https://images.unsplash.com/photo-1511556820780-d912e42b4980?w=400',
    'https://images.unsplash.com/photo-1603487742131-4160c3b8d604?w=400',
    'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400',
    'https://images.unsplash.com/photo-1588099768523-f4e6a5679d88?w=400',
    'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400',
    'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=400',
    'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400',
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
  ];

  const items: FashionItem[] = [];
  for (let i = 0; i < 30; i++) {
    items.push({
      id: `item-${i}`,
      name: `${categories[i % categories.length]} Collection ${i + 1}`,
      brand: brands[i % brands.length],
      price: Math.floor(Math.random() * 10000) + 500,
      image: images[i % images.length] + `&q=80&h=${400 + Math.random() * 200}`,
      category: categories[i % categories.length],
      tags: ['luxury', 'trending', 'new'],
      trendingScore: Math.floor(Math.random() * 100),
      likes: Math.floor(Math.random() * 50000),
      socialProof: {
        recentBuyers: ['@fashionista', '@luxurylife'],
        comments: Math.floor(Math.random() * 1000),
        shares: Math.floor(Math.random() * 500),
      }
    });
  }
  return items;
};

export const InstagramFeed = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { updatePreference } = useAIPreference();
  const { user, isAuthenticated } = useAuth();
  const [items, setItems] = useState<FashionItem[]>([]);
  const [likedItems, setLikedItems] = useState<Set<string>>(new Set());
  const [savedItems, setSavedItems] = useState<Set<string>>(new Set());
  const [page, setPage] = useState(1);
  const { ref, inView } = useInView({ threshold: 0 });

  // Load initial items
  useEffect(() => {
    setItems(generateFashionItems());
  }, []);

  // Infinite scroll
  useEffect(() => {
    if (inView && page < 5) {
      setTimeout(() => {
        setItems(prev => [...prev, ...generateFashionItems()]);
        setPage(prev => prev + 1);
      }, 500);
    }
  }, [inView, page]);

  const handleLike = useCallback((item: FashionItem, e: React.MouseEvent) => {
    e.stopPropagation();
    const newLikedItems = new Set(likedItems);
    
    if (likedItems.has(item.id)) {
      newLikedItems.delete(item.id);
      updatePreference(item, 'dislike');
    } else {
      newLikedItems.add(item.id);
      updatePreference(item, 'like');
      
      // Animate heart
      toast(
        <div className="flex items-center gap-2">
          <Heart className="w-4 h-4 text-red-500 fill-red-500" />
          <span>Liked {item.name}</span>
        </div>,
        { duration: 2000 }
      );
    }
    
    setLikedItems(newLikedItems);
  }, [likedItems, updatePreference]);

  const handleSave = useCallback((item: FashionItem, e: React.MouseEvent) => {
    e.stopPropagation();
    const newSavedItems = new Set(savedItems);
    
    if (savedItems.has(item.id)) {
      newSavedItems.delete(item.id);
    } else {
      newSavedItems.add(item.id);
      updatePreference(item, 'save');
      toast.success(`Saved for later!`);
    }
    
    setSavedItems(newSavedItems);
  }, [savedItems, updatePreference]);

  const handleAddToCart = useCallback((item: FashionItem, e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      category: item.category,
    });
    updatePreference(item, 'buy');
    
    toast.success(
      <div className="flex items-center gap-2">
        <ShoppingBag className="w-4 h-4 text-green-500" />
        <span>Added to cart!</span>
      </div>
    );
  }, [addToCart, updatePreference]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatLikes = (likes: number) => {
    if (likes >= 1000000) return `${(likes / 1000000).toFixed(1)}M`;
    if (likes >= 1000) return `${(likes / 1000).toFixed(1)}k`;
    return likes.toString();
  };

  // Responsive breakpoints
  const breakpointColumns = {
    default: 5,
    1536: 4,
    1280: 3,
    1024: 3,
    768: 2,
    640: 1,
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-black/90 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-screen-2xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <LotusLogo size={28} variant="gradient" />
              <div>
                <h1 className="text-xl font-bold tracking-wider">
                  <span className="text-white">SPOILED</span>{' '}
                  <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">ROTTEN</span>
                </h1>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <button className="relative group">
                <TrendingUp className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              </button>
              <button className="group" onClick={() => toast.info('Social features coming soon!')}>
                <Users className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
              </button>
              
              {/* Auth Navigation */}
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
                  <LogIn className="w-4 h-4 mr-2" />
                  Sign In
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Masonry Grid */}
      <div className="max-w-screen-2xl mx-auto p-4">
        <Masonry
          breakpointCols={breakpointColumns}
          className="masonry-grid"
          columnClassName="masonry-grid-column"
        >
          {items.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-4"
            >
              <Card className="group relative overflow-hidden bg-gray-950 border-gray-800 hover:border-gray-700 transition-all duration-300 cursor-pointer">
                {/* Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  
                  {/* Gradient Overlay on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Trending Badge */}
                  {item.trendingScore > 80 && (
                    <div className="absolute top-2 left-2 bg-gradient-to-r from-orange-500 to-red-500 px-2 py-1 rounded-full">
                      <span className="text-xs text-white font-bold flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        HOT
                      </span>
                    </div>
                  )}
                  
                  {/* Quick Actions - Always Visible on Mobile, Hover on Desktop */}
                  <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => handleLike(item, e)}
                      className={`p-3 rounded-full backdrop-blur-md transition-all ${
                        likedItems.has(item.id) 
                          ? 'bg-red-500/80 text-white' 
                          : 'bg-white/20 text-white hover:bg-white/30'
                      }`}
                    >
                      <Heart className={`w-5 h-5 ${likedItems.has(item.id) ? 'fill-current' : ''}`} />
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => handleAddToCart(item, e)}
                      className="p-3 bg-green-500/80 text-white rounded-full backdrop-blur-md hover:bg-green-500/90 transition-all"
                    >
                      <ShoppingBag className="w-5 h-5" />
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => handleSave(item, e)}
                      className={`p-3 rounded-full backdrop-blur-md transition-all ${
                        savedItems.has(item.id)
                          ? 'bg-blue-500/80 text-white'
                          : 'bg-white/20 text-white hover:bg-white/30'
                      }`}
                    >
                      <Bookmark className={`w-5 h-5 ${savedItems.has(item.id) ? 'fill-current' : ''}`} />
                    </motion.button>
                  </div>
                  
                  {/* Stats Overlay */}
                  <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-white text-xs">
                      <Heart className="w-3 h-3" />
                      <span>{formatLikes(item.likes)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-white text-xs">
                      <Eye className="w-3 h-3" />
                      <span>{formatLikes(item.socialProof?.comments || 0)}</span>
                    </div>
                  </div>
                </div>

                {/* Item Info */}
                <div className="p-3">
                  <p className="text-xs text-purple-400 font-medium">{item.brand}</p>
                  <h3 className="font-medium text-white text-sm mt-1 line-clamp-1">{item.name}</h3>
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-lg font-bold text-emerald-400">
                      {formatPrice(item.price)}
                    </p>
                    <div className="flex -space-x-2">
                      {[1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 border-2 border-black"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </Masonry>

        {/* Infinite Scroll Trigger */}
        <div ref={ref} className="h-20 flex items-center justify-center">
          {page < 5 && (
            <div className="flex items-center gap-2 text-gray-400">
              <Sparkles className="w-4 h-4 animate-spin" />
              <span>Loading more luxury items...</span>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .masonry-grid {
          display: flex;
          margin-left: -16px;
          width: auto;
        }
        .masonry-grid-column {
          padding-left: 16px;
          background-clip: padding-box;
        }
      `}</style>
    </div>
  );
};