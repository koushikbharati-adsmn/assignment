export interface SignupParams {
  email: string
  password: string
  name: string
}

export interface LoginParams {
  email: string
  password: string
}

export interface SearchWorkflowsParams {
  search?: string
  page?: number
  limit?: number
}

export interface PinWorkflowParams {
  id: number
  pinned: boolean
}

export interface CreateWorkflowParams {
  name: string
  description: string
}
