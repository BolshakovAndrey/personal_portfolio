import { HashRouter as Router } from "react-router-dom";
import './App.css';
import AnimatedRoutes from "./components/AnimatedRoutes/AnimatedRoutes";
import CustomCursor from "./components/CustomCursor/CustomCursor";
import GradientMesh from "./components/GradientMesh";

function App() {
  return (
    <Router>
      <GradientMesh />
      <CustomCursor />
      <AnimatedRoutes />
    </Router>
  );
}

export default App;
