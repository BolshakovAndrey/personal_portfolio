import React, { useRef, useState, useCallback, useEffect, useMemo } from 'react';
import { icons, skills } from '../data';
import './SkillsCloud.css';

/**
 * Generates deterministic positions for icons arranged
 * in a circular scatter pattern inside the cloud.
 */
const generatePositions = (count) => {
    const positions = [];
    const goldenAngle = Math.PI * (3 - Math.sqrt(5)); // ~137.5°

    for (let i = 0; i < count; i++) {
        // Sunflower seed pattern — evenly distributed inside a circle
        const r = Math.sqrt((i + 0.5) / count) * 38; // max ~38% from center
        const theta = i * goldenAngle;
        const x = 50 + r * Math.cos(theta); // percent from left
        const y = 50 + r * Math.sin(theta); // percent from top
        positions.push({ x, y });
    }
    return positions;
};

const MAGNETIC_RADIUS = 70;   // px — how far the magnet reaches
const MAGNETIC_STRENGTH = 15; // px — max pull distance
const SCALE_BOOST = 1.15;     // how much the icon scales up

const SkillsCloud = () => {
    const cloudRef = useRef(null);
    const [mouse, setMouse] = useState({ x: -9999, y: -9999 });
    const [isHovering, setIsHovering] = useState(false);
    const positions = useMemo(() => generatePositions(skills.length), []);

    const handleMouseMove = useCallback((e) => {
        if (!cloudRef.current) return;
        const rect = cloudRef.current.getBoundingClientRect();
        setMouse({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    }, []);

    const handleMouseEnter = useCallback(() => setIsHovering(true), []);
    const handleMouseLeave = useCallback(() => {
        setIsHovering(false);
        setMouse({ x: -9999, y: -9999 });
    }, []);

    return (
        <div
            className="skills-cloud"
            ref={cloudRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Subtle circular glow behind the cloud */}
            <div className="skills-cloud__glow" />

            {skills.map(({ title }, index) => {
                const pos = positions[index];
                return (
                    <SkillIcon
                        key={title}
                        title={title}
                        icon={icons[title]}
                        baseX={pos.x}
                        baseY={pos.y}
                        mouseX={mouse.x}
                        mouseY={mouse.y}
                        isHovering={isHovering}
                        cloudRef={cloudRef}
                    />
                );
            })}
        </div>
    );
};

const SkillIcon = React.memo(({ title, icon, baseX, baseY, mouseX, mouseY, isHovering, cloudRef }) => {
    const ref = useRef(null);
    const [offset, setOffset] = useState({ dx: 0, dy: 0, scale: 1, glow: 0 });

    useEffect(() => {
        if (!ref.current || !cloudRef.current) return;

        const cloudRect = cloudRef.current.getBoundingClientRect();
        // Convert percentage position to px
        const iconCenterX = (baseX / 100) * cloudRect.width;
        const iconCenterY = (baseY / 100) * cloudRect.height;

        const distX = mouseX - iconCenterX;
        const distY = mouseY - iconCenterY;
        const dist = Math.sqrt(distX * distX + distY * distY);

        if (isHovering && dist < MAGNETIC_RADIUS) {
            const force = 1 - dist / MAGNETIC_RADIUS; // 1 at center, 0 at edge
            const pull = force * force * MAGNETIC_STRENGTH; // quadratic easing
            const angle = Math.atan2(distY, distX);

            setOffset({
                dx: Math.cos(angle) * pull,
                dy: Math.sin(angle) * pull,
                scale: 1 + (SCALE_BOOST - 1) * force,
                glow: force,
            });
        } else {
            setOffset({ dx: 0, dy: 0, scale: 1, glow: 0 });
        }
    }, [mouseX, mouseY, baseX, baseY, isHovering, cloudRef]);

    return (
        <div
            ref={ref}
            className="skills-cloud__icon"
            style={{
                left: `${baseX}%`,
                top: `${baseY}%`,
                transform: `translate(calc(-50% + ${offset.dx}px), calc(-50% + ${offset.dy}px)) scale(${offset.scale})`,
                filter: offset.glow > 0.1
                    ? `drop-shadow(0 0 ${8 * offset.glow}px var(--first-color))`
                    : 'none',
            }}
        >
            <div className="skills-cloud__icon-inner">
                {icon}
            </div>
            <span
                className="skills-cloud__label"
                style={{ opacity: offset.glow > 0.3 ? 1 : 0 }}
            >
                {title}
            </span>
        </div>
    );
});

export default SkillsCloud;
