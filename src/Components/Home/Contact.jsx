import React from 'react'
import { motion } from "framer-motion";

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  const inputStyle = `
    w-full px-6 py-4 text-lg bg-neutral-100 
    border-2 border-neutral-200 rounded-lg 
    focus:outline-none focus:border-blue-500 focus:bg-white
    hover:border-blue-400 hover:bg-neutral-50
    transition-all duration-300 ease-in-out
    placeholder:text-neutral-400
  `;
  
  const labelStyle = "block mb-3 text-base font-medium text-white";

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="border-b border-neutral-900 pb-24"
    >
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="my-12 text-5xl font-thin tracking-tight text-center"
      >
        Get in Touch
      </motion.h1>
      
      <div className="max-w-3xl mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-16"
        >
          <p className="text-lg text-neutral-300">
            Have any questions? We'd love to hear from you.
          </p>
        </motion.div>

        <motion.form 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          onSubmit={handleSubmit} 
          className="space-y-10"
        >
          {/* Name Input */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="relative group"
          >
            <label htmlFor="name" className={labelStyle}>
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className={inputStyle}
              placeholder="Enter your name"
            />
          </motion.div>

          {/* Email Input */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="relative group"
          >
            <label htmlFor="email" className={labelStyle}>
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className={inputStyle}
              placeholder="Enter your email"
            />
          </motion.div>

          {/* Message Textarea */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="relative group"
          >
            <label htmlFor="message" className={labelStyle}>
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="6"
              required
              className={`${inputStyle} resize-none`}
              placeholder="Enter your message"
            ></textarea>
          </motion.div>

          {/* Submit Button */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="flex justify-center pt-6"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="px-10 py-4 text-lg bg-blue-600 text-white font-medium rounded-lg 
                hover:bg-blue-700 active:bg-blue-800 
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 
                transition-all duration-200 ease-in-out
                shadow-md hover:shadow-xl"
            >
              Send Message
            </motion.button>
          </motion.div>
        </motion.form>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="mt-20 flex justify-center space-x-8"
        >
          <motion.a 
            whileHover={{ scale: 1.1 }}
            href="#" 
            className="text-neutral-600 hover:text-blue-600 transition-all duration-200"
          >
            <span className="sr-only">LinkedIn</span>
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
          </motion.a>
          <motion.a 
            whileHover={{ scale: 1.1 }}
            href="#" 
            className="text-neutral-600 hover:text-blue-600 transition-all duration-200"
          >
            <span className="sr-only">GitHub</span>
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"/>
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default Contact