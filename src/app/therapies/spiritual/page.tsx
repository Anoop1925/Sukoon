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
      title: '7 Reasons Why You Resist Meditation (and What to Do About Them)',
      date: '5 October, 2022',
      venue: 'ONLINE ZOOM'
    },
    {
      title: 'How To Embody the Triple Goddess Archetype',
      date: '15 October, 2022',
      venue: 'ONLINE ZOOM'
    },
    {
      title: 'Modern Norse Pagan Practices for Beginners',
      date: '24 October, 2022',
      venue: 'ONLINE ZOOM'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 text-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">SPIRITUALITY</h1>
          <h3 className="text-xl md:text-2xl font-light mb-6">
            Peace is the result of retraining your mind to process life as it is,<br />
            rather than as you think it should be.
          </h3>
          <button className="bg-white text-purple-900 px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors duration-200">
            JOIN NOW
          </button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 px-4 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">About</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="relative h-96">
            <Image
              src="/images/Spirituality2.png"
              alt="Spirituality"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div>
            <p className="text-lg leading-relaxed">
              Spirituality is a broad concept with room for many perspectives. In general, it includes a sense of 
              connection to something bigger than ourselves, and it typically involves a search for meaning in life. 
              As such, it is a universal human experience—something that touches us all. People may describe a spiritual 
              experience as sacred or transcendent or simply a deep sense of aliveness and interconnectedness.
            </p>
          </div>
        </div>
      </section>

      <hr className="border-purple-700 max-w-7xl mx-auto" />

      {/* Ways to Practice Section */}
      <section id="steps" className="py-16 px-4 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">Ways to Practice</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {practices.map((practice, index) => (
            <div key={index} className="bg-white bg-opacity-10 backdrop-blur-lg p-6 rounded-lg">
              <h3 className="text-2xl font-semibold mb-4 flex items-center">
                <span className="text-yellow-400 mr-3">●</span>
                {practice.title}
              </h3>
              <p className="text-gray-200 leading-relaxed">{practice.description}</p>
            </div>
          ))}
        </div>
      </section>

      <hr className="border-purple-700 max-w-7xl mx-auto" />

      {/* Events Section */}
      <section id="events" className="py-16 px-4 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <div key={index} className="bg-gray-900 bg-opacity-80 p-8 rounded-lg text-center">
              <p className="text-lg mb-6 min-h-[120px] flex items-center justify-center">{event.title}</p>
              <div className="border-t border-gray-700 pt-4">
                <p className="font-semibold mb-2">DATE: {event.date}</p>
                <p className="font-semibold">VENUE: {event.venue}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
