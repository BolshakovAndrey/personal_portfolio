import React, {useEffect, useState} from 'react';
import {themes} from "../../data";
import ThemesItem from "./Themestem";
import {FaCog} from "react-icons/fa";
import {BsMoon} from "react-icons/bs";
import "./themes.css";

const Themes = () => {
    const [showSwitcher, setShowSwitcher] = useState(false);
    const [color, setColor] = useState('red');

    const changeColor = (color) => {
        setColor(color);
    }

    useEffect(() => {
        document.documentElement.style.setProperty("--first-color", color);
    }, [color]);

    return (
        <div>
            <div className={`${showSwitcher ? "show-switcher" : ''} style__switcher`}>
                <div className="style__switcher-toggler"
                     onClick={() => setShowSwitcher(!setShowSwitcher())}
                >
                    <FaCog/>
                </div>

                <div className="theme__toggler">
                    <BsMoon/>
                </div>

                <h3 className="style__switcher-title">Style Switcher</h3>
                <div className="style__switcher-item">
                    {themes.map((theme, index) => {
                        return <ThemesItem key={index} {...theme} changeColor={changeColor}/>
                    })}
                </div>
                <div
                    className="style__switcher-close"
                    onClick={() => setShowSwitcher(!setShowSwitcher)}
                >
                    &times;
                </div>
            </div>
        </div>
    );
};

export default Themes;