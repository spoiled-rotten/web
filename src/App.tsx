import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import { AIPreferenceProvider } from "@/contexts/AIPreferenceContext";
import { LuxurySpeedometer } from "@/components/LuxurySpeedometer";
import { FloatingChat } from "@/components/FloatingChat";
import Index from "./pages/Index";
import Feed from "./pages/Feed";
import Chat from "./pages/Chat";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <CartProvider>
      <AIPreferenceProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Feed />} />
              <Route path="/explore" element={<Index />} />
              <Route path="/chat" element={<Chat />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <LuxurySpeedometer />
            <FloatingChat />
          </BrowserRouter>
        </TooltipProvider>
      </AIPreferenceProvider>
    </CartProvider>
  </QueryClientProvider>
);

export default App;
