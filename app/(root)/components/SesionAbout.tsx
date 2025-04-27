"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SesionAbout = ({ className }: { className?: string }) => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLHeadingElement>(null);
    const boxesRef = useRef<Array<HTMLDivElement | null>>([]);
    const lineRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Title animation - trigger sớm hơn
        gsap.fromTo(
            titleRef.current,
            { opacity: 0, scale: 0.95 },
            {
                opacity: 1,
                scale: 1,
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: titleRef.current,
                    start: "top bottom-=120", // 👈 Trigger sớm hơn
                    toggleActions: "play none none reverse",
                },
            }
        );

        // Subtitle animation - trigger sớm hơn
        gsap.fromTo(
            subtitleRef.current,
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: subtitleRef.current,
                    start: "top bottom-=100", // 👈
                    toggleActions: "play none none reverse",
                },
            }
        );

        // Boxes animations – show individually, trigger sớm
        boxesRef.current.forEach((box) => {
            if (!box) return;
            gsap.fromTo(
                box,
                { opacity: 0, y: 40 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: box,
                        start: "top bottom-=80", // 👈 Sớm hơn
                        toggleActions: "play none none reverse",
                    },
                }
            );

            // Hover magnetic effect
            box.addEventListener("mousemove", (e) => {
                const rect = box.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                gsap.to(box, {
                    x: x * 0.02,
                    y: y * 0.02,
                    rotateX: -y * 0.05,
                    rotateY: x * 0.05,
                    duration: 0.3,
                });
            });

            box.addEventListener("mouseleave", () => {
                gsap.to(box, {
                    x: 0,
                    y: 0,
                    rotateX: 0,
                    rotateY: 0,
                    duration: 0.4,
                    ease: "power2.out",
                });
            });
        });

        // Line animation - sweep
        gsap.fromTo(
            lineRef.current,
            { scaleX: 0 },
            {
                scaleX: 1,
                transformOrigin: "left",
                duration: 1.5,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top bottom-=100", // 👈 Trigger sớm hơn
                    toggleActions: "play none none reverse",
                },
            }
        );
    }, []);

    const arrayAbout = [
        "I design and build modern web interfaces with performance in mind.",
        "Creating user experiences that feel smooth, fast, and delightful.",
        "From concept to code, I bring ideas to life with precision.",
        "Passionate about clean code and scalable architecture.",
        "Always exploring the latest in web technologies and trends.",
        "Collaboration and problem-solving are at the heart of my process.",
    ];

    return (
        <div
            id="ss-about"
            ref={sectionRef}
            className={`relative min-h-screen py-24 dark:bg-black bg-white dark:text-white text-black overflow-hidden ${className}`}
        >
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br dark:from-zinc-900 dark:via-black dark:to-zinc-900 from-white-900 via-white to-white-900 opacity-80 pointer-events-none" />

            {/* Optional grid overlay */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02] pointer-events-none" />

            {/* Title + subtitle */}
            <div className="relative z-10 max-w-7xl mx-auto text-center px-6">
                <h1 ref={titleRef} className="text-4xl font-extrabold uppercase tracking-wider">
                    About
                </h1>
                <h2 ref={subtitleRef} className="mt-4 text-xl md:text-2xl font-light dark:text-white/80 text-black/80">
                    The story behind the work
                </h2>
            </div>

            {/* Boxes */}
            <div className="mt-20 relative z-10 max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
                {arrayAbout.map((text, index) => (
                    <div
                        key={index}
                        ref={(el: any) => (boxesRef.current[index] = el)}
                        className="min-h-[160px] p-6 dark:bg-white/5 bg-black/10 border dark:border-white/10 border-black/10 rounded-lg dark:hover:border-white/30 hover:border-black/30 hover:shadow-lg transition-all duration-300"
                    >
                        <p className="dark:text-white/90 text-black/90 text-base font-light leading-relaxed">{text}</p>
                    </div>
                ))}
            </div>

            {/* Line */}
            <div
                ref={lineRef}
                className="mt-20 h-1 max-w-5xl mx-auto bg-gradient-to-r from-transparent dark:via-white via-black to-transparent scale-x-0"
            />
        </div>
    );
};

export default SesionAbout;
