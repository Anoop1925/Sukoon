# Sukoon - Next.js Migration

A modern, performant mental health and wellness platform built with Next.js 16.0.7+ and React 19.2.1+.

## 📖 Overview

Sukoon is a comprehensive stress-relief and mental wellness platform offering nine different therapy services:

- **Audio Therapy**: Music, podcasts, and audiobooks for relaxation
- **Reading Therapy**: Articles, quotes, and book recommendations
- **Yoga Therapy**: Asanas, benefits, and instructional videos
- **Laughing Therapy**: Memes and comedy content
- **Talking Therapy**: Communication resources and articles
- **Child Therapy**: Resources for children's mental health
- **Spiritual Therapy**: Spiritual wellness content
- **Special Therapy**: Specialized therapeutic approaches
- **Doctor Consultation**: Professional consultation services

This project represents a complete migration from a traditional HTML/CSS/JavaScript architecture to a modern Next.js and React application, focusing on performance, maintainability, accessibility, and user experience.

## 🔒 Security

This project uses the latest patched versions of Next.js and React to address critical security vulnerabilities:

- **Next.js 16.0.7+**: Addresses CVE-2025-55182 and CVE-2025-66478
- **React 19.2.1+**: Required for compatibility with security patches
- **react-dom 19.2.1+**: Ensures full compatibility with React security updates

**Security Context**: These CVEs relate to vulnerabilities in React Server Components that could allow unauthenticated remote code execution. Using the specified versions or higher is critical for production deployments.

**Version Requirements**:
- Minimum Next.js version: 16.0.7 (or 15.5.7+ in the 15.x line)
- Minimum React version: 19.2.1
- Minimum react-dom version: 19.2.1

Always run `npm audit` regularly and keep dependencies updated to the latest patch versions.

## 🚀 Features

- ✅ Modern Next.js 16 with App Router
- ✅ React 19 with latest features
- ✅ TypeScript with strict mode
- ✅ Tailwind CSS 4.x for styling
- ✅ Framer Motion for animations
- ✅ PWA support with offline functionality
- ✅ Responsive design for all devices
- ✅ Accessibility-first approach
- ✅ Property-based testing with fast-check
- ✅ Comprehensive test coverage

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: Version 18.17.0 or higher (LTS recommended)
- **Package Manager**: npm (comes with Node.js), yarn, or pnpm
- **Git**: For version control
- **Code Editor**: VS Code recommended with the following extensions:
  - ESLint
  - Prettier
  - Tailwind CSS IntelliSense
  - TypeScript and JavaScript Language Features

## 🛠️ Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd sukoon-nextjs
```

### 2. Install Dependencies

Using npm:
```bash
npm install
```

Using yarn:
```bash
yarn install
```

Using pnpm:
```bash
pnpm install
```

### 3. Environment Configuration

Create a local environment file:

```bash
cp .env.example .env.local
```

Update the environment variables in `.env.local` according to your needs. See the [Environment Variables](#-environment-variables) section for details.

### 4. Verify Installation

Run the development server to verify everything is set up correctly:

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application running.

## 🏃 Development

### Starting the Development Server

Run the development server with hot-reload:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

### Development Features

- **Hot Module Replacement (HMR)**: Changes are reflected instantly
- **Fast Refresh**: React components update without losing state
- **TypeScript**: Real-time type checking in your editor
- **Error Overlay**: Detailed error messages in the browser

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server on port 3000 |
| `npm run build` | Create optimized production build |
| `npm start` | Start production server |
| `npm test` | Run all tests |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:pbt` | Run property-based tests only |
| `npm run test:coverage` | Generate test coverage report |
| `npm run lint` | Run ESLint to check code quality |
| `npm run lint:fix` | Fix auto-fixable ESLint issues |
| `npm run format` | Format code with Prettier |
| `npm run type-check` | Run TypeScript type checking |

## 🧪 Testing

This project uses a comprehensive testing strategy including unit tests, integration tests, and property-based tests.

### Running Tests

```bash
# Run all tests once
npm test

# Run tests in watch mode (useful during development)
npm run test:watch

# Run only property-based tests
npm run test:pbt

# Generate coverage report
npm run test:coverage
```

### Testing Strategy

- **Unit Tests**: Test individual components and functions in isolation
- **Integration Tests**: Test component interactions and page-level functionality
- **Property-Based Tests**: Test universal properties across many generated inputs using fast-check
- **Accessibility Tests**: Automated accessibility checks using jest-axe

### Test Coverage Goals

- Unit test coverage: 80%+
- All reusable components tested
- All custom hooks tested
- 100% coverage for utility functions
- Property tests for all universal properties

### Writing Tests

Tests are co-located with source files using the following naming conventions:

- `*.test.tsx` - Unit and integration tests
- `*.pbt.test.tsx` - Property-based tests

Example test location:
```
src/components/ui/Button.tsx
src/components/ui/__tests__/Button.test.tsx
```

## 🎨 Code Quality

### Linting

```bash
# Check for linting errors
npm run lint

# Automatically fix linting errors
npm run lint:fix
```

### Formatting

```bash
# Format all files with Prettier
npm run format

# Check if files are formatted correctly
npm run format:check
```

### Type Checking

```bash
# Run TypeScript compiler to check for type errors
npm run type-check
```

### Pre-commit Hooks

The project uses Husky and lint-staged to run checks before commits:

- Prettier formatting on staged files
- ESLint on staged files
- TypeScript type checking
- Tests related to changed files

## 🏗️ Build

### Creating a Production Build

```bash
# Create optimized production build
npm run build
```

This command:
1. Runs TypeScript type checking
2. Compiles and optimizes all code
3. Generates static pages where possible
4. Optimizes images and assets
5. Creates service worker for PWA functionality
6. Outputs to `.next` directory

### Testing the Production Build Locally

```bash
# Build the application
npm run build

# Start the production server
npm start
```

Visit [http://localhost:3000](http://localhost:3000) to test the production build.

### Build Output

The build process generates:
- Optimized JavaScript bundles
- Static HTML pages
- Optimized images (WebP format)
- Service worker for offline functionality
- PWA manifest
- Source maps (in development mode)

## 📁 Project Structure

```
sukoon-nextjs/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── layout.tsx                # Root layout with Header/Footer
│   │   ├── page.tsx                  # Home page
│   │   ├── globals.css               # Global styles
│   │   ├── therapies/                # Therapy service pages
│   │   │   ├── audio/page.tsx
│   │   │   ├── reading/page.tsx
│   │   │   ├── yoga/page.tsx
│   │   │   ├── laughing/page.tsx
│   │   │   ├── talking/page.tsx
│   │   │   ├── child/page.tsx
│   │   │   ├── spiritual/page.tsx
│   │   │   └── special/page.tsx
│   │   ├── contact/page.tsx          # Contact form page
│   │   ├── login/page.tsx            # Login/auth page
│   │   ├── offline/page.tsx          # PWA offline fallback
│   │   ├── api/                      # API routes
│   │   │   └── contact/route.ts
│   │   ├── error.tsx                 # Error boundary
│   │   └── not-found.tsx             # 404 page
│   │
│   ├── components/                   # Reusable React components
│   │   ├── layout/                   # Layout components
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Navigation.tsx
│   │   │   └── MobileMenu.tsx
│   │   ├── ui/                       # UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Accordion.tsx
│   │   │   ├── Carousel.tsx
│   │   │   ├── BackToTop.tsx
│   │   │   └── SkipToContent.tsx
│   │   ├── sections/                 # Home page sections
│   │   │   ├── Hero.tsx
│   │   │   ├── About.tsx
│   │   │   ├── Services.tsx
│   │   │   ├── Testimonials.tsx
│   │   │   ├── FAQ.tsx
│   │   │   └── TeamMembers.tsx
│   │   └── therapy/                  # Therapy-specific components
│   │       ├── TherapyCard.tsx
│   │       ├── SpotifyEmbed.tsx
│   │       ├── YouTubeEmbed.tsx
│   │       └── BookCard.tsx
│   │
│   ├── hooks/                        # Custom React hooks
│   │   ├── useScrollPosition.ts      # Track scroll position
│   │   ├── useMediaQuery.ts          # Responsive breakpoints
│   │   ├── useIntersectionObserver.ts # Scroll animations
│   │   ├── useLocalStorage.ts        # Client-side storage
│   │   ├── useFocusTrap.ts          # Accessibility focus management
│   │   └── index.ts
│   │
│   ├── context/                      # React Context providers
│   │   └── AuthContext.tsx           # Authentication state
│   │
│   ├── lib/                          # Utility functions and helpers
│   │   ├── animations.ts             # Framer Motion configurations
│   │   └── constants.ts              # App-wide constants
│   │
│   ├── types/                        # TypeScript type definitions
│   │   ├── therapy.ts                # Therapy service types
│   │   ├── testimonial.ts            # Testimonial types
│   │   ├── team.ts                   # Team member types
│   │   ├── faq.ts                    # FAQ types
│   │   ├── contact.ts                # Contact form types
│   │   ├── auth.ts                   # Authentication types
│   │   ├── navigation.ts             # Navigation types
│   │   └── index.ts                  # Type exports
│   │
│   └── data/                         # Static data
│       ├── therapies.ts              # Therapy services data
│       ├── testimonials.ts           # User testimonials
│       ├── team.ts                   # Team member information
│       ├── faq.ts                    # FAQ questions and answers
│       ├── navigation.ts             # Navigation menu items
│       └── index.ts
│
├── public/                           # Static assets
│   ├── images/                       # Image assets
│   ├── manifest.json                 # PWA manifest
│   ├── icon-192.png                  # PWA icon (192x192)
│   └── icon-512.png                  # PWA icon (512x512)
│
├── .kiro/                            # Kiro spec files
│   └── specs/
│       └── sukoon-nextjs-migration/
│           ├── requirements.md       # Feature requirements
│           ├── design.md             # Design document
│           └── tasks.md              # Implementation tasks
│
├── Sukoon-main/                      # Original HTML/CSS/JS site (reference)
│
├── .env.example                      # Example environment variables
├── .env.local                        # Local environment variables (not in git)
├── next.config.js                    # Next.js configuration
├── tailwind.config.ts                # Tailwind CSS configuration
├── tsconfig.json                     # TypeScript configuration
├── jest.config.js                    # Jest testing configuration
├── jest.setup.js                     # Jest setup file
├── eslint.config.mjs                 # ESLint configuration
├── .prettierrc                       # Prettier configuration
├── package.json                      # Dependencies and scripts
└── README.md                         # This file
```

### Key Directories

- **`src/app/`**: Next.js App Router pages and layouts using file-based routing
- **`src/components/`**: Reusable React components organized by category
- **`src/hooks/`**: Custom React hooks for shared logic
- **`src/types/`**: TypeScript type definitions for type safety
- **`src/data/`**: Static data for therapies, testimonials, team, etc.
- **`public/`**: Static assets served directly (images, icons, manifest)

## 🌐 Deployment

### Vercel (Recommended)

Vercel is the recommended platform for deploying Next.js applications, offering zero-configuration deployment.

#### Steps:

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Import to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js configuration

3. **Configure Environment Variables**
   - In Vercel dashboard, go to Project Settings → Environment Variables
   - Add all variables from `.env.example`
   - Set appropriate values for production

4. **Deploy**
   - Click "Deploy"
   - Vercel will build and deploy automatically
   - Every push to main branch triggers automatic deployment

#### Custom Domain (Optional)

1. Go to Project Settings → Domains
2. Add your custom domain
3. Configure DNS records as instructed
4. SSL certificate is automatically provisioned

### Netlify

#### Steps:

1. **Build Configuration**
   
   Create `netlify.toml` in project root:
   ```toml
   [build]
     command = "npm run build"
     publish = ".next"

   [[plugins]]
     package = "@netlify/plugin-nextjs"
   ```

2. **Deploy**
   - Connect your Git repository in Netlify
   - Configure build settings
   - Add environment variables
   - Deploy

### AWS Amplify

#### Steps:

1. **Connect Repository**
   - Open AWS Amplify Console
   - Connect your Git repository

2. **Build Settings**
   ```yaml
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - npm ci
       build:
         commands:
           - npm run build
     artifacts:
       baseDirectory: .next
       files:
         - '**/*'
     cache:
       paths:
         - node_modules/**/*
   ```

3. **Environment Variables**
   - Add environment variables in Amplify Console
   - Deploy

### Docker Deployment

#### Dockerfile Example:

```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package*.json ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

#### Build and Run:

```bash
# Build Docker image
docker build -t sukoon-nextjs .

# Run container
docker run -p 3000:3000 sukoon-nextjs
```

### Self-Hosted (VPS/Dedicated Server)

#### Using PM2:

1. **Install PM2**
   ```bash
   npm install -g pm2
   ```

2. **Build Application**
   ```bash
   npm run build
   ```

3. **Start with PM2**
   ```bash
   pm2 start npm --name "sukoon" -- start
   pm2 save
   pm2 startup
   ```

4. **Configure Nginx (Optional)**
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

### Deployment Checklist

Before deploying to production:

- [ ] Run `npm run build` locally to verify build succeeds
- [ ] Run `npm run type-check` to ensure no TypeScript errors
- [ ] Run `npm test` to ensure all tests pass
- [ ] Run `npm run lint` to check code quality
- [ ] Update environment variables for production
- [ ] Configure custom domain (if applicable)
- [ ] Set up error tracking (Sentry, etc.)
- [ ] Set up analytics (Google Analytics, etc.)
- [ ] Test PWA functionality
- [ ] Run Lighthouse audit
- [ ] Verify all images are optimized
- [ ] Check security headers
- [ ] Test on multiple devices and browsers

## 📚 Technology Stack

### Core Framework

- **[Next.js](https://nextjs.org/) 16.0.7+**: React framework with App Router, Server Components, and built-in optimizations
- **[React](https://react.dev/) 19.2.1+**: UI library with latest features and security patches
- **[TypeScript](https://www.typescriptlang.org/) 5.x**: Type-safe JavaScript with strict mode enabled

### Styling & UI

- **[Tailwind CSS](https://tailwindcss.com/) 4.x**: Utility-first CSS framework for rapid UI development
- **[Framer Motion](https://www.framer.com/motion/)**: Production-ready animation library for React
- **[React Icons](https://react-icons.github.io/react-icons/)**: Popular icon libraries (Font Awesome, Heroicons, etc.)
- **CSS Modules**: Component-scoped styling for specific use cases

### Forms & Validation

- **[React Hook Form](https://react-hook-form.com/)**: Performant form library with minimal re-renders
- **[Zod](https://zod.dev/)**: TypeScript-first schema validation

### State Management

- **React Context API**: Global state management for authentication and theme
- **React Hooks**: Local state management (useState, useEffect, useReducer)

### Testing

- **[Jest](https://jestjs.io/)**: JavaScript testing framework
- **[React Testing Library](https://testing-library.com/react)**: Testing utilities for React components
- **[fast-check](https://fast-check.dev/)**: Property-based testing library for comprehensive test coverage
- **[jest-axe](https://github.com/nickcolley/jest-axe)**: Automated accessibility testing

### PWA & Offline

- **[next-pwa](https://github.com/shadowwalker/next-pwa)**: Zero-config PWA plugin for Next.js
- **Service Workers**: Offline functionality and caching strategies

### Code Quality

- **[ESLint](https://eslint.org/)**: JavaScript/TypeScript linter with Next.js config
- **[Prettier](https://prettier.io/)**: Opinionated code formatter
- **[Husky](https://typicode.github.io/husky/)**: Git hooks for pre-commit checks
- **[lint-staged](https://github.com/okonet/lint-staged)**: Run linters on staged files

### Development Tools

- **[TypeScript ESLint](https://typescript-eslint.io/)**: TypeScript support for ESLint
- **[PostCSS](https://postcss.org/)**: CSS transformations (used by Tailwind)
- **[Autoprefixer](https://github.com/postcss/autoprefixer)**: Automatic vendor prefixes

### Image Optimization

- **Next.js Image Component**: Automatic image optimization, lazy loading, and modern formats
- **WebP Format**: Modern image format for better compression

### Performance

- **Server Components**: Reduced JavaScript bundle size
- **Code Splitting**: Automatic route-based code splitting
- **Image Optimization**: Automatic WebP conversion and responsive images
- **Font Optimization**: Automatic font optimization with next/font

### Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

### Minimum Requirements

- Node.js 18.17.0+
- Modern browser with ES6+ support
- JavaScript enabled
- 1MB+ available storage for PWA cache

## 🔐 Environment Variables

The application uses environment variables for configuration. Create a `.env.local` file in the root directory based on `.env.example`.

### Required Variables

```bash
# Application URL (for metadata and PWA)
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Contact form endpoint (if using external service)
# NEXT_PUBLIC_CONTACT_API_URL=

# Analytics (optional)
# NEXT_PUBLIC_GA_ID=
# NEXT_PUBLIC_GTM_ID=

# Error tracking (optional)
# NEXT_PUBLIC_SENTRY_DSN=
```

### Variable Naming Convention

- `NEXT_PUBLIC_*`: Exposed to the browser (client-side)
- Variables without prefix: Server-side only

### Security Notes

- Never commit `.env.local` to version control
- Use different values for development and production
- Rotate sensitive keys regularly
- Use environment-specific variables in deployment platforms

## 🎯 Features & Functionality

### Therapy Services

- **9 Therapy Types**: Audio, Reading, Yoga, Laughing, Talking, Child, Spiritual, Special, Doctor Consultation
- **Rich Content**: Embedded Spotify playlists, YouTube videos, articles, and book recommendations
- **Responsive Design**: Optimized for mobile, tablet, and desktop

### User Experience

- **Fast Navigation**: Client-side routing with instant page transitions
- **Smooth Animations**: Fade-in, slide-in, and hover effects
- **Accessibility**: WCAG 2.1 AA compliant with keyboard navigation and screen reader support
- **PWA Support**: Install as app, offline functionality, push notifications ready

### Performance

- **Lighthouse Score**: 90+ on all metrics
- **Image Optimization**: Automatic WebP conversion and lazy loading
- **Code Splitting**: Optimized bundle sizes
- **Caching**: Smart caching strategies for static and dynamic content

### Developer Experience

- **TypeScript**: Full type safety across the codebase
- **Hot Reload**: Instant feedback during development
- **Comprehensive Tests**: Unit, integration, and property-based tests
- **Code Quality**: ESLint, Prettier, and pre-commit hooks

## 🐛 Troubleshooting

### Common Issues

#### Port 3000 Already in Use

```bash
# Find and kill the process using port 3000
# On Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# On macOS/Linux:
lsof -ti:3000 | xargs kill -9

# Or use a different port:
PORT=3001 npm run dev
```

#### Build Errors

```bash
# Clear Next.js cache
rm -rf .next

# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear all caches
npm run clean  # if script exists
```

#### TypeScript Errors

```bash
# Restart TypeScript server in VS Code
# Command Palette (Ctrl+Shift+P) → "TypeScript: Restart TS Server"

# Check for type errors
npm run type-check
```

#### Image Optimization Issues

- Ensure images are in `public/` directory
- Check image paths are correct (relative to public)
- Verify Next.js Image component is used
- Check `next.config.js` for image domain configuration

#### PWA Not Working

- Ensure you're testing on HTTPS or localhost
- Clear browser cache and service workers
- Check `manifest.json` is accessible
- Verify service worker is registered in DevTools

### Getting Help

- Check [Next.js Documentation](https://nextjs.org/docs)
- Review [React Documentation](https://react.dev)
- Search [GitHub Issues](https://github.com/your-repo/issues)
- Ask in [Discussions](https://github.com/your-repo/discussions)

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

### Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-username/sukoon-nextjs.git`
3. Create a feature branch: `git checkout -b feature/your-feature-name`
4. Install dependencies: `npm install`

### Development Workflow

1. Make your changes
2. Write/update tests for your changes
3. Run tests: `npm test`
4. Run linting: `npm run lint`
5. Run type checking: `npm run type-check`
6. Format code: `npm run format`
7. Commit with descriptive message
8. Push to your fork
9. Open a Pull Request

### Code Standards

- Follow existing code style
- Write TypeScript with proper types
- Add JSDoc comments for complex functions
- Write tests for new features
- Ensure all tests pass
- Keep commits atomic and well-described

### Pull Request Guidelines

- Provide clear description of changes
- Reference related issues
- Include screenshots for UI changes
- Ensure CI checks pass
- Request review from maintainers

## 📄 License

[Add your license here - e.g., MIT, Apache 2.0, etc.]

## 👥 Team

Sukoon is developed and maintained by a dedicated team focused on mental health and wellness technology.

## 🙏 Acknowledgments

- Original Sukoon HTML/CSS/JS project contributors
- Next.js and React teams for excellent frameworks
- Open source community for amazing tools and libraries

## 🆘 Support

### Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

### Getting Help

- **Issues**: Report bugs or request features via [GitHub Issues](https://github.com/your-repo/issues)
- **Discussions**: Ask questions in [GitHub Discussions](https://github.com/your-repo/discussions)
- **Email**: [contact@sukoon.example.com](mailto:contact@sukoon.example.com)

### Security

If you discover a security vulnerability, please email security@sukoon.example.com instead of using the issue tracker.

---

**Built with ❤️ for mental health and wellness**
