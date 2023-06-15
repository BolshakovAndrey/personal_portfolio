import React from 'react';
import parse from "html-react-parser";
// import diploma_frontend from "../assets/frontend.pdf";
// import diploma_aiogram from "../assets/aiogram.pdf";

const ResumeItem = ({icon, year, title, desc}) => {
    return (
        <div className="resume__item">
            <div className="resume__icon">{icon}</div>

            <span className="resume__date">{year}</span>
            <h3 className="resume__subtitle">{parse(title)}</h3>
            <p className="resume__description">{desc}</p>
            {/*<a href={diploma_backend} className="button">*/}
            {/*    Download diploma{" "}*/}
            {/*    <span className="button__icon">*/}
            {/*                <FaDownload/>*/}
            {/*                </span>*/}
            {/*</a>*/}
        </div>
    );
};

export default ResumeItem;