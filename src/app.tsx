import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { Toaster } from '@/components/ui/toaster'

import { Tasks } from '@/pages/tasks/page'

const queryClient = new QueryClient()

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Tasks />
      <Toaster />
    </QueryClientProvider>
  )
}
