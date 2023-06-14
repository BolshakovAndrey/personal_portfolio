import React from "react";
import Info from "../../components/Info";
import {FaDownload} from "react-icons/fa";
import CV from "../../assets/AndreBolshakov-CV.pdf"

const About = () => {
    return (
        <main className="section container">
            <section className="about"></section>
            <h2 className="section__title">
                About <span>Me</span>
            </h2>

            <div className="about__container grid">
                <div className="about__info">
                    <h3 className="section__subtitle">
                        Personal Information
                    </h3>

                    <ul className="info__list grid">
                        <Info/>
                    </ul>

                    <a href={CV} className="button">
                        Download CV{" "}
                        <span className="button__icon">
                        <FaDownload/>
                    </span>
                    </a>
                </div>
            </div>
        </main>
    );
};

export default About;