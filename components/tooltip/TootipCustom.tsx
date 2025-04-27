import React from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
type Props = {
    trigger: React.ReactNode;
    children: React.ReactNode;
};
const TootipCustom = ({ trigger, children }: Props) => {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild className="cursor-pointer">
                    {trigger}
                </TooltipTrigger>
                <TooltipContent className="bg-[#505050]  text-wrap max-w-[250px] ">{children}</TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};

export default TootipCustom;
