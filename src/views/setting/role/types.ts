export interface PermissionData {
  permissions: PermissionGroup
}

export interface PermissionGroup {
  blogs: Permission[]
  dashboard: Permission[]
  design: Permission[]
  permissions: Permission[]
  profile: Permission[]
  reports: Permission[]
  roles: Permission[]
  services: Permission[]
  teams: Permission[]
  users: Permission[]
}

export interface Permission {
  id: number
  code: string
  title: string
  description: string
  updated_at: string
  created_at: string
}

export interface Data {
  id: number
  code: string
  title: string
  description: string
  status: 'active' | 'inactive'
  permits: Permission[]
  created_at: string
  updated_at: string
}

export interface EditRole {
  id: number | null
  code: string
  title: string
  description: string
  status: 'active' | 'inactive'
  permits: string[]
}

export interface EditData {
  id?: number | null
  title?: string
  code?: string
  description?: string
  status?: string
  permits?: (number | string)[]
}
