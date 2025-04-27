// // 'use client'

// // import { useEffect, useRef } from 'react'
// // import gsap from 'gsap'
// // import { ScrollTrigger } from 'gsap/ScrollTrigger'

// // gsap.registerPlugin(ScrollTrigger)

// // const SesionSkills = ({ className }: { className?: string }) => {
// //     const sectionRef = useRef<HTMLDivElement>(null)
// //     const titleRef = useRef<HTMLHeadingElement>(null)
// //     const containerRef = useRef<HTMLDivElement>(null)
// //     const skillRefs = useRef<Array<HTMLDivElement | null>>([])
// //     const lineRef = useRef<HTMLDivElement>(null)

// //     const skills = [
// //         'React', 'Nextjs', 'Tailwindcss', 'Shadcn Ui',
// //         'Ant Design', 'Javascript', 'Typescript', 'Zustand',
// //         'React Query', 'D3Js', 'PusherJs', 'WebSocket', 'HTML', 'CSS', 'Sass', 'Github'
// //     ]

// //     useEffect(() => {
// //         // Title animation
// //         gsap.fromTo(
// //             titleRef.current,
// //             { opacity: 0, scale: 0.95 },
// //             {
// //                 opacity: 1,
// //                 scale: 1,
// //                 duration: 1,
// //                 ease: 'power2.out',
// //                 scrollTrigger: {
// //                     trigger: titleRef.current,
// //                     start: 'top bottom-=120',
// //                     toggleActions: 'play none none reverse',
// //                 },
// //             }
// //         )

// //         // Container animation
// //         gsap.fromTo(
// //             containerRef.current,
// //             { opacity: 0, y: 60 },
// //             {
// //                 opacity: 1,
// //                 y: 0,
// //                 duration: 1,
// //                 ease: 'power2.out',
// //                 scrollTrigger: {
// //                     trigger: containerRef.current,
// //                     start: 'top bottom-=80',
// //                     toggleActions: 'play none none reverse',
// //                 },
// //             }
// //         )

// //         // Skill box animations – show early
// //         skillRefs.current.forEach((box) => {
// //             if (!box) return
// //             gsap.fromTo(
// //                 box,
// //                 { opacity: 0, y: 30 },
// //                 {
// //                     opacity: 1,
// //                     y: 0,
// //                     duration: 0.5,
// //                     ease: 'power2.out',
// //                     scrollTrigger: {
// //                         trigger: box,
// //                         start: 'top bottom+=60', // 👈 Trigger sớm hơn
// //                         toggleActions: 'play none none reverse',
// //                     },
// //                 }
// //             )

// //             // Hover tilt effect
// //             box.addEventListener('mousemove', (e) => {
// //                 const rect = box.getBoundingClientRect()
// //                 const x = e.clientX - rect.left - rect.width / 2
// //                 const y = e.clientY - rect.top - rect.height / 2
// //                 gsap.to(box, {
// //                     x: x * 0.02,
// //                     y: y * 0.02,
// //                     rotateX: -y * 0.05,
// //                     rotateY: x * 0.05,
// //                     duration: 0.3,
// //                 })
// //             })

// //             box.addEventListener('mouseleave', () => {
// //                 gsap.to(box, {
// //                     x: 0,
// //                     y: 0,
// //                     rotateX: 0,
// //                     rotateY: 0,
// //                     duration: 0.4,
// //                     ease: 'power2.out',
// //                 })
// //             })
// //         })

// //         // Line animation
// //         gsap.fromTo(
// //             lineRef.current,
// //             { scaleX: 0 },
// //             {
// //                 scaleX: 1,
// //                 transformOrigin: 'left',
// //                 duration: 1.5,
// //                 ease: 'power2.out',
// //                 scrollTrigger: {
// //                     trigger: sectionRef.current,
// //                     start: 'top bottom-=100',
// //                     toggleActions: 'play none none reverse',
// //                 },
// //             }
// //         )
// //     }, [])

// //     return (
// //         <div
// //             ref={sectionRef}
// //             id="ss-skills"
// //             className={`relative min-h-screen py-24 bg-black text-white overflow-hidden ${className}`}
// //         >
// //             {/* Background match About section */}
// //             <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-black to-zinc-900 opacity-80 pointer-events-none" />
// //             <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02] pointer-events-none" />

// //             {/* Title */}
// //             <div className="relative z-10 max-w-6xl mx-auto text-center px-6">
// //                 <h1
// //                     ref={titleRef}
// //                     className="text-4xl font-extrabold uppercase tracking-wider"
// //                 >
// //                     Skills
// //                 </h1>
// //             </div>

// //             {/* Skills Grid */}
// //             <div
// //                 ref={containerRef}
// //                 className="mt-20 relative z-10 max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6"
// //             >
// //                 {skills.map((skill, index) => (
// //                     <div
// //                         key={index}
// //                         ref={(el: any) => (skillRefs.current[index] = el)}
// //                         className="min-h-[100px] flex items-center justify-center p-4 bg-white/5 border border-white/10 rounded-lg hover:border-white/30 hover:bg-white/10 hover:shadow-lg transition-all duration-300 text-white/90 text-base font-light cursor-default text-center backdrop-blur-sm"
// //                     >
// //                         {skill}
// //                     </div>
// //                 ))}
// //             </div>

// //             {/* Bottom line like About */}
// //             <div
// //                 ref={lineRef}
// //                 className="mt-20 h-1 max-w-4xl mx-auto bg-gradient-to-r from-transparent via-white to-transparent scale-x-0"
// //             />
// //         </div>
// //     )
// // }

// // export default SesionSkills

"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SesionSkills = ({ className }: { className?: string }) => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const skillRefs = useRef<Array<HTMLDivElement | null>>([]);
    const lineRef = useRef<HTMLDivElement>(null);

    const skills = [
        "React",
        "Nextjs",
        "Tailwindcss",
        "Shadcn Ui",
        "Ant Design",
        "Javascript",
        "Typescript",
        "Zustand",
        "React Query",
        "D3Js",
        "PusherJs",
        "WebSocket",
        "HTML",
        "CSS",
        "Sass",
        "Github",
    ];

    useEffect(() => {
        // Title animation
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
                    start: "top bottom-=120",
                    toggleActions: "play none none reverse",
                },
            }
        );

        // Container animation
        gsap.fromTo(
            containerRef.current,
            { opacity: 0, y: 60 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top bottom-=80",
                    toggleActions: "play none none reverse",
                },
            }
        );

        // Skill box animations
        skillRefs.current.forEach((box, index) => {
            if (!box) return;

            // Initial animation khi mount
            gsap.fromTo(
                box,
                { opacity: 0, scale: 0.8, y: 20 },
                {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    duration: 1.5,
                    delay: index * 0.1,
                    ease: "power2.out",
                    onComplete: () => {
                        // Infinity animation: lên xuống
                        gsap.to(box, {
                            y: -10,
                            duration: 1.5,
                            ease: "sine.inOut",
                            repeat: -1,
                            yoyo: true,
                            delay: index * 0.2,
                        });

                        // Infinity animation: sáng border
                        gsap.to(box, {
                            borderColor: "rgba(255,255,255,0.5)", // Sáng lên
                            boxShadow: "0 0 10px rgba(255,255,255,0.3)", // Thêm glow
                            duration: 1.5,
                            ease: "power1.inOut",
                            repeat: -1,
                            yoyo: true,
                            delay: index * 0.3, // Lệch pha với animation lên xuống
                        });
                    },
                }
            );

            // Scroll animation
            gsap.fromTo(
                box,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: box,
                        start: "top bottom+=60",
                        toggleActions: "play none none reverse",
                    },
                }
            );

            // Hover tilt effect
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

        // Line animation
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
                    start: "top bottom-=100",
                    toggleActions: "play none none reverse",
                },
            }
        );

        // Cleanup event listeners
        return () => {
            skillRefs.current.forEach((box) => {
                if (box) {
                    box.removeEventListener("mousemove", () => {});
                    box.removeEventListener("mouseleave", () => {});
                }
            });
        };
    }, []);

    return (
        <div
            ref={sectionRef}
            id="ss-skills"
            className={`relative min-h-screen py-24 bg-black text-white overflow-hidden ${className}`}
        >
            {/* Background match About section */}
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-black to-zinc-900 opacity-80 pointer-events-none" />

            {/* Title */}
            <div className="relative z-10 max-w-6xl mx-auto text-center px-6">
                <h1 ref={titleRef} className="text-4xl font-extrabold uppercase tracking-wider">
                    Skills
                </h1>
            </div>

            {/* Skills Grid */}
            <div
                ref={containerRef}
                className="mt-20 relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6"
            >
                {skills.map((skill, index) => (
                    <div
                        key={index}
                        ref={(el: any) => (skillRefs.current[index] = el)}
                        className="min-h-[120px] flex items-center justify-center p-4 bg-white/5 border border-white/10 rounded-lg hover:border-white/30 hover:bg-white/10 hover:shadow-lg transition-all duration-300 text-white/90 text-lg font-light cursor-default text-center backdrop-blur-sm"
                    >
                        {skill}
                    </div>
                ))}
            </div>

            {/* Bottom line like About */}
            <div
                ref={lineRef}
                className="mt-20 h-1 max-w-4xl mx-auto bg-gradient-to-r from-transparent via-white to-transparent scale-x-0"
            />
        </div>
    );
};

export default SesionSkills;
