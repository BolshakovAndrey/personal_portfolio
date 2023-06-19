import React, {useEffect, useRef} from "react";
import Profile from "../../assets/home.jpg";
import {Link} from "react-router-dom";
import {FaArrowRight} from "react-icons/fa";
import Typed from 'typed.js';
import "./home.css"

const Home = () => {
    const el = useRef(null);

    useEffect(() => {
        const typed = new Typed(el.current, {
            strings: ["Web Developer", "Backend Developer", "Frontend Developer", "Fullstack Developer", "Python Developer"],
            startDelay: 1000,
            typeSpeed: 50,
            backSpeed: 50,
            backDelay: 1000,
            loop: true,
        });

        // Destroy Typed instance on unmounting the component to prevent memory leaks
        return () => {
            typed.destroy();
        };
    }, []);

    return (
        <section className="home section grid">
            <img src={Profile} alt="" className="home__img"/>

            <div className="home__content">
                <div className="home__data">
                    <h1 className="home__title">
                        I'm Andrei Bolshakov.<br/>
                        <span ref={el}></span>
                    </h1>

                    <p className="home__description">
                        I'm worldwide based developer focused on
                        crafting clean & user-friendly experience.
                        I am passionate about building excellent
                        software that improves the lives of those
                        around me.
                    </p>

                    <Link to='/about' className="button">
                        More About Me{' '}
                        <span className="button__icon">
                            <FaArrowRight/>
                        </span>
                    </Link>
                </div>
            </div>

            <div className="color__block"></div>
        </section>
    );
};

export default Home;
