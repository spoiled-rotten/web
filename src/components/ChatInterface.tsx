import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Send, Sparkles } from "lucide-react";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

export const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Welcome to SpoiledRotten.AI! I'm your luxury shopping concierge. Tell me what you need or who you're shopping for, and I'll curate the perfect selection.",
      isUser: false,
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState("");

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: "I understand you're looking for something special. Let me curate some luxury options for you. What's your budget range and the occasion?",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);

    setInputValue("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto">
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
          >
            <Card className={`luxury-card max-w-[80%] p-6 ${
              message.isUser 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-card'
            }`}>
              <div className="flex items-start gap-3">
                {!message.isUser && (
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-4 h-4 text-primary-foreground" />
                  </div>
                )}
                <p className="leading-relaxed">{message.content}</p>
              </div>
            </Card>
          </div>
        ))}
      </div>

      <div className="p-6 border-t border-border">
        <div className="flex gap-4">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Tell me what you need... luxury handbag, surprise gift, special occasion..."
            className="flex-1 bg-input border-border text-foreground placeholder:text-muted-foreground rounded-2xl px-6 py-4 text-lg"
          />
          <Button 
            onClick={handleSendMessage}
            variant="luxury"
            size="lg"
            className="rounded-2xl px-8"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};