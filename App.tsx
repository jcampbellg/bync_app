import Root from './src/screens/Root'
import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import AppNavigation from './src/components/AppNavigation'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      retry: false
    },
    mutations: {
      retry: false
    }
  }
})

function App(): React.JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <Root>
        <AppNavigation />
      </Root>
    </QueryClientProvider>
  )
}

export default App
