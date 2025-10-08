export interface Blog2 {
    id: number;
    title: string;
    content: string;
    image_name: string;
    slug: string;
    status: string;
    category?: string;
    created_at: string;
    updated_at: string;
    view: number;
    writer: string
}

export interface Blog {
  title: string
  content: string
  image_name: string
  slug: string
  status: string
  category: string
  created_at: string
  updated_at: string
  view: number
  writer: string
}

export interface NextPreviewBlogs {
  title: string
  slug: string
}

export interface PopularBlogs {
  title: string
  slug: string
  image_name: string
}

export interface Data {
  title: string
  slug: string
  image_name: string
  category: string
  created_at: string
}

export interface PaginationLink {
  url: string | null
  label: string
  active: boolean
}

export interface PaginatedResponse<T> {
  current_page: number
  data: T[]
  first_page_url: string
  from: number | null
  last_page: number
  last_page_url: string
  links: PaginationLink[]
  next_page_url: string | null
  path: string
  per_page: number
  prev_page_url: string | null
  to: number | null
  total: number
}
