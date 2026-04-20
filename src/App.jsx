import { HashRouter as Router } from "react-router-dom";
import React, { useEffect } from 'react';
import './App.css';
import AnimatedRoutes from "./components/AnimatedRoutes/AnimatedRoutes";
import CustomCursor from "./components/CustomCursor/CustomCursor";
import GradientMesh from "./components/GradientMesh";
import Lenis from 'lenis';

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy();
    }
  }, []);

  return (
    <Router>
      <div className="grain-overlay" />
      <GradientMesh />
      <CustomCursor />
      <AnimatedRoutes />
    </Router>
  );
}

export default App;
