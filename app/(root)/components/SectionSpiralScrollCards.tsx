// "use client";
// import TootipCustom from "@/components/tooltip/TootipCustom";
// import { Button } from "@/components/ui/button";
// import { toast } from "@/hooks/use-toast";
// import { handleScroll } from "@/hooks/useHandleScroll";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import Image from "next/image";
// import { useEffect, useRef, useState } from "react";

// if (typeof window !== "undefined") {
//     gsap.registerPlugin(ScrollTrigger);
// }

// const projects = [
//     {
//         name: "FMRP",
//         url: "",
//         // url: 'https://hub.fmrp.vn/auth/login',
//         image: "/project/logo/fmrp.png",
//         tech: ["ReactJs", "NextJS", "React query", "Tailwinds", "Ant-Design/Plots", "D3Js", "Redux", "Firebase"],
//         date: "02/2023 - 04/2025",
//     },
//     {
//         name: "Zenmi-Ticket",
//         url: "",
//         // url: 'https://ticket.erpzenmi.com/',
//         image: "/project/logo/zenmi.svg",
//         tech: ["ReactJS", "NextJS", "React query", "Zustand", "Tailwind CSS", "Shadcn UI", "WebSocket"],
//         date: "02/2025 - 03/2025",
//     },
//     {
//         name: "SMB",
//         url: "https://smbgold.io/",
//         image: "/project/logo/smb.png",
//         tech: ["ReactJs", "NextJs", "React query", "Zustand", "Tailwinds", "Shadcn UI", "D3Js", "PusherJs"],
//         date: "11/2024 - 01/2025",
//     },
//     {
//         name: "CAMBOQUICK",
//         url: "https://beta.camboquick.com/",
//         image: "/project/logo/camboqick.png",
//         tech: ["ReactJs", "NextJs", "React query", "Zustand", "Tailwinds", "Shadcn UI", "PusherJs"],
//         date: "11/2024 - 01/2025",
//     },
//     {
//         name: "AFFISO",
//         url: "",
//         // url: 'https://affiso.net/',
//         image: "/project/logo/affiso.png",
//         tech: ["ReactJs", "NextJS", "React query", "Zustand", "Tailwinds", "Meshsdk", "PusherJS", "WebSocket"],
//         date: "12/2024 - 02/2025",
//     },
//     {
//         name: "VIETHUNGAUTO",
//         url: "https://sunfil1.com/",
//         image: "/project/logo/viethung.webp",
//         tech: ["ReactJs", "NextJs", "React query", "Zustand", "Tailwinds", "Shadcn UI"],
//         date: "09/2024 - 03/2025",
//     },
//     {
//         name: "DATQUANGCHULAI",
//         url: "https://datquangchulai.com/",
//         image: "/project/logo/datquangchulai.png",
//         tech: ["ReactJs", "NextJs", "React query", "Zustand", "Tailwinds", "Shadcn UI"],
//         date: "12/2024 - 12/2024",
//     },

//     {
//         name: "ECOSPACE",
//         url: "https://ecospace.com.vn/",
//         image: "/project/logo/ecospace.png",
//         tech: ["ReactJs", "NextJs", "React query", "Zustand", "Tailwinds", "Shadcn UI", "PusherJS"],
//         date: "07/2024 - 10/2024",
//     },
//     {
//         name: "HYPERSPACE",
//         url: "https://hyperspace-orcin.vercel.app/",
//         image: "/project/logo/hyperspace.svg",
//         tech: ["ReactJs", "NextJs", "React query", "Zustand", "Tailwinds", "Shadcn UI", "PusherJS"],
//         date: "07/2024 - 10/2024",
//     },
//     {
//         name: "HAIAU",
//         url: "https://www.haiaucorp.com/",
//         image: "/project/logo/haiau.png",
//         tech: ["ReactJs", "NextJs", "React query", "Zustand", "Tailwinds", "Shadcn UI"],
//         date: "06/2024 - 12/2024",
//     },
//     {
//         name: "KANOW",
//         url: "https://kanow.vn/",
//         image: "/project/logo/kanow.ico",
//         tech: ["ReactJs", "NextJs", "Zustand", "Tailwinds", "Shadcn UI", "PusherJs", "Map4D"],
//         date: "02/2024 - 06/2024",
//     },
//     {
//         name: "LIULAB",
//         url: "https://liulab.edu.vn",
//         image: "/project/logo/liulab.png",
//         tech: ["ReactJs", "NextJs", "Zustand", "Tailwinds", "Radix UI", "D3Js"],
//         date: "11/2023 - 01/2024",
//     },
//     {
//         name: "MONY-SIMPLE",
//         url: "",
//         // url: 'https://simple.mony.com.vn',
//         image: "/project/logo/mony.png",
//         tech: ["ReactJs", "NextJs", "Zustand", "React query", "Tailwinds", "Shadcn UI", "PusherJs", "ChartJs"],
//         date: "11/2023 - 01/2024",
//     },
//     {
//         name: "MONY-CLIENT",
//         url: "https://mony-client.vercel.app/",
//         image: "/project/logo/mony.png",
//         tech: ["ReactJs", "NextJs", "Zustand", "React query", "Tailwinds", "Shadcn UI", "Highcharts"],
//         date: "10/2023",
//     },
// ];

// const SpiralScrollCards = () => {
//     const containerRef = useRef<any>(null);
//     const cardRefs = useRef<HTMLDivElement[]>([]);
//     const [branches, setBranches] = useState<{ x1: number; y1: number; x2: number; y2: number }[]>([]);
//     const [sectionHeight, setSectionHeight] = useState(0);

//     useEffect(() => {
//         const cards = cardRefs.current;
//         const radius = 450;
//         const angleStep = 45; // 👈 Chỉnh chỗ này để luôn xoắn rõ ràng
//         const verticalStep = 200;

//         const updateCards = (progress: number) => {
//             const newBranches: { x1: number; y1: number; x2: number; y2: number }[] = [];

//             const sectionRect = containerRef.current?.parentNode?.getBoundingClientRect();
//             const sectionTopInViewport = sectionRect?.top;

//             cards.forEach((card, i) => {
//                 const currentIndex = i - progress * cards.length;
//                 const angle = currentIndex * angleStep;
//                 const rad = (angle * Math.PI) / 180;

//                 const y = currentIndex * verticalStep;
//                 const x = Math.sin(rad) * radius;
//                 const z = Math.cos(rad) * radius;
//                 const rotationY = angle - 5;
//                 // const rotationY = -angle;

//                 gsap.set(card, {
//                     x,
//                     y,
//                     z,
//                     rotationY,
//                     transformOrigin: "center center",
//                     transformPerspective: 1500,
//                     opacity: Math.abs(currentIndex) < 10 ? 1 : 0,
//                 });

//                 const rect = card.getBoundingClientRect();
//                 const cardX = rect.left + rect.width / 2;
//                 const cardY = rect.top + rect.height / 2 - sectionTopInViewport;
//                 const centerX = window.innerWidth / 2;

//                 newBranches.push({ x1: centerX, y1: cardY, x2: cardX, y2: cardY });
//             });

//             setBranches(newBranches);
//         };

//         ScrollTrigger.create({
//             trigger: containerRef.current,
//             start: "top top",
//             end: `+=${cards.length * verticalStep}`,
//             scrub: true,
//             onUpdate: (self) => {
//                 updateCards(self.progress);
//             },
//         });

//         const totalHeight = cards.length * verticalStep + window.innerHeight;
//         setSectionHeight(totalHeight);

//         updateCards(0);
//         return () => {
//             ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
//         };
//     }, []);

//     return (
//         <div
//             className=""
//             // id="ss-project"
//             //  className="bg-gradient-to-br dark:from-gray-950 from-gray-100 dark:to-black to-white"
//         >
//             <div className="relative z-10 mx-auto text-center px-6 mb-8">
//                 <h1 className="text-4xl font-extrabold uppercase tracking-wider dark:text-white text-black">
//                     My Featured Projects
//                 </h1>
//             </div>
//             <div style={{ height: `${sectionHeight}px` }} className={` relative`}>
//                 {/* SVG Layer */}
//                 <div
//                     style={{
//                         position: "absolute",
//                         top: 0,
//                         left: 0,
//                         width: "100%",
//                         height: `${sectionHeight}px`,
//                         pointerEvents: "none",
//                         zIndex: 0,
//                     }}
//                 >
//                     <svg style={{ width: "100%", height: "100%" }}>
//                         {typeof window !== "undefined" && (
//                             <line
//                                 x1={window.innerWidth / 2}
//                                 y1={0}
//                                 x2={window.innerWidth / 2}
//                                 y2={sectionHeight}
//                                 stroke="white"
//                                 strokeWidth="2"
//                             />
//                         )}

//                         <polyline
//                             fill="none"
//                             stroke="white"
//                             strokeWidth="2"
//                             points={branches
//                                 .map((line) => `${line.x2},${line.y2}`) // dùng x2, y2 là vị trí của card
//                                 .join(" ")}
//                         />

//                         {branches.map((line, idx) => (
//                             <line
//                                 key={idx}
//                                 x1={line.x1}
//                                 y1={line.y1}
//                                 x2={line.x2}
//                                 y2={line.y2}
//                                 stroke="white"
//                                 strokeWidth="1.5"
//                             />
//                         ))}
//                     </svg>
//                 </div>

//                 {/* 3D Card Container */}
//                 <div
//                     ref={containerRef}
//                     style={{ transformStyle: "preserve-3d" }}
//                     className="mx-auto sticky top-0 left-1/2 -translate-x-1/2 w-[500px] px-4 sm:px-6 md:px-0 h-[600px]"
//                     // className="mx-auto sticky top-0 left-1/2 -translate-x-1/2 w-[500px] h-[600px]"
//                 >
//                     {projects.map((project, i) => (
//                         <div
//                             key={i}
//                             style={{ transformStyle: "preserve-3d" }}
//                             ref={(el: any) => (cardRefs.current[i] = el)}
//                             className="spiral-card absolute mt-[25vh] w-full flex items-center justify-center h-auto"
//                         >
//                             <div className="group w-[300px] h-full relative dark:bg-gray-900 bg-white overflow-hidden rounded-xl shadow-xl transition-transform duration-500 hover:-translate-y-2">
//                                 <div className="relative h-36 overflow-hidden  p-4">
//                                     <Image
//                                         src={project.image}
//                                         width={800}
//                                         height={600}
//                                         alt={project.name}
//                                         className="h-full w-full object-contain transition-transform duration-700 group-hover:scale-110"
//                                     />
//                                     <div className="absolute inset-0 bg-gradient-to-t dark:from-black from-gray-400 via-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-40" />
//                                     <div className="absolute bottom-3 left-3 flex flex-wrap gap-1">
//                                         {project.tech.map((tech) => (
//                                             <span
//                                                 key={tech}
//                                                 className="rounded dark:bg-black/70 bg-white/70 px-2 py-1 text-xs dark:text-white text-black shadow"
//                                             >
//                                                 {tech}
//                                             </span>
//                                         ))}
//                                     </div>
//                                 </div>
//                                 <div className="px-4 py-1">
//                                     <h3 className="text-lg font-semibold dark:text-white text-black">{project.name}</h3>
//                                     <p className="text-sm dark:text-gray-400 text-gray-600">{project.date}</p>
//                                     <TootipCustom
//                                         trigger={
//                                             project.url ? (
//                                                 <a
//                                                     href={project.url}
//                                                     target="_blank"
//                                                     className="inline-block select-none text-sm font-medium text-blue-500 transition-colors hover:text-blue-400"
//                                                 >
//                                                     View Details →
//                                                 </a>
//                                             ) : (
//                                                 <div
//                                                     onClick={() => {
//                                                         toast({
//                                                             title: "🔒 Project Access Restricted",
//                                                             description: (
//                                                                 <div className="mt-2 flex flex-col gap-2">
//                                                                     <p className="text-sm text-white">
//                                                                         This project is currently private and not
//                                                                         publicly accessible. To view details, please
//                                                                         request access from the project administrator.
//                                                                     </p>
//                                                                 </div>
//                                                             ),

//                                                             variant: "destructive",
//                                                             action: (
//                                                                 <Button
//                                                                     variant="outline"
//                                                                     size="sm"
//                                                                     className="mt-2 border-red-500 text-red-500 hover:bg-red-50 dark:text-white dark:bg-black/30"
//                                                                     onClick={() => handleScroll("ss-home")}
//                                                                 >
//                                                                     Contact Admin
//                                                                 </Button>
//                                                             ),
//                                                             className: "border-red-500",
//                                                             duration: 5000,
//                                                         });
//                                                     }}
//                                                     className="cursor-pointer  select-none inline-block text-sm font-medium text-red-500 transition-colors hover:text-red-400"
//                                                 >
//                                                     View Details →
//                                                 </div>
//                                             )
//                                         }
//                                     >
//                                         <p className="">
//                                             {project.url ? "Click to view details" : "🔒 Project Access Restricted"}
//                                         </p>
//                                     </TootipCustom>
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default SpiralScrollCards;

"use client";
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
    const sectionRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const cardRefs = useRef<HTMLDivElement[]>([]);
    const [branches, setBranches] = useState<{ x1: number; y1: number; x2: number; y2: number }[]>([]);
    const [axisEnd, setAxisEnd] = useState(0);

    useEffect(() => {
        const cards = cardRefs.current;
        const section = sectionRef.current;
        const container = containerRef.current;

        if (!cards.length || !section || !container) return;

        const radius = 450;
        const angleStep = 45;
        const verticalStep = 200;
        // const totalScrollDistance = cards.length * verticalStep + window.innerHeight * 2;
        //
        const totalScrollDistance = cards.length * verticalStep;

        const updateCards = (progress: number) => {
            const newBranches: { x1: number; y1: number; x2: number; y2: number }[] = [];
            const sectionRect = container.getBoundingClientRect();
            const sectionTopInViewport = sectionRect.top;
            let maxVisibleY = 0;

            cards.forEach((card, i) => {
                const currentIndex = i - progress * cards.length;
                const angle = currentIndex * angleStep;
                const rad = (angle * Math.PI) / 180;

                const y = currentIndex * verticalStep;
                const x = Math.sin(rad) * radius;
                const z = Math.cos(rad) * radius;
                const rotationY = angle;

                const visible = Math.abs(currentIndex) < 10;

                gsap.set(card, {
                    x,
                    y,
                    z,
                    rotationY,
                    transformOrigin: "center center",
                    transformPerspective: 1500,
                    opacity: visible ? 1 : 0,
                });

                const rect = card.getBoundingClientRect();
                const cardX = rect.left + rect.width / 2;
                const cardY = rect.top + rect.height / 2 - sectionTopInViewport;
                const centerX = window.innerWidth / 2;

                newBranches.push({ x1: centerX, y1: cardY, x2: cardX, y2: cardY });

                if (visible) {
                    maxVisibleY = Math.max(maxVisibleY, cardY);
                }
            });

            setBranches(newBranches);
            setAxisEnd(maxVisibleY);
        };

        const trigger = ScrollTrigger.create({
            trigger: section,
            start: "top top",
            end: `+=${totalScrollDistance}`,
            pin: true,
            pinSpacing: true,
            scrub: 1,
            onUpdate: (self) => updateCards(self.progress),
        });

        updateCards(0);

        return () => {
            trigger.kill();
            ScrollTrigger.getAll().forEach((t) => t.kill());
        };
    }, []);

    const totalScrollDistance = projects.length * 200 + window.innerHeight * 2;

    return (
        <div ref={sectionRef} className="relative">
            {/* Header */}
            <div className="text-center py-10">
                <h1 className="text-4xl font-bold uppercase tracking-wider dark:text-white text-black">
                    My Featured Projects
                </h1>
            </div>

            {/* Main Container */}
            <div
                // style={{ height: `${totalScrollDistance}px` }}
                className="relative "
            >
                {/* SVG Axis */}
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
                    <svg className="w-full h-full">
                        <line
                            x1={window.innerWidth / 2}
                            y1={0}
                            x2={window.innerWidth / 2}
                            y2={axisEnd}
                            stroke="white"
                            strokeWidth="2"
                        />
                        <polyline
                            fill="none"
                            stroke="white"
                            strokeWidth="2"
                            points={branches.map((line) => `${line.x2},${line.y2}`).join(" ")}
                        />
                        {branches.map((line, idx) => (
                            <line
                                key={idx}
                                x1={line.x1}
                                y1={line.y1}
                                x2={line.x2}
                                y2={line.y2}
                                stroke="white"
                                strokeWidth="1.5"
                            />
                        ))}
                    </svg>
                </div>

                {/* Spiral Cards */}
                <div
                    ref={containerRef}
                    className="sticky top-0 mx-auto h-screen w-[500px] px-4"
                    style={{ transformStyle: "preserve-3d" }}
                >
                    {projects.map((project, i) => (
                        <div
                            key={i}
                            ref={(el) => {
                                cardRefs.current[i] = el!;
                            }}
                            className="spiral-card absolute mt-[25vh] w-full flex items-center justify-center h-auto"
                            style={{ transformStyle: "preserve-3d" }}
                        >
                            <div className="group w-[300px] h-full relative dark:bg-gray-900 bg-white overflow-hidden rounded-xl shadow-xl transition-transform duration-500 hover:-translate-y-2">
                                <div className="relative h-36 overflow-hidden p-4">
                                    <Image
                                        src={project.image}
                                        width={800}
                                        height={600}
                                        alt={project.name}
                                        className="h-full w-full object-contain transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t dark:from-black from-gray-400 via-transparent opacity-70 group-hover:opacity-40 transition-opacity duration-500" />
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
                                                    rel="noreferrer"
                                                    className="text-sm font-medium text-blue-500 hover:text-blue-400"
                                                >
                                                    View Details →
                                                </a>
                                            ) : (
                                                <div
                                                    className="cursor-pointer text-sm font-medium text-red-500 hover:text-red-400"
                                                    onClick={() =>
                                                        toast({
                                                            title: "🔒 Project Access Restricted",
                                                            description: (
                                                                <p className="text-sm text-white">
                                                                    This project is private. Contact admin to view.
                                                                </p>
                                                            ),
                                                            variant: "destructive",
                                                            action: (
                                                                <Button
                                                                    variant="outline"
                                                                    size="sm"
                                                                    onClick={() => handleScroll("ss-home")}
                                                                    className="mt-2 border-red-500 text-red-500"
                                                                >
                                                                    Contact Admin
                                                                </Button>
                                                            ),
                                                            className: "border-red-500",
                                                            duration: 5000,
                                                        })
                                                    }
                                                >
                                                    View Details →
                                                </div>
                                            )
                                        }
                                    >
                                        {project.url ? "Click to view details" : "🔒 Private project"}
                                    </TootipCustom>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SpiralScrollCards;

// "use client";
// import TootipCustom from "@/components/tooltip/TootipCustom";
// import { Button } from "@/components/ui/button";
// import { toast } from "@/hooks/use-toast";
// import { handleScroll } from "@/hooks/useHandleScroll";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import Image from "next/image";
// import { useEffect, useRef, useState } from "react";

// if (typeof window !== "undefined") {
//     gsap.registerPlugin(ScrollTrigger);
// }

// const projects = [
//     {
//         name: "FMRP",
//         url: "",
//         // url: 'https://hub.fmrp.vn/auth/login',
//         image: "/project/logo/fmrp.png",
//         tech: ["ReactJs", "NextJS", "React query", "Tailwinds", "Ant-Design/Plots", "D3Js", "Redux", "Firebase"],
//         date: "02/2023 - 04/2025",
//     },
//     {
//         name: "Zenmi-Ticket",
//         url: "",
//         // url: 'https://ticket.erpzenmi.com/',
//         image: "/project/logo/zenmi.svg",
//         tech: ["ReactJS", "NextJS", "React query", "Zustand", "Tailwind CSS", "Shadcn UI", "WebSocket"],
//         date: "02/2025 - 03/2025",
//     },
//     {
//         name: "SMB",
//         url: "https://smbgold.io/",
//         image: "/project/logo/smb.png",
//         tech: ["ReactJs", "NextJs", "React query", "Zustand", "Tailwinds", "Shadcn UI", "D3Js", "PusherJs"],
//         date: "11/2024 - 01/2025",
//     },
//     {
//         name: "CAMBOQUICK",
//         url: "https://beta.camboquick.com/",
//         image: "/project/logo/camboqick.png",
//         tech: ["ReactJs", "NextJs", "React query", "Zustand", "Tailwinds", "Shadcn UI", "PusherJs"],
//         date: "11/2024 - 01/2025",
//     },
//     {
//         name: "AFFISO",
//         url: "",
//         // url: 'https://affiso.net/',
//         image: "/project/logo/affiso.png",
//         tech: ["ReactJs", "NextJS", "React query", "Zustand", "Tailwinds", "Meshsdk", "PusherJS", "WebSocket"],
//         date: "12/2024 - 02/2025",
//     },
//     {
//         name: "VIETHUNGAUTO",
//         url: "https://sunfil1.com/",
//         image: "/project/logo/viethung.webp",
//         tech: ["ReactJs", "NextJs", "React query", "Zustand", "Tailwinds", "Shadcn UI"],
//         date: "09/2024 - 03/2025",
//     },
//     {
//         name: "DATQUANGCHULAI",
//         url: "https://datquangchulai.com/",
//         image: "/project/logo/datquangchulai.png",
//         tech: ["ReactJs", "NextJs", "React query", "Zustand", "Tailwinds", "Shadcn UI"],
//         date: "12/2024 - 12/2024",
//     },

//     {
//         name: "ECOSPACE",
//         url: "https://ecospace.com.vn/",
//         image: "/project/logo/ecospace.png",
//         tech: ["ReactJs", "NextJs", "React query", "Zustand", "Tailwinds", "Shadcn UI", "PusherJS"],
//         date: "07/2024 - 10/2024",
//     },
//     {
//         name: "HYPERSPACE",
//         url: "https://hyperspace-orcin.vercel.app/",
//         image: "/project/logo/hyperspace.svg",
//         tech: ["ReactJs", "NextJs", "React query", "Zustand", "Tailwinds", "Shadcn UI", "PusherJS"],
//         date: "07/2024 - 10/2024",
//     },
//     {
//         name: "HAIAU",
//         url: "https://www.haiaucorp.com/",
//         image: "/project/logo/haiau.png",
//         tech: ["ReactJs", "NextJs", "React query", "Zustand", "Tailwinds", "Shadcn UI"],
//         date: "06/2024 - 12/2024",
//     },
//     {
//         name: "KANOW",
//         url: "https://kanow.vn/",
//         image: "/project/logo/kanow.ico",
//         tech: ["ReactJs", "NextJs", "Zustand", "Tailwinds", "Shadcn UI", "PusherJs", "Map4D"],
//         date: "02/2024 - 06/2024",
//     },
//     {
//         name: "LIULAB",
//         url: "https://liulab.edu.vn",
//         image: "/project/logo/liulab.png",
//         tech: ["ReactJs", "NextJs", "Zustand", "Tailwinds", "Radix UI", "D3Js"],
//         date: "11/2023 - 01/2024",
//     },
//     {
//         name: "MONY-SIMPLE",
//         url: "",
//         // url: 'https://simple.mony.com.vn',
//         image: "/project/logo/mony.png",
//         tech: ["ReactJs", "NextJs", "Zustand", "React query", "Tailwinds", "Shadcn UI", "PusherJs", "ChartJs"],
//         date: "11/2023 - 01/2024",
//     },
//     {
//         name: "MONY-CLIENT",
//         url: "https://mony-client.vercel.app/",
//         image: "/project/logo/mony.png",
//         tech: ["ReactJs", "NextJs", "Zustand", "React query", "Tailwinds", "Shadcn UI", "Highcharts"],
//         date: "10/2023",
//     },
// ];

// const SpiralScrollCards = () => {
//     const sectionRef = useRef<HTMLDivElement>(null);
//     const containerRef = useRef<HTMLDivElement>(null);
//     const cardRefs = useRef<HTMLDivElement[]>([]);
//     const [branches, setBranches] = useState<{ x1: number; y1: number; x2: number; y2: number }[]>([]);

//     useEffect(() => {
//         const cards = cardRefs.current;
//         const section = sectionRef.current;
//         const container = containerRef.current;

//         if (!cards.length || !section || !container) return;

//         const radius = 450;
//         const angleStep = 45;
//         const verticalStep = 200;

//         // 👈 Tính toán khoảng cách scroll
//         const totalScrollDistance = cards.length * verticalStep + window.innerHeight * 2;

//         const updateCards = (progress: number) => {
//             const newBranches: { x1: number; y1: number; x2: number; y2: number }[] = [];

//             const sectionRect = containerRef.current?.parentNode?.getBoundingClientRect();
//             const sectionTopInViewport = sectionRect?.top;

//             cards.forEach((card, i) => {
//                 // Logic giống như mẫu gốc
//                 const currentIndex = i - progress * cards.length;
//                 const angle = currentIndex * angleStep;
//                 const rad = (angle * Math.PI) / 180;

//                 const y = currentIndex * verticalStep;
//                 const x = Math.sin(rad) * radius;
//                 const z = Math.cos(rad) * radius;
//                 const rotationY = angle - 5;

//                 gsap.set(card, {
//                     x,
//                     y,
//                     z,
//                     rotationY,
//                     transformOrigin: "center center",
//                     transformPerspective: 1500,
//                     opacity: Math.abs(currentIndex) < 10 ? 1 : 0,
//                 });

//                 const rect = card.getBoundingClientRect();
//                 const cardX = rect.left + rect.width / 2;
//                 const cardY = rect.top + rect.height / 2 - sectionTopInViewport;
//                 const centerX = window.innerWidth / 2;

//                 newBranches.push({ x1: centerX, y1: cardY, x2: cardX, y2: cardY });
//             });

//             setBranches(newBranches);
//         };

//         // 👈 Tạo ScrollTrigger với pin
//         const mainTrigger = ScrollTrigger.create({
//             trigger: section,
//             start: "top top",
//             end: `+=${totalScrollDistance}`,
//             pin: true,
//             pinSpacing: true,
//             scrub: 1,
//             anticipatePin: 1,
//             onUpdate: (self) => {
//                 updateCards(self.progress);
//             },
//             onRefresh: () => {
//                 updateCards(0);
//             },
//         });

//         updateCards(0);

//         return () => {
//             mainTrigger.kill();
//             ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
//         };
//     }, []);

//     const totalScrollDistance = cardRefs.current.length * 200 + window.innerHeight * 2;

//     return (
//         <div ref={sectionRef} className="relative min-h-screen">
//             {/* Header */}
//             <div className="relative z-10 mx-auto text-center px-6 pt-20 pb-8">
//                 <h1 className="text-4xl font-extrabold uppercase tracking-wider dark:text-white text-black">
//                     My Featured Projects
//                 </h1>
//             </div>

//             {/* Main Container */}
//             <div style={{ height: `${totalScrollDistance}px` }} className="relative">
//                 {/* SVG Layer */}
//                 <div
//                     style={{
//                         position: "absolute",
//                         top: 0,
//                         left: 0,
//                         width: "100%",
//                         height: `${totalScrollDistance}px`,
//                         pointerEvents: "none",
//                         zIndex: 0,
//                     }}
//                 >
//                     <svg style={{ width: "100%", height: "100%" }}>
//                         {typeof window !== "undefined" && (
//                             <line
//                                 x1={window.innerWidth / 2}
//                                 y1={0}
//                                 x2={window.innerWidth / 2}
//                                 y2={totalScrollDistance}
//                                 stroke="white"
//                                 strokeWidth="2"
//                             />
//                         )}

//                         <polyline
//                             fill="none"
//                             stroke="white"
//                             strokeWidth="2"
//                             points={branches.map((line) => `${line.x2},${line.y2}`).join(" ")}
//                         />

//                         {branches.map((line, idx) => (
//                             <line
//                                 key={idx}
//                                 x1={line.x1}
//                                 y1={line.y1}
//                                 x2={line.x2}
//                                 y2={line.y2}
//                                 stroke="white"
//                                 strokeWidth="1.5"
//                             />
//                         ))}
//                     </svg>
//                 </div>

//                 {/* 3D Card Container */}
//                 <div
//                     ref={containerRef}
//                     style={{ transformStyle: "preserve-3d" }}
//                     className="mx-auto sticky top-0 left-1/2 -translate-x-1/2 w-[500px] px-4 sm:px-6 md:px-0 h-[600px]"
//                 >
//                     {projects.map((project, i) => (
//                         <div
//                             key={i}
//                             style={{ transformStyle: "preserve-3d" }}
//                             ref={(el: HTMLDivElement | null) => {
//                                 if (el) cardRefs.current[i] = el;
//                             }}
//                             className="spiral-card absolute mt-[25vh] w-full flex items-center justify-center h-auto"
//                         >
//                             <div className="group w-[300px] h-full relative dark:bg-gray-900 bg-white overflow-hidden rounded-xl shadow-xl transition-transform duration-500 hover:-translate-y-2">
//                                 <div className="relative h-36 overflow-hidden p-4">
//                                     <Image
//                                         src={project.image || "/placeholder.svg"}
//                                         width={800}
//                                         height={600}
//                                         alt={project.name}
//                                         className="h-full w-full object-contain transition-transform duration-700 group-hover:scale-110"
//                                     />
//                                     <div className="absolute inset-0 bg-gradient-to-t dark:from-black from-gray-400 via-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-40" />
//                                     <div className="absolute bottom-3 left-3 flex flex-wrap gap-1">
//                                         {project.tech.map((tech) => (
//                                             <span
//                                                 key={tech}
//                                                 className="rounded dark:bg-black/70 bg-white/70 px-2 py-1 text-xs dark:text-white text-black shadow"
//                                             >
//                                                 {tech}
//                                             </span>
//                                         ))}
//                                     </div>
//                                 </div>
//                                 <div className="px-4 py-1">
//                                     <h3 className="text-lg font-semibold dark:text-white text-black">{project.name}</h3>
//                                     <p className="text-sm dark:text-gray-400 text-gray-600">{project.date}</p>
//                                     <TootipCustom
//                                         trigger={
//                                             project.url ? (
//                                                 <a
//                                                     href={project.url}
//                                                     target="_blank"
//                                                     className="inline-block select-none text-sm font-medium text-blue-500 transition-colors hover:text-blue-400"
//                                                     rel="noreferrer"
//                                                 >
//                                                     View Details →
//                                                 </a>
//                                             ) : (
//                                                 <div
//                                                     onClick={() => {
//                                                         toast({
//                                                             title: "🔒 Project Access Restricted",
//                                                             description: (
//                                                                 <div className="mt-2 flex flex-col gap-2">
//                                                                     <p className="text-sm text-white">
//                                                                         This project is currently private and not
//                                                                         publicly accessible. To view details, please
//                                                                         request access from the project administrator.
//                                                                     </p>
//                                                                 </div>
//                                                             ),
//                                                             variant: "destructive",
//                                                             action: (
//                                                                 <Button
//                                                                     variant="outline"
//                                                                     size="sm"
//                                                                     className="mt-2 border-red-500 text-red-500 hover:bg-red-50 dark:text-white dark:bg-black/30 bg-transparent"
//                                                                     onClick={() => handleScroll("ss-home")}
//                                                                 >
//                                                                     Contact Admin
//                                                                 </Button>
//                                                             ),
//                                                             className: "border-red-500",
//                                                             duration: 5000,
//                                                         });
//                                                     }}
//                                                     className="cursor-pointer select-none inline-block text-sm font-medium text-red-500 transition-colors hover:text-red-400"
//                                                 >
//                                                     View Details →
//                                                 </div>
//                                             )
//                                         }
//                                     >
//                                         {project.url ? "Click to view details" : "🔒 Project Access Restricted"}
//                                     </TootipCustom>
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>

//                 {/* Scroll Indicator với Progress */}
//                 <div className="fixed bottom-8 left-1/2 -translate-x-1/2 text-center z-10">
//                     <div className="flex flex-col items-center space-y-4">
//                         {/* Progress Bar */}
//                         <div className="w-32 h-1 bg-white/20 rounded-full overflow-hidden">
//                             <div
//                                 className="h-full bg-white/70 rounded-full transition-all duration-300"
//                                 style={{
//                                     width: `${
//                                         ((cardRefs.current.length -
//                                             Math.abs(
//                                                 cardRefs.current.findIndex((card) => {
//                                                     const rect = card?.getBoundingClientRect();
//                                                     return (
//                                                         rect &&
//                                                         Math.abs(rect.left + rect.width / 2 - window.innerWidth / 2) <
//                                                             50
//                                                     );
//                                                 }) || 0
//                                             )) /
//                                             cardRefs.current.length) *
//                                         100
//                                     }%`,
//                                 }}
//                             />
//                         </div>

//                         {/* Scroll Animation */}
//                         <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
//                             <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-bounce"></div>
//                         </div>

//                         <div className="text-center">
//                             <p className="text-sm dark:text-gray-400 text-gray-600">
//                                 Scroll to explore all {projects.length} projects
//                             </p>
//                             <p className="text-xs dark:text-gray-500 text-gray-500 mt-1">Keep scrolling to continue</p>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default SpiralScrollCards;
