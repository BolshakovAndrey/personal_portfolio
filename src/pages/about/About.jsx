import React, {useState} from "react";
import Info from "../../components/Info";
import Stats from "../../components/Stats";
import Skills from "../../components/Skills";
import SkillsCloud from "../../components/SkillsCloud";
import {FaLinkedin} from "react-icons/fa";
import {FiGrid, FiCloud} from "react-icons/fi";
import {resume} from "../../data"
import "./about.css"
import ResumeItem from "../../components/ResumeItem";

const About = () => {
    const [skillsView, setSkillsView] = useState('cloud');

    return (
        <main className="section container">
            <section className="about">
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

                        <a href="https://www.linkedin.com/in/bolshakovandrei/"
                           target="_blank"
                           rel="noopener noreferrer"
                           className="button">
                            View LinkedIn Profile{" "}
                            <span className="button__icon">
                                <FaLinkedin/>
                            </span>
                        </a>
                    </div>

                    <div className="stats grid">
                        <Stats/>
                    </div>
                </div>
            </section>

            <div className="separator"></div>

            <section className="skills">
                <div className="skills__header">
                    <h3 className="section__subtitle subtitle__center">
                        My Skills
                    </h3>

                    <div className="skills__view-toggle">
                        <button
                            className={`view-toggle__btn ${skillsView === 'cloud' ? 'active' : ''}`}
                            onClick={() => setSkillsView('cloud')}
                            title="Cloud view"
                        >
                            <FiCloud />
                        </button>
                        <button
                            className={`view-toggle__btn ${skillsView === 'grid' ? 'active' : ''}`}
                            onClick={() => setSkillsView('grid')}
                            title="Grid view"
                        >
                            <FiGrid />
                        </button>
                    </div>
                </div>

                {skillsView === 'grid' ? (
                    <div className="skills__container grid">
                        <Skills/>
                    </div>
                ) : (
                    <SkillsCloud />
                )}
            </section>

            <div className="separator"></div>

            <section className="section resume">
                <h3 className="section__subtitle subtitle__center">
                    Experience & Education
                </h3>

                <div className="resume__container grid">
                    <div className="resume__data">
                        {resume.map((val) => {
                            if (val.category === "experience") {
                                return <ResumeItem key={val.id} {...val} />
                            }
                            return null;
                        })}
                    </div>

                    <div className="resume__data">
                        {resume.map((val) => {
                            if (val.category === "education") {
                                return <ResumeItem key={val.id} {...val} />
                            }
                            return null;
                        })}
                    </div>
                </div>

            </section>
        </main>
    );
};

export default About;