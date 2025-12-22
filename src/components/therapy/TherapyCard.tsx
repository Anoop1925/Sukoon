import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

/**
 * Props for the TherapyCard component
 */
export interface TherapyCardProps {
  /** Therapy service title */
  title: string;
  /** Brief description of the therapy service */
  description: string;
  /** URL or path to therapy service image */
  image: string;
  /** URL slug for the therapy page (e.g., 'audio', 'yoga') */
  slug: string;
  /** Additional CSS classes */
  className?: string;
}

/**
 * TherapyCard Component
 * 
 * Displays a therapy service card with image, title, and description.
 * Links to the detailed therapy page with hover effects and image optimization.
 * 
 * @component
 * @example
 * // Basic therapy card
 * <TherapyCard
 *   title="Audio Therapy"
 *   description="Relax with curated music and podcasts"
 *   image="/images/audio.png"
 *   slug="audio"
 * />
 * 
 * @example
 * // Multiple therapy cards in a grid
 * <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
 *   {therapies.map(therapy => (
 *     <TherapyCard key={therapy.slug} {...therapy} />
 *   ))}
 * </div>
 * 
 * Features:
 * - Optimized images with Next.js Image
 * - Client-side navigation with Next.js Link
 * - Hover effects (shadow and scale)
 * - Responsive image sizing
 * - Accessible alt text
 * 
 * Special Considerations:
 * - Images are lazy-loaded by default
 * - Links use client-side routing for instant navigation
 * - Hover effects enhance user interaction
 */
export function TherapyCard({
  title,
  description,
  image,
  slug,
  className = ''
}: TherapyCardProps): React.ReactElement {
  return (
    <Link href={`/therapies/${slug}`} className="block">
      <div className={`bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 ${className}`}>
        <div className="relative w-full h-48">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {title}
          </h3>
          <p className="text-gray-600">
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
}
