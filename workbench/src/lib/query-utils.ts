import requestService from '@services/request.service'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

/**
 * Utility functions for using React Query with the existing request service.
/**
 * Create a query using the request service
 *
 * @example
 * ```ts
 * const { data, isLoading, error } = useApiQuery({
 *   queryKey: ['users', userId],
 *   url: `/users/${userId}`,
 *   enabled: !!userId,
 * })
 * ```
 */
export function useApiQuery<T = any>(config: {
  queryKey: readonly unknown[];
  url: string;
  params?: any;
  enabled?: boolean;
  staleTime?: number;
}) {
  return useQuery<T>({
    queryKey: config.queryKey,
    queryFn: async () => {
      const response = await requestService.get(config.url, config.params)
      return response.data
    },
    enabled: config.enabled ?? true,
    staleTime: config.staleTime,
  })
}

/**
 * Create a mutation using the request service
 *
 * @example
 * ```ts
 * const mutation = useApiMutation({
 *   mutationFn: (data) => requestService.post('/users', data),
 *   onSuccess: () => {
 *     queryClient.invalidateQueries({ queryKey: ['users'] })
 *   },
 * })
 * ```
 */
export function useApiMutation<TData = any, TVariables = any>(config: {
  mutationFn: (variables: TVariables) => Promise<{ data: TData }>;
  onSuccess?: (data: TData, variables: TVariables) => void;
  onError?: (error: Error, variables: TVariables) => void;
}) {
  return useMutation({
    mutationFn: async (variables: TVariables) => {
      const response = await config.mutationFn(variables)
      return response.data
    },
    onSuccess: (data, variables) => {
      config.onSuccess?.(data, variables)
    },
    onError: (error, variables) => {
      config.onError?.(error as Error, variables)
    },
  })
}

/**
 * Helper to get the query client for manual cache operations
 *
 * @example
 * ```ts
 * const queryClient = useQueryClient()
 * queryClient.invalidateQueries({ queryKey: ['users'] })
 * ```
 */
export { useQueryClient }
