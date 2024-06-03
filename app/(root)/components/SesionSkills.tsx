'use client'

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react"
gsap.registerPlugin(ScrollTrigger)

const SesionSkills = ({ className, ...props }: { className: string }) => {
    const skils = [
        'React',
        'Nextjs',
        'Tailwindcss',
        'Shadcn',
        'Ant Design',
        'Javascript',
        'Typescript',
        'Zustand',
        'React Query',
        'Github',
        'Html',
        'Css',
        'Sass',
    ]
    const sessionRef = useRef(null);
    const triggerRef = useRef(null);


    useEffect(() => {
        const pinTrigger = gsap.fromTo(triggerRef.current, {
            translateX: '20%',
        }, {
            translateX: '-20%',
            duration: 2,
            scrollTrigger: {
                trigger: sessionRef.current,
                start: 'top top',
                end: `35%`,
                scrub: 2,
                pin: true,
                // markers: true, // Add markers for debugging
            },
            ease: 'power1.inOut',
        })
        return () => {
            pinTrigger.kill();
        }
    }, [])

    return (
        <div ref={sessionRef} className='flex flex-col gap-8 h-screen'>
            <h1 className='text-center text-lg md:text-2xl mb-section lg:text-4xl'>Skills</h1>
            <h1 className='w-full text-start  px-8 py-2'>
                My Practical Skills
            </h1>
            <div className={`shadow-xl w-full bg-gray-500 rounded-br-full rounded-bl-full overflow-hidden`} >
                <div ref={triggerRef} className="flex gap-2 mx-16 justify-center my-32 ">
                    {skils.map((e, index) => {
                        return (
                            <div key={index} className='text-gray-200  border min-w-[170px] h-fit text-center font-semibold text-xl px-4 py-2 rounded-2xl leading-1'>
                                {e}
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>

    )
}

export default SesionSkills