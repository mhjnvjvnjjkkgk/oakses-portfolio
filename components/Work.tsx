import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionTemplate, useMotionValue } from 'framer-motion';
import { TiltCard } from './ui/TiltCard';
import { ZoomSection } from './ui/ZoomSection';
import { ParallaxBackground } from './ui/ParallaxBackground';
import { InteractiveHeading } from './ui/InteractiveHeading';

type Category = "Logo Design" | "Website Creation" | "Thumbnail Design" | "Jersey Design";

interface ProjectItem {
  id: number;
  category: Category;
  title: string;
  image: string;
}

const categories: Category[] = ["Logo Design", "Website Creation", "Thumbnail Design", "Jersey Design"];

const projects: ProjectItem[] = [
  // Logo Design
  { id: 1, category: "Logo Design", title: "Apex Dynamics", image: "https://picsum.photos/800/800?random=100" },
  { id: 2, category: "Logo Design", title: "Zenith Tech", image: "https://picsum.photos/800/1200?random=101" }, // Tall
  { id: 3, category: "Logo Design", title: "Flux Energy", image: "https://picsum.photos/800/800?random=102" },
  { id: 4, category: "Logo Design", title: "Nova Systems", image: "https://picsum.photos/1000/600?random=103" }, // Wide
  { id: 5, category: "Logo Design", title: "Echo Audio", image: "https://picsum.photos/800/800?random=104" },

  // Website Creation
  { id: 6, category: "Website Creation", title: "Cyberfolio", image: "https://picsum.photos/1200/1000?random=200" },
  { id: 7, category: "Website Creation", title: "E-Commerce Luxe", image: "https://picsum.photos/800/1400?random=201" }, // Very Tall
  { id: 8, category: "Website Creation", title: "Startup Landing", image: "https://picsum.photos/800/800?random=202" },
  { id: 9, category: "Website Creation", title: "Crypto Dashboard", image: "https://picsum.photos/1200/800?random=203" },

  // Thumbnail Design
  { id: 10, category: "Thumbnail Design", title: "Gaming Highlight", image: "https://picsum.photos/1280/720?random=300" },
  { id: 11, category: "Thumbnail Design", title: "Tech Review", image: "https://picsum.photos/1280/720?random=301" },
  { id: 12, category: "Thumbnail Design", title: "Vlog Daily", image: "https://picsum.photos/1280/720?random=302" },
  { id: 13, category: "Thumbnail Design", title: "Tutorial Series", image: "https://picsum.photos/1280/720?random=303" },

  // Jersey Design
  { id: 14, category: "Jersey Design", title: "Team Liquid Clone", image: "https://picsum.photos/800/800?random=400" },
  { id: 15, category: "Jersey Design", title: "Cloud9 Alt", image: "https://picsum.photos/800/1000?random=401" },
  { id: 16, category: "Jersey Design", title: "FaZe Concept", image: "https://picsum.photos/800/800?random=402" },
  { id: 17, category: "Jersey Design", title: "Custom Esport", image: "https://picsum.photos/800/1000?random=403" },
];

const Work: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Category>("Logo Design");
  const filteredProjects = projects.filter(p => p.category === activeTab);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <section
      className="py-20 md:py-32 px-4 md:px-20 bg-transparent relative z-20 min-h-screen flex flex-col"
      onMouseMove={handleMouseMove}
    >
      <ParallaxBackground />

      {/* Interactive Grid */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:30px_30px]" />
        <motion.div
          className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff15_1px,transparent_1px),linear-gradient(to_bottom,#ffffff15_1px,transparent_1px)] bg-[size:30px_30px]"
          style={{
            maskImage: useMotionTemplate`radial-gradient(300px circle at ${mouseX}px ${mouseY}px, black, transparent)`,
            WebkitMaskImage: useMotionTemplate`radial-gradient(300px circle at ${mouseX}px ${mouseY}px, black, transparent)`
          }}
        />
      </div>

      {/* Background Noise & Blob */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay"></div>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-900/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <ZoomSection className="mb-12 md:mb-16 text-center">
          <h2 className="text-xs md:text-sm font-bold tracking-[0.3em] text-green-500 uppercase mb-4">My Portfolio</h2>
          <div className="text-4xl md:text-5xl lg:text-7xl font-black text-white tracking-tight flex justify-center">
            <InteractiveHeading text="Selected Works" />
          </div>
        </ZoomSection>

        {/* Filters */}
        <ZoomSection className="flex flex-wrap justify-center gap-3 md:gap-4 mb-12 md:mb-16" delay={0.2}>
          {categories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setActiveTab(cat)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`relative px-4 py-2 md:px-6 md:py-3 rounded-full text-xs md:text-sm font-bold uppercase tracking-widest transition-colors duration-300 ${activeTab === cat ? 'text-black' : 'text-gray-500 hover:text-white'
                }`}
            >
              <span className="relative z-10">{cat}</span>
              {activeTab === cat && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-white rounded-full"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </motion.button>
          ))}
        </ZoomSection>

        {/* Masonry Grid - Changed to columns-2 on mobile */}
        <div className="columns-2 md:columns-2 lg:columns-3 gap-3 md:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                transition={{ duration: 0.4 }}
                className="break-inside-avoid mb-3 md:mb-8"
              >
                <div className="relative w-full mb-2 md:mb-4">
                  <TiltCard className="w-full rounded-xl overflow-hidden cursor-pointer bg-neutral-900 border border-transparent hover:border-white/20 group">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-auto object-cover transition-all duration-700 ease-out group-hover:[transform:scale(1.1)_rotateX(7deg)] grayscale-[30%] group-hover:grayscale-0"
                    />
                  </TiltCard>
                </div>

                {/* Text Below Card */}
                <div className="text-center">
                  <span className="text-green-400 text-[10px] md:text-xs font-mono uppercase tracking-widest mb-1 block">{project.category}</span>
                  <h4 className="text-sm md:text-xl font-bold text-white flex justify-center leading-tight">
                    {project.title}
                  </h4>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Work;
