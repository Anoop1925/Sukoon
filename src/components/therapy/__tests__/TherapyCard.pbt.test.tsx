/**
 * Property-Based Tests for TherapyCard Component
 * Feature: sukoon-nextjs-migration, Property 7: Image Optimization
 * Validates: Requirements 4.2
 */

import { render } from '@testing-library/react';
import fc from 'fast-check';
import { TherapyCard } from '../TherapyCard';

describe('TherapyCard Property-Based Tests', () => {
  /**
   * Property 7: Image Optimization
   * For all images rendered in the application, they should use the Next.js Image component
   * for automatic optimization and lazy loading.
   */
  it('should use Next.js Image component for all therapy card images', () => {
    fc.assert(
      fc.property(
        // Generate random therapy card data
        fc.record({
          title: fc.string({ minLength: 1, maxLength: 100 }),
          description: fc.string({ minLength: 1, maxLength: 500 }),
          image: fc.constantFrom(
            '/images/audio.png',
            '/images/reading.png',
            '/images/yoga.png',
            '/images/laughing.png',
            '/images/talking.png',
            '/images/child.jpg',
            '/images/spiritualtherapy.jpg',
            '/images/specialtherapy.jpg'
          ),
          slug: fc.stringOf(fc.constantFrom('a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '-'), { minLength: 3, maxLength: 20 })
        }),
        (therapyData) => {
          const { container } = render(
            <TherapyCard
              title={therapyData.title}
              description={therapyData.description}
              image={therapyData.image}
              slug={therapyData.slug}
            />
          );

          // Check that Next.js Image component is used (it renders as <img> with specific attributes)
          const imgElement = container.querySelector('img');
          
          // Property: Image element should exist
          expect(imgElement).toBeTruthy();

          if (imgElement) {
            // Property: Next.js Image adds specific data attributes and classes
            // The image should have the src attribute
            expect(imgElement.hasAttribute('src')).toBe(true);
            
            // Property: Next.js Image should have alt text
            expect(imgElement.hasAttribute('alt')).toBe(true);
            expect(imgElement.getAttribute('alt')).toBe(therapyData.title);
            
            // Property: Next.js Image should have loading attribute for lazy loading
            // (Next.js Image component adds loading="lazy" by default)
            const loadingAttr = imgElement.getAttribute('loading');
            expect(loadingAttr).toBeTruthy();
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Additional property: All therapy cards should have proper image sizing attributes
   */
  it('should have proper sizing attributes for responsive images', () => {
    fc.assert(
      fc.property(
        fc.record({
          title: fc.string({ minLength: 1, maxLength: 100 }),
          description: fc.string({ minLength: 1, maxLength: 500 }),
          image: fc.constantFrom(
            '/images/audio.png',
            '/images/reading.png',
            '/images/yoga.png'
          ),
          slug: fc.stringOf(fc.constantFrom('a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '-'), { minLength: 3, maxLength: 20 })
        }),
        (therapyData) => {
          const { container } = render(
            <TherapyCard
              title={therapyData.title}
              description={therapyData.description}
              image={therapyData.image}
              slug={therapyData.slug}
            />
          );

          const imgElement = container.querySelector('img');
          
          if (imgElement) {
            // Property: Image should have sizes attribute for responsive loading
            // Next.js Image component should add this
            const sizesAttr = imgElement.getAttribute('sizes');
            expect(sizesAttr).toBeTruthy();
          }
        }
      ),
      { numRuns: 100 }
    );
  });
});
