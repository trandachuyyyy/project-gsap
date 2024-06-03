'use client'
import React, { useEffect, useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

const LayoutContainer = ({ children }: { children: React.ReactNode }) => {
    const queryClient = new QueryClient()
    const [showSplash, setShowSplash] = useState(true)

    useEffect(() => {
        const timeline = gsap.timeline({ delay: 1 });

        if (showSplash) {
            timeline.fromTo('.splash-text', { y: '0%', opacity: 1 }, { y: '-200%', opacity: 1, duration: 1 })
                .to('.splash-text', { y: '-450%', opacity: 0, duration: 2 })
                .to('.splash-background', { y: '-100%', duration: 2, delay: -1 })
                .set('.splash-container', { display: 'none' }) // Ẩn splash
                .to('.splash-background', { y: '-200%', duration: 2, delay: -1 })
                .set('.splash-background', { zIndex: -1 }); // Đẩy background lên sau khi ẩn splash
        }
    }, [showSplash])

    useEffect(() => {
        // Tắt splash sau 3s
        const timeout = setTimeout(() => {
            setShowSplash(false);
        }, 3000);
        return () => clearTimeout(timeout);
    }, []);



    if (showSplash) {
        return (
            <div className="splash-container" style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden' }}>
                <div className="splash-background bg-gray-200" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}></div>
                <div className="splash-text uppercase text-black font-bold" style={{ zIndex: 3, position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '48px', }}>Huy tran</div>
            </div>
        )
    }



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
