import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Send, Sparkles, ShoppingBag, Heart, Zap, Gift, Star } from "lucide-react";
import handbagImage from "@/assets/product-handbag.jpg";
import jewelryImage from "@/assets/product-jewelry.jpg";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
  products?: ProductSuggestion[];
}

interface ProductSuggestion {
  id: string;
  name: string;
  price: string;
  image: string;
  description: string;
  category: string;
}

const sampleProducts: ProductSuggestion[] = [
  {
    id: '1',
    name: 'Designer Rose Gold Handbag',
    price: '$2,850',
    image: handbagImage,
    description: 'Elegant leather handbag with rose gold hardware',
    category: 'Handbags'
  },
  {
    id: '2',
    name: 'Diamond Tennis Necklace',
    price: '$4,200',
    image: jewelryImage,
    description: 'Sparkling diamond necklace in 18k gold',
    category: 'Jewelry'
  }
];

export const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Welcome to SpoiledRotten.AI! ✨ I'm your luxury shopping concierge. Tell me what you're looking for or who you're shopping for, and I'll curate the perfect selection.",
      isUser: false,
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI response with products
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: "Perfect! I've found some exquisite options that match your taste. Here are my curated recommendations:",
        isUser: false,
        timestamp: new Date(),
        products: sampleProducts,
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const quickActions = [
    { icon: Gift, text: "Gift for girlfriend", color: "text-rose-400" },
    { icon: ShoppingBag, text: "Luxury handbag", color: "text-purple-400" },
    { icon: Star, text: "Birthday surprise", color: "text-yellow-400" },
    { icon: Heart, text: "Anniversary gift", color: "text-red-400" },
  ];

  return (
    <div className="flex flex-col h-full max-w-5xl mx-auto">
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[85%] ${message.isUser ? 'order-2' : 'order-1'}`}>
              <Card className={`luxury-card p-6 ${
                message.isUser 
                  ? 'bg-gradient-to-br from-purple-500/20 to-rose-500/10 border-purple-500/30' 
                  : 'bg-card border-white/10'
              }`}>
                <div className="flex items-start gap-3">
                  {!message.isUser && (
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-rose-500 flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-5 h-5 text-white" />
                    </div>
                  )}
                  <div className="flex-1">
                    <p className="leading-relaxed text-gray-100">{message.content}</p>
                    
                    {/* Product Suggestions */}
                    {message.products && (
                      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                        {message.products.map((product) => (
                          <Card key={product.id} className="luxury-card p-4 hover:scale-105 transition-transform cursor-pointer border border-white/10">
                            <img 
                              src={product.image} 
                              alt={product.name}
                              className="w-full h-32 object-cover rounded-lg mb-3"
                            />
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-xs text-purple-300 font-medium">{product.category}</span>
                                <span className="text-lg font-bold text-emerald-300">{product.price}</span>
                              </div>
                              <h4 className="font-semibold text-white">{product.name}</h4>
                              <p className="text-sm text-gray-300">{product.description}</p>
                              <Button size="sm" variant="gold" className="w-full mt-2">
                                <ShoppingBag className="w-4 h-4 mr-2" />
                                Add to Cart
                              </Button>
                            </div>
                          </Card>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <Card className="luxury-card p-6 bg-card border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-rose-500 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white animate-pulse" />
                </div>
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-rose-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      {messages.length === 1 && (
        <div className="px-6 pb-4">
          <p className="text-sm text-gray-400 mb-3">Quick suggestions:</p>
          <div className="flex flex-wrap gap-2">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant="ghost"
                size="sm"
                onClick={() => setInputValue(action.text)}
                className="border border-white/10 hover:border-white/20 transition-colors"
              >
                <action.icon className={`w-4 h-4 mr-2 ${action.color}`} />
                {action.text}
              </Button>
            ))}
          </div>
        </div>
      )}

      <div className="p-6 border-t border-border">
        <div className="flex gap-4">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="I need a luxury handbag for my girlfriend's birthday..."
            className="flex-1 bg-input/50 border-border text-foreground placeholder:text-muted-foreground rounded-2xl px-6 py-4 text-lg backdrop-blur-sm"
          />
          <Button 
            onClick={handleSendMessage}
            variant="luxury"
            size="lg"
            className="rounded-2xl px-8 hover:scale-105 transition-transform"
            disabled={isTyping}
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};