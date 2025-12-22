# Sukoon Next.js Project Structure

This document outlines the project structure and configuration for the Sukoon Next.js migration.

## Directory Structure

```
sukoon-nextjs/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── layout.tsx                # Root layout with Header/Footer
│   │   ├── page.tsx                  # Home page
│   │   ├── globals.css               # Global styles
│   │   ├── therapies/                # Therapy service pages
│   │   ├── contact/                  # Contact page
│   │   ├── login/                    # Login/Auth page
│   │   ├── api/                      # API routes
│   │   └── not-found.tsx             # 404 page
│   │
│   ├── components/                   # Reusable React components
│   │   ├── layout/                   # Layout components (Header, Footer, Navigation)
│   │   ├── ui/                       # UI components (Button, Card, Accordion, etc.)
│   │   ├── sections/                 # Page sections (Hero, About, Services, etc.)
│   │   └── therapy/                  # Therapy-specific components
│   │
│   ├── hooks/                        # Custom React hooks
│   │   ├── useScrollPosition.ts      # Track scroll position
│   │   ├── useMediaQuery.ts          # Responsive breakpoints
│   │   ├── useIntersectionObserver.ts # Scroll animations
│   │   └── useLocalStorage.ts        # Client-side storage
│   │
│   ├── context/                      # React Context providers
│   │   ├── ThemeContext.tsx          # Theme management
│   │   └── AuthContext.tsx           # Authentication state
│   │
│   ├── lib/                          # Utilities and helpers
│   │   ├── constants.ts              # App constants
│   │   ├── animations.ts             # Framer Motion configs
│   │   └── validators.ts             # Form validation schemas
│   │
│   ├── types/                        # TypeScript type definitions
│   │   ├── therapy.ts                # Therapy service types
│   │   ├── testimonial.ts            # Testimonial types
│   │   ├── team.ts                   # Team member types
│   │   └── index.ts                  # Type exports
│   │
│   ├── data/                         # Static data
│   │   ├── therapies.ts              # Therapy services data
│   │   ├── testimonials.ts           # User testimonials
│   │   ├── team.ts                   # Team members
│   │   └── faq.ts                    # FAQ items
│   │
│   ├── styles/                       # CSS Modules and style utilities
│   │   ├── README.md                 # CSS Modules documentation
│   │   └── example.module.css        # Example CSS Module
│   │
│   └── __tests__/                    # Test files
│       ├── setup.test.ts             # Test setup verification
│       └── *.pbt.test.ts             # Property-based tests
│
├── public/                           # Static assets
│   ├── images/                       # Image assets
│   ├── icons/                        # Icon files
│   ├── manifest.json                 # PWA manifest
│   ├── sw.js                         # Service worker (auto-generated)
│   └── robots.txt                    # SEO robots file
│
├── .kiro/                            # Kiro specs and configuration
│   └── specs/sukoon-nextjs-migration/
│       ├── requirements.md           # Feature requirements
│       ├── design.md                 # Design document
│       └── tasks.md                  # Implementation tasks
│
├── Sukoon-main/                      # Original HTML/CSS/JS site (reference)
│
├── Configuration Files
├── .env.example                      # Environment variables template
├── .env.local                        # Local environment variables (gitignored)
├── .gitignore                        # Git ignore rules
├── next.config.js                    # Next.js configuration with PWA
├── tailwind.config.ts                # Tailwind CSS configuration
├── tsconfig.json                     # TypeScript configuration
├── jest.config.js                    # Jest testing configuration
├── jest.setup.js                     # Jest setup file
├── postcss.config.js                 # PostCSS configuration
├── eslint.config.mjs                 # ESLint configuration
├── .prettierrc                       # Prettier configuration
├── package.json                      # Dependencies and scripts
└── README.md                         # Project documentation
```

## Configuration Files

### next.config.js
- **PWA Support**: Configured with next-pwa for Progressive Web App functionality
- **Image Optimization**: Next.js Image component with WebP/AVIF formats
- **Security Headers**: X-Frame-Options, CSP, HSTS, etc.
- **CSS Modules**: Enabled for component-specific styling
- **Compression**: Gzip/Brotli compression enabled
- **Cache Strategies**: Configured for fonts, images, static assets, and pages

### tailwind.config.ts
- **Custom Colors**: Primary, secondary, accent, success, warning, dark palettes
- **Custom Fonts**: Poppins, Montserrat, Roboto
- **Custom Animations**: Fade-in, slide-in, scale-in, bounce-in, etc.
- **Custom Spacing**: Extended spacing scale
- **Custom Shadows**: Soft, medium, hard shadow utilities

### .env.example
Comprehensive environment variable template including:
- Application configuration
- API endpoints
- Email service configuration
- Authentication settings (NextAuth.js)
- Database configuration
- Analytics and monitoring
- Third-party integrations (Spotify, YouTube)
- PWA settings
- Feature flags
- Security settings

### .gitignore
Complete Next.js gitignore including:
- Node modules and dependencies
- Build outputs (.next/, out/, dist/)
- PWA generated files (service workers)
- Environment files
- IDE configurations
- OS-specific files
- Logs and temporary files

## Key Features

### PWA Configuration
- Service worker auto-generation with next-pwa
- Offline support with cache-first strategies
- Install prompt for mobile devices
- Background sync capabilities
- Push notification support (future)

### CSS Modules
- Component-scoped styling
- Automatic class name generation
- No style conflicts
- Can be combined with Tailwind CSS
- See `src/styles/README.md` for usage guide

### TypeScript
- Strict mode enabled
- Type-safe components and utilities
- Comprehensive type definitions
- Zero TypeScript errors required for build

### Testing
- Jest + React Testing Library for unit tests
- fast-check for property-based testing
- Test coverage reporting
- Separate test scripts for different test types

## Development Workflow

1. **Install dependencies**: `npm install`
2. **Set up environment**: Copy `.env.example` to `.env.local` and configure
3. **Run development server**: `npm run dev`
4. **Run tests**: `npm test`
5. **Run property-based tests**: `npm run test:pbt`
6. **Type check**: `npm run type-check`
7. **Lint code**: `npm run lint`
8. **Format code**: `npm run format`
9. **Build for production**: `npm run build`
10. **Start production server**: `npm start`

## Next Steps

Follow the implementation tasks in `.kiro/specs/sukoon-nextjs-migration/tasks.md` to build out the application components and features.

## Security Notes

This project uses:
- **Next.js 16.0.7+** to address CVE-2025-55182 and CVE-2025-66478
- **React 19.2.1+** for compatibility with security patches
- Security headers configured in next.config.js
- Environment variable validation
- Input sanitization for forms

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [next-pwa Documentation](https://github.com/shadowwalker/next-pwa)
