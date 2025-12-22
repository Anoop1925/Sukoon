/**
 * Property-based test to verify fast-check is working
 */
import fc from 'fast-check';

describe('Property-Based Testing Infrastructure', () => {
  it('should run property tests with fast-check', () => {
    fc.assert(
      fc.property(fc.integer(), fc.integer(), (a, b) => {
        return a + b === b + a; // Commutative property of addition
      }),
      { numRuns: 100 }
    );
  });

  it('should support string properties', () => {
    fc.assert(
      fc.property(fc.string(), (str) => {
        return str.length >= 0; // String length is always non-negative
      }),
      { numRuns: 100 }
    );
  });
});
