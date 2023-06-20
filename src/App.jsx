// import {BrowserRouter, Route, Routes} from "react-router-dom";
import {HashRouter as Router, Route, Routes} from "react-router-dom";
import './App.css';

import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import Contact from "./pages/contact/Contact";
import Portfolio from "./pages/portfolio/Portfolio";
import Themes from "./components/Themes/Themes";


function App() {
    return (
        <Router>
            <Navbar/>
            <Themes/>
            <Routes>
                <Route index element={<Home/>}/>
                <Route path='about' element={<About/>}/>
                <Route path='portfolio' element={<Portfolio/>}/>
                <Route path='contact' element={<Contact/>}/>
            </Routes>
        </Router>

    )
}

export default App;
