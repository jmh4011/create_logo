import React from "react";
import logo from "../../assets/images/logo.png";
import { motion } from "framer-motion";

const Navbar = () => {
  return (
    <nav className="mb-20 flex justify-between items-center py-6">
      <div className="flex flex-shrink-0 items-center">
        <img src={logo} alt="logo" className="w-32 sm:w-48 md:w-64 h-auto" />
      </div>
      <div className="hidden md:flex items-center gap-8 justify-center">
        <motion.a
          whileHover={{ scale: 1.05 }}
          href="/"
          className="text-lg font-light hover:text-purple-500 transition-colors"
        >
          Home
        </motion.a>
        <motion.a
          whileHover={{ scale: 1.05 }}
          href="#about"
          onClick={(e) => {
            e.preventDefault();
            document.querySelector("#about").scrollIntoView({
              behavior: "smooth",
            });
          }}
          className="text-lg font-light hover:text-purple-500 transition-colors"
        >
          About Us
        </motion.a>
        <motion.a
          whileHover={{ scale: 1.05 }}
          href="#technologies"
          onClick={(e) => {
            e.preventDefault();
            document.querySelector("#technologies").scrollIntoView({
              behavior: "smooth",
            });
          }}
          className="text-lg font-light hover:text-purple-500 transition-colors"
        >
          Technologies
        </motion.a>
        <motion.a
          whileHover={{ scale: 1.05 }}
          href="#experience"
          onClick={(e) => {
            e.preventDefault();
            document.querySelector("#experience").scrollIntoView({
              behavior: "smooth",
            });
          }}
          className="text-lg font-light hover:text-purple-500 transition-colors"
        >
          Experience
        </motion.a>
        <motion.a
          whileHover={{ scale: 1.05 }}
          href="#galleries"
          onClick={(e) => {
            e.preventDefault();
            document.querySelector("#galleries").scrollIntoView({
              behavior: "smooth",
            });
          }}
          className="text-lg font-light hover:text-purple-500 transition-colors"
        >
          Galleries
        </motion.a>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="px-10 py-4 text-lg font-medium text-white bg-gradient-to-r from-purple-600 to-cyan-500 rounded-md hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300"
          onClick={() => window.location.href = '/create-logo'}
        >
          Get Started
        </motion.button>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() =>
            document.getElementById("mobileMenu").classList.toggle("hidden")
          }
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

      {/* Mobile Menu */}
      <motion.div
        id="mobileMenu"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="hidden absolute top-20 left-0 right-0 bg-black border-t border-neutral-800 p-4 md:hidden"
      >
        <div className="flex flex-col items-center gap-4">
          <motion.a
            whileHover={{ scale: 1.05 }}
            href="/"
            className="text-lg font-light hover:text-purple-500 transition-colors"
          >
            Home
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.05 }}
            href="#about"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#about").scrollIntoView({
                behavior: "smooth",
              });
              document.getElementById("mobileMenu").classList.add("hidden");
            }}
            className="text-lg font-light hover:text-purple-500 transition-colors"
          >
            About Us
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.05 }}
            href="#technologies"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#technologies").scrollIntoView({
                behavior: "smooth",
              });
              document.getElementById("mobileMenu").classList.add("hidden");
            }}
            className="text-lg font-light hover:text-purple-500 transition-colors"
          >
            Technologies
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.05 }}
            href="#experience"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#experience").scrollIntoView({
                behavior: "smooth",
              });
              document.getElementById("mobileMenu").classList.add("hidden");
            }}
            className="text-lg font-light hover:text-purple-500 transition-colors"
          >
            Experience
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.05 }}
            href="#galleries"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#galleries").scrollIntoView({
                behavior: "smooth",
              });
              document.getElementById("mobileMenu").classList.add("hidden");
            }}
            className="text-lg font-light hover:text-purple-500 transition-colors"
          >
            Galleries
          </motion.a>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-4 text-lg font-medium text-white bg-gradient-to-r from-purple-600 to-cyan-500 rounded-md hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300"
          >
            Get Started
          </motion.button>
        </div>
      </motion.div>
    </nav>
  );
};

export default Navbar;
