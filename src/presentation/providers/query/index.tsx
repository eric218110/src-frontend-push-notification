import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

export const QueryProvider = ({ children }: { children: JSX.Element }) => (
  <QueryClientProvider client={new QueryClient()}>
    {children}
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
)
