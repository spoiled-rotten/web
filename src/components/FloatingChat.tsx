import { useState } from 'react';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export const FloatingChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean }>>([
    { text: "Hi! I'm your luxury shopping AI. How can I spoil you today? 💎", isUser: false }
  ]);

  const handleSend = () => {
    if (!message.trim()) return;
    
    setMessages(prev => [...prev, { text: message, isUser: true }]);
    setMessage('');
    
    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        text: "I'm finding the perfect luxury items for you! Check out the products I've added to your cart.", 
        isUser: false 
      }]);
    }, 1000);
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full",
          "bg-gradient-to-br from-purple-500 to-rose-500",
          "flex items-center justify-center",
          "shadow-2xl hover:scale-110 transition-all duration-300",
          "group"
        )}
      >
        {isOpen ? (
          <X className="w-7 h-7 text-white" />
        ) : (
          <MessageCircle className="w-7 h-7 text-white group-hover:rotate-12 transition-transform" />
        )}
        
        {/* Pulse animation when closed */}
        {!isOpen && (
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500 to-rose-500 animate-ping opacity-30" />
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className={cn(
          "fixed bottom-28 right-6 z-50",
          "w-96 h-[500px]",
          "luxury-card backdrop-blur-xl bg-black/90 border border-white/20",
          "rounded-3xl shadow-2xl",
          "flex flex-col",
          "animate-in slide-in-from-bottom-5 duration-300"
        )}>
          {/* Header */}
          <div className="p-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-rose-500 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-white">SpoiledRotten AI</h3>
                <p className="text-xs text-gray-400">Your luxury concierge</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={cn(
                  "p-3 rounded-2xl max-w-[80%]",
                  msg.isUser 
                    ? "ml-auto bg-gradient-to-br from-purple-500/30 to-rose-500/20 border border-purple-500/30" 
                    : "bg-white/10 border border-white/10"
                )}
              >
                <p className="text-sm text-white">{msg.text}</p>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-white/10">
            <div className="flex gap-2">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask for luxury items..."
                className="flex-1 bg-white/5 border-white/20 text-white placeholder:text-gray-400"
              />
              <Button
                onClick={handleSend}
                size="icon"
                className="bg-gradient-to-br from-purple-500 to-rose-500 hover:from-purple-600 hover:to-rose-600"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};