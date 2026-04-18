import { HashRouter as Router } from "react-router-dom";
import './App.css';
import AnimatedRoutes from "./components/AnimatedRoutes/AnimatedRoutes";
import CustomCursor from "./components/CustomCursor/CustomCursor";

function App() {
  return (
    <Router>
      <CustomCursor />
      <AnimatedRoutes />
    </Router>
  );
}

export default App;
