"use client"
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { useEffect } from 'react'
gsap.registerPlugin(ScrollTrigger)
const SesionAbout = ({ className }: { className: string }) => {
    useEffect(() => {
        const textWrapers = document.querySelectorAll('.text-about-animation')

        const pinTrigger = ScrollTrigger.create({
            trigger: '.content-about',
            pin: true,
            start: 'top top',
            end: `10%`,

        })

        let tl = gsap.timeline();


        tl.to(textWrapers, {
            translateX: '-170%',
            scrollTrigger: {
                start: () => pinTrigger.start,
                end: () => pinTrigger.end,
                scrub: 5,
                // markers: true, // Add markers for debugging
            }
            ,
            ease: 'power1.inOut',
        })

        return () => {
            pinTrigger.kill();
            tl.kill();
        }

    }, [])
    return (
        <div className='content-about flex flex-col gap-8  overflow-hidden'>
            <h1 className='text-center text-lg md:text-2xl mb-section lg:text-4xl'>About</h1>
            <h1 className='w-full text-start  px-8 py-2'>Something about me</h1>
            <div className={`bg-gray-100 text-about-animation`} >
                <div className='flex gap-2  py-4 '>
                    <div className=" bg-gray-200 w-1/2 min-w-fit  p-8 rounded-tr-full rounded-br-full">
                        <h1 className='max-w-lg text-base sm:text-2xl lg:justify-self-end lg:text-2xl '>
                            I have regularly worked with react and the nextjs framework since graduating and now I have been working with it for about 2 years.
                        </h1>
                    </div>
                    <div className=" bg-gray-200 w-1/2 min-w-fit  p-8 rounded-tl-full rounded-bl-full">
                        <h1 className='max-w-lg text-base sm:text-2xl lg:justify-self-end lg:text-2xl '>
                            I often research and self-study about technology, this page was also built when I learned about the Gsap library.
                        </h1>
                    </div>
                    <div className=" bg-gray-200 w-1/2 min-w-fit  p-8 rounded-tr-full rounded-br-full">
                        <h1 className='max-w-lg text-base sm:text-2xl lg:justify-self-end lg:text-2xl '>
                            Please experience this page and leave me comments I will try to fix and develop in the future
                        </h1>
                    </div>
                    <div className=" bg-gray-200 w-1/2 min-w-fit  p-8 rounded-tr-full rounded-br-full">
                        <h1 className='max-w-lg text-base sm:text-2xl lg:justify-self-end lg:text-2xl '>
                            Please experience this page and leave me comments I will try to fix and develop in the future
                        </h1>
                    </div>
                    <div className=" bg-gray-200 w-1/2 min-w-fit  p-8 rounded-tr-full rounded-br-full">
                        <h1 className='max-w-lg text-base sm:text-2xl lg:justify-self-end lg:text-2xl '>
                            Please experience this page and leave me comments I will try to fix and develop in the future
                        </h1>
                    </div>
                    <div className=" bg-gray-200 w-1/2 min-w-fit  p-8 rounded-tr-full rounded-br-full">
                        <h1 className='max-w-lg text-base sm:text-2xl lg:justify-self-end lg:text-2xl '>
                            Please experience this page and leave me comments I will try to fix and develop in the future
                        </h1>
                    </div>
                    <div className=" bg-gray-200 w-1/2 min-w-fit  p-8 rounded-tr-full rounded-br-full">
                        <h1 className='max-w-lg text-base sm:text-2xl lg:justify-self-end lg:text-2xl '>
                            Please experience this page and leave me comments I will try to fix and develop in the future
                        </h1>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SesionAbout