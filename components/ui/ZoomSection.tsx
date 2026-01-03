import React from 'react';
import { motion } from 'framer-motion';

interface ZoomSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export const ZoomSection: React.FC<ZoomSectionProps> = ({ children, className = "", delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 50 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.8,
        delay: delay,
        ease: [0.22, 1, 0.36, 1] // Custom bezier for a premium "ease out" feel
      }}
      className={`w-full ${className}`}
    >
      {children}
    </motion.div>
  );
};
