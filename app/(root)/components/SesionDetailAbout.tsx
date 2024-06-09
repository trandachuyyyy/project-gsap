'use client';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useEffect, useRef, useState } from 'react';

gsap.registerPlugin(ScrollTrigger);

const SessionDetailAbout = ({ className }: { className: string }) => {
    const panelsRef = useRef<HTMLDivElement[]>([]); // Array to store references to panels([]);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isNewDivVisible, setIsNewDivVisible] = useState<boolean>(false);

    // useEffect(() => {
    //     panelsRef.current.forEach((panel, index) => {
    //         gsap.to(panel, {
    //             x: index * -100 + '%',
    //             duration: 5,
    //             ease: 'power1.inOut',
    //             scrollTrigger: {
    //                 trigger: containerRef.current,
    //                 start: 'top center',
    //                 end: 'top bottom',
    //                 scrub: 5,
    //                 onEnterBack: () => console.log('Cuộn hết nội dung'),
    //             },
    //         });
    //     });
    // }, [])


    return (
        <div id='ss-about' className='content-about-detail flex flex-col gap-8 overflow-hidden'>
            <h1 className='text-center text-lg md:text-2xl mb-section lg:text-4xl'>Details about me</h1>
            <h1 className='w-full text-center px-8 py-2'>My process and development</h1>
            <div ref={containerRef}
                className="panel-container" style={{ display: 'flex', overflowX: 'hidden', height: '200px', width: '100vw' }}>
                {['red', 'blue', 'green', 'yellow', 'purple'].map((color, index) => (
                    <div
                        key={index}
                        className="panel w-full min-w-[100vw] h-full"
                        ref={(el: any) => panelsRef.current[index] = el}
                        style={{
                            backgroundColor: color,
                        }}
                    >
                        Panel {index + 1}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SessionDetailAbout;
