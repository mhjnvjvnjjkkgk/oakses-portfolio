import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { ArrowDown, Globe } from 'lucide-react';

const Hero: React.FC = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"]
  });

  // Mouse tracking for subtle 3D effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { damping: 50, stiffness: 400 });
  const smoothMouseY = useSpring(mouseY, { damping: 50, stiffness: 400 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { innerWidth, innerHeight } = window;
    mouseX.set((e.clientX / innerWidth) - 0.5);
    mouseY.set((e.clientY / innerHeight) - 0.5);
  };

  // Simple transforms
  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-5, 5]);
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacityText = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Skills for rotating text
  const skills = [
    "Graphic Designer",
    "UI/UX Designer",
    "Jersey Designer",
    "Thumbnail Designer",
    "Logo Designer",
    "Poster Designer"
  ];

  return (
    <section
      ref={targetRef}
      onMouseMove={handleMouseMove}
      className="h-screen w-full relative flex items-center justify-center overflow-hidden bg-[#050505]"
    >
      {/* Simple gradient orb - CSS only, no animation overhead */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-30 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(34, 197, 94, 0.4) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Main Container */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          y: yText,
          opacity: opacityText,
        }}
        className="relative z-10 flex flex-col items-center justify-center px-6"
      >

        {/* Available Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="absolute top-[15%] left-[15%] hidden md:block"
        >
          <div className="relative w-24 h-24 flex items-center justify-center animate-spin-slow">
            <svg viewBox="0 0 100 100" width="100" height="100" className="absolute">
              <defs>
                <path id="circlePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
              </defs>
              <text fontSize="10" fill="white" letterSpacing="2px" fontWeight="600">
                <textPath href="#circlePath">AVAILABLE FOR WORK • 2025 •</textPath>
              </text>
            </svg>
            <Globe className="text-green-500" size={24} />
          </div>
        </motion.div>

        {/* Experience Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6 flex items-center gap-4"
        >
          <div className="h-[1px] w-12 bg-green-500/50" />
          <span className="font-mono text-green-400 tracking-widest text-xs uppercase">6+ Years Experience</span>
          <div className="h-[1px] w-12 bg-green-500/50" />
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-[15vw] md:text-[18vw] font-black tracking-tighter leading-none text-white text-center"
        >
          OAKSES
        </motion.h1>

        {/* Subtitle with Skills */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 text-center"
        >
          <p className="text-gray-400 text-sm md:text-lg uppercase tracking-[0.3em] font-light mb-4">
            Graphic Designer • UI/UX Designer • Jersey Designer
          </p>
          <p className="text-gray-500 text-xs md:text-sm uppercase tracking-[0.2em]">
            Thumbnail • Logo • Poster Designer
          </p>
        </motion.div>

        {/* Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-12 flex flex-wrap justify-center gap-4 md:gap-8"
        >
          <div className="px-4 py-2 border border-white/10 rounded-full bg-white/5 backdrop-blur-sm">
            <span className="text-xs md:text-sm text-gray-300">
              <span className="text-green-400 font-semibold">150K+</span> Discord Server Work
            </span>
          </div>
          <a
            href="https://www.elevez.shop"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 border border-green-500/30 rounded-full bg-green-500/10 hover:bg-green-500/20 transition-colors"
          >
            <span className="text-xs md:text-sm text-green-400">
              Elevez Clothing →
            </span>
          </a>
        </motion.div>

      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
      >
        <span className="text-[10px] uppercase tracking-widest text-gray-500">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ArrowDown size={16} className="text-green-500" />
        </motion.div>
      </motion.div>

      <style>{`
        .animate-spin-slow {
          animation: spin 15s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
};

export default Hero;