import React, { useState } from "react";
import logo from "../../assets/images/logo.png";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";

const Navbar = () => {
  const [currentTitle, setCurrentTitle] = useState("Home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = (title, elementId) => {
    setCurrentTitle(title);
    if (elementId) {
      setTimeout(() => {
        const element = document.getElementById(elementId);
        if (element) {
          const yOffset = -80; 
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 300);
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <Helmet>
        <title>LogoHub - {currentTitle}</title>
      </Helmet>
      <nav className="fixed top-0 left-0 w-full z-50 bg-black bg-opacity-80 backdrop-blur-lg shadow-md">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          {/* Logo */}
          <div className="flex items-center">
            <img src={logo} alt="logo" className="w-32 sm:w-32 md:w-48 h-auto" />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {[
              { title: "Home", id: "home" },
              { title: "About Us", id: "about" },
              { title: "Technologies", id: "technologies" },
              { title: "Experience", id: "experience" },
              { title: "Galleries", id: "galleries" },
            ].map(({ title, id }) => (
              <motion.a
                key={id}
                whileHover={{ scale: 1.05 }}
                href={`#${id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(title, id);
                }}
                className="text-lg font-light text-neutral-300 hover:text-purple-500 transition-colors"
              >
                {title}
              </motion.a>
            ))}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 text-lg font-medium text-white bg-gradient-to-r from-purple-600 to-cyan-500 rounded-md shadow-lg hover:shadow-purple-500/50 transition-all duration-300"
              onClick={() => window.location.href = '/create-logo'}
            >
              Get Started
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-white"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ 
            height: isMobileMenuOpen ? "auto" : 0,
            opacity: isMobileMenuOpen ? 1 : 0
          }}
          transition={{ duration: 0.3 }}
          className={`overflow-hidden bg-black bg-opacity-90 border-t border-neutral-800 p-4 md:hidden`}
          style={{ display: isMobileMenuOpen ? 'block' : 'none' }}
        >
          <div className="flex flex-col items-center gap-4">
            {[
              { title: "Home", id: "home" },
              { title: "About Us", id: "about" },
              { title: "Technologies", id: "technologies" },
              { title: "Experience", id: "experience" },
              { title: "Galleries", id: "galleries" },
            ].map(({ title, id }) => (
              <motion.a
                key={id}
                whileHover={{ scale: 1.05 }}
                href={`#${id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(title, id);
                }}
                className="text-lg font-light text-neutral-300 hover:text-purple-500 transition-colors"
              >
                {title}
              </motion.a>
            ))}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 text-lg font-medium text-white bg-gradient-to-r from-purple-600 to-cyan-500 rounded-md shadow-lg hover:shadow-purple-500/50 transition-all duration-300"
              onClick={() => window.location.href = '/create-logo'}
            >
              Get Started
            </motion.button>
          </div>
        </motion.div>
      </nav>
    </>
  );
};

export default Navbar;
