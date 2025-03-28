import { LoginParams } from '@/types/requests'
import { ApiResponse, AuthResponse } from '@/types/responses'
import apiClient from '@/utils/apiClient'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { useNavigate } from 'react-router'

const login = async (data: LoginParams): Promise<ApiResponse<AuthResponse>> => {
  const response = await apiClient.post('/auth/login', data)
  return response.data
}

export const useLoginMutation = () => {
  const navigate = useNavigate()
  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      if (data.data) {
        localStorage.setItem('token', data.data.token)
        navigate('/')
      }
    },
    onError: (error) => {
      console.error(error.message)
      toast.error(error.message)
    }
  })
}
