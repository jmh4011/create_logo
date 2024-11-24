import React from "react";
import { motion } from "framer-motion";
import aboutImg from "../../assets/images/aboutImage.jpg";
import { ABOUT_TEXT } from "../../constants";
import { Helmet } from "react-helmet";

const About = () => {
  return (
    <>
      <Helmet>
        <title>LogoHub - About</title>
      </Helmet>
      <div className="border-b border-neutral-900 pb-4" id="about">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="my-10 sm:my-8 text-center text-5xl sm:text-5xl font-thin tracking-tight"
        >
          About Us
        </motion.h1>
        <div className="flex flex-wrap">
          <div className="w-full p-8 flex flex-wrap lg:flex-nowrap items-center">
            <motion.div 
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-full lg:w-1/2 flex items-center justify-center"
            >
              <motion.img
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                src={aboutImg}
                alt="about"
                className="w-full sm:w-auto rounded-2xl"
              />
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="w-full lg:w-1/2 lg:pl-8 flex items-center"
            >
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="my-4 max-w-2xl py-8 text-xl font-light leading-relaxed tracking-tight text-center lg:text-left whitespace-pre-line"
              >
                {ABOUT_TEXT}
              </motion.p>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
