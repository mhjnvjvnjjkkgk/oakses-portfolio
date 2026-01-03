import React, { useRef, useState } from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { MessageCircle, Send } from 'lucide-react';
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
            href="mailto:shayakdas6.5.0@gmail.com"
            className="group relative inline-flex items-center gap-6"
          >
            <ZoomSection delay={0.2} className="inline-block">
              <span className="text-3xl md:text-7xl font-light text-gray-300 group-hover:text-white transition-colors tracking-tight">shayakdas6.5.0@gmail.com</span>
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
              <motion.a
                href="https://wa.me/918017561073?text=Hi%2C%20I%20would%20like%20to%20connect%20with%20you"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                whileHover={{ y: -5, scale: 1.1, backgroundColor: "#25D366", color: "#ffffff" }}
                className="p-3 bg-white/5 rounded-full text-gray-300 hover:text-white transition-colors"
              >
                <MessageCircle size={20} />
              </motion.a>
              <motion.a
                href="https://discord.com/users/oaksesgamming"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                whileHover={{ y: -5, scale: 1.1, backgroundColor: "#5865F2", color: "#ffffff" }}
                className="p-3 bg-white/5 rounded-full text-gray-300 hover:text-white transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 71 55" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M60.1045 4.8978C55.5792 2.8214 50.7265 1.2916 45.6527 0.41542C45.5603 0.39851 45.468 0.440769 45.4204 0.525289C44.7963 1.6353 44.105 3.0834 43.6209 4.2216C38.1637 3.4046 32.7345 3.4046 27.3892 4.2216C26.905 3.0581 26.1886 1.6353 25.5617 0.525289C25.5141 0.443589 25.4218 0.40133 25.3294 0.41542C20.2584 1.2888 15.4057 2.8186 10.8776 4.8978C10.8384 4.9147 10.8048 4.9429 10.7825 4.9795C1.57795 18.7309 -0.943561 32.1443 0.293408 45.3914C0.299005 45.4562 0.335386 45.5182 0.385761 45.5576C6.45866 50.0174 12.3413 52.7249 18.1147 54.5195C18.2071 54.5477 18.305 54.5139 18.3638 54.4378C19.7295 52.5728 20.9469 50.6063 21.9907 48.5383C22.0523 48.4172 21.9935 48.2735 21.8676 48.2256C19.9366 47.4931 18.0979 46.6 16.3292 45.5858C16.1893 45.5041 16.1781 45.304 16.3068 45.2082C16.679 44.9293 17.0513 44.6391 17.4067 44.3461C17.471 44.2926 17.5606 44.2813 17.6362 44.3151C29.2558 49.6202 41.8354 49.6202 53.3179 44.3151C53.3935 44.2785 53.4831 44.2898 53.5502 44.3433C53.9057 44.6363 54.2779 44.9293 54.6529 45.2082C54.7816 45.304 54.7732 45.5041 54.6333 45.5858C52.8646 46.6197 51.0259 47.4931 49.0921 48.2228C48.9662 48.2707 48.9102 48.4172 48.9718 48.5383C50.038 50.6034 51.2554 52.5699 52.5959 54.435C52.6519 54.5139 52.7526 54.5477 52.845 54.5195C58.6464 52.7249 64.529 50.0174 70.6019 45.5576C70.6551 45.5182 70.6887 45.459 70.6943 45.3942C72.1747 30.0791 68.2147 16.7757 60.1968 4.9823C60.1772 4.9429 60.1437 4.9147 60.1045 4.8978ZM23.7259 37.3253C20.2276 37.3253 17.3451 34.1136 17.3451 30.1693C17.3451 26.225 20.1717 23.0133 23.7259 23.0133C27.308 23.0133 30.1626 26.2532 30.1066 30.1693C30.1066 34.1136 27.28 37.3253 23.7259 37.3253ZM47.3178 37.3253C43.8196 37.3253 40.9371 34.1136 40.9371 30.1693C40.9371 26.225 43.7636 23.0133 47.3178 23.0133C50.9 23.0133 53.7545 26.2532 53.6986 30.1693C53.6986 34.1136 50.9 37.3253 47.3178 37.3253Z" />
                </svg>
              </motion.a>
            </div>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-widest text-sm">Location</h4>
            <p className="text-xl text-white font-light">India, Kolkata</p>
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
