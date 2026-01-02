import React from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { Palette, Image, Shirt, Monitor, PenTool, Sparkles } from 'lucide-react';
import { Service } from '../types';

const services: Service[] = [
  {
    id: 1,
    title: "Graphic Design",
    description: "Creating stunning visual content, brand identities, and marketing materials that captivate your audience.",
    icon: <Palette className="w-8 h-8" />
  },
  {
    id: 2,
    title: "UI/UX Design",
    description: "Designing intuitive and beautiful digital interfaces for websites, apps, and Discord servers.",
    icon: <Monitor className="w-8 h-8" />
  },
  {
    id: 3,
    title: "Jersey Design",
    description: "Custom jersey and sportswear designs for esports teams, gaming communities, and sports organizations.",
    icon: <Shirt className="w-8 h-8" />
  },
  {
    id: 4,
    title: "Thumbnails & Posters",
    description: "Eye-catching thumbnails for YouTube, Twitch, and promotional posters that drive engagement.",
    icon: <Image className="w-8 h-8" />
  },
  {
    id: 5,
    title: "Logo Design",
    description: "Memorable and unique logos that define your brand identity and stand out from the competition.",
    icon: <PenTool className="w-8 h-8" />
  }
];

interface SpotlightCardProps {
  children: React.ReactNode;
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
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
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                400px circle at ${mouseX}px ${mouseY}px,
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
      transition: { staggerChildren: 0.1 }
    }
  };

  return (
    <section className="py-24 px-6 md:px-20 bg-[#0f0f0f] relative overflow-hidden">
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-20 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(34, 197, 94, 0.3) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-16 text-center">
          <span className="text-sm font-bold tracking-[0.3em] text-green-500 uppercase mb-4 block">What I Do</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            My Services
          </h2>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {services.map((service) => (
            <SpotlightCard key={service.id}>
              <div className="h-full p-8 flex flex-col relative z-10">
                <div className="w-14 h-14 bg-[#111] border border-white/5 rounded-xl flex items-center justify-center mb-5 text-white group-hover:bg-green-500/10 group-hover:text-green-400 group-hover:border-green-500/20 transition-colors duration-300">
                  {service.icon}
                </div>
                <h4 className="text-lg font-bold text-white mb-3">
                  {service.title}
                </h4>
                <p className="text-gray-400 text-sm leading-relaxed mb-5 flex-grow">{service.description}</p>

                <div className="pt-4 border-t border-white/5 flex items-center text-xs font-bold uppercase tracking-widest text-gray-500 group-hover:text-green-400 transition-colors mt-auto">
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