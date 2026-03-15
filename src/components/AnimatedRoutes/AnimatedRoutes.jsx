import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Home from "../../pages/home/Home";
import About from "../../pages/about/About";
import Contact from "../../pages/contact/Contact";
import Portfolio from "../../pages/portfolio/Portfolio";
import PageWrapper from "./PageWrapper";

const AnimatedRoutes = () => {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route index element={<PageWrapper><Home /></PageWrapper>} />
                <Route path="about" element={<PageWrapper><About /></PageWrapper>} />
                <Route path="portfolio" element={<PageWrapper><Portfolio /></PageWrapper>} />
                <Route path="contact" element={<PageWrapper><Contact /></PageWrapper>} />
            </Routes>
        </AnimatePresence>
    );
};

export default AnimatedRoutes;
