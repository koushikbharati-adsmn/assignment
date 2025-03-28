export interface ApiResponse<T = any> {
  success: boolean
  message: string
  data?: T
}

export interface AuthResponse {
  token: string
}

export interface Workflow {
  id: number
  name: string
  created_at: Date
  description: string
  updated_at: Date
  created_by: string
  pinned: boolean
  users: {
    name: string
  }
}
