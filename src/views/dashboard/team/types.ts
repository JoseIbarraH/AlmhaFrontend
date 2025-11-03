export interface ApiResponse<T> {
  success: boolean
  message: string
  data: T
}

export interface Default {
  filters: Filters
  pagination: PaginatedResponse<Data>
  stats: Stats
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

export interface PaginationLink {
  url: string | null
  label: string
  active: boolean
}

export interface Stats {
  total: number
  totalActivated: number
  totalDeactivated: number
  lastCreated: number
}

export interface TeamMember {
  id: number
  name: string
  status: string
  image: string  | File | null
  biography: string
  specialization: string
  results: TeamMemberImage[]
}

export interface Data {
  id: number
  name: string
  status: string
  image: string
  updated_at: string
  created_at: string
}

export interface TeamMemberImage {
  id: number | null
  url: string | File | null
  description: string
}

export interface Filters {
  search?: string
}
