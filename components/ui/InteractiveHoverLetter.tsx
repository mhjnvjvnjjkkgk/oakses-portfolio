import React from "react";
import { motion } from "framer-motion";

interface InteractiveHoverLetterProps {
  children: string;
  className?: string;
}

export const InteractiveHoverLetter: React.FC<InteractiveHoverLetterProps> = ({ children, className }) => {
  return (
    <motion.span
      className={`inline-block cursor-default ${className}`}
      whileHover={{
        scale: [1, 1.4, 1.2],
        rotate: [0, 15, -5, 0],
        color: "#86efac", // green-300
        textShadow: "0 0 8px rgb(34 197 94 / 0.6)", // green-500
        transition: { duration: 0.4, type: "spring" }
      }}
      whileTap={{ scale: 0.9 }}
    >
      {children}
    </motion.span>
  );
};