"use client"
import { useResize } from '@/hooks/useResize'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { useEffect, useState } from 'react'
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
            fontSize: isVisibleMobile ? '18px' : '72px',
            // scale: isVisibleMobile ? 4 : 6,
            yPercent: -50,
            duration: 2,
            ease: "power1.inOut", // Thêm thuộc tính ease
        }, {
            // scale: 1,
            fontSize: isVisibleMobile ? '20px' : '52px',
            translateY: '100%',
            scrollTrigger: {
                trigger: '.content',
                scrub: 2,
                start: 'top bottom',
                endTrigger: '.content',
                end: 'top 1000',
                onUpdate: (self) => {
                    const scrollProgress = self.progress;
                    const logo = document.querySelector('.logo');
                    const scrollToText = document.querySelector('.scroll-to');
                    if (scrollProgress >= 0.80) {
                        gsap.to(logo, { display: 'none', })
                        setHeaderVisible(true);
                        gsap.to(scrollToText, { display: 'none', })
                    } else {
                        gsap.to(logo, { display: 'block', });
                        gsap.to(scrollToText, { display: 'flex', });
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


    const [lastScrollTop, setLastScrollTop] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                // Scrolling down
                // gsap.to('.nav', { maxHeight: '0px', opacity: 0, duration: 0.5, ease: 'power1.inOut' });
                setHeaderVisible(false);
            }
            else if (scrollTop > 100) {
                // Scrolling up
                // gsap.to('.nav', { maxHeight: '70px', opacity: 1, duration: 0.5, ease: 'power1.inOut' });
                setHeaderVisible(true);
            } else {
                // Ở trên cùng
                setHeaderVisible(false)
            }
            setLastScrollTop(scrollTop);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollTop]);

    useEffect(() => {
        document.body.addEventListener("mousemove", event => {
            const mouseX = event.clientX;
            const mouseY = event.clientY;

            gsap.set(".cursor", {
                x: mouseX,
                y: mouseY
            });

            console.log(mouseX)

            gsap.to(".shape", {
                x: mouseX,
                y: mouseY,
                stagger: -0.1
            });
        });

    }, []);

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
                <div className="logo uppercase text-center font-bold fixed top-0 translate-y-1/2 w-full ">
                    <div className="flex flex-col lg:text-2xl text-sm">
                        <span> Hello</span>
                        <span>
                            you have come to my page
                        </span>
                    </div>
                </div>
                <p
                    onClick={() => handleScrollSession('ss-home')}
                    className="scroll-to flex items-center cursor-pointer gap-2 font-mono fixed lg:text-lg text-xs bottom-2 left-1/2 -translate-x-1/2 z-[1000] ">
                    Scroll down <FaAnglesDown className='animate-bounce text-sm' />
                </p>
            </div>
            <div className="container w-full h-screen bg-gray-100 max-w-full">

            </div>

        </div>
    )
}

export default Header