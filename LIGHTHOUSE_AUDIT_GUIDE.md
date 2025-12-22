# Lighthouse Audit Guide

This guide explains how to run Lighthouse audits on the Sukoon Next.js application to verify performance scores meet the requirement of > 90.

## Prerequisites

1. Build the application:
   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm start
   ```
   
   The server will run on `http://localhost:3000`

## Running Lighthouse Audits

### Option 1: Using the Automated Script

We've provided a script that audits all major pages automatically:

```bash
node lighthouse-audit.js
```

This script will:
- Audit the home page
- Audit all therapy pages (audio, reading, yoga)
- Audit the contact page
- Generate JSON reports in the `lighthouse-reports/` directory
- Display scores for Performance, Accessibility, Best Practices, and SEO
- Verify that Performance scores are > 90

### Option 2: Using Chrome DevTools

1. Open Chrome browser
2. Navigate to the page you want to audit (e.g., `http://localhost:3000`)
3. Open DevTools (F12 or Right-click → Inspect)
4. Go to the "Lighthouse" tab
5. Select the categories you want to audit:
   - ✅ Performance
   - ✅ Accessibility
   - ✅ Best Practices
   - ✅ SEO
6. Click "Analyze page load"
7. Review the results

### Option 3: Using Lighthouse CLI

Install Lighthouse globally (if not already installed):
```bash
npm install -g lighthouse
```

Run Lighthouse on a specific page:
```bash
lighthouse http://localhost:3000 --view
```

Run Lighthouse on a specific page and save the report:
```bash
lighthouse http://localhost:3000 --output=html --output-path=./lighthouse-report.html
```

## Pages to Audit

Ensure you audit at least these major pages:

1. **Home Page**: `http://localhost:3000/`
2. **Audio Therapy**: `http://localhost:3000/therapies/audio`
3. **Reading Therapy**: `http://localhost:3000/therapies/reading`
4. **Yoga Therapy**: `http://localhost:3000/therapies/yoga`
5. **Contact Page**: `http://localhost:3000/contact`

## Performance Requirements

According to Requirement 4.3, the application must achieve:

- **Performance Score**: > 90
- **Accessibility Score**: > 90 (recommended)
- **Best Practices Score**: > 90 (recommended)
- **SEO Score**: > 90 (recommended)

## Performance Optimizations Implemented

The following optimizations have been implemented to achieve high performance scores:

### 1. Code Splitting
- Dynamic imports for heavy components (Testimonials, FAQ, Services, etc.)
- Lazy loading of therapy page content (Spotify embeds, YouTube embeds, Book cards)
- Loading states for better perceived performance

### 2. Caching Headers
- Long-term caching for static assets (images, fonts, JS, CSS): 1 year
- Medium-term caching for pages: 1 hour with stale-while-revalidate
- Short-term caching for API routes: 1 minute with stale-while-revalidate
- Service worker caching disabled to ensure updates

### 3. Image Optimization
- Next.js Image component for automatic optimization
- WebP and AVIF format support
- Responsive image sizes
- Lazy loading by default
- Blur placeholders for better UX

### 4. PWA Features
- Service worker for offline functionality
- Aggressive caching strategies
- Optimized runtime caching for fonts, images, and assets

### 5. Build Optimizations
- React Strict Mode enabled
- Compression enabled
- CSS optimization enabled
- Turbopack support for faster builds

## Troubleshooting

### Low Performance Score

If the performance score is below 90, check:

1. **First Contentful Paint (FCP)**: Should be < 1.8s
   - Ensure critical CSS is inlined
   - Minimize render-blocking resources

2. **Largest Contentful Paint (LCP)**: Should be < 2.5s
   - Optimize hero images
   - Preload critical resources

3. **Total Blocking Time (TBT)**: Should be < 200ms
   - Reduce JavaScript execution time
   - Split large bundles

4. **Cumulative Layout Shift (CLS)**: Should be < 0.1
   - Add width/height to images
   - Reserve space for dynamic content

### Common Issues

1. **Server not running**: Ensure `npm start` is running before auditing
2. **Port conflicts**: If port 3000 is in use, update the URLs in the script
3. **Network issues**: Run audits on a stable network connection
4. **Browser extensions**: Disable extensions that might interfere with audits

## Interpreting Results

### Performance Score Breakdown

- **90-100**: Excellent - No action needed
- **50-89**: Needs improvement - Review recommendations
- **0-49**: Poor - Significant optimization required

### Key Metrics

- **FCP (First Contentful Paint)**: Time until first content appears
- **LCP (Largest Contentful Paint)**: Time until main content is visible
- **TBT (Total Blocking Time)**: Time the page is blocked from user interaction
- **CLS (Cumulative Layout Shift)**: Visual stability during page load
- **Speed Index**: How quickly content is visually displayed

## Next Steps

After running the audits:

1. Review the generated reports in `lighthouse-reports/`
2. If any page scores below 90, review the specific recommendations
3. Implement suggested optimizations
4. Re-run the audits to verify improvements
5. Document any issues that cannot be resolved and their reasons

## Additional Resources

- [Lighthouse Documentation](https://developers.google.com/web/tools/lighthouse)
- [Web Vitals](https://web.dev/vitals/)
- [Next.js Performance](https://nextjs.org/docs/advanced-features/measuring-performance)
- [Chrome DevTools Performance](https://developer.chrome.com/docs/devtools/performance/)
