import { useState, useCallback } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';

const TiltCard = ({ children, className = "" }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Cursor dot position (spring-smoothed for natural feel)
  const cursorX = useSpring(0, { stiffness: 400, damping: 28 });
  const cursorY = useSpring(0, { stiffness: 400, damping: 28 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback(({ currentTarget, clientX, clientY }) => {
    const { left, top } = currentTarget.getBoundingClientRect();
    const x = clientX - left;
    const y = clientY - top;
    mouseX.set(x);
    mouseY.set(y);
    cursorX.set(x);
    cursorY.set(y);
  }, [mouseX, mouseY, cursorX, cursorY]);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  // Radial shimmer gradient following mouse
  const shimmer = useMotionTemplate`radial-gradient(220px circle at ${mouseX}px ${mouseY}px, rgba(59,130,246,0.10), transparent 75%)`;

  // Cursor dot position for transform
  const cursorStyle = useMotionTemplate`translate(${cursorX}px, ${cursorY}px)`;

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      whileHover={{ y: -5 }}
      className={`glass-panel p-6 rounded-2xl relative overflow-hidden transition-shadow duration-300 
                  hover:shadow-2xl hover:shadow-blue-500/10 dark:hover:shadow-blue-500/20 
                  border border-[var(--panel-border)] cursor-none ${className}`}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
    >
      {/* Radial gradient shimmer */}
      <motion.div
        style={{ background: shimmer }}
        className="absolute inset-0 rounded-2xl pointer-events-none z-0"
      />

      {/* Custom glowing cursor dot */}
      <motion.div
        style={{ transform: cursorStyle }}
        className="absolute top-0 left-0 pointer-events-none z-20"
        animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.3 }}
        transition={{ duration: 0.2 }}
      >
        {/* Outer glow ring */}
        <div className="absolute -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-blue-400/40 dark:border-blue-400/30 bg-blue-500/5" />
        {/* Inner solid dot */}
        <div className="absolute -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-blue-500 shadow-lg shadow-blue-500/50" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};

export default TiltCard;
