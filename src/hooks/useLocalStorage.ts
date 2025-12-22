import { useState, useEffect } from 'react';

/**
 * Custom hook to manage state synchronized with localStorage
 * 
 * Provides a useState-like API that persists state to localStorage.
 * Automatically syncs across browser tabs/windows.
 * Safe to use during SSR (returns initialValue on server).
 * Handles JSON serialization/deserialization automatically.
 * 
 * @template T - Type of the stored value
 * @param key - localStorage key to store the value under
 * @param initialValue - initial value if key doesn't exist in localStorage
 * @returns tuple of [storedValue, setValue] similar to useState
 * 
 * @example
 * // Store user preferences
 * const [theme, setTheme] = useLocalStorage('theme', 'light');
 * 
 * // Update theme (persists to localStorage)
 * setTheme('dark');
 * 
 * @example
 * // Store complex objects
 * const [user, setUser] = useLocalStorage('user', {
 *   name: '',
 *   email: ''
 * });
 * 
 * // Update with function (like useState)
 * setUser(prev => ({ ...prev, name: 'John' }));
 * 
 * @example
 * // Store arrays
 * const [items, setItems] = useLocalStorage<string[]>('items', []);
 * setItems([...items, 'new item']);
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void] {
  // State to store our value
  const [storedValue, setStoredValue] = useState<T>(() => {
    // Check if window is defined (client-side)
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  /**
   * Wrapped version of useState's setter function that persists to localStorage
   * Supports both direct values and updater functions
   * @param value - New value or updater function
   */
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      
      // Save state
      setStoredValue(valueToStore);
      
      // Save to local storage
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  // Listen for changes to this key in other tabs/windows
  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue) {
        try {
          setStoredValue(JSON.parse(e.newValue));
        } catch (error) {
          console.error(`Error parsing localStorage value for key "${key}":`, error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [key]);

  return [storedValue, setValue];
}
