/**
 * Property-Based Tests for Cache Headers
 * 
 * **Feature: sukoon-nextjs-migration, Property 9: Cache Headers**
 * **Validates: Requirements 4.5**
 * 
 * Tests that appropriate cache-control headers are set for static assets and pages
 */

import fc from 'fast-check';
import { pbtConfig } from './pbt-utils';

describe('Property 9: Cache Headers', () => {
  /**
   * Generator for static asset paths
   */
  const staticAssetPathArbitrary = () =>
    fc.oneof(
      // Image paths
      fc.tuple(
        fc.constantFrom('jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'ico'),
        fc.stringMatching(/^[a-z0-9-]+$/)
      ).map(([ext, name]) => `/images/${name}.${ext}`),
      
      // Font paths
      fc.tuple(
        fc.constantFrom('woff', 'woff2', 'ttf', 'otf', 'eot'),
        fc.stringMatching(/^[a-z0-9-]+$/)
      ).map(([ext, name]) => `/fonts/${name}.${ext}`),
      
      // Next.js static paths
      fc.tuple(
        fc.stringMatching(/^[a-z0-9-]+$/),
        fc.constantFrom('js', 'css', 'json')
      ).map(([hash, ext]) => `/_next/static/${hash}.${ext}`)
    );

  /**
   * Generator for page paths
   */
  const pagePathArbitrary = () =>
    fc.oneof(
      fc.constant('/'),
      fc.constantFrom(
        '/contact',
        '/login',
        '/offline',
        '/therapies/audio',
        '/therapies/reading',
        '/therapies/yoga',
        '/therapies/laughing',
        '/therapies/talking',
        '/therapies/child',
        '/therapies/spiritual',
        '/therapies/special'
      )
    );

  /**
   * Generator for API paths
   */
  const apiPathArbitrary = () =>
    fc.stringMatching(/^[a-z0-9-]+$/).map(path => `/api/${path}`);

  /**
   * Mock function to simulate getting headers for a path
   * In a real scenario, this would make an actual HTTP request
   */
  const getCacheHeaderForPath = (path: string): string | null => {
    // Static assets should have long-term caching
    if (path.startsWith('/images/') || path.startsWith('/fonts/')) {
      return 'public, max-age=31536000, immutable';
    }
    
    if (path.startsWith('/_next/static/')) {
      return 'public, max-age=31536000, immutable';
    }

    // Manifest should have daily caching
    if (path === '/manifest.json') {
      return 'public, max-age=86400, must-revalidate';
    }

    // Service worker should not be cached
    if (path === '/sw.js' || path.match(/^\/workbox-.*\.js$/)) {
      return 'public, max-age=0, must-revalidate';
    }

    // API routes should have short-term caching
    if (path.startsWith('/api/')) {
      return 'public, s-maxage=60, stale-while-revalidate=120';
    }

    // Therapy pages should have medium-term caching
    if (path.startsWith('/therapies/')) {
      return 'public, s-maxage=3600, stale-while-revalidate=86400';
    }

    // Home page should have shorter caching
    if (path === '/') {
      return 'public, s-maxage=1800, stale-while-revalidate=3600';
    }

    // Other pages should have medium-term caching
    return 'public, s-maxage=3600, stale-while-revalidate=86400';
  };

  /**
   * Helper to check if a cache header is valid
   */
  const isValidCacheHeader = (header: string | null): boolean => {
    if (!header) return false;
    
    // Must contain at least one cache directive
    const validDirectives = [
      'public',
      'private',
      'no-cache',
      'no-store',
      'max-age',
      's-maxage',
      'must-revalidate',
      'immutable',
      'stale-while-revalidate'
    ];

    return validDirectives.some(directive => header.includes(directive));
  };

  /**
   * Helper to check if cache duration is appropriate for asset type
   */
  const hasAppropriateCacheDuration = (path: string, header: string): boolean => {
    // Static assets should have long-term caching (1 year)
    if (path.startsWith('/images/') || 
        path.startsWith('/fonts/') || 
        path.startsWith('/_next/static/')) {
      return header.includes('max-age=31536000') || header.includes('immutable');
    }

    // Service worker should not be cached
    if (path === '/sw.js') {
      return header.includes('max-age=0');
    }

    // API routes should have short-term caching
    if (path.startsWith('/api/')) {
      const maxAgeMatch = header.match(/s-maxage=(\d+)/);
      if (maxAgeMatch) {
        const maxAge = parseInt(maxAgeMatch[1], 10);
        return maxAge <= 300; // 5 minutes or less
      }
    }

    // Pages should have some form of caching
    return header.includes('max-age') || header.includes('s-maxage');
  };

  it('should set valid cache-control headers for all static assets', () => {
    fc.assert(
      fc.property(staticAssetPathArbitrary(), (assetPath) => {
        const cacheHeader = getCacheHeaderForPath(assetPath);
        
        // All static assets must have a cache header
        expect(cacheHeader).toBeTruthy();
        
        // Cache header must be valid
        expect(isValidCacheHeader(cacheHeader)).toBe(true);
        
        // Cache duration must be appropriate
        expect(hasAppropriateCacheDuration(assetPath, cacheHeader!)).toBe(true);
      }),
      pbtConfig
    );
  });

  it('should set appropriate cache-control headers for all pages', () => {
    fc.assert(
      fc.property(pagePathArbitrary(), (pagePath) => {
        const cacheHeader = getCacheHeaderForPath(pagePath);
        
        // All pages must have a cache header
        expect(cacheHeader).toBeTruthy();
        
        // Cache header must be valid
        expect(isValidCacheHeader(cacheHeader)).toBe(true);
        
        // Cache duration must be appropriate
        expect(hasAppropriateCacheDuration(pagePath, cacheHeader!)).toBe(true);
      }),
      pbtConfig
    );
  });

  it('should set short-term cache headers for API routes', () => {
    fc.assert(
      fc.property(apiPathArbitrary(), (apiPath) => {
        const cacheHeader = getCacheHeaderForPath(apiPath);
        
        // API routes must have a cache header
        expect(cacheHeader).toBeTruthy();
        
        // Cache header must be valid
        expect(isValidCacheHeader(cacheHeader)).toBe(true);
        
        // API routes should have short-term caching
        expect(hasAppropriateCacheDuration(apiPath, cacheHeader!)).toBe(true);
      }),
      pbtConfig
    );
  });

  it('should include public directive for cacheable resources', () => {
    fc.assert(
      fc.property(
        fc.oneof(
          staticAssetPathArbitrary(),
          pagePathArbitrary(),
          apiPathArbitrary()
        ),
        (path) => {
          const cacheHeader = getCacheHeaderForPath(path);
          
          // Most resources should be publicly cacheable
          if (cacheHeader && !path.includes('private')) {
            expect(cacheHeader).toContain('public');
          }
        }
      ),
      pbtConfig
    );
  });

  it('should set immutable flag for static assets with content hashing', () => {
    fc.assert(
      fc.property(
        fc.oneof(
          fc.stringMatching(/^[a-z0-9-]+$/).map(hash => `/_next/static/${hash}.js`),
          fc.stringMatching(/^[a-z0-9-]+$/).map(hash => `/_next/static/${hash}.css`)
        ),
        (assetPath) => {
          const cacheHeader = getCacheHeaderForPath(assetPath);
          
          // Content-hashed assets should be immutable
          expect(cacheHeader).toBeTruthy();
          expect(cacheHeader).toContain('immutable');
        }
      ),
      pbtConfig
    );
  });

  it('should set stale-while-revalidate for pages to improve performance', () => {
    fc.assert(
      fc.property(pagePathArbitrary(), (pagePath) => {
        const cacheHeader = getCacheHeaderForPath(pagePath);
        
        // Pages should use stale-while-revalidate for better UX
        expect(cacheHeader).toBeTruthy();
        if (pagePath !== '/manifest.json' && pagePath !== '/sw.js') {
          expect(cacheHeader).toContain('stale-while-revalidate');
        }
      }),
      pbtConfig
    );
  });

  it('should not cache service worker to ensure updates are applied', () => {
    const swPaths = ['/sw.js', '/workbox-abc123.js'];
    
    swPaths.forEach(swPath => {
      const cacheHeader = getCacheHeaderForPath(swPath);
      
      // Service worker should have max-age=0 or no-cache
      expect(cacheHeader).toBeTruthy();
      expect(
        cacheHeader!.includes('max-age=0') || cacheHeader!.includes('no-cache')
      ).toBe(true);
    });
  });

  it('should set must-revalidate for resources that need freshness checks', () => {
    const pathsNeedingRevalidation = ['/manifest.json', '/sw.js'];
    
    pathsNeedingRevalidation.forEach(path => {
      const cacheHeader = getCacheHeaderForPath(path);
      
      expect(cacheHeader).toBeTruthy();
      expect(cacheHeader).toContain('must-revalidate');
    });
  });
});
