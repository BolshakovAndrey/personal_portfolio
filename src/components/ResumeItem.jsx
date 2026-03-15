import React from 'react';
import parse from "html-react-parser";
import { motion } from "framer-motion";

const ResumeItem = ({icon, year, title, desc}) => {
    return (
        <motion.div 
            className="resume__item"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
            <div className="resume__icon">{icon}</div>

            <span className="resume__date">{year}</span>
            <h3 className="resume__subtitle">{parse(title)}</h3>
            <p className="resume__description">{desc}</p>
        </motion.div>
    );
};

export default ResumeItem;