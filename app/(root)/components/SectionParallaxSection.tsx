"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useResize } from "@/hooks/useResize";

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Experience data
const experiences = [
    {
        id: 1,
        title: "React Expert",
        years: "3+ years",
        description: "Extensive experience building complex applications with React, Redux, and React Query.",
        icon: "⚛️",
        color: "bg-blue-500",
    },
    {
        id: 2,
        title: "Next.js Developer",
        years: "3+ years",
        description: "Specialized in server-side rendering, static site generation, and API routes with Next.js.",
        icon: "▲",
        color: "dark:bg-gray-900 bg-black",
    },
    {
        id: 3,
        title: "Animation Specialist",
        years: "3+ years",
        description: "Creating smooth, performant animations with GSAP, Framer Motion, and CSS animations.",
        icon: "✨",
        color: "bg-green-500",
    },
    {
        id: 4,
        title: "UI/UX Enthusiast",
        years: "3+ years",
        description: "Designing and implementing beautiful, intuitive user interfaces with attention to detail.",
        icon: "🎨",
        color: "bg-purple-500",
    },
    {
        id: 5,
        title: "Performance Optimizer",
        years: "3+ years",
        description: "Optimizing web applications for speed, accessibility, and SEO.",
        icon: "⚡",
        color: "bg-yellow-500",
    },
    {
        id: 6,
        title: "TypeScript Pro",
        years: "3+ years",
        description:
            "Building type-safe applications with TypeScript to improve code quality and developer experience.",
        icon: "📝",
        color: "bg-blue-600",
    },
];

export default function HorizontalScrollingSections() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);
    const sectionsRef = useRef<HTMLDivElement>(null);
    const { isVisibleMobile } = useResize();
    // useEffect(() => {
    //     const ctx = gsap.context(() => {
    //         const sections = gsap.utils.toArray<HTMLElement>(".experience-box");

    //         const totalWidth = sections.reduce((width, section) => width + section.offsetWidth + 40, 0);

    //         // Horizontal scroll
    //         gsap.to(sectionsRef.current, {
    //             x: () => -(totalWidth - window.innerWidth + 100),
    //             ease: "none",
    //             scrollTrigger: {
    //                 trigger: triggerRef.current,
    //                 pin: true,
    //                 start: "center center",
    //                 end: () => `+=${totalWidth}`,
    //                 scrub: 0.5,
    //                 invalidateOnRefresh: true,
    //             },
    //         });

    //         // Appear animation per box
    //         sections.forEach((box, index) => {
    //             gsap.fromTo(
    //                 box,
    //                 { y: 50, opacity: 0 },
    //                 {
    //                     y: 0,
    //                     opacity: 1,
    //                     duration: 0.6,
    //                     delay: index * 0.1,
    //                     ease: "power2.out",
    //                     scrollTrigger: {
    //                         trigger: box,
    //                         start: "top bottom-=100",
    //                         toggleActions: "play none none reverse",
    //                     },
    //                 }
    //             );

    //             // Hover animation
    //             box.addEventListener("mouseenter", () => {
    //                 gsap.to(box, {
    //                     scale: 1.05,
    //                     duration: 0.3,
    //                     ease: "power2.out",
    //                 });
    //             });

    //             box.addEventListener("mouseleave", () => {
    //                 gsap.to(box, {
    //                     scale: 1,
    //                     duration: 0.3,
    //                     ease: "power2.out",
    //                 });
    //             });
    //         });
    //     });

    //     return () => ctx.revert();
    // }, []);

    // useEffect(() => {
    //     const ctx = gsap.context(() => {
    //         const sections = gsap.utils.toArray<HTMLElement>(".experience-box");
    //         const totalWidth = sections.reduce((width, section) => width + section.offsetWidth + 40, 0);

    //         gsap.to(sectionsRef.current, {
    //             x: () => -(totalWidth - window.innerWidth + 100),
    //             ease: "none",
    //             scrollTrigger: {
    //                 trigger: triggerRef.current,
    //                 pin: true,
    //                 start: "center center",
    //                 end: () => `+=${totalWidth}`,
    //                 scrub: 0.5,
    //                 invalidateOnRefresh: true,
    //             },
    //         });

    //         sections.forEach((box, index) => {
    //             const icon = box.querySelector("div.absolute");

    //             // Appear animation
    //             gsap.fromTo(
    //                 box,
    //                 { y: 50, opacity: 0 },
    //                 {
    //                     y: 0,
    //                     opacity: 1,
    //                     duration: 0.6,
    //                     delay: index * 0.1,
    //                     ease: "power2.out",
    //                     scrollTrigger: {
    //                         trigger: box,
    //                         start: "left center",
    //                         toggleActions: "play none none reverse",
    //                     },
    //                 }
    //             );

    //             // Parallax icon
    //             if (icon) {
    //                 gsap.to(icon, {
    //                     yPercent: 30,
    //                     ease: "none",
    //                     scrollTrigger: {
    //                         trigger: box,
    //                         start: "left center",
    //                         end: "right center",
    //                         scrub: true,
    //                     },
    //                 });

    //                 // Pulse icon
    //                 gsap.to(icon, {
    //                     scale: 1.08,
    //                     repeat: -1,
    //                     yoyo: true,
    //                     ease: "sine.inOut",
    //                     duration: 2.5,
    //                 });
    //             }

    //             // Hover and glow effects
    //             box.addEventListener("mousemove", (e) => {
    //                 const rect = box.getBoundingClientRect();
    //                 const x = e.clientX - rect.left;
    //                 const y = e.clientY - rect.top;
    //                 const centerX = rect.width / 2;
    //                 const centerY = rect.height / 2;
    //                 const deltaX = (x - centerX) / centerX;
    //                 const deltaY = (y - centerY) / centerY;

    //                 gsap.to(box, {
    //                     rotateY: deltaX * 10,
    //                     rotateX: -deltaY * 10,
    //                     duration: 0.3,
    //                     ease: "power2.out",
    //                 });

    //                 box.style.setProperty("--mouse-x", `${x}px`);
    //                 box.style.setProperty("--mouse-y", `${y}px`);
    //             });

    //             box.addEventListener("mouseenter", () => {
    //                 gsap.to(box, {
    //                     scale: 1.05,
    //                     boxShadow: "0px 20px 40px rgba(0, 0, 0, 0.4)",
    //                     duration: 0.3,
    //                     ease: "power2.out",
    //                 });
    //             });

    //             box.addEventListener("mouseleave", () => {
    //                 gsap.to(box, {
    //                     scale: 1,
    //                     rotateX: 0,
    //                     rotateY: 0,
    //                     boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
    //                     duration: 0.3,
    //                     ease: "power2.out",
    //                 });
    //             });
    //         });
    //     });

    //     return () => {
    //         ctx.revert();
    //         ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    //     };
    // }, []);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const boxes = gsap.utils.toArray<HTMLElement>(".experience-box");
            const totalWidth = boxes.reduce((acc, box) => acc + box.offsetWidth + 40, 0);
            const container = sectionsRef.current;

            if (!container) return;
            const containerWidth = container.scrollWidth;
            const screenWidth = window.innerWidth;
            const scrollDistance = containerWidth - screenWidth / 2 - 185; // 200 ~ nửa width 1 box

            // Horizontal scroll
            gsap.to(sectionsRef.current, {
                // x: -scrollDistance,
                x: () => -(totalWidth - window.innerWidth + 100),
                ease: "none",
                scrollTrigger: {
                    trigger: triggerRef.current,
                    pin: true,
                    start: isVisibleMobile ? "top center" : "center center",
                    end: () => `+=${totalWidth}`,
                    scrub: 0.5,
                    invalidateOnRefresh: true,
                },
            });

            // Cinematic animation
            boxes.forEach((box, i) => {
                const icon = box.querySelector(".experience-icon");
                const lines = box.querySelectorAll(".experience-line");

                // Initial cinematic entrance
                gsap.from(box, {
                    opacity: 0,
                    scale: 0.8,
                    skewY: 10,
                    y: 100,
                    duration: 1,
                    delay: i * 0.15,
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: box,
                        start: "left center",
                        toggleActions: "play none none reverse",
                    },
                });

                // Text lines slide up stagger
                gsap.from(lines, {
                    y: 40,
                    opacity: 0,
                    stagger: 0.1,
                    duration: 0.6,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: box,
                        start: "left center+=100",
                    },
                });

                // Icon depth
                if (icon) {
                    gsap.fromTo(
                        icon,
                        { scale: 0.7, opacity: 0 },
                        {
                            scale: 1,
                            opacity: 0.15,
                            ease: "power3.out",
                            duration: 1.5,
                            delay: 0.3,
                            scrollTrigger: {
                                trigger: box,
                                start: "left center",
                            },
                        }
                    );
                }

                // Hover magnetic
                box.addEventListener("mousemove", (e) => {
                    const rect = box.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    const dx = (x - rect.width / 2) / rect.width;
                    const dy = (y - rect.height / 2) / rect.height;

                    gsap.to(box, {
                        rotateX: -dy * 10,
                        rotateY: dx * 10,
                        scale: 1.03,
                        duration: 0.3,
                        ease: "power2.out",
                    });
                });

                box.addEventListener("mouseleave", () => {
                    gsap.to(box, {
                        rotateX: 0,
                        rotateY: 0,
                        scale: 1,
                        duration: 0.3,
                        ease: "power2.out",
                    });
                });
            });
        });

        return () => {
            ctx.revert();
            ScrollTrigger.getAll().forEach((t) => t.kill());
        };
    }, []);

    return (
        <div className="relative  overflow-hidden dark:bg-black bg-white dark:text-gray-200">
            {/* Horizontal scrolling section */}
            <div ref={sectionRef} className="relative overflow-hidden">
                <div ref={triggerRef} className="h-screen">
                    <div
                        ref={sectionsRef}
                        className="flex items-start gap-10 px-4 md:px-8 absolute top-1/2 -translate-y-1/2"
                    >
                        {experiences.map((exp) => (
                            <div
                                key={exp.id}
                                className={`experience-box flex-shrink-0 md:w-[400px] w-[390px] h-[400px] md:h-[500px] rounded-2xl p-8 shadow-xl ${exp.color} text-white overflow-hidden relative`}
                            >
                                <div className="relative z-10 h-full flex flex-col">
                                    <div className="experience-icon absolute -right-8 -top-8 text-9xl pointer-events-none">
                                        {exp.icon}
                                    </div>
                                    <div className="experience-line text-5xl mb-4">{exp.icon}</div>
                                    <div className="experience-line text-2xl md:text-3xl font-bold mb-2">
                                        {exp.title}
                                    </div>
                                    <div className="experience-line text-base font-semibold inline-block px-3 py-1 backdrop-blur-md bg-white/20 rounded-full mb-4">
                                        {exp.years}
                                    </div>
                                    <p className="experience-line text-base text-white/90">{exp.description}</p>
                                </div>

                                {/* <div className="absolute -right-8 -top-8 text-9xl opacity-10">{exp.icon}</div>
                                <div className="relative z-10 h-full flex flex-col">
                                    <div className="text-5xl mb-4">{exp.icon}</div>
                                    <h3 className="text-2xl md:text-3xl font-bold mb-2">{exp.title}</h3>
                                    <div className="text-lg font-semibold mb-4 inline-block px-3 py-1 bg-white/20 rounded-full">
                                        {exp.years}
                                    </div>
                                    <p className="text-lg mt-auto">{exp.description}</p>
                                </div> */}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
