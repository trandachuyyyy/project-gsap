'use client'
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { useResize } from '@/hooks/useResize';
import { FaAnglesDown } from 'react-icons/fa6';

gsap.registerPlugin(ScrollTrigger);
const SesionProject = ({ className, ...props }: { className: string }) => {
    const technology = [
        {
            name: 'NextJS',
            image: '/skills/next.jpg'
        },
        {
            name: 'Tailwind',
            image: '/profile/tailwind.jpg'
        },
        {
            name: 'React',
            image: '/profile/reactjs.jpeg'
        },
        {
            name: 'HTML',
            image: '/profile/hmtl.jpg'
        },
        {
            name: 'JavaScript',
            image: '/profile/JavaScript.png'
        }
    ]
    const projects = [
        {
            name: 'ERP',
            description: `This is an ERP project of a company, the project was developed to manage goods, inventory, and staff to manage the production process system clearly and economically.`,
            url: 'https://github.com/huytran2000',
            image: '/project/erp.png',
            imageUser: '/profile/huy.jpg',
            technology: [...technology, { name: 'Redux', image: '/skills/redux.png' }],
            date: '02/2023 - Present'
        },
        {
            name: 'KANOW',
            description: `Is a comprehensive web application designed to facilitate the seamless rental of self-driving cars, catering to both users seeking to rent vehicles and individuals interested in registering as drivers. With user-friendly interfaces and advanced functionalities, it streamlines the entire process from vehicle selection to booking confirmation`,
            url: 'https://github.com/huytran2000',
            image: '/project/kanow.png',
            imageUser: '/profile/huy.jpg',
            technology: [...technology,
            { name: 'Zustand', image: '/skills/zustand.jpg', },
            { name: 'Pusher', image: '/skills/pusher.png' },
            { name: 'Map4D', image: '/skills/map4d.png' },
            { name: 'Shadcn', image: '/skills/shadcn.png' },
            ],
            date: '02/2024 - 05/2024'
        },
        {
            name: 'MONY',
            description: `Is a sophisticated web application dedicated to efficiently managing every aspect of an enterprise's warehouse operations. From inventory tracking and order management to personnel coordination and logistics optimization, our platform provides comprehensive solutions tailored to meet the unique needs of your business.`,
            url: 'https://github.com/huytran2000',
            image: '/project/mony.png',
            imageUser: '/profile/huy.jpg',
            technology: [...technology,
            { name: 'Zustand', image: '/skills/zustand.jpg', },
            { name: 'Pusher', image: '/skills/pusher.png' },
            { name: 'Shadcn', image: '/skills/shadcn.png' },
            ],
            date: '12/2023 - 03/2024'
        },
        {
            name: 'LIULAP',
            description: 'Is an advanced web application designed to provide detailed information and online shopping services to those who are passionate and interested in gemstones. This project aims to create a comprehensive and easy-to-use platform for users to learn, explore and purchase different gemstones conveniently and securely.',
            url: 'https://github.com/huytran2000',
            image: '/project/liulap.jpg',
            imageUser: '/profile/huy.jpg',
            technology: [...technology,
            { name: 'Zustand', image: '/skills/zustand.jpg', },
            { name: 'Pusher', image: '/skills/pusher.png' },
            { name: 'RadixUI', image: '/skills/radix.jpg' },
            { name: 'D3Js', image: '/skills/d3.jpg' },
            ],
            date: '11/2023 - 02/2024'
        },
        {
            name: 'Zen',
            description: `Is a specialized web application devoted to showcasing a curated collection of Feng Shui items. Our platform offers a virtual gallery where users can explore a diverse range of Feng Shui products, from traditional artifacts to modern interpretations. `,
            url: 'https://github.com/huytran2000',
            image: '/project/zenmi.jpg',
            imageUser: '/profile/huy.jpg',
            technology: [...technology,
            { name: 'Redux', image: '/skills/redux.png', },
            { name: 'Pusher', image: '/skills/pusher.png' },
            ],
            date: '04/2023 - 05/2024'
        },
    ]
    const projectsRef = useRef<any>([]);

    const triggerRef = useRef<any>(null);

    const scrollToRef = useRef<any>(null);

    const { isVisibleMobile } = useResize()

    const [isHidden, setIsHidden] = useState<boolean>(false);


    useEffect(() => {
        projectsRef.current.forEach((el: any, index: any) => {
            gsap.fromTo(el,
                {
                    x: index % 2 === 0 ? '-=100' : '+=100',
                    opacity: 0,
                    scale: 0.8,// Thêm hiệu ứng phóng to/nhỏ ban đầu
                    rotation: index % 2 === 0 ? -10 : 10, // Thêm hiệu ứng xoay,
                },
                {
                    x: 0,
                    rotation: 0,
                    opacity: 1,
                    scale: 1, // Scale về giá trị mặc định
                    duration: 5,
                    ease: 'power4.out',
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 80%',
                        end: '+=200',
                        scrub: 1,
                        toggleActions: 'play none none reverse',
                        onEnter: () => {
                            if (index == 0) {
                                gsap.to(scrollToRef.current, { opacity: 1, duration: 0.5 });
                            } else {
                                gsap.to(scrollToRef.current, { opacity: 0, duration: 0.5 });
                            }
                        },
                        onLeaveBack: () => {
                            gsap.to(scrollToRef.current, { opacity: 1, duration: 0.5 });
                        }
                    }
                }
            );
        });
    }, [projects]);


    return (
        <div id='ss-project' className={`flex flex-col gap-8`}>
            <div className={` ${className} `}>
                <h1 className='text-center text-lg md:text-2xl mb-section lg:text-4xl'>Project</h1>
                <h1 className='w-full text-center py-2'>
                    Implemented projects
                </h1>
            </div>
            <div className="bg-gray-200 ">
                <div ref={triggerRef} className={` grid grid-cols-1 gap-8 lg:mx-auto  mx-8 max-w-[800px] overflow-hidden my-10`} >
                    {
                        projects.map((e: any, index: any) => {
                            return (
                                <div ref={(el: any) => projectsRef.current[index] = el} key={e.name} className="col-span-1 relative">
                                    <div className="flex  lg:divide-x lg:divide-y-0 divide-y lg:flex-row flex-col gap-2 w-full bg-white rounded-3xl p-2">
                                        <div className=" bg-gray-200 relative min-w-[50%] group lg:w-1/2 w-full rounded-2xl ">
                                            <div className="w-full h-56 mx-auto my-auto overflow-hidden rounded-2xl">
                                                <Image
                                                    src={e.image}
                                                    width={1280}
                                                    height={1024}
                                                    alt=''
                                                    className='size-full object-cover rounded-2xl group-hover:scale-105 duration-300'
                                                />
                                            </div>
                                            <div className="absolute flex items-center gap-2 bottom-0 bg-[#545454] px-4 py-2 w-full rounded-br-2xl rounded-bl-2xl">
                                                <div className="size-8 min-w-8 min-h-8 max-h-8 max-w-8 w-[9%]">
                                                    <Image
                                                        src={e.imageUser}
                                                        width={1280}
                                                        height={1024}
                                                        alt=''
                                                        className='size-full object-cover rounded-full'
                                                    />
                                                </div>
                                                <div className="flex items-center justify-between w-[88%]">
                                                    <h1 className='lg:text-xl text-base text-white font-bold '>
                                                        {e.name}
                                                    </h1>
                                                    <div className="lg:text-sm text-xs  text-gray-400 font-semibold">
                                                        {e.date}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='px-4 py-2 flex flex-col gap-2'>
                                            <p className="lg:text-base text-sm  text-[#545454] font-semibold">
                                                {e.description}
                                            </p>
                                            <div className='flex items-center relative py-2'>
                                                {e.technology.map((t: any, index: any) => {
                                                    return (
                                                        <div
                                                            key={index}
                                                            className='size-5'
                                                            style={{
                                                                position: 'absolute',
                                                                zIndex: index * 10,
                                                                transform: `translateX(-${50 * index}%)`,
                                                                left: `${index * 22}px`,
                                                            }}
                                                        >
                                                            <Image
                                                                src={t.image}
                                                                width={1280}
                                                                height={1024}
                                                                alt=''

                                                                className='size-full object-cover rounded-full'
                                                            />
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                    {index == 0 &&
                                        <p ref={scrollToRef}
                                            className="scroll-to absolute left-1/2 -translate-x-1/2 -bottom-10 z-[9999] flex items-center cursor-pointer gap-2 font-mono  lg:text-lg text-xs ">
                                            Scroll down <FaAnglesDown className='animate-bounce text-sm' />
                                        </p>
                                    }
                                </div>
                            )

                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default SesionProject