"use client"
import gsap from 'gsap'
import Image from 'next/image'
import React, { useEffect, useRef } from 'react'
import ScrollTrigger from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)
const SesionHome = ({ className, ...props }: { className: string }) => {
    const textRef = useRef<any>(null);


    // useEffect(() => {
    //     const textElement = textRef.current;

    //     gsap.fromTo(
    //         textElement,
    //         { x: '-100%' }, // Bắt đầu từ vị trí bên trái
    //         {
    //             x: '0%', // Kết thúc ở vị trí chuẩn
    //             duration: 2,
    //             ease: 'power1.inOut',
    //         }
    //     );

    // }, []);
    useEffect(() => {
        const textElement = textRef.current;

        gsap.fromTo(
            textElement,
            { x: '-250%' }, // Bắt đầu từ vị trí bên trái
            {
                x: '0%', // Kết thúc ở vị trí chuẩn
                duration: 1,
                ease: 'power1.inOut',
                scrollTrigger: {
                    trigger: textElement,
                    start: 0, // Kích hoạt ngay khi đến giữa của phần tử
                    end: 'top center', // Kết thúc khi cuộn đến giữa dưới của phần tử
                    scrub: 2, // Hiệu ứng kéo theo scroll
                    // markers: true, // Hiển thị markers để kiểm tra
                    onEnterBack: () => console.log('Cuộn hết nội dung'), // Xác định khi nào cuộn hết nội dung
                },
            }
        );
    }, []);
    return (
        <div className="">
            <div className={`flex flex-col gap-8 ${className}`} ref={textRef} >
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
                        {`Hi, I'm Huy Tran`}
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