import apiClient from '@/utils/apiClient'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export const deleteWorkflow = async ({ id }: { id: string | number }) => {
  const response = await apiClient.delete(`/workflow/${id}`)

  return response.data
}

export const useDeleteWorkflowMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteWorkflow,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['workflows']
      })
    },
    onError: (error) => {
      console.error(error.message)
      toast.error(error.message)
    }
  })
}
