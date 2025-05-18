"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Canvas } from "@react-three/fiber";
import { Float, Text, OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei";
import { Briefcase, GraduationCap, Award, Star } from "lucide-react";

export default function ExperienceTimeline() {
    const timelineRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        // Track mouse position for parallax effects
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({
                x: (e.clientX / window.innerWidth - 0.5) * 2,
                y: (e.clientY / window.innerHeight - 0.5) * 2,
            });
        };

        window.addEventListener("mousemove", handleMouseMove);

        // Animate heading with text reveal effect
        const headingText = headingRef.current?.textContent || "";
        if (headingRef.current) {
            headingRef.current.innerHTML = "";
            headingText.split("").forEach((char, index) => {
                const charSpan = document.createElement("span");
                charSpan.textContent = char === " " ? "\u00A0" : char;
                charSpan.style.opacity = "0";
                charSpan.style.display = "inline-block";
                charSpan.style.transform = "translateY(50px)";
                headingRef.current?.appendChild(charSpan);

                gsap.to(charSpan, {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: "power3.out",
                    delay: 0.05 * index,
                });
            });
        }

        // Animate timeline items with staggered effect
        const timelineItems = timelineRef.current?.querySelectorAll(".timeline-item");

        timelineItems?.forEach((item, index) => {
            // Animate the main container
            gsap.fromTo(
                item,
                {
                    opacity: 0,
                    y: 50,
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: item,
                        start: "top 85%",
                        end: "bottom 20%",
                        toggleActions: "play none none reverse",
                    },
                }
            );

            // Animate the content box with a slight delay
            const contentBox = item.querySelector(".content-box");
            gsap.fromTo(
                contentBox,
                {
                    opacity: 0,
                    scale: 0.9,
                    x: index % 2 === 0 ? -50 : 50,
                },
                {
                    opacity: 1,
                    scale: 1,
                    x: 0,
                    duration: 1.2,
                    ease: "elastic.out(1, 0.8)",
                    scrollTrigger: {
                        trigger: item,
                        start: "top 85%",
                        end: "bottom 20%",
                        toggleActions: "play none none reverse",
                    },
                    delay: 0.2,
                }
            );

            // Animate the node with a bounce effect
            const node = item.querySelector(".timeline-node");
            gsap.fromTo(
                node,
                {
                    scale: 0,
                    opacity: 0,
                },
                {
                    scale: 1,
                    opacity: 1,
                    duration: 0.6,
                    ease: "back.out(2)",
                    scrollTrigger: {
                        trigger: item,
                        start: "top 85%",
                        end: "bottom 20%",
                        toggleActions: "play none none reverse",
                    },
                }
            );
        });

        // Animate timeline line with gradient effect
        gsap.fromTo(
            ".timeline-line",
            { height: 0 },
            {
                height: "100%",
                duration: 2,
                ease: "power2.inOut",
                scrollTrigger: {
                    trigger: timelineRef.current,
                    start: "top 80%",
                    end: "bottom 20%",
                    scrub: 1,
                },
            }
        );

        // Animate skills section
        gsap.fromTo(
            ".skills-heading",
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".skills-section",
                    start: "top 80%",
                    toggleActions: "play none none reverse",
                },
            }
        );

        // Animate skills underline
        gsap.fromTo(
            ".skills-underline",
            { width: 0 },
            {
                width: "100%",
                duration: 1.5,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: ".skills-section",
                    start: "top 80%",
                    toggleActions: "play none none reverse",
                },
                delay: 0.3,
            }
        );

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, []);

    return (
        <section className="py-20 relative overflow-hidden dark:bg-black bg-black/10 dark:text-white text-black">
            {/* Animated background elements */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div
                    className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-white blur-3xl"
                    style={{
                        transform: `translate(${mousePosition.x * -20}px, ${mousePosition.y * -20}px)`,
                        transition: "transform 0.3s ease-out",
                    }}
                ></div>
                <div
                    className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-white blur-3xl"
                    style={{
                        transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`,
                        transition: "transform 0.3s ease-out",
                    }}
                ></div>
                <div
                    className="absolute top-1/2 right-1/3 w-72 h-72 rounded-full bg-white blur-3xl"
                    style={{
                        transform: `translate(${mousePosition.x * 15}px, ${mousePosition.y * 15}px)`,
                        transition: "transform 0.3s ease-out",
                    }}
                ></div>
            </div>

            {/* 3D Background */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                <Canvas camera={{ position: [0, 0, 5] }}>
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} intensity={1.5} />

                    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
                        <mesh position={[-5, -2, -2]} rotation={[0, 0, Math.PI / 4]}>
                            <boxGeometry args={[1.5, 1.5, 1.5]} />
                            <meshStandardMaterial color="#ffffff" wireframe />
                        </mesh>
                    </Float>

                    <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.3}>
                        <mesh position={[5, 2, -3]}>
                            <torusGeometry args={[1.2, 0.3, 16, 100]} />
                            <meshStandardMaterial color="#ffffff" wireframe />
                        </mesh>
                    </Float>

                    <Float speed={1} rotationIntensity={0.4} floatIntensity={0.4}>
                        <mesh position={[4, -3, -1]}>
                            <octahedronGeometry args={[1]} />
                            <meshStandardMaterial color="#ffffff" wireframe />
                        </mesh>
                    </Float>

                    <Float speed={1.3} rotationIntensity={0.6} floatIntensity={0.6}>
                        <mesh position={[-4, 3, -2]}>
                            <tetrahedronGeometry args={[1]} />
                            <meshStandardMaterial color="#ffffff" wireframe />
                        </mesh>
                    </Float>

                    <Float speed={0.8} rotationIntensity={0.2} floatIntensity={0.2}>
                        <mesh position={[0, -4, -3]}>
                            <dodecahedronGeometry args={[1]} />
                            <meshStandardMaterial color="#ffffff" wireframe />
                        </mesh>
                    </Float>
                </Canvas>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-5xl mx-auto">
                    <h2 ref={headingRef} className="text-center mb-20 text-4xl font-extrabold uppercase tracking-wider">
                        My Professional
                    </h2>

                    <div ref={timelineRef} className="relative max-w-4xl mx-auto">
                        {/* Timeline center line with animated gradient */}
                        <div className="timeline-line absolute left-1/2 top-0 w-0.5 bg-white h-full transform -translate-x-1/2 rounded-full"></div>

                        {/* Timeline items */}
                        <div className="timeline-item flex flex-col md:flex-row mb-24 relative">
                            <div className="md:w-1/2 md:pr-16 md:text-right">
                                <div className="content-box bg-black/60 backdrop-blur-lg p-6 rounded-xl shadow-[0_0_15px_rgba(255,255,255,0.1)] transform transition-all duration-500 hover:shadow-[0_0_25px_rgba(255,255,255,0.2)] hover:-translate-y-1 border border-white/10">
                                    <div className="flex items-center justify-end mb-3">
                                        <span className="text-white mr-2 font-medium">2019 - 2022</span>
                                        <GraduationCap className="text-white h-5 w-5" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-2 text-white">College Education</h3>
                                    <p className="text-gray-400">
                                        Studied Website Design with a focus on user experience (UX), interface
                                        design,and front-end development.
                                    </p>
                                    <div className="mt-4 flex flex-wrap justify-end gap-2">
                                        <span className="px-2 py-1 bg-white/5 rounded-full text-xs text-white border border-white/10">
                                            Website Design
                                        </span>
                                        <span className="px-2 py-1 bg-white/5 rounded-full text-xs text-white border border-white/10">
                                            Web Development
                                        </span>
                                        <span className="px-2 py-1 bg-white/5 rounded-full text-xs text-white border border-white/10">
                                            UI/UX
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="timeline-node absolute left-1/2 top-6 w-12 h-12 rounded-full bg-black backdrop-blur-lg border-2 border-white transform -translate-x-1/2 flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                                <GraduationCap className="text-white h-5 w-5" />
                            </div>
                            <div className="md:w-1/2 md:pl-16 mt-12 md:mt-0"></div>
                        </div>

                        <div className="timeline-item flex flex-col md:flex-row mb-24 relative">
                            <div className="md:w-1/2 md:pr-16"></div>
                            <div className="timeline-node absolute left-1/2 top-6 w-12 h-12 rounded-full bg-black backdrop-blur-lg border-2 border-white transform -translate-x-1/2 flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                                <Briefcase className="text-white h-5 w-5" />
                            </div>
                            <div className="md:w-1/2 md:pl-16 mt-12 md:mt-0">
                                <div className="content-box bg-black/60 backdrop-blur-lg p-6 rounded-xl shadow-[0_0_15px_rgba(255,255,255,0.1)] transform transition-all duration-500 hover:shadow-[0_0_25px_rgba(255,255,255,0.2)] hover:-translate-y-1 border border-white/10">
                                    <div className="flex items-center mb-3">
                                        <Briefcase className="text-white mr-2 h-5 w-5" />
                                        <span className="text-white font-medium">{`Early 2023 – Mid 2023`}</span>
                                    </div>
                                    <h3 className="text-xl font-bold mb-2 text-white">Fresher Website Designer</h3>
                                    <p className="text-gray-400">
                                        Began my career focusing on website design, working with modern tools to create
                                        user-friendly and visually engaging web interfaces. Gained hands-on experience
                                        with layout design, responsive styling, and UI/UX principles.
                                    </p>
                                    <div className="mt-4 flex flex-wrap gap-2">
                                        <span className="px-2 py-1 bg-white/5 rounded-full text-xs text-white border border-white/10">
                                            HTML5/CSS3
                                        </span>
                                        <span className="px-2 py-1 bg-white/5 rounded-full text-xs text-white border border-white/10">
                                            Tailwind CSS
                                        </span>
                                        <span className="px-2 py-1 bg-white/5 rounded-full text-xs text-white border border-white/10">
                                            Js/Ts
                                        </span>
                                        <span className="px-2 py-1 bg-white/5 rounded-full text-xs text-white border border-white/10">
                                            React
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="timeline-item flex flex-col md:flex-row mb-24 relative">
                            <div className="md:w-1/2 md:pr-16 md:text-right">
                                <div className="content-box bg-black/60 backdrop-blur-lg p-6 rounded-xl shadow-[0_0_15px_rgba(255,255,255,0.1)] transform transition-all duration-500 hover:shadow-[0_0_25px_rgba(255,255,255,0.2)] hover:-translate-y-1 border border-white/10">
                                    <div className="flex items-center justify-end mb-3">
                                        <span className="text-white mr-2 font-medium">{`Mid 2023 – 2024`}</span>
                                        <Briefcase className="text-white h-5 w-5" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-2 text-white">Junior Developer</h3>
                                    <p className="text-gray-400">
                                        Began working professionally as a junior developer, contributing to frontend
                                        features using React and improving UI components. Collaborated with senior
                                        developers and gained experience in responsive design and state management.
                                    </p>
                                    <div className="mt-4 flex flex-wrap justify-end gap-2">
                                        <span className="px-2 py-1 bg-white/5 rounded-full text-xs text-white border border-white/10">
                                            React/Next.js
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="timeline-node absolute left-1/2 top-6 w-12 h-12 rounded-full bg-black backdrop-blur-lg border-2 border-white transform -translate-x-1/2 flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                                <Briefcase className="text-white h-5 w-5" />
                            </div>
                            <div className="md:w-1/2 md:pl-16 mt-12 md:mt-0"></div>
                        </div>

                        <div className="timeline-item flex flex-col md:flex-row relative">
                            <div className="md:w-1/2 md:pr-16"></div>
                            <div className="timeline-node absolute left-1/2 top-6 w-12 h-12 rounded-full bg-black backdrop-blur-lg border-2 border-white transform -translate-x-1/2 flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                                <Award className="text-white h-5 w-5" />
                            </div>
                            <div className="md:w-1/2 md:pl-16 mt-12 md:mt-0">
                                <div className="content-box bg-black/60 backdrop-blur-lg p-6 rounded-xl shadow-[0_0_15px_rgba(255,255,255,0.1)] transform transition-all duration-500 hover:shadow-[0_0_25px_rgba(255,255,255,0.2)] hover:-translate-y-1 border border-white/10">
                                    <div className="flex items-center mb-3">
                                        <Award className="text-white mr-2 h-5 w-5" />
                                        <span className="text-white font-medium">Late 2024 – Present</span>
                                    </div>
                                    <h3 className="text-xl font-bold mb-2 text-white">Middle Developer</h3>
                                    <p className="text-gray-400">
                                        Currently working as a middle developer, contributing to interactive web
                                        experiences using Three.js and GSAP. Focused on building scalable and visually
                                        engaging applications with Next.js and Tailwind CSS.
                                    </p>
                                    <div className="mt-4 flex flex-wrap gap-2">
                                        <span className="px-2 py-1 bg-white/5 rounded-full text-xs text-white border border-white/10">
                                            NextJs
                                        </span>
                                        <span className="px-2 py-1 bg-white/10 rounded-full text-xs text-white border border-white/10">
                                            GSAP (basic)
                                        </span>
                                        <span className="px-2 py-1 bg-white/10 rounded-full text-xs text-white border border-white/10">
                                            ThreeJs (exploring)
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 3D Skills Section with enhanced visuals */}
                    {/* <div className="skills-section mt-40 text-center relative">
                        <div className="relative inline-block">
                            <h3 className="skills-heading text-4xl font-bold mb-2 inline-block relative text-white">
                                Core Technologies
                            </h3>
                            <span className="skills-underline absolute -bottom-2 left-0 w-full h-1 bg-white rounded-full"></span>
                        </div>

                        <div className="h-80 w-full mt-16 relative">
                            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 flex flex-col gap-6 w-full max-w-md z-10 bg-black/80 backdrop-blur-md p-6 rounded-xl border border-white/10">
                                <div className="flex justify-between items-center">
                                    <span className="text-white font-medium">Next.js</span>
                                    <div className="flex">
                                        <Star className="w-5 h-5 fill-white text-white" />
                                        <Star className="w-5 h-5 fill-white text-white" />
                                        <Star className="w-5 h-5 fill-white text-white" />
                                        <Star className="w-5 h-5 fill-white text-white" />
                                        <Star className="w-5 h-5 fill-white text-white" />
                                    </div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-white font-medium">Three.js</span>
                                    <div className="flex">
                                        <Star className="w-5 h-5 fill-white text-white" />
                                        <Star className="w-5 h-5 fill-white text-white" />
                                        <Star className="w-5 h-5 fill-white text-white" />
                                        <Star className="w-5 h-5 fill-white text-white" />
                                        <Star className="w-5 h-5 text-gray-600" />
                                    </div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-white font-medium">GSAP</span>
                                    <div className="flex">
                                        <Star className="w-5 h-5 fill-white text-white" />
                                        <Star className="w-5 h-5 fill-white text-white" />
                                        <Star className="w-5 h-5 fill-white text-white" />
                                        <Star className="w-5 h-5 fill-white text-white" />
                                        <Star className="w-5 h-5 fill-white text-white" />
                                    </div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-white font-medium">Tailwind CSS</span>
                                    <div className="flex">
                                        <Star className="w-5 h-5 fill-white text-white" />
                                        <Star className="w-5 h-5 fill-white text-white" />
                                        <Star className="w-5 h-5 fill-white text-white" />
                                        <Star className="w-5 h-5 fill-white text-white" />
                                        <Star className="w-5 h-5 fill-white text-white" />
                                    </div>
                                </div>
                            </div>

                            <Canvas camera={{ position: [0, 0, 5] }}>
                                <ambientLight intensity={0.5} />
                                <pointLight position={[10, 10, 10]} intensity={1.5} />

                                <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.6}>
                                    <Text
                                        fontSize={0.8}
                                        position={[-3.5, 2, 0]}
                                        color="#ffffff"
                                        font="/fonts/inter-bold.woff"
                                    >
                                        GSAP
                                    </Text>
                                    <Sphere args={[0.3, 16, 16]} position={[-3.5, 2, -0.5]}>
                                        <MeshDistortMaterial color="#ffffff" speed={2} distort={0.3} />
                                    </Sphere>
                                </Float>

                                <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.4}>
                                    <Text
                                        fontSize={0.8}
                                        position={[0, -1.5, 0]}
                                        color="#ffffff"
                                        font="/fonts/inter-bold.woff"
                                    >
                                        Next.js
                                    </Text>
                                    <Sphere args={[0.3, 16, 16]} position={[0, -1.5, -0.5]}>
                                        <MeshDistortMaterial color="#ffffff" speed={2} distort={0.3} />
                                    </Sphere>
                                </Float>

                                <Float speed={1.8} rotationIntensity={0.5} floatIntensity={0.5}>
                                    <Text
                                        fontSize={0.8}
                                        position={[3, 1.8, 0]}
                                        color="#ffffff"
                                        font="/fonts/inter-bold.woff"
                                    >
                                        Three.js
                                    </Text>
                                    <Sphere args={[0.3, 16, 16]} position={[3, 1.8, -0.5]}>
                                        <MeshDistortMaterial color="#ffffff" speed={2} distort={0.3} />
                                    </Sphere>
                                </Float>

                                <Float speed={1.3} rotationIntensity={0.4} floatIntensity={0.5}>
                                    <Text
                                        fontSize={0.8}
                                        position={[-2, -2, 0]}
                                        color="#ffffff"
                                        font="/fonts/inter-bold.woff"
                                    >
                                        Tailwind
                                    </Text>
                                    <Sphere args={[0.3, 16, 16]} position={[-2, -2, -0.5]}>
                                        <MeshDistortMaterial color="#ffffff" speed={2} distort={0.3} />
                                    </Sphere>
                                </Float>

                                <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
                            </Canvas>
                        </div>
                    </div> */}
                </div>
            </div>
        </section>
    );
}
