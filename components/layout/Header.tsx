"use client"
import gsap from 'gsap'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { useResize } from '@/hooks/useResize'
import { FaAnglesDown } from 'react-icons/fa6'
gsap.registerPlugin(ScrollTrigger)
const Header = () => {
    const nav = [
        { name: 'Home', href: 'ss-home' },
        { name: 'About', href: 'ss-about' },
        { name: 'Skills', href: 'ss-skills' },
        { name: 'Project', href: 'ss-project' },
    ]

    const { isVisibleMobile } = useResize()

    const [headerVisible, setHeaderVisible] = useState<boolean>(false);

    useEffect(() => {
        const pinTrigger = gsap.fromTo('.logo', {
            y: "50vh",
            scale: isVisibleMobile ? 4 : 6,
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
                    const scrollToText = document.querySelector('.scroll-to');
                    if (scrollProgress >= 0.80) {
                        gsap.to(logo, { opacity: 0 });
                        setHeaderVisible(true);
                        gsap.to(scrollToText, { opacity: 0 })
                    } else {
                        gsap.to(logo, { opacity: 1 });
                        gsap.to(scrollToText, { opacity: 1 });
                        setHeaderVisible(false);
                    }
                },

            },
            ease: 'power1.inOut',
        });

        return () => {
            pinTrigger.kill();
        };
    }, []);

    const handleScrollSession = (id: string) => {
        const targetElement = document.getElementById(id);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
        }
    };

    return (
        <div>
            <div
                style={{
                    maxHeight: headerVisible ? '70px' : '0px',
                    opacity: headerVisible ? 1 : 0,
                    overflow: 'hidden',
                    transition: 'max-height 0.5s ease-in-out, opacity 0.5s ease-in-out'
                }}
                className='nav fixed w-full h-[70px] flex items-center justify-between px-8 bg-gray-200 z-[999]'>
                <div onClick={() => handleScrollSession('ss-home')} className='lg:text-base text-sm font-semibold uppercase'>Huy Tran</div>
                <div className="flex justify-between gap-4">
                    {nav.map((e: any) => {
                        return (
                            <div onClick={() => handleScrollSession(e.href)} className='text-base cursor-pointer font-semibold' key={e.name}>
                                {e.name}
                            </div>
                        )
                    })
                    }
                </div>
            </div>
            <div className='logo-container'>
                <h1 className="logo uppercase font-bold leading-5 fixed lg:text-2xl text-sm top-0 translate-y-1/2 p-4 left-1/2 -translate-x-1/2 z-[1000]">
                    {`hello`}
                </h1>
                <p
                    onClick={() => handleScrollSession('ss-home')}
                    className="scroll-to flex items-center cursor-pointer gap-2 font-mono fixed lg:text-lg text-xs bottom-2 left-1/2 -translate-x-1/2 z-[1000] ">
                    Scroll To <FaAnglesDown className='animate-bounce text-sm' />
                </p>
            </div>
            <div className="container w-full h-screen bg-gray-100">

            </div>
        </div>
    )
}

export default Header