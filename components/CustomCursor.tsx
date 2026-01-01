import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [hoveredImageSrc, setHoveredImageSrc] = useState<string | null>(null);
  
  // Use a ref to track the current src without triggering re-renders inside the event loop logic
  const hoveredImageRef = useRef<string | null>(null);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for cursor movement
  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  // Magnifier position (percentage)
  const magX = useMotionValue(0);
  const magY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Update global cursor position
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      const target = e.target as HTMLElement;
      
      // Clickable detection
      const isClickable = target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button');
      setIsHovering(!!isClickable);

      // Image detection
      if (target.tagName === 'IMG') {
        const img = target as HTMLImageElement;
        const rect = img.getBoundingClientRect();
        
        // Calculate relative position within the image (0-100%)
        // We use this to position the background image inside the cursor
        const xPct = (e.clientX - rect.left) / rect.width * 100;
        const yPct = (e.clientY - rect.top) / rect.height * 100;

        magX.set(xPct);
        magY.set(yPct);

        if (hoveredImageRef.current !== img.src) {
          hoveredImageRef.current = img.src;
          setHoveredImageSrc(img.src);
        }
      } else {
        if (hoveredImageRef.current !== null) {
          hoveredImageRef.current = null;
          setHoveredImageSrc(null);
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY, magX, magY]);

  const backgroundPosition = useMotionTemplate`${magX}% ${magY}%`;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999]"
      style={{
        x: springX,
        y: springY,
        translateX: "-50%", 
        translateY: "-50%", 
      }}
    >
        <motion.div 
            className="relative rounded-full overflow-hidden bg-black/20 backdrop-blur-sm flex items-center justify-center"
            animate={{
                width: hoveredImageSrc ? 200 : (isHovering ? 60 : 20),
                height: hoveredImageSrc ? 200 : (isHovering ? 60 : 20),
                borderColor: hoveredImageSrc ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.3)",
                borderWidth: hoveredImageSrc ? 2 : 1,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
            {/* Standard Dot (Only visible when NOT magnifying) */}
            <motion.div 
                animate={{ 
                    opacity: hoveredImageSrc ? 0 : 1,
                    scale: hoveredImageSrc ? 0 : 1 
                }}
                className="w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_10px_white]" 
            />

            {/* Magnifier Layer */}
            {hoveredImageSrc && (
                 <motion.div 
                    className="absolute inset-0 bg-no-repeat"
                    style={{
                        backgroundImage: `url(${hoveredImageSrc})`,
                        backgroundPosition: backgroundPosition,
                        backgroundSize: '200%', // 2x zoom feels most natural for "magnifying"
                    }}
                 />
            )}
            
            {/* Magnifier Shine/Reflection Overlay */}
            {hoveredImageSrc && (
                <div className="absolute inset-0 rounded-full shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] bg-gradient-to-tr from-transparent via-white/20 to-transparent pointer-events-none" />
            )}
        </motion.div>
    </motion.div>
  );
};

export default CustomCursor;