import React from "react";
import { Navigate } from "react-router-dom";
import Hero from "./Components/Home/Hero.jsx";
import About from "./Components/Home/About.jsx";
import Technologies from "./Components/Home/Technologies.jsx";
import Experience from "./Components/Home/Experience.jsx";
import Galleries from "./Components/Home/Galleries.jsx";
import Contact from "./Components/Home/Contact.jsx";
import CreateLogoPage from "./Components/CreateLogoPage/CreateLogoPage.jsx";
import AdBlockWarning from "./detectAdblock/AdBlockWarning.jsx";

const routes = [
  {
    path: "/",
    element: React.createElement(
      React.Fragment,
      null,
      React.createElement("div", { id: "home" }, React.createElement(Hero)),
      React.createElement("div", { id: "about" }, React.createElement(About)),
      React.createElement(
        "div",
        { id: "technologies" },
        React.createElement(Technologies)
      ),
      React.createElement(
        "div",
        { id: "experience" },
        React.createElement(Experience)
      ),
      React.createElement(
        "div",
        { id: "galleries" },
        React.createElement(Galleries)
      ),
      React.createElement("div", { id: "contact" }, React.createElement(Contact))
    ),
  },
  {
    path: "/create-logo",
    element: React.createElement(CreateLogoPage),
  },
  {
    path: "/adblock-warning",
    element: React.createElement(AdBlockWarning),
  },
  {
    path: "*",
    element: React.createElement(Navigate, { to: "/" }),
  },
];

export default routes;
