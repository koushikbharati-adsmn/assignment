import { CreateWorkflowParams } from '@/types/requests'
import apiClient from '@/utils/apiClient'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { useNavigate } from 'react-router'

const createWorkflow = async ({ name, description }: CreateWorkflowParams) => {
  const response = await apiClient.post('/workflow', {
    name,
    description
  })

  return response.data
}

export const useCreateWorkflowMutation = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: createWorkflow,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['workflows']
      })
      navigate('/')
    },
    onError: (error) => {
      console.error('Failed to create workflow:', error)
      toast.error(error.message)
    }
  })
}
