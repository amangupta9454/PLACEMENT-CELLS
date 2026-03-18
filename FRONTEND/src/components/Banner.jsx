import React, { useEffect, useState } from 'react';
import { X, Bell } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Banner = ({ message, type = 'high', onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      className={`w-full py-3 px-6 flex items-center justify-between shadow-md z-50 ${
        type === 'high' ? 'bg-red-600 text-white' : 'bg-blue-600 text-white'
      }`}
    >
      <div className="flex items-center gap-3">
        <Bell className="animate-pulse" size={20} />
        <span className="font-semibold text-sm md:text-base">{message}</span>
      </div>
      <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-full transition-colors">
        <X size={20} />
      </button>
    </motion.div>
  );
};

export default Banner;
