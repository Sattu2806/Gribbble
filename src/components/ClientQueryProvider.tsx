'use client'
import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
  } from '@tanstack/react-query'
import { ReactNode } from 'react'

type Props = {}

const queryClient = new QueryClient()

const ClientQueryProvider = ({children}:{children:ReactNode}) => {
  return (
    <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
  )
}

export default ClientQueryProvider