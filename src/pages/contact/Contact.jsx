import React, {useState} from 'react';

import {FaEnvelopeOpen, FaGithubSquare, FaLinkedin, FaTelegram,} from "react-icons/fa";

import {FiSend} from "react-icons/fi";
import "./contanct.css"
import axios from "axios";

const Contact = () => {
    // state
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');

    // submit event
    const handelSubmit = (e) => {
        e.preventDefault()
        // console.log(name, email, subject, message)
        const data = {
            Name: name,
            Email: email,
            Subject: subject,
            Message: message
        }
        axios.post('https://sheet.best/api/sheets/49b0e9e0-12d5-4879-a9b7-a82907ebb26a', data)
            .then((response) => {
                console.log(response);
                // clearing form fields
                setName('');
                setEmail('');
                setSubject('');
                setMessage('');
            })
    };

    return (
        <section className="contact section">
            <h2 className="section__title">Get In <span>Touch</span></h2>

            <div className="contact__container container grid">
                <div className="contact__data">
                    <h3 className="contact__title">Don't be Shy !</h3>

                    <p className="contact__description">
                        Feel free to get in touch with me. <br/>
                        I am always open to discussing
                        new projects, creative ideas or opportunities to be part of your
                        visions
                    </p>

                    <div className="contact__info">
                        <div className="info__item">
                            <FaEnvelopeOpen className="info__icon"/>

                            <div className="info__title">
                                <span className="info__title">Mail me</span>
                                <h4 className="info__desc">abolshakovy@mail.com</h4>
                            </div>
                        </div>

                    </div>

                    <div className="contact__social">
                        <a
                            href="https://www.linkedin.com/in/bolshakovandrei/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="contact__social-link">
                            <FaLinkedin/>
                        </a>

                        <a
                            href="https://t.me/Bolshakov_Andrey"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="contact__social-link">
                            <FaTelegram/>
                        </a>

                        <a
                            href="https://github.com/BolshakovAndrey"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="contact__social-link">
                            <FaGithubSquare/>
                        </a>
                    </div>

                </div>

                <form className="contact__form" onSubmit={handelSubmit}>

                    <div className="form__input-group">
                        <div className="form__input-div">
                            <input type="text"
                                   placeholder="Your Name"
                                   className="form__control"
                                   required
                                   onChange={(e) => setName(e.target.value)}
                                   value={name}
                            />
                        </div>

                        <div className="form__input-div">
                            <input type="emal"
                                   placeholder="Your Email"
                                   className="form__control"
                                   required
                                   onChange={(e) => setEmail(e.target.value)}
                                   value={email}
                            />
                        </div>

                        <div className="form__input-div">
                            <input type="text"
                                   placeholder="Your Subject"
                                   className="form__control"
                                   required
                                   onChange={(e) => setSubject(e.target.value)}
                                   value={subject}
                            />
                        </div>
                    </div>

                    <div className="form__input-div">
                            <textarea placeholder="Your Message"
                                      className="form__control textarea"
                                      required
                                      onChange={(e) => setMessage(e.target.value)}
                                      value={message}
                            >

                            </textarea>
                    </div>

                    <button className="button">
                        Send Message
                        <span className="button__icon contact__button-icon">
                                <FiSend/>
                            </span>
                    </button>

                </form>
            </div>


        </section>
    );
}


export default Contact;
