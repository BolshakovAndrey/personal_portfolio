import React from 'react';
import './DeviceMockup.css';

const DeviceMockup = ({ type, children }) => {
    if (type === 'mobile') {
        return (
            <div className="device-mockup mobile">
                <div className="notch"></div>
                <div className="screen">
                    {children}
                </div>
            </div>
        );
    }

    // Default to a generic browser window mockup for websites
    return (
        <div className="device-mockup desktop">
            <div className="browser-bar">
                <span className="dot dot-red"></span>
                <span className="dot dot-yellow"></span>
                <span className="dot dot-green"></span>
            </div>
            <div className="screen">
                {children}
            </div>
        </div>
    );
};

export default DeviceMockup;
