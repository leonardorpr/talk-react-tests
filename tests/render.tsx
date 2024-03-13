import { Toaster } from '@/components/ui/toaster'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { RenderOptions, render } from '@testing-library/react'

const queryClient = new QueryClient()

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster />
    </QueryClientProvider>
  )
}

function customRender(ui: React.ReactNode, renderOptions?: RenderOptions) {
  return render(ui, { wrapper: Providers, ...renderOptions })
}

export * from '@testing-library/react'
export * from '@testing-library/user-event'
export { customRender as render }
