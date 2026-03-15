import {HashRouter as Router} from "react-router-dom";
import './App.css';

import Navbar from "./components/Navbar/Navbar";
import Themes from "./components/Themes/Themes";
import AnimatedRoutes from "./components/AnimatedRoutes/AnimatedRoutes";
import CustomCursor from "./components/CustomCursor/CustomCursor";

function App() {
    return (
        <Router>
            <CustomCursor />
            <Navbar/>
            <Themes/>
            <AnimatedRoutes/>
        </Router>

    )
}

export default App;
