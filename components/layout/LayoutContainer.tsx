"use client";
import { useEffect, useRef, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from "./Header";
import Footer from "./Footer";
import IntroSection from "./IntroSection";
import { useHeader } from "@/hooks/useMenuHeader";
import MobileMenu from "./MobileMenu";

gsap.registerPlugin(ScrollTrigger);

const queryClient = new QueryClient();

const LayoutContainer = ({ children }: { children: React.ReactNode }) => {
    const viewportRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const splashRef = useRef<any>(null);
    const [showSplash, setShowSplash] = useState(true);
    const { openMenu } = useHeader()

    useEffect(() => {
        // Đảm bảo splash screen hiển thị ngay từ đầu
        gsap.set(splashRef.current, { autoAlpha: 1 });

        // Khởi tạo text ẩn hoàn toàn
        gsap.set(splashRef.current?.querySelector(".name"), {
            autoAlpha: 0,
            y: 100,
            scale: 0.8
        });
        gsap.set(splashRef.current?.querySelector(".title"), {
            autoAlpha: 0,
            y: 50
        });

        // Hiệu ứng Splash Screen
        const tl = gsap.timeline({
            delay: 0.1, // Thêm delay nhỏ để đảm bảo DOM ready
            onComplete: () => setShowSplash(false),
        });

        tl.to(
            splashRef.current?.querySelector(".name"),
            {
                autoAlpha: 1,
                y: 0,
                scale: 1,
                duration: 1.5,
                ease: "power4.out"
            }
        )
            .to(
                splashRef.current?.querySelector(".title"),
                {
                    autoAlpha: 1,
                    y: 0,
                    duration: 1.2,
                    ease: "power3.out"
                },
                "-=0.8"
            )
            .to(
                splashRef.current,
                {
                    autoAlpha: 0,
                    duration: 0.8,
                    ease: "power2.in",
                    delay: 0.5
                }
            );

        // Hiệu ứng hiển thị content chính
        if (!showSplash) {
            const ctx = gsap.context(() => {
                gsap.fromTo(
                    contentRef.current,
                    { autoAlpha: 0, scale: 0.98 },
                    {
                        autoAlpha: 1,
                        scale: 1,
                        duration: 1.8,
                        ease: "power3.out"
                    }
                );

            }, viewportRef);
            return () => ctx.revert();
        }
    }, [showSplash]);

    useEffect(() => {
        const initLenis = async () => {
            const Lenis = (await import("@studio-freight/lenis")).default;
            const lenis = new Lenis({
                duration: 1.8,
                easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            });

            function raf(time: number) {
                lenis.raf(time);
                requestAnimationFrame(raf);
            }

            requestAnimationFrame(raf);
            lenis.on("scroll", ScrollTrigger.update);
            gsap.ticker.add((time) => lenis.raf(time * 1000));
            ScrollTrigger.refresh();

            return () => lenis.destroy();
        };

        initLenis();
    }, []);

    return (
        <QueryClientProvider client={queryClient}>
            <div
                ref={viewportRef}
                id="viewport"
                className="relative min-h-screen bg-[#0a0a0a] text-white"
            >
                {
                    <MobileMenu />
                }
                <Header />

                {showSplash && (
                    <div
                        ref={splashRef}
                        className="fixed inset-0 bg-[#0a0a0a] flex flex-col items-center justify-center z-50"
                    >
                        <h1
                            className="name text-5xl md:text-7xl font-bold tracking-tight"
                            style={{ visibility: "hidden" }} // Ẩn mặc định bằng CSS
                        >
                            TRAN DAC HUY
                        </h1>
                        <p
                            className="title text-xl md:text-2xl mt-4 text-gray-400"
                            style={{ visibility: "hidden" }} // Ẩn mặc định bằng CSS
                        >
                            FRONTEND DEVELOPER
                        </p>
                    </div>
                )}
                <div ref={contentRef} id="content" className="opacity-0">

                    <IntroSection />
                    <main className="relative z-0">{children}</main>
                    <Footer />
                </div>
            </div>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
};

export default LayoutContainer;