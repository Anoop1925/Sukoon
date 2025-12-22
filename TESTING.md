# Testing Guide

This document provides comprehensive information about the testing infrastructure and practices for the Sukoon Next.js application.

## Table of Contents

- [Overview](#overview)
- [Testing Stack](#testing-stack)
- [Running Tests](#running-tests)
- [Test Structure](#test-structure)
- [Property-Based Testing](#property-based-testing)
- [Coverage Reports](#coverage-reports)
- [Writing Tests](#writing-tests)
- [Best Practices](#best-practices)

## Overview

The Sukoon application uses a comprehensive testing strategy that includes:

- **Unit Tests**: Testing individual components and functions in isolation
- **Property-Based Tests (PBT)**: Testing universal properties across many generated inputs
- **Integration Tests**: Testing how components work together

## Testing Stack

- **Jest**: Test runner and assertion library
- **React Testing Library**: Testing utilities for React components
- **fast-check**: Property-based testing library
- **jsdom**: DOM implementation for Node.js (test environment)

## Running Tests

### All Tests

```bash
npm test
```

### Watch Mode

Run tests in watch mode (re-runs tests on file changes):

```bash
npm run test:watch
```

### Property-Based Tests Only

Run only property-based tests (files matching `*.pbt.test.ts`):

```bash
npm run test:pbt
```

### Coverage Reports

Generate a full coverage report:

```bash
npm run test:coverage
```

Generate a summary coverage report:

```bash
npm run test:coverage:summary
```

Coverage reports are generated in the `coverage/` directory and include:
- HTML report: `coverage/lcov-report/index.html`
- Text summary in terminal
- LCOV format for CI/CD integration

### Running Specific Tests

Run tests matching a pattern:

```bash
npm test -- --testPathPattern="Button"
```

Run a specific test file:

```bash
npm test -- src/components/ui/__tests__/Button.test.tsx
```

## Test Structure

### Directory Organization

```
src/
├── __tests__/              # Global test utilities and setup
│   ├── pbt-utils.ts        # Property-based testing utilities
│   ├── pbt-setup.pbt.test.ts
│   └── setup.test.ts
├── components/
│   └── ui/
│       ├── Button.tsx
│       └── __tests__/
│           ├── Button.test.tsx        # Unit tests
│           └── Button.pbt.test.tsx    # Property-based tests
└── hooks/
    ├── useScrollPosition.ts
    └── __tests__/
        └── useScrollPosition.pbt.test.ts
```

### Test File Naming Conventions

- Unit tests: `*.test.ts` or `*.test.tsx`
- Property-based tests: `*.pbt.test.ts` or `*.pbt.test.tsx`
- Test utilities: `*-utils.ts` (excluded from test runs)

## Property-Based Testing

Property-based testing verifies that universal properties hold true across many randomly generated inputs. This approach catches edge cases that might be missed with example-based testing.

### Configuration

All property-based tests run with a minimum of 100 iterations by default (configured in `src/__tests__/pbt-utils.ts`).

### Example Property Test

```typescript
import fc from 'fast-check';
import { pbtConfig } from '@/__tests__/pbt-utils';

describe('Button Component', () => {
  it('should always have accessible labels', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 1 }),
        (buttonText) => {
          const { getByRole } = render(<Button>{buttonText}</Button>);
          const button = getByRole('button');
          expect(button).toHaveAccessibleName();
        }
      ),
      pbtConfig
    );
  });
});
```

### Property Test Utilities

The `src/__tests__/pbt-utils.ts` file provides common generators:

- `emailArbitrary()`: Generates valid email addresses
- `nonEmptyStringArbitrary()`: Generates non-empty strings
- `viewportWidthArbitrary()`: Generates viewport widths (320px - 3840px)
- `scrollPositionArbitrary()`: Generates scroll positions
- `urlArbitrary()`: Generates valid URLs
- `hexColorArbitrary()`: Generates hex color codes
- `ariaRoleArbitrary()`: Generates valid ARIA roles

### Property Test Tags

Each property-based test must include a comment tag referencing the design document:

```typescript
/**
 * Feature: sukoon-nextjs-migration, Property 1: External Link Preservation
 * Validates: Requirements 1.4
 */
it('should preserve external links', () => {
  // test implementation
});
```

## Coverage Reports

### Coverage Thresholds

The project has the following coverage thresholds configured:

- **Statements**: 70%
- **Branches**: 70%
- **Functions**: 70%
- **Lines**: 70%

### Coverage Exclusions

The following files are excluded from coverage:

- Type definition files (`*.d.ts`)
- Story files (`*.stories.tsx`)
- Root layout and page files (`app/layout.tsx`, `app/page.tsx`)

### Viewing Coverage Reports

After running `npm run test:coverage`, open the HTML report:

```bash
# Windows
start coverage/lcov-report/index.html

# macOS
open coverage/lcov-report/index.html

# Linux
xdg-open coverage/lcov-report/index.html
```

## Writing Tests

### Unit Test Example

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '../Button';

describe('Button Component', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Click me');
  });

  it('calls onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies variant styles correctly', () => {
    const { rerender } = render(<Button variant="primary">Button</Button>);
    expect(screen.getByRole('button')).toHaveClass('btn-primary');

    rerender(<Button variant="secondary">Button</Button>);
    expect(screen.getByRole('button')).toHaveClass('btn-secondary');
  });
});
```

### Property-Based Test Example

```typescript
import fc from 'fast-check';
import { render } from '@testing-library/react';
import { pbtConfig, nonEmptyStringArbitrary } from '@/__tests__/pbt-utils';
import { Card } from '../Card';

/**
 * Feature: sukoon-nextjs-migration, Property 35: Image Alt Text
 * Validates: Requirements 11.3
 */
describe('Card Component Property Tests', () => {
  it('should always have alt text for images', () => {
    fc.assert(
      fc.property(
        fc.record({
          title: nonEmptyStringArbitrary(),
          image: fc.webUrl(),
          description: fc.string(),
        }),
        (cardProps) => {
          const { container } = render(<Card {...cardProps} />);
          const images = container.querySelectorAll('img');
          
          images.forEach((img) => {
            expect(img).toHaveAttribute('alt');
            expect(img.getAttribute('alt')).not.toBe('');
          });
        }
      ),
      pbtConfig
    );
  });
});
```

## Best Practices

### General Testing Practices

1. **Test Behavior, Not Implementation**: Focus on what the component does, not how it does it
2. **Use Semantic Queries**: Prefer `getByRole`, `getByLabelText` over `getByTestId`
3. **Keep Tests Simple**: Each test should verify one specific behavior
4. **Avoid Test Interdependence**: Tests should be able to run in any order
5. **Mock External Dependencies**: Mock API calls, timers, and external services

### Property-Based Testing Practices

1. **Define Clear Properties**: Each property should test a universal truth
2. **Use Smart Generators**: Constrain generators to valid input domains
3. **Run Sufficient Iterations**: Minimum 100 iterations per property test
4. **Handle Edge Cases**: Ensure generators cover boundary conditions
5. **Document Properties**: Link each property to requirements in comments

### React Testing Library Best Practices

1. **Query Priority**:
   - `getByRole` (preferred)
   - `getByLabelText`
   - `getByPlaceholderText`
   - `getByText`
   - `getByTestId` (last resort)

2. **Async Testing**: Use `waitFor`, `findBy*` for async operations
3. **User Events**: Use `@testing-library/user-event` for realistic interactions
4. **Accessibility**: Test ARIA attributes and keyboard navigation

### Coverage Best Practices

1. **Aim for High Coverage**: Target 80%+ coverage for critical code
2. **Don't Chase 100%**: Focus on meaningful tests, not coverage numbers
3. **Test Edge Cases**: Ensure error paths and boundary conditions are covered
4. **Review Coverage Reports**: Identify untested code paths regularly

## Continuous Integration

### Pre-commit Checks

Before committing code, run:

```bash
npm run type-check  # TypeScript type checking
npm run lint        # ESLint
npm test            # All tests
```

### CI Pipeline

The CI pipeline should run:

1. Install dependencies
2. Run TypeScript type checking
3. Run ESLint
4. Run all tests with coverage
5. Upload coverage reports
6. Build the application

## Troubleshooting

### Common Issues

**Issue**: Tests fail with "Cannot find module"
**Solution**: Ensure `moduleNameMapper` in `jest.config.js` is correctly configured

**Issue**: Tests timeout
**Solution**: Increase timeout with `jest.setTimeout(10000)` or use `--testTimeout` flag

**Issue**: Coverage thresholds not met
**Solution**: Write more tests or adjust thresholds in `jest.config.js`

**Issue**: Property tests fail intermittently
**Solution**: Check if generators produce invalid inputs; add constraints

### Debug Mode

Run tests with verbose output:

```bash
npm test -- --verbose
```

Run tests with debugging:

```bash
node --inspect-brk node_modules/.bin/jest --runInBand
```

## Resources

- [Jest Documentation](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/react)
- [fast-check Documentation](https://fast-check.dev/)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

## Support

For questions or issues with testing:

1. Check this documentation
2. Review existing test files for examples
3. Consult the design document for property definitions
4. Ask the team for guidance
