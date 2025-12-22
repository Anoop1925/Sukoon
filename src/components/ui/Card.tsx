'use client';

import { HTMLAttributes, forwardRef } from 'react';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'elevated';
  hover?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ children, variant = 'default', hover = true, className = '', ...props }, ref) => {
    const baseStyles = 'rounded-xl transition-all duration-300';
    
    const variants = {
      default: 'bg-surface border border-border p-6 shadow-md',
      glass: 'glass p-6 shadow-lg',
      elevated: 'bg-surface-elevated p-6 shadow-xl',
    };
    
    const hoverStyles = hover ? 'hover:shadow-2xl hover:-translate-y-1' : '';

    return (
      <div
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${hoverStyles} ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';
