'use client';

import dynamic from 'next/dynamic';

// Lazy load heavy components
const BookCard = dynamic(() => import('@/components/therapy/BookCard').then(mod => ({ default: mod.BookCard })), {
  loading: () => <div className="bg-gray-700 animate-pulse rounded-lg h-96"></div>,
  ssr: false
});

const YouTubeEmbed = dynamic(() => import('@/components/therapy/YouTubeEmbed').then(mod => ({ default: mod.YouTubeEmbed })), {
  loading: () => <div className="bg-gray-700 animate-pulse rounded-lg aspect-video"></div>,
  ssr: false
});

/**
 * Reading Therapy Page
 * Displays articles, quotes, book summaries, and books for stress relief
 */
export default function ReadingTherapyPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-700">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Welcome to Our <span className="text-yellow-300">Reading Therapy</span>
          </h1>
          <h3 className="text-xl md:text-2xl font-light">
            Read Articles, Motivational Quotes and listen to summaries of famous books<br />
            to gain some happiness, knowledge and also lighten your stress side by side.
          </h3>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-16 px-4 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-8">Reading Therapy</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-lg leading-relaxed">
              Bibliotherapy (also referred to as book therapy, reading therapy, poetry therapy or therapeutic storytelling) 
              is a creative arts therapy that involves storytelling or the reading of specific texts. It uses an individual's 
              relationship to the content of books and poetry and other written words as therapy. Bibliotherapy partially 
              overlaps with, and is often combined with, writing therapy.
            </p>
          </div>
          <div className="bg-gray-800 p-8 rounded-lg">
            <h3 className="text-2xl font-semibold mb-4">Benefits of Reading</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-yellow-400 mr-2">›</span>
                <span>Reduces stress</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-400 mr-2">›</span>
                <span>Increases your ability to empathize</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-400 mr-2">›</span>
                <span>Helps prevent age-related cognitive decline</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-400 mr-2">›</span>
                <span>Builds your vocabulary</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-400 mr-2">›</span>
                <span>Prepares you for a good night's rest</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-400 mr-2">›</span>
                <span>Helps alleviate depression symptoms</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Articles Section */}
      <section id="articles" className="py-16 px-4 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-8">Articles</h2>
        <h3 className="text-2xl font-semibold text-center mb-8">Inspirational Stories</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg overflow-hidden" style={{ height: '380px' }}>
            <iframe 
              src="https://ahigherthought.com/the-best-way-to-refresh-mind-body-soul/" 
              className="w-full h-full"
              title="Refresh Mind Body Soul"
            />
          </div>
          <div className="bg-white rounded-lg overflow-hidden" style={{ height: '380px' }}>
            <iframe 
              src="https://www.developgoodhabits.com/inspirational-stories/" 
              className="w-full h-full"
              title="Inspirational Stories"
            />
          </div>
          <div className="bg-white rounded-lg overflow-hidden" style={{ height: '380px' }}>
            <iframe 
              src="https://www.whatsdannydoing.com/blog/short-inspirational-stories-with-a-moral" 
              className="w-full h-full"
              title="Short Inspirational Stories"
            />
          </div>
          <div className="bg-white rounded-lg overflow-hidden" style={{ height: '380px' }}>
            <iframe 
              src="https://theartofliving.com/interesting-articles/" 
              className="w-full h-full"
              title="Art of Living Articles"
            />
          </div>
        </div>
      </section>

      <hr className="border-gray-700 max-w-7xl mx-auto" />

      {/* Quotes Section */}
      <section id="quotes" className="py-16 px-4 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">Motivational Quotes</h2>
        
        <h3 className="text-2xl font-semibold text-center mb-8">Inspirational Quotes</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-gradient-to-br from-purple-600 to-blue-600 p-6 rounded-lg text-center">
            <p className="text-lg italic">
              "Life isn't about finding yourself. Life is about creating yourself."
            </p>
          </div>
          <div className="bg-gradient-to-br from-pink-600 to-purple-600 p-6 rounded-lg text-center">
            <p className="text-lg italic">
              "A mistake that makes you humble is better than an achievement that makes you arrogant."
            </p>
          </div>
          <div className="bg-gradient-to-br from-blue-600 to-teal-600 p-6 rounded-lg text-center">
            <p className="text-lg italic">
              "Why do we only rest in peace why don't we live in peace too?"
            </p>
          </div>
          <div className="bg-gradient-to-br from-orange-600 to-red-600 p-6 rounded-lg text-center">
            <p className="text-lg italic">
              "Our greatest glory is not in never falling, but in rising every time we fall."
            </p>
          </div>
        </div>

        <h3 className="text-2xl font-semibold text-center mb-8">Stress Relieving Quotes</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-gradient-to-br from-green-600 to-teal-600 p-6 rounded-lg text-center">
            <p className="text-lg italic">
              "It's not the events of our lives that shape us, but our beliefs as to what those events mean."
            </p>
          </div>
          <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-6 rounded-lg text-center">
            <p className="text-lg italic">
              "Breath is the power behind all things…. I breathe in and know that good things will happen."
            </p>
          </div>
          <div className="bg-gradient-to-br from-yellow-600 to-orange-600 p-6 rounded-lg text-center">
            <p className="text-lg italic">
              "You can't control the wind, but you can adjust your sails."
            </p>
          </div>
          <div className="bg-gradient-to-br from-red-600 to-pink-600 p-6 rounded-lg text-center">
            <p className="text-lg italic">
              "There are times when we stop, we sit still. We listen and breezes from a whole other world begin to whisper."
            </p>
          </div>
        </div>
      </section>

      <hr className="border-gray-700 max-w-7xl mx-auto" />

      {/* Book Summaries Section */}
      <section id="summary" className="py-16 px-4 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">Summary of Books</h2>
        
        <h3 className="text-2xl font-semibold text-center mb-8">In Articles</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-white rounded-lg overflow-hidden" style={{ height: '380px' }}>
            <iframe 
              src="https://www.samuelthomasdavies.com/book-summaries/self-help/atomic-habits/" 
              className="w-full h-full"
              title="Atomic Habits Summary"
            />
          </div>
          <div className="bg-white rounded-lg overflow-hidden" style={{ height: '380px' }}>
            <iframe 
              src="https://jamesclear.com/book-summaries/the-subtle-art-of-not-giving-a-fck" 
              className="w-full h-full"
              title="Subtle Art Summary"
            />
          </div>
          <div className="bg-white rounded-lg overflow-hidden" style={{ height: '380px' }}>
            <iframe 
              src="https://wizbuskout.com/think-like-a-monk-summary/" 
              className="w-full h-full"
              title="Think Like a Monk Summary"
            />
          </div>
          <div className="bg-white rounded-lg overflow-hidden" style={{ height: '380px' }}>
            <iframe 
              src="https://www.sloww.co/ikigai-book/" 
              className="w-full h-full"
              title="Ikigai Summary"
            />
          </div>
        </div>

        <h3 className="text-2xl font-semibold text-center mb-8">In Videos</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <YouTubeEmbed videoId="PZ7lDrwYdZc" title="Atomic Habits Summary" />
          <YouTubeEmbed videoId="Zxj3P0enJNQ" title="Subtle Art Summary" />
          <YouTubeEmbed videoId="8OAH3hqNsN4" title="Think Like a Monk Summary" />
          <YouTubeEmbed videoId="9g1BfGpoK3E" title="Ikigai Summary" />
        </div>
      </section>

      <hr className="border-gray-700 max-w-7xl mx-auto" />

      {/* Books Section */}
      <section id="reading" className="py-16 px-4 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">Books</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <BookCard
            title="Atomic Habits"
            author="James Clear"
            description="Read the famous book by James Clear."
            coverImage="https://m.media-amazon.com/images/I/41wuB-s8vRL._SL300_.jpg"
            purchaseLink="https://www.amazon.in/Atomic-Habits-James-Clear/dp/1847941834"
          />
          <BookCard
            title="The Psychology of Money"
            author="Morgan Housel"
            description="Read the famous book by Morgan Housel."
            coverImage="https://m.media-amazon.com/images/I/51jRBz6Ug3L._SL500_.jpg"
            purchaseLink="https://www.amazon.in/Psychology-Money-Morgan-Housel/dp/9390166268"
          />
          <BookCard
            title="The Subtle Art of Not Giving a F*ck"
            author="Mark Manson"
            description="Read the famous book by Mark Manson."
            coverImage="https://m.media-amazon.com/images/I/51MT0MbpD7L._SL500_.jpg"
            purchaseLink="https://www.amazon.in/Subtle-Art-Not-Giving/dp/0062641549"
          />
          <BookCard
            title="Ikigai"
            author="Héctor García and Francesc Miralles"
            description="Read the famous book by Héctor García and Francesc Miralles."
            coverImage="https://m.media-amazon.com/images/I/511HccWipML._SL500_.jpg"
            purchaseLink="https://www.amazon.in/Ikigai-H%C3%A9ctor-Garc%C3%ADa/dp/178633089X"
          />
          <BookCard
            title="Think Like A Monk"
            author="Jay Shetty"
            description="Read the famous book by Jay Shetty."
            coverImage="https://m.media-amazon.com/images/I/51n4UO2a+VS._SL500_.jpg"
            purchaseLink="https://www.amazon.in/Think-Like-Monk-Jay-Shetty/dp/0008386595"
          />
          <BookCard
            title="How To Talk To Anyone"
            author="Leil Lowndes"
            description="Read the famous book by Leil Lowndes."
            coverImage="https://m.media-amazon.com/images/I/51hAGh15bTL._SL500_.jpg"
            purchaseLink="https://www.amazon.in/dp/0007272618"
          />
          <BookCard
            title="Rich Dad Poor Dad"
            author="Robert T. Kiyosaki"
            description="Read the famous book by Robert T. Kiyosaki."
            coverImage="https://m.media-amazon.com/images/I/51AHZGhzZEL._SL500_.jpg"
            purchaseLink="https://www.amazon.in/Rich-Dad-Poor-Middle-Updates/dp/1612680194"
          />
          <BookCard
            title="Rework"
            author="David Heinemeier Hansson"
            description="Read the famous book by David Heinemeier Hansson."
            coverImage="https://m.media-amazon.com/images/I/41jq-ouUBkL._SL500_.jpg"
            purchaseLink="https://www.amazon.in/ReWork-Change-Way-Work-Forever/dp/0091929784"
          />
        </div>
      </section>
    </div>
  );
}
