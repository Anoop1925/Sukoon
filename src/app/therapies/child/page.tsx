'use client';

import Image from 'next/image';
import dynamic from 'next/dynamic';

// Lazy load YouTube embeds
const YouTubeEmbed = dynamic(() => import('@/components/therapy/YouTubeEmbed').then(mod => ({ default: mod.YouTubeEmbed })), {
  loading: () => <div className="bg-gray-200 animate-pulse rounded-lg aspect-video"></div>,
  ssr: false
});

/**
 * Child Therapy Page
 * Displays information about child therapy with images and videos
 */
export default function ChildTherapyPage() {
  const childImages = [
    '/images/slider-8.jpg',
    '/images/slider-3.jpg',
    '/images/slider-4.jpg',
    '/images/slider-5.jpg',
    '/images/slider-6.jpg',
    '/images/slider-2.jpg',
    '/images/slider-7.jpg',
    '/images/slider-9.jpg'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center bg-gradient-to-br from-pink-500 to-purple-600 text-white">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Welcome to Our <span className="text-pink-200">Child Therapy</span>
          </h1>
          <h3 className="text-xl md:text-2xl font-light">
            Learn more about child therapy. Watch their images and videos<br />
            to gain some happiness and relief from your problems.
          </h3>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 px-4 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">About</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="relative h-96">
            <Image
              src="/images/about-child.jpg"
              alt="Child Therapy"
              fill
              className="object-cover rounded-lg"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div>
            <div className="space-y-4 text-lg text-gray-700">
              <p className="font-semibold text-xl text-gray-900">A baby's smile is so powerful that it can make you forget all the troubles in the world.</p>
              
              <div className="mt-6 space-y-3">
                <h3 className="font-semibold text-xl text-gray-900 mb-3">Why Child Therapy Works:</h3>
                <div className="flex items-start gap-3">
                  <span className="text-pink-500 text-2xl">•</span>
                  <p><strong>Instant Joy:</strong> Children's laughter and playfulness trigger the release of endorphins, our body's natural mood elevators.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-pink-500 text-2xl">•</span>
                  <p><strong>Stress Relief:</strong> Watching children play helps reduce cortisol levels and promotes relaxation.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-pink-500 text-2xl">•</span>
                  <p><strong>Perspective Shift:</strong> Their innocent joy reminds us of life's simple pleasures and helps us reconnect with our inner child.</p>
                </div>
              </div>
              
              <p className="mt-6 italic text-gray-600">
                "Children are natural healers. Their genuine smiles, uninhibited laughter, and boundless curiosity remind us of the beauty in everyday moments."
              </p>
            </div>
          </div>
        </div>
      </section>

      <hr className="border-gray-300 max-w-7xl mx-auto" />

      {/* Images Section */}
      <section id="images" className="py-16 px-4 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Images</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {childImages.map((image, index) => (
            <div key={index} className="relative h-64 bg-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
              <Image
                src={image}
                alt={`Child ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              />
            </div>
          ))}
        </div>
      </section>

      <hr className="border-gray-300 max-w-7xl mx-auto" />

      {/* Videos Section */}
      <section id="videos" className="py-16 px-4 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Videos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <YouTubeEmbed videoId="_NTfTd4HCRo" title="Child Video 1" />
          <YouTubeEmbed videoId="zs21cKJs87E" title="Child Video 2" />
          <YouTubeEmbed videoId="1YBheuHma8I" title="Child Video 3" />
          <YouTubeEmbed videoId="L49VXZwfup8" title="Child Video 4" />
          <YouTubeEmbed videoId="gB12TV38QBo" title="Child Video 5" />
          <YouTubeEmbed videoId="cmCtTFRLaks" title="Child Video 6" />
        </div>
      </section>
    </div>
  );
}
