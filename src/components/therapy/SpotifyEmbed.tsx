import React from 'react';

/**
 * Props for the SpotifyEmbed component
 */
export interface SpotifyEmbedProps {
  /** Spotify URI or ID (e.g., 'spotify:playlist:37i9dQZF1DXcBWIGoYBM5M' or just the ID) */
  uri: string;
  /** Type of Spotify content to embed */
  type: 'playlist' | 'track' | 'album' | 'episode' | 'show';
  /** Height of the embed in pixels (default: 380) */
  height?: number;
  /** Additional CSS classes */
  className?: string;
}

/**
 * SpotifyEmbed Component
 * 
 * Embeds Spotify content (playlists, tracks, albums, episodes, shows) using
 * Spotify's official embed player. Automatically handles URI parsing and
 * constructs the proper embed URL.
 * 
 * @component
 * @example
 * // Embed a playlist
 * <SpotifyEmbed
 *   uri="spotify:playlist:37i9dQZF1DXcBWIGoYBM5M"
 *   type="playlist"
 * />
 * 
 * @example
 * // Embed a track with custom height
 * <SpotifyEmbed
 *   uri="3n3Ppam7vgaVa1iaRUc9Lp"
 *   type="track"
 *   height={152}
 * />
 * 
 * @example
 * // Embed an album
 * <SpotifyEmbed
 *   uri="spotify:album:6DEjYFkNZh67HP7R9PSZvv"
 *   type="album"
 *   height={380}
 * />
 * 
 * Features:
 * - Supports all Spotify content types
 * - Accepts full URI or just the ID
 * - Responsive width (100%)
 * - Lazy loading for performance
 * - Rounded corners styling
 * - Full Spotify player controls
 * 
 * Special Considerations:
 * - Requires active internet connection
 * - Users need Spotify account for full functionality
 * - Some content may be region-restricted
 * - Autoplay is controlled by Spotify's embed player
 */
export function SpotifyEmbed({
  uri,
  type,
  height = 380,
  className = ''
}: SpotifyEmbedProps): React.ReactElement {
  // Extract the Spotify ID from the URI
  // URI format: spotify:type:id or just the id
  const spotifyId = uri.includes(':') ? uri.split(':').pop() : uri;
  
  // Construct the embed URL
  const embedUrl = `https://open.spotify.com/embed/${type}/${spotifyId}`;

  return (
    <div className={`relative w-full ${className}`} style={{ paddingBottom: '0' }}>
      <iframe
        src={embedUrl}
        width="100%"
        height={height}
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        title={`Spotify ${type}`}
        className="rounded-lg"
      />
    </div>
  );
}
