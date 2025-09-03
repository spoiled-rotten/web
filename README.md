# SpoiledRotten.AI 👑

> The Ultimate Luxury Shopping AI Concierge - Where doing nothing becomes an art form

[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.3-61dafb.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646cff.svg)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## 🌟 Overview

SpoiledRotten.AI is a revolutionary luxury shopping platform that combines artificial intelligence with automated purchasing to create the ultimate hands-free luxury experience. Our AI learns your preferences, manages your budget, and automatically curates and purchases luxury items, gifts, and experiences - all while you do absolutely nothing.

### ✨ Key Features

- **🤖 AI Shopping Concierge**: Intelligent product recommendations based on your preferences
- **📊 Spoiled Odometer**: Visual progress tracker showing your journey from 0 to "SPOILED"
- **💬 Real-time Chat Interface**: Interactive AI assistant for personalized shopping
- **🛍️ Smart Cart Management**: Automatic budget tracking and optimization
- **🎯 Auto-purchasing**: Set it and forget it luxury shopping automation
- **💎 Curated Collections**: Hand-picked luxury items from premium brands
- **🎁 Gift Automation**: Never miss birthdays, anniversaries, or special occasions

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm 9+

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/spoiledrotten-web.git
cd spoiledrotten-web

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173` to see the application.

## 🏗️ Architecture

### Tech Stack

- **Frontend Framework**: React 18.3 with TypeScript
- **Build Tool**: Vite 5.4
- **Styling**: Tailwind CSS with custom luxury theme
- **State Management**: React Context API
- **UI Components**: Radix UI + Custom components
- **Animations**: Tailwind Animate + CSS transitions
- **Icons**: Lucide React
- **Testing**: Vitest + React Testing Library

### Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Base UI components (buttons, cards, etc.)
│   ├── ChatInterface.tsx
│   ├── FloatingChat.tsx
│   ├── SpoiledOdometer.tsx
│   └── ...
├── contexts/           # React Context providers
│   └── CartContext.tsx # Global cart state management
├── pages/              # Route components
│   ├── Index.tsx       # Landing page
│   ├── Chat.tsx        # Main chat interface
│   └── NotFound.tsx    
├── assets/             # Static assets (images, fonts)
├── lib/                # Utility functions
├── __tests__/          # Test files
└── App.tsx             # Main application component
```

## 🎯 Core Features

### Spoiled Odometer

The signature feature that tracks your luxury shopping progress:

- **Progress Levels**:
  - 0% - Starting fresh
  - 20% - TREATING - Starting to indulge
  - 40% - SPLURGING - Getting serious
  - 60% - INDULGING - Living the luxury life
  - 80% - LUXURIOUS - Almost there
  - 100% - SPOILED - Ultimate achievement

- **Thresholds**:
  - $0 - $1,000: Getting started
  - $1,000 - $5,000: Building momentum
  - $5,000 - $10,000: Serious luxury
  - $10,000 - $20,000: Premium tier
  - $20,000+: Fully SPOILED

### Smart Shopping Cart

- Persistent storage using localStorage
- Real-time total calculation
- Automatic spoiled level updates
- Item quantity management
- One-click clearing

### AI Chat Integration

- Natural language processing
- Product recommendations
- Budget optimization
- Preference learning
- Automated responses

### Stripe Checkout Integration

- **Test Mode**: Pre-configured with test keys
- **Test Card Numbers**:
  - Success: `4242 4242 4242 4242`
  - Decline: `4000 0000 0000 0002`
  - Requires Auth: `4000 0025 0000 3155`
- **Features**:
  - Secure payment processing
  - Order summary display
  - Success/failure handling
  - Automatic cart clearing after purchase

## 🧪 Testing

### Run Tests

```bash
# Run unit tests
npm test

# Run tests with UI
npm run test:ui

# Generate coverage report
npm run test:coverage

# Run E2E tests with Playwright
npm run test:e2e

# Run E2E tests with UI mode
npm run test:e2e:ui

# Debug E2E tests
npm run test:e2e:debug

# View E2E test report
npm run test:e2e:report
```

### Test Coverage

- **Unit Tests**: Comprehensive component and context testing with Vitest
- **Integration Tests**: Cart functionality, state management
- **E2E Tests**: Complete shopping flow with Playwright
  - Landing page navigation
  - Chat interface interaction
  - Cart management
  - Checkout process with Stripe
  - Mobile responsiveness
  - LocalStorage persistence
- **Test Card**: Use `4242 4242 4242 4242` for Stripe testing

## 📦 Building for Production

```bash
# Create production build
npm run build

# Preview production build
npm run preview

# Build for development environment
npm run build:dev
```

## 🚢 Deployment

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=https://api.spoiledrotten.ai
VITE_AI_SERVICE_KEY=your-ai-service-key
VITE_ANALYTICS_ID=your-analytics-id
```

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

### Deploy Commands

```bash
# Build Docker image
docker build -t spoiledrotten-web .

# Run container
docker run -p 3000:3000 spoiledrotten-web
```

## 🎨 Customization

### Theme Configuration

The luxury theme can be customized in `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      luxury: {
        gold: '#FFD700',
        rose: '#FF1493',
        purple: '#9333EA',
      }
    }
  }
}
```

### Component Styling

All components use a consistent luxury design system:

```css
.luxury-card {
  @apply bg-black/80 backdrop-blur-xl border-white/20 rounded-3xl;
}

.luxury-button {
  @apply bg-gradient-to-r from-purple-500 to-rose-500 hover:scale-105;
}
```

## 📊 Performance

- **Lighthouse Score**: 95+
- **Bundle Size**: < 250KB gzipped
- **Initial Load**: < 2s
- **TTI**: < 3s
- **Code Splitting**: Automatic route-based splitting

## 🔒 Security

- No sensitive data in frontend code
- Secure API communication
- Input sanitization
- XSS protection
- CSRF tokens for forms

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Standards

- ESLint configuration for code quality
- Prettier for formatting
- Conventional commits
- 100% TypeScript
- Minimum 80% test coverage

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with ❤️ by the SpoiledRotten.AI team
- Powered by cutting-edge AI technology
- Designed for those who deserve the best

## 📞 Support

- **Documentation**: [docs.spoiledrotten.ai](https://docs.spoiledrotten.ai)
- **Email**: support@spoiledrotten.ai
- **Discord**: [Join our community](https://discord.gg/spoiledrotten)
- **Twitter**: [@SpoiledRottenAI](https://twitter.com/spoiledrotten)

---

*"The ultimate luxury is doing nothing while AI does everything"* - SpoiledRotten.AI