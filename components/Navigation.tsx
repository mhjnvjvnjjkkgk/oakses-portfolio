import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Magnetic } from './ui/Magnetic';

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuVariants = {
    closed: { 
      opacity: 0,
      scale: 0.95,
      filter: "blur(20px)",
      transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] }
    },
    open: { 
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] }
    }
  };

  const linkVariants = {
    closed: { y: 50, opacity: 0 },
    open: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: { delay: 0.1 * i, duration: 0.5, type: "spring", stiffness: 100 }
    })
  };

  const links = ["About", "Gallery", "Services", "Work", "Rates", "Contact"];

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-50 px-6 py-6 md:px-10 transition-all duration-300 ${scrolled ? 'backdrop-blur-md bg-black/50 py-4' : ''} flex justify-between items-center mix-blend-difference text-white`}>
        <Magnetic strength={20}>
            <div className="text-xl md:text-2xl font-black tracking-tighter cursor-pointer">OAKSES</div>
        </Magnetic>
        
        <Magnetic strength={40}>
            <button 
            onClick={() => setIsOpen(true)} 
            className="flex items-center gap-2 text-xs uppercase tracking-widest font-bold hover:text-green-400 transition-colors px-4 py-2 rounded-full border border-transparent hover:border-white/10 bg-transparent hover:bg-white/5"
            >
            Menu <Menu size={24} />
            </button>
        </Magnetic>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed inset-0 bg-[#0a0a0a]/95 backdrop-blur-xl z-[60] flex flex-col justify-center items-center"
          >
             <div className="absolute top-6 right-6 md:top-10 md:right-10">
                <Magnetic>
                    <button 
                        onClick={() => setIsOpen(false)} 
                        className="text-white hover:text-green-400 transition-colors p-4 rounded-full hover:bg-white/10"
                    >
                        <X size={32} />
                    </button>
                </Magnetic>
            </div>

            <div className="flex flex-col gap-4 items-center">
              {links.map((link, i) => (
                <div key={link} className="overflow-hidden">
                    <motion.a 
                    href={`#${link.toLowerCase()}`}
                    custom={i}
                    variants={linkVariants}
                    onClick={() => setIsOpen(false)}
                    className="block text-5xl md:text-8xl font-black text-transparent text-stroke-white hover:text-white transition-all duration-300 cursor-pointer hover:tracking-widest"
                    style={{ WebkitTextStroke: "1px white" }}
                    >
                    {link}
                    </motion.a>
                </div>
              ))}
            </div>
            
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1, transition: { delay: 0.5 } }}
               className="absolute bottom-10 text-gray-500 text-sm"
            >
              oakses.design
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
