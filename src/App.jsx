import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import SideBar from "./Components/sideBar/sideBar";
import MainPage from "./Components/MainPage/MainPage";
import Navbar from "./Components/Home/Navbar";
import Hero from "./Components/Home/Hero";
import About from "./Components/Home/About";
import Technologies from "./Components/Home/Technologies";
import Experience from "./Components/Home/Experience";
import Galleries from "./Components/Home/Galleries";
import Contact from "./Components/Home/Contact";

import AdBlockWarning from "./detectAdblock/AdBlockWarning";
import { useDetectAdBlock } from "adblock-detect-react";

const App = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="overflow-x-hidden text-neutral-300 antialiased selection:bg-cyan-300 selection:text-cyan-900 bg-black">
            <div className="relative w-screen">
              <div className="container mx-auto px-8">
                <Navbar />
                <Hero />
                <About />
                <Technologies />
                <Experience />
                <Galleries />
                <Contact />
              </div>
            </div>
          </div>
        }
      />
      <Route path="/create-logo" element={<CreateLogoPage />} />
      <Route path="/adblock-warning" element={<AdBlockWarning />} />
    </Routes>
  );
};

const CreateLogoPage = () => {
  const adBlockDetected = useDetectAdBlock();

  if (adBlockDetected) {
    return <Navigate to="/adblock-warning" />;
  }

  return (
    <div className="grid grid-rows-10 md:grid-cols-10 md:grid-rows-1 h-screen">
      <div className="row-span-1 md:col-span-2 bg-black">
        <SideBar />
      </div>
      <div className="row-span-9 md:col-span-8 bg-white text-black">
        <MainPage />
      </div>
    </div>
  );
};

export default App;