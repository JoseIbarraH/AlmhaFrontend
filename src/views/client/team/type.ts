export interface Data {
  id: number
  name: string
  status: string
  image: string
  team_member_translations: TeamMemberTranslations[]
  team_member_images: TeamMemberImages[]
  updated_at: string
  created_at: string
}

export interface TeamMemberTranslations {
  specialization: string
  biography: string
}

export interface TeamMemberImages {
  url: string
  description: string
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

export interface Filters {
  search?: string
}
