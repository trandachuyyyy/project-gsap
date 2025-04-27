"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { handleScroll } from "@/hooks/useHandleScroll";
import TootipCustom from "@/components/tooltip/TootipCustom";

gsap.registerPlugin(ScrollTrigger);

const projects = [
    {
        name: "FMRP",
        url: "",
        // url: 'https://hub.fmrp.vn/auth/login',
        image: "/project/logo/fmrp.png",
        tech: ["ReactJs", "NextJS", "React query", "Tailwinds", "Ant-Design/Plots", "D3Js", "Redux", "Firebase"],
        date: "02/2023 - 04/2025",
    },
    {
        name: "Zenmi-Ticket",
        url: "",
        // url: 'https://ticket.erpzenmi.com/',
        image: "/project/logo/zenmi.svg",
        tech: ["ReactJS", "NextJS", "React query", "Zustand", "Tailwind CSS", "Shadcn UI", "WebSocket"],
        date: "02/2025 - 03/2025",
    },
    {
        name: "SMB",
        url: "https://smbgold.io/",
        image: "/project/logo/smb.png",
        tech: ["ReactJs", "NextJs", "React query", "Zustand", "Tailwinds", "Shadcn UI", "D3Js", "PusherJs"],
        date: "11/2024 - 01/2025",
    },
    {
        name: "CAMBOQUICK",
        url: "https://beta.camboquick.com/",
        image: "/project/logo/camboqick.png",
        tech: ["ReactJs", "NextJs", "React query", "Zustand", "Tailwinds", "Shadcn UI", "PusherJs"],
        date: "11/2024 - 01/2025",
    },
    {
        name: "AFFISO",
        url: "",
        // url: 'https://affiso.net/',
        image: "/project/logo/affiso.png",
        tech: ["ReactJs", "NextJS", "React query", "Zustand", "Tailwinds", "Meshsdk", "PusherJS", "WebSocket"],
        date: "12/2024 - 02/2025",
    },
    {
        name: "VIETHUNGAUTO",
        url: "https://sunfil1.com/",
        image: "/project/logo/viethung.webp",
        tech: ["ReactJs", "NextJs", "React query", "Zustand", "Tailwinds", "Shadcn UI"],
        date: "09/2024 - 03/2025",
    },
    {
        name: "DATQUANGCHULAI",
        url: "https://datquangchulai.com/",
        image: "/project/logo/datquangchulai.png",
        tech: ["ReactJs", "NextJs", "React query", "Zustand", "Tailwinds", "Shadcn UI"],
        date: "12/2024 - 12/2024",
    },

    {
        name: "ECOSPACE",
        url: "https://ecospace.com.vn/",
        image: "/project/logo/ecospace.png",
        tech: ["ReactJs", "NextJs", "React query", "Zustand", "Tailwinds", "Shadcn UI", "PusherJS"],
        date: "07/2024 - 10/2024",
    },
    {
        name: "HYPERSPACE",
        url: "https://hyperspace-orcin.vercel.app/",
        image: "/project/logo/hyperspace.svg",
        tech: ["ReactJs", "NextJs", "React query", "Zustand", "Tailwinds", "Shadcn UI", "PusherJS"],
        date: "07/2024 - 10/2024",
    },
    {
        name: "HAIAU",
        url: "https://www.haiaucorp.com/",
        image: "/project/logo/haiau.png",
        tech: ["ReactJs", "NextJs", "React query", "Zustand", "Tailwinds", "Shadcn UI"],
        date: "06/2024 - 12/2024",
    },
    {
        name: "KANOW",
        url: "https://kanow.vn/",
        image: "/project/logo/kanow.ico",
        tech: ["ReactJs", "NextJs", "Zustand", "Tailwinds", "Shadcn UI", "PusherJs", "Map4D"],
        date: "02/2024 - 06/2024",
    },
    {
        name: "LIULAB",
        url: "https://liulab.edu.vn",
        image: "/project/logo/liulab.png",
        tech: ["ReactJs", "NextJs", "Zustand", "Tailwinds", "Radix UI", "D3Js"],
        date: "11/2023 - 01/2024",
    },
    {
        name: "MONY-SIMPLE",
        url: "",
        // url: 'https://simple.mony.com.vn',
        image: "/project/logo/mony.png",
        tech: ["ReactJs", "NextJs", "Zustand", "React query", "Tailwinds", "Shadcn UI", "PusherJs", "ChartJs"],
        date: "11/2023 - 01/2024",
    },
    {
        name: "MONY-CLIENT",
        url: "https://mony-client.vercel.app/",
        image: "/project/logo/mony.png",
        tech: ["ReactJs", "NextJs", "Zustand", "React query", "Tailwinds", "Shadcn UI", "Highcharts"],
        date: "10/2023",
    },
];

const SesionProject = ({ className }: { className?: string }) => {
    const projectRefs = useRef<any>([]);
    const titleRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
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
        const ctx = gsap.context(() => {
            projectRefs.current.forEach((el: any, i: number) => {
                gsap.fromTo(
                    el,
                    {
                        opacity: 0,
                        y: 100,
                        scale: 0.9,
                        rotationX: -20,
                    },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        rotationX: 0,
                        ease: "power3.out",
                        duration: 1,
                        scrollTrigger: {
                            trigger: el,
                            start: "top 90%",
                            end: "top 70%",
                            scrub: 1,
                            invalidateOnRefresh: true,
                        },
                    }
                );
            });
        });

        return () => ctx.revert();
    }, []);

    return (
        <section id="ss-project" className={`py-16 bg-gradient-to-br from-gray-950 to-black ${className}`}>
            <div className="container mx-auto px-4 ">
                <div className="relative z-10 mx-auto text-center px-6 mb-8">
                    <h1 ref={titleRef} className="text-4xl font-extrabold uppercase tracking-wider">
                        My Featured Projects
                    </h1>
                </div>
                <div className="grid no-cursor lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8">
                    {projects.map((project, idx) => (
                        <div
                            ref={(el: any) => (projectRefs.current[idx] = el)}
                            key={project.name}
                            className="group relative bg-gray-900 overflow-hidden rounded-xl shadow-xl transition-transform duration-500 hover:-translate-y-2"
                        >
                            <div className="relative h-60 overflow-hidden  p-4">
                                <Image
                                    src={project.image}
                                    width={800}
                                    height={600}
                                    alt={project.name}
                                    className="h-full w-full object-contain transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-40" />
                                <div className="absolute bottom-3 left-3 flex flex-wrap gap-1">
                                    {project.tech.map((tech) => (
                                        <span
                                            key={tech}
                                            className="rounded bg-black/70 px-2 py-1 text-xs text-white shadow"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className="p-4">
                                <h3 className="text-xl font-semibold text-white">{project.name}</h3>
                                <p className="mt-1 text-sm text-gray-400">{project.date}</p>
                                <TootipCustom
                                    trigger={
                                        project.url ? (
                                            <a
                                                href={project.url}
                                                target="_blank"
                                                className="mt-3 inline-block select-none text-sm font-medium text-blue-500 transition-colors hover:text-blue-400"
                                            >
                                                View Details →
                                            </a>
                                        ) : (
                                            <div
                                                onClick={() => {
                                                    toast({
                                                        title: "🔒 Project Access Restricted",
                                                        description: (
                                                            <div className="mt-2 flex flex-col gap-2">
                                                                <p className="text-sm text-white">
                                                                    This project is currently private and not publicly
                                                                    accessible. To view details, please request access
                                                                    from the project administrator.
                                                                </p>
                                                            </div>
                                                        ),

                                                        variant: "destructive",
                                                        action: (
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                className="mt-2 border-red-500 text-red-500 hover:bg-red-50"
                                                                onClick={() => handleScroll("ss-home")}
                                                            >
                                                                Contact Admin
                                                            </Button>
                                                        ),
                                                        className: "border-red-500",
                                                        duration: 5000,
                                                    });
                                                }}
                                                className="mt-3 cursor-pointer  select-none inline-block text-sm font-medium text-red-500 transition-colors hover:text-red-400"
                                            >
                                                View Details →
                                            </div>
                                        )
                                    }
                                >
                                    <p className="">
                                        {project.url ? "Click to view details" : "🔒 Project Access Restricted"}
                                    </p>
                                </TootipCustom>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SesionProject;
