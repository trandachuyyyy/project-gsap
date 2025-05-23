import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import TootipCustom from "@/components/tooltip/TootipCustom";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { handleScroll } from "@/hooks/useHandleScroll";

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

const SpiralScrollCards = () => {
    const containerRef = useRef<any>(null);
    const cardRefs = useRef<HTMLDivElement[]>([]);
    const [branches, setBranches] = useState<{ x1: number; y1: number; x2: number; y2: number }[]>([]);
    const [sectionHeight, setSectionHeight] = useState(0);

    useEffect(() => {
        const cards = cardRefs.current;
        const radius = 450;
        const angleStep = 45; // 👈 Chỉnh chỗ này để luôn xoắn rõ ràng
        const verticalStep = 200;

        const updateCards = (progress: number) => {
            const newBranches: { x1: number; y1: number; x2: number; y2: number }[] = [];

            const sectionRect = containerRef.current.parentNode.getBoundingClientRect();
            const sectionTopInViewport = sectionRect.top;

            cards.forEach((card, i) => {
                const currentIndex = i - progress * cards.length;
                const angle = currentIndex * angleStep;
                const rad = (angle * Math.PI) / 180;

                const y = currentIndex * verticalStep;
                const x = Math.sin(rad) * radius;
                const z = Math.cos(rad) * radius;
                const rotationY = angle - 5;
                // const rotationY = -angle;

                gsap.set(card, {
                    x,
                    y,
                    z,
                    rotationY,
                    transformOrigin: "center center",
                    transformPerspective: 1500,
                    opacity: Math.abs(currentIndex) < 10 ? 1 : 0,
                });

                const rect = card.getBoundingClientRect();
                const cardX = rect.left + rect.width / 2;
                const cardY = rect.top + rect.height / 2 - sectionTopInViewport;
                const centerX = window.innerWidth / 2;

                newBranches.push({ x1: centerX, y1: cardY, x2: cardX, y2: cardY });
            });

            setBranches(newBranches);
        };

        ScrollTrigger.create({
            trigger: containerRef.current,
            start: "top top",
            end: `+=${cards.length * verticalStep}`,
            scrub: true,
            onUpdate: (self) => {
                updateCards(self.progress);
            },
        });

        const totalHeight = cards.length * verticalStep + window.innerHeight;
        setSectionHeight(totalHeight);

        updateCards(0);
    }, []);

    return (
        <div className="py-16 bg-gradient-to-br dark:from-gray-950 from-gray-100 dark:to-black to-white">
            <div className="relative z-10 mx-auto text-center px-6 mb-8">
                <h1 className="text-4xl font-extrabold uppercase tracking-wider dark:text-white text-black">
                    My Featured Projects
                </h1>
            </div>
            <div style={{ height: `${sectionHeight}px` }} className={` relative`}>
                {/* SVG Layer */}
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: `${sectionHeight}px`,
                        pointerEvents: "none",
                        zIndex: 0,
                    }}
                >
                    <svg style={{ width: "100%", height: "100%" }}>
                        <line
                            x1={window.innerWidth / 2}
                            y1={0}
                            x2={window.innerWidth / 2}
                            y2={sectionHeight}
                            stroke="red"
                            strokeWidth="2"
                        />
                        {branches.map((line, idx) => (
                            <line
                                key={idx}
                                x1={line.x1}
                                y1={line.y1}
                                x2={line.x2}
                                y2={line.y2}
                                stroke="red"
                                strokeWidth="1.5"
                            />
                        ))}
                    </svg>
                </div>

                {/* 3D Card Container */}
                <div
                    ref={containerRef}
                    style={{ transformStyle: "preserve-3d" }}
                    className="mx-auto sticky top-0 left-1/2 -translate-x-1/2 w-[500px] h-[600px]"
                >
                    {projects.map((project, i) => (
                        <div
                            key={i}
                            style={{ transformStyle: "preserve-3d" }}
                            ref={(el: any) => (cardRefs.current[i] = el)}
                            className="spiral-card absolute mt-[25vh] w-full flex items-center justify-center h-auto"
                        >
                            <div className="group w-[300px] h-full relative dark:bg-gray-900 bg-white overflow-hidden rounded-xl shadow-xl transition-transform duration-500 hover:-translate-y-2">
                                <div className="relative h-36 overflow-hidden  p-4">
                                    <Image
                                        src={project.image}
                                        width={800}
                                        height={600}
                                        alt={project.name}
                                        className="h-full w-full object-contain transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t dark:from-black from-gray-400 via-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-40" />
                                    <div className="absolute bottom-3 left-3 flex flex-wrap gap-1">
                                        {project.tech.map((tech) => (
                                            <span
                                                key={tech}
                                                className="rounded dark:bg-black/70 bg-white/70 px-2 py-1 text-xs dark:text-white text-black shadow"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div className="px-4 py-1">
                                    <h3 className="text-lg font-semibold dark:text-white text-black">{project.name}</h3>
                                    <p className="text-sm dark:text-gray-400 text-gray-600">{project.date}</p>
                                    <TootipCustom
                                        trigger={
                                            project.url ? (
                                                <a
                                                    href={project.url}
                                                    target="_blank"
                                                    className="inline-block select-none text-sm font-medium text-blue-500 transition-colors hover:text-blue-400"
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
                                                                        This project is currently private and not
                                                                        publicly accessible. To view details, please
                                                                        request access from the project administrator.
                                                                    </p>
                                                                </div>
                                                            ),

                                                            variant: "destructive",
                                                            action: (
                                                                <Button
                                                                    variant="outline"
                                                                    size="sm"
                                                                    className="mt-2 border-red-500 text-red-500 hover:bg-red-50 dark:text-white dark:bg-black/30"
                                                                    onClick={() => handleScroll("ss-home")}
                                                                >
                                                                    Contact Admin
                                                                </Button>
                                                            ),
                                                            className: "border-red-500",
                                                            duration: 5000,
                                                        });
                                                    }}
                                                    className="cursor-pointer  select-none inline-block text-sm font-medium text-red-500 transition-colors hover:text-red-400"
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
                            {/* <div className="w-[300px] relative h-full bg-black border rounded-lg shadow-lg overflow-hidden">
                            <Image
                                src="/profile/chil.jpg"
                                alt={`Card ${i}`}
                                width={800}
                                height={600}
                                className="size-full object-cover"
                            />
                            <div className="absolute bottom-2 left-2 text-white font-bold text-xl drop-shadow-lg">
                                Card {i + 1}
                            </div>
                        </div> */}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SpiralScrollCards;
