'use client';

import dynamic from 'next/dynamic';

// Lazy load heavy components
const BookCard = dynamic(() => import('@/components/therapy/BookCard').then(mod => ({ default: mod.BookCard })), {
  loading: () => <div className="bg-surface-elevated animate-pulse rounded-lg h-96"></div>,
  ssr: false
});

/**
 * Reading Therapy Page
 * Displays quotes and books for stress relief
 */
export default function ReadingTherapyPage() {
  return (
    <div className="min-h-screen bg-background pt-16 md:pt-20">
      {/* Hero Section */}
      <section className="relative min-h-[40vh] flex items-center justify-center bg-gradient-to-br from-primary/90 to-secondary/90 py-16 md:py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/20"></div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white animate-fade-in">
            Welcome to Our <span className="text-white drop-shadow-lg">Reading Therapy</span>
          </h1>
          <p className="text-lg md:text-xl text-white/95 max-w-2xl mx-auto drop-shadow-md">
            Read motivational quotes and discover amazing books to gain happiness, knowledge and lighten your stress.
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="section-spacing">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">Reading Therapy</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="glass rounded-2xl p-8 shadow-xl">
              <p className="text-lg leading-relaxed text-muted">
                Bibliotherapy (also referred to as book therapy, reading therapy, poetry therapy or therapeutic storytelling) 
                is a creative arts therapy that involves storytelling or the reading of specific texts. It uses an individual's 
                relationship to the content of books and poetry and other written words as therapy. Bibliotherapy partially 
                overlaps with, and is often combined with, writing therapy.
              </p>
            </div>
            <div className="glass rounded-2xl p-8 shadow-xl border border-border/30">
              <h3 className="text-2xl font-semibold mb-6 text-foreground">Benefits of Reading</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-muted">Reduces stress</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-muted">Increases your ability to empathize</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-muted">Helps prevent age-related cognitive decline</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-muted">Builds your vocabulary</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-muted">Prepares you for a good night's rest</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-muted">Helps alleviate depression symptoms</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Quotes Section */}
      <section id="quotes" className="section-spacing bg-surface">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">Motivational Quotes</h2>
          
          <h3 className="text-2xl font-semibold text-center mb-8 text-foreground">Inspirational Quotes</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="glass rounded-2xl p-6 text-center shadow-xl border-2 border-blue-400/60 hover:shadow-2xl hover:border-blue-500/80 transition-all">
              <p className="text-base italic text-foreground leading-relaxed">
                "Life isn't about finding yourself. Life is about creating yourself."
              </p>
            </div>
            <div className="glass rounded-2xl p-6 text-center shadow-xl border-2 border-purple-400/60 hover:shadow-2xl hover:border-purple-500/80 transition-all">
              <p className="text-base italic text-foreground leading-relaxed">
                "A mistake that makes you humble is better than an achievement that makes you arrogant."
              </p>
            </div>
            <div className="glass rounded-2xl p-6 text-center shadow-xl border-2 border-pink-400/60 hover:shadow-2xl hover:border-pink-500/80 transition-all">
              <p className="text-base italic text-foreground leading-relaxed">
                "Why do we only rest in peace why don't we live in peace too?"
              </p>
            </div>
            <div className="glass rounded-2xl p-6 text-center shadow-xl border-2 border-teal-400/60 hover:shadow-2xl hover:border-teal-500/80 transition-all">
              <p className="text-base italic text-foreground leading-relaxed">
                "Our greatest glory is not in never falling, but in rising every time we fall."
              </p>
            </div>
          </div>

          <h3 className="text-2xl font-semibold text-center mb-8 text-foreground">Stress Relieving Quotes</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="glass rounded-2xl p-6 text-center shadow-xl border-2 border-green-400/60 hover:shadow-2xl hover:border-green-500/80 transition-all">
              <p className="text-base italic text-foreground leading-relaxed">
                "It's not the events of our lives that shape us, but our beliefs as to what those events mean."
              </p>
            </div>
            <div className="glass rounded-2xl p-6 text-center shadow-xl border-2 border-orange-400/60 hover:shadow-2xl hover:border-orange-500/80 transition-all">
              <p className="text-base italic text-foreground leading-relaxed">
                "Breath is the power behind all things…. I breathe in and know that good things will happen."
              </p>
            </div>
            <div className="glass rounded-2xl p-6 text-center shadow-xl border-2 border-indigo-400/60 hover:shadow-2xl hover:border-indigo-500/80 transition-all">
              <p className="text-base italic text-foreground leading-relaxed">
                "You can't control the wind, but you can adjust your sails."
              </p>
            </div>
            <div className="glass rounded-2xl p-6 text-center shadow-xl border-2 border-rose-400/60 hover:shadow-2xl hover:border-rose-500/80 transition-all">
              <p className="text-base italic text-foreground leading-relaxed">
                "There are times when we stop, we sit still. We listen and breezes from a whole other world begin to whisper."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Books Section */}
      <section id="reading" className="section-spacing">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">Recommended Books</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            <BookCard
              title="Atomic Habits"
              author="James Clear"
              description="Let's listen to the famous audiobook by James Clear."
              coverImage="https://m.media-amazon.com/images/I/41wuB-s8vRL._SL300_.jpg"
              purchaseLink="https://www.audible.in/pd/Atomic-Habits-Audiobook/B07J1PK5Q7"
            />
            <BookCard
              title="The Psychology of Money"
              author="Morgan Housel"
              description="Let's listen to the famous audiobook by Morgan Housel."
              coverImage="/images/morgan-housel-the-psychology-of-money.jpg"
              purchaseLink="https://www.audible.in/pd/The-Psychology-of-Money-Audiobook/B08D9WJCBT"
            />
            <BookCard
              title="The Subtle Art of Not Giving a F*ck"
              author="Mark Manson"
              description="Let's listen to the famous audiobook by Mark Manson."
              coverImage="https://m.media-amazon.com/images/I/51MT0MbpD7L._SL500_.jpg"
              purchaseLink="https://www.audible.in/pd/The-Subtle-Art-of-Not-Giving-a-F-ck-Audiobook/B079BC54JT"
            />
            <BookCard
              title="Ikigai"
              author="Héctor García and Francesc Miralles"
              description="Let's listen to the famous audiobook by Héctor García and Francesc Miralles."
              coverImage="https://m.media-amazon.com/images/I/511HccWipML._SL500_.jpg"
              purchaseLink="https://www.audible.in/pd/Ikigai-Audiobook/B0759Y4LYM"
            />
            <BookCard
              title="Think Like A Monk"
              author="Jay Shetty"
              description="Let's listen to the famous audiobook by Jay Shetty."
              coverImage="https://m.media-amazon.com/images/I/51n4UO2a+VS._SL500_.jpg"
              purchaseLink="https://www.audible.in/pd/Think-Like-A-Monk-Audiobook/B07YSQ8GT5"
            />
            <BookCard
              title="Life's Amazing Secrets"
              author="Gaur Gopal Das"
              description="Let's listen to the famous audiobook by Gaur Gopal Das."
              coverImage="https://m.media-amazon.com/images/I/514sscPA15L._SL500_.jpg"
              purchaseLink="https://www.audible.in/pd/Lifes-Amazing-Secrets-Audiobook/B081S9NKRP"
            />
            <BookCard
              title="Rich Dad Poor Dad"
              author="Robert T. Kiyosaki"
              description="Let's listen to the famous audiobook by Robert T. Kiyosaki."
              coverImage="https://m.media-amazon.com/images/I/51AHZGhzZEL._SL500_.jpg"
              purchaseLink="https://www.audible.in/pd/Rich-Dad-Poor-Dad-Audiobook/B079P9PGJB"
            />
            <BookCard
              title="Karma: A Yogi's Guide"
              author="Sadhguru and Leslie Howard"
              description="Let's listen to the famous audiobook by Sadhguru and Leslie Howard."
              coverImage="https://m.media-amazon.com/images/I/51nY2HMNVHL._SL500_.jpg"
              purchaseLink="https://www.audible.in/pd/Karma-A-Yogis-Guide-to-Crafting-Your-Own-Destiny-Audiobook/9391149588"
            />
            <BookCard
              title="How to Talk to Anyone"
              author="Leil Lowndes"
              description="Let's listen to the famous audiobook by Leil Lowndes."
              coverImage="https://m.media-amazon.com/images/I/51hAGh15bTL._SL500_.jpg"
              purchaseLink="https://www.audible.in/pd/How-to-Talk-to-Anyone-Audiobook/B079TLJV49"
            />
            <BookCard
              title="Rework"
              author="Jason Fried and David Heinemeier Hansson"
              description="Let's listen to the famous audiobook by Jason Fried and David Heinemeier Hansson."
              coverImage="https://m.media-amazon.com/images/I/41jq-ouUBkL._SL500_.jpg"
              purchaseLink="https://www.audible.in/pd/Rework-Audiobook/B079VF9TV6"
            />
            <BookCard
              title="The Monk Who Sold His Ferrari"
              author="Robin Sharma"
              description="Let's listen to the famous audiobook by Robin Sharma."
              coverImage="https://m.media-amazon.com/images/I/51bmAi4DCML._SL500_.jpg"
              purchaseLink="https://www.audible.in/pd/The-Monk-Who-Sold-His-Ferrari-Audiobook/B072MR2L6V"
            />
            <BookCard
              title="Good Vibes, Good Life"
              author="Vex King"
              description="Let's listen to the famous audiobook by Vex King."
              coverImage="https://m.media-amazon.com/images/I/41iYeNKefoL._SL500_.jpg"
              purchaseLink="https://www.audible.in/pd/Good-Vibes-Good-Life-Audiobook/1788174992"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
