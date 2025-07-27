"use client";
import SesionHome from "./components/SesionHome";
// const SesionHome = dynamic(() => import("./components/SesionHome"), { ssr: false });
import SesionAbout from "./components/SesionAbout";
// const SesionAbout = dynamic(() => import("./components/SesionAbout"), { ssr: false });
import SesionProject from "./components/SesionProject";
// const SesionProject = dynamic(() => import("./components/SesionProject"), { ssr: false });
import SesionSkills from "./components/SesionSkills";
// const SesionSkills = dynamic(() => import("./components/SesionSkills"), { ssr: false });

import SesionOtherText from "./components/SesionOtherText";
// const SesionOtherText = dynamic(() => import("./components/SesionOtherText"), { ssr: false });
import SectionFalling from "./components/SectionFalling";
// const SectionFalling = dynamic(() => import("./components/SectionFalling"), { ssr: false });
import HorizontalScrollingSections from "./components/SectionParallaxSection";
// const HorizontalScrollingSections = dynamic(() => import("./components/SectionParallaxSection"), { ssr: false });
import SectionDrawMyName from "./components/SectionDrawMyName";
// const SectionDrawMyName = dynamic(() => import("./components/SectionDrawMyName"), { ssr: false });

// import ThreeScrollScene from "./components/Profile3DCanvas";
// import Modal from "./components/Modal";
// // const DynamicCanvas = dynamic(() => Promise.resolve(ModalCanvas), { ssr: false });
import { useRouter } from "next/navigation";
import SectionExperience from "./components/SectionExperience";
import SectionSpiralScrollCards from "./components/SectionSpiralScrollCards";
import ProjectsShowcase from "./components/ProjectsShowcase";
// const SectionExperience = dynamic(() => import("./components/SectionExperience"), { ssr: false });
// const Profile3DCanvas = dynamic(() => import("./components/Profile3DCanvas"), { ssr: false });
const Page = () => {
    const router = useRouter();
    // useEffect(() => {
    //     // Thêm listener để phát hiện khi DevTools được mở hoặc đóng
    //     const listener = (isOpen: boolean) => {
    //         if (isOpen) {
    //             router.push("/myDevTools");
    //             // alert("DevTools đã được mở!");
    //         }
    //     };

    //     addListener(listener);
    //     launch(); // Bắt đầu phát hiện

    //     return () => {
    //         // Dọn dẹp khi component bị hủy
    //         removeListener(listener);
    //     };
    // }, []);
    return (
        <div id="scroll-root" data-hero className="h-full flex flex-col bg-gray-100 ">
            {/* <div
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100vw",
                    height: "100vh",
                    zIndex: 999,
                    pointerEvents: "none",
                    touchAction: "auto",
                }}
            >
                <DynamicCanvas />
            </div> */}
            {/* <ThreeScrollScene /> */}

            <SesionHome className="px-8 " />
            <SectionExperience />
            <SectionDrawMyName />
            <HorizontalScrollingSections />
            <SesionOtherText />
            <SesionSkills className="px-8" />
            <ProjectsShowcase />

            <SesionAbout className="px-8" />
            <SectionFalling />
            {/* <SectionSpiralScrollCards /> */}
            {/* <SesionProject className="px-8" /> */}
            {/* <SesionDetailAbout className='px-8' /> */}
        </div>
    );
};

export default Page;
