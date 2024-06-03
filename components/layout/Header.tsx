"use client"
import gsap from 'gsap'
import Image from 'next/image'
import React, { useEffect } from 'react'
import ScrollTrigger from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)
const Header = () => {
    const nav = [
        { name: 'Home', href: '/' },
        { name: 'About', href: '/about' },
        { name: 'Project', href: '/project' },
    ]
    useEffect(() => {
        const pinTrigger = gsap.fromTo('.logo', {
            y: "50vh",
            scale: 6,
            yPercent: -50,
            duration: 2,
            ease: "power1.inOut", // Thêm thuộc tính ease
        }, {
            scale: 1,
            translateY: '88%',
            scrollTrigger: {
                trigger: '.content',
                scrub: 2,
                start: 'top bottom',
                endTrigger: '.content',
                end: 'top center',
                onUpdate: (self) => {
                    const scrollProgress = self.progress;
                    const logo = document.querySelector('.logo');
                    if (scrollProgress >= 0.80) {
                        gsap.to(logo, { opacity: 0 });
                    } else {
                        gsap.to(logo, { opacity: 1 });
                    }
                },
            },
            ease: 'power1.inOut',
        })

        return () => {
            pinTrigger.kill();
        }
    }, [])
    return (
        <div>
            {/* <div className='bg-gray-200 sticky top-0 z-10'>
                <div className="flex items-center justify-between py-4 px-8">
                    <div className='text-base font-semibold uppercase logo'>Huy Tran</div>
                    <div className="flex justify-between gap-4">
                        {nav.map((e) => {
                            return (
                                <div className='text-base font-semibold' key={e.name}>
                                    {e.name}
                                </div>
                            )
                        })
                        }
                    </div>
                </div>
            </div> */}
            <div className='nav fixed w-full h-[70px] flex items-center justify-between px-8 bg-gray-200 z-[999]'>
                <div className='text-base font-semibold uppercase'>Huy Tran</div>
                <div className="flex justify-between gap-4">
                    {nav.map((e) => {
                        return (
                            <div className='text-base font-semibold' key={e.name}>
                                {e.name}
                            </div>
                        )
                    })
                    }
                </div>
            </div>
            <div className='logo-container'>
                <h1 className="logo fixed top-0 translate-y-1/2 p-4 left-1/2 -translate-x-1/2 z-[1000]">
                    {`HI, I'M  FRONTEND DEVELOPER`}
                </h1>
            </div>
            <div className="container w-full h-screen bg-gray-100">

            </div>
        </div>
    )
}

export default Header