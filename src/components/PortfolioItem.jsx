import React, {useState, useEffect, useCallback} from 'react';
import Close from "../assets/close.svg";
import { motion, AnimatePresence } from "framer-motion";
import DeviceMockup from "./DeviceMockup";

const AutoSlideshow = ({ images, interval = 3000 }) => {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        if (!images || images.length <= 1) return;
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % images.length);
        }, interval);
        return () => clearInterval(timer);
    }, [images, interval]);

    if (!images || images.length === 0) return null;

    return (
        <div className="slideshow">
            {images.map((src, i) => (
                <img
                    key={i}
                    src={src}
                    alt=""
                    className={`slideshow__img ${i === current ? 'active' : ''}`}
                />
            ))}
        </div>
    );
};

const PortfolioItem = ({img, images, title, details, deviceType}) => {
    const [modal, setModal] = useState(false);
    const toggleModal = useCallback(() => {
        setModal((prev) => !prev);
    }, []);

    const hasSlideshow = images && images.length > 1;

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="portfolio__item"
        >
            <div className="portfolio__preview">
                <DeviceMockup type={deviceType || 'desktop'}>
                    {hasSlideshow ? (
                        <AutoSlideshow images={images} interval={3500} />
                    ) : (
                        <img src={img} alt="" className="portfolio__img"/>
                    )}
                </DeviceMockup>
            </div>

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
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button className="modal__close-btn" onClick={toggleModal}>
                                <img src={Close} alt="close" className="modal__close-icon" />
                            </button>

                            <div className="modal__body">
                                <div className="modal__info">
                                    <h3 className="modal__title">{title}</h3>

                                    <ul className="modal__list">
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
                                </div>

                                <div className="modal__img-wrapper">
                                    <DeviceMockup type={deviceType || 'desktop'}>
                                        {hasSlideshow ? (
                                            <AutoSlideshow images={images} interval={3000} />
                                        ) : (
                                            <img src={img} alt="" className="modal__img"/>
                                        )}
                                    </DeviceMockup>
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
