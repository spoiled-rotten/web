import { loadStripe, Stripe } from '@stripe/stripe-js';

let stripePromise: Promise<Stripe | null>;

export const getStripe = () => {
  if (!stripePromise) {
    const publishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
    
    if (!publishableKey) {
      console.error('Stripe publishable key not found. Please set VITE_STRIPE_PUBLISHABLE_KEY in your .env file');
      return Promise.resolve(null);
    }
    
    stripePromise = loadStripe(publishableKey);
  }
  
  return stripePromise;
};

export interface CheckoutItem {
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export const createCheckoutSession = async (items: CheckoutItem[]) => {
  try {
    // In a real app, this would call your backend API
    // For demo purposes, we'll create a client-side checkout
    const stripe = await getStripe();
    
    if (!stripe) {
      throw new Error('Stripe not initialized');
    }

    // Format items for Stripe
    const lineItems = items.map(item => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
          images: item.image ? [item.image] : [],
        },
        unit_amount: Math.round(item.price * 100), // Convert to cents
      },
      quantity: item.quantity,
    }));

    // For demo purposes, return formatted data
    // In production, this would redirect to Stripe Checkout
    return {
      success: true,
      items: lineItems,
      total: items.reduce((sum, item) => sum + (item.price * item.quantity), 0),
    };
  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw error;
  }
};