"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import { handleScroll } from "@/hooks/useHandleScroll";
import CodeProfile from "./small/CodeProfile";
import ShimmerButton from "./small/ShimmerButton";
import AnimatedBadgeView, { AnimatedBadge } from "./small/AnimatedBadge";
import { CodeIcon } from "lucide-react";
import TypewriterText from "./small/TypewriterText";
import NexusOrbSup from "./small/NexusOrbSup";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const SesionHome = ({ className }: { className?: string }) => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const textBlockRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (typeof window == "undefined") return;
        // const lenis = new Lenis({ duration: 1.2, easing: (t) => t });
        // / Tạo Lenis như bạn đang làm
        const lenis = new Lenis({ duration: 1.2, easing: (t) => t });

        ScrollTrigger.scrollerProxy(document.body, {
            scrollTop(value) {
                return value !== undefined ? lenis.scrollTo(value, { immediate: true }) : window.scrollY;
            },
            getBoundingClientRect() {
                return {
                    top: 0,
                    left: 0,
                    width: window.innerWidth,
                    height: window.innerHeight,
                };
            },
            pinType: document.body.style.transform ? "transform" : "fixed",
        });

        function raf(time: number) {
            lenis.raf(time);
            ScrollTrigger.update();
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        const ctx = gsap.context(() => {
            // Title animation
            gsap.fromTo(
                ".hero-word",
                {
                    opacity: 0,
                    scale: 0.6,
                    y: 30,
                    rotateX: 90,
                },
                {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    rotateX: 0,
                    stagger: 0.2,
                    duration: 1.1,
                    ease: "back.out(1.7)",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 85%",
                        toggleActions: "play none none reverse",
                        invalidateOnRefresh: true,
                    },
                }
            );

            // Avatar scale-in
            gsap.fromTo(
                imageRef.current,
                {
                    scale: 0.7,
                    opacity: 0,
                    rotate: -10,
                },
                {
                    scale: 1,
                    opacity: 1,
                    rotate: 0,
                    duration: 1.6,
                    ease: "elastic.out(1, 0.5)",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 90%",
                        toggleActions: "play none none reverse",
                        invalidateOnRefresh: true,
                    },
                }
            );

            // Text animation
            gsap.fromTo(
                ".text-animate > *",
                {
                    opacity: 0,
                    y: 30,
                    filter: "blur(4px)",
                },
                {
                    opacity: 1,
                    y: 0,
                    filter: "blur(0)",
                    stagger: 0.2,
                    duration: 1.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                        toggleActions: "play none none reverse",
                        invalidateOnRefresh: true,
                    },
                }
            );
        }, sectionRef);

        // Tilt avatar on hover
        const handleMouseMove = (e: MouseEvent) => {
            const rect = imageRef.current!.getBoundingClientRect();
            const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
            const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
            gsap.to(imageRef.current, {
                rotateY: x * 10,
                rotateX: -y * 10,
                duration: 0.3,
                ease: "power2.out",
            });
        };

        const resetTilt = () => {
            gsap.to(imageRef.current, {
                rotateX: 0,
                rotateY: 0,
                duration: 0.5,
                ease: "power2.out",
            });
        };

        imageRef.current?.addEventListener("mousemove", handleMouseMove);
        imageRef.current?.addEventListener("mouseleave", resetTilt);

        // // Canvas particle effect
        // const canvas = canvasRef.current!;
        // const ctxCanvas = canvas.getContext("2d")!;
        // const image = imageRef.current!;
        // let rect = image.getBoundingClientRect();
        // canvas.width = rect.width;
        // canvas.height = rect.height;

        // const particles: any[] = [];
        // let mouseX = rect.width / 2;
        // let mouseY = rect.height / 2;

        // function createParticle() {
        //     const angle = Math.random() * Math.PI * 2;
        //     const radius = Math.random() * rect.width * 0.3;
        //     particles.push({
        //         x: rect.width / 2 + Math.cos(angle) * radius,
        //         y: rect.height / 2 + Math.sin(angle) * radius,
        //         size: Math.random() * 2 + 1,
        //         speedX: Math.cos(angle) * 1.2,
        //         speedY: Math.sin(angle) * 1.2,
        //         life: 1,
        //     });
        // }

        // function updateParticles() {
        //     ctxCanvas.clearRect(0, 0, canvas.width, canvas.height);
        //     for (let i = particles.length - 1; i >= 0; i--) {
        //         const p = particles[i];
        //         p.x += p.speedX + (mouseX - p.x) * 0.015;
        //         p.y += p.speedY + (mouseY - p.y) * 0.015;
        //         p.life -= 0.015;

        //         ctxCanvas.beginPath();
        //         ctxCanvas.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        //         ctxCanvas.fillStyle = `rgba(255,255,255,${p.life})`;
        //         ctxCanvas.fill();

        //         if (p.life <= 0) particles.splice(i, 1);
        //     }
        //     if (Math.random() > 0.5) createParticle();
        //     requestAnimationFrame(updateParticles);
        // }

        // updateParticles();

        // const handleMouse = (e: MouseEvent) => {
        //     const r = image.getBoundingClientRect();
        //     mouseX = e.clientX - r.left;
        //     mouseY = e.clientY - r.top;
        // };

        // image.addEventListener("mousemove", handleMouse);
        // window.addEventListener("resize", () => {
        //     rect = image.getBoundingClientRect();
        //     canvas.width = rect.width;
        //     canvas.height = rect.height;
        // });

        return () => {
            lenis.destroy();
            ctx.revert();
            ScrollTrigger.getAll().forEach((t) => t.kill());
            // image.removeEventListener("mousemove", handleMouse);
            // image.removeEventListener("mousemove", handleMouseMove);
            // image.removeEventListener("mouseleave", resetTilt);
        };
    }, []);

    useEffect(() => {
        const style = document.createElement("style");
        style.innerHTML = `
      @keyframes blob {
        0% { transform: translate(0px, 0px) scale(1); }
        33% { transform: translate(30px, -50px) scale(1.1); }
        66% { transform: translate(-20px, 20px) scale(0.9); }
        100% { transform: translate(0px, 0px) scale(1); }
      }
      @keyframes wave {
        0%, 60%, 100% { transform: rotate(0deg); }
        10%, 30% { transform: rotate(14deg); }
        20% { transform: rotate(-8deg); }
        40% { transform: rotate(-4deg); }
        50% { transform: rotate(10deg); }
      }
      .animate-blob {
        animation: blob 7s infinite;
      }
      .animation-delay-2000 {
        animation-delay: 2s;
      }
      .animation-delay-4000 {
        animation-delay: 4s;
      }
      .animate-wave {
        transform-origin: 70% 70%;
        display: inline-block;
        animation: wave 2.5s infinite;
      }
    `;
        document.head.appendChild(style);
        return () => {
            document.head.removeChild(style);
        };
    }, []);

    const title = "Hi, I'm Huy Tran";

    return (
        <div
            ref={sectionRef}
            id="ss-home"
            className={`relative w-full min-h-[98vh] h-full dark:bg-black bg-white dark:text-white  text-black ${className}`}
        >
            {/* Backgrounds */}
            <div className="absolute inset-0 bg-gradient-to-br dark:from-zinc-900 from-zinc-100 via-white dark:via-black dark:to-zinc-900 to-zinc-100 opacity-80" />
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]" />

            {/* Floating Dots */}
            <div className="absolute inset-0 pointer-events-none z-0">
                {[...Array(40)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-white/10 rounded-full animate-ping"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            animationDuration: `${2 + Math.random() * 3}s`,
                            animationDelay: `${Math.random()}s`,
                        }}
                    />
                ))}
            </div>

            {/* Main Content Grid */}
            <div className="relative h-full min-h-[98vh] z-10 grid lg:grid-cols-2 grid-cols-1 items-center max-w-7xl mx-auto py-24 xl:px-6 gap-12">
                {/* Left Avatar + Glow */}
                <div className="  flex flex-col items-center lg:items-start gap-6">
                    <div className=" no-cursor relative w-[150px] h-[150px] group perspective-1000">
                        <div className="absolute inset-0 flex items-center justify-center z-0">
                            <div className="w-[320px] h-[320px] border-2 border-dashed border-white/10 rounded-full animate-spin-slow blur-md" />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/10 rounded-full blur-xl z-0 group-hover:scale-105 transition-transform duration-500" />
                        <Image
                            ref={imageRef}
                            src="/profile/huy.jpg"
                            alt="Huy Tran"
                            width={400}
                            height={400}
                            className="w-full h-full object-cover rounded-full z-10 relative shadow-2xl transition-transform duration-500 group-hover:scale-105"
                        />

                        <div className="absolute top-0 left-0 w-full h-full rounded-full bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-10 transition-all duration-500" />
                        <canvas
                            ref={canvasRef}
                            className="absolute top-0 left-0 w-full h-full z-20 pointer-events-none"
                        />
                    </div>
                    {/* <p className="dark:text-white/60 text-black/60 text-center lg:text-left text-sm font-light max-w-[280px]">
                        Elevating frontend experience with pixel-perfect design & cinematic motion 🎥
                    </p> */}
                    <div className=" text-animate text-center lg:text-left" ref={textBlockRef}>
                        <h1 className="text-3xl lg:text-5xl font-bold uppercase tracking-wide flex flex-wrap justify-center lg:justify-start gap-2">
                            {/* {title.split(" ").map((word, i) => (
                                <span key={i} className="hero-word inline-block">
                                    {word}
                                </span>
                            ))} */}
                            <TypewriterText pauseDuration={4000} text={title} speed={80} deleteSpeed={50} />
                            <div className=" text-4xl animate-wave z-[10]">
                                <span>👋</span>
                            </div>
                        </h1>
                        <p className="mt-4 dark:text-white/70 text-black/70 text-sm lg:text-base font-light">
                            Frontend Developer · Creative Coder · Motion Enthusiast
                        </p>
                        <p className="mt-6 text-lg lg:text-xl dark:text-white/90 text-black/90 font-light leading-relaxed">
                            I build delightful digital experiences with performance, motion and style in mind. Let’s
                            create something magical together.
                        </p>
                        <div className="mt-6 flex gap-4 flex-wrap justify-center lg:justify-start">
                            {/* <button
                                onClick={() => {
                                    window.open("https://www.facebook.com/trandachuyy", "_blank");
                                }}
                                className=" magnetic relative group px-6 py-2 
                             dark:bg-white/10 border dark:border-white/20 border-black/20 dark:hover:bg-white/20 hover:bg-black/20 dark:hover:border-white/40 hover:border-black/40 rounded-full dark:text-white text-black font-medium transition-all duration-300 overflow-hidden"
                            >
                                <span className="relative z-10">Contact Me</span>
                                <span className="absolute inset-0 bg-gradient-to-r dark:from-white/10 dark:via-white/20 dark:to-white/10 from-black/10 via-black/20 to-black/10 opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500" />
                            </button> */}
                            <ShimmerButton
                                title="Contact Me"
                                onClick={() => {
                                    window.open("https://www.facebook.com/trandachuyy", "_blank");
                                }}
                            />
                            <AnimatedBadgeView
                                icon={<CodeIcon />}
                                title="View Projects"
                                onClick={() => handleScroll("ss-project")}
                            />

                            {/* <button
                                onClick={() => handleScroll("ss-project")}
                                className=" magnetic px-6 py-2 border dark:border-white/20 border-black/20 dark:hover:border-white/40 hover:border-black/40 rounded-full dark:text-white text-black font-medium transition-all duration-300"
                            >
                                View Projects
                            </button> */}
                        </div>
                    </div>
                </div>

                {/* Right Content */}

                <CodeProfile />
            </div>

            {/* Line */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent dark:via-white via-black to-transparent animate-pulse" />
        </div>
    );
};

export default SesionHome;
