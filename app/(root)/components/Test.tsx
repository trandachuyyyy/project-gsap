// "use client";
// import { useEffect, useRef } from "react";
// import gsap from "gsap";

// const Test = () => {
//     const containerRef = useRef(null);

//     useEffect(() => {
//         const cards = containerRef.current.querySelectorAll(".spiral-card");
//         const radius = 300; // bán kính xoắn ốc
//         const angleStep = 360 / cards.length;

//         cards.forEach((card, i) => {
//             const angle = angleStep * i;
//             const y = i * 50; // khoảng cách trục Y giữa các card
//             const z = radius;
//             gsap.set(card, {
//                 rotationY: angle,
//                 y: y,
//                 transformOrigin: "50% 50% -300px",
//                 transformPerspective: 1000,
//                 z: z,
//             });
//         });
//     }, []);

//     return (
//         <div className="relative h-[600px] perspective-1000 flex justify-center items-center">
//             <div ref={containerRef} className="relative w-[400px] h-[400px]">
//                 {[...Array(6)].map((_, i) => (
//                     <div
//                         key={i}
//                         className="spiral-card absolute w-40 h-60 bg-white border rounded shadow-lg flex items-center justify-center"
//                     >
//                         <span>Card {i + 1}</span>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default Test;
// import { useEffect, useRef, useState } from "react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import Image from "next/image";

// gsap.registerPlugin(ScrollTrigger);

// const SpiralScrollCards = () => {
//     const containerRef = useRef(null);
//     const cardRefs = useRef([]);
//     const [branches, setBranches] = useState([]);
//     const [sectionHeight, setSectionHeight] = useState(0);

//     useEffect(() => {
//         const cards = cardRefs.current;
//         const radius = 450;
//         const angleStep = 45; // 👈 Chỉnh chỗ này để luôn xoắn rõ ràng
//         const verticalStep = 200;

//         const updateCards = (progress) => {
//             const newBranches = [];

//             const sectionRect = containerRef.current.parentNode.getBoundingClientRect();
//             const sectionTopInViewport = sectionRect.top;

//             cards.forEach((card, i) => {
//                 const currentIndex = i - progress * cards.length;
//                 const angle = currentIndex * angleStep;
//                 const rad = (angle * Math.PI) / 180;

//                 const y = currentIndex * verticalStep;
//                 const x = Math.sin(rad) * radius;
//                 const z = Math.cos(rad) * radius;
//                 const rotationY = -angle;

//                 gsap.set(card, {
//                     x,
//                     y,
//                     z,
//                     rotationY,
//                     transformOrigin: "center center",
//                     transformPerspective: 1500,
//                     opacity: Math.abs(currentIndex) < 10 ? 1 : 0,
//                 });

//                 const rect = card.getBoundingClientRect();
//                 const cardX = rect.left + rect.width / 2;
//                 const cardY = rect.top + rect.height / 2 - sectionTopInViewport;
//                 const centerX = window.innerWidth / 2;

//                 newBranches.push({ x1: centerX, y1: cardY, x2: cardX, y2: cardY });
//             });

//             setBranches(newBranches);
//         };

//         ScrollTrigger.create({
//             trigger: containerRef.current,
//             start: "top top",
//             end: `+=${cards.length * verticalStep}`,
//             scrub: true,
//             onUpdate: (self) => {
//                 updateCards(self.progress);
//             },
//         });

//         const totalHeight = cards.length * verticalStep + window.innerHeight;
//         setSectionHeight(totalHeight);

//         updateCards(0);
//     }, []);

//     return (
//         <div style={{ height: `${sectionHeight}px` }} className="relative">
//             {/* SVG Layer */}
//             <div
//                 style={{
//                     position: "absolute",
//                     top: 0,
//                     left: 0,
//                     width: "100%",
//                     height: `${sectionHeight}px`,
//                     pointerEvents: "none",
//                     zIndex: 0,
//                 }}
//             >
//                 <svg style={{ width: "100%", height: "100%" }}>
//                     <line
//                         x1={window.innerWidth / 2}
//                         y1={0}
//                         x2={window.innerWidth / 2}
//                         y2={sectionHeight}
//                         stroke="red"
//                         strokeWidth="2"
//                     />
//                     {branches.map((line, idx) => (
//                         <line
//                             key={idx}
//                             x1={line.x1}
//                             y1={line.y1}
//                             x2={line.x2}
//                             y2={line.y2}
//                             stroke="red"
//                             strokeWidth="1.5"
//                         />
//                     ))}
//                 </svg>
//             </div>

//             {/* 3D Card Container */}
//             <div
//                 ref={containerRef}
//                 style={{ transformStyle: "preserve-3d" }}
//                 className="mx-auto sticky top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px]"
//             >
//                 {[...Array(7)].map((_, i) => (
//                     <div
//                         key={i}
//                         style={{ transformStyle: "preserve-3d" }}
//                         ref={(el) => (cardRefs.current[i] = el)}
//                         className="spiral-card absolute mt-[25vh] w-full flex items-center justify-center h-[200px]"
//                     >
//                         <div className="w-[300px] relative h-full bg-black border rounded-lg shadow-lg overflow-hidden">
//                             <Image
//                                 src="/profile/chil.jpg"
//                                 alt={`Card ${i}`}
//                                 width={800}
//                                 height={600}
//                                 className="size-full object-cover"
//                             />
//                             <div className="absolute bottom-2 left-2 text-white font-bold text-xl drop-shadow-lg">
//                                 Card {i + 1}
//                             </div>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default SpiralScrollCards;

// ok done
// import { useEffect, useRef, useState } from "react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import Image from "next/image";

// gsap.registerPlugin(ScrollTrigger);

// const SpiralScrollCards = () => {
//     const containerRef = useRef(null);
//     const svgRef = useRef(null);
//     const cardRefs = useRef([]);
//     const [branches, setBranches] = useState([]);
//     const [sectionHeight, setSectionHeight] = useState(0);

//     useEffect(() => {
//         const cards = cardRefs.current;
//         const radius = 450;
//         const angleStep = 360 / cards.length;
//         const verticalStep = 200;

//         const updateCards = (progress) => {
//             const newBranches = [];

//             const sectionRect = containerRef.current.parentNode.getBoundingClientRect(); // Section cha
//             const sectionTopInViewport = sectionRect.top;

//             cards.forEach((card, i) => {
//                 const currentIndex = i - progress * cards.length;
//                 const angle = currentIndex * angleStep;
//                 const rad = (angle * Math.PI) / 180;

//                 const y = currentIndex * verticalStep;
//                 const x = Math.sin(rad) * radius;
//                 const z = Math.cos(rad) * radius;
//                 const rotationY = -angle;

//                 gsap.set(card, {
//                     x,
//                     y,
//                     z,
//                     rotationY,
//                     transformOrigin: "center center",
//                     transformPerspective: 1500,
//                     opacity: Math.abs(currentIndex) < 10 ? 1 : 0,
//                 });

//                 // Tính position chính xác trong section
//                 const rect = card.getBoundingClientRect();
//                 const cardX = rect.left + rect.width / 2;
//                 const cardY = rect.top + rect.height / 2 - sectionTopInViewport;

//                 const centerX = window.innerWidth / 2;

//                 newBranches.push({ x1: centerX, y1: cardY, x2: cardX, y2: cardY });
//             });

//             setBranches(newBranches);
//         };

//         ScrollTrigger.create({
//             trigger: containerRef.current,
//             start: "top top",
//             end: `+=${cards.length * verticalStep}`,
//             scrub: true,
//             onUpdate: (self) => {
//                 updateCards(self.progress);
//             },
//         });

//         // Set height to bound the SVG later
//         const totalHeight = cards.length * verticalStep + window.innerHeight;
//         setSectionHeight(totalHeight);

//         updateCards(0);
//     }, []);

//     return (
//         <div style={{ height: `${sectionHeight}px` }} className="relative ">
//             {/* SVG Layer chỉ trong section */}
//             <div
//                 style={{
//                     position: "absolute",
//                     top: 0,
//                     left: 0,
//                     width: "100%",
//                     height: `${sectionHeight}px`,
//                     pointerEvents: "none",
//                     zIndex: 0,
//                 }}
//             >
//                 <svg style={{ width: "100%", height: "100%" }}>
//                     <line
//                         x1={window.innerWidth / 2}
//                         y1={0}
//                         x2={window.innerWidth / 2}
//                         y2={sectionHeight}
//                         stroke="red"
//                         strokeWidth="2"
//                     />
//                     {branches.map((line, idx) => (
//                         <line
//                             key={idx}
//                             x1={line.x1}
//                             y1={line.y1}
//                             x2={line.x2}
//                             y2={line.y2}
//                             stroke="red"
//                             strokeWidth="1.5"
//                         />
//                     ))}
//                 </svg>
//             </div>

//             {/* 3D Card Container */}
//             <div
//                 ref={containerRef}
//                 style={{ transformStyle: "preserve-3d" }}
//                 className="mx-auto sticky top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px]"
//             >
//                 {[...Array(7)].map((_, i) => (
//                     <div
//                         key={i}
//                         style={{ transformStyle: "preserve-3d" }}
//                         ref={(el) => (cardRefs.current[i] = el)}
//                         className="spiral-card absolute mt-[25vh] w-full flex items-center justify-center h-[200px] "
//                     >
//                         <div className="w-[300px] relative h-full  bg-black  border rounded-lg shadow-lg overflow-hidden">
//                             <Image
//                                 src="/profile/chil.jpg"
//                                 alt={`Card ${i}`}
//                                 width={800}
//                                 height={600}
//                                 className="size-full object-cover"
//                             />
//                             <div className="absolute bottom-2 left-2 text-white font-bold text-xl drop-shadow-lg">
//                                 Card {i + 1}
//                             </div>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default SpiralScrollCards;

// ok1
// import { useEffect, useRef, useState } from "react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import Image from "next/image";

// gsap.registerPlugin(ScrollTrigger);

// const SpiralScrollCards = () => {
//     const containerRef = useRef(null);
//     const svgRef = useRef(null);
//     const cardRefs = useRef([]);
//     const [branches, setBranches] = useState([]);
//     const [sectionHeight, setSectionHeight] = useState(0);

//     useEffect(() => {
//         const cards = cardRefs.current;
//         const radius = 450;
//         const angleStep = 360 / cards.length;
//         const verticalStep = 200;

//         const updateCards = (progress) => {
//             const newBranches = [];

//             const sectionRect = containerRef.current.parentNode.getBoundingClientRect(); // Section cha
//             const sectionTopInViewport = sectionRect.top;

//             cards.forEach((card, i) => {
//                 const currentIndex = i - progress * cards.length;
//                 const angle = currentIndex * angleStep;
//                 const rad = (angle * Math.PI) / 180;

//                 const y = currentIndex * verticalStep;
//                 const x = Math.sin(rad) * radius;
//                 const z = Math.cos(rad) * radius;
//                 const rotationY = -angle;

//                 gsap.set(card, {
//                     x,
//                     y,
//                     z,
//                     rotationY,
//                     transformOrigin: "center center",
//                     transformPerspective: 1500,
//                     opacity: Math.abs(currentIndex) < 10 ? 1 : 0,
//                 });

//                 // Tính position chính xác trong section
//                 const rect = card.getBoundingClientRect();
//                 const cardX = rect.left + rect.width / 2;
//                 const cardY = rect.top + rect.height / 2 - sectionTopInViewport;

//                 const centerX = window.innerWidth / 2;

//                 newBranches.push({ x1: centerX, y1: cardY, x2: cardX, y2: cardY });
//             });

//             setBranches(newBranches);
//         };

//         ScrollTrigger.create({
//             trigger: containerRef.current,
//             start: "top top",
//             end: `+=${cards.length * verticalStep}`,
//             scrub: true,
//             onUpdate: (self) => {
//                 updateCards(self.progress);
//             },
//         });

//         // Set height to bound the SVG later
//         const totalHeight = cards.length * verticalStep + window.innerHeight;
//         setSectionHeight(totalHeight);

//         updateCards(0);
//     }, []);

//     return (
//         <div style={{ height: `${sectionHeight}px` }} className="relative">
//             {/* SVG Layer chỉ trong section */}
//             <div
//                 style={{
//                     position: "absolute",
//                     top: 0,
//                     left: 0,
//                     width: "100%",
//                     height: `${sectionHeight}px`,
//                     pointerEvents: "none",
//                     zIndex: 0,
//                 }}
//             >
//                 <svg style={{ width: "100%", height: "100%" }}>
//                     <line
//                         x1={window.innerWidth / 2}
//                         y1={0}
//                         x2={window.innerWidth / 2}
//                         y2={sectionHeight}
//                         stroke="red"
//                         strokeWidth="2"
//                     />
//                     {branches.map((line, idx) => (
//                         <line
//                             key={idx}
//                             x1={line.x1}
//                             y1={line.y1}
//                             x2={line.x2}
//                             y2={line.y2}
//                             stroke="red"
//                             strokeWidth="1.5"
//                         />
//                     ))}
//                 </svg>
//             </div>

//             {/* 3D Card Container */}
//             <div
//                 ref={containerRef}
//                 style={{ transformStyle: "preserve-3d" }}
//                 className="sticky top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 perspective-[1500px] w-[500px] h-[500px] mx-auto"
//             >
//                 {[...Array(7)].map((_, i) => (
//                     <div
//                         key={i}
//                         ref={(el) => (cardRefs.current[i] = el)}
//                         className="spiral-card absolute w-[300px] h-[200px] bg-black border rounded-lg shadow-lg overflow-hidden"
//                     >
//                         <Image
//                             src="/profile/chil.jpg"
//                             alt={`Card ${i}`}
//                             width={800}
//                             height={600}
//                             className="h-full w-full object-cover"
//                         />
//                         <div className="absolute bottom-2 left-2 text-white font-bold text-xl drop-shadow-lg">
//                             Card {i + 1}
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default SpiralScrollCards;

// ok
// "use client";
// import { useEffect, useRef, useState } from "react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import Image from "next/image";

// gsap.registerPlugin(ScrollTrigger);

// const SpiralScrollCards = () => {
//     const containerRef = useRef(null);
//     const cardRefs = useRef([]);
//     const [branches, setBranches] = useState([]);

//     useEffect(() => {
//         const cards = cardRefs.current;
//         const radius = 450;
//         const angleStep = 360 / cards.length;
//         const verticalStep = 200;

//         const updateCards = (progress) => {
//             const newBranches = [];

//             cards.forEach((card, i) => {
//                 const currentIndex = i - progress * cards.length;
//                 const angle = currentIndex * angleStep;
//                 const rad = (angle * Math.PI) / 180;

//                 const y = currentIndex * verticalStep;
//                 const x = Math.sin(rad) * radius;
//                 const z = Math.cos(rad) * radius;
//                 const rotationY = -angle;

//                 gsap.set(card, {
//                     x,
//                     y,
//                     z,
//                     rotationY,
//                     rotationX: 0,
//                     transformOrigin: "center center",
//                     transformPerspective: 1500,
//                     opacity: Math.abs(currentIndex) < 10 ? 1 : 0,
//                 });

//                 // Tính vị trí 2D của card để vẽ nhánh
//                 const rect = card.getBoundingClientRect();
//                 const cardX = rect.left + rect.width / 2;
//                 const cardY = rect.top + rect.height / 2;

//                 // Trục chính ở giữa màn hình (centerX)
//                 const centerX = window.innerWidth / 2;

//                 newBranches.push({ x1: centerX, y1: cardY, x2: cardX, y2: cardY });
//             });

//             setBranches(newBranches);
//         };

//         ScrollTrigger.create({
//             trigger: containerRef.current,
//             start: "top top",
//             end: `+=${cards.length * verticalStep}`,
//             scrub: true,
//             onUpdate: (self) => {
//                 updateCards(self.progress);
//             },
//         });

//         updateCards(0);
//     }, []);

//     return (
//         <div style={{ height: `${7 * 200 + window.innerHeight}px` }} className="relative">
//             {/* SVG Layer */}
//             <svg className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
//                 {/* Trục dọc */}
//                 <line
//                     x1={window.innerWidth / 2}
//                     y1={0}
//                     x2={window.innerWidth / 2}
//                     y2={window.innerHeight}
//                     stroke="red"
//                     strokeWidth="2"
//                 />
//                 {/* Nhánh nối từng card */}
//                 {branches.map((line, idx) => (
//                     <line
//                         key={idx}
//                         x1={line.x1}
//                         y1={line.y1}
//                         x2={line.x2}
//                         y2={line.y2}
//                         stroke="red"
//                         strokeWidth="1.5"
//                     />
//                 ))}
//             </svg>

//             {/* 3D Card Container */}
//             <div
//                 ref={containerRef}
//                 style={{ transformStyle: "preserve-3d" }}
//                 className="sticky top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 perspective-[1500px] w-[500px] h-[500px] mx-auto"
//             >
//                 {[...Array(7)].map((_, i) => (
//                     <div
//                         key={i}
//                         ref={(el) => (cardRefs.current[i] = el)}
//                         className="spiral-card absolute w-[300px] h-[200px] bg-black border rounded-lg shadow-lg overflow-hidden"
//                     >
//                         <Image
//                             src="/profile/chil.jpg"
//                             alt={`Card ${i}`}
//                             width={800}
//                             height={600}
//                             className="h-full w-full object-cover"
//                         />
//                         <div className="absolute bottom-2 left-2 text-white font-bold text-xl drop-shadow-lg">
//                             Card {i + 1}
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default SpiralScrollCards;

// "use client";
// import { useEffect, useRef } from "react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import Image from "next/image";

// gsap.registerPlugin(ScrollTrigger);

// const SpiralScrollCards = () => {
//     const containerRef = useRef(null);

//     useEffect(() => {
//         const cards = containerRef.current.querySelectorAll(".spiral-card");
//         const radius = 450;
//         const angleStep = 360 / cards.length;
//         const verticalStep = 200;

//         const updateCards = (progress) => {
//             cards.forEach((card, i) => {
//                 const currentIndex = i - progress * cards.length;
//                 const angle = currentIndex * angleStep;
//                 const rad = (angle * Math.PI) / 180;

//                 const y = currentIndex * verticalStep;
//                 const x = Math.sin(rad) * radius;
//                 const z = Math.cos(rad) * radius;

//                 const rotationY = Math.atan2(x, z) * (180 / Math.PI); // cập nhật góc nhìn

//                 gsap.set(card, {
//                     x,
//                     y,
//                     z,
//                     rotationY,
//                     rotationX: 0,
//                     transformOrigin: "center center",
//                     transformPerspective: 1500,
//                     opacity: Math.abs(currentIndex) < 10 ? 1 : 0,
//                 });
//             });
//         };

//         ScrollTrigger.create({
//             trigger: containerRef.current,
//             start: "top top",
//             end: `+=${cards.length * verticalStep}`,
//             scrub: true,
//             onUpdate: (self) => {
//                 updateCards(self.progress);
//             },
//         });

//         updateCards(0);
//     }, []);

//     return (
//         <div style={{ height: `${7 * 150 + window.innerHeight}px` }}>
//             <div
//                 ref={containerRef}
//                 style={{ transformStyle: "preserve-3d" }}
//                 className=" sticky top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 perspective-[1500px] w-[500px] h-[500px] mx-auto"
//             >
//                 {[...Array(7)].map((_, i) => (
//                     <div
//                         key={i}
//                         className="spiral-card absolute w-[300px] h-[200px] bg-white border rounded-lg shadow-lg overflow-hidden"
//                     >
//                         <Image
//                             src="/profile/chil.jpg" // thay bằng ảnh thật của bạn
//                             alt={`Card ${i}`}
//                             width={800}
//                             height={600}
//                             className="h-full w-full object-cover"
//                         />
//                         <div className="absolute bottom-2 left-2 text-white font-bold text-xl drop-shadow-lg">
//                             Card {i + 1}
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default SpiralScrollCards;

// export default SpiralScrollCards;

// "use client";
// import { useEffect, useRef } from "react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// const SpiralScrollCards = () => {
//     const containerRef = useRef(null);

//     useEffect(() => {
//         const cards = containerRef.current.querySelectorAll(".spiral-card");
//         const radius = 300;
//         const verticalStep = 100;
//         const angleStep = 360 / cards.length; // đúng 1 vòng tròn

//         const updateCards = (progress) => {
//             cards.forEach((card, i) => {
//                 const currentIndex = i - progress * cards.length;
//                 const angle = currentIndex * angleStep;
//                 const rad = (angle * Math.PI) / 180;

//                 const x = Math.cos(rad) * radius;
//                 const z = Math.sin(rad) * radius;
//                 const y = currentIndex * verticalStep;

//                 gsap.set(card, {
//                     x,
//                     y,
//                     z,
//                     rotationY: angle,
//                     transformOrigin: "center center",
//                     transformPerspective: 1000,
//                     opacity: Math.abs(currentIndex) < 10 ? 1 : 0,
//                 });
//             });
//         };

//         ScrollTrigger.create({
//             trigger: containerRef.current,
//             start: "top top",
//             end: `+=${cards.length * verticalStep}`, // chính xác 1 vòng cuộn
//             scrub: true,
//             onUpdate: (self) => {
//                 updateCards(self.progress);
//             },
//         });

//         updateCards(0);
//     }, []);

//     return (
//         <div style={{ height: `${7 * 100 + window.innerHeight}px` }}>
//             {" "}
//             {/* vùng cuộn vừa đủ */}
//             <div
//                 ref={containerRef}
//                 className="sticky top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 perspective-[1000px] w-[500px] h-[500px] mx-auto"
//             >
//                 {[...Array(7)].map((_, i) => (
//                     <div
//                         key={i}
//                         className="spiral-card absolute w-40 h-60 bg-white border rounded shadow-lg flex items-center justify-center text-black"
//                     >
//                         <span>Card {i + 1}</span>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default SpiralScrollCards;
