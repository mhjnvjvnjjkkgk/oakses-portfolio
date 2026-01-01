import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { ZoomSection } from './ui/ZoomSection';
import { ParallaxBackground } from './ui/ParallaxBackground';
import { InteractiveHeading } from './ui/InteractiveHeading';

const steps = [
  {
    num: "01",
    title: "Discovery",
    desc: "We dive deep into your brand's core values, audience, and goals. I ask the hard questions to find the right answers."
  },
  {
    num: "02",
    title: "Strategy",
    desc: "Crafting a roadmap. We define the visual direction and user experience strategy before touching a single pixel."
  },
  {
    num: "03",
    title: "Design",
    desc: "The magic happens. I explore concepts, iterate on layouts, and build a visual language that speaks to your users."
  },
  {
    num: "04",
    title: "Development",
    desc: "Turning static visuals into living, breathing digital experiences using modern frameworks and clean code."
  },
  {
    num: "05",
    title: "Launch",
    desc: "Testing, refining, and finally, releasing your project to the world with a bang."
  }
];

const Process: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"] // Adjusted offset so line fills as user scrolls through the middle
  });

  return (
    <section ref={containerRef} className="relative bg-[#050505] pt-20 pb-40 px-6 md:px-20 z-20 overflow-hidden">
      <ParallaxBackground />
      <div className="max-w-7xl mx-auto relative z-10">
        <ZoomSection 
           className="mb-20"
        >
          <h2 className="text-sm font-bold tracking-[0.3em] text-green-500 uppercase mb-4">The Workflow</h2>
          <div className="text-4xl md:text-6xl font-black text-white">
            <InteractiveHeading text="How We Build" /> <br />
            <InteractiveHeading text="The Future" />
          </div>
        </ZoomSection>

        <div className="relative">
          {/* Vertical Line Container */}
          <div className="absolute left-[19px] top-0 bottom-0 w-[2px] bg-white/10 md:left-1/2 md:-ml-[1px]" />
          
          {/* Active Progress Line */}
          <motion.div 
            style={{ scaleY: scrollYProgress }} 
            className="absolute left-[19px] top-0 bottom-0 w-[2px] bg-green-500 origin-top md:left-1/2 md:-ml-[1px] shadow-[0_0_15px_rgba(34,197,94,0.8)] z-0" 
          />

          <div className="space-y-24 md:space-y-40 pt-10">
            {steps.map((step, i) => (
              <StepCard 
                key={i} 
                step={step} 
                index={i} 
                progress={scrollYProgress} 
                totalSteps={steps.length} 
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const StepCard: React.FC<{ step: any; index: number; progress: MotionValue<number>; totalSteps: number }> = ({ step, index, progress, totalSteps }) => {
  const isEven = index % 2 === 0;
  
  // Calculate threshold for this step. 
  // We want the light to hit roughly when the line reaches this item's vertical position.
  // Assuming items are evenly spaced, we map the index to a percentage.
  const threshold = index / (totalSteps - 1); // 0, 0.25, 0.5, 0.75, 1
  
  // Create a small window around the threshold to trigger the active state nicely
  // Actually, we want it to stay lit once passed.
  const isLit = useTransform(progress, (v) => v >= threshold - 0.05 ? 1 : 0);
  const color = useTransform(progress, (v) => v >= threshold - 0.05 ? "#22c55e" : "#333");
  const shadow = useTransform(progress, (v) => v >= threshold - 0.05 ? "0 0 20px #22c55e" : "none");
  const scale = useTransform(progress, (v) => v >= threshold - 0.05 ? 1.2 : 1);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className={`relative flex flex-col md:flex-row items-start ${isEven ? 'md:flex-row-reverse' : ''} gap-10 md:gap-20`}
    >
      {/* Center Point - Lights up when line passes */}
      <div className="absolute left-0 top-0 w-10 h-10 rounded-full bg-[#050505] border-4 border-white/10 z-10 md:left-1/2 md:-translate-x-1/2 flex items-center justify-center">
         <motion.div 
           style={{ 
             backgroundColor: color,
             boxShadow: shadow,
             opacity: isLit,
             scale: scale
           }}
           className="w-4 h-4 rounded-full transition-colors duration-200" 
         />
      </div>

      {/* Content */}
      <div className={`pl-16 md:pl-0 w-full md:w-[calc(50%-40px)] ${!isEven ? 'md:text-right' : ''}`}>
         <span className="text-8xl font-black text-white/5 block -mb-10 relative z-0">{step.num}</span>
         <div className="relative z-10">
            <h4 className="text-3xl font-bold text-white mb-4">{step.title}</h4>
            <p className="text-gray-400 leading-relaxed text-lg">{step.desc}</p>
         </div>
      </div>
      
      {/* Empty space for the other side */}
      <div className="hidden md:block md:w-[calc(50%-40px)]" />
    </motion.div>
  )
}

export default Process;