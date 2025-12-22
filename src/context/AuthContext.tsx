'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import type { User, AuthState } from '@/types';

/**
 * Authentication context interface
 */
interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (user: User) => void;
}

/**
 * Authentication context
 * Provides authentication state and methods throughout the application
 */
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Props for AuthProvider component
 */
interface AuthProviderProps {
  children: ReactNode;
}

/**
 * Authentication provider component
 * Wraps the application to provide authentication state and methods
 * 
 * @example
 * ```tsx
 * <AuthProvider>
 *   <App />
 * </AuthProvider>
 * ```
 */
export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Login function (placeholder)
   * TODO: Integrate with authentication provider (e.g., NextAuth, Firebase, Auth0)
   * 
   * @param email - User email address
   * @param password - User password
   */
  const login = useCallback(async (email: string, _password: string) => {
    setIsLoading(true);
    try {
      // TODO: Implement actual authentication logic
      // Example: Call API endpoint, validate credentials, get user data
      console.log('Login attempt:', { email });
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Mock user data (replace with actual API response)
      const mockUser: User = {
        id: '1',
        name: 'John Doe',
        email: email,
      };
      
      setUser(mockUser);
      
      // TODO: Store auth token in localStorage or cookies
      // localStorage.setItem('authToken', token);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Signup function (placeholder)
   * TODO: Integrate with authentication provider
   * 
   * @param name - User full name
   * @param email - User email address
   * @param password - User password
   */
  const signup = useCallback(async (name: string, email: string, _password: string) => {
    setIsLoading(true);
    try {
      // TODO: Implement actual signup logic
      // Example: Call API endpoint, create user account, get user data
      console.log('Signup attempt:', { name, email });
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Mock user data (replace with actual API response)
      const mockUser: User = {
        id: '1',
        name: name,
        email: email,
      };
      
      setUser(mockUser);
      
      // TODO: Store auth token in localStorage or cookies
      // localStorage.setItem('authToken', token);
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Logout function
   * Clears user data and authentication state
   */
  const logout = useCallback(() => {
    setUser(null);
    
    // TODO: Clear auth token from storage
    // localStorage.removeItem('authToken');
    
    // TODO: Call API to invalidate session if needed
    console.log('User logged out');
  }, []);

  /**
   * Update user data
   * Allows updating user information without re-authentication
   * 
   * @param updatedUser - Updated user data
   */
  const updateUser = useCallback((updatedUser: User) => {
    setUser(updatedUser);
  }, []);

  const value: AuthContextType = {
    user,
    isAuthenticated: user !== null,
    isLoading,
    login,
    signup,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * Custom hook to use authentication context
 * Must be used within AuthProvider
 * 
 * @returns Authentication context value
 * @throws Error if used outside AuthProvider
 * 
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { user, isAuthenticated, login, logout } = useAuth();
 *   
 *   if (!isAuthenticated) {
 *     return <button onClick={() => login(email, password)}>Login</button>;
 *   }
 *   
 *   return (
 *     <div>
 *       <p>Welcome, {user.name}!</p>
 *       <button onClick={logout}>Logout</button>
 *     </div>
 *   );
 * }
 * ```
 */
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
}

/**
 * Export AuthContext for advanced use cases
 */
export { AuthContext };
