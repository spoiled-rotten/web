import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/contexts/CartContext';
import { createCheckoutSession } from '@/lib/stripe';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SpoiledRottenLogo } from '@/components/SpoiledRottenLogo';
import { 
  CreditCard, ShoppingBag, Loader2, CheckCircle, 
  X, Trash2, Plus, Minus, Lock, Shield, ArrowRight
} from 'lucide-react';
import { toast } from 'sonner';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose }) => {
  const { items, totalAmount, clearCart, removeFromCart, updateQuantity } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    cardNumber: '4242 4242 4242 4242',
    expiry: '12/25',
    cvc: '123',
    name: '',
    address: '',
    city: '',
    zip: '',
  });

  // Handle Escape key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  const handleCheckout = async () => {
    if (!formData.email || !formData.name) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsProcessing(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const checkoutItems = items.map(item => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
      }));

      const result = await createCheckoutSession(checkoutItems);
      
      if (result.success) {
        setPaymentSuccess(true);
        
        toast.success(
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span>Payment successful! You're officially SPOILED! 👑</span>
          </div>
        );
        
        setTimeout(() => {
          clearCart();
          onClose();
          setPaymentSuccess(false);
        }, 3000);
      }
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const shipping = totalAmount > 500 ? 0 : 25;
  const tax = totalAmount * 0.08;
  const grandTotal = totalAmount + shipping + tax;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black"
        >
          {/* Full-screen checkout */}
          <div className="h-full overflow-hidden">
            {/* Header */}
            <div className="border-b border-gray-800 bg-gray-950/50 backdrop-blur-xl">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <SpoiledRottenLogo size="md" variant="gradient" showLotus={true} />
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    <X className="w-6 h-6 text-gray-400" />
                  </button>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="h-[calc(100vh-73px)] overflow-y-auto">
              {paymentSuccess ? (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex flex-col items-center justify-center h-full"
                >
                  <CheckCircle className="w-24 h-24 text-green-500 mb-6 animate-bounce" />
                  <h2 className="text-4xl font-bold mb-4">You're Spoiled Rotten!</h2>
                  <p className="text-xl text-gray-400 mb-2">Order confirmed</p>
                  <div className="text-4xl font-bold text-yellow-400">
                    {formatAmount(grandTotal)}
                  </div>
                  <p className="text-gray-500 mt-4">Check your email for order details</p>
                </motion.div>
              ) : (
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                    {/* Left - Cart Items & Form */}
                    <div className="space-y-6">
                      {/* Cart Items */}
                      <div>
                        <h2 className="text-2xl font-bold mb-6">Shopping Bag ({items.length})</h2>
                        <div className="space-y-4">
                          {items.map(item => (
                            <motion.div
                              key={item.id}
                              layout
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, x: -100 }}
                              className="bg-gray-900 rounded-lg p-4 flex items-center gap-4"
                            >
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-20 h-20 object-cover rounded-lg"
                              />
                              <div className="flex-1">
                                <h3 className="font-medium text-white">{item.name}</h3>
                                <p className="text-gray-400 text-sm">{item.category}</p>
                                <p className="text-yellow-400 font-bold mt-1">
                                  {formatAmount(item.price)}
                                </p>
                              </div>
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                  className="p-1 rounded hover:bg-gray-800"
                                >
                                  <Minus className="w-4 h-4" />
                                </button>
                                <span className="w-8 text-center">{item.quantity}</span>
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="p-1 rounded hover:bg-gray-800"
                                >
                                  <Plus className="w-4 h-4" />
                                </button>
                              </div>
                              <button
                                onClick={() => removeFromCart(item.id)}
                                className="p-2 rounded hover:bg-gray-800 text-red-400"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Shipping Form */}
                      <div>
                        <h2 className="text-2xl font-bold mb-6">Shipping Information</h2>
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="email">Email*</Label>
                              <Input
                                id="email"
                                type="email"
                                placeholder="spoiled@example.com"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="mt-1 bg-gray-900 border-gray-800 focus:border-yellow-500"
                              />
                            </div>
                            <div>
                              <Label htmlFor="name">Full Name*</Label>
                              <Input
                                id="name"
                                placeholder="Your Name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="mt-1 bg-gray-900 border-gray-800 focus:border-yellow-500"
                              />
                            </div>
                          </div>
                          <div>
                            <Label htmlFor="address">Address</Label>
                            <Input
                              id="address"
                              placeholder="123 Luxury Lane"
                              value={formData.address}
                              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                              className="mt-1 bg-gray-900 border-gray-800 focus:border-yellow-500"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="city">City</Label>
                              <Input
                                id="city"
                                placeholder="Beverly Hills"
                                value={formData.city}
                                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                className="mt-1 bg-gray-900 border-gray-800 focus:border-yellow-500"
                              />
                            </div>
                            <div>
                              <Label htmlFor="zip">ZIP Code</Label>
                              <Input
                                id="zip"
                                placeholder="90210"
                                value={formData.zip}
                                onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                                className="mt-1 bg-gray-900 border-gray-800 focus:border-yellow-500"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Payment */}
                      <div>
                        <h2 className="text-2xl font-bold mb-6">Payment</h2>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="card">Card Number</Label>
                            <div className="relative mt-1">
                              <Input
                                id="card"
                                placeholder="4242 4242 4242 4242"
                                value={formData.cardNumber}
                                onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                                className="pl-10 bg-gray-900 border-gray-800 focus:border-yellow-500"
                                disabled
                              />
                              <CreditCard className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Test mode - Card details pre-filled</p>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="expiry">Expiry</Label>
                              <Input
                                id="expiry"
                                placeholder="MM/YY"
                                value={formData.expiry}
                                className="mt-1 bg-gray-900 border-gray-800"
                                disabled
                              />
                            </div>
                            <div>
                              <Label htmlFor="cvc">CVC</Label>
                              <Input
                                id="cvc"
                                placeholder="123"
                                value={formData.cvc}
                                className="mt-1 bg-gray-900 border-gray-800"
                                disabled
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right - Order Summary */}
                    <div className="lg:sticky lg:top-0">
                      <div className="bg-gray-900 rounded-xl p-6 space-y-4">
                        <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
                        
                        {/* Items */}
                        <div className="space-y-3 pb-4 border-b border-gray-800">
                          {items.map(item => (
                            <div key={item.id} className="flex justify-between text-sm">
                              <span className="text-gray-400">
                                {item.name} × {item.quantity}
                              </span>
                              <span className="text-white">
                                {formatAmount(item.price * item.quantity)}
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* Totals */}
                        <div className="space-y-3 pb-4 border-b border-gray-800">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Subtotal</span>
                            <span>{formatAmount(totalAmount)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Shipping</span>
                            <span className={shipping === 0 ? "text-green-400" : ""}>
                              {shipping === 0 ? "FREE" : formatAmount(shipping)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Tax</span>
                            <span>{formatAmount(tax)}</span>
                          </div>
                        </div>

                        {/* Grand Total */}
                        <div className="flex justify-between items-center text-xl font-bold">
                          <span>Total</span>
                          <span className="text-yellow-400">{formatAmount(grandTotal)}</span>
                        </div>

                        {/* Security badges */}
                        <div className="flex items-center justify-center gap-4 py-4 text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <Lock className="w-3 h-3" />
                            Secure
                          </div>
                          <div className="flex items-center gap-1">
                            <Shield className="w-3 h-3" />
                            Protected
                          </div>
                        </div>

                        {/* Pay Button */}
                        <Button
                          onClick={handleCheckout}
                          disabled={isProcessing || items.length === 0}
                          className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-bold py-6 text-lg"
                        >
                          {isProcessing ? (
                            <>
                              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                              Processing...
                            </>
                          ) : (
                            <>
                              Complete Order
                              <ArrowRight className="w-5 h-5 ml-2" />
                            </>
                          )}
                        </Button>

                        {shipping === 0 && (
                          <p className="text-center text-sm text-green-400">
                            ✨ You qualified for FREE shipping!
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};