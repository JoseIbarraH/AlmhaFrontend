export interface Data {
  id: number
  title: string
  slug: string
  image_name: string
  status: string
  category: Category
  updated_at: string
  created_at: string
}

export interface BlogForm {
  id: number
  title: string
  image: string | File | null
  writer: string
  category: string
  content: string
  status: string
}

export interface Blog {
  id: number
  title: string
  image: string | File | null
  category: string
  content: string
  status: string
  writer: string
}

export interface CategoryData {
  categories: Category[]
}

export interface Category {
  id: number
  code: string
  title: string
}
