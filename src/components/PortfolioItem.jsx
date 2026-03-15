import React, {useState} from 'react';
import Close from "../assets/close.svg";
import { motion, AnimatePresence } from "framer-motion";

const PortfolioItem = ({img, title, details}) => {
    const [modal, setModal] = useState(false)
    const toggleModal = () => {
        setModal(!modal);
    };

    return (
        <motion.div 
            layout 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            exit={{ opacity: 0, scale: 0.9 }} 
            transition={{ duration: 0.3 }}
            className="portfolio__item"
        >
            <img src={img} alt="" className="portfolio__img"/>

            <div className="portfolio__hover" onClick={toggleModal}>
                <h3 className="portfolio__title">{title}</h3>
            </div>

            <AnimatePresence>
                {modal && (
                    <motion.div 
                        className="portfolio__modal"
                        initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                        animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
                        exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                        onClick={toggleModal}
                    >
                        <motion.div 
                            className="portfolio__modal-content"
                            initial={{ y: 100, opacity: 0, scale: 0.9 }}
                            animate={{ y: 0, opacity: 1, scale: 1 }}
                            exit={{ y: 50, opacity: 0, scale: 0.9 }}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking content
                        >
                            <button className="modal__close-btn" onClick={toggleModal}>
                                <img src={Close} alt="close" className="modal__close-icon" />
                            </button>

                            <h3 className="modal__title">{title}</h3>

                            <div className="modal__body">
                                <ul className="modal__list grid">
                                    {details.map(({icon, title, desc}, index) => {
                                        return (
                                            <li className="modal__item" key={index}>
                                                <span className="item__icon">{icon}</span>
                                                <div className="item__info">
                                                    <span className="item__title">{title}</span>
                                                    <span className="item__detail">{desc}</span>
                                                </div>
                                            </li>
                                        );
                                    })}
                                </ul>

                                <div className="modal__img-wrapper">
                                    <img src={img} alt="" className="modal__img"/>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default PortfolioItem;