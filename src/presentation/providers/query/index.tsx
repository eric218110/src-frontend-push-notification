import { QueryClient, QueryClientProvider } from 'react-query'

export const QueryProvider = ({ children }: { children: JSX.Element }) => (
  <QueryClientProvider client={new QueryClient()}>
    {children}
  </QueryClientProvider>
)
