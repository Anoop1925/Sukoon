# PWA Configuration for Sukoon Next.js

## Current Status

The project is configured with `next-pwa` for Progressive Web App functionality. However, there are some compatibility considerations with Next.js 16 and Turbopack.

## Configuration

### next.config.js

The PWA configuration is set up in `next.config.js` using the `withPWA` wrapper from `next-pwa`. This includes:

- Service worker generation
- Cache strategies for different asset types
- Offline support
- Background sync capabilities

### Cache Strategies

The following cache strategies are configured:

1. **Google Fonts**: CacheFirst strategy with 365-day expiration
2. **Font Assets**: StaleWhileRevalidate with 7-day expiration
3. **Images**: StaleWhileRevalidate with 24-hour expiration
4. **Next.js Images**: StaleWhileRevalidate with 24-hour expiration
5. **Audio/Video**: CacheFirst with range request support
6. **JavaScript**: StaleWhileRevalidate with 24-hour expiration
7. **CSS**: StaleWhileRevalidate with 24-hour expiration
8. **Next.js Data**: StaleWhileRevalidate with 24-hour expiration
9. **Pages**: NetworkFirst with 24-hour expiration

## Important Notes

### Next.js 16 and Turbopack

Next.js 16 uses Turbopack by default, which may have compatibility issues with some webpack-based plugins like `next-pwa`. The current configuration includes:

```javascript
turbopack: {}
```

This enables Turbopack while allowing the PWA configuration to work.

### Development vs Production

The PWA is disabled in development mode to avoid caching issues during development:

```javascript
disable: process.env.NODE_ENV === 'development'
```

### Service Worker Files

When the PWA is built, the following files are generated in the `public/` directory:

- `sw.js` - Service worker script
- `sw.js.map` - Source map for debugging
- `workbox-*.js` - Workbox runtime files
- `worker-*.js` - Additional worker files

These files are gitignored and regenerated on each build.

## Testing PWA Functionality

### Local Testing

1. Build the production version:
   ```bash
   npm run build
   npm start
   ```

2. Open the application in a browser (Chrome recommended)

3. Open DevTools → Application → Service Workers to verify registration

4. Test offline functionality:
   - Visit a few pages while online
   - Go offline (DevTools → Network → Offline)
   - Navigate to previously visited pages
   - They should load from cache

### PWA Installation

1. Visit the site in a supported browser (Chrome, Edge, Safari on iOS)
2. Look for the install prompt or use the browser's install option
3. Install the app to your device
4. Launch the installed app

## Manifest Configuration

The PWA manifest should be created at `public/manifest.json` with the following structure:

```json
{
  "name": "Sukoon - Mental Health & Wellness",
  "short_name": "Sukoon",
  "description": "Stress-relief therapy services for mental health and wellness",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#0ea5e9",
  "icons": [
    {
      "src": "/icons/icon-72x72.png",
      "sizes": "72x72",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-96x96.png",
      "sizes": "96x96",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-128x128.png",
      "sizes": "128x128",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-144x144.png",
      "sizes": "144x144",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-152x152.png",
      "sizes": "152x152",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-384x384.png",
      "sizes": "384x384",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

## Alternative PWA Approaches

If `next-pwa` causes issues with Next.js 16, consider these alternatives:

### 1. Manual Service Worker

Create a custom service worker in `public/sw.js` and register it manually in your app.

### 2. Workbox CLI

Use Workbox CLI to generate a service worker separately from the Next.js build process.

### 3. Next.js Built-in PWA Support

Wait for Next.js to provide built-in PWA support in future versions.

### 4. Use Webpack Mode

If necessary, you can force webpack mode instead of Turbopack:

```bash
npm run build -- --webpack
```

However, this is not recommended as Turbopack provides better performance.

## Troubleshooting

### Service Worker Not Registering

1. Check that you're running in production mode (`npm run build && npm start`)
2. Verify the service worker file exists in `public/sw.js`
3. Check browser console for registration errors
4. Ensure you're accessing the site via HTTPS (or localhost)

### Cache Not Working

1. Clear browser cache and service worker
2. Unregister existing service workers in DevTools
3. Rebuild the application
4. Test again

### Build Errors

If you encounter build errors related to next-pwa:

1. Check that `turbopack: {}` is set in `next.config.js`
2. Verify next-pwa version compatibility
3. Consider using webpack mode temporarily: `npm run build -- --webpack`

## Resources

- [next-pwa Documentation](https://github.com/shadowwalker/next-pwa)
- [Workbox Documentation](https://developers.google.com/web/tools/workbox)
- [PWA Best Practices](https://web.dev/progressive-web-apps/)
- [Next.js PWA Guide](https://nextjs.org/docs/app/building-your-application/configuring/progressive-web-apps)
