'use client';

import Image from 'next/image';
import dynamic from 'next/dynamic';

// Lazy load YouTube embeds
const YouTubeEmbed = dynamic(() => import('@/components/therapy/YouTubeEmbed').then(mod => ({ default: mod.YouTubeEmbed })), {
  loading: () => <div className="bg-gray-200 animate-pulse rounded-lg aspect-video"></div>,
  ssr: false
});

/**
 * Laughing Therapy Page
 * Displays information about laughter therapy, memes, and standup comedy videos
 */
export default function LaughingTherapyPage() {
  const memes = [
    '/images/meme1.jpg',
    '/images/meme2.jpg',
    '/images/meme3.jpg',
    '/images/meme4.jpg',
    '/images/meme5.jpg',
    '/images/meme6.jpg'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center bg-gradient-to-br from-yellow-500 to-orange-600 text-white">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Welcome to Our <span className="text-yellow-200">Laughing Therapy</span>
          </h1>
          <h3 className="text-xl md:text-2xl font-light">
            Read some memes and enjoy watching standup to gain some happiness<br />
            and relief from your problems.
          </h3>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 px-4 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">About Laughter Yoga</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="relative h-96">
            <Image
              src="/images/laugh.jpg"
              alt="Laughter Therapy"
              fill
              className="object-cover rounded-lg"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-4 text-gray-700">Laughter Yoga includes four things:</h3>
            <ol className="space-y-3 list-decimal list-inside text-lg text-gray-600">
              <li>Clapping in rhythm to 'ho-ho-ha-ha-ha'.</li>
              <li>Breathing and stretching.</li>
              <li>Child-like play.</li>
              <li>Laughter exercises.</li>
            </ol>
            <a
              href="https://www.healthline.com/nutrition/laughing-yoga"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-6 bg-orange-600 text-white px-6 py-2 rounded-md hover:bg-orange-700 transition-colors duration-200"
            >
              Know More
            </a>
          </div>
        </div>
      </section>

      <hr className="border-gray-300 max-w-7xl mx-auto" />

      {/* Memes Section */}
      <section id="memes" className="py-16 px-4 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Memes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {memes.map((meme, index) => (
            <div key={index} className="relative h-96 bg-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
              <Image
                src={meme}
                alt={`Meme ${index + 1}`}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          ))}
        </div>
      </section>

      <hr className="border-gray-300 max-w-7xl mx-auto" />

      {/* Standups Section */}
      <section id="standups" className="py-16 px-4 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Standups</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <YouTubeEmbed videoId="Tqsz6fjvhZM" title="Standup Comedy 1" />
          <YouTubeEmbed videoId="Y2Oj9gllHno" title="Standup Comedy 2" />
          <YouTubeEmbed videoId="XDlyS4N__3o" title="Standup Comedy 3" />
          <YouTubeEmbed videoId="z12bz7adLKI" title="Standup Comedy 4" />
          <YouTubeEmbed videoId="pjSxOnCkHIA" title="Standup Comedy 5" />
          <YouTubeEmbed videoId="J38ZBIvLank" title="Standup Comedy 6" />
          <YouTubeEmbed videoId="dtaJzUbQS7E" title="Standup Comedy 7" />
          <YouTubeEmbed videoId="8PtsKRBgLrA" title="Standup Comedy 8" />
          <YouTubeEmbed videoId="cHLM9L_5gj0" title="Standup Comedy 9" />
          <YouTubeEmbed videoId="injU8xUHoyU" title="Standup Comedy 10" />
          <YouTubeEmbed videoId="_9x9zagDbks" title="Standup Comedy 12" />
          <YouTubeEmbed videoId="L9pA6sZZjeY" title="Standup Comedy 13" />
          <YouTubeEmbed videoId="MLOp3iQFlXY" title="Standup Comedy 14" />
          <YouTubeEmbed videoId="AhacYw9dkyE" title="Standup Comedy 15" />
          <YouTubeEmbed videoId="qkxuFKqJXWY" title="Standup Comedy 16" />
        </div>
      </section>
    </div>
  );
}
