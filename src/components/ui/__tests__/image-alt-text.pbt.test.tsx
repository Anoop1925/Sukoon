/**
 * Property-Based Tests for Image Alt Text
 * Feature: sukoon-nextjs-migration, Property 35: Image Alt Text
 * Validates: Requirements 11.3
 */

import { render } from '@testing-library/react';
import fc from 'fast-check';
import { Card } from '../Card';
import { TherapyCard } from '@/components/therapy/TherapyCard';
import { BookCard } from '@/components/therapy/BookCard';

describe('Image Alt Text Property-Based Tests', () => {
  /**
   * Property 35: Image Alt Text
   * For all img elements and Next.js Image components, they should have 
   * non-empty alt attributes providing descriptive text.
   */

  /**
   * Test: Card component images should have alt text
   */
  it('should have non-empty alt text for Card component images', () => {
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
            // Property: Image must have alt attribute
            const altText = img.getAttribute('alt');
            expect(altText).toBeTruthy();
            
            // Property: Alt text should be non-empty
            if (altText) {
              expect(altText.trim().length).toBeGreaterThan(0);
            }
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Test: TherapyCard images should have descriptive alt text
   */
  it('should have descriptive alt text for TherapyCard images', () => {
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
            const altText = img.getAttribute('alt');
            
            // Property: Alt text should exist and be non-empty
            expect(altText).toBeTruthy();
            expect(altText?.trim().length).toBeGreaterThan(0);
            
            // Property: Alt text should be descriptive (at least 3 characters)
            if (altText) {
              expect(altText.length).toBeGreaterThanOrEqual(3);
            }
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Test: BookCard images should have alt text with book title and author
   */
  it('should have alt text including book title and author for BookCard', () => {
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
            const altText = img.getAttribute('alt');
            
            // Property: Alt text should exist
            expect(altText).toBeTruthy();
            
            if (altText) {
              // Property: Alt text should be non-empty
              expect(altText.trim().length).toBeGreaterThan(0);
              
              // Property: Alt text should include book title
              expect(altText.toLowerCase()).toContain(title.toLowerCase());
              
              // Property: Alt text should include author name
              expect(altText.toLowerCase()).toContain(author.toLowerCase());
            }
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Test: Card without title should have fallback alt text
   */
  it('should have fallback alt text when Card has no title', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 5, maxLength: 20 }),
        (imagePath: string) => {
          const { container } = render(
            <Card image={`/images/${imagePath}.jpg`} />
          );
          
          const img = container.querySelector('img');
          
          if (img) {
            const altText = img.getAttribute('alt');
            
            // Property: Even without title, alt text should exist
            expect(altText).toBeTruthy();
            
            // Property: Alt text should not be empty
            if (altText) {
              expect(altText.trim().length).toBeGreaterThan(0);
            }
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Test: Alt text should not contain file extensions
   */
  it('should not include file extensions in alt text', () => {
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
            const altText = img.getAttribute('alt');
            
            if (altText) {
              // Property: Alt text should not contain common image file extensions
              expect(altText.toLowerCase()).not.toContain('.jpg');
              expect(altText.toLowerCase()).not.toContain('.jpeg');
              expect(altText.toLowerCase()).not.toContain('.png');
              expect(altText.toLowerCase()).not.toContain('.gif');
              expect(altText.toLowerCase()).not.toContain('.webp');
            }
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Test: Alt text should not be just "image" or "picture"
   */
  it('should have meaningful alt text, not generic terms', () => {
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
            const altText = img.getAttribute('alt');
            
            if (altText) {
              const lowerAlt = altText.toLowerCase().trim();
              
              // Property: Alt text should not be just generic terms
              expect(lowerAlt).not.toBe('image');
              expect(lowerAlt).not.toBe('picture');
              expect(lowerAlt).not.toBe('photo');
              expect(lowerAlt).not.toBe('img');
            }
          }
        }
      ),
      { numRuns: 100 }
    );
  });
});
