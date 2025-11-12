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
