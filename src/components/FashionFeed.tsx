import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TinderCard from 'react-tinder-card';
import { useCart } from '@/contexts/CartContext';
import { useAIPreference, FashionItem } from '@/contexts/AIPreferenceContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { 
  Heart, X, ShoppingBag, Bookmark, Share2, MessageCircle, 
  TrendingUp, Users, Sparkles, Fire, Crown
} from 'lucide-react';

// Sample fashion items - in production, these would come from an API
const sampleFashionItems: FashionItem[] = [
  {
    id: '1',
    name: 'Oversized Blazer',
    brand: 'Balenciaga',
    price: 2890,
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800',
    category: 'Outerwear',
    tags: ['streetwear', 'oversized', 'luxury', 'trending'],
    trendingScore: 95,
    likes: 12500,
    socialProof: {
      recentBuyers: ['@fashionista', '@luxurylife', '@styleicon'],
      comments: 234,
      shares: 89,
    }
  },
  {
    id: '2',
    name: 'Chain Shoulder Bag',
    brand: 'Chanel',
    price: 5500,
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800',
    category: 'Bags',
    tags: ['classic', 'timeless', 'investment', 'iconic'],
    trendingScore: 88,
    likes: 28900,
    socialProof: {
      recentBuyers: ['@bagaddict', '@chanellover'],
      comments: 567,
      shares: 234,
    }
  },
  {
    id: '3',
    name: 'Triple S Sneakers',
    brand: 'Balenciaga',
    price: 1190,
    image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=800',
    category: 'Footwear',
    tags: ['chunky', 'streetwear', 'statement', 'comfort'],
    trendingScore: 92,
    likes: 18700,
    socialProof: {
      recentBuyers: ['@sneakerhead', '@hypebeast'],
      comments: 445,
      shares: 178,
    }
  },
  {
    id: '4',
    name: 'Silk Scarf Print Dress',
    brand: 'Versace',
    price: 3200,
    image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800',
    category: 'Dresses',
    tags: ['elegant', 'print', 'silk', 'evening'],
    trendingScore: 78,
    likes: 9800,
    socialProof: {
      recentBuyers: ['@elegantqueen', '@versacelove'],
      comments: 123,
      shares: 67,
    }
  },
  {
    id: '5',
    name: 'Logo Belt',
    brand: 'Gucci',
    price: 650,
    image: 'https://images.unsplash.com/photo-1556306535-38febf6782e7?w=800',
    category: 'Accessories',
    tags: ['logo', 'statement', 'leather', 'classic'],
    trendingScore: 85,
    likes: 15600,
    socialProof: {
      recentBuyers: ['@guccigang', '@luxuryaccessories'],
      comments: 234,
      shares: 89,
    }
  },
];

export const FashionFeed = () => {
  const { addToCart } = useCart();
  const { updatePreference, getRecommendationScore, getTrendingItems } = useAIPreference();
  const [items, setItems] = useState<FashionItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lastDirection, setLastDirection] = useState<string | null>(null);

  useEffect(() => {
    // In production, fetch items from API based on AI preferences
    const scoredItems = sampleFashionItems.map(item => ({
      ...item,
      recommendationScore: getRecommendationScore(item),
    }));
    
    // Sort by recommendation score and trending
    const sortedItems = scoredItems.sort((a, b) => 
      (b as any).recommendationScore + b.trendingScore - ((a as any).recommendationScore + a.trendingScore)
    );
    
    setItems(sortedItems);
  }, [getRecommendationScore]);

  const swiped = (direction: string, item: FashionItem, index: number) => {
    setLastDirection(direction);
    setCurrentIndex(index + 1);

    if (direction === 'right') {
      // Liked
      updatePreference(item, 'like');
      toast.success(
        <div className="flex items-center gap-2">
          <Heart className="w-4 h-4 text-red-500" />
          <span>Liked {item.name}!</span>
        </div>
      );
    } else if (direction === 'left') {
      // Disliked
      updatePreference(item, 'dislike');
    } else if (direction === 'up') {
      // Super liked - add to cart
      updatePreference(item, 'buy');
      addToCart({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        category: item.category,
      });
      toast.success(
        <div className="flex items-center gap-2">
          <ShoppingBag className="w-4 h-4 text-green-500" />
          <span>Added {item.name} to cart!</span>
        </div>
      );
    } else if (direction === 'down') {
      // Saved for later
      updatePreference(item, 'save');
      toast.success(
        <div className="flex items-center gap-2">
          <Bookmark className="w-4 h-4 text-blue-500" />
          <span>Saved {item.name} for later!</span>
        </div>
      );
    }
  };

  const outOfFrame = (name: string, idx: number) => {
    console.log(`${name} (${idx}) left the screen!`);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-950/20 to-black">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-black/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Crown className="w-8 h-8 text-yellow-400" />
              <div>
                <h1 className="text-xl font-bold">SpoiledRotten</h1>
                <p className="text-xs text-gray-400">AI Fashion Discovery</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="gap-2">
                <Fire className="w-4 h-4 text-orange-500" />
                <span className="hidden sm:inline">Trending</span>
              </Button>
              <Button variant="ghost" size="sm" className="gap-2">
                <Users className="w-4 h-4 text-blue-500" />
                <span className="hidden sm:inline">Following</span>
              </Button>
              <Button variant="ghost" size="sm" className="gap-2">
                <Sparkles className="w-4 h-4 text-purple-500" />
                <span className="hidden sm:inline">For You</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Feed Container */}
      <div className="max-w-lg mx-auto px-4 py-8">
        <div className="relative h-[600px]">
          {items.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-400">Loading your personalized feed...</p>
            </div>
          ) : (
            <AnimatePresence>
              {items.map((item, index) => (
                <TinderCard
                  key={item.id}
                  onSwipe={(dir) => swiped(dir, item, index)}
                  onCardLeftScreen={() => outOfFrame(item.name, index)}
                  preventSwipe={['']}>
                  <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    className="absolute w-full"
                  >
                    <Card className="luxury-card overflow-hidden backdrop-blur-xl bg-black/90 border-white/20">
                      {/* Image */}
                      <div className="relative h-[400px] overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                        
                        {/* Trending Badge */}
                        {item.trendingScore > 90 && (
                          <div className="absolute top-4 left-4 bg-gradient-to-r from-orange-500 to-red-500 px-3 py-1 rounded-full flex items-center gap-1">
                            <TrendingUp className="w-3 h-3 text-white" />
                            <span className="text-xs text-white font-bold">HOT</span>
                          </div>
                        )}
                        
                        {/* Social Proof */}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4">
                          <div className="flex items-center gap-2 text-xs text-white/80 mb-2">
                            <Users className="w-3 h-3" />
                            <span>{item.socialProof?.recentBuyers?.slice(0, 2).join(', ')} bought this</span>
                          </div>
                        </div>
                      </div>

                      {/* Item Info */}
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <p className="text-sm text-purple-400 font-medium mb-1">{item.brand}</p>
                            <h3 className="text-xl font-bold text-white">{item.name}</h3>
                            <p className="text-2xl font-bold text-emerald-400 mt-2">
                              {formatPrice(item.price)}
                            </p>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            <div className="flex items-center gap-1">
                              <Heart className="w-4 h-4 text-red-500" />
                              <span className="text-sm text-gray-300">
                                {(item.likes / 1000).toFixed(1)}k
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MessageCircle className="w-4 h-4 text-blue-500" />
                              <span className="text-sm text-gray-300">
                                {item.socialProof?.comments}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {item.tags.map(tag => (
                            <span
                              key={tag}
                              className="px-2 py-1 bg-white/10 rounded-full text-xs text-gray-300"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>

                        {/* Action Buttons */}
                        <div className="grid grid-cols-4 gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="border border-red-500/30 hover:bg-red-500/20"
                            onClick={() => swiped('left', item, index)}
                          >
                            <X className="w-4 h-4 text-red-500" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="border border-blue-500/30 hover:bg-blue-500/20"
                            onClick={() => swiped('down', item, index)}
                          >
                            <Bookmark className="w-4 h-4 text-blue-500" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="border border-purple-500/30 hover:bg-purple-500/20"
                            onClick={() => swiped('right', item, index)}
                          >
                            <Heart className="w-4 h-4 text-purple-500" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="border border-green-500/30 hover:bg-green-500/20"
                            onClick={() => swiped('up', item, index)}
                          >
                            <ShoppingBag className="w-4 h-4 text-green-500" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                </TinderCard>
              ))}
            </AnimatePresence>
          )}
        </div>

        {/* Swipe Instructions */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-400 mb-2">Swipe to train your AI</p>
          <div className="flex justify-center gap-4 text-xs">
            <span className="flex items-center gap-1">
              <Heart className="w-3 h-3 text-purple-500" />
              Right: Like
            </span>
            <span className="flex items-center gap-1">
              <X className="w-3 h-3 text-red-500" />
              Left: Pass
            </span>
            <span className="flex items-center gap-1">
              <ShoppingBag className="w-3 h-3 text-green-500" />
              Up: Buy
            </span>
            <span className="flex items-center gap-1">
              <Bookmark className="w-3 h-3 text-blue-500" />
              Down: Save
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};