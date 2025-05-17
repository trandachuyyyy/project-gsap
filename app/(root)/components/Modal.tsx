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
        <Canvas shadows camera={{ position: [0, 0, 5], fov: 50 }} style={{ pointerEvents: "none" }}>
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
    const userInteracted = useRef(false);
    const texture = useTexture("/model/gltf_embedded_0.png");
    // 👇 Mỗi section có hiệu ứng riêng biệt
    const sectionTransforms: Record<string, { pos: number[]; rot: number[]; scl: number }> = {
        "ss-home": {
            pos: [0, 0, 3.5],
            rot: [0, 0, 0],
            scl: 0.6,
        },
        "ss-draw-my-name": {
            pos: [0, 0.2, 3.1],
            rot: [0.15, 0.3, 0],
            scl: 0.65,
        },
        "ss-experience": {
            pos: [1.8, 1, 3.2],
            rot: [0.3, -0.8, 0],
            scl: 0.7,
        },
        "ss-other": {
            pos: [-1.5, 1, 3.3],
            rot: [0.2, 0.6, 0.1],
            scl: 0.75,
        },
        "ss-skills": {
            // pos: [0, 2, 3.6],
            // rot: [-0.5, 0.1, 0],
            // scl: 0.8,
            pos: [-1.5, 1, 3.3],
            rot: [0.2, 0.6, 0.1],
            scl: 0.75,
        },
        "ss-project": {
            // pos: [2.5, -0.5, 3], // sát phải
            // rot: [0.2, Math.PI / 1.2, 0.1], // nghiêng mạnh phải
            // scl: 0.65,
            pos: [0, 2, 3.6],
            rot: [-0.5, 0.1, 0],
            scl: 0.8,
        },

        "ss-about": {
            // pos: [0, 0.5, 2.8],
            // rot: [0.1, Math.PI / 4, 0],
            // scl: 0.6,
            pos: [0, 2, 3.6],
            rot: [-0.5, 0.1, 0],
            scl: 0.8,
            // pos: [-1.5, 1, 3.3],
            // rot: [0.2, 0.6, 0.1],
            // scl: 0.75,
        },
        "ss-falling": {
            pos: [0, 0, 2.6],
            rot: [0.2, 0, 0],
            scl: 0.5,
        },
    };

    const animateTo = (target: { pos: number[]; rot: number[]; scl: number }) => {
        const scene = gltf.scene;
        gsap.to(scene.position, {
            x: target.pos[0],
            y: target.pos[1],
            z: target.pos[2],
            duration: 1,
            ease: "power2.out",
        });
        gsap.to(scene.rotation, {
            x: target.rot[0],
            y: target.rot[1],
            z: target.rot[2],
            duration: 1,
            ease: "power2.inOut",
        });
        gsap.to(scene.scale, {
            x: target.scl,
            y: target.scl,
            z: target.scl,
            duration: 1,
            ease: "elastic.out(1, 0.3)",
        });

        gsap.to(camera.position, {
            x: target.pos[0],
            y: target.pos[1] + 0.3,
            z: target.pos[2] + 1.5,
            duration: 1,
            ease: "sine.inOut",
            onUpdate: () => camera.lookAt(scene.position),
        });
    };

    useEffect(() => {
        const scene = gltf.scene;
        scene.visible = true;

        // 👉 KHÔNG override material → giữ màu mặc định từ GLB
        scene.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
                const mesh = child as THREE.Mesh;
                mesh.material = new THREE.MeshStandardMaterial({ map: texture });
                mesh.castShadow = true;
                mesh.receiveShadow = true;
            }
        });

        // 👇 Đăng ký ScrollTrigger cho từng section
        Object.entries(sectionTransforms).forEach(([id, transform]) => {
            ScrollTrigger.create({
                trigger: `#${id}`,
                start: "top center",
                onEnter: () => animateTo(transform),
                onEnterBack: () => animateTo(transform),
            });
        });

        // 👂 Tắt animation scroll khi user xoay model
        const controls = orbitRef.current;
        const disableScrollTrigger = () => {
            userInteracted.current = true;
            ScrollTrigger.getAll().forEach((t) => t.disable());
        };
        controls?.addEventListener("start", disableScrollTrigger);

        return () => controls?.removeEventListener("start", disableScrollTrigger);
    }, [gltf, camera]);

    useEffect(() => {
        const reEnableScroll = () => {
            if (userInteracted.current) {
                userInteracted.current = false;
                ScrollTrigger.getAll().forEach((t) => t.enable());
            }
        };
        window.addEventListener("scroll", reEnableScroll);
        return () => window.removeEventListener("scroll", reEnableScroll);
    }, []);

    useFrame(() => {
        if (gltf.scene.visible && !userInteracted.current) {
            gltf.scene.rotation.y += 0.003;
        }
    });

    return (
        <>
            <primitive object={gltf.scene} />
            <ambientLight intensity={1.4} />
            <directionalLight position={[3, 3, 5]} intensity={2.5} castShadow />
            <OrbitControls ref={orbitRef} enableZoom={false} enablePan={false} />
        </>
    );
}
