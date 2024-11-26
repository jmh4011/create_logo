import React from "react";
import { motion } from "framer-motion";
import { Feather, Code, Activity, Database, Layout, Layers } from "react-feather";

const Technologies = () => {
  return (
    <div className="border-b border-neutral-900 pb-4" id="technologies">
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
          <Feather size={56} color="#61DAFB" />
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="rounded-2xl bg-neutral-800 p-4"
        >
          <Code size={56} color="#38BDF8" />
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="rounded-2xl bg-neutral-800 p-4"
        >
          <Layout size={56} color="#A855F7" />
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="rounded-2xl bg-neutral-800 p-4"
        >
          <Activity size={56} color="#FACC15" />
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="rounded-2xl bg-neutral-800 p-4"
        >
          <Database size={56} color="#FB923C" />
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="rounded-2xl bg-neutral-800 p-4"
        >
          <Layers size={56} color="#0EA5E9" />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Technologies;
