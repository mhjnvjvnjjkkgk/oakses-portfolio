import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ExternalLink } from 'lucide-react';

// Scroll-based text animation component
interface ScrollTextProps {
  text: string;
  className?: string;
}

const ScrollText: React.FC<ScrollTextProps> = ({ text, className = '' }) => {
  const containerRef = useRef<HTMLSpanElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.9', 'start 0.3']
  });

  const words = text.split(' ');

  return (
    <span ref={containerRef} className={className}>
      {words.map((word, wordIndex) => {
        const chars = word.split('');
        return (
          <span key={wordIndex} className="inline-block mr-[0.25em]">
            {chars.map((char, charIndex) => {
              const totalChars = text.replace(/ /g, '').length;
              const charsBefore = words.slice(0, wordIndex).join('').length + charIndex;
              const start = charsBefore / totalChars;
              const end = (charsBefore + 1) / totalChars;

              return (
                <ScrollChar
                  key={charIndex}
                  char={char}
                  scrollProgress={scrollYProgress}
                  start={start}
                  end={end}
                />
              );
            })}
          </span>
        );
      })}
    </span>
  );
};

interface ScrollCharProps {
  char: string;
  scrollProgress: any;
  start: number;
  end: number;
}

const ScrollChar: React.FC<ScrollCharProps> = ({ char, scrollProgress, start, end }) => {
  const opacity = useTransform(scrollProgress, [start, end], [0.2, 1]);
  const color = useTransform(scrollProgress, [start, end], ['#4b5563', '#ffffff']);

  return (
    <motion.span
      style={{ opacity, color }}
      className="inline-block"
    >
      {char}
    </motion.span>
  );
};

const About: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={containerRef}
      id="about"
      className="min-h-[150vh] w-full bg-[#0f0f0f] flex items-start justify-center py-32 px-6 md:px-20 relative overflow-hidden"
    >
      {/* Simple gradient background */}
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-20 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(34, 197, 94, 0.3) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      <div className="max-w-5xl w-full relative z-10 sticky top-32">

        {/* Section Label */}
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-sm font-bold tracking-[0.3em] text-green-500 uppercase mb-8 block"
        >
          About Me
        </motion.span>

        {/* Main Scroll Text */}
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight mb-12">
          <ScrollText
            text="I'm OAKSES – a multi-disciplinary designer with over 6 years of experience crafting visual identities that stand out."
          />
        </h2>

        <p className="text-xl md:text-2xl font-light leading-relaxed mb-8">
          <ScrollText
            text="From Discord server branding to jersey designs, I've helped countless communities and businesses establish their visual presence."
          />
        </p>

        <p className="text-lg md:text-xl text-gray-400 font-light leading-relaxed mb-12">
          <ScrollText
            text="I've worked as the official designer for multiple 150K+ member Discord servers, creating everything from logos and banners to complete brand identities."
          />
        </p>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-12 mb-12"
        >
          <div>
            <span className="text-5xl md:text-6xl font-bold text-green-400">6+</span>
            <p className="text-gray-500 text-sm uppercase tracking-wider mt-2">Years Experience</p>
          </div>
          <div>
            <span className="text-5xl md:text-6xl font-bold text-green-400">150K+</span>
            <p className="text-gray-500 text-sm uppercase tracking-wider mt-2">Discord Members Served</p>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
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
      </div>
    </section>
  );
};

export default About;