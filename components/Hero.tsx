import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring, useVelocity, useAnimationFrame } from 'framer-motion';
import { wrap } from '@motionone/utils';
import { ArrowDown, Star, Globe } from 'lucide-react';
import { renderCanvas } from './ui/canvas';

// Velocity Text Component for the background
interface ParallaxTextProps {
  children: React.ReactNode;
  baseVelocity?: number;
}

const VelocityText: React.FC<ParallaxTextProps> = ({ children, baseVelocity = 100 }) => {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], { clamp: false });
  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);
  const directionFactor = useRef<number>(1);

  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);
    if (velocityFactor.get() < 0) directionFactor.current = -1;
    else if (velocityFactor.get() > 0) directionFactor.current = 1;
    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="flex whitespace-nowrap overflow-hidden absolute top-1/2 left-0 -translate-y-1/2 w-full opacity-10 select-none pointer-events-none z-0 mix-blend-overlay">
      <motion.div style={{ x }} className="flex text-[15vh] md:text-[25vh] font-black uppercase leading-none text-transparent text-stroke-white">
        <span className="mr-12">{children} </span>
        <span className="mr-12">{children} </span>
        <span className="mr-12">{children} </span>
        <span className="mr-12">{children} </span>
      </motion.div>
    </div>
  );
};

const Hero: React.FC = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"]
  });

  // --- Mouse & Tilt Logic ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { damping: 50, stiffness: 400 });
  const smoothMouseY = useSpring(mouseY, { damping: 50, stiffness: 400 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { innerWidth, innerHeight } = window;
    const xPct = (e.clientX / innerWidth) - 0.5;
    const yPct = (e.clientY / innerHeight) - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  useEffect(() => {
    renderCanvas();
  }, []);

  // 3D Transforms based on mouse
  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-10, 10]);
  
  // Parallax elements
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacityText = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scaleText = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  
  // Independent floating elements
  const floatX1 = useTransform(smoothMouseX, [-0.5, 0.5], ["-50px", "50px"]);
  const floatY1 = useTransform(smoothMouseY, [-0.5, 0.5], ["-50px", "50px"]);
  
  const floatX2 = useTransform(smoothMouseX, [-0.5, 0.5], ["30px", "-30px"]);
  const floatY2 = useTransform(smoothMouseY, [-0.5, 0.5], ["30px", "-30px"]);

  return (
    <section 
      ref={targetRef} 
      onMouseMove={handleMouseMove}
      className="h-screen w-full relative flex items-center justify-center overflow-hidden bg-[#050505] perspective-1000"
    >
      {/* Background Canvas & Noise is now global in App.tsx, but we keep canvas here for the sine wave */}
      <canvas className="pointer-events-none absolute inset-0 mx-auto w-full h-full opacity-30 mix-blend-screen z-0" id="canvas" />
      
      {/* Velocity Marquee Background */}
      <VelocityText baseVelocity={2}>Graphic Designer Visual Alchemist</VelocityText>

      {/* Main 3D Container */}
      <motion.div 
        style={{ 
            rotateX, 
            rotateY,
            y: yText,
            opacity: opacityText,
            scale: scaleText,
            transformStyle: "preserve-3d"
        }}
        className="relative z-10 flex flex-col items-center justify-center w-full h-full"
      >
        
        {/* Floating Abstract Shape 1 (Gradient Orb) */}
        <motion.div 
            style={{ x: floatX1, y: floatY1, z: 50 }}
            className="absolute top-[20%] right-[15%] w-32 h-32 md:w-64 md:h-64 rounded-full bg-gradient-to-tr from-green-500 to-transparent blur-[60px] opacity-60 mix-blend-screen pointer-events-none"
        />

        {/* Floating Abstract Shape 2 (Star) */}
        <motion.div 
            style={{ x: floatX2, y: floatY2, z: 100 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-[25%] left-[10%] text-white/5 pointer-events-none hidden md:block"
        >
             <Star size={300} strokeWidth={0.5} />
        </motion.div>

        {/* Floating Badge (Interactive) */}
        <motion.div
            style={{ x: floatX2, y: floatY1, z: 150 }}
            className="absolute top-[15%] left-[20%] hidden md:block cursor-pointer"
            whileHover={{ scale: 1.1, rotate: 10 }}
        >
            <div className="relative w-24 h-24 flex items-center justify-center animate-spin-slow">
                <svg viewBox="0 0 100 100" width="100" height="100" className="absolute top-0 left-0 w-full h-full">
                    <defs>
                        <path id="circlePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
                    </defs>
                    <text fontSize="11" fill="white" letterSpacing="1px" fontWeight="bold">
                        <textPath href="#circlePath">
                            AVAILABLE FOR WORK • 2024 •
                        </textPath>
                    </text>
                </svg>
                <Globe className="text-green-500" size={24} />
            </div>
        </motion.div>

        {/* Pre-title */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{ transform: "translateZ(60px)" }}
            className="mb-4 flex items-center gap-4"
        >
             <div className="h-[1px] w-12 bg-green-500/50"></div>
             <span className="font-mono text-green-400 tracking-widest text-xs md:text-sm uppercase">Est. 2024</span>
             <div className="h-[1px] w-12 bg-green-500/50"></div>
        </motion.div>

        {/* HERO TITLE - Single Line Side-by-Side */}
        <div 
            className="relative font-black tracking-tighter leading-none flex items-center justify-center select-none mix-blend-difference z-20"
            style={{ transform: "translateZ(100px)" }}
        >
             <motion.div 
                initial="hidden"
                animate="visible"
                variants={{
                    hidden: { opacity: 1 },
                    visible: {
                        transition: {
                            staggerChildren: 0.1,
                            delayChildren: 0.1
                        }
                    }
                }}
                className="flex"
             >
                {Array.from("OAKSES").map((char, i) => (
                    <motion.span
                        key={i}
                        variants={{
                            hidden: { opacity: 0, filter: "blur(10px)", y: 20 },
                            visible: { 
                                opacity: 1, 
                                filter: "blur(0px)",
                                y: 0,
                                transition: { duration: 1, ease: [0.2, 0.65, 0.3, 0.9] } 
                            }
                        }}
                        className="text-[13vw] md:text-[18vw] text-white hover:text-green-500 transition-colors duration-300 relative cursor-default"
                    >
                        {char}
                    </motion.span>
                ))}
             </motion.div>
        </div>

        {/* Subtitle / Role */}
        <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            style={{ transform: "translateZ(40px)" }}
            className="mt-8 text-gray-400 text-xs md:text-xl uppercase tracking-[0.5em] font-light backdrop-blur-md bg-white/5 px-6 py-3 rounded-full border border-white/10"
        >
            Digital Designer
        </motion.p>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ delay: 1.5, duration: 1 }}
         className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
      >
          <span className="text-[10px] uppercase tracking-widest text-gray-500">Scroll</span>
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <ArrowDown size={16} className="text-green-500" />
          </motion.div>
      </motion.div>
      
      <style jsx>{`
        .text-stroke-white {
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.3);
        }
        .text-stroke-green {
            -webkit-text-stroke: 2px #22c55e;
        }
        .animate-spin-slow {
            animation: spin 10s linear infinite;
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