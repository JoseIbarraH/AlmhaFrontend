export interface Service {
  id: number
  title: string
  description: string
  status: string

}

export interface Data {
  id: number
  title: string
  status: string
  image: string | File | null
  updated_at: string
  created_at: string
}
