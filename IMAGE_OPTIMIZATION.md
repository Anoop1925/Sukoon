# Image Optimization Strategy

## Overview

The Sukoon Next.js application uses Next.js's built-in Image component for automatic image optimization. This provides several benefits:

- Automatic WebP and AVIF conversion
- Responsive image sizing
- Lazy loading by default
- Blur placeholder support
- Optimized delivery

## Configuration

### Next.js Image Component Settings

The `next.config.js` file is configured with the following image optimization settings:

```javascript
images: {
  formats: ['image/webp', 'image/avif'],
  deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  remotePatterns: [
    {
      protocol: 'https',
      hostname: '**',
    },
  ],
  dangerouslyAllowSVG: true,
  contentDispositionType: 'attachment',
  contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  minimumCacheTTL: 60,
}
```

### Automatic Format Conversion

Next.js automatically converts images to WebP and AVIF formats when:
1. The browser supports these formats
2. Images are served through the Next.js Image component
3. The image is requested at runtime

**No manual conversion is needed** - Next.js handles this automatically.

## Image Usage Guidelines

### Using the Next.js Image Component

Always use the Next.js Image component for optimal performance:

```tsx
import Image from 'next/image';

<Image
  src="/images/example.jpg"
  alt="Descriptive alt text"
  width={800}
  height={600}
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
  quality={85}
/>
```

### Image Sizes

The configuration includes responsive sizes for different use cases:

- **Device Sizes**: Used for full-width or layout-responsive images
  - Mobile: 640px, 750px, 828px
  - Tablet: 1080px, 1200px
  - Desktop: 1920px, 2048px, 3840px

- **Image Sizes**: Used for fixed-size images (icons, thumbnails, etc.)
  - 16px, 32px, 48px, 64px, 96px, 128px, 256px, 384px

### Blur Placeholder

For better UX, use blur placeholders:

1. **Automatic**: For local images, Next.js can generate blur placeholders automatically
2. **Manual**: For remote images, provide a `blurDataURL`

```tsx
// Automatic (local images)
<Image src="/images/local.jpg" alt="..." width={800} height={600} placeholder="blur" />

// Manual (remote images)
<Image 
  src="https://example.com/image.jpg" 
  alt="..." 
  width={800} 
  height={600}
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRg..."
/>
```

### Image Quality

- Default quality: 75 (good balance between size and quality)
- For hero images: Use quality={85-90}
- For thumbnails: Use quality={60-70}
- For icons: Use quality={100} or SVG

## Performance Benefits

### Automatic Optimizations

1. **Format Selection**: Serves WebP/AVIF to supporting browsers, falls back to original format
2. **Responsive Sizing**: Serves appropriately sized images based on device
3. **Lazy Loading**: Images load only when they enter the viewport
4. **Caching**: Optimized images are cached for 60 seconds minimum
5. **Compression**: Automatic compression based on quality settings

### Service Worker Caching

The PWA service worker caches optimized images:

```javascript
{
  urlPattern: /\/_next\/image\?url=.+$/i,
  handler: 'StaleWhileRevalidate',
  options: {
    cacheName: 'next-image',
    expiration: {
      maxEntries: 64,
      maxAgeSeconds: 24 * 60 * 60, // 24 hours
    },
  },
}
```

## Migration Notes

### Original Images

Original images from `Sukoon-main/images/` should be:
1. Copied to `public/images/` directory
2. Referenced using the Next.js Image component
3. No manual WebP conversion needed

### Image Formats Supported

- JPEG/JPG
- PNG
- GIF (animated GIFs are supported)
- WebP (input and output)
- AVIF (output only)
- SVG (with security restrictions)

## Testing

Image optimization is tested through:
1. Property-based tests verifying all images use Next.js Image component
2. Manual testing with browser DevTools to verify WebP/AVIF delivery
3. Lighthouse audits to verify image optimization scores

## Best Practices

1. ✅ Always use Next.js Image component for images
2. ✅ Provide width and height to prevent layout shift
3. ✅ Use descriptive alt text for accessibility
4. ✅ Use blur placeholders for better UX
5. ✅ Choose appropriate quality settings per use case
6. ✅ Use responsive sizes with `sizes` prop when needed
7. ❌ Don't use `<img>` tags directly
8. ❌ Don't manually convert images to WebP
9. ❌ Don't skip alt text

## Resources

- [Next.js Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)
- [Image Component API Reference](https://nextjs.org/docs/app/api-reference/components/image)
