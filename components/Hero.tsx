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

// ═══════════════════════════════════════════════════════════════
// MOBILE HERO COMPONENT
// ═══════════════════════════════════════════════════════════════
const MobileHero: React.FC = () => {
  return (
    <section className="min-h-screen w-full relative flex flex-col items-center justify-center overflow-hidden bg-transparent px-6 py-20 md:hidden">


      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center"
      >
        {/* Graphic Designer Label */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xs tracking-[0.4em] uppercase mb-4"
          style={{ color: '#22c55e' }}
        >
          Graphic Designer
        </motion.p>

        {/* PORTFOLIO Title */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-[20vw] font-black tracking-tighter leading-none mb-8"
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            color: '#f5f0e8',
          }}
        >
          PORTFOLIO
        </motion.h1>

        {/* Profile Image Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="w-40 h-52 mx-auto mb-8 rounded-2xl overflow-hidden"
          style={{
            boxShadow: '0 20px 50px -10px rgba(34,197,94,0.3)',
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=600&fit=crop"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-2 gap-4 mb-10"
        >
          {[
            { title: 'UI/UX', color: '#22c55e' },
            { title: 'Graphic', color: '#e67e22' },
            { title: 'Jersey', color: '#22c55e' },
            { title: 'Logo', color: '#e67e22' },
            { title: 'Thumbnail', color: '#22c55e' },
            { title: 'Poster', color: '#e67e22' },
          ].map((skill, index) => (
            <motion.div
              key={skill.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              className="flex items-center gap-2 justify-center"
            >
              <div
                className="w-2 h-2"
                style={{ backgroundColor: skill.color }}
              />
              <p
                className="text-sm tracking-wider uppercase"
                style={{ fontFamily: "'Bebas Neue', sans-serif", color: '#f5f0e8' }}
              >
                {skill.title} Designer
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.a
          href="#about"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all"
          style={{
            backgroundColor: '#22c55e',
            color: '#0f0f0f',
          }}
        >
          View My Work
          <ArrowDown size={16} />
        </motion.a>
      </motion.div>


    </section>
  );
};

// ═══════════════════════════════════════════════════════════════
// DESKTOP HERO COMPONENT
// ═══════════════════════════════════════════════════════════════
const DesktopHero: React.FC = () => {
  const text = 'PORTFOLIO';

  return (
    <section className="min-h-screen w-full relative hidden md:flex items-center justify-center overflow-hidden bg-transparent">


      {/* Main PORTFOLIO Text with Graphic Designer subtitle */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0 flex flex-col items-center justify-center z-0"
      >
        {/* Container for text alignment */}
        <div className="relative">
          {/* Small Graphic Designer text - spans from P to O */}
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: '100%' }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden mb-1"
          >
            <motion.p
              initial={{ x: -20 }}
              animate={{ x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-sm tracking-[0.5em] uppercase whitespace-nowrap"
              style={{
                color: '#22c55e',
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
              }}
            >
              {'Graphic Designer'.split('').map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.03, duration: 0.3 }}
                  className="inline-block"
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
            </motion.p>
          </motion.div>

          <h1
            className="text-[15vw] font-black tracking-tighter leading-none select-none"
            style={{
              fontFamily: "'Bebas Neue', 'Inter', sans-serif",
              letterSpacing: '-0.02em',
            }}
          >
            {text.split('').map((char, i) => (
              <HoverLetter key={i} char={char} delay={i * 50} />
            ))}
          </h1>
        </div>
      </motion.div>

      {/* Center space left for RotatingCard component */}

      {/* Left Side - Skills (Animated) */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-12 top-1/2 -translate-y-1/2 z-20"
      >
        {[
          { title: 'UI/UX', delay: 0.6 },
          { title: 'Jersey', delay: 0.7 },
          { title: 'Thumbnail', delay: 0.8 },
        ].map((skill, index) => (
          <motion.div
            key={skill.title}
            initial={{ opacity: 0, x: -30, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ delay: skill.delay, duration: 0.5, ease: 'easeOut' }}
            whileHover={{ x: 10, scale: 1.05 }}
            className={`flex items-start gap-3 ${index > 0 ? 'mt-5' : ''} cursor-pointer`}
          >
            <motion.div
              className="w-3 h-3 mt-2"
              style={{ backgroundColor: '#22c55e' }}
              whileHover={{ scale: 1.3, boxShadow: '0 0 15px rgba(34,197,94,0.8)' }}
            />
            <div style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              <motion.p
                className="text-2xl tracking-wider uppercase"
                style={{ color: '#f5f0e8' }}
                whileHover={{ color: '#22c55e' }}
              >
                {skill.title}
              </motion.p>
              <motion.p
                className="text-2xl tracking-wider uppercase"
                style={{ color: '#f5f0e8' }}
                whileHover={{ color: '#22c55e' }}
              >
                Designer
              </motion.p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Right Side - Skills (Animated) */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="absolute right-12 top-1/2 -translate-y-1/2 z-20 text-right"
      >
        {[
          { title: 'Graphic', delay: 0.6 },
          { title: 'Logo', delay: 0.7 },
          { title: 'Poster', delay: 0.8 },
        ].map((skill, index) => (
          <motion.div
            key={skill.title}
            initial={{ opacity: 0, x: 30, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ delay: skill.delay, duration: 0.5, ease: 'easeOut' }}
            whileHover={{ x: -10, scale: 1.05 }}
            className={`flex items-start gap-3 justify-end ${index > 0 ? 'mt-5' : ''} cursor-pointer`}
          >
            <div style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              <motion.p
                className="text-2xl tracking-wider uppercase"
                style={{ color: '#f5f0e8' }}
                whileHover={{ color: '#e67e22' }}
              >
                {skill.title}
              </motion.p>
              <motion.p
                className="text-2xl tracking-wider uppercase"
                style={{ color: '#f5f0e8' }}
                whileHover={{ color: '#e67e22' }}
              >
                Designer
              </motion.p>
            </div>
            <motion.div
              className="w-3 h-3 mt-2"
              style={{ backgroundColor: '#e67e22' }}
              whileHover={{ scale: 1.3, boxShadow: '0 0 15px rgba(230,126,34,0.8)' }}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Bottom scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3"
      >
        <ArrowDown size={14} className="text-gray-500 animate-bounce" />
      </motion.div>

      {/* Nav */}
      <div className="absolute top-6 right-12 z-30 flex gap-6">
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

// ═══════════════════════════════════════════════════════════════
// MAIN HERO - RENDERS MOBILE OR DESKTOP
// ═══════════════════════════════════════════════════════════════
const Hero: React.FC = () => {
  return (
    <>
      <MobileHero />
      <DesktopHero />
    </>
  );
};

export default Hero;
