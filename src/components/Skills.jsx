import React from 'react';
import {icons, skills} from '../data'
import {CircularProgressbarWithChildren} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { motion } from 'framer-motion';

const Skills = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" }
        }
    };

    return (
        <motion.div 
            style={{ display: 'contents' }}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
        >
            {skills.map(({title, percentage}, index) => {
                return (
                    <motion.div className="progress__box" key={index} variants={itemVariants}>
                        <div className="progress__circle">
                            <CircularProgressbarWithChildren value={parseInt(percentage)}>
                                {/* Использую название навыка, чтобы получить соответствующую иконку */}
                                {icons[title]}
                                <div style={{fontSize: 12, marginTop: 0}}>
                                    {/*<strong>{}</strong>*/}
                                </div>
                            </CircularProgressbarWithChildren>
                        </div>
                        <h3 className="skills__title">{title}</h3>
                    </motion.div>
                )
            })}
        </motion.div>
    );
};

export default Skills;