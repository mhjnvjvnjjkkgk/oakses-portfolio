import React, { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
}

export const TiltCard: React.FC<TiltCardProps> = ({ children, className = "", spotlightColor = "rgba(34, 197, 94, 0.15)" }) => {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const xPct = clientX - left - width / 2;
    const yPct = clientY - top - height / 2;
    
    x.set(xPct);
    y.set(yPct);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  const rotateX = useTransform(mouseY, [-200, 200], [15, -15]); // Inverse Y for natural tilt
  const rotateY = useTransform(mouseX, [-200, 200], [-15, 15]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`relative transform-gpu transition-all duration-200 ease-out ${className}`}
    >
      <div 
        style={{ transform: "translateZ(50px)" }} 
        className="relative z-10 h-full"
      >
        {children}
      </div>
      
      {/* Gloss/Reflection Layer */}
      <motion.div
        style={{
          background: useMotionTemplate`radial-gradient(
            800px circle at calc(50% + ${mouseX}px) calc(50% + ${mouseY}px),
            ${spotlightColor},
            transparent 80%
          )`,
          opacity: useTransform(mouseX, [-200, 200], [0.4, 0.4]) // Always visible on hover mostly
        }}
        className="absolute inset-0 z-0 pointer-events-none rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      />
    </motion.div>
  );
};