'use client'
import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const LayoutContainer = ({ children }: { children: React.ReactNode }) => {
    const queryClient = new QueryClient()

    return (
        <QueryClientProvider client={queryClient}>
            <Header />
            {children}
            <Footer />
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    )
}

export default LayoutContainer