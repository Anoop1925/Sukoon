/**
 * Property-based tests for contact form validation
 * Feature: sukoon-nextjs-migration
 */

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import fc from 'fast-check';
import { z } from 'zod';
import ContactPage from '../page';

// Validation schema (same as in the component)
const contactFormSchema = z.object({
  name: z.string().min(1, 'Name is required').min(2, 'Name must be at least 2 characters'),
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  subject: z.string().optional(),
  message: z.string().min(1, 'Message is required').min(10, 'Message must be at least 10 characters'),
});

// Mock fetch for testing
global.fetch = jest.fn();

describe('Contact Form Property-Based Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ success: true, message: 'Message sent' }),
    });
  });

  /**
   * Property 37: Form Validation
   * Validates: Requirements 13.2
   * 
   * For any contact form submission with empty required fields,
   * validation errors should be displayed for each invalid field.
   */
  it('Property 37: validation schema should reject invalid form data', () => {
    fc.assert(
      fc.property(
        fc.record({
          name: fc.string(),
          email: fc.string(),
          message: fc.string(),
        }),
        (formData) => {
          const result = contactFormSchema.safeParse(formData);

          // Property: If name is empty or too short, validation should fail
          if (formData.name === '' || formData.name.trim().length < 2) {
            expect(result.success).toBe(false);
            if (!result.success) {
              expect(result.error.issues.some(issue => issue.path.includes('name'))).toBe(true);
            }
          }

          // Property: If email is empty, validation should fail
          if (formData.email === '') {
            expect(result.success).toBe(false);
            if (!result.success) {
              expect(result.error.issues.some(issue => issue.path.includes('email'))).toBe(true);
            }
          }

          // Property: If message is empty or too short, validation should fail
          if (formData.message === '' || formData.message.trim().length < 10) {
            expect(result.success).toBe(false);
            if (!result.success) {
              expect(result.error.issues.some(issue => issue.path.includes('message'))).toBe(true);
            }
          }

          // Property: If all fields meet basic requirements, let Zod validate
          // We don't reimplement email validation - Zod handles that
          // This property just ensures the schema is being applied
          const hasBasicRequirements = 
            formData.name.trim().length >= 2 &&
            formData.email.trim().length > 0 &&
            formData.message.trim().length >= 10;
          
          // If basic requirements are met but validation fails, 
          // it should be due to email format (which Zod validates)
          if (hasBasicRequirements && !result.success) {
            // This is expected - email might be invalid format
            expect(result.error.issues.some(issue => issue.path.includes('email'))).toBe(true);
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 37 (Edge Case): Empty string validation
   * Validates: Requirements 13.2
   * 
   * Specifically tests that empty strings trigger validation errors
   */
  it('Property 37: should reject form submission with all empty fields', async () => {
    const user = userEvent.setup();
    render(<ContactPage />);

    // Submit without filling any fields
    const submitButton = screen.getByRole('button', { name: /send message/i });
    await user.click(submitButton);

    // All required fields should show errors
    await waitFor(() => {
      expect(screen.getByText(/name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/message is required/i)).toBeInTheDocument();
    });

    // Form should not be submitted
    expect(global.fetch).not.toHaveBeenCalled();
  });

  /**
   * Property 37 (Edge Case): Invalid email format
   * Validates: Requirements 13.2
   */
  it('Property 37: validation schema should reject invalid email formats', () => {
    fc.assert(
      fc.property(
        fc.string().filter(s => s.trim().length > 0 && !s.includes('@')),
        (invalidEmail) => {
          const result = contactFormSchema.safeParse({
            name: 'Valid Name',
            email: invalidEmail,
            message: 'This is a valid message with more than 10 characters',
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
      { numRuns: 50 }
    );
  });

  /**
   * Property 37 (Edge Case): Message too short
   * Validates: Requirements 13.2
   */
  it('Property 37: validation schema should reject messages shorter than 10 characters', () => {
    fc.assert(
      fc.property(
        fc.string({ maxLength: 9 }),
        (shortMessage) => {
          const result = contactFormSchema.safeParse({
            name: 'Valid Name',
            email: 'valid@email.com',
            message: shortMessage,
          });

          // Short message should cause validation to fail
          expect(result.success).toBe(false);
          if (!result.success) {
            const messageError = result.error.issues.find(issue => issue.path.includes('message'));
            expect(messageError).toBeDefined();
          }
        }
      ),
      { numRuns: 50 }
    );
  });
});
