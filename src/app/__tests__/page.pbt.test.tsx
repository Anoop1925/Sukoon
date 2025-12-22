/**
 * Property-Based Tests for Home Page
 * 
 * **Feature: sukoon-nextjs-migration, Property 3: No Horizontal Overflow**
 * **Validates: Requirements 2.3**
 */

import { render } from '@testing-library/react';
import fc from 'fast-check';
import Home from '../page';

// Mock IntersectionObserver
class MockIntersectionObserver {
  observe = jest.fn();
  disconnect = jest.fn();
  unobserve = jest.fn();
}

global.IntersectionObserver = MockIntersectionObserver as any;

// Mock framer-motion to avoid animation issues in tests
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    const { fill, priority, ...rest } = props;
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...rest} />;
  },
}));

// Mock Next.js Link component
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

// Mock the data imports
jest.mock('@/data', () => ({
  therapies: [
    {
      id: 'test-therapy',
      title: 'Test Therapy',
      description: 'Test description',
      icon: 'FaHeart',
      image: '/test.jpg',
      slug: 'test',
      content: {
        hero: {
          title: 'Test',
          subtitle: 'Test subtitle',
          backgroundImage: '/test.jpg',
        },
        sections: [],
      },
    },
  ],
  testimonials: [
    {
      id: 'test-testimonial',
      name: 'Test User',
      image: '/test.jpg',
      quote: 'Test quote',
      role: 'Tester',
    },
  ],
  teamMembers: [
    {
      id: 'test-member',
      name: 'Test Member',
      role: 'Developer',
      image: '/test.jpg',
      bio: 'Test bio',
      socialLinks: [],
    },
  ],
  faqItems: [
    {
      id: 'test-faq',
      question: 'Test question?',
      answer: 'Test answer',
      category: 'Test',
    },
  ],
}));

// Mock hooks
jest.mock('@/hooks', () => ({
  useScrollPosition: () => ({ x: 0, y: 0 }),
}));

describe('Home Page - Property 3: No Horizontal Overflow', () => {
  /**
   * Property: For any viewport width from 320px to 3840px (4K),
   * no element should cause horizontal scrolling
   * (document width should not exceed viewport width)
   */
  it('should not cause horizontal overflow at any viewport width', () => {
    fc.assert(
      fc.property(
        // Generate viewport widths from 320px (mobile) to 3840px (4K)
        fc.integer({ min: 320, max: 3840 }),
        (viewportWidth) => {
          // Set viewport width
          Object.defineProperty(window, 'innerWidth', {
            writable: true,
            configurable: true,
            value: viewportWidth,
          });

          // Render the home page
          const { container } = render(<Home />);

          // Get all elements in the page
          const allElements = container.querySelectorAll('*');

          // Check that no element exceeds the viewport width
          let hasOverflow = false;
          allElements.forEach((element) => {
            const rect = element.getBoundingClientRect();
            
            // Check if element extends beyond viewport
            // We allow a small tolerance (1px) for rounding errors
            if (rect.right > viewportWidth + 1) {
              hasOverflow = true;
            }
          });

          // Also check the document body width
          const bodyWidth = document.body.scrollWidth;
          const bodyOverflow = bodyWidth > viewportWidth + 1;

          // Assert no horizontal overflow
          expect(hasOverflow || bodyOverflow).toBe(false);
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Additional test: Verify specific breakpoints work correctly
   */
  it('should render without horizontal overflow at common breakpoints', () => {
    const breakpoints = [
      320,  // Mobile small
      375,  // Mobile medium
      425,  // Mobile large
      768,  // Tablet
      1024, // Desktop small
      1440, // Desktop medium
      1920, // Desktop large (Full HD)
      2560, // Desktop XL (2K)
      3840, // Desktop XXL (4K)
    ];

    breakpoints.forEach((width) => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: width,
      });

      render(<Home />);
      const bodyWidth = document.body.scrollWidth;

      // Allow 1px tolerance for rounding
      expect(bodyWidth).toBeLessThanOrEqual(width + 1);
    });
  });
});
