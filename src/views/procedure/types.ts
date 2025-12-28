export interface Data {
  id: number;
  title: string;
  status: string;
  slug: string;
  created_at: string;
  updated_at: string;
}

export interface Procedure {
  id: number
  status: string
  image: File | null

  title: string
  subtitle: string

  section: Section[]

  preStep: PreStep

  phase: Phase

  faq: Faq

  do: Do

  dont: Dont

  gallery: Gallery
}

export interface Section {
  type: string
  image: File | null
  title: string
  contentOne: string
  contentTwo: string
}

export interface PreStep {
  deleted: number[]
  updated: PreStepUpdated[]
  new: PreStepNew[]
}

export interface PreStepUpdated {
  id: number
  title: string
  description: string
  order: number
}

export interface PreStepNew {
  title: string
  description: string
  order: number
}

export interface Phase {
  deleted: number[]
  updated: PhaseUpdated[]
  new: PhaseNew[]
}

export interface PhaseUpdated {
  id: number
  period: string
  title: string
  description: string
  order: number
}

export interface PhaseNew {
  period: string
  title: string
  description: string
  order: number
}

export interface Faq {
  deleted: number[]
  updated: FaqUpdated[]
  new: FaqNew[]
}

export interface FaqUpdated {
  id: number
  question: string
  answer: string
  order: number
}

export interface FaqNew {
  question: string
  answer: string
  order: number
}

export interface Do {
  deleted: number[]
  updated: DoUpdated[]
  new: DoNew[]
}

export interface DoUpdated {
  id: number
  content: string
  order: number
}

export interface DoNew {
  content: string
  order: number
}

export interface Dont {
  deleted: number[]
  updated: DontUpdated[]
  new: DontNew[]
}

export interface DontUpdated {
  id: number
  content: string
  order: number
}

export interface DontNew {
  content: string
  order: number
}

export interface Gallery {
  deleted: number[]
  updated: GalleryUpdated[]
  new: GalleryNew[]
}

export interface GalleryUpdated {
  id: number
  path: File | null
}

export interface GalleryNew {
  path: File | null
}
