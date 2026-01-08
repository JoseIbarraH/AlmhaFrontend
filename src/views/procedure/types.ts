export interface Data {
  id: number;
  title: string;
  status: string;
  slug: string;
  created_at: string;
  updated_at: string;
}

export interface ProcedureBackend {
  id: number
  status: string
  title: string
  subtitle: string
  slug: string
  image: string | null

  // Arrays simples como llegan del backend
  section?: SectionBackend[]
  faq?: FaqBackend[]
  phase?: PhaseBackend[]
  preStep?: PreStepBackend[]
  do?: DoBackend[]
  dont?: DontBackend[]
  gallery?: GalleryBackend[]
}

export interface SectionBackend {
  id: number
  type: 'what_is' | 'technique' | 'recovery'
  title: string
  contentOne: string
  contentTwo: string
  image: File | null
  imageUrl?: string | null
}

export interface FaqBackend {
  id: number
  question: string
  answer: string
  order: number
}

export interface PhaseBackend {
  id: number
  period: string
  title: string
  description: string
  order: number
}

export interface PreStepBackend {
  id: number
  title: string
  description: string
  order: number
}

export interface DoBackend {
  id: number
  content: string
  order: number
}

export interface DontBackend {
  id: number
  content: string
  order: number
}

export interface GalleryBackend {
  id: number
  path: string
  order: number
}

export interface ProcedureFrontend {
  status: string
  title: string
  subtitle: string
  image: File | string | null

  section: {
    type: 'what_is' | 'technique' | 'recovery'
    image: File | null
    title: string
    contentOne: string
    contentTwo: string
  }[]

  faq: {
    deleted: number[]
    updated: FaqBackend[]
    new: Omit<FaqBackend, 'id'>[]
  }

  phase: {
    deleted: number[]
    updated: PhaseBackend[]
    new: Omit<PhaseBackend, 'id'>[]
  }

  preStep: {
    deleted: number[]
    updated: PreStepBackend[]
    new: Omit<PreStepBackend, 'id'>[]
  }

  do: {
    deleted: number[]
    updated: DoBackend[]
    new: Omit<DoBackend, 'id'>[]
  }

  dont: {
    deleted: number[]
    updated: DontBackend[]
    new: Omit<DontBackend, 'id'>[]
  }

  gallery: {
    deleted: number[]
    updated: GalleryBackend[]
    new: Omit<GalleryBackend, 'id'>[]
  }
}

