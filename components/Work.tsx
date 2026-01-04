import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionTemplate, useMotionValue } from 'framer-motion';
import { TiltCard } from './ui/TiltCard';
import { ZoomSection } from './ui/ZoomSection';
import { ParallaxBackground } from './ui/ParallaxBackground';
import { InteractiveHeading } from './ui/InteractiveHeading';

type Category = "Logo Design" | "Website Creation" | "Thumbnail Design" | "Jersey Design" | "Poster Design";

interface ProjectItem {
  id: number;
  category: Category;
  title: string;
  image: string;
  link?: string; // Optional link for clickable projects
}

const categories: Category[] = ["Logo Design", "Website Creation", "Thumbnail Design", "Jersey Design", "Poster Design"];

const projects: ProjectItem[] = [
  // Logo Design
  { id: 1, category: "Logo Design", title: "SI Esports Logo", image: "/samples/logo/si esports (4) (1).jpg" },
  { id: 2, category: "Logo Design", title: "Gaming Logo", image: "/samples/logo/image-removebg-preview (22) (1).jpg" },
  { id: 3, category: "Logo Design", title: "Esports Brand", image: "/samples/logo/images (1).png" },
  { id: 4, category: "Logo Design", title: "Brisk Me Logo", image: "/samples/logo/brisk me (7).jpg" },
  { id: 5, category: "Logo Design", title: "Elevez Main Logo", image: "/samples/logo/elevez main white logo (1).png" },
  { id: 6, category: "Logo Design", title: "New Project Logo", image: "/samples/logo/New Project (19).jpg" },

  // Website Creation - ONLY 3 WEBSITES
  { id: 7, category: "Website Creation", title: "Oakses Portfolio", image: "/samples/WEBSITES/oakses portfolio.png", link: "https://oakses-portfolio.vercel.app" },
  { id: 8, category: "Website Creation", title: "Elevez Shop", image: "/samples/WEBSITES/elevez.shop.png", link: "ht tps://elevez.shop" },
  { id: 9, category: "Website Creation", title: "Elevez Store", image: "/samples/WEBSITES/elevez 2nd.png", link: "https://elevez-store-4hceqhup3-shayaks-projects-95c1d909.vercel.app" },

  // Thumbnail Design
  { id: 14, category: "Thumbnail Design", title: "Stream Thumbnail", image: "/samples/thumbnails/thumbnail 10 (6).jpg" },
  { id: 15, category: "Thumbnail Design", title: "Content Thumbnail 3", image: "/samples/thumbnails/thumbnail 3 (1).jpg" },
  { id: 16, category: "Thumbnail Design", title: "Video Thumbnail 5", image: "/samples/thumbnails/thumbnail 5 (4).jpg" },
  { id: 17, category: "Thumbnail Design", title: "Gaming Thumbnail 6", image: "/samples/thumbnails/thumbnail 6 (9).jpg" },

  // Jersey Design
  { id: 18, category: "Jersey Design", title: "Arpan Front", image: "/samples/jersey/arpan front.jpeg" },
  { id: 19, category: "Jersey Design", title: "Arpan Back", image: "/samples/jersey/arpan back.jpeg" },
  { id: 20, category: "Jersey Design", title: "Bleeder Front", image: "/samples/jersey/bleeder front.jpeg" },
  { id: 21, category: "Jersey Design", title: "Bleeder Back", image: "/samples/jersey/bleeder back.jpeg" },
  { id: 22, category: "Jersey Design", title: "NVD Front", image: "/samples/jersey/nvd front.jpeg" },
  { id: 23, category: "Jersey Design", title: "NVD Back", image: "/samples/jersey/nvd back.jpeg" },
  { id: 24, category: "Jersey Design", title: "PXG Front", image: "/samples/jersey/pxg front.jpeg" },
  { id: 25, category: "Jersey Design", title: "PXG Back", image: "/samples/jersey/pxg back.jpeg" },
  { id: 26, category: "Jersey Design", title: "Custom Mockup", image: "/samples/jersey/sir mockup.png" },
  { id: 27, category: "Jersey Design", title: "Tubu Front", image: "/samples/jersey/tubu front.jpeg" },
  { id: 28, category: "Jersey Design", title: "Tubu Back", image: "/samples/jersey/tubu back.jpeg" },

  // Poster Design
  { id: 29, category: "Poster Design", title: "Ravenclaw Poster", image: "/samples/poster/FOR RAVENCLAW (1).jpg" },
  { id: 30, category: "Poster Design", title: "Event Poster", image: "/samples/poster/Poster (6).jpg" },
  { id: 31, category: "Poster Design", title: "Vote Poster", image: "/samples/poster/VOTE for roniit poddar (8).jpg" },
  { id: 32, category: "Poster Design", title: "Promotional Poster", image: "/samples/poster/another poster (3).jpg" },
  { id: 33, category: "Poster Design", title: "Free Fire Poster", image: "/samples/poster/free_fire_poster-transformed (1).jpeg" },
  { id: 34, category: "Poster Design", title: "Gandhi Jayanti", image: "/samples/poster/gandhi jayanti simple by shayak.jpg" },
  { id: 35, category: "Poster Design", title: "Rabindra Jayanti", image: "/samples/poster/rabindra jayanti shayak das.jpg" },
  { id: 36, category: "Poster Design", title: "Scrims Poster", image: "/samples/poster/scrims poster (1).jpg" },
  { id: 37, category: "Poster Design", title: "Showdown Poster", image: "/samples/poster/shunday showdown test 2 (8).jpg" },
  { id: 38, category: "Poster Design", title: "Tournament Roadmap", image: "/samples/others/Roadmap (7).jpg" },
  { id: 39, category: "Poster Design", title: "Point Table", image: "/samples/others/new point table (9).jpg" },
  { id: 40, category: "Poster Design", title: "Nov Point Table", image: "/samples/others/nov 29 point table (1).jpg" },
  { id: 41, category: "Poster Design", title: "Ravenclaw House", image: "/samples/others/ravenclaw (18).jpg" },
  { id: 42, category: "Poster Design", title: "Slot List", image: "/samples/others/slot list 2 (2).jpg" },
  { id: 43, category: "Poster Design", title: "Submission Form", image: "/samples/others/submission (1).jpg" },
];

const Work: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Category>("Logo Design");
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);`n  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
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

      <ParallaxBackground />

      {/* Background Noise & Blob - GLOW REMOVED */}

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
              className={`relative px-4 py-2 md:px-6 md:py-3 rounded-full text-xs md:text-sm font-bold uppercase tracking-widest transition-colors duration-300 ${activeTab === cat ? 'bg-green-500 text-black' : 'bg-white/5 text-gray-400 hover:text-white'}`}
            >
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
                layout="position"
                key={project.id}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                transition={{ duration: 0.3 }}
                className="mb-3 md:mb-8 break-inside-avoid group"
              >
                {project.link ? (
                  // Clickable item with link
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block relative overflow-hidden rounded-2xl hover:scale-[1.02] transition-transform duration-300"
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className="text-white text-lg font-bold mb-1">{project.title}</h3>
                        <p className="text-green-400 text-sm">Click to visit →</p>
                      </div>
                    </div>
                  </a>
                ) : (
                  // Non-clickable item
                  <div className="relative w-full mb-2 md:mb-4">
                    <TiltCard className="w-full rounded-xl overflow-hidden cursor-pointer bg-neutral-900 border border-transparent hover:border-white/20 group">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-auto object-cover transition-all duration-700 ease-out group-hover:[transform:scale(1.1)_rotateX(7deg)] grayscale-[30%] group-hover:grayscale-0"
                      />
                    </TiltCard>
                  </div>
                )}

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




