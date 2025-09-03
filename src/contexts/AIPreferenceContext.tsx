import React, { createContext, useContext, useState, useEffect } from 'react';

export interface FashionItem {
  id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  category: string;
  tags: string[];
  trendingScore: number;
  likes: number;
  userEngagement?: {
    liked?: boolean;
    saved?: boolean;
    shared?: boolean;
  };
  socialProof?: {
    recentBuyers?: string[];
    comments?: number;
    shares?: number;
  };
}

interface UserPreference {
  brands: Record<string, number>;
  categories: Record<string, number>;
  priceRange: { min: number; max: number };
  styles: Record<string, number>;
  colors: Record<string, number>;
  tags: Record<string, number>;
}

interface AIPreferenceContextType {
  preferences: UserPreference;
  trainingData: Array<{ itemId: string; action: 'like' | 'dislike' | 'buy' | 'save'; timestamp: Date }>;
  updatePreference: (item: FashionItem, action: 'like' | 'dislike' | 'buy' | 'save') => void;
  getRecommendationScore: (item: FashionItem) => number;
  getSimilarItems: (item: FashionItem, items: FashionItem[]) => FashionItem[];
  getTrendingItems: (items: FashionItem[]) => FashionItem[];
  resetPreferences: () => void;
}

const AIPreferenceContext = createContext<AIPreferenceContextType | undefined>(undefined);

const initialPreferences: UserPreference = {
  brands: {},
  categories: {},
  priceRange: { min: 0, max: 100000 },
  styles: {},
  colors: {},
  tags: {},
};

export const AIPreferenceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [preferences, setPreferences] = useState<UserPreference>(initialPreferences);
  const [trainingData, setTrainingData] = useState<Array<{ itemId: string; action: 'like' | 'dislike' | 'buy' | 'save'; timestamp: Date }>>([]);

  // Load preferences from localStorage
  useEffect(() => {
    const savedPreferences = localStorage.getItem('spoiledRottenAIPreferences');
    const savedTrainingData = localStorage.getItem('spoiledRottenTrainingData');
    
    if (savedPreferences) {
      try {
        setPreferences(JSON.parse(savedPreferences));
      } catch (error) {
        console.error('Failed to load AI preferences:', error);
      }
    }
    
    if (savedTrainingData) {
      try {
        const data = JSON.parse(savedTrainingData);
        setTrainingData(data.map((d: { itemId: string; action: string; timestamp: string }) => ({ 
          itemId: d.itemId,
          action: d.action as 'like' | 'dislike' | 'buy' | 'save',
          timestamp: new Date(d.timestamp) 
        })));
      } catch (error) {
        console.error('Failed to load training data:', error);
      }
    }
  }, []);

  // Save preferences to localStorage
  useEffect(() => {
    localStorage.setItem('spoiledRottenAIPreferences', JSON.stringify(preferences));
    localStorage.setItem('spoiledRottenTrainingData', JSON.stringify(trainingData));
  }, [preferences, trainingData]);

  const updatePreference = (item: FashionItem, action: 'like' | 'dislike' | 'buy' | 'save') => {
    // Record training data
    setTrainingData(prev => [...prev, { itemId: item.id, action, timestamp: new Date() }]);

    // Update preferences based on action
    const weight = action === 'buy' ? 3 : action === 'like' ? 2 : action === 'save' ? 1.5 : -1;
    
    setPreferences(prev => {
      const newPrefs = { ...prev };
      
      // Update brand preference
      newPrefs.brands[item.brand] = (newPrefs.brands[item.brand] || 0) + weight;
      
      // Update category preference
      newPrefs.categories[item.category] = (newPrefs.categories[item.category] || 0) + weight;
      
      // Update price range preference
      if (action === 'like' || action === 'buy') {
        const currentMin = newPrefs.priceRange.min;
        const currentMax = newPrefs.priceRange.max;
        newPrefs.priceRange = {
          min: Math.min(currentMin, item.price * 0.7),
          max: Math.max(currentMax, item.price * 1.3),
        };
      }
      
      // Update tag preferences
      item.tags.forEach(tag => {
        newPrefs.tags[tag] = (newPrefs.tags[tag] || 0) + weight;
      });
      
      return newPrefs;
    });
  };

  const getRecommendationScore = (item: FashionItem): number => {
    let score = 0;
    
    // Brand affinity
    score += (preferences.brands[item.brand] || 0) * 10;
    
    // Category preference
    score += (preferences.categories[item.category] || 0) * 8;
    
    // Price range fit
    if (item.price >= preferences.priceRange.min && item.price <= preferences.priceRange.max) {
      score += 20;
    }
    
    // Tag relevance
    item.tags.forEach(tag => {
      score += (preferences.tags[tag] || 0) * 5;
    });
    
    // Trending bonus
    score += item.trendingScore * 2;
    
    // Social proof
    score += Math.log(item.likes + 1) * 3;
    
    return Math.max(0, score);
  };

  const getSimilarItems = (targetItem: FashionItem, items: FashionItem[]): FashionItem[] => {
    return items
      .filter(item => item.id !== targetItem.id)
      .map(item => {
        let similarity = 0;
        
        // Same brand
        if (item.brand === targetItem.brand) similarity += 30;
        
        // Same category
        if (item.category === targetItem.category) similarity += 25;
        
        // Price similarity (within 30%)
        const priceDiff = Math.abs(item.price - targetItem.price) / targetItem.price;
        if (priceDiff < 0.3) similarity += 20 * (1 - priceDiff);
        
        // Tag overlap
        const commonTags = item.tags.filter(tag => targetItem.tags.includes(tag));
        similarity += commonTags.length * 10;
        
        return { ...item, similarity };
      })
      .sort((a, b) => (b as any).similarity - (a as any).similarity)
      .slice(0, 10);
  };

  const getTrendingItems = (items: FashionItem[]): FashionItem[] => {
    return items
      .sort((a, b) => {
        // Combine trending score with recent engagement
        const aScore = a.trendingScore * 0.6 + (a.likes / 1000) * 0.4;
        const bScore = b.trendingScore * 0.6 + (b.likes / 1000) * 0.4;
        return bScore - aScore;
      })
      .slice(0, 20);
  };

  const resetPreferences = () => {
    setPreferences(initialPreferences);
    setTrainingData([]);
    localStorage.removeItem('spoiledRottenAIPreferences');
    localStorage.removeItem('spoiledRottenTrainingData');
  };

  return (
    <AIPreferenceContext.Provider value={{
      preferences,
      trainingData,
      updatePreference,
      getRecommendationScore,
      getSimilarItems,
      getTrendingItems,
      resetPreferences,
    }}>
      {children}
    </AIPreferenceContext.Provider>
  );
};

export const useAIPreference = () => {
  const context = useContext(AIPreferenceContext);
  if (context === undefined) {
    throw new Error('useAIPreference must be used within an AIPreferenceProvider');
  }
  return context;
};