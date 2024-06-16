'use client'
import React, { useEffect } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)
const SesionOtherText = () => {
    useEffect(() => {

        const textElements = gsap.utils.toArray('.text') as any

        textElements.forEach((text: any) => {
            gsap.to(text, {
                backgroundSize: '100%',
                ease: 'none',
                scrollTrigger: {
                    trigger: text,
                    start: 'center 80%',
                    end: 'center 20%',
                    scrub: true,
                },
            });
        });

    }, []);
    return (
        <div className="container-other overflow-hidden">
            <h1 className="text lg:text-[120px] text-[82px] uppercase">I am<span className='lg:text-[80px] text-[36px]'>The following</span></h1>
            <h1 className="text lg:text-[120px] text-[82px] uppercase">Huy tran<span className='lg:text-[80px] text-[36px]'>Is skill</span></h1>
            <h1 className="text lg:text-[120px] text-[82px] uppercase">{`I'm Frontend developer`}<span className='lg:text-[80px] text-[36px]'>That I have learned</span></h1>
            <h1 className="text lg:text-[120px] text-[82px] uppercase">contact me<span className='lg:text-[80px] text-[36px]'>This page</span></h1>
            <h1 className="text lg:text-[120px] text-[82px] uppercase">necessary<span className='lg:text-[80px] text-[36px]'>{`Developed by gsap`}</span></h1>


        </div>
    )
}

export default SesionOtherText