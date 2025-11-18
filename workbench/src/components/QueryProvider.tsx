import type { PropsWithChildren } from 'react'
import { queryClient } from '@services/query-client.service'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

/**
 * QueryProvider wraps the application with React Query's QueryClientProvider.
 * This makes React Query hooks available throughout the app.
 *
 * The QueryClient is configured at the application level but queries/mutations
 * can be used independently in any component.
 */
export default function QueryProvider({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* React Query Devtools - only shows in development */}
      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  )
}
