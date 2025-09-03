import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { createCheckoutSession } from '@/lib/stripe';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CreditCard, ShoppingBag, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose }) => {
  const { items, totalAmount, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    cardNumber: '4242 4242 4242 4242', // Test card number
    expiry: '12/25',
    cvc: '123',
    name: '',
  });

  const handleCheckout = async () => {
    if (!formData.email || !formData.name) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsProcessing(true);

    try {
      // Simulate API call
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
        
        // Show success message
        toast.success(
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span>Payment successful! You're officially SPOILED! 👑</span>
          </div>
        );
        
        // Clear cart after successful payment
        setTimeout(() => {
          clearCart();
          onClose();
          setPaymentSuccess(false);
        }, 3000);
      }
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error(
        <div className="flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-500" />
          <span>Payment failed. Please try again.</span>
        </div>
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  if (paymentSuccess) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md luxury-card border-green-500/30">
          <div className="flex flex-col items-center justify-center py-8">
            <CheckCircle className="w-16 h-16 text-green-500 mb-4 animate-bounce" />
            <DialogTitle className="text-2xl mb-2">Payment Successful!</DialogTitle>
            <DialogDescription className="text-center">
              Congratulations! You've been successfully spoiled. 
              Your luxury items are on their way! 🎉
            </DialogDescription>
            <div className="mt-4 text-3xl font-bold text-green-400">
              {formatAmount(totalAmount)}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg luxury-card">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            <CreditCard className="w-6 h-6 text-purple-400" />
            Checkout
          </DialogTitle>
          <DialogDescription>
            Complete your luxury purchase and get SPOILED!
          </DialogDescription>
        </DialogHeader>

        {/* Order Summary */}
        <div className="border border-white/10 rounded-xl p-4 mb-4 bg-white/5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-gray-400">Order Summary</span>
            <ShoppingBag className="w-4 h-4 text-gray-400" />
          </div>
          <div className="space-y-2">
            {items.map(item => (
              <div key={item.id} className="flex justify-between text-sm">
                <span>{item.name} x{item.quantity}</span>
                <span className="text-emerald-400">{formatAmount(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-white/10 mt-3 pt-3">
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span className="text-xl text-emerald-400">{formatAmount(totalAmount)}</span>
            </div>
          </div>
        </div>

        {/* Payment Form */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="spoiled@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="bg-white/5 border-white/20"
            />
          </div>

          <div>
            <Label htmlFor="name">Cardholder Name</Label>
            <Input
              id="name"
              placeholder="Spoiled Rotten"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="bg-white/5 border-white/20"
            />
          </div>

          <div>
            <Label htmlFor="card">Card Number</Label>
            <div className="relative">
              <Input
                id="card"
                placeholder="4242 4242 4242 4242"
                value={formData.cardNumber}
                onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                className="bg-white/5 border-white/20 pl-10"
                disabled
              />
              <CreditCard className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            </div>
            <p className="text-xs text-gray-400 mt-1">Using test card for demo</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="expiry">Expiry Date</Label>
              <Input
                id="expiry"
                placeholder="MM/YY"
                value={formData.expiry}
                onChange={(e) => setFormData({ ...formData, expiry: e.target.value })}
                className="bg-white/5 border-white/20"
                disabled
              />
            </div>
            <div>
              <Label htmlFor="cvc">CVC</Label>
              <Input
                id="cvc"
                placeholder="123"
                value={formData.cvc}
                onChange={(e) => setFormData({ ...formData, cvc: e.target.value })}
                className="bg-white/5 border-white/20"
                disabled
              />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="ghost"
            onClick={onClose}
            disabled={isProcessing}
            className="mr-2"
          >
            Cancel
          </Button>
          <Button
            variant="luxury"
            onClick={handleCheckout}
            disabled={isProcessing || items.length === 0}
            className="min-w-[150px]"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <CreditCard className="w-4 h-4 mr-2" />
                Pay {formatAmount(totalAmount)}
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};