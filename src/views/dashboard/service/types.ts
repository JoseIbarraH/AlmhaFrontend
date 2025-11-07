export interface FrequentlyAskedQuestion {
  question: string;
  answer: string;
}

export interface SurgeryPhases {
  id: number;
  lang: string;
  postoperative_recommendations: string[];
  preoperative_recommendations: string[];
  recovery_time: string[]
}

export interface SampleImages {
  technique: string | File | null;
  recovery: string | File | null;
  postoperative_care: string | File | null;
}

export interface ResultGallery {
  path: string | File | null;
}

export interface Service {
  id: number;
  status: string;
  image: string | File | null;
  slug: string
  created_at?: string;
  updated_at?: string;

  // Traducción (sin anidación)
  title: string;
  description: string;
  lang: string;

  // Arrays
  sample_images: SampleImages
  frequently_asked_questions: FrequentlyAskedQuestion[];
  surgery_phases: SurgeryPhases;
  results_gallery: ResultGallery[];
}

export interface Data {
  id: number
  title: string
  status: string
  image: string
  updated_at: string
  created_at: string
}
