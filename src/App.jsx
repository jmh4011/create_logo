import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import "./App.css";
import Navbar from "./Components/Home/Navbar";
import routes from "./routes";

const App = () => {
  const [currentTitle, setCurrentTitle] = useState("Home");

  useEffect(() => {
    const sections = ["home", "about", "technologies", "experience", "galleries", "contact"];
    const observers = [];

    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (!element) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const title = sectionId.charAt(0).toUpperCase() + sectionId.slice(1);
              setCurrentTitle(title);
            }
          });
        },
        { threshold: 0.5 }
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  return (
    <div className="bg-black text-neutral-300 overflow-x-hidden antialiased">
      <Helmet>
        <title>LogoHub - {currentTitle}</title>
      </Helmet>
      <Navbar currentTitle={currentTitle} />
      <main className="container mx-auto px-4 lg:px-8">
        <Routes>
          {routes.map(({ path, element }, index) => (
            <Route key={index} path={path} element={element} />
          ))}
        </Routes>
      </main>
    </div>
  );
};

export default App;
