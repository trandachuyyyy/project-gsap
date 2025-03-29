'use client';
import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { useHeader } from '@/hooks/useMenuHeader';
import { handleScroll } from '@/hooks/useHandleScroll';

const Header = () => {
    const { openMenu, setOpenMenu } = useHeader()
    const scrollThreshold = 50;
    const lastScrollY = useRef(0);
    const [isVisible, setIsVisible] = useState(true);

    const isIntroInView = () => {
        const intro = document.getElementById('ss-intro');
        if (!intro) return false;
        const rect = intro.getBoundingClientRect();
        // return rect.top < window.innerHeight && rect.bottom > 0;

        return rect.top < window.innerHeight + 300 && rect.bottom > 300;
    };

    useEffect(() => {
        const onScroll = () => {
            const currentScrollY = window.scrollY;

            // ❗ Nếu #ss-intro đang trong viewport → luôn ẩn
            if (isIntroInView()) {
                if (isVisible) {
                    gsap.to('header', { opacity: 0, y: -100, duration: 0.3 });
                    setIsVisible(false);
                }
                lastScrollY.current = currentScrollY;
                return;
            }

            // Nếu cuộn xuống → ẩn header
            if (currentScrollY > lastScrollY.current && currentScrollY > scrollThreshold) {
                if (isVisible) {
                    gsap.to('header', { opacity: 0, y: -100, duration: 0.3 });
                    setIsVisible(false);
                }
            }

            // Nếu cuộn lên và vượt qua ngưỡng → hiện header
            else if (currentScrollY < lastScrollY.current && currentScrollY > scrollThreshold) {
                if (!isVisible) {
                    gsap.to('header', { opacity: 1, y: 0, duration: 0.3 });
                    setIsVisible(true);
                }
            }

            lastScrollY.current = currentScrollY;
        };
        window.addEventListener('scroll', onScroll);
        onScroll()
        return () => {
            window.removeEventListener('scroll', onScroll);
        };
    }, [isVisible]);

    return (
        <header className="header w-full fixed top-0 left-0 right-0 z-50  px-8 py-4 flex justify-between items-center">
            {/* <header className="header w-full fixed top-0 left-0 right-0 z-50 bg-black/70 backdrop-blur-xl shadow-lg px-8 py-4 flex justify-between items-center"> */}
            <div
                onClick={() => handleScroll('ss-home')}
                className="cursor-pointer text-xl font-bold text-white hover:text-teal-400 duration-300"
            >
                Huy Tran
            </div>
            <nav className="hidden md:flex gap-6">
                {['Home', 'About', 'Skills', 'Projects'].map((name, index) => {
                    const href = ['ss-home', 'ss-about', 'ss-skills', 'ss-project'][index];
                    return (
                        <button
                            key={href}
                            onClick={() => handleScroll(href)}
                            className="relative text-sm uppercase text-gray-300 hover:text-teal-400 duration-300 group"
                        >
                            {name}
                            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-teal-400 group-hover:w-full transition-all duration-300"></span>
                        </button>
                    );
                })}
            </nav>
            <button
                onClick={() => setOpenMenu(!openMenu)}
                className="md:hidden text-teal-400">
                Menu
            </button>
        </header>
    );
};

export default Header;
