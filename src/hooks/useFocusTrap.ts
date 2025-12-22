/**
 * useFocusTrap hook
 * 
 * Traps focus within a container element, preventing keyboard navigation
 * from leaving the container. Useful for modals and dialogs.
 * 
 * Requirements: 11.2 - Keyboard navigation accessibility
 */

import { useEffect, useRef } from 'react';

/**
 * Options for the focus trap hook
 */
export interface UseFocusTrapOptions {
  /**
   * Whether the focus trap is active
   */
  isActive: boolean;
  /**
   * Whether to focus the first element when activated
   * @default true
   */
  initialFocus?: boolean;
  /**
   * Whether to restore focus to the previously focused element when deactivated
   * @default true
   */
  restoreFocus?: boolean;
}

/**
 * Hook to trap focus within a container element
 * 
 * Prevents keyboard navigation (Tab/Shift+Tab) from leaving the container.
 * Essential for accessible modals, dialogs, and overlays.
 * Automatically handles focus restoration when deactivated.
 * 
 * @template T - Type of HTML element (defaults to HTMLElement)
 * @param options - Focus trap options
 * @param options.isActive - Whether the focus trap is currently active
 * @param options.initialFocus - Whether to focus first element when activated (default: true)
 * @param options.restoreFocus - Whether to restore focus when deactivated (default: true)
 * @returns Ref to attach to the container element that should trap focus
 * 
 * @example
 * // Basic modal with focus trap
 * const [isOpen, setIsOpen] = useState(false);
 * const modalRef = useFocusTrap({ isActive: isOpen });
 * 
 * return (
 *   <div ref={modalRef} role="dialog" aria-modal="true">
 *     <button onClick={() => setIsOpen(false)}>Close</button>
 *     <input type="text" placeholder="Trapped input" />
 *   </div>
 * );
 * 
 * @example
 * // Custom focus behavior
 * const dialogRef = useFocusTrap({
 *   isActive: true,
 *   initialFocus: false,  // Don't auto-focus first element
 *   restoreFocus: true    // Restore focus on close
 * });
 */
export function useFocusTrap<T extends HTMLElement = HTMLElement>(
  options: UseFocusTrapOptions
): React.RefObject<T | null> {
  const {
    isActive,
    initialFocus = true,
    restoreFocus = true
  } = options;

  const containerRef = useRef<T>(null);
  const previouslyFocusedElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isActive || !containerRef.current) {
      return;
    }

    const container = containerRef.current;

    // Store the previously focused element
    if (restoreFocus) {
      previouslyFocusedElement.current = document.activeElement as HTMLElement;
    }

    /**
     * Get all focusable elements within the container
     * Filters out disabled and hidden elements
     * @returns Array of focusable HTML elements
     */
    const getFocusableElements = (): HTMLElement[] => {
      const focusableSelectors = [
        'a[href]',
        'button:not([disabled])',
        'textarea:not([disabled])',
        'input:not([disabled])',
        'select:not([disabled])',
        '[tabindex]:not([tabindex="-1"])'
      ].join(', ');

      return Array.from(
        container.querySelectorAll<HTMLElement>(focusableSelectors)
      ).filter(el => {
        // Filter out elements that are not visible
        return el.offsetParent !== null;
      });
    };

    // Focus the first focusable element
    if (initialFocus) {
      const focusableElements = getFocusableElements();
      if (focusableElements.length > 0) {
        focusableElements[0].focus();
      }
    }

    /**
     * Handle keyboard events to trap focus within container
     * Intercepts Tab and Shift+Tab to cycle focus between first and last elements
     * @param e - Keyboard event
     */
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') {
        return;
      }

      const focusableElements = getFocusableElements();
      if (focusableElements.length === 0) {
        e.preventDefault();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      // Shift + Tab: move focus to the last element if currently on first
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      }
      // Tab: move focus to the first element if currently on last
      else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    // Add event listener
    container.addEventListener('keydown', handleKeyDown);

    // Cleanup
    return () => {
      container.removeEventListener('keydown', handleKeyDown);

      // Restore focus to the previously focused element
      if (restoreFocus && previouslyFocusedElement.current) {
        previouslyFocusedElement.current.focus();
      }
    };
  }, [isActive, initialFocus, restoreFocus]);

  return containerRef;
}
