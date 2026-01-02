import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

// Simple hover letter - no complex hooks
const HoverLetter: React.FC<{ char: string; delay: number }> = ({ char, delay }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <span
      className="inline-block transition-all duration-200 cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        transform: hovered ? 'translateY(-10px) scale(1.05)' : 'translateY(0) scale(1)',
        color: hovered ? '#22c55e' : '#f5f0e8',
        textShadow: hovered ? '0 0 40px rgba(34,197,94,0.6)' : 'none',
        animationDelay: `${delay}ms`,
      }}
    >
      {char}
    </span>
  );
};

const Hero: React.FC = () => {
  const text = 'PORTFOLIO';

  return (
    <section className="min-h-screen w-full relative flex items-center justify-center overflow-hidden bg-[#0f0f0f]">

      {/* Background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(34, 197, 94, 0.4) 0%, transparent 60%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Main PORTFOLIO Text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0 flex items-center justify-center z-0"
      >
        <h1
          className="text-[18vw] md:text-[15vw] font-black tracking-tighter leading-none select-none"
          style={{
            fontFamily: "'Bebas Neue', 'Inter', sans-serif",
            letterSpacing: '-0.02em',
          }}
        >
          {text.split('').map((char, i) => (
            <HoverLetter key={i} char={char} delay={i * 50} />
          ))}
        </h1>
      </motion.div>

      {/* Center Image */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
      >
        <div className="relative w-[200px] h-[280px] md:w-[260px] md:h-[360px]">
          <div
            className="w-full h-full overflow-hidden"
            style={{ backgroundColor: '#c4b5a0' }}
          >
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=600&fit=crop"
              alt="Portfolio"
              className="w-full h-full object-cover opacity-90"
            />
          </div>

          {/* Name overlay */}
          <div className="absolute bottom-4 left-3">
            <h2
              className="text-4xl md:text-5xl font-black tracking-tight"
              style={{
                color: '#f5f0e8',
                fontFamily: "'Bebas Neue', sans-serif",
                textShadow: '0 2px 10px rgba(0,0,0,0.5)',
              }}
            >
              OAKSES
            </h2>
          </div>
        </div>
      </motion.div>

      {/* Left Side - Skills */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 z-20"
      >
        <div className="flex items-start gap-3">
          <div className="w-3 h-3 mt-2" style={{ backgroundColor: '#22c55e' }} />
          <div style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            <p className="text-xl md:text-2xl tracking-wider uppercase" style={{ color: '#f5f0e8' }}>
              UI/UX
            </p>
            <p className="text-xl md:text-2xl tracking-wider uppercase" style={{ color: '#f5f0e8' }}>
              Designer
            </p>
          </div>
        </div>
        <div className="mt-6 flex items-start gap-3">
          <div className="w-3 h-3 mt-2" style={{ backgroundColor: '#22c55e' }} />
          <div style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            <p className="text-xl md:text-2xl tracking-wider uppercase" style={{ color: '#f5f0e8' }}>
              Jersey
            </p>
            <p className="text-xl md:text-2xl tracking-wider uppercase" style={{ color: '#f5f0e8' }}>
              Designer
            </p>
          </div>
        </div>
        <div className="mt-6 flex items-start gap-3">
          <div className="w-3 h-3 mt-2" style={{ backgroundColor: '#22c55e' }} />
          <div style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            <p className="text-xl md:text-2xl tracking-wider uppercase" style={{ color: '#f5f0e8' }}>
              Thumbnail
            </p>
            <p className="text-xl md:text-2xl tracking-wider uppercase" style={{ color: '#f5f0e8' }}>
              Designer
            </p>
          </div>
        </div>
      </motion.div>

      {/* Right Side - Skills */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 z-20 text-right"
      >
        <div className="flex items-start gap-3 justify-end">
          <div style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            <p className="text-xl md:text-2xl tracking-wider uppercase" style={{ color: '#f5f0e8' }}>
              Graphic
            </p>
            <p className="text-xl md:text-2xl tracking-wider uppercase" style={{ color: '#f5f0e8' }}>
              Designer
            </p>
          </div>
          <div className="w-3 h-3 mt-2" style={{ backgroundColor: '#e67e22' }} />
        </div>
        <div className="mt-6 flex items-start gap-3 justify-end">
          <div style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            <p className="text-xl md:text-2xl tracking-wider uppercase" style={{ color: '#f5f0e8' }}>
              Logo
            </p>
            <p className="text-xl md:text-2xl tracking-wider uppercase" style={{ color: '#f5f0e8' }}>
              Designer
            </p>
          </div>
          <div className="w-3 h-3 mt-2" style={{ backgroundColor: '#e67e22' }} />
        </div>
        <div className="mt-6 flex items-start gap-3 justify-end">
          <div style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            <p className="text-xl md:text-2xl tracking-wider uppercase" style={{ color: '#f5f0e8' }}>
              Poster
            </p>
            <p className="text-xl md:text-2xl tracking-wider uppercase" style={{ color: '#f5f0e8' }}>
              Designer
            </p>
          </div>
          <div className="w-3 h-3 mt-2" style={{ backgroundColor: '#e67e22' }} />
        </div>
      </motion.div>

      {/* Bottom scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3"
      >
        <a
          href="https://www.elevez.shop"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs tracking-widest uppercase hover:opacity-70 transition-opacity"
          style={{ color: '#22c55e' }}
        >
          Elevez Clothing →
        </a>
        <ArrowDown size={14} className="text-gray-500 animate-bounce" />
      </motion.div>

      {/* Nav */}
      <div className="absolute top-6 right-6 md:right-12 z-30 flex gap-6">
        {['Home', 'About', 'Contact'].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="text-xs uppercase tracking-widest hover:opacity-60 transition-opacity"
            style={{ color: '#f5f0e8' }}
          >
            {item}
          </a>
        ))}
      </div>
    </section>
  );
};

export default Hero;