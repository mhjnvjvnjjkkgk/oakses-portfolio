import React from 'react';
import { motion, useMotionValue, useMotionTemplate } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { ParallaxBackground } from './ui/ParallaxBackground';
import { ZoomSection } from './ui/ZoomSection';
import { InteractiveHeading } from './ui/InteractiveHeading';

const About: React.FC = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  // Slide up animation for heading lines
  const slideUp = {
    hidden: { y: "100%", opacity: 0 },
    visible: { 
        y: "0%", 
        opacity: 1,
        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    }
  };
  
  const headingContainer = {
    visible: {
        transition: { staggerChildren: 0.15 }
    }
  };

  return (
    <section 
      id="about"
      className="min-h-screen w-full bg-[#080808] flex items-center justify-center py-32 px-6 md:px-20 relative z-20 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      <ParallaxBackground />

      {/* Interactive Grid */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]" />
        <motion.div
            className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:40px_40px]"
            style={{
                maskImage: useMotionTemplate`radial-gradient(300px circle at ${mouseX}px ${mouseY}px, black, transparent)`,
                WebkitMaskImage: useMotionTemplate`radial-gradient(300px circle at ${mouseX}px ${mouseY}px, black, transparent)`
            }}
        />
      </div>

      {/* Dynamic Background Elements */}
      <motion.div 
         animate={{ 
           scale: [1, 1.2, 1],
           rotate: [0, 90, 0],
           opacity: [0.1, 0.2, 0.1] 
         }}
         transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
         className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-b from-green-900/10 to-transparent rounded-full blur-[100px] pointer-events-none z-0"
      />

      <ZoomSection className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-20 items-center relative z-10">
        
        <div className="relative">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={headingContainer}
            className="relative z-10"
          >
            <h2 className="text-5xl md:text-8xl font-bold mb-8 leading-[1.1] tracking-tight">
              {/* Masked Reveal for Line 1 */}
              <div className="overflow-hidden">
                <motion.div variants={slideUp}>
                    <InteractiveHeading text="Designing" />
                </motion.div> 
              </div>
              
              {/* Masked Reveal for Line 2 */}
              <div className="overflow-hidden py-2">
                <motion.div variants={slideUp}>
                    <span className="text-green-500 font-serif italic pr-4 inline-block drop-shadow-[0_0_20px_rgba(34,197,94,0.4)]">
                        <InteractiveHeading text="Tomorrow's" />
                    </span>
                </motion.div>
              </div>

              {/* Masked Reveal for Line 3 */}
              <div className="overflow-hidden">
                <motion.div variants={slideUp}>
                    <InteractiveHeading text="Aesthetics." />
                </motion.div>
              </div>
            </h2>
          </motion.div>
          
          <motion.div 
             initial={{ scale: 0.8, opacity: 0 }}
             whileInView={{ scale: 1, opacity: 1 }}
             viewport={{ once: true }}
             transition={{ delay: 0.2, duration: 0.8 }}
             className="absolute -top-20 -left-20 w-60 h-60 bg-emerald-900/20 rounded-full blur-[80px]"
          />
        </div>

        <div className="flex flex-col justify-center">
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-2xl md:text-4xl text-white font-light leading-snug mb-12"
          >
            I am OAKSES. A visionary Graphic Designer and Entrepreneur based in the digital realm. I don't just design; I engineer visual experiences that leave a lasting imprint on the digital landscape.
          </motion.p>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="text-lg md:text-xl text-white font-light leading-relaxed mb-12"
          >
            My work bridges the gap between functional design and artistic expression. Whether it's branding, web interfaces, or motion graphics, I bring a unique perspective that turns ordinary concepts into extraordinary realities.
          </motion.p>
          
          <motion.button 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ delay: 0.6, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            whileHover="hover"
            whileTap={{ scale: 0.95 }}
            className="group w-fit flex items-center gap-4 text-white uppercase tracking-[0.2em] text-sm transition-colors"
          >
            <span className="group-hover:text-green-400 transition-colors duration-300">Read My Story</span>
            <motion.span 
              variants={{
                hover: { rotate: -45, scale: 1.1, backgroundColor: "#ffffff", color: "#000000" }
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="p-3 border border-white/20 rounded-full text-white transition-all duration-300"
            >
              <ArrowRight size={16} />
            </motion.span>
          </motion.button>
        </div>

      </ZoomSection>
    </section>
  );
};

export default About;