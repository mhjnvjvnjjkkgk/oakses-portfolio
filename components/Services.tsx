import React from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { Palette, Layers, Box, Zap, Sparkles } from 'lucide-react';
import { Service } from '../types';
import { ZoomSection } from './ui/ZoomSection';
import { ParallaxBackground } from './ui/ParallaxBackground';
import { InteractiveHeading } from './ui/InteractiveHeading';

const services: Service[] = [
  {
    id: 1,
    title: "Brand Identity",
    description: "Crafting memorable logos and visual systems that define your business.",
    icon: <Palette className="w-8 h-8" />
  },
  {
    id: 2,
    title: "UI/UX Design",
    description: "Designing intuitive and stunning digital interfaces for web and mobile.",
    icon: <Layers className="w-8 h-8" />
  },
  {
    id: 3,
    title: "3D Visuals",
    description: "Creating immersive 3D assets and environments for modern web experiences.",
    icon: <Box className="w-8 h-8" />
  },
  {
    id: 4,
    title: "Motion Graphics",
    description: "Bringing static designs to life with smooth, engaging animation.",
    icon: <Zap className="w-8 h-8" />
  }
];

interface SpotlightCardProps {
  children: React.ReactNode;
}

const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 20, // Subtle upward motion
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.5,
        ease: "easeOut" // Smooth, non-bouncy transition
      }
    }
};

const SpotlightCard: React.FC<SpotlightCardProps> = ({ children }) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <motion.div variants={cardVariants} className="h-full">
            <div 
                className="group relative border border-white/10 bg-[#0a0a0a] rounded-2xl overflow-hidden h-full flex flex-col"
                onMouseMove={handleMouseMove}
            >
                {/* Spotlight Gradient */}
                <motion.div
                    className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100"
                    style={{
                        background: useMotionTemplate`
                            radial-gradient(
                                650px circle at ${mouseX}px ${mouseY}px,
                                rgba(34, 197, 94, 0.15),
                                transparent 80%
                            )
                        `
                    }}
                />
                <div className="relative h-full flex flex-col flex-grow">{children}</div>
            </div>
        </motion.div>
    );
};

const Services: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15 // Slightly faster stagger for better flow
      }
    }
  };

  return (
    <section className="py-32 px-6 md:px-20 bg-[#050505] relative z-20 overflow-hidden">
       <ParallaxBackground />
       <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-green-900/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <ZoomSection 
          className="mb-20 text-center"
        >
          <h2 className="text-sm font-bold tracking-[0.3em] text-green-500 uppercase mb-4">What I Provide</h2>
          <div className="text-4xl md:text-5xl font-bold text-white flex justify-center">
            <InteractiveHeading text="Expertise & Services" />
          </div>
        </ZoomSection>

        <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
        >
          {services.map((service) => (
             <SpotlightCard key={service.id}>
                <div className="h-full p-8 flex flex-col relative z-10">
                    <motion.div 
                        whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="w-16 h-16 bg-[#111] border border-white/5 rounded-2xl flex items-center justify-center mb-6 text-white group-hover:bg-green-500/10 group-hover:text-green-400 group-hover:border-green-500/20 transition-colors duration-300 shadow-lg"
                    >
                        {service.icon}
                    </motion.div>
                    <h4 className="text-xl font-bold text-white mb-4 group-hover:translate-x-2 transition-transform duration-300 flex items-center gap-2">
                        {service.title}
                    </h4>
                    <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-grow">{service.description}</p>
                    
                    <div className="pt-6 border-t border-white/5 flex items-center text-xs font-bold uppercase tracking-widest text-gray-500 group-hover:text-white transition-colors mt-auto">
                        <Sparkles size={14} className="mr-2 text-green-500" />
                        Available Now
                    </div>
                </div>
            </SpotlightCard>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;