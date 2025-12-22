'use client';

import { useState, useEffect, useCallback } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

/**
 * Props for the Carousel component
 */
export interface CarouselProps<T> {
  /** Array of items to display in the carousel */
  items: T[];
  /** Function to render each item */
  renderItem: (item: T, index: number) => React.ReactNode;
  /** Enable automatic slide advancement (default: false) */
  autoPlay?: boolean;
  /** Time in milliseconds between auto-advances (default: 5000) */
  interval?: number;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Carousel Component
 * 
 * A generic carousel/slider component with navigation controls, indicators,
 * and optional auto-play functionality. Supports any type of content through
 * the renderItem prop.
 * 
 * @component
 * @example
 * // Basic testimonials carousel
 * <Carousel
 *   items={testimonials}
 *   renderItem={(testimonial) => (
 *     <TestimonialCard {...testimonial} />
 *   )}
 * />
 * 
 * @example
 * // Auto-playing image carousel
 * <Carousel
 *   items={images}
 *   renderItem={(image) => <img src={image.url} alt={image.alt} />}
 *   autoPlay={true}
 *   interval={3000}
 * />
 * 
 * @example
 * // Custom styled carousel
 * <Carousel
 *   items={products}
 *   renderItem={(product) => <ProductCard {...product} />}
 *   className="max-w-4xl mx-auto"
 * />
 * 
 * Features:
 * - Generic type support for any content
 * - Previous/Next navigation buttons
 * - Dot indicators for direct navigation
 * - Optional auto-play with pause on hover
 * - Smooth slide transitions
 * - Keyboard accessible
 * - ARIA attributes for screen readers
 * - Responsive design
 * 
 * Accessibility:
 * - role="region" with aria-label
 * - aria-hidden for non-visible slides
 * - aria-current for active indicator
 * - Keyboard navigable buttons
 * - Focus management
 * 
 * Special Considerations:
 * - Auto-play pauses on mouse hover
 * - Handles empty items array gracefully
 * - Single item hides navigation controls
 * - Uses 'use client' directive (client component)
 */
export function Carousel<T>({
  items,
  renderItem,
  autoPlay = false,
  interval = 5000,
  className = ''
}: CarouselProps<T>): React.ReactElement {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  }, [items.length]);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? items.length - 1 : prevIndex - 1
    );
  }, [items.length]);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  useEffect(() => {
    if (!autoPlay || isPaused || items.length <= 1) {
      return;
    }

    const timer = setInterval(goToNext, interval);

    return () => {
      clearInterval(timer);
    };
  }, [autoPlay, isPaused, interval, goToNext, items.length]);

  const handleMouseEnter = () => {
    if (autoPlay) {
      setIsPaused(true);
    }
  };

  const handleMouseLeave = () => {
    if (autoPlay) {
      setIsPaused(false);
    }
  };

  if (items.length === 0) {
    return <div className="text-center text-gray-500">No items to display</div>;
  }

  return (
    <div
      className={`relative ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="region"
      aria-label="Carousel"
    >
      {/* Carousel Content */}
      <div className="overflow-hidden">
        <div
          className="transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          <div className="flex">
            {items.map((item, index) => (
              <div
                key={index}
                className="w-full flex-shrink-0"
                aria-hidden={index !== currentIndex}
              >
                {renderItem(item, index)}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      {items.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-3 shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
            aria-label="Previous slide"
          >
            <FaChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-3 shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
            aria-label="Next slide"
          >
            <FaChevronRight className="w-5 h-5" />
          </button>
        </>
      )}

      {/* Indicators */}
      {items.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                index === currentIndex
                  ? 'bg-purple-600 w-8'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === currentIndex}
            />
          ))}
        </div>
      )}
    </div>
  );
}
