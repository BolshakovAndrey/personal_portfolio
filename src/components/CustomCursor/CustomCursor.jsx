import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './customCursor.css';

const CustomCursor = () => {
    const [mousePosition, setMousePosition] = useState({
        x: 0,
        y: 0
    });
    
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const updateMousePosition = (e) => {
            setMousePosition({
                x: e.clientX,
                y: e.clientY
            });
        };

        const handleMouseOver = (e) => {
            if (e.target.tagName.toLowerCase() === 'a' || 
                e.target.tagName.toLowerCase() === 'button' ||
                e.target.closest('a') !== null ||
                e.target.closest('button') !== null) {
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
    }, []);

    const variants = {
        default: {
            x: mousePosition.x - 16,
            y: mousePosition.y - 16,
            scale: 1,
            transition: { type: 'spring', mass: 0.1, stiffness: 200, damping: 20 }
        },
        hover: {
            x: mousePosition.x - 16,
            y: mousePosition.y - 16,
            scale: 2.5,
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            mixBlendMode: 'difference',
            border: 'none',
            transition: { type: 'spring', mass: 0.1, stiffness: 200, damping: 20 }
        }
    };

    return (
        <React.Fragment>
            <motion.div
                className="cursor-dot"
                animate={{
                    x: mousePosition.x - 4,
                    y: mousePosition.y - 4,
                }}
                transition={{ type: 'tween', ease: 'backOut', duration: 0.1 }}
            />
            <motion.div
                className="cursor-outline"
                variants={variants}
                animate={isHovering ? "hover" : "default"}
            />
        </React.Fragment>
    );
};

export default CustomCursor;
