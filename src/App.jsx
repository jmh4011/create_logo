import React, { useState, useEffect, Suspense, lazy } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import "./App.css";
import Navbar from "./Components/Home/Navbar";

// Lazy-loaded components
const Hero = lazy(() => import("./Components/Home/Hero.jsx"));
const About = lazy(() => import("./Components/Home/About.jsx"));
const Technologies = lazy(() =>
  import("./Components/Home/Technologies.jsx")
);
const Experience = lazy(() => import("./Components/Home/Experience.jsx"));
const Galleries = lazy(() => import("./Components/Home/Galleries.jsx"));
const Contact = lazy(() => import("./Components/Home/Contact.jsx"));
const CreateLogoPage = lazy(() =>
  import("./Components/CreateLogoPage/CreateLogoPage.jsx")
);
const AdBlockWarning = lazy(() =>
  import("./detectAdblock/AdBlockWarning.jsx")
);

const App = () => {
  const [currentTitle, setCurrentTitle] = useState("Home");
  const location = useLocation();

  useEffect(() => {
    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;

          let title = "Home";
          switch (sectionId) {
            case "about":
              title = "About";
              break;
            case "technologies":
              title = "Technologies";
              break;
            case "experience":
              title = "Experience";
              break;
            case "galleries":
              title = "Galleries";
              break;
            case "contact":
              title = "Contact";
              break;
            default:
              title = "Home";
          }

          console.log(`Current section: ${sectionId}, Title: ${title}`);
          setCurrentTitle(title);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.5, 
    });

    const sections = document.querySelectorAll(
      "#home, #about, #technologies, #experience, #galleries, #contact"
    );

    sections.forEach((section) => {
      if (section) {
        observer.observe(section);
        console.log(`Observing section: ${section.id}`);
      }
    });

    return () => {
      sections.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, [location]);

  return (
    <div className="bg-black text-neutral-300 overflow-x-hidden antialiased">
      <Helmet>
        <title>LogoHub - {currentTitle}</title>
      </Helmet>

      {location.pathname !== "/create-logo" && (
        <Navbar currentTitle={currentTitle} />
      )}

      <main
        className={`${
          location.pathname !== "/create-logo"
            ? "container mx-auto px-4 lg:px-8"
            : ""
        }`}
      >
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <div id="home" className="min-h-screen">
                    <Hero />
                  </div>
                  <div id="about" className="min-h-screen">
                    <About />
                  </div>
                  <div id="technologies" className="min-h-44">
                    <Technologies />
                  </div>
                  <div id="experience" className="min-h-screen">
                    <Experience />
                  </div>
                  <div id="galleries" className="min-h-screen">
                    <Galleries />
                  </div>
                  <div id="contact" className="min-h-screen">
                    <Contact />
                  </div>
                </>
              }
            />
            <Route path="/create-logo" element={<CreateLogoPage />} />
            <Route path="/adblock-warning" element={<AdBlockWarning />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
};

export default App;
