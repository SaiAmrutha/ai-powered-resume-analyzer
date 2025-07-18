import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import HistoryPage from "./components/HistoryPage.js";
import HomePage from "./components/HomePage.js";
import LandingPage from "./components/LandingPage.js";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/analyzer" element={<HomePage />} />
        <Route path="/history" element={<HistoryPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
