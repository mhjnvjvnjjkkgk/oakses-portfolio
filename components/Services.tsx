import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Palette, Monitor, Shirt, Image, PenTool, Layout, ArrowUpRight } from 'lucide-react';
import { InteractiveHeading } from './ui/InteractiveHeading';

const services = [
  {
    icon: <Palette className="w-8 h-8" />,
    title: "Graphic Design",
    description: "Creating stunning visual content, brand identities, and marketing materials that captivate your audience.",
    image: "https://images.unsplash.com/photo-1626785774583-b756fe1991eb?q=80&w=2070&auto=format&fit=crop"
  },
  {
    icon: <Monitor className="w-8 h-8" />,
    title: "UI/UX Design",
    description: "Designing intuitive and beautiful digital interfaces for websites, apps, and Discord servers.",
    image: "https://images.unsplash.com/photo-1586717791821-3f44a5638d28?q=80&w=2070&auto=format&fit=crop"
  },
  {
    icon: <Shirt className="w-8 h-8" />,
    title: "Jersey Design",
    description: "Custom jersey and sportswear designs for esports teams, gaming communities, and sports organizations.",
    image: "https://images.unsplash.com/photo-1577212017184-80cc0da11274?q=80&w=1740&auto=format&fit=crop"
  },
  {
    icon: <Image className="w-8 h-8" />,
    title: "Thumbnails", // SPLIT 1
    description: "High-CTR thumbnails for YouTube and Twitch that grab attention and drive clicks immediately.",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1974&auto=format&fit=crop"
  },
  {
    icon: <Layout className="w-8 h-8" />,
    title: "Posters", // SPLIT 2
    description: "Eye-catching promotional posters and event graphics that tell a story at a single glance.",
    image: "https://images.unsplash.com/photo-1558485203-b5413009da02?q=80&w=1974&auto=format&fit=crop"
  },
  {
    icon: <PenTool className="w-8 h-8" />,
    title: "Logo Design",
    description: "Memorable and unique logos that define your brand identity and stand out from the competition.",
    image: "https://images.unsplash.com/photo-1629336128038-038c232328ba?q=80&w=1932&auto=format&fit=crop"
  },
];

const Services: React.FC = () => {
  const [hoveredService, setHoveredService] = useState<number | null>(null);

  // Mouse tracking for cursor image
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring physics for the cursor image
  const springConfig = { damping: 15, stiffness: 1000, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    mouseX.set(clientX);
    mouseY.set(clientY);
  };

  return (
    <section
      className="py-32 px-6 md:px-20 bg-transparent relative overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Floating Background Gradient */}
      <div
        className="absolute top-0 right-0 w-[800px] h-[800px]"
        style={{
          background: 'radial-gradient(circle, rgba(34, 197, 94, 0.03) 0%, transparent 70%)',
          filter: 'blur(120px)',
          transform: 'translate(30%, -30%)',
        }}
      />

      {/* CURSOR PREVIEW IMAGE */}
      <motion.div
        className="fixed z-50 pointer-events-none w-[200px] h-[140px] rounded-xl overflow-hidden shadow-2xl border-2 border-green-500/30 hidden md:block"
        style={{
          left: smoothX,
          top: smoothY,
          translateX: '20px', // Offset from cursor
          translateY: '20px',
          opacity: hoveredService !== null ? 1 : 0,
          scale: hoveredService !== null ? 1 : 0.5,
        }}
      >
        {hoveredService !== null && (
          <img
            src={services[hoveredService].image}
            alt="Service Preview"
            className="w-full h-full object-cover"
          />
        )}
      </motion.div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-20">
          <InteractiveHeading
            title="My Services"
            subtitle="WHAT I CAN DO FOR YOU"
            align="center"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onMouseEnter={() => setHoveredService(index)}
              onMouseLeave={() => setHoveredService(null)}
              className="group relative p-8 rounded-2xl bg-white/5 border border-white/5 hover:border-green-500/30 transition-all duration-300 hover:-translate-y-2"
            >
              {/* Hover Glow */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: 'radial-gradient(circle at center, rgba(34, 197, 94, 0.1) 0%, transparent 70%)',
                }}
              />

              <div className="relative z-10">
                <div className="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center mb-6 text-white group-hover:text-green-400 group-hover:scale-110 transition-all duration-300">
                  {service.icon}
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-green-400 transition-colors">
                  {service.title}
                </h3>

                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  {service.description}
                </p>

                <div className="flex items-center text-xs font-bold tracking-wider text-green-500/80 uppercase group-hover:text-green-400">
                  <span className="mr-2">Available Now</span>
                  <ArrowUpRight className="w-3 h-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;

