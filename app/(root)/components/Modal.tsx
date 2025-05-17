"use client";
import React, { useEffect, useRef, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF, useTexture } from "@react-three/drei";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);

export default function ModalCanvas() {
    return (
        <Canvas style={{ touchAction: "auto" }} camera={{ position: [0, 0, 5], fov: 50 }}>
            <Suspense fallback={null}>
                <SceneContent />
            </Suspense>
        </Canvas>
    );
}
function SceneContent() {
    const orbitRef = useRef<any>(null);
    const { camera } = useThree();
    const gltf = useGLTF("/model/sample.glb");
    const texture = useTexture("/model/gltf_embedded_0.png");

    const userInteracted = useRef(false);
    const timelineRef = useRef<gsap.core.Timeline | null>(null);

    const easing = "power3.inOut";
    const duration = 1.2;

    const keyframes = [
        { pos: [0, 0, 3], rot: [0, 0, 0], scl: 1 },
        { pos: [0, 3, 5], rot: [-0.3, -Math.PI / 4, 0.1], scl: 1.1 },
        { pos: [2, 0, 4], rot: [0.1, 0.1, 0.1], scl: 1 },
        { pos: [-2, 0, 2], rot: [0, -0.5, 0], scl: 1.2 },
        { pos: [0, 0, 2], rot: [0, Math.PI, 0], scl: 1 },
        { pos: [2, 0, 3], rot: [0, 2 * Math.PI, 0.2], scl: 1.1 },
        { pos: [0, 0, 2], rot: [0, -0.4, 0.2], scl: 1 },
    ];

    const rebuildTimeline = () => {
        const scene = gltf.scene;
        scene.visible = false;

        ScrollTrigger.create({
            trigger: "#ss-draw-my-name",
            start: "top center",
            // onEnter: () => {
            //     scene.visible = true;

            //     const start = keyframes[0];
            //     scene.position.set(...(start.pos as [number, number, number]));
            //     scene.rotation.set(...(start.rot as [number, number, number]));
            //     scene.scale.setScalar(start.scl);

            //     // ✅ Animate từ trái sang phải khi vào view
            //     scene.position.x = start.pos[0] - 1.5;
            //     gsap.to(scene.position, {
            //         x: start.pos[0],
            //         duration: 1.2,
            //         ease: "power3.out",
            //     });

            //     if (timelineRef.current) timelineRef.current.seek(0);
            // },

            onEnter: () => {
                scene.visible = true;

                const start = keyframes[0];

                // Đặt vị trí ban đầu xa hơn bên trái
                scene.position.set(start.pos[0] - 5, start.pos[1], start.pos[2]);
                scene.rotation.set(...(start.rot as [number, number, number]));
                scene.scale.setScalar(start.scl);

                gsap.to(scene.position, {
                    x: start.pos[0],
                    duration: 1.5,
                    ease: "expo.out", // hoặc "power3.out"
                });

                if (timelineRef.current) timelineRef.current.seek(0);
            },

            onLeaveBack: () => {
                scene.visible = false;
                if (timelineRef.current) timelineRef.current.seek(0);
            },
        });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: "#scroll-root",
                start: "top top",
                end: "bottom bottom",
                scrub: true,
            },
        });

        keyframes.forEach((k, i) => {
            tl.to(scene.position, { x: k.pos[0], y: k.pos[1], z: k.pos[2], duration, ease: easing }, i * duration);
            tl.to(scene.rotation, { x: k.rot[0], y: k.rot[1], z: k.rot[2], duration, ease: easing }, i * duration);
            tl.to(
                scene.scale,
                { x: k.scl, y: k.scl, z: k.scl, duration: duration * 0.8, ease: "elastic.out(1, 0.3)" },
                i * duration
            );
        });

        tl.to(
            camera.position,
            {
                x: "+=0.1",
                y: "+=0.2",
                z: "+=0",
                duration: keyframes.length * duration,
                ease: "sine.inOut",
                onUpdate: () => {
                    camera.lookAt(scene.position);
                },
            },
            0
        );

        timelineRef.current = tl;
    };

    useEffect(() => {
        const scene = gltf.scene;

        scene.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
                const mesh = child as THREE.Mesh;
                mesh.material = new THREE.MeshStandardMaterial({ map: texture });
            }
        });

        rebuildTimeline();

        const controls = orbitRef.current;
        const stopScrollAnimation = () => {
            userInteracted.current = true;
            ScrollTrigger.getAll().forEach((trigger) => trigger.disable());
        };
        controls?.addEventListener("start", stopScrollAnimation);

        return () => controls?.removeEventListener("start", stopScrollAnimation);
    }, [camera, gltf.scene, texture]);

    useEffect(() => {
        const onScroll = () => {
            if (userInteracted.current) {
                userInteracted.current = false;
                ScrollTrigger.getAll().forEach((trigger) => trigger.enable());
                rebuildTimeline();
            }
        };

        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useFrame(() => {
        if (gltf.scene.visible && !userInteracted.current) {
            gltf.scene.rotation.y += 0.005;
        }
    });

    return (
        <>
            <primitive object={gltf.scene} />
            <ambientLight intensity={1} />
            <directionalLight position={[3, 3, 5]} intensity={1.8} castShadow />
            <OrbitControls ref={orbitRef} enableZoom={false} enablePan={false} />
        </>
    );
}
