"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function FancyHero() {
    const containerRef = useRef(null);
    const img1Ref = useRef(null);
    const img2WrapperRef = useRef(null);
    const img2Ref = useRef(null);
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);

    const fullText = "Chill Mode On, Code in Style.";
    const [typedText, setTypedText] = useState("");
    const [doneTyping, setDoneTyping] = useState(false);

    // Typing effect tied to ScrollTrigger
    useEffect(() => {
        let index = 0;
        let typingTimeout: any;

        const type = () => {
            if (index < fullText.length) {
                setTypedText(fullText.slice(0, index + 1));
                index++;
                typingTimeout = setTimeout(type, 60);
            } else {
                setDoneTyping(true);
            }
        };

        const scrollTrigger = ScrollTrigger.create({
            trigger: containerRef.current,
            start: "top 80%",
            onEnter: () => {
                // Reset and start typing when entering viewport
                setTypedText("");
                setDoneTyping(false);
                index = 0;
                clearTimeout(typingTimeout);
                type();
            },
            onLeaveBack: () => {
                // Reset when scrolling back up
                setTypedText("");
                setDoneTyping(false);
                index = 0;
                clearTimeout(typingTimeout);
            },
        });

        return () => {
            clearTimeout(typingTimeout);
            scrollTrigger.kill();
        };
    }, []);

    // Entry animations
    useEffect(() => {
        const ctx = gsap.context(() => {
            const entryTl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                    end: "top 20%",
                    toggleActions: "play none none reverse",
                },
            });

            entryTl.fromTo(
                img1Ref.current,
                { scale: 1.1, opacity: 0, filter: "blur(10px)" },
                { scale: 1.2, opacity: 1, filter: "blur(0px)", duration: 1.5, ease: "power3.out" }
            );

            entryTl.fromTo(
                titleRef.current,
                { y: 40, opacity: 0 },
                { y: 0, opacity: 1, duration: 1.2, delay: 0.3, ease: "power2.out" }
            );

            entryTl.fromTo(
                subtitleRef.current,
                { y: 30, opacity: 0 },
                { y: 0, opacity: 0.8, duration: 1.2, delay: 0.8, ease: "power2.out" }
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    // Scroll-triggered animations
    useEffect(() => {
        if (!doneTyping) return;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "+=200%",
                    scrub: true,
                    pin: true,
                    onUpdate: (self) => {
                        if (self.progress === 0 && self.direction === -1) {
                            ScrollTrigger.refresh();
                        }
                    },
                },
            });

            tl.to(img1Ref.current, {
                scale: 1,
                y: -60,
                ease: "power2.out",
                duration: 2,
            });

            tl.fromTo(
                img2WrapperRef.current,
                { clipPath: "inset(100% 0% 0% 0%)", opacity: 0, filter: "blur(10px)" },
                { clipPath: "inset(0% 0% 0% 0%)", opacity: 1, filter: "blur(0px)", duration: 1.8, ease: "power3.out" },
                "+=0.4"
            );

            tl.to(img1Ref.current, { opacity: 0.3, filter: "blur(8px)", duration: 1.8, ease: "power3.out" }, "-=1.8");

            tl.fromTo(
                img2Ref.current,
                { scale: 1.1 },
                { scale: 1.03, y: -30, ease: "power1.out", duration: 2 },
                "-=1.5"
            );
        }, containerRef);

        return () => ctx.revert();
    }, [doneTyping]);

    // Refresh ScrollTrigger on window resize
    useEffect(() => {
        const handleResize = () => {
            ScrollTrigger.refresh();
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <>
            <section
                ref={containerRef}
                id="ss-draw-my-name"
                className="relative h-screen w-full overflow-hidden bg-black font-mono"
            >
                <Image
                    ref={img1Ref}
                    src="/profile/chil.jpg"
                    alt="Scene 1"
                    width={1920}
                    height={1080}
                    className="absolute inset-0 h-full w-full object-cover z-10 brightness-50 will-change-transform"
                />
                <div
                    ref={img2WrapperRef}
                    className="absolute inset-0 z-20 overflow-hidden"
                    style={{ clipPath: "inset(100% 0% 0% 0%)" }}
                >
                    <Image
                        ref={img2Ref}
                        src="/profile/chil1.jpg"
                        alt="Scene 2"
                        width={1920}
                        height={1080}
                        className="h-full w-full object-cover origin-center will-change-transform"
                    />
                </div>
                <div className="relative z-30 flex h-full flex-col items-center justify-center text-center px-4 text-cyan-300">
                    <h1 ref={titleRef} className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-lg opacity-0">
                        {typedText}
                        <span className="inline-block animate-pulse">|</span>
                    </h1>
                    <p ref={subtitleRef} className="text-base md:text-xl text-gray-300 max-w-xl opacity-0">
                        Feel the Vibe, Code the Future.
                    </p>
                </div>
            </section>
            <section className="h-[120vh] bg-[#111] text-white flex items-center justify-center text-2xl"></section>
        </>
    );
}
