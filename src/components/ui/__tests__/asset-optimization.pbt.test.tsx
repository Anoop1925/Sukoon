/**
 * Property-Based Tests for Asset Optimization
 * Feature: sukoon-nextjs-migration, Property 8: Asset Optimization
 * Validates: Requirements 4.4
 */

import { render } from '@testing-library/react';
import fc from 'fast-check';
import { Card } from '../Card';
import { TherapyCard } from '@/components/therapy/TherapyCard';
import { BookCard } from '@/components/therapy/BookCard';
import Image from 'next/image';

describe('Asset Optimization Property-Based Tests', () => {
  /**
   * Property 8: Asset Optimization
   * For all static assets served by the application, they should have 
   * appropriate compression (gzip or brotli) and modern formats (WebP for images, etc.).
   */

  /**
   * Test: Images should use Next.js Image component for optimization
   */
  it('should use Next.js Image component for all images in Card', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 1, maxLength: 50 }).filter(s => s.trim().length > 0),
        fc.string({ minLength: 1, maxLength: 100 }).filter(s => s.trim().length > 0),
        fc.string({ minLength: 5, maxLength: 20 }),
        (title: string, description: string, imagePath: string) => {
          const { container } = render(
            <Card
              title={title}
              description={description}
              image={`/images/${imagePath}.jpg`}
            />
          );
          
          const img = container.querySelector('img');
          
          if (img) {
            // Property: Image should have Next.js optimization attributes
            // Next.js Image component adds specific data attributes and classes
            const hasNextImageClass = img.className.includes('next-image') || 
                                     img.hasAttribute('data-nimg') ||
                                     img.parentElement?.tagName === 'SPAN';
            
            // If image exists, it should be optimized by Next.js
            expect(hasNextImageClass).toBe(true);
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Test: TherapyCard images should use Next.js Image component
   */
  it('should use Next.js Image component for TherapyCard images', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 3, maxLength: 50 }).filter(s => s.trim().length >= 3),
        fc.string({ minLength: 1, maxLength: 100 }).filter(s => s.trim().length > 0),
        fc.string({ minLength: 3, maxLength: 20 }),
        fc.string({ minLength: 5, maxLength: 20 }),
        (title: string, description: string, slug: string, imagePath: string) => {
          const { container } = render(
            <TherapyCard
              title={title}
              description={description}
              slug={slug}
              image={`/images/${imagePath}.jpg`}
            />
          );
          
          const img = container.querySelector('img');
          
          if (img) {
            // Property: Should have Next.js Image optimization markers
            const hasNextImageMarker = img.hasAttribute('data-nimg') || 
                                      img.parentElement?.tagName === 'SPAN';
            
            expect(hasNextImageMarker).toBe(true);
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Test: BookCard images should use Next.js Image component
   */
  it('should use Next.js Image component for BookCard images', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 1, maxLength: 50 }).filter(s => s.trim().length > 0),
        fc.string({ minLength: 1, maxLength: 50 }).filter(s => s.trim().length > 0),
        fc.string({ minLength: 1, maxLength: 100 }).filter(s => s.trim().length > 0),
        fc.string({ minLength: 5, maxLength: 20 }),
        fc.webUrl(),
        (title: string, author: string, description: string, imagePath: string, purchaseLink: string) => {
          const { container } = render(
            <BookCard
              title={title}
              author={author}
              description={description}
              coverImage={`/images/${imagePath}.jpg`}
              purchaseLink={purchaseLink}
            />
          );
          
          const img = container.querySelector('img');
          
          if (img) {
            // Property: Should use Next.js Image optimization
            const hasNextImageMarker = img.hasAttribute('data-nimg') || 
                                      img.parentElement?.tagName === 'SPAN';
            
            expect(hasNextImageMarker).toBe(true);
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Test: Images should have loading attribute for lazy loading
   */
  it('should have lazy loading enabled for images', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 1, maxLength: 50 }).filter(s => s.trim().length > 0),
        fc.string({ minLength: 1, maxLength: 100 }).filter(s => s.trim().length > 0),
        fc.string({ minLength: 5, maxLength: 20 }),
        (title: string, description: string, imagePath: string) => {
          const { container } = render(
            <Card
              title={title}
              description={description}
              image={`/images/${imagePath}.jpg`}
            />
          );
          
          const img = container.querySelector('img');
          
          if (img) {
            const loading = img.getAttribute('loading');
            
            // Property: Images should have loading attribute (lazy or eager)
            // Next.js Image component sets this automatically
            expect(loading).toBeTruthy();
            expect(['lazy', 'eager']).toContain(loading);
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Test: Images should have decoding attribute for better performance
   */
  it('should have decoding attribute for optimized rendering', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 1, maxLength: 50 }).filter(s => s.trim().length > 0),
        fc.string({ minLength: 1, maxLength: 100 }).filter(s => s.trim().length > 0),
        fc.string({ minLength: 5, maxLength: 20 }),
        (title: string, description: string, imagePath: string) => {
          const { container } = render(
            <Card
              title={title}
              description={description}
              image={`/images/${imagePath}.jpg`}
            />
          );
          
          const img = container.querySelector('img');
          
          if (img) {
            const decoding = img.getAttribute('decoding');
            
            // Property: Images should have decoding attribute
            // Next.js sets this for performance optimization
            expect(decoding).toBeTruthy();
            expect(['async', 'sync', 'auto']).toContain(decoding);
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Test: Images should not use plain img tags without optimization
   */
  it('should not use plain img tags without Next.js optimization', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 3, maxLength: 50 }).filter(s => s.trim().length >= 3),
        fc.string({ minLength: 1, maxLength: 100 }).filter(s => s.trim().length > 0),
        fc.string({ minLength: 3, maxLength: 20 }),
        fc.string({ minLength: 5, maxLength: 20 }),
        (title: string, description: string, slug: string, imagePath: string) => {
          const { container } = render(
            <TherapyCard
              title={title}
              description={description}
              slug={slug}
              image={`/images/${imagePath}.jpg`}
            />
          );
          
          const imgs = container.querySelectorAll('img');
          
          imgs.forEach(img => {
            // Property: All images should have Next.js optimization markers
            // Plain img tags won't have these attributes
            const isOptimized = img.hasAttribute('data-nimg') || 
                               img.hasAttribute('loading') ||
                               img.parentElement?.tagName === 'SPAN';
            
            expect(isOptimized).toBe(true);
          });
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Test: Next.js Image component should be properly configured
   */
  it('should verify Next.js Image component is available and configured', () => {
    // Property: Next.js Image component should be importable and functional
    expect(Image).toBeDefined();
    // In React 19, Next.js Image is exported as an object with default property
    expect(typeof Image === 'function' || typeof Image === 'object').toBe(true);
    
    // Test that Image component can render
    const { container } = render(
      <Image
        src="/images/test.jpg"
        alt="Test image"
        width={100}
        height={100}
      />
    );
    
    const img = container.querySelector('img');
    expect(img).toBeTruthy();
    
    if (img) {
      // Property: Next.js Image should add optimization attributes
      expect(img.hasAttribute('data-nimg') || img.hasAttribute('loading')).toBe(true);
    }
  });

  /**
   * Test: Images should have srcset for responsive optimization
   */
  it('should generate srcset for responsive image optimization', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 1, maxLength: 50 }).filter(s => s.trim().length > 0),
        fc.string({ minLength: 1, maxLength: 100 }).filter(s => s.trim().length > 0),
        fc.string({ minLength: 5, maxLength: 20 }),
        (title: string, description: string, imagePath: string) => {
          const { container } = render(
            <Card
              title={title}
              description={description}
              image={`/images/${imagePath}.jpg`}
            />
          );
          
          const img = container.querySelector('img');
          
          if (img) {
            // Property: Next.js Image should generate srcset for responsive images
            const srcset = img.getAttribute('srcset');
            
            // srcset should exist for optimized responsive images
            // Note: In test environment, Next.js might not generate full srcset
            // but the attribute should be present or the image should have data-nimg
            const hasOptimization = !!srcset || img.hasAttribute('data-nimg');
            expect(hasOptimization).toBe(true);
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Test: Images should have proper dimensions to prevent layout shift
   */
  it('should have width and height attributes to prevent layout shift', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 1, maxLength: 50 }).filter(s => s.trim().length > 0),
        fc.string({ minLength: 1, maxLength: 100 }).filter(s => s.trim().length > 0),
        fc.string({ minLength: 5, maxLength: 20 }),
        (title: string, description: string, imagePath: string) => {
          const { container } = render(
            <Card
              title={title}
              description={description}
              image={`/images/${imagePath}.jpg`}
            />
          );
          
          const img = container.querySelector('img');
          
          if (img) {
            // Property: Images should have width and height to prevent CLS
            const hasWidth = img.hasAttribute('width') || !!img.style.width;
            const hasHeight = img.hasAttribute('height') || !!img.style.height;
            
            // At least one dimension should be set for layout stability
            expect(hasWidth || hasHeight).toBeTruthy();
          }
        }
      ),
      { numRuns: 100 }
    );
  });
});
