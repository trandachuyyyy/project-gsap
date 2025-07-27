"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import SesionProject from "./SesionProject";
import SpiralScrollCards from "./SectionSpiralScrollCards";
// import CanvasScene from "./CanvasScene";
import { useResize } from "@/hooks/useResize";

const ProjectsShowcase = () => {
    const { isVisibleMobile, isVisibleTablet } = useResize();
    const [view, setView] = useState<"list" | "spiral" | "">("");
    const [transitioning, setTransitioning] = useState(false);

    const handleToggle = () => {
        // setTransitioning(true);
        setView(view === "list" ? "spiral" : "list");
    };

    const handleSceneEnd = () => {
        setView(view === "list" ? "spiral" : "list");
        setTransitioning(false);
    };

    useEffect(() => {
        if (isVisibleMobile) {
            setView("list");
        } else {
            setView("spiral");
        }
    }, [isVisibleMobile, isVisibleTablet]);

    return (
        <div
            id="ss-projects"
            className="relative  py-16 bg-gradient-to-br dark:from-gray-950 from-gray-100 dark:to-black to-white"
        >
            {/* Nút chuyển */}
            {/* <div className="lg:flex sticky top-1/2 z-50 hidden justify-end px-6">
                <Button onClick={handleToggle} variant="outline">
                    {view === "list" ? "Rotage View" : "List View"}
                </Button>
            </div> */}

            {/* Hiệu ứng chuyển cảnh */}
            {/* {transitioning && <CanvasScene onComplete={handleSceneEnd} />} */}

            {/* Giao diện */}
            <div
                className={`transition-opacity  duration-500 ${
                    transitioning ? "opacity-0 pointer-events-none" : "opacity-100"
                }`}
            >
                <SpiralScrollCards />
                {/* <SesionProject /> */}
                {/* {view === "list" ? <SesionProject /> : <SpiralScrollCards />} */}
            </div>
        </div>
    );
};

export default ProjectsShowcase;
