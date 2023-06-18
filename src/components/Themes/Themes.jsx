import React, {useEffect, useState} from 'react';
import {themes} from "../../data";
import ThemesItem from "./Themestem";
import {FaCog} from "react-icons/fa";
import {BsMoonFill, BsSun} from "react-icons/bs";
import "./themes.css";

const getStorageColor = () => {
    let color = 'hsl(252, 35%, 51%)';
    if (localStorage.getItem('color')) {
        color = localStorage.getItem('color')
    }
    return color;
}

const getStorageTheme = () => {
    let theme = 'light-theme';
    if (localStorage.getItem('theme')) {
        theme = localStorage.getItem('theme')
    }
    return theme;
}

const Themes = () => {
    const [showSwitcher, setShowSwitcher] = useState(false);
    const [color, setColor] = useState(getStorageColor());
    const [theme, setTheme] = useState(getStorageTheme());

    const changeColor = (color) => {
        setColor(color);
    }

    const toggleTheme = () => {
        theme !== 'light-theme' ? setTheme('light-theme') : setTheme('dark-theme');

    }

    useEffect(() => {
        document.documentElement.style.setProperty("--first-color", color);
        localStorage.setItem("color", color);
    }, [color]);

    useEffect(() => {
        document.documentElement.className = theme;
        localStorage.setItem("theme", theme);
    }, [theme]);

    return (
        <div>
            <div className={`${showSwitcher ? "show-switcher" : ''} style__switcher`}>
                <div className="style__switcher-toggler"
                     onClick={() => setShowSwitcher(!setShowSwitcher())}
                >
                    <FaCog/>
                </div>

                <div className="theme__toggler" onClick={toggleTheme}>
                    {theme === 'light-theme' ? <BsMoonFill/> : <BsSun/>}
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