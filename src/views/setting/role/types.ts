export interface Data {
  id: number
  code: string
  title: string
  description: string
  status: string
  updated_at: string
  created_at: string
}

export interface PermissionData {
  permissions: Permission[]
}

export interface Permission {
  id: number
  code: string
  title: string
  description: string
  updated_at: string
  created_at: string
}
