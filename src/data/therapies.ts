import { TherapyService } from '@/types';

/**
 * Static data for all therapy services offered by Sukoon
 */
export const therapies: TherapyService[] = [
  {
    id: 'audio',
    title: 'Audio Therapy',
    description: 'Listening to music & other audio files often enlightens our mood.',
    icon: 'FaMusic',
    image: '/images/audio.png',
    slug: 'audio',
    content: {
      hero: {
        title: 'Audio Therapy',
        subtitle: 'Discover the healing power of sound',
        backgroundImage: '/images/audio.png',
      },
      sections: [
        {
          id: 'intro',
          type: 'text',
          title: 'About Audio Therapy',
          content: 'Audio Therapy includes auditory and vibratory inputs which are used to influence a person\'s psychological state, includes sound healing, vibroacoustic sound therapy, music, and music therapy.',
        },
      ],
    },
  },
  {
    id: 'reading',
    title: 'Reading Therapy',
    description: 'Motivational quotes and books can help us to divert and change our mood.',
    icon: 'FaBook',
    image: '/images/reading.png',
    slug: 'reading',
    content: {
      hero: {
        title: 'Reading Therapy',
        subtitle: 'Find peace through words',
        backgroundImage: '/images/reading.png',
      },
      sections: [
        {
          id: 'intro',
          type: 'text',
          title: 'About Reading Therapy',
          content: 'Reading therapy is a creative art therapy that uses literature to support good mental health and is a versatile and cost-effective treatment. It includes storytelling or the reading of specific texts.',
        },
      ],
    },
  },
  {
    id: 'yoga',
    title: 'Yoga Therapy',
    description: 'Yoga and exercise plays a very important role in our lives.',
    icon: 'FaSpa',
    image: '/images/yoga.png',
    slug: 'yoga',
    content: {
      hero: {
        title: 'Yoga Therapy',
        subtitle: 'Balance your mind and body',
        backgroundImage: '/images/yoga.png',
      },
      sections: [
        {
          id: 'intro',
          type: 'text',
          title: 'About Yoga Therapy',
          content: 'Yoga therapy uses yoga postures, breathing exercises, meditation, and guided imagery to improve mental and physical health.',
        },
      ],
    },
  },
  {
    id: 'laughing',
    title: 'Laughing Therapy',
    description: 'Laughing is the only medicine which refreshes our mind.',
    icon: 'FaLaugh',
    image: '/images/laughing.png',
    slug: 'laughing',
    content: {
      hero: {
        title: 'Laughing Therapy',
        subtitle: 'Laughter is the best medicine',
        backgroundImage: '/images/laughing.png',
      },
      sections: [
        {
          id: 'intro',
          type: 'text',
          title: 'About Laughing Therapy',
          content: 'Laughing therapy uses humor to help relieve pain and stress and improve a person\'s sense of well-being through jokes and playful exercises that encourage hearty, continuous, and lively laughter.',
        },
      ],
    },
  },
  {
    id: 'talking',
    title: 'Talking Therapy',
    description: 'A quick short conversation can often bring smile to our face.',
    icon: 'FaComments',
    image: '/images/talking.png',
    slug: 'talking',
    content: {
      hero: {
        title: 'Talking Therapy',
        subtitle: 'Share your thoughts, lighten your heart',
        backgroundImage: '/images/talking.png',
      },
      sections: [
        {
          id: 'intro',
          type: 'text',
          title: 'About Talking Therapy',
          content: 'Talking therapy involves talking to someone to help deal with negative feelings or other mental health problems. It helps shy individuals open up their problems to others so that they can help them overcome them.',
        },
      ],
    },
  },
  {
    id: 'doctor',
    title: 'Consult A Doctor',
    description: 'If you\'re facing too many problems, you should consult a doctor.',
    icon: 'FaUserMd',
    image: '/images/doctor.png',
    slug: 'doctor',
    content: {
      hero: {
        title: 'Consult A Doctor',
        subtitle: 'Professional help when you need it',
        backgroundImage: '/images/doctor.png',
      },
      sections: [
        {
          id: 'intro',
          type: 'text',
          title: 'Professional Consultation',
          content: 'Sometimes professional help is necessary. Connect with qualified mental health professionals who can provide personalized support.',
        },
      ],
    },
  },
  {
    id: 'child',
    title: 'Child Therapy',
    description: 'Children make us forget about worries with their innocence.',
    icon: 'FaChild',
    image: '/images/child.jpg',
    slug: 'child',
    content: {
      hero: {
        title: 'Child Therapy',
        subtitle: 'Rediscover joy through innocence',
        backgroundImage: '/images/child.jpg',
      },
      sections: [
        {
          id: 'intro',
          type: 'text',
          title: 'About Child Therapy',
          content: 'Child therapy includes the watching of cute videos and images of children, as children make us forget about our problems with their innocence and cuteness.',
        },
      ],
    },
  },
  {
    id: 'spiritual',
    title: 'Spiritual Therapy',
    description: 'Helps you to become more mindful in your thinking.',
    icon: 'FaPray',
    image: '/images/spiritualtherapy.jpg',
    slug: 'spiritual',
    content: {
      hero: {
        title: 'Spiritual Therapy',
        subtitle: 'Connect with your inner self',
        backgroundImage: '/images/spiritualtherapy.jpg',
      },
      sections: [
        {
          id: 'intro',
          type: 'text',
          title: 'About Spiritual Therapy',
          content: 'Spiritual therapy is a form of counseling that attempts to treat a person\'s soul as well as mind and body by accessing individual belief systems and using that faith in a higher power to explore areas of conflict in life.',
        },
      ],
    },
  },
  {
    id: 'special',
    title: 'Special Therapy',
    description: 'If you need special attention and help from us.',
    icon: 'FaHeart',
    image: '/images/specialtherapy.jpg',
    slug: 'special',
    content: {
      hero: {
        title: 'Special Therapy',
        subtitle: 'Personalized care for your unique needs',
        backgroundImage: '/images/specialtherapy.jpg',
      },
      sections: [
        {
          id: 'intro',
          type: 'text',
          title: 'About Special Therapy',
          content: 'Special therapy provides personalized attention and customized approaches to help you with your specific mental health needs.',
        },
      ],
    },
  },
];
