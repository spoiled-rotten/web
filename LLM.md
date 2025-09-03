# SpoiledRotten.AI - Project Knowledge Base

## Project Overview
SpoiledRotten.AI is a luxury shopping platform with AI-powered automation. The platform enables users to automatically purchase luxury items through an intelligent concierge that learns preferences and manages budgets.

## Architecture

### Frontend Stack
- **Framework**: React 18.3 with TypeScript
- **Build Tool**: Vite 5.4
- **Styling**: Tailwind CSS with custom luxury theme
- **UI Library**: Radix UI components with shadcn/ui
- **State Management**: React Context API
- **Routing**: React Router v6
- **Animations**: Tailwind Animate + CSS transitions

### Key Features

#### 1. Spoiled Odometer
- **Location**: Bottom left corner (fixed position)
- **Purpose**: Visual progress tracker for shopping journey
- **Milestones**:
  - 0%: Starting fresh
  - 20%: TREATING
  - 40%: SPLURGING  
  - 60%: INDULGING
  - 80%: LUXURIOUS
  - 100%: SPOILED (with achievement badge)
- **Thresholds**: Based on total cart value up to $20,000
- **Implementation**: `src/components/SpoiledOdometer.tsx`

#### 2. Shopping Cart System
- **State Management**: Context API with localStorage persistence
- **Features**: Add/remove items, quantity management, automatic totals
- **Implementation**: `src/contexts/CartContext.tsx`

#### 3. AI Chat Interface
- **Main Chat**: Full-page interface at `/chat` route
- **Floating Chat**: Bottom right corner bubble (global)
- **Features**: Product recommendations, quick actions, message history
- **Implementation**: 
  - `src/components/ChatInterface.tsx`
  - `src/components/FloatingChat.tsx`

#### 4. Stripe Checkout
- **Integration**: Test mode with public test keys
- **Modal**: Custom checkout modal with order summary
- **Test Cards**: 4242 4242 4242 4242 (success)
- **Implementation**: 
  - `src/lib/stripe.ts`
  - `src/components/CheckoutModal.tsx`

## Design System

### Color Palette
- **Primary**: Purple to Rose gradient
- **Luxury Gold**: #FFD700
- **Success**: Emerald shades
- **Background**: Dark with transparency

### Components
- **luxury-card**: Glass morphism with backdrop blur
- **luxury-button**: Gradient with hover scale
- **Animations**: Smooth transitions, pulse effects, bounces

## Testing Strategy

### Unit Tests (Vitest)
- Component testing with React Testing Library
- Context and hook testing
- Coverage target: 80%

### E2E Tests (Playwright)
- Shopping flow automation
- Cross-browser testing
- Mobile responsiveness
- Checkout process validation

## Development Workflow

### Local Development
```bash
npm install
npm run dev  # Runs on http://localhost:8080
```

### Testing
```bash
npm test           # Unit tests
npm run test:e2e   # E2E tests
```

### Building
```bash
npm run build      # Production build
docker build -t spoiledrotten .  # Docker image
```

## Project Structure
```
src/
├── components/       # UI components
│   ├── ui/          # Base components
│   ├── ChatInterface.tsx
│   ├── FloatingChat.tsx
│   ├── SpoiledOdometer.tsx
│   └── CheckoutModal.tsx
├── contexts/        # Global state
│   └── CartContext.tsx
├── lib/            # Utilities
│   └── stripe.ts
├── pages/          # Route pages
│   ├── Index.tsx
│   └── Chat.tsx
└── __tests__/      # Test files
```

## API Integration Points

### Stripe
- Publishable key in environment variable
- Client-side checkout session creation
- Test mode configuration

### Future AI Service
- Placeholder for OpenAI/Anthropic integration
- Product recommendation engine
- Natural language processing

## Performance Optimizations
- Lazy loading for routes
- Image optimization
- LocalStorage caching
- Debounced cart updates

## Security Considerations
- Environment variables for sensitive keys
- Input sanitization in chat
- XSS protection with React
- Content Security Policy headers

## Deployment
- GitHub Actions CI/CD pipeline
- Docker containerization
- Nginx configuration for production
- Environment-specific builds

## Known Issues & TODOs
- [ ] Real Stripe backend integration needed
- [ ] AI service connection pending
- [ ] Product database integration
- [ ] User authentication system
- [ ] Order history tracking

## Development Tips
1. Always test cart persistence across page refreshes
2. Verify animations on different devices
3. Test with actual Stripe test cards
4. Check responsive design at all breakpoints
5. Monitor bundle size after adding dependencies

## Important Files
- `.env`: Environment variables (not in repo)
- `playwright.config.ts`: E2E test configuration
- `vitest.config.ts`: Unit test configuration
- `docker-compose.yml`: Local development containers
- `.github/workflows/ci.yml`: CI/CD pipeline

## Contact & Support
- Repository: github.com/[org]/spoiledrotten-web
- Documentation: docs.spoiledrotten.ai
- Support: support@spoiledrotten.ai