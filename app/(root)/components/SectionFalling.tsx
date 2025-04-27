import FallingText from "@/components/animations/FallingText";
import React from "react";

const SectionFalling = () => {
    return (
        <div
            id="ss-falling"
            className={`h-[400px]  flex flex-col items-center justify-center  dark:bg-black dark:text-white text-black `}
        >
            <div className="max-w-7xl w-full h-full">
                <FallingText
                    text={`Frontend developer with 2 years of experience specializing in building responsive and dynamic applications using React and Next.js.`}
                    highlightWords={["Frontend", "2 years", "React", "Next.js", "responsive", "dynamic"]}
                    trigger="scroll"
                    backgroundColor="transparent"
                    wireframes={false}
                    gravity={0.56}
                    fontSize="2rem"
                    mouseConstraintStiffness={0.9}
                />
            </div>
        </div>
    );
};

export default SectionFalling;
