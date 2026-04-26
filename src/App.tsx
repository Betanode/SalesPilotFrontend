import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import SalesCoach from "./pages/SalesCoach";
import Guide from "./pages/Guide";
import Contact from "./pages/Contact";

export default function App() {
  return (
    <BrowserRouter>
      <div className="bg-black min-h-screen text-white">
        <Navbar />

        <div className="pt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sales-coach" element={<SalesCoach />} />
            <Route path="/guide" element={<Guide />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}