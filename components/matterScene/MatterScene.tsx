import React, { useEffect, useRef } from 'react';
import Matter, { Engine, Render, Runner, Bodies, Composite, Mouse, MouseConstraint } from 'matter-js';

const MixedShapesScene: React.FC = () => {
    const matterRef = useRef<HTMLDivElement>(null);
    return <div ref={matterRef} />;
};

export default MixedShapesScene;
