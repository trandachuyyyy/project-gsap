"use client"
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { useEffect } from 'react'
import { Draggable } from 'gsap/Draggable';

gsap.registerPlugin(ScrollTrigger)
const SesionAbout = ({ className }: { className: string }) => {
    useEffect(() => {
        const textElement = document.querySelectorAll('.box-about')
        gsap.fromTo(
            textElement,
            {
                borderRadius: '0%',
                height: '30%',
                opacity: 0.5,
            },
            {
                duration: 5,
                opacity: 1,
                height: '100%',
                borderRadius: '1%',
                borderTop: '5px solid black',
                ease: 'power1.inOut',
                scrollTrigger: {
                    trigger: '.content-about',
                    start: 'top center', // Kích hoạt ngay khi đến giữa của phần tử
                    end: 'top', // Kết thúc khi cuộn đến giữa dưới của phần tử
                    scrub: 2, // Hiệu ứng kéo theo scroll
                    // markers: true, // Hiển thị markers để kiểm tra
                    onEnterBack: () => console.log('Cuộn hết nội dung'), // Xác định khi nào cuộn hết nội dung
                },
            }
        );
        // const textElement = document.querySelectorAll('.text-about-animation')
        // gsap.fromTo(
        //     textElement,
        //     { x: '0%' }, // Bắt đầu từ vị trí bên trái
        //     {
        //         x: '-170%', // Kết thúc ở vị trí chuẩn
        //         duration: 5,
        //         ease: 'power1.inOut',
        //         scrollTrigger: {
        //             trigger: '.content-about',
        //             start: 'top center', // Kích hoạt ngay khi đến giữa của phần tử
        //             end: 'bottom bottom', // Kết thúc khi cuộn đến giữa dưới của phần tử
        //             scrub: 5, // Hiệu ứng kéo theo scroll
        //             // markers: true, // Hiển thị markers để kiểm tra
        //             onEnterBack: () => console.log('Cuộn hết nội dung'), // Xác định khi nào cuộn hết nội dung
        //         },
        //     }
        // );
    }, [])
    const arrayAbout = [
        'I have regularly worked with react and the nextjs framework since graduating and now I have been working with it for about 2 years.',
        'I often research and self-study about technology, this page was also built when I learned about the Gsap library.',
        'Please experience this page and leave me comments I will try to fix and develop in the future.'
    ]
    return (
        <div id='ss-about' className='content-about flex flex-col gap-8  overflow-hidden'>
            <h1 className='text-center text-lg md:text-2xl mb-section lg:text-4xl'>About</h1>
            <h1 className='w-full lg:text-start text-center  px-8 py-2'>Something about me</h1>
            <div className={`bg-gray-100 text-about-animation`} >
                <div className='grid lg:grid-cols-3 grid-cols-1 gap-4  py-4 '>
                    {arrayAbout.map((item, index) => (
                        <div key={index} className={`bg-gray-200 border-t-2 h-fit col-span-1 border-gray-400 box-about  w-1/2 min-w-fit  p-8 `}>
                            <h1 className='max-w-lg text-base sm:text-2xl lg:justify-self-end lg:text-2xl '>
                                {item}
                            </h1>
                        </div>
                    ))}
                    {/* <div className=" bg-gray-200 box-about  w-1/2 min-w-fit  p-8 ">
                        <h1 className='max-w-lg text-base sm:text-2xl lg:justify-self-end lg:text-2xl '>
                            I have regularly worked with react and the nextjs framework since graduating and now I have been working with it for about 2 years.
                        </h1>
                    </div>
                    <div className=" bg-gray-200 box-about  w-1/2 min-w-fit  p-8">
                        <h1 className='max-w-lg text-base sm:text-2xl lg:justify-self-end lg:text-2xl '>
                            I often research and self-study about technology, this page was also built when I learned about the Gsap library.
                        </h1>
                    </div>
                    <div className=" bg-gray-200 box-about  w-1/2 min-w-fit  p-8 ">
                        <h1 className='max-w-lg text-base sm:text-2xl lg:justify-self-end lg:text-2xl '>
                            Please experience this page and leave me comments I will try to fix and develop in the future.
                        </h1>
                    </div> */}

                </div>
            </div>
        </div>
    )
}

export default SesionAbout