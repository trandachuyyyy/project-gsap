"use client"
import gsap from 'gsap'
import Image from 'next/image'
import React, { useEffect } from 'react'
import ScrollTrigger from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)
const SesionHome = ({ className }: { className: string }) => {
    return (
        <div className="">
            <div className={`flex flex-col gap-8 ${className}`}>
                <div className="">
                    <h1 className='text-3xl font-black uppercase sm:text-4xl md:text-7xl xl:text-9xl'>
                        Hello, you have come to my page
                    </h1>
                </div>
                <div className="text-right text-3xl font-black uppercase sm:text-6xl">
                    <h1 className=''>
                        {`Let's experience it together`}
                    </h1>
                </div>
            </div>
            <div className={`flex shadow-xl items-start justify-center bg-gray-500 rounded-tr-full rounded-tl-full overflow-hidden mt-8`} >
                <div className="w-[70%] my-auto ml-24">
                    <div className='uppercase leading-1 text-justify text-2xl font-bold box-decoration-clone bg-gradient-to-r from-gray-600 to-gray-200 text-white px-2'>
                        {`Hi, I'm Huy Tran | I'm Frontend developer.`}
                    </div>
                    <div className='text-justify text-white font-semibold text-2xl pr-2 leading-1'>
                        I like to learn new technology especially about effects,
                        cartoon. I always want to create new things,
                        unique experiences, I try to dedicate my work to new directions
                        Vision for each project, always putting quality first.
                    </div>
                </div>
                <div className="w-[30%] flex">
                    <div className="h-[350px] w-full overflow-hidden">
                        <Image
                            width={400}
                            height={500}
                            className="w-full h-full object-cover "
                            alt=" hero Image with delay"
                            src="/profile/huy.jpg"
                        />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default SesionHome