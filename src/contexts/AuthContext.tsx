import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  subscription?: {
    plan: 'starter' | 'premium' | 'elite';
    subscribedAt: string;
    isYearly: boolean;
  };
  preferences?: {
    brands: string[];
    categories: string[];
    priceRange: { min: number; max: number };
  };
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
  updateSubscription: (plan: string, isYearly: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('spoiledRottenUser');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Failed to load user:', error);
      }
    }
    setIsLoading(false);
  }, []);

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('spoiledRottenUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('spoiledRottenUser');
    }
  }, [user]);

  const login = async (email: string, password: string) => {
    // Simulate API call
    setIsLoading(true);
    
    try {
      // In production, this would be an actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo, accept any email/password
      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        name: email.split('@')[0],
        createdAt: new Date().toISOString(),
      };
      
      setUser(newUser);
      
      toast.success('Welcome back to luxury!');
      
      // Redirect based on subscription status
      if (!newUser.subscription) {
        navigate('/pricing');
      } else {
        navigate('/');
      }
    } catch (error) {
      toast.error('Invalid email or password');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, password: string, name: string) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        name,
        createdAt: new Date().toISOString(),
      };
      
      setUser(newUser);
      
      toast.success('Welcome to SpoiledRotten!');
      
      // Redirect to pricing after signup
      navigate('/pricing');
    } catch (error) {
      toast.error('Signup failed. Please try again.');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('spoiledRottenUser');
    localStorage.removeItem('spoiledRottenAIPreferences');
    localStorage.removeItem('spoiledRottenCart');
    toast.success('See you soon!');
    navigate('/login');
  };

  const updateProfile = (updates: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...updates });
      toast.success('Profile updated!');
    }
  };

  const updateSubscription = (plan: string, isYearly: boolean) => {
    if (user) {
      setUser({
        ...user,
        subscription: {
          plan: plan as 'starter' | 'premium' | 'elite',
          subscribedAt: new Date().toISOString(),
          isYearly,
        }
      });
      toast.success(`Upgraded to ${plan.toUpperCase()} plan!`);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      isLoading,
      login,
      signup,
      logout,
      updateProfile,
      updateSubscription,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};