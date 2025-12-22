import React from 'react';
import Image from 'next/image';

/**
 * Props for the BookCard component
 */
export interface BookCardProps {
  /** Book title */
  title: string;
  /** Book author name */
  author: string;
  /** Brief description of the book */
  description: string;
  /** URL or path to book cover image */
  coverImage: string;
  /** External link to purchase the book */
  purchaseLink: string;
  /** Additional CSS classes */
  className?: string;
}

/**
 * BookCard Component
 * 
 * Displays a book recommendation card with cover image, title, author,
 * description, and purchase link. Optimized images using Next.js Image
 * component. External links open in new tab with security attributes.
 * 
 * @component
 * @example
 * // Basic book card
 * <BookCard
 *   title="The Power of Now"
 *   author="Eckhart Tolle"
 *   description="A guide to spiritual enlightenment"
 *   coverImage="/images/books/power-of-now.jpg"
 *   purchaseLink="https://amazon.com/..."
 * />
 * 
 * @example
 * // Book card with custom styling
 * <BookCard
 *   title="Atomic Habits"
 *   author="James Clear"
 *   description="Tiny changes, remarkable results"
 *   coverImage="/images/books/atomic-habits.jpg"
 *   purchaseLink="https://bookstore.com/..."
 *   className="max-w-sm"
 * />
 * 
 * @example
 * // Multiple book cards in a grid
 * <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
 *   {books.map(book => (
 *     <BookCard key={book.title} {...book} />
 *   ))}
 * </div>
 * 
 * Features:
 * - Optimized cover image with Next.js Image
 * - Responsive image sizing
 * - Hover shadow effect
 * - External link with security attributes
 * - Accessible alt text for images
 * - Clean, card-based design
 * 
 * Accessibility:
 * - Descriptive alt text includes title and author
 * - External link opens in new tab (rel="noopener noreferrer")
 * - Proper semantic HTML structure
 * - Sufficient color contrast
 * 
 * Special Considerations:
 * - External links open in new tab for better UX
 * - Images are lazy-loaded by default
 * - Purchase links should be affiliate links or direct store links
 * - Cover images should be high quality (at least 400x600px)
 */
export function BookCard({
  title,
  author,
  description,
  coverImage,
  purchaseLink,
  className = ''
}: BookCardProps): React.ReactElement {
  return (
    <div className={`card-premium flex flex-col h-full group ${className}`}>
      {/* Book Cover - Square with minimal border */}
      <div className="relative w-full aspect-square mb-4 rounded-lg overflow-hidden bg-surface-elevated border border-border/30">
        <Image
          src={coverImage}
          alt={`${title} by ${author}`}
          fill
          className="object-contain p-3 group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
      </div>
      
      {/* Book Info */}
      <div className="flex flex-col flex-1">
        <h3 className="text-lg font-semibold text-foreground mb-1 line-clamp-2">
          {title}
        </h3>
        <p className="text-sm text-muted mb-3">
          by {author}
        </p>
        <p className="text-sm text-muted-foreground mb-4 flex-1 line-clamp-3">
          {description}
        </p>
        
        {/* Purchase Button */}
        <a
          href={purchaseLink}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-premium w-full text-center text-sm"
        >
          Purchase Book
        </a>
      </div>
    </div>
  );
}
