/**
 * Authentication-related type definitions
 */

/**
 * Login form data structure
 */
export interface LoginFormData {
  email: string;
  password: string;
}

/**
 * Signup form data structure
 */
export interface SignupFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

/**
 * Form validation errors
 */
export interface AuthFormErrors {
  email?: string;
  password?: string;
  name?: string;
  confirmPassword?: string;
}

/**
 * User data structure
 */
export interface User {
  id: string;
  name: string;
  email: string;
}

/**
 * Authentication context state
 */
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
