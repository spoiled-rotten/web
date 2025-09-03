import { Link } from 'react-router-dom';
import { SpoiledRottenLogo } from '@/components/SpoiledRottenLogo';
import { 
  Instagram, Twitter, Youtube, Facebook,
  Mail, Phone, MapPin, CreditCard, Shield, Truck
} from 'lucide-react';

export const ModernFooter = () => {
  return (
    <footer className="bg-black border-t border-gray-800">
      {/* Features Bar */}
      <div className="border-b border-gray-800 py-8">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-3">
              <Truck className="w-5 h-5 text-yellow-400" />
              <div>
                <p className="text-white font-medium">Free Shipping</p>
                <p className="text-gray-500 text-sm">On orders over $500</p>
              </div>
            </div>
            <div className="flex items-center justify-center sm:justify-start gap-3">
              <Shield className="w-5 h-5 text-yellow-400" />
              <div>
                <p className="text-white font-medium">Secure Payment</p>
                <p className="text-gray-500 text-sm">100% protected transactions</p>
              </div>
            </div>
            <div className="flex items-center justify-center sm:justify-start gap-3">
              <CreditCard className="w-5 h-5 text-yellow-400" />
              <div>
                <p className="text-white font-medium">Premium Rewards</p>
                <p className="text-gray-500 text-sm">Earn points on every purchase</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="py-12">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Brand Column */}
            <div className="lg:col-span-2">
              <SpoiledRottenLogo size="md" variant="gradient" />
              <p className="mt-4 text-gray-400 max-w-md">
                Luxury AI shopping concierge that learns your style and automates your shopping. 
                Don't think, let us spoil you rotten.
              </p>
              <div className="flex items-center gap-4 mt-6">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Youtube className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Shop */}
            <div>
              <h3 className="text-white font-semibold mb-4">Shop</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="text-gray-400 hover:text-yellow-400 transition-colors">
                    New Arrivals
                  </Link>
                </li>
                <li>
                  <Link to="/" className="text-gray-400 hover:text-yellow-400 transition-colors">
                    Best Sellers
                  </Link>
                </li>
                <li>
                  <Link to="/" className="text-gray-400 hover:text-yellow-400 transition-colors">
                    Sale
                  </Link>
                </li>
                <li>
                  <Link to="/" className="text-gray-400 hover:text-yellow-400 transition-colors">
                    Brands
                  </Link>
                </li>
                <li>
                  <Link to="/" className="text-gray-400 hover:text-yellow-400 transition-colors">
                    Collections
                  </Link>
                </li>
              </ul>
            </div>

            {/* Membership */}
            <div>
              <h3 className="text-white font-semibold mb-4">Membership</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/pricing" className="text-gray-400 hover:text-yellow-400 transition-colors">
                    Plans & Pricing
                  </Link>
                </li>
                <li>
                  <Link to="/account" className="text-gray-400 hover:text-yellow-400 transition-colors">
                    My Account
                  </Link>
                </li>
                <li>
                  <Link to="/" className="text-gray-400 hover:text-yellow-400 transition-colors">
                    Benefits
                  </Link>
                </li>
                <li>
                  <Link to="/" className="text-gray-400 hover:text-yellow-400 transition-colors">
                    Gift Cards
                  </Link>
                </li>
                <li>
                  <Link to="/" className="text-gray-400 hover:text-yellow-400 transition-colors">
                    Refer Friends
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-white font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                    Shipping & Returns
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                    Size Guide
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                    Track Order
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Newsletter */}
          <div className="mt-12 pt-8 border-t border-gray-800">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-white font-semibold mb-2">Join the luxury insider list</h3>
                <p className="text-gray-400 text-sm">Get exclusive access to drops, sales, and AI features</p>
              </div>
              <div className="flex gap-2 w-full md:w-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 md:w-64 px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-yellow-500"
                />
                <button className="px-6 py-2 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-medium rounded-lg transition-all">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-8 pt-8 border-t border-gray-800">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-gray-500 text-sm">
                © 2024 SpoiledRotten.AI. All rights reserved.
              </p>
              <div className="flex items-center gap-6">
                <Link to="/" className="text-gray-500 hover:text-gray-400 text-sm">
                  Privacy Policy
                </Link>
                <Link to="/" className="text-gray-500 hover:text-gray-400 text-sm">
                  Terms of Service
                </Link>
                <Link to="/" className="text-gray-500 hover:text-gray-400 text-sm">
                  Cookie Policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};