import Image from 'next/image';

/**
 * Spiritual Therapy Page
 * Displays information about spiritual therapy, practices, and events
 */
export default function SpiritualTherapyPage() {
  const practices = [
    {
      title: 'Pray or Meditate',
      description: 'Praying more, meditating more, attending gatherings of like-minded believers more often and joining a prayer or meditation group are just a few ways you can put your spirituality into practice.'
    },
    {
      title: 'Give',
      description: 'According to Bitkoff, you can grow in your spiritual development by helping and giving to others. Donate to charity. Volunteer. Offer your skills to those who need them.'
    },
    {
      title: 'Live Healthier',
      description: 'If you want to improve your spirituality and spiritual development, you also need to take care of your physical body: eat better. Exercise more. Stop smoking. Drink less alcohol.'
    },
    {
      title: 'Focus on Yourself',
      description: 'Focus on yourself, but not in quite the way you might be thinking. This doesn\'t mean going shopping for new clothes or getting your hair done. The focus should be on your inner self, rather than your outer self.'
    }
  ];

  const events = [
    {
      title: '2026 APA Annual Meeting',
      description: 'The American Psychiatric Association\'s annual meeting will take place in San Francisco.',
      date: 'May 2026',
      venue: 'San Francisco, USA',
      image: '/images/APA.png'
    },
    {
      title: '5th International Summit on Depression, Anxiety and Stress Management',
      description: 'This summit will focus on innovative strategies, including digital interventions and integrative therapies.',
      date: 'June 25-26, 2026',
      venue: 'Paris, France',
      image: '/images/5thsummit.png'
    },
    {
      title: '26th World Congress of Psychiatry',
      description: 'Guided by compassion, grounded in science: Psychiatry for our time.',
      date: 'September 23-26, 2026',
      venue: 'Stockholm, Sweden',
      image: '/images/26th.png'
    }
  ];

  return (
    <div className="min-h-screen bg-background pt-16 md:pt-20">
      {/* Hero Section */}
      <section className="relative min-h-[40vh] flex items-center justify-center bg-gradient-to-br from-primary/90 to-secondary/90 py-16 md:py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/20"></div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white animate-fade-in">
            SPIRITUALITY
          </h1>
          <h3 className="text-lg md:text-xl text-white/95 max-w-2xl mx-auto drop-shadow-md mb-8">
            Peace is the result of retraining your mind to process life as it is,<br />
            rather than as you think it should be.
          </h3>
          <button className="btn-premium bg-white text-primary hover:bg-white/90">
            JOIN NOW
          </button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section-spacing">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">About</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative h-96 bg-white rounded-3xl p-6 shadow-lg">
              <Image
                src="/images/Spirituality2.png"
                alt="Spirituality"
                fill
                className="object-contain p-4"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="glass rounded-2xl p-8 shadow-xl">
              <p className="text-lg leading-relaxed text-muted">
                Spirituality is a broad concept with room for many perspectives. In general, it includes a sense of 
                connection to something bigger than ourselves, and it typically involves a search for meaning in life. 
                As such, it is a universal human experience—something that touches us all. People may describe a spiritual 
                experience as sacred or transcendent or simply a deep sense of aliveness and interconnectedness.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Ways to Practice Section */}
      <section id="steps" className="section-spacing bg-surface">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">Ways to Practice</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {practices.map((practice, index) => (
              <div key={index} className="glass rounded-2xl p-8 shadow-xl border border-border/30 hover:shadow-2xl transition-shadow">
                <h3 className="text-2xl font-semibold mb-4 flex items-center text-foreground">
                  <span className="text-primary mr-3 text-3xl">●</span>
                  {practice.title}
                </h3>
                <p className="text-muted leading-relaxed">{practice.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section id="events" className="section-spacing">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {events.map((event, index) => (
              <div key={index} className="glass rounded-2xl overflow-hidden shadow-xl border border-primary/20 hover:shadow-2xl hover:border-primary/40 transition-all">
                {/* Event Image */}
                <div className="relative h-80 bg-white">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-contain p-4"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                
                {/* Event Content */}
                <div className="p-6">
                  <h3 className="text-lg font-bold mb-3 text-foreground min-h-[60px]">{event.title}</h3>
                  <p className="text-sm text-muted mb-4 min-h-[60px]">{event.description}</p>
                  <div className="border-t border-border pt-4 space-y-2">
                    <p className="font-semibold text-sm text-muted">
                      <span className="text-primary">DATE:</span> {event.date}
                    </p>
                    <p className="font-semibold text-sm text-muted">
                      <span className="text-primary">VENUE:</span> {event.venue}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
