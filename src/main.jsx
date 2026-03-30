import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./index.css";
import App from "./App.jsx";
import Home from "./pages/home.jsx";
import Dash from "./pages/dash.jsx";
import Upload from "./pages/Upload.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/home" element={<Home />} />
        <Route path="/dash" element={<Dash />} />
        <Route path="/maisfotos" element={<Upload />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);