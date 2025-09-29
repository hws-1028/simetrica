import { Routes, Route } from "react-router-dom";
import Home from "./pages/HomePage.tsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default App;
