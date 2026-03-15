import React from 'react';

const Themestem = ({color, changeColor}) => {
    return (
        <div
            className="theme__swatch"
            style={{ 
                backgroundColor: color, 
                width: '30px', 
                height: '30px', 
                borderRadius: '50%',
                cursor: 'pointer',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
            onClick={() => {
                changeColor(color)
            }}
        />
    );
};

export default Themestem;