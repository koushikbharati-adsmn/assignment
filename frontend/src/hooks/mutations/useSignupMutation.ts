import { SignupParams } from '@/types/requests'
import { ApiResponse, AuthResponse } from '@/types/responses'
import apiClient from '@/utils/apiClient'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { useNavigate } from 'react-router'

const signup = async (data: SignupParams): Promise<ApiResponse<AuthResponse>> => {
  const response = await apiClient.post('/auth/signup', data)
  return response.data
}

export const useSignupMutation = () => {
  const navigate = useNavigate()
  return useMutation({
    mutationFn: signup,
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
