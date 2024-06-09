"use client"
import gsap from 'gsap'
import Image from 'next/image'
import React, { useEffect, useRef } from 'react'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { useResize } from '@/hooks/useResize'
gsap.registerPlugin(ScrollTrigger)
const SesionHome = ({ className, ...props }: { className: string }) => {
    const textRef = useRef<any>(null);
    const { isVisibleMobile } = useResize()
    useEffect(() => {
        const textElement = textRef.current;

        gsap.fromTo(
            textElement,
            {
                x: '-250%',
                opacity: 0,
            }, // Bắt đầu từ vị trí bên trái
            {
                x: '0%', // Kết thúc ở vị trí chuẩn
                opacity: 1,
                duration: 1,
                ease: 'power2.inOut',
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

    useEffect(() => {
        const elements = document.querySelectorAll('.box-title-name');
        const elementsContent = document.querySelectorAll('.box-tile-content');
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: textRef.current,
                start: 'top center',
                end: 'top end',
                scrub: 1,
            }
        });

        tl.fromTo(elements, {
            width: '0%',
            duration: 5,
            ease: 'power2.inOut',
        }, {
            width: '100%',
            duration: 5,
            ease: 'power4.out',
        });
        tl.fromTo('.box-content',
            {
                background: 'linear-gradient(to right, #4B5563 0%, #4B5563 100%)',
            },
            {
                background: 'linear-gradient(to right, #4B5563 0%, #D1D5DB 100%)',
                duration: 5,  // Tăng thời gian hoạt ảnh lên 5 giây
                ease: 'power1.inOut'  // Sử dụng hàm easing mượt mà hơn
            });
        tl.fromTo(elementsContent, {
            opacity: 0.5,
            duration: 5,
            ease: 'power3.inOut',
        }, {
            opacity: 1,
            duration: 5,
            ease: 'power4.out',
        });
    }, []);
    useEffect(() => {
        const elements = document.querySelectorAll('.box-image-avatar');
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: textRef.current,
                start: 'top center',
                end: 'bottom',
                scrub: 2,
            },
        });

        tl.fromTo(elements, {
            borderRadius: 0,
            opacity: 0.1,
            duration: 5,
            ease: 'power1.inOut',
        }, {
            opacity: 1,
            borderRadius: '100%',
            ease: 'power3.out',
        },

        );
    }, []);
    return (
        <div id='ss-home' className="pt-[140px]">
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
            <div className="grid box-content mt-8 lg:grid-cols-2 grid-cols-1 lg:divide-y-0 divide-y lg:items-center w-full lg:h-[300px] h-[500px]">
                <div className='box-title-name col-span-1 h-full items-center lg:border-r-2 flex lg:flex-row flex-col gap-2 box-decoration-clone  text-white p-4 lg:rounded-tr-full lg:rounded-br-full'>
                    <div className="lg:w-[20%] mx-auto w-[150px] h-[150px]">
                        <Image
                            width={400}
                            height={500}
                            className="w-full h-full object-cover  box-image-avatar"
                            alt=" hero Image with delay"
                            src="/profile/huy.jpg"
                        />
                    </div>
                    <div className="lg:w-[75%] w-full flex flex-col gap-2 ">
                        <div className="uppercase lg:text-2xl text-sm  font-bold ">
                            {`Hi, I'm Huy Tran`}
                        </div>

                        <h1 className='lg:text-base text-sm'>
                            {`
                            I'm Frontend developer. I am always ready to face new challenges and committed to providing the best solutions for every project.
                            Thank you for visiting !
                            `}
                        </h1>
                    </div>
                </div>
                <div className='col-span-1 box-tile-content h-full items-center flex text-start text-black lg:font-semibold font-medium lg:text-2xl text-xs leading-1 lg:mt-0 mt-2 p-4'>
                    I like to learn new technology especially about effects,
                    cartoon. I always want to create new things,
                    unique experiences, I try to dedicate my work to new directions
                    Vision for each project, always putting quality first.
                </div>
            </div>
        </div>
    )
}

export default SesionHome