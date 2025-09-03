import { ChatInterface } from "@/components/ChatInterface";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Chat = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-border p-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate('/')}
            className="luxury-button"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">SpoiledRotten.AI</h1>
            <p className="text-muted-foreground">Your luxury shopping concierge</p>
          </div>
        </div>
        
        <Button variant="luxury">
          Upgrade Plan
        </Button>
      </header>

      {/* Chat Interface */}
      <div className="flex-1">
        <ChatInterface />
      </div>
    </div>
  );
};

export default Chat;