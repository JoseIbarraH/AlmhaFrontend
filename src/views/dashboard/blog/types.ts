export interface Data {
  id: number
  title: string
  slug: string
  image_name: string
  status: string
  category: string
  updated_at: string
  created_at: string
}

export interface Blog {
  id: number
  title: string
  image: string | File | null
  category: string
  content: string
  status: string
}
