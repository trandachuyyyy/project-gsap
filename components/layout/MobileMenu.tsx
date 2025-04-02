'use client';

import { useEffect } from 'react';
import { useHeader } from '@/hooks/useMenuHeader';
import { IoCloseOutline } from 'react-icons/io5';

const MobileMenu = () => {
    const { openMenu, setOpenMenu } = useHeader();

    const navItems = [
        { name: 'Home', href: 'ss-home' },
        { name: 'Skills', href: 'ss-skills' },
        { name: 'Projects', href: 'ss-project' },
        { name: 'About', href: 'ss-about' },
    ];

    const handleScroll = (id: string) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
        setOpenMenu(false);
    };

    return (
        <div
            className={`fixed top-0 left-0 right-0 bottom-0 z-[9999] bg-black/90 backdrop-blur-lg text-white transition-opacity duration-500 ease-in-out md:hidden
            ${openMenu ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        >
            {/* Close Button */}
            <div
                className={`flex justify-end px-6 py-4 transition-transform duration-500 ease-in-out ${openMenu ? 'translate-y-0' : '-translate-y-5 opacity-0'}`}
            >
                <button
                    onClick={() => setOpenMenu(false)}
                    className="text-white text-3xl hover:text-teal-400 transition"
                    aria-label="Close menu"
                >
                    <IoCloseOutline />
                </button>
            </div>

            {/* Menu Items */}
            <div
                className={`flex flex-col items-center justify-center gap-6 mt-12 transition-all duration-500 ease-in-out delay-100 ${openMenu ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
                    }`}
            >
                {navItems.map((item, idx) => (
                    <button
                        key={item.href}
                        onClick={() => handleScroll(item.href)}
                        className="text-xl uppercase tracking-wide font-semibold hover:text-teal-400 transition"
                        style={{ transitionDelay: `${150 + idx * 50}ms` }}
                    >
                        {item.name}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default MobileMenu;
