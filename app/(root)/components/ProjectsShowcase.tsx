"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import SesionProject from "./SesionProject";
import SpiralScrollCards from "./SectionSpiralScrollCards";
import CanvasScene from "./CanvasScene";

const ProjectsShowcase = () => {
    const [view, setView] = useState<"list" | "spiral">("list");
    const [transitioning, setTransitioning] = useState(false);

    const handleToggle = () => {
        // setTransitioning(true);
        setView(view === "list" ? "spiral" : "list");
    };

    const handleSceneEnd = () => {
        setView(view === "list" ? "spiral" : "list");
        setTransitioning(false);
    };

    return (
        <div
            id="ss-projects"
            className="relative  py-16 bg-gradient-to-br dark:from-gray-950 from-gray-100 dark:to-black to-white"
        >
            {/* Nút chuyển */}
            <div className="sticky top-1/2 z-50 flex justify-end px-6">
                <Button onClick={handleToggle} variant="outline">
                    {view === "list" ? "Rotage View" : "List View"}
                </Button>
            </div>

            {/* Hiệu ứng chuyển cảnh */}
            {/* {transitioning && <CanvasScene onComplete={handleSceneEnd} />} */}

            {/* Giao diện */}
            <div
                className={`transition-opacity  duration-500 ${
                    transitioning ? "opacity-0 pointer-events-none" : "opacity-100"
                }`}
            >
                {view === "list" ? <SesionProject /> : <SpiralScrollCards />}
            </div>
        </div>
    );
};

export default ProjectsShowcase;
