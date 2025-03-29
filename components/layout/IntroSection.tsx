"use client";
import { useEffect } from "react";
import { FaAnglesDown } from "react-icons/fa6";
import { gsap } from "gsap";

const IntroSection = () => {
    useEffect(() => {
        // Animate the text lines
        gsap.fromTo(
            ".intro-text > div",
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 1, stagger: 0.3, ease: "power3.out" }
        );

        // Animate the scroll button
        gsap.fromTo(
            ".scroll-button",
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 1, delay: 1, ease: "power3.out" }
        );

        // Replace the animate-bounce with GSAP
        gsap.to(".scroll-button", {
            y: 10,
            repeat: -1,
            yoyo: true,
            duration: 0.8,
            ease: "sine.inOut",
        });
    }, []);

    const handleScroll = () => {
        const el = document.getElementById("ss-home");
        if (el && window.lenis) {
            const offset = el.getBoundingClientRect().top + window.scrollY;
            window.lenis.scrollTo(offset);
        } else {
            el?.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <section id="ss-intro" className="w-full h-screen bg-black text-white flex flex-col items-center justify-center relative z-10">
            <div className="intro-text text-3xl font-bold text-center uppercase">
                <div>Hello</div>
                <div>You have come to my page</div>
            </div>
            <button
                onClick={handleScroll}
                className="scroll-button mt-10 flex items-center gap-2 text-sm md:text-base"
            >
                Scroll down <FaAnglesDown />
            </button>
        </section>
    );
};

export default IntroSection;