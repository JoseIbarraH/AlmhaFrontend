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
  image: string | null
  biography: string
  specialization: string
  results: TeamMemberImage[]
  created_at: string
  updated_at: string
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
  url: string
  description: string
}

export interface Filters {
  search?: string
}
