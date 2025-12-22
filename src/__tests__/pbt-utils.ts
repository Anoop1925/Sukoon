/**
 * Property-Based Testing Utilities
 * 
 * This file contains common utilities and generators for property-based testing
 * using fast-check library.
 */

import fc from 'fast-check';

/**
 * Generates valid email addresses for testing
 */
export const emailArbitrary = () =>
  fc
    .tuple(
      fc.stringMatching(/^[a-z0-9]+$/),
      fc.stringMatching(/^[a-z0-9]+$/),
      fc.stringMatching(/^[a-z]{2,}$/)
    )
    .map(([local, domain, tld]) => `${local}@${domain}.${tld}`);

/**
 * Generates non-empty strings (excluding whitespace-only strings)
 */
export const nonEmptyStringArbitrary = () =>
  fc.string({ minLength: 1 }).filter((s) => s.trim().length > 0);

/**
 * Generates valid viewport widths for responsive testing
 */
export const viewportWidthArbitrary = () =>
  fc.integer({ min: 320, max: 3840 });

/**
 * Generates valid scroll positions
 */
export const scrollPositionArbitrary = () =>
  fc.record({
    x: fc.integer({ min: 0, max: 10000 }),
    y: fc.integer({ min: 0, max: 10000 }),
  });

/**
 * Generates valid URLs for testing
 */
export const urlArbitrary = () =>
  fc
    .tuple(
      fc.constantFrom('http', 'https'),
      fc.stringMatching(/^[a-z0-9-]+$/),
      fc.stringMatching(/^[a-z]{2,}$/),
      fc.option(fc.stringMatching(/^\/[a-z0-9/-]*$/), { nil: undefined })
    )
    .map(([protocol, domain, tld, path]) => 
      `${protocol}://${domain}.${tld}${path || ''}`
    );

/**
 * Generates valid hex color codes
 */
export const hexColorArbitrary = () =>
  fc
    .hexaString({ minLength: 6, maxLength: 6 })
    .map((hex) => `#${hex}`);

/**
 * Generates valid ARIA roles
 */
export const ariaRoleArbitrary = () =>
  fc.constantFrom(
    'button',
    'link',
    'navigation',
    'main',
    'complementary',
    'contentinfo',
    'banner',
    'search',
    'form',
    'region',
    'article',
    'section',
    'heading',
    'list',
    'listitem',
    'img',
    'figure'
  );

/**
 * Configuration for property tests
 * Ensures all property tests run with consistent settings
 */
export const pbtConfig = {
  numRuns: 100,
  verbose: false,
  endOnFailure: true,
};

/**
 * Helper to create a property test with standard configuration
 */
export function createPropertyTest<T>(
  arbitrary: fc.Arbitrary<T>,
  predicate: (value: T) => boolean | void,
  config: Partial<typeof pbtConfig> = {}
) {
  return fc.assert(
    fc.property(arbitrary, predicate),
    { ...pbtConfig, ...config }
  );
}
