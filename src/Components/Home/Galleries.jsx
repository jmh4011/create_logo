import React from 'react'
import gallery1 from "../../assets/images/gallery.jpg";
import { motion } from "framer-motion";

const Galleries = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="border-b border-neutral-900 pb-4"
      id="galleries"
    >
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="my-14 text-5xl font-thin tracking-tight text-center"
      >
        Galleries
      </motion.h1>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 p-8"
      >
        {[...Array(8)].map((_, index) => (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 * index }}
            whileHover={{ scale: 1.05 }}
            key={index}
            className="group relative overflow-hidden rounded-2xl shadow-lg cursor-pointer hover:shadow-2xl transition-all duration-300"
            onClick={() => {
              const modal = document.getElementById('imageModal');
              const modalImg = document.getElementById('modalImage');
              modal.classList.remove('hidden');
              modalImg.src = gallery1;
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-0 group-hover:opacity-70 transition-opacity duration-300" />
            <img 
              src={gallery1} 
              alt={`gallery ${index + 1}`} 
              className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <p className="text-white text-lg font-semibold">Gallery {index + 1}</p>
              <p className="text-gray-200 text-sm">Click to view larger image</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Modal */}
      <motion.div 
        id="imageModal" 
        className="hidden fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => {
          if (e.target.id === 'imageModal') {
            e.target.classList.add('hidden');
          }
        }}
      >
        <motion.div 
          className="max-w-5xl max-h-[90vh] p-4 relative"
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <button 
            className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300 transition-colors"
            onClick={() => document.getElementById('imageModal').classList.add('hidden')}
          >
            ×
          </button>
          <img 
            id="modalImage" 
            src="" 
            alt="modal view" 
            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl" 
          />
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default Galleries