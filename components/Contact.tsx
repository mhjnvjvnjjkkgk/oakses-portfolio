import React, { useRef, useState } from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { Instagram, Twitter, Linkedin, Send } from 'lucide-react';
import { InteractiveHeading } from './ui/InteractiveHeading';
import { ZoomSection } from './ui/ZoomSection';
import { ParallaxBackground } from './ui/ParallaxBackground';

const Contact: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);

  // Background grid mouse
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    // Grid background logic
    const { left, top } = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);

    // Magnetic button logic (if hovering that area)
    if (ref.current) {
      const btnRect = ref.current.getBoundingClientRect();
      // Check if mouse is near button for magnetic effect, simple distance check or just use client vals relative to button center
      const btnX = e.clientX - (btnRect.left + btnRect.width / 2);
      const btnY = e.clientY - (btnRect.top + btnRect.height / 2);

      // Only apply if close
      if (Math.abs(btnX) < 200 && Math.abs(btnY) < 200) {
        setPosition({ x: btnX, y: btnY });
      } else {
        setPosition({ x: 0, y: 0 });
      }
    }
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;

  return (
    <section
      className="min-h-screen bg-transparent flex flex-col justify-between pt-32 pb-10 px-6 md:px-20 relative z-20 overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <ParallaxBackground />
      {/* Interactive Grid */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:60px_60px]" />
        <motion.div
          className="absolute inset-0 bg-[linear-gradient(to_right,#22c55e10_1px,transparent_1px),linear-gradient(to_bottom,#22c55e10_1px,transparent_1px)] bg-[size:60px_60px]"
          style={{
            maskImage: useMotionTemplate`radial-gradient(300px circle at ${mouseX}px ${mouseY}px, black, transparent)`,
            WebkitMaskImage: useMotionTemplate`radial-gradient(300px circle at ${mouseX}px ${mouseY}px, black, transparent)`
          }}
        />
      </div>

      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="max-w-7xl w-full mx-auto relative z-10 flex flex-col h-full justify-center">
        <ZoomSection>
          <h2 className="text-sm font-bold tracking-[0.3em] text-green-500 uppercase mb-8">Get In Touch</h2>
          <h3 className="text-5xl md:text-8xl font-black text-white mb-12 leading-tight">
            <InteractiveHeading text="Let's create" /> <br />
            <InteractiveHeading text="something" /> <span className="inline-flex text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-white">
              <InteractiveHeading text="iconic." />
            </span>
          </h3>
        </ZoomSection>

        <motion.div
          ref={ref}
          animate={{ x: x * 0.2, y: y * 0.2 }}
          transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
          className="mb-20 inline-block w-fit"
        >
          <a
            href="mailto:hello@oakses.design"
            className="group relative inline-flex items-center gap-6"
          >
            <ZoomSection delay={0.2} className="inline-block">
              <span className="text-3xl md:text-7xl font-light text-gray-300 group-hover:text-white transition-colors tracking-tight">hello@oakses.design</span>
            </ZoomSection>
            <motion.span
              animate={{ x: x * 0.1, y: y * 0.1 }}
              className="hidden md:flex w-16 h-16 rounded-full bg-green-600 items-center justify-center text-black group-hover:scale-125 transition-transform duration-500"
            >
              <Send size={24} className="-ml-1 mt-1 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
            </motion.span>
          </a>
        </motion.div>

        <ZoomSection delay={0.4} className="grid grid-cols-1 md:grid-cols-2 gap-12 text-gray-400">
          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-widest text-sm">Socials</h4>
            <div className="flex gap-6">
              {[
                { Icon: Instagram, href: "#" },
                { Icon: Twitter, href: "#" },
                { Icon: Linkedin, href: "#" }
              ].map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + (i * 0.1) }}
                  whileHover={{ y: -5, scale: 1.1, backgroundColor: "#ffffff", color: "#000000" }}
                  className="p-3 bg-white/5 rounded-full text-gray-300 hover:text-black transition-colors"
                >
                  <social.Icon size={20} />
                </motion.a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-widest text-sm">Location</h4>
            <p className="text-xl text-white font-light">New York City, NY</p>
            <p className="text-sm mt-2 opacity-60">Available for Global Remote Work</p>
          </div>
        </ZoomSection>
      </div>

      <div className="w-full text-center mt-20 text-gray-600 text-sm flex justify-between items-end border-t border-white/5 pt-8">
        <p>&copy; {new Date().getFullYear()} OAKSES Design.</p>
        <p className="hidden md:block">Designed & Developed with Passion</p>
      </div>

      {/* Background decoration */}
      <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-green-900/10 blur-[150px] rounded-full pointer-events-none animate-pulse" />
    </section>
  );
};

export default Contact;
