import { PinWorkflowParams } from '@/types/requests'
import apiClient from '@/utils/apiClient'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export const pinWorkflow = async ({ id, pinned }: PinWorkflowParams) => {
  const response = await apiClient.patch(`/workflow/${id}/pin`, {
    pinned
  })

  return response.data
}

export const usePinWorkflowMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: pinWorkflow,
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
