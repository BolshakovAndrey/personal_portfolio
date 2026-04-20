import React, { useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export default function MagneticButton({ children, className = '', style = {}, onClick }) {
    const ref = useRef(null);
    
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 15, stiffness: 200, mass: 0.1 };
    const x = useSpring(mouseX, springConfig);
    const y = useSpring(mouseY, springConfig);

    const handleMouse = (e) => {
        if (!ref.current) return;
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current.getBoundingClientRect();
        
        // Calculate distance from center
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);
        
        // Move element slightly towards the mouse
        mouseX.set(middleX * 0.35);
        mouseY.set(middleY * 0.35);
    };

    const reset = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    return (
        <motion.div
            style={{ 
                position: 'relative', 
                display: 'inline-flex',
                x, 
                y, 
                ...style 
            }}
            ref={ref}
            onMouseMove={handleMouse}
            onMouseLeave={reset}
            onClick={onClick}
            className={className}
        >
            {children}
        </motion.div>
    );
}
