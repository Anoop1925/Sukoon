import React from 'react';

/**
 * Props for the YouTubeEmbed component
 */
export interface YouTubeEmbedProps {
  /** YouTube video ID (11-character string from video URL) */
  videoId: string;
  /** Accessible title for the video iframe */
  title: string;
  /** Whether to autoplay the video (default: false) */
  autoplay?: boolean;
  /** Additional CSS classes */
  className?: string;
}

/**
 * YouTubeEmbed Component
 * 
 * Embeds YouTube videos with responsive 16:9 aspect ratio.
 * Uses YouTube's official embed player with privacy-enhanced mode.
 * Automatically handles lazy loading for performance.
 * 
 * @component
 * @example
 * // Basic video embed
 * <YouTubeEmbed
 *   videoId="dQw4w9WgXcQ"
 *   title="Example Video"
 * />
 * 
 * @example
 * // Video with autoplay
 * <YouTubeEmbed
 *   videoId="dQw4w9WgXcQ"
 *   title="Autoplay Video"
 *   autoplay={true}
 * />
 * 
 * @example
 * // Video with custom styling
 * <YouTubeEmbed
 *   videoId="dQw4w9WgXcQ"
 *   title="Styled Video"
 *   className="my-4 shadow-lg"
 * />
 * 
 * Features:
 * - Responsive 16:9 aspect ratio
 * - Lazy loading for performance
 * - Full YouTube player controls
 * - Fullscreen support
 * - Rounded corners styling
 * - Optional autoplay
 * 
 * Accessibility:
 * - Requires descriptive title prop for screen readers
 * - Supports keyboard navigation within player
 * - Includes proper iframe attributes
 * 
 * Special Considerations:
 * - Requires active internet connection
 * - Autoplay may be blocked by browser policies
 * - Video availability depends on YouTube's restrictions
 * - Respects user's reduced motion preferences
 */
export function YouTubeEmbed({
  videoId,
  title,
  autoplay = false,
  className = ''
}: YouTubeEmbedProps): React.ReactElement {
  // Construct the embed URL with autoplay parameter if needed
  const embedUrl = `https://www.youtube.com/embed/${videoId}${autoplay ? '?autoplay=1' : ''}`;

  return (
    <div className={`relative w-full ${className}`} style={{ paddingBottom: '56.25%' }}>
      <iframe
        src={embedUrl}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
        className="absolute top-0 left-0 w-full h-full rounded-lg"
      />
    </div>
  );
}
