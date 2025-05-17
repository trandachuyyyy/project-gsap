"use client";
import React, { useEffect } from "react";
import SesionHome from "./components/SesionHome";
import SesionAbout from "./components/SesionAbout";
import SesionProject from "./components/SesionProject";
import SesionSkills from "./components/SesionSkills";
import SesionDetailAbout from "./components/SesionDetailAbout";
import SesionOtherText from "./components/SesionOtherText";
import SectionFalling from "./components/SectionFalling";
import dynamic from "next/dynamic";
import HorizontalScrollingSections from "./components/SectionParallaxSection";
import SectionDrawMyName from "./components/SectionDrawMyName";
// import ThreeScrollScene from "./components/Profile3DCanvas";
// import Modal from "./components/Modal";
import ModalCanvas from "./components/Modal";
const DynamicCanvas = dynamic(() => Promise.resolve(ModalCanvas), { ssr: false });
import { addListener, launch, removeListener } from "devtools-detector";
import { useRouter } from "next/navigation";
// const Profile3DCanvas = dynamic(() => import("./components/Profile3DCanvas"), { ssr: false });
const Page = () => {
    const router = useRouter();
    useEffect(() => {
        // Thêm listener để phát hiện khi DevTools được mở hoặc đóng
        const listener = (isOpen: boolean) => {
            if (isOpen) {
                router.push("/myDevTools");
                // alert("DevTools đã được mở!");
            }
        };

        addListener(listener);
        launch(); // Bắt đầu phát hiện

        return () => {
            // Dọn dẹp khi component bị hủy
            removeListener(listener);
        };
    }, []);
    return (
        <div id="scroll-root" data-hero className="h-full flex flex-col bg-gray-100 ">
            {/* <ThreeScrollScene /> */}
            <SesionHome className="px-8 " />
            <SectionDrawMyName />
            <HorizontalScrollingSections />
            <SesionOtherText />
            <SesionSkills className="px-8" />
            <SesionProject className="px-8" />
            <SesionAbout className="px-8" />
            <SectionFalling />
            {/* <SesionDetailAbout className='px-8' /> */}
        </div>
    );
};

export default Page;
