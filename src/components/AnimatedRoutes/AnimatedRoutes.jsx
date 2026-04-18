import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Home from "../../pages/home/Home";
import About from "../../pages/about/About";
import Contact from "../../pages/contact/Contact";
import Portfolio from "../../pages/portfolio/Portfolio";
import PageWrapper from "./PageWrapper";
import NewNav from "../Navbar/NewNav";
import { useTheme } from "../Navbar/NewNav";

const AnimatedRoutes = () => {
    const location = useLocation();
    const { theme, toggle } = useTheme();

    return (
        <>
            <NewNav theme={theme} onToggleTheme={toggle} />
            <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
                    <Route index element={<PageWrapper><Home theme={theme} /></PageWrapper>} />
                    <Route path="about" element={<PageWrapper><About /></PageWrapper>} />
                    <Route path="portfolio" element={<PageWrapper><Portfolio /></PageWrapper>} />
                    <Route path="contact" element={<PageWrapper><Contact /></PageWrapper>} />
                </Routes>
            </AnimatePresence>
        </>
    );
};

export default AnimatedRoutes;
