export interface Roles {
  id: number
  code: string
  title: string
  status: 'active' | 'inactive'
  description: string
  updated_at: string
  created_at: string
}

export interface Data {
  id: number
  name: string
  status: 'active' | 'inactive'
  email: string
  roles: Roles[]
  password: string
  created_at: string
  updated_at: string
}

export interface RoleData {
  roles: Roles[]
}

export interface Roles {
  id: number
  code: string
  title: string
  description: string
}

export interface EditUser {
  id: number | null
  name: string
  status: 'active' | 'inactive'
  email: string
  password: string
  roles: string[]
}

export interface DataForm {
  name: string
  status: 'active' | 'inactive'
  email: string
  roles: string[]
  password: string
  password_confirmation: string
}

