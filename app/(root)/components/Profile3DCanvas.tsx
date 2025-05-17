"use client";

import { useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Text, Box, Environment, PerspectiveCamera } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import type * as THREE from "three";

// Đảm bảo GSAP được đăng ký ở phía client
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

function Scene() {
    const boxRef = useRef<THREE.Mesh>(null);
    const textRef = useRef<any>(null);
    const cameraRef = useRef<THREE.PerspectiveCamera>(null);

    // Sử dụng GSAP với ScrollTrigger
    useGSAP(() => {
        // Đảm bảo ScrollTrigger được refresh khi component mount
        ScrollTrigger.refresh();

        // Animation cho box
        gsap.timeline({
            scrollTrigger: {
                trigger: "body", // Sử dụng body làm trigger thay vì container riêng
                start: "top top",
                end: "bottom bottom",
                scrub: 1,
            },
        })
            .to(boxRef.current?.rotation || {}, {
                y: Math.PI * 2,
                x: Math.PI * 0.5,
                duration: 2,
            })
            .to(
                boxRef.current?.position || {},
                {
                    z: -3,
                    duration: 2,
                },
                0
            );

        // Animation cho text
        gsap.timeline({
            scrollTrigger: {
                trigger: "body",
                start: "20% top",
                end: "60% bottom",
                scrub: 1,
            },
        })
            .to(textRef.current?.position || {}, {
                y: 2,
                z: -2,
                duration: 2,
            })
            .to(
                textRef.current?.material || {},
                {
                    opacity: 0,
                    duration: 1,
                },
                1
            );

        // Animation cho camera
        gsap.timeline({
            scrollTrigger: {
                trigger: "body",
                start: "60% top",
                end: "bottom bottom",
                scrub: 1,
            },
        }).to(cameraRef.current?.position || {}, {
            z: 8,
            y: 2,
            duration: 3,
        });

        // Cleanup function
        return () => {
            // Xóa tất cả ScrollTrigger instances khi component unmount
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill(false));
        };
    }, []);

    return (
        <>
            <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 0, 5]} />
            <Environment preset="sunset" />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />

            <Box ref={boxRef} position={[0, 0, 0]} args={[1, 1, 1]}>
                <meshStandardMaterial color="#00b894" />
            </Box>
        </>
    );
}

export default function ThreeScrollScene() {
    // Tích hợp với Lenis nếu nó đã được khởi tạo
    useEffect(() => {
        // Kiểm tra xem Lenis đã được khởi tạo chưa
        if ((window as any).__lenis) {
            const lenis = (window as any).__lenis;

            // Kết nối Lenis với ScrollTrigger
            lenis.on("scroll", ScrollTrigger.update);
        }

        // Đảm bảo ScrollTrigger được cập nhật khi window resize
        const updateScrollTrigger = () => {
            ScrollTrigger.refresh();
        };

        window.addEventListener("resize", updateScrollTrigger);

        return () => {
            window.removeEventListener("resize", updateScrollTrigger);
        };
    }, []);

    return (
        <div className="fixed top-0 left-0 w-full h-screen z-[0] pointer-events-none">
            <Canvas>
                <Scene />
            </Canvas>
        </div>
    );
}
