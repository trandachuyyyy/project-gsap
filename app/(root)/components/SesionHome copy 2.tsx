// "use client"
// import gsap from 'gsap'
// import Image from 'next/image'
// import React, { useEffect, useRef } from 'react'
// import ScrollTrigger from 'gsap/ScrollTrigger'
// import { useResize } from '@/hooks/useResize'
// gsap.registerPlugin(ScrollTrigger)
// const SesionHome = ({ className, ...props }: { className: string }) => {
//     const textRef = useRef<any>(null);
//     const { isVisibleMobile } = useResize()
//     useEffect(() => {
//         const textElement = textRef.current;

//         gsap.fromTo(
//             textElement,
//             {
//                 x: '-250%',
//                 opacity: 0,
//             }, // Bắt đầu từ vị trí bên trái
//             {
//                 x: '0%', // Kết thúc ở vị trí chuẩn
//                 opacity: 1,
//                 duration: 1,
//                 ease: 'power2.inOut',
//                 scrollTrigger: {
//                     trigger: textElement,
//                     start: 0, // Kích hoạt ngay khi đến giữa của phần tử
//                     end: 'top center', // Kết thúc khi cuộn đến giữa dưới của phần tử
//                     scrub: 2, // Hiệu ứng kéo theo scroll
//                     // markers: true, // Hiển thị markers để kiểm tra
//                     onEnterBack: () => console.log('Cuộn hết nội dung'), // Xác định khi nào cuộn hết nội dung
//                 },
//             }
//         );
//     }, []);

//     useEffect(() => {
//         const elements = document.querySelectorAll('.box-title-name');
//         const elementsContent = document.querySelectorAll('.box-tile-content');
//         const tl = gsap.timeline({
//             scrollTrigger: {
//                 trigger: textRef.current,
//                 start: 'top center',
//                 end: 'top end',
//                 scrub: 1,
//             }
//         });

//         tl.fromTo(elements, {
//             width: '0%',
//             duration: 5,
//             ease: 'power2.inOut',
//         }, {
//             width: '100%',
//             duration: 5,
//             ease: 'power4.out',
//         });
//         tl.fromTo('.box-content',
//             {
//                 background: 'linear-gradient(to right, #4B5563 0%, #4B5563 100%)',
//             },
//             {
//                 background: 'linear-gradient(to right, #4B5563 0%, #D1D5DB 100%)',
//                 duration: 5,  // Tăng thời gian hoạt ảnh lên 5 giây
//                 ease: 'power1.inOut'  // Sử dụng hàm easing mượt mà hơn
//             });
//         tl.fromTo(elementsContent, {
//             opacity: 0.5,
//             duration: 5,
//             ease: 'power3.inOut',
//         }, {
//             opacity: 1,
//             duration: 5,
//             ease: 'power4.out',
//         });
//     }, []);
//     useEffect(() => {
//         const elements = document.querySelectorAll('.box-image-avatar');
//         const tl = gsap.timeline({
//             scrollTrigger: {
//                 trigger: textRef.current,
//                 start: 'top center',
//                 end: 'bottom',
//                 scrub: 2,
//             },
//         });

//         tl.fromTo(elements, {
//             borderRadius: 0,
//             opacity: 0.1,
//             duration: 5,
//             ease: 'power1.inOut',
//         }, {
//             opacity: 1,
//             borderRadius: '100%',
//             ease: 'power3.out',
//         },

//         );
//     }, []);
//     return (
//         <div id='ss-home' className="">
//             <div className="content grid box-content lg:grid-cols-2 grid-cols-1 lg:divide-y-0 divide-y lg:items-center w-full lg:h-[300px] h-[500px]">
//                 <div className='box-title-name col-span-1 h-full items-center lg:border-r-2 flex lg:flex-row flex-col gap-2 box-decoration-clone  text-white p-4 lg:rounded-tr-full lg:rounded-br-full'>
//                     <div className="lg:w-[20%] mx-auto w-[150px] h-[150px]">
//                         <Image
//                             width={400}
//                             height={500}
//                             className="w-full h-full object-cover  box-image-avatar"
//                             alt=" hero Image with delay"
//                             src="/profile/huy.jpg"
//                         />
//                     </div>
//                     <div className="lg:w-[75%] w-full flex flex-col gap-2 ">
//                         <div className="uppercase lg:text-2xl text-sm  font-bold ">
//                             {`Hi, I'm Huy Tran`}
//                         </div>

//                         <h1 className='lg:text-base text-sm'>
//                             {`
//                             I'm Frontend developer. I am always ready to face new challenges and committed to providing the best solutions for every project.
//                             Thank you for visiting !
//                             `}
//                         </h1>
//                     </div>
//                 </div>
//                 <div className='col-span-1 box-tile-content h-full items-center flex text-start text-black lg:font-semibold font-medium lg:text-2xl text-xs leading-1 lg:mt-0 mt-2 p-4'>
//                     I like to learn new technology especially about effects,
//                     cartoon. I always want to create new things,
//                     unique experiences, I try to dedicate my work to new directions
//                     Vision for each project, always putting quality first.
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default SesionHome

"use client";
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useResize } from '@/hooks/useResize';
import Lenis from '@studio-freight/lenis';

gsap.registerPlugin(ScrollTrigger);

const SesionHome = ({ className, ...props }: { className?: string }) => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    const { isVisibleMobile } = useResize();

    useEffect(() => {
        // Khởi tạo Lenis cho smooth scroll
        const lenis = new Lenis({
            duration: 1.5,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });

        function raf(time: number) {
            lenis.raf(time);
            ScrollTrigger.update();
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        // Animation cho tiêu đề
        gsap.fromTo(
            textRef.current,
            { x: '-100%', opacity: 0 },
            {
                x: '0%',
                opacity: 1,
                duration: 1.5,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                    end: 'top 20%',
                    scrub: 1,
                },
            }
        );

        // Animation cho ảnh
        gsap.fromTo(
            imageRef.current,
            { scale: 0, opacity: 0, borderRadius: '0%' },
            {
                scale: 1,
                opacity: 1,
                borderRadius: '50%',
                duration: 1.8,
                ease: 'back.out(1.7)',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                    end: 'top 20%',
                    scrub: 1,
                },
            }
        );

        // Animation cho background và content
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 70%',
                end: 'bottom 20%',
                scrub: 1,
            },
        });

        tl.fromTo(
            '.box-content',
            { background: 'linear-gradient(90deg, #1F2937 0%, #1F2937 100%)' },
            {
                background: 'linear-gradient(90deg, #1F2937 0%, #60A5FA 70%)',
                duration: 2,
                ease: 'power2.inOut',
            }
        )
            .fromTo(
                '.box-tile-content',
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 1.5, ease: 'power3.out' },
                '-=1.5'
            );

        // Parallax effect cho ảnh
        gsap.to(imageRef.current, {
            yPercent: 20,
            ease: 'none',
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
            },
        });

        return () => {
            lenis.destroy();
        };
    }, []);

    return (
        <div
            ref={sectionRef}
            id="ss-home"
            className={`relative w-full min-h-[600px] overflow-hidden ${className}`}
        >
            <div className="box-content absolute inset-0 bg-gradient-to-r from-gray-800 to-blue-500" />

            <div className="relative z-10 grid lg:grid-cols-2 grid-cols-1 items-center max-w-7xl mx-auto px-6 py-16 lg:py-24 gap-12">
                {/* Left Section */}
                <div className="flex flex-col items-center lg:items-start gap-8">
                    <div className="relative w-[200px] h-[200px] lg:w-[250px] lg:h-[250px]">
                        <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-xl animate-pulse" />
                        <Image
                            ref={imageRef}
                            width={400}
                            height={400}
                            className="w-full h-full object-cover shadow-2xl"
                            alt="Huy Tran"
                            src="/profile/huy.jpg"
                        />
                    </div>

                    <div ref={textRef} className="text-center lg:text-left">
                        <h1 className="text-3xl lg:text-5xl font-bold text-white uppercase tracking-wide">
                            Hi, I&apos;m Huy Tran
                        </h1>
                        <p className="mt-4 text-gray-200 text-sm lg:text-base font-medium">
                            Frontend Developer | Creative Coder | Animation Enthusiast
                        </p>
                    </div>
                </div>

                {/* Right Section */}
                <div className="box-tile-content text-white lg:pr-8">
                    <p className="text-lg lg:text-xl leading-relaxed font-light">
                        I’m passionate about crafting unique digital experiences through cutting-edge technology and stunning animations. My focus is on delivering high-quality solutions that push creative boundaries while meeting project goals. Let’s build something extraordinary together!
                    </p>
                    <div className="mt-6 flex gap-4">
                        <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-full text-white font-medium transition-all duration-300">
                            Contact Me
                        </button>
                        <button className="px-6 py-2 border border-white/20 hover:border-white rounded-full text-white font-medium transition-all duration-300">
                            View Projects
                        </button>
                    </div>
                </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-transparent" />
        </div>
    );
};

export default SesionHome;