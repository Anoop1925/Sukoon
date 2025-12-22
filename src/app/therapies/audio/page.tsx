'use client';

import dynamic from 'next/dynamic';

// Lazy load heavy components
const SpotifyEmbed = dynamic(() => import('@/components/therapy/SpotifyEmbed').then(mod => ({ default: mod.SpotifyEmbed })), {
  loading: () => <div className="bg-gray-200 animate-pulse rounded-lg" style={{ height: '152px' }}></div>,
  ssr: false
});

const BookCard = dynamic(() => import('@/components/therapy/BookCard').then(mod => ({ default: mod.BookCard })), {
  loading: () => <div className="bg-gray-200 animate-pulse rounded-lg h-96"></div>,
  ssr: false
});

/**
 * Audio Therapy Page
 * Displays music playlists, podcasts, and audiobooks for stress relief
 */
export default function AudioTherapyPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center bg-gradient-to-br from-primary/90 to-secondary/90">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/20"></div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white animate-fade-in">
            Welcome to Our <span className="text-accent">Audio Therapy</span>
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            Listen to Music, Motivational Podcasts and Audiobooks to gain happiness, knowledge and lighten your stress.
          </p>
        </div>
      </section>

      {/* Music Section */}
      <section id="music" className="section-spacing">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">Music</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="animate-fade-in">
              <h3 className="text-xl font-semibold mb-4 text-foreground">Stress Relief Sounds</h3>
              <SpotifyEmbed 
                uri="37i9dQZF1DWXe9gFZP0gtP" 
                type="playlist" 
                height={380}
              />
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <h3 className="text-xl font-semibold mb-4 text-foreground">Peaceful Guitar</h3>
              <SpotifyEmbed 
                uri="37i9dQZF1DX0jgyAiPl8Af" 
                type="playlist" 
                height={380}
              />
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <h3 className="text-xl font-semibold mb-4 text-foreground">Calm Nature Sounds</h3>
              <SpotifyEmbed 
                uri="7MuGX2icynmq9zuklPCbnX" 
                type="playlist" 
                height={380}
              /> 
            </div>
          </div>
        </div>
      </section>

      <hr className="border-border container-custom" />

      {/* Podcasts Section */}
      <section id="podcasts" className="section-spacing">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">Podcasts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <SpotifyEmbed uri="4qgwZM2UJYaG6LSQvPw3N6" type="episode" height={152} />
            <SpotifyEmbed uri="6SMEoIyQlG6DQVt7t8PtUM" type="episode" height={152} />
            <SpotifyEmbed uri="4ahVo34YZsDDtCgXX5KS5P" type="episode" height={152} />
            <SpotifyEmbed uri="5FZcvrHPRBqpWTcI1ECZXB" type="episode" height={152} />
            <SpotifyEmbed uri="0vEWGG6S1wL6IbxJsxb3sF" type="episode" height={152} />
            <SpotifyEmbed uri="1IsgQk3rnvBo912IrVse2i" type="episode" height={152} />
            <SpotifyEmbed uri="3qZRmQtsUgHyOVNmZzxxPw" type="episode" height={152} />
            <SpotifyEmbed uri="5p7o2od6gkIgDx2BbOHk6w" type="episode" height={152} />
            <SpotifyEmbed uri="24JEpPldCxgeqGprKO7kMI" type="episode" height={152} />
            <SpotifyEmbed uri="6foBC4piibhQjKix60AaRV" type="episode" height={152} />
            <SpotifyEmbed uri="1lsjRR2S5O6FkXK2Eq5UiN" type="episode" height={152} />
            <SpotifyEmbed uri="1496yN5qwJAwbLB30XzrvR" type="episode" height={152} />
            <SpotifyEmbed uri="5YoXzNLPgiaJ209C1dhfdy" type="episode" height={152} />
            <SpotifyEmbed uri="6lbYN222AInVmmLj674vKB" type="episode" height={152} />
            <SpotifyEmbed uri="19XfB2nyuc1Uh3BservSyf" type="episode" height={152} />
          </div>
        </div>
      </section>

      <hr className="border-border container-custom" />

      {/* Audiobooks Section */}
      <section id="audiobooks" className="section-spacing">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">Audiobooks</h2>
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
