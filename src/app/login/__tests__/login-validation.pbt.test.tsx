/**
 * Property-based tests for login input validation
 * Feature: sukoon-nextjs-migration
 */

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import fc from 'fast-check';
import { z } from 'zod';
import LoginPage from '../page';

// Validation schemas (same as in the component)
const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email format'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must be at least 8 characters'),
});

const signupSchema = z
  .object({
    name: z.string().min(1, 'Name is required').min(2, 'Name must be at least 2 characters'),
    email: z.string().min(1, 'Email is required').email('Invalid email format'),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

describe('Login Input Validation Property-Based Tests', () => {
  /**
   * Property 40: Login Input Validation
   * Validates: Requirements 14.3
   * 
   * For any login form input, email format should be validated and
   * password requirements should be enforced before submission.
   */
  it('Property 40: login validation schema should reject invalid email formats', () => {
    fc.assert(
      fc.property(
        fc.string().filter(s => s.trim().length > 0 && !s.includes('@')),
        fc.string({ minLength: 8 }),
        (invalidEmail, validPassword) => {
          const result = loginSchema.safeParse({
            email: invalidEmail,
            password: validPassword,
          });

          // Invalid email should cause validation to fail
          expect(result.success).toBe(false);
          if (!result.success) {
            const emailError = result.error.issues.find(issue => issue.path.includes('email'));
            expect(emailError).toBeDefined();
            expect(emailError?.message).toMatch(/invalid email/i);
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 40: Password length validation
   * Validates: Requirements 14.3
   */
  it('Property 40: login validation schema should reject passwords shorter than 8 characters', () => {
    fc.assert(
      fc.property(
        fc.emailAddress(),
        fc.string({ minLength: 1, maxLength: 7 }),
        (validEmail, shortPassword) => {
          const result = loginSchema.safeParse({
            email: validEmail,
            password: shortPassword,
          });

          // Short password should cause validation to fail
          expect(result.success).toBe(false);
          if (!result.success) {
            const passwordError = result.error.issues.find(issue => issue.path.includes('password'));
            expect(passwordError).toBeDefined();
            // Could be either "Password is required" or "at least 8 characters"
            expect(passwordError?.message).toMatch(/password|at least 8 characters/i);
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 40: Empty field validation
   * Validates: Requirements 14.3
   */
  it('Property 40: login validation schema should reject empty required fields', () => {
    fc.assert(
      fc.property(
        fc.record({
          email: fc.string(),
          password: fc.string(),
        }),
        (formData) => {
          const result = loginSchema.safeParse(formData);

          // If email is empty, validation should fail
          if (formData.email === '') {
            expect(result.success).toBe(false);
            if (!result.success) {
              expect(result.error.issues.some(issue => issue.path.includes('email'))).toBe(true);
            }
          }

          // If password is empty, validation should fail
          if (formData.password === '') {
            expect(result.success).toBe(false);
            if (!result.success) {
              expect(result.error.issues.some(issue => issue.path.includes('password'))).toBe(true);
            }
          }

          // If both fields are valid, validation should pass
          // Email must be valid format (not just contain @)
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (
            emailRegex.test(formData.email) &&
            formData.password.length >= 8
          ) {
            expect(result.success).toBe(true);
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 40: Signup password complexity - missing uppercase
   * Validates: Requirements 14.3
   */
  it('Property 40: signup validation should reject passwords without uppercase letters', () => {
    fc.assert(
      fc.property(
        fc.emailAddress(),
        fc.string({ minLength: 2 }).filter(s => s.trim().length >= 2),
        fc.string({ minLength: 8 }).filter(s => !/[A-Z]/.test(s) && /[a-z]/.test(s) && /[0-9]/.test(s)),
        (validEmail, validName, passwordNoUppercase) => {
          const result = signupSchema.safeParse({
            name: validName,
            email: validEmail,
            password: passwordNoUppercase,
            confirmPassword: passwordNoUppercase,
          });

          // Password without uppercase should fail
          expect(result.success).toBe(false);
          if (!result.success) {
            const passwordError = result.error.issues.find(issue => 
              issue.path.includes('password') && issue.message.includes('uppercase')
            );
            expect(passwordError).toBeDefined();
          }
        }
      ),
      { numRuns: 50 }
    );
  });

  /**
   * Property 40: Signup password complexity - missing lowercase
   * Validates: Requirements 14.3
   */
  it('Property 40: signup validation should reject passwords without lowercase letters', () => {
    fc.assert(
      fc.property(
        fc.emailAddress(),
        fc.string({ minLength: 2 }).filter(s => s.trim().length >= 2),
        fc.string({ minLength: 8 }).filter(s => /[A-Z]/.test(s) && !/[a-z]/.test(s) && /[0-9]/.test(s)),
        (validEmail, validName, passwordNoLowercase) => {
          const result = signupSchema.safeParse({
            name: validName,
            email: validEmail,
            password: passwordNoLowercase,
            confirmPassword: passwordNoLowercase,
          });

          // Password without lowercase should fail
          expect(result.success).toBe(false);
          if (!result.success) {
            const passwordError = result.error.issues.find(issue => 
              issue.path.includes('password') && issue.message.includes('lowercase')
            );
            expect(passwordError).toBeDefined();
          }
        }
      ),
      { numRuns: 50 }
    );
  });

  /**
   * Property 40: Signup password complexity - missing number
   * Validates: Requirements 14.3
   */
  it('Property 40: signup validation should reject passwords without numbers', () => {
    fc.assert(
      fc.property(
        fc.emailAddress(),
        fc.string({ minLength: 2 }).filter(s => s.trim().length >= 2),
        fc.string({ minLength: 8 }).filter(s => /[A-Z]/.test(s) && /[a-z]/.test(s) && !/[0-9]/.test(s)),
        (validEmail, validName, passwordNoNumber) => {
          const result = signupSchema.safeParse({
            name: validName,
            email: validEmail,
            password: passwordNoNumber,
            confirmPassword: passwordNoNumber,
          });

          // Password without number should fail
          expect(result.success).toBe(false);
          if (!result.success) {
            const passwordError = result.error.issues.find(issue => 
              issue.path.includes('password') && issue.message.includes('number')
            );
            expect(passwordError).toBeDefined();
          }
        }
      ),
      { numRuns: 50 }
    );
  });

  /**
   * Property 40: Password confirmation matching
   * Validates: Requirements 14.3
   */
  it('Property 40: signup validation schema should reject mismatched passwords', () => {
    fc.assert(
      fc.property(
        fc.emailAddress(),
        fc.string({ minLength: 2 }),
        fc.string({ minLength: 8 }).filter(s => /[A-Z]/.test(s) && /[a-z]/.test(s) && /[0-9]/.test(s)),
        fc.string({ minLength: 8 }).filter(s => /[A-Z]/.test(s) && /[a-z]/.test(s) && /[0-9]/.test(s)),
        (validEmail, validName, password1, password2) => {
          // Only test when passwords are different
          if (password1 !== password2) {
            const result = signupSchema.safeParse({
              name: validName,
              email: validEmail,
              password: password1,
              confirmPassword: password2,
            });

            // Mismatched passwords should cause validation to fail
            expect(result.success).toBe(false);
            if (!result.success) {
              const confirmError = result.error.issues.find(issue => 
                issue.path.includes('confirmPassword')
              );
              expect(confirmError).toBeDefined();
              expect(confirmError?.message).toMatch(/don't match/i);
            }
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 40 (Edge Case): UI displays validation errors
   * Validates: Requirements 14.3
   */
  it('Property 40: should display validation errors in UI when login form is submitted with invalid data', async () => {
    const user = userEvent.setup();
    render(<LoginPage />);

    // Submit without filling any fields
    const submitButton = screen.getByRole('button', { name: /sign in/i });
    await user.click(submitButton);

    // Required fields should show errors
    await waitFor(() => {
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/password is required/i)).toBeInTheDocument();
    });
  });

  /**
   * Property 40 (Edge Case): UI displays validation errors for signup
   * Validates: Requirements 14.3
   */
  it('Property 40: should display validation errors in UI when signup form is submitted with invalid data', async () => {
    const user = userEvent.setup();
    render(<LoginPage />);

    // Switch to signup mode
    const signupToggle = screen.getByRole('button', { name: /sign up/i });
    await user.click(signupToggle);

    // Submit without filling any fields
    const submitButton = screen.getByRole('button', { name: /create account/i });
    await user.click(submitButton);

    // Required fields should show errors
    await waitFor(() => {
      expect(screen.getByText(/name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/password is required/i)).toBeInTheDocument();
    });
  });
});
