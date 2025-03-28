import { SearchWorkflowsParams } from '@/types/requests'
import { ApiResponse, Workflow } from '@/types/responses'
import apiClient from '@/utils/apiClient'
import { useQuery } from '@tanstack/react-query'

const fetchWorkflows = async (
  data: SearchWorkflowsParams
): Promise<ApiResponse<{ workflows: Workflow[]; count: number }>> => {
  const response = await apiClient.get('/workflow', {
    params: {
      search: data.search,
      page: data.page,
      limit: data.limit
    }
  })
  return response.data
}

export const useFetchWorkflows = (query: SearchWorkflowsParams) => {
  return useQuery({
    queryKey: ['workflows', query],
    queryFn: () => fetchWorkflows(query)
  })
}
