"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";

const CanvasScene = ({ onComplete }: { onComplete: () => void }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const frameId = useRef<number | null>(null);
    const stopRender = useRef(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const scene = new THREE.Scene();
        const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 10);
        camera.position.z = 1;

        const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);

        const createPanel = (x: number) => {
            const geometry = new THREE.PlaneGeometry(1, 2);
            const material = new THREE.MeshBasicMaterial({ color: 0x000000 });
            const mesh = new THREE.Mesh(geometry, material);
            mesh.position.x = x;
            return mesh;
        };

        const leftPanel = createPanel(-1.5);
        const rightPanel = createPanel(1.5);

        scene.add(leftPanel, rightPanel);

        const render = () => {
            renderer.render(scene, camera);
        };

        const loop = () => {
            if (stopRender.current) return;
            render();
            frameId.current = requestAnimationFrame(loop);
        };
        loop();

        // Step 1: Slide in to center
        gsap.to([leftPanel.position, rightPanel.position], {
            x: 0,
            duration: 0.7,
            ease: "power4.inOut",
            stagger: { each: 0.05 },
            onComplete: () => {
                onComplete?.(); // Chuyển màn
                // Step 2: Slide out
                gsap.to(leftPanel.position, {
                    x: -1.5,
                    duration: 0.8,
                    delay: 0.4,
                    ease: "expo.inOut",
                });
                gsap.to(rightPanel.position, {
                    x: 1.5,
                    duration: 0.8,
                    delay: 0.4,
                    ease: "expo.inOut",
                    onComplete: () => {
                        stopRender.current = true;
                        if (frameId.current) cancelAnimationFrame(frameId.current);
                        renderer.dispose();
                        renderer.forceContextLoss?.();
                    },
                });
            },
        });

        return () => {
            stopRender.current = true;
            if (frameId.current) cancelAnimationFrame(frameId.current);
        };
    }, []);

    return <canvas ref={canvasRef} className="fixed top-0 left-0 w-screen h-screen z-[9999]" />;
};

export default CanvasScene;
