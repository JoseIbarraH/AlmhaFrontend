// types/api.ts
export interface SilentError {
  message: string
  isSilent?: boolean
  status?: number
  originalError?: any
}

export interface ApiError {
  response?: {
    status: number
    data: any
  }
  config?: {
    url?: string
  }
}
