'use client';

import Image from 'next/image';
import dynamic from 'next/dynamic';

// Lazy load YouTube embeds
const YouTubeEmbed = dynamic(() => import('@/components/therapy/YouTubeEmbed').then(mod => ({ default: mod.YouTubeEmbed })), {
  loading: () => <div className="bg-gray-200 animate-pulse rounded-lg aspect-video"></div>,
  ssr: false
});

/**
 * Yoga Therapy Page
 * Displays benefits, asanas, and videos for yoga therapy
 */
export default function YogaTherapyPage() {
  const asanas = [
    {
      name: 'Ardha Chakrasana',
      description: 'Ardha Chakrasana, or the Standing Backward Bend Pose, stretches the front upper torso and tones the arms and shoulder muscles.',
      image: '/images/yoga1.webp',
      link: 'https://www.artofliving.org/in-en/yoga/yoga-poses/standing-backward-bend'
    },
    {
      name: 'Virabhadrasana',
      description: 'Virabhadrasana or Warrior Pose increases stamina, strengthens arms, and brings courage and grace. It is an excellent yoga pose for those in sedentary jobs.',
      image: '/images/yoga2.webp',
      link: 'https://www.artofliving.org/in-en/yoga/yoga-poses/warrior-pose-virbhadrasana'
    },
    {
      name: 'Paschim Namaskarasana',
      description: 'This yoga pose opens the abdomen and stretches the upper back and shoulder joints.',
      image: '/images/yoga4.webp',
      link: 'https://www.artofliving.org/in-en/yoga/yoga-poses/reverse-prayer-pose'
    },
    {
      name: 'Ardha Matsyendrasana',
      description: 'Ardha Matsyendrasana, or the Half Spinal Twist Pose, makes the spine more elastic and increases the oxygen supply to the lungs.',
      image: '/images/yoga5.webp',
      link: 'https://www.artofliving.org/in-en/yoga/yoga-poses/sitting-half-spinal-twist-ardha-matsyendrasana'
    },
    {
      name: 'Prasarita Padahastasana',
      description: 'This yoga pose lengthens the spine, strengthens the legs and feet, and strengthens the abdomen.',
      image: '/images/yoga3.webp',
      link: 'https://www.artofliving.org/in-en/yoga/yoga-poses/standing-forward-bend'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section 
        className="relative h-[60vh] flex items-center justify-center text-white"
        style={{ 
          background: 'linear-gradient(135deg, #77d7ed 0%, #6bb6dd 100%)'
        }}
      >
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 drop-shadow-lg">
            Yoga Enhances Your Life
          </h1>
          <p className="text-xl md:text-2xl font-light drop-shadow-md">
            A mind and body practice combining various styles of physical postures, 
            breathing techniques, and meditation or relaxation: Yoga is an ancient 
            practice that may have originated in India.
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-16 px-4 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Benefits of Yoga</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="relative h-[400px] md:h-[500px] w-full md:w-4/5 mx-auto rounded-3xl overflow-hidden p-4 shadow-lg border-2 border-gray-200" style={{ backgroundColor: '#fdfcf8' }}>
            <Image
              src="/images/Yoga_Benefits.png"
              alt="Yoga Benefits"
              fill
              className="object-contain p-4"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div>
            <ul className="space-y-4">
              <li className="flex items-start text-lg">
                <span className="text-green-600 font-bold mr-2">•</span>
                <span>Yoga benefits in <strong>weight loss</strong></span>
              </li>
              <li className="flex items-start text-lg">
                <span className="text-green-600 font-bold mr-2">•</span>
                <span>Yoga is one of the best solutions for <strong>stress relief</strong></span>
              </li>
              <li className="flex items-start text-lg">
                <span className="text-green-600 font-bold mr-2">•</span>
                <span>Yoga helps for <strong>inner peace</strong></span>
              </li>
              <li className="flex items-start text-lg">
                <span className="text-green-600 font-bold mr-2">•</span>
                <span>Yoga Improves <strong>immunity</strong></span>
              </li>
              <li className="flex items-start text-lg">
                <span className="text-green-600 font-bold mr-2">•</span>
                <span>Practice of Yoga Offers <strong>awareness</strong></span>
              </li>
              <li className="flex items-start text-lg">
                <span className="text-green-600 font-bold mr-2">•</span>
                <span>Yoga improves <strong>relationships</strong></span>
              </li>
              <li className="flex items-start text-lg">
                <span className="text-green-600 font-bold mr-2">•</span>
                <span>Yoga Increases <strong>energy</strong></span>
              </li>
              <li className="flex items-start text-lg">
                <span className="text-green-600 font-bold mr-2">•</span>
                <span>Yoga Gives you Better <strong>flexibility and posture</strong></span>
              </li>
              <li className="flex items-start text-lg">
                <span className="text-green-600 font-bold mr-2">•</span>
                <span>Yoga helps in improving <strong>intuition</strong></span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Asanas Section */}
      <section id="aasan" className="py-16 px-4 max-w-7xl mx-auto bg-white">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Yoga Asanas</h2>
        <div className="space-y-8">
          {asanas.map((asana, index) => (
            <div 
              key={index}
              className="flex flex-col md:flex-row gap-6 items-center bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative w-full md:w-96 h-64 flex-shrink-0">
                <Image
                  src={asana.image}
                  alt={asana.name}
                  fill
                  className="object-cover rounded-lg"
                  sizes="(max-width: 768px) 100vw, 384px"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-3 text-gray-800">{asana.name}</h3>
                <p className="text-gray-600 mb-4">{asana.description}</p>
                <a
                  href={asana.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors duration-200"
                >
                  Read More
                </a>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <a
            href="https://www.artofliving.org/in-en/yoga/yoga-poses/sitting-standing-recumbent-yoga-poses"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-teal-600 text-white px-8 py-3 rounded-md hover:bg-teal-700 transition-colors duration-200 text-lg font-semibold"
          >
            More Asanas
          </a>
        </div>
      </section>

      {/* Videos Section */}
      <section id="videos" className="py-16 px-4 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Yoga Videos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <YouTubeEmbed videoId="s2NQhpFGIOg" title="Yoga Video 1" />
          <YouTubeEmbed videoId="g_tea8ZNk5A" title="Yoga Video 2" />
          <YouTubeEmbed videoId="c8hjhRqIwHE" title="Yoga Video 3" />
          <YouTubeEmbed videoId="brjAjq4zEIE" title="Yoga Video 4" />
          <YouTubeEmbed videoId="0XBcrjkkwQo" title="Yoga Video 5" />
          <YouTubeEmbed videoId="7Vqv5SmSKHY" title="Yoga Video 6" />
        </div>
      </section>
    </div>
  );
}
