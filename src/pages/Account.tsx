import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LotusLogo } from '@/components/LotusLogo';
import { useAuth } from '@/contexts/AuthContext';
import { 
  User, Mail, Crown, Settings, LogOut, 
  Edit2, Save, X, Package, CreditCard,
  Calendar, Shield, Sparkles
} from 'lucide-react';
import { toast } from 'sonner';

export default function Account() {
  const navigate = useNavigate();
  const { user, logout, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleSave = () => {
    updateProfile(formData);
    setIsEditing(false);
  };

  const handleLogout = () => {
    logout();
  };

  const subscriptionBadge = () => {
    if (!user.subscription) return null;
    
    const colors = {
      starter: 'from-gray-600 to-gray-500',
      premium: 'from-purple-600 to-pink-600',
      elite: 'from-yellow-500 to-yellow-400',
    };

    return (
      <div className={`bg-gradient-to-r ${colors[user.subscription.plan]} text-white text-xs px-3 py-1 rounded-full font-bold uppercase`}>
        {user.subscription.plan}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Luxury gradient background */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-900/20 via-black to-pink-900/20" />
      
      {/* Header */}
      <div className="relative z-10">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <button onClick={() => navigate('/')} className="text-gray-400 hover:text-white">
                ← Back
              </button>
              <LotusLogo size={32} variant="gradient" />
            </div>
            <Button
              onClick={handleLogout}
              variant="ghost"
              className="text-gray-400 hover:text-white"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2 tracking-wider">
              <span className="text-white">YOUR</span>{' '}
              <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">PROFILE</span>
            </h1>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Profile Card */}
            <Card className="lg:col-span-2 bg-gray-950 border-gray-800">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Personal Information
                  </h2>
                  {!isEditing ? (
                    <Button
                      onClick={() => setIsEditing(true)}
                      variant="ghost"
                      size="sm"
                      className="text-gray-400 hover:text-white"
                    >
                      <Edit2 className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                  ) : (
                    <div className="flex gap-2">
                      <Button
                        onClick={handleSave}
                        size="sm"
                        className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black"
                      >
                        <Save className="w-4 h-4 mr-2" />
                        Save
                      </Button>
                      <Button
                        onClick={() => {
                          setIsEditing(false);
                          setFormData({
                            name: user.name,
                            email: user.email,
                          });
                        }}
                        variant="ghost"
                        size="sm"
                        className="text-gray-400 hover:text-white"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div>
                    <Label className="text-gray-400 mb-2 block">Name</Label>
                    {isEditing ? (
                      <Input
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="bg-gray-900 border-gray-800 text-white"
                      />
                    ) : (
                      <p className="text-white text-lg">{user.name}</p>
                    )}
                  </div>

                  <div>
                    <Label className="text-gray-400 mb-2 block">Email</Label>
                    {isEditing ? (
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="bg-gray-900 border-gray-800 text-white"
                      />
                    ) : (
                      <p className="text-white text-lg">{user.email}</p>
                    )}
                  </div>

                  <div>
                    <Label className="text-gray-400 mb-2 block">Member Since</Label>
                    <p className="text-white text-lg flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      {new Date(user.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Subscription Card */}
            <Card className="bg-gray-950 border-gray-800">
              <div className="p-6">
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <Crown className="w-5 h-5 text-yellow-400" />
                  Subscription
                </h2>

                {user.subscription ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Plan</span>
                      {subscriptionBadge()}
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Billing</span>
                      <span className="text-white">
                        {user.subscription.isYearly ? 'Yearly' : 'Monthly'}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Since</span>
                      <span className="text-white">
                        {new Date(user.subscription.subscribedAt).toLocaleDateString()}
                      </span>
                    </div>

                    <Button
                      onClick={() => navigate('/pricing')}
                      className="w-full bg-gray-800 hover:bg-gray-700 text-white mt-4"
                    >
                      <Sparkles className="w-4 h-4 mr-2" />
                      Upgrade Plan
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-gray-400 mb-4">No active subscription</p>
                    <Button
                      onClick={() => navigate('/pricing')}
                      className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black"
                    >
                      <Crown className="w-4 h-4 mr-2" />
                      Get Spoiled
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <Card className="bg-gray-950 border-gray-800 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Spent</p>
                  <p className="text-2xl font-bold text-white">$12,450</p>
                </div>
                <Package className="w-8 h-8 text-purple-400" />
              </div>
            </Card>

            <Card className="bg-gray-950 border-gray-800 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Items Bought</p>
                  <p className="text-2xl font-bold text-white">47</p>
                </div>
                <CreditCard className="w-8 h-8 text-green-400" />
              </div>
            </Card>

            <Card className="bg-gray-950 border-gray-800 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">AI Accuracy</p>
                  <p className="text-2xl font-bold text-white">94%</p>
                </div>
                <Shield className="w-8 h-8 text-yellow-400" />
              </div>
            </Card>
          </div>

          {/* Settings Links */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button
              variant="ghost"
              className="justify-start text-gray-400 hover:text-white hover:bg-gray-900"
              onClick={() => toast.info('Settings coming soon!')}
            >
              <Settings className="w-4 h-4 mr-2" />
              Preferences
            </Button>
            <Button
              variant="ghost"
              className="justify-start text-gray-400 hover:text-white hover:bg-gray-900"
              onClick={() => toast.info('Payment methods coming soon!')}
            >
              <CreditCard className="w-4 h-4 mr-2" />
              Payment Methods
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}