# Deployment Guide for SpoiledRotten.AI

## Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- Docker (optional, for containerized deployment)
- Stripe account for payment processing

## Environment Setup

### 1. Environment Variables
Create a `.env` file in the project root:

```bash
# Stripe Configuration (Required)
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here

# API Configuration (Optional)
VITE_API_URL=https://api.spoiledrotten.ai
VITE_AI_SERVICE_KEY=your-ai-key

# Analytics (Optional)
VITE_ANALYTICS_ID=your-analytics-id
```

### 2. Install Dependencies
```bash
npm install
```

## Local Development

### Start Development Server
```bash
npm run dev
# App runs on http://localhost:8080
```

### Run Tests
```bash
# Unit tests
npm test

# E2E tests (requires app running)
npm run test:e2e

# Full test suite
npm test && npm run test:e2e
```

## Production Build

### 1. Standard Build
```bash
npm run build
# Output in ./dist directory
```

### 2. Preview Production Build
```bash
npm run preview
# Serves production build locally
```

## Deployment Options

### Option 1: Vercel (Recommended)

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel --prod
```

3. Set environment variables in Vercel dashboard

### Option 2: Docker

1. Build Docker image:
```bash
docker build -t spoiledrotten:latest .
```

2. Run container:
```bash
docker run -p 80:80 spoiledrotten:latest
```

3. Using Docker Compose:
```bash
docker-compose up -d web
```

### Option 3: Static Hosting (Netlify, GitHub Pages)

1. Build the project:
```bash
npm run build
```

2. Deploy the `dist` folder to your hosting service

3. Configure redirects for SPA routing:
Create `_redirects` file in public folder:
```
/*    /index.html   200
```

### Option 4: AWS S3 + CloudFront

1. Build project:
```bash
npm run build
```

2. Upload to S3:
```bash
aws s3 sync dist/ s3://your-bucket-name --delete
```

3. Configure CloudFront distribution with S3 origin

4. Set CloudFront error pages:
- 404 → /index.html (200 status)
- 403 → /index.html (200 status)

## CI/CD Pipeline

### GitHub Actions
The project includes a complete CI/CD pipeline (`.github/workflows/ci.yml`):

1. **Test Stage**: Runs on all PRs
   - Linting
   - Unit tests
   - Coverage reporting

2. **E2E Stage**: Browser testing
   - Playwright tests
   - Cross-browser validation

3. **Build Stage**: Production build
   - Asset optimization
   - Bundle size checks

4. **Deploy Stage**: Auto-deploy on main branch
   - Vercel deployment
   - Environment variable injection

### Setup GitHub Secrets
Add these secrets to your GitHub repository:
- `VITE_STRIPE_PUBLISHABLE_KEY`
- `VITE_API_URL`
- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

## Production Checklist

### Pre-deployment
- [ ] Update environment variables
- [ ] Run full test suite
- [ ] Check bundle size (`npm run build`)
- [ ] Test on multiple browsers
- [ ] Verify mobile responsiveness
- [ ] Check accessibility (WCAG compliance)

### Security
- [ ] Enable HTTPS
- [ ] Configure CSP headers
- [ ] Set secure cookies
- [ ] Enable rate limiting
- [ ] Configure CORS properly
- [ ] Remove console logs

### Performance
- [ ] Enable gzip compression
- [ ] Configure CDN
- [ ] Set cache headers
- [ ] Optimize images
- [ ] Enable HTTP/2
- [ ] Monitor Core Web Vitals

### Monitoring
- [ ] Setup error tracking (Sentry)
- [ ] Configure analytics
- [ ] Setup uptime monitoring
- [ ] Enable performance monitoring
- [ ] Configure logging

## Rollback Procedure

### Vercel
```bash
vercel rollback
```

### Docker
```bash
# Tag current version before deploying
docker tag spoiledrotten:latest spoiledrotten:backup

# Rollback
docker stop spoiledrotten-container
docker run -d --name spoiledrotten-container -p 80:80 spoiledrotten:backup
```

### Manual
1. Keep previous build artifacts
2. Restore previous `dist` folder
3. Redeploy to hosting service

## Troubleshooting

### Common Issues

1. **Stripe not working**
   - Verify publishable key is set
   - Check browser console for errors
   - Ensure test mode is enabled

2. **Routes not working in production**
   - Verify SPA routing configuration
   - Check server redirect rules
   - Ensure base URL is correct

3. **Build failures**
   - Clear node_modules and reinstall
   - Check Node version compatibility
   - Verify environment variables

4. **Performance issues**
   - Check bundle size
   - Enable code splitting
   - Optimize images
   - Use CDN for assets

## Support

- Documentation: [README.md](README.md)
- Issues: GitHub Issues
- Email: support@spoiledrotten.ai

## Version History

- v1.0.0 - Initial release with core shopping features
  - Spoiled Odometer
  - AI Chat Interface
  - Stripe Checkout
  - Cart Management