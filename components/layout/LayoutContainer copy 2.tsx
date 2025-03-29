// 'use client'
// import { useResize } from '@/hooks/useResize'
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
// import gsap from 'gsap'
// import { usePathname } from 'next/navigation'
// import React, { useEffect, useState } from 'react'
// import Footer from './Footer'
// import Header from './Header'

// const LayoutContainer = ({ children }: { children: React.ReactNode }) => {
//     const queryClient = new QueryClient()

//     const pathname = usePathname();

//     const [showSplash, setShowSplash] = useState(true)

//     const { isVisibleMobile, isVisibleTablet, onCloseResizeMobile, onCloseResizeTablet, onResizeMobile, onResizeTablet } = useResize()

//     useEffect(() => {
//         const timeline = gsap.timeline({ delay: 1 });

//         if (showSplash) {
//             timeline.fromTo('.splash-text', { y: '0%', opacity: 1 }, { y: '-300%', opacity: 1, duration: 1 })
//                 .to('.splash-background-2', { bottom: '-50%', duration: 1, delay: -1 })
//                 .to('.splash-text', { y: '-800%', opacity: 0, duration: 0.49, delay: 0 }, 1)
//                 .to('.splash-background-2', { bottom: '0%', borderRadius: 0, duration: 0.5, delay: 0 }, 1)
//                 .set('.splash-container', { display: 'none' }) // Ẩn splash
//         }
//     }, [showSplash])

//     useEffect(() => {
//         // Tắt splash sau 3s
//         const timeout = setTimeout(() => {
//             setShowSplash(false);
//         }, 3000);
//         return () => clearTimeout(timeout);
//     }, []);

//     useEffect(() => {
//         // Kiểm tra kích thước màn hình và cập nhật trạng thái isVisible
//         const handleResize = () => {
//             if (window.innerWidth < 768) {
//                 // khi đến màn 768 thì bắt đầu thực hiện function
//                 onResizeMobile();
//             } else {
//                 onCloseResizeMobile()
//             }
//             if (window.innerWidth <= 768) {
//                 onResizeTablet()
//             } else {
//                 onCloseResizeTablet()
//             }
//         };

//         // Gọi hàm handleResize khi kích thước màn hình thay đổi
//         window.addEventListener('resize', handleResize);

//         // Gọi hàm handleResize một lần khi component được render
//         handleResize();

//         // Hủy lắng nghe sự kiện resize khi component bị unmount
//         return () => {
//             window.removeEventListener('resize', handleResize);
//         };
//     }, [
//         isVisibleMobile,
//         isVisibleTablet,
//         onCloseResizeMobile,
//         onCloseResizeTablet,
//         onResizeMobile,
//         onResizeTablet,
//     ]);





//     if (showSplash) {
//         return (
//             <div className="splash-container" style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden' }}>
//                 <div className="splash-background bg-gray-200" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}></div>
//                 <div className={`splash-background-2 bg-white ${isVisibleMobile ? 'rounded-tl-[70%] rounded-tr-[70%]' : "rounded-tl-[100%] rounded-tr-[100%]"} translate-x-[-7%]`} style={{ position: 'absolute', bottom: '-100%', left: 0, width: '120vw', height: '100%', zIndex: 1 }}></div>
//                 <div className="splash-text uppercase text-black font-bold lg:text-[48px] text-2xl" style={{ zIndex: 3, position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', }}>Huy tran</div>
//             </div>
//         )
//     }

//     return (
//         <QueryClientProvider client={queryClient}>
//             <Header />
//             {children}
//             <Footer />
//             <ReactQueryDevtools initialIsOpen={false} />
//         </QueryClientProvider>
//     )
// }

// export default LayoutContainer
"use client"
import { useEffect, useRef, useState } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { gsap } from "gsap"
import Header from "./Header"
import Footer from "./Footer"
const queryClient = new QueryClient()
const LayoutContainer = ({ children }: { children: React.ReactNode }) => {
    const [showIntro, setShowIntro] = useState(true)
    const splashRef = useRef(null)
    const cubeRef = useRef(null)

    useEffect(() => {
        const tl = gsap.timeline({
            onComplete: () => {
                gsap.to(splashRef.current, {
                    opacity: 0,
                    duration: 0.5,
                    onComplete: () => setShowIntro(false),
                })
            },
        })

        tl.to(cubeRef.current, {
            rotateY: 360,
            duration: 1.5,
            ease: "power2.inOut",
        })
    }, [])

    return (
        <QueryClientProvider client={queryClient}>
            {showIntro && (
                <div
                    ref={splashRef}
                    className="fixed top-0 left-0 w-full h-full bg-black flex items-center justify-center z-[9999]"
                >
                    <div
                        ref={cubeRef}
                        className="w-32 h-32 bg-white text-black font-bold text-xl flex items-center justify-center rounded-xl cubize"
                    >
                        FOSO
                    </div>
                </div>
            )}
            <Header />
            {children}
            <Footer />
            <ReactQueryDevtools initialIsOpen={false} />
            <style jsx global>{`
        .cubize {
          transform-style: preserve-3d;
          perspective: 1000px;
        }
      `}</style>
        </QueryClientProvider>
    )
}

export default LayoutContainer
