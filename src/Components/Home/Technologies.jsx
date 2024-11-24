import React from "react";
import { motion } from "framer-motion";
import { RiReactjsLine } from "react-icons/ri";
import { SiTailwindcss } from "react-icons/si";
import { SiFigma } from "react-icons/si";
import { SiJavascript } from "react-icons/si";
import { DiHtml5, DiMysql } from "react-icons/di";
import { Helmet } from "react-helmet";

const Technologies = () => {
  return (
    <>
      <Helmet>
        <title>LogoHub - Technologies</title>
      </Helmet>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="border-b border-neutral-900 pb-4 lg:mb-35"
        id="technologies"
      >
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="my-14 text-5xl font-thin tracking-tight text-center"
        >
          Technologies
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-14 grid grid-cols-2 md:flex md:flex-wrap items-center justify-center gap-6"
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="rounded-2xl bg-neutral-800 p-4"
          >
            <RiReactjsLine className="text-7xl text-cyan-400" />
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="rounded-2xl bg-neutral-800 p-4"
          >
            <SiTailwindcss className="text-7xl text-blue-500" />
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="rounded-2xl bg-neutral-800 p-4"
          >
            <SiFigma className="text-7xl text-purple-500" />
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="rounded-2xl bg-neutral-800 p-4"
          >
            <SiJavascript className="text-7xl text-yellow-500" />
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="rounded-2xl bg-neutral-800 p-4"
          >
            <DiHtml5 className="text-7xl text-orange-500" />
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="rounded-2xl bg-neutral-800 p-4"
          >
            <DiMysql className="text-7xl text-blue-500" />
          </motion.div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default Technologies;
