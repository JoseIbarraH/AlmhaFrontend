export interface Data {
  id: number
  user_type: string
  user_id: number
  user_name: string
  event: string
  auditable_type: string
  auditable_id: number
  old_values: Record<string, any> | null
  new_values: Record<string, any> | null
  url: string
  ip_address: string
  user_agent: string
  tags: string
  created_at: string
  updated_at: string
}
