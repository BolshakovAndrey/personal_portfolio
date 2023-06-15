import React from 'react';
import {icons, skills} from '../data'
import {CircularProgressbarWithChildren} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


const Skills = () => {
    return (
        <>
            {skills.map(({title, percentage}, index) => {
                return (
                    <div className="progress__box" key={index}>
                        <div className="progress__circle">
                            <CircularProgressbarWithChildren value={parseInt(percentage)}>
                                {/* Использую название навыка, чтобы получить соответствующую иконку */}
                                {icons[title]}
                                <div style={{fontSize: 12, marginTop: 0}}>
                                    <strong>{percentage}%</strong>
                                </div>
                            </CircularProgressbarWithChildren>
                        </div>
                        <h3 className="skills__title">{title}</h3>
                    </div>
                )
            })}
        </>
    );
};

export default Skills;