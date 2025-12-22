/**
 * Property-based tests for validation error display
 * Feature: sukoon-nextjs-migration
 * Property 38: Validation Error Display
 * Validates: Requirements 13.3
 */

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContactPage from '../page';

// Mock fetch for testing
global.fetch = jest.fn();

describe('Validation Error Display Property-Based Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ success: true, message: 'Message sent' }),
    });
  });

  /**
   * Property 38: Validation Error Display
   * Validates: Requirements 13.3
   * 
   * For any form field that fails validation, a clear error message
   * should be displayed near the field.
   */
  it('Property 38: should display error messages near invalid fields', async () => {
    const user = userEvent.setup();
    render(<ContactPage />);

    // Submit empty form to trigger all validation errors
    const submitButton = screen.getByRole('button', { name: /send message/i });
    await user.click(submitButton);

    // Wait for validation errors to appear
    await waitFor(() => {
      // Check that name error is displayed near name field
      const nameError = screen.getByText(/name is required/i);
      expect(nameError).toBeInTheDocument();
      expect(nameError).toHaveAttribute('id', 'name-error');
      expect(nameError).toHaveAttribute('role', 'alert');

      // Check that email error is displayed near email field
      const emailError = screen.getByText(/email is required/i);
      expect(emailError).toBeInTheDocument();
      expect(emailError).toHaveAttribute('id', 'email-error');
      expect(emailError).toHaveAttribute('role', 'alert');

      // Check that message error is displayed near message field
      const messageError = screen.getByText(/message is required/i);
      expect(messageError).toBeInTheDocument();
      expect(messageError).toHaveAttribute('id', 'message-error');
      expect(messageError).toHaveAttribute('role', 'alert');
    });

    // Verify aria-describedby links errors to inputs
    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const messageInput = screen.getByLabelText(/message/i);

    expect(nameInput).toHaveAttribute('aria-describedby', 'name-error');
    expect(emailInput).toHaveAttribute('aria-describedby', 'email-error');
    expect(messageInput).toHaveAttribute('aria-describedby', 'message-error');
  });

  /**
   * Property 38 (Edge Case): Error messages should be visible and styled
   * Validates: Requirements 13.3
   */
  it('Property 38: error messages should have appropriate styling', async () => {
    const user = userEvent.setup();
    render(<ContactPage />);

    // Submit empty form
    const submitButton = screen.getByRole('button', { name: /send message/i });
    await user.click(submitButton);

    await waitFor(() => {
      const nameError = screen.getByText(/name is required/i);
      const emailError = screen.getByText(/email is required/i);
      const messageError = screen.getByText(/message is required/i);

      // Check that errors have red text styling
      expect(nameError).toHaveClass('text-red-600');
      expect(emailError).toHaveClass('text-red-600');
      expect(messageError).toHaveClass('text-red-600');

      // Check that errors are small text
      expect(nameError).toHaveClass('text-sm');
      expect(emailError).toHaveClass('text-sm');
      expect(messageError).toHaveClass('text-sm');
    });
  });

  /**
   * Property 38 (Edge Case): Invalid inputs should have error styling
   * Validates: Requirements 13.3
   */
  it('Property 38: invalid inputs should have visual error indicators', async () => {
    const user = userEvent.setup();
    render(<ContactPage />);

    // Submit empty form
    const submitButton = screen.getByRole('button', { name: /send message/i });
    await user.click(submitButton);

    await waitFor(() => {
      const nameInput = screen.getByLabelText(/name/i);
      const emailInput = screen.getByLabelText(/email/i);
      const messageInput = screen.getByLabelText(/message/i);

      // Check that invalid inputs have aria-invalid attribute
      expect(nameInput).toHaveAttribute('aria-invalid', 'true');
      expect(emailInput).toHaveAttribute('aria-invalid', 'true');
      expect(messageInput).toHaveAttribute('aria-invalid', 'true');

      // Check that invalid inputs have red border styling
      expect(nameInput).toHaveClass('border-red-500');
      expect(emailInput).toHaveClass('border-red-500');
      expect(messageInput).toHaveClass('border-red-500');
    });
  });

  /**
   * Property 38 (Edge Case): Error messages should clear when field becomes valid
   * Validates: Requirements 13.3
   */
  it('Property 38: error messages should disappear when field becomes valid', async () => {
    const user = userEvent.setup();
    render(<ContactPage />);

    // Submit empty form to trigger errors
    const submitButton = screen.getByRole('button', { name: /send message/i });
    await user.click(submitButton);

    // Wait for errors to appear
    await waitFor(() => {
      expect(screen.getByText(/name is required/i)).toBeInTheDocument();
    });

    // Fill in the name field with valid data
    const nameInput = screen.getByLabelText(/name/i);
    await user.type(nameInput, 'John Doe');

    // Wait for name error to disappear
    await waitFor(() => {
      expect(screen.queryByText(/name is required/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/name must be at least 2 characters/i)).not.toBeInTheDocument();
    });

    // Verify name input no longer has error styling
    expect(nameInput).toHaveAttribute('aria-invalid', 'false');
    expect(nameInput).not.toHaveClass('border-red-500');
  });
});
