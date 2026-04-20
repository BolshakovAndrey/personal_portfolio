import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import './customCursor.css';

const CustomCursor = () => {
    // Avoid React re-renders on mousemove by using Framer Motion values directly
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 20, stiffness: 200, mass: 0.1 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const updateMousePosition = (e) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        const handleMouseOver = (e) => {
            const t = e.target;
            if (t.tagName.toLowerCase() === 'a' || 
                t.tagName.toLowerCase() === 'button' ||
                t.closest('a') !== null ||
                t.closest('button') !== null || 
                t.closest('[role="button"]') !== null) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener('mousemove', updateMousePosition);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, [cursorX, cursorY]);

    const variants = {
        default: {
            scale: 1,
            backgroundColor: 'transparent',
            mixBlendMode: 'normal',
            border: '2px solid var(--first-color)'
        },
        hover: {
            scale: 2.5,
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            mixBlendMode: 'difference',
            border: 'none',
        }
    };

    return (
        <React.Fragment>
            <motion.div
                className="cursor-dot"
                style={{
                    x: cursorX,
                    y: cursorY,
                    marginLeft: -4,
                    marginTop: -4
                }}
            />
            <motion.div
                className="cursor-outline"
                variants={variants}
                animate={isHovering ? "hover" : "default"}
                transition={{ type: 'spring', mass: 0.1, stiffness: 200, damping: 20 }}
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                    marginLeft: -16,
                    marginTop: -16
                }}
            />
        </React.Fragment>
    );
};

export default CustomCursor;
