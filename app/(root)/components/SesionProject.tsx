'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import Image from 'next/image'

gsap.registerPlugin(ScrollTrigger)

const projects = [
    {
        name: 'ERP',
        url: 'https://github.com/huytran2000',
        image: '/project/erp.png',
        tech: ['NextJS', 'Tailwind', 'Redux'],
        date: '02/2023 - Present',
    },
    {
        name: 'KANOW',
        url: 'https://github.com/huytran2000',
        image: '/project/kanow.png',
        tech: ['NextJS', 'Tailwind', 'Zustand', 'Shadcn'],
        date: '02/2024 - 05/2024',
    },
    {
        name: 'MONY',
        url: 'https://github.com/huytran2000',
        image: '/project/mony.png',
        tech: ['NextJS', 'Tailwind', 'Zustand'],
        date: '12/2023 - 03/2024',
    },
    {
        name: 'LIULAP',
        url: 'https://github.com/huytran2000',
        image: '/project/liulap.jpg',
        tech: ['NextJS', 'Tailwind', 'RadixUI', 'D3Js'],
        date: '11/2023 - 02/2024',
    },
    {
        name: 'Zen',
        url: 'https://github.com/huytran2000',
        image: '/project/zenmi.jpg',
        tech: ['NextJS', 'Tailwind', 'Redux'],
        date: '04/2023 - 05/2024',
    },
]

const SesionProject = ({ className }: { className?: string }) => {
    const projectRefs = useRef<any>([])
    const titleRef = useRef<HTMLHeadingElement>(null)

    useEffect(() => {
        gsap.fromTo(
            titleRef.current,
            { opacity: 0, scale: 0.95 },
            {
                opacity: 1,
                scale: 1,
                duration: 1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: titleRef.current,
                    start: 'top bottom-=120',
                    toggleActions: 'play none none reverse',
                },
            }
        )
        const ctx = gsap.context(() => {
            projectRefs.current.forEach((el: any, i: number) => {
                gsap.fromTo(el, {
                    opacity: 0,
                    y: 100,
                    scale: 0.9,
                    rotationX: -20,
                }, {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    rotationX: 0,
                    ease: 'power3.out',
                    duration: 1,
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 90%',
                        end: 'top 70%',
                        scrub: 1,
                        invalidateOnRefresh: true,
                    },
                })
            })
        })

        return () => ctx.revert()
    }, [])

    return (
        <section id='ss-project' className={`py-16 bg-gradient-to-br from-gray-950 to-black ${className}`}>
            <div className="container mx-auto px-4">
                <div className="relative z-10 max-w-6xl mx-auto text-center px-6 mb-8">
                    <h1
                        ref={titleRef}
                        className="text-4xl font-extrabold uppercase tracking-wider"
                    >
                        My Featured Projects
                    </h1>
                </div>
                <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8">
                    {projects.map((project, idx) => (
                        <div
                            ref={(el: any) => (projectRefs.current[idx] = el)}
                            key={project.name}
                            className="group relative bg-gray-900 overflow-hidden rounded-xl shadow-xl transition-transform duration-500 hover:-translate-y-2"
                        >
                            <div className="relative h-60 overflow-hidden">
                                <Image
                                    src={project.image}
                                    width={800}
                                    height={600}
                                    alt={project.name}
                                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-40" />
                                <div className="absolute bottom-3 left-3 flex gap-1">
                                    {project.tech.map((tech) => (
                                        <span key={tech} className="rounded bg-black/70 px-2 py-1 text-xs text-white shadow">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className="p-4">
                                <h3 className="text-xl font-semibold text-white">{project.name}</h3>
                                <p className="mt-1 text-sm text-gray-400">{project.date}</p>
                                <a
                                    href={project.url}
                                    target="_blank"
                                    className="mt-3 inline-block text-sm font-medium text-blue-500 transition-colors hover:text-blue-400"
                                >
                                    View Details →
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default SesionProject
