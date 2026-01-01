import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink } from 'lucide-react';

const About: React.FC = () => {
  const slideUp = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const containerVariants = {
    visible: {
      transition: { staggerChildren: 0.1 }
    }
  };

  return (
    <section
      id="about"
      className="min-h-screen w-full bg-[#050505] flex items-center justify-center py-24 px-6 md:px-20 relative overflow-hidden"
    >
      {/* Simple gradient background */}
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-20 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(34, 197, 94, 0.3) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">

        {/* Left - Heading */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.h2
            variants={slideUp}
            className="text-4xl md:text-7xl font-bold mb-6 leading-tight tracking-tight"
          >
            Creating
            <span className="text-green-500 font-serif italic block">
              Visual Magic
            </span>
            Since 2019
          </motion.h2>

          {/* Stats */}
          <motion.div
            variants={slideUp}
            className="flex flex-wrap gap-8 mt-8"
          >
            <div>
              <span className="text-4xl md:text-5xl font-bold text-green-400">6+</span>
              <p className="text-gray-500 text-sm uppercase tracking-wider mt-1">Years Experience</p>
            </div>
            <div>
              <span className="text-4xl md:text-5xl font-bold text-green-400">150K+</span>
              <p className="text-gray-500 text-sm uppercase tracking-wider mt-1">Discord Server Work</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Right - Content */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="flex flex-col"
        >
          <motion.p
            variants={slideUp}
            className="text-xl md:text-2xl text-white font-light leading-relaxed mb-8"
          >
            I'm <span className="text-green-400 font-medium">OAKSES</span> – a multi-disciplinary designer with over 6 years of experience crafting visual identities that stand out. From Discord server branding to jersey designs, I've helped countless communities and businesses establish their visual presence.
          </motion.p>

          <motion.p
            variants={slideUp}
            className="text-lg text-gray-400 font-light leading-relaxed mb-8"
          >
            I've worked as the official designer for multiple <span className="text-white">150K+ member Discord servers</span>, creating everything from logos and banners to complete brand identities. My expertise spans UI/UX design, thumbnails, posters, and custom jerseys.
          </motion.p>

          {/* Services Tags */}
          <motion.div
            variants={slideUp}
            className="flex flex-wrap gap-3 mb-10"
          >
            {['Graphic Design', 'UI/UX Design', 'Jersey Design', 'Thumbnails', 'Logo Design', 'Poster Design', 'Discord Branding'].map((skill) => (
              <span
                key={skill}
                className="px-4 py-2 text-sm border border-white/10 rounded-full text-gray-300 bg-white/5"
              >
                {skill}
              </span>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={slideUp}
            className="flex flex-wrap gap-4"
          >
            <a
              href="#contact"
              className="group flex items-center gap-3 px-6 py-3 bg-green-500 text-black font-semibold rounded-full hover:bg-green-400 transition-colors"
            >
              Work With Me
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="https://www.elevez.shop"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 px-6 py-3 border border-white/20 text-white rounded-full hover:border-green-500/50 hover:bg-white/5 transition-all"
            >
              Visit Elevez Shop
              <ExternalLink size={16} />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;