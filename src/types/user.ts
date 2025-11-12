export interface Role {
  id: number;
  code: string;
  permissions: Permission[];
}

export interface Permission {
  id: number;
  code: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  roles: Role[];
}
