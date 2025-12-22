'use client';

import Image from 'next/image';
import dynamic from 'next/dynamic';

// Lazy load YouTube embeds
const YouTubeEmbed = dynamic(() => import('@/components/therapy/YouTubeEmbed').then(mod => ({ default: mod.YouTubeEmbed })), {
  loading: () => <div className="bg-gray-200 animate-pulse rounded-lg aspect-video"></div>,
  ssr: false
});

/**
 * Talking Therapy Page
 * Displays information about talking therapy, blogs, and videos
 */
export default function TalkingTherapyPage() {
  const causes = [
    {
      title: 'Depression',
      description: 'Depression is a mood disorder that causes persistent feelings of sadness, emptiness, and loss of joy. It is different from the mood fluctuations.',
      link: 'https://www.medicalnewstoday.com/articles/8933#definition',
      image: '/images/depression.jpg'
    },
    {
      title: 'Anxiety',
      description: 'Anxiety is your body\'s natural response to stress. It\'s a feeling of fear or apprehension about what\'s going to happen and how will it happen.',
      link: 'https://www.health.harvard.edu/blog/anxiety-what-it-is-what-to-do-2018060113955',
      image: '/images/anxiety.jpg'
    },
    {
      title: 'Stress',
      description: 'Stress is a feeling of emotional or physical tension. It can come from any event or thought that makes you feel frustrated or angry.',
      link: 'https://www.medicalnewstoday.com/articles/145855',
      image: '/images/stress.jpg'
    }
  ];

  const blogs = [
    {
      title: 'Does Depression Make You Feel Worthless? You Are Not Alone',
      author: 'MAHEVASH SHAIKH',
      date: 'JUNE 23, 2022',
      excerpt: 'Has depression made you feel worthless? If so, you are not alone. You may even believe that you are worthless due to depression. Read on to find out how to fight this.',
      link: 'https://www.healthyplace.com/blogs/copingwithdepression/2022/6/does-depression-make-you-feel-worthless-you-are-not-alone',
      image: '/images/blog-1.jpg'
    },
    {
      title: 'Talking to Others About My Mental Health. Why Mental Health Is Hard to Talk About',
      author: 'TJ DESALVO',
      date: 'JUNE 8, 2022',
      excerpt: 'I\'ve never been good at talking about my mental health with others, even those who I\'ve known for years. In the past, I didn\'t have enough self-knowledge to be able to talk about it with anyone in an adequate way.',
      link: 'https://www.healthyplace.com/blogs/anxiety-schmanxiety/2022/6/talking-to-others-about-my-mental-health',
      image: '/images/blog-2.jpg'
    },
    {
      title: 'Stress Management - Simple strategies for stress relief',
      author: 'KELLY BILODEAU',
      date: 'January 25, 2021',
      excerpt: 'The last few months of any year, with deadlines and holidays, often create a harried pace. The beginning of a new year can give you a chance to exhale. But even if you experience a few serene days or weeks, tight shoulders and tension are never far off.',
      link: 'https://www.health.harvard.edu/blog/3-simple-strategies-for-stress-relief-2021012521806',
      image: '/images/blog-3.jpg'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Welcome to Our <span className="text-blue-200">Talking Therapy</span>
          </h1>
          <h3 className="text-xl md:text-2xl font-light">
            Read about Talking Therapy, its benefits and Counsellors<br />
            as one good conversation can shift the direction of change forever.
          </h3>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 px-4 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-8 text-gray-800">About</h2>
        <p className="text-center text-xl text-gray-600 mb-12">Here are the signs that you need a Talking Therapy!</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {causes.map((cause, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-48">
                <Image
                  src={cause.image}
                  alt={cause.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3 text-gray-800">{cause.title}</h3>
                <p className="text-gray-600 mb-4">{cause.description}</p>
                <a
                  href={cause.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
                >
                  Read More
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Blogs Section */}
      <section id="blogs" className="py-16 px-4 max-w-7xl mx-auto bg-white">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Blogs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog, index) => (
            <div key={index} className="bg-gray-50 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-48">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="p-6">
                <p className="text-sm text-gray-500 mb-2">{blog.date} {blog.author}</p>
                <h3 className="text-xl font-bold mb-3 text-gray-800">{blog.title}</h3>
                <p className="text-gray-600 mb-4">{blog.excerpt}</p>
                <a
                  href={blog.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 font-semibold"
                >
                  Read More →
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Videos Section */}
      <section id="videos" className="py-16 px-4 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Videos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <YouTubeEmbed videoId="Nz9eAaXRzGg" title="Talking Therapy Video 1" />
          <YouTubeEmbed videoId="UQ1wDXtPxxI" title="Talking Therapy Video 2" />
          <YouTubeEmbed videoId="rmeGVhhbGrM" title="Talking Therapy Video 3" />
          <YouTubeEmbed videoId="8jPQjjsBbIc" title="Talking Therapy Video 4" />
          <YouTubeEmbed videoId="4ZQkYSpmOdU" title="Talking Therapy Video 5" />
          <YouTubeEmbed videoId="m3-O7gPsQK0" title="Talking Therapy Video 6" />
        </div>
      </section>
    </div>
  );
}
