/**
 * Therapy service type definitions
 */

export interface TherapySection {
  id: string;
  type: 'text' | 'media' | 'grid' | 'list';
  title: string;
  content: any;
}

export interface TherapyContent {
  hero: {
    title: string;
    subtitle: string;
    backgroundImage: string;
  };
  sections: TherapySection[];
}

export interface TherapyService {
  id: string;
  title: string;
  description: string;
  icon: string;
  image: string;
  slug: string;
  content: TherapyContent;
}
