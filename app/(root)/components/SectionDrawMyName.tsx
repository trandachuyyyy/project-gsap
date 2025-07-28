"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function CinematicDoubleImageHero() {
    const sectionRef = useRef(null);
    const bgRef = useRef(null);
    const overlayRef = useRef(null);
    const text1Ref = useRef(null);
    const text2Ref = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "+=400%",
                    scrub: 0.5,
                    pin: true,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                },
            });

            // Nền zoom và blur
            tl.to(bgRef.current, {
                scale: 1.25,
                filter: "blur(8px)",
                ease: "power2.out",
                duration: 2,
            });

            // Ảnh thứ 2 (overlay) trượt từ phải vào giữa
            tl.fromTo(
                overlayRef.current,
                { x: "100%", opacity: 0, scale: 1.1 },
                { x: "0%", opacity: 1, scale: 1, ease: "power3.out", duration: 1.5 },
                "-=1.5"
            );

            // Text 1 reveal
            tl.fromTo(
                text1Ref.current,
                { clipPath: "inset(0% 0% 100% 0%)", opacity: 0 },
                {
                    clipPath: "inset(0% 0% 0% 0%)",
                    opacity: 1,
                    duration: 1,
                    ease: "power2.out",
                },
                "-=1"
            );

            // Text 2 reveal
            tl.fromTo(
                text2Ref.current,
                { clipPath: "inset(0% 0% 100% 0%)", opacity: 0 },
                {
                    clipPath: "inset(0% 0% 0% 0%)",
                    opacity: 0.85,
                    duration: 1,
                    ease: "power2.out",
                },
                "-=0.7"
            );
        }, sectionRef);

        return () => {
            ctx && ctx.revert();
        };
    }, []);

    return (
        <>
            <section ref={sectionRef} className="relative h-screen w-full overflow-hidden bg-black text-white">
                {/* Ảnh nền */}
                <div ref={bgRef} className="absolute inset-0 z-10">
                    <Image
                        src="/profile/chil.jpg"
                        alt="Background"
                        fill
                        className="object-cover brightness-50 will-change-transform"
                    />
                </div>

                {/* Ảnh thứ 2 trượt vào */}
                <div
                    ref={overlayRef}
                    className="absolute right-10 top-1/2 -translate-y-1/2 z-20 w-[60%] md:w-[50%] will-change-transform"
                >
                    <Image
                        src="/profile/chil1.jpg"
                        alt="Overlay Image"
                        width={1200}
                        height={800}
                        className="rounded-xl shadow-2xl object-cover"
                    />
                </div>

                {/* Text */}
                <div className="absolute left-10 bottom-24 z-30 max-w-xl">
                    <h1
                        ref={text1Ref}
                        className="text-4xl md:text-6xl font-bold mb-4 overflow-hidden"
                        style={{ clipPath: "inset(0% 0% 100% 0%)", opacity: 0 }}
                    >
                        Into the Code Realm.
                    </h1>
                    <p
                        ref={text2Ref}
                        className="text-lg md:text-2xl text-gray-300 overflow-hidden pb-2"
                        style={{ clipPath: "inset(0% 0% 100% 0%)", opacity: 0 }}
                    >
                        Where creativity meets precision, and scroll becomes story.
                    </p>
                </div>
            </section>

            {/* Section tiếp theo */}
            <section className="h-[300vh] bg-[#111] text-white flex items-center justify-center text-2xl">
                Bạn đã scroll qua toàn bộ hiệu ứng hero 🎬
            </section>
        </>
    );
}
