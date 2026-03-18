import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// ─── Loader ───────────────────────────────────────────────────────────────────
export const Loader = () => (
  <div className="flex h-screen items-center justify-center bg-[var(--bg-primary)]">
    <motion.div
      animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360], borderRadius: ['20%', '50%', '20%'] }}
      transition={{ duration: 2, ease: 'easeInOut', repeat: Infinity }}
      className="w-16 h-16 border-4 border-blue-500 border-t-purple-500"
    />
  </div>
);

// ─── AnimatedSection — scroll-triggered fade + rise ───────────────────────────
export const AnimatedSection = ({ children, delay = 0, className = '' }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.15 }}
    transition={{ duration: 0.65, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    className={className}
  >
    {children}
  </motion.div>
);

// ─── SlideFromLeft ────────────────────────────────────────────────────────────
export const SlideFromLeft = ({ children, delay = 0, className = '' }) => (
  <motion.div
    initial={{ opacity: 0, x: -60 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    className={className}
  >
    {children}
  </motion.div>
);

// ─── SlideFromRight ───────────────────────────────────────────────────────────
export const SlideFromRight = ({ children, delay = 0, className = '' }) => (
  <motion.div
    initial={{ opacity: 0, x: 60 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    className={className}
  >
    {children}
  </motion.div>
);

// ─── ScaleUp ──────────────────────────────────────────────────────────────────
export const ScaleUp = ({ children, delay = 0, className = '' }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.88 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.6, delay, ease: [0.34, 1.56, 0.64, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

// ─── StaggerContainer + StaggerChild ─────────────────────────────────────────
export const StaggerContainer = ({ children, className = '', stagger = 0.1 }) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.1 }}
    variants={{ visible: { transition: { staggerChildren: stagger } } }}
    className={className}
  >
    {children}
  </motion.div>
);

export const StaggerChild = ({ children, className = '' }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 30 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
    }}
    className={className}
  >
    {children}
  </motion.div>
);

// ─── ParallaxLayer — wraps content that moves at a different scroll speed ─────
export const ParallaxLayer = ({ children, speed = 0.3, className = '' }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [`${-speed * 100}px`, `${speed * 100}px`]);
  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
};
