import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Globe, Award, Heart } from 'lucide-react';
import { TiltCard } from './ui/TiltCard';
import { ZoomSection } from './ui/ZoomSection';
import { InteractiveHeading } from './ui/InteractiveHeading';

const BentoGrid: React.FC = () => {
  return (
    <section className="py-32 px-6 md:px-20 bg-[#050505] relative z-20 overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <ZoomSection className="mb-20 text-center">
            <h2 className="text-sm font-bold tracking-[0.3em] text-green-500 uppercase mb-4">Why Choose Me</h2>
            <div className="text-4xl md:text-5xl font-black text-white flex justify-center">
                <InteractiveHeading text="The OAKSES Edge" />
            </div>
        </ZoomSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
            {/* Large Card: Aesthetics */}
            <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="md:col-span-2 row-span-1"
            >
                <TiltCard className="h-full w-full bg-[#0a0a0a] border border-white/5 rounded-3xl p-10 flex flex-col justify-between overflow-hidden group relative">
                    {/* Animated Gradient Blob */}
                    <motion.div 
                        animate={{ 
                            scale: [1, 1.2, 1],
                            rotate: [0, 90, 0],
                        }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-green-500/20 to-emerald-500/20 blur-[60px] rounded-full opacity-50" 
                    />
                    
                    <div className="relative z-10">
                        <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mb-6 border border-white/10 group-hover:border-green-500/50 transition-colors">
                            <Award className="text-green-400" size={24} />
                        </div>
                        <h3 className="text-3xl font-bold text-white mb-2">Award-Winning Aesthetics</h3>
                        <p className="text-gray-400 max-w-md relative z-10">I don't just follow trends; I set them. My designs have been featured in top digital galleries for their unique blend of brutalism and elegance.</p>
                    </div>
                    
                    {/* Shimmer Effect on Text */}
                    <div className="relative z-10 mt-6 overflow-hidden w-fit">
                         <span className="text-xs font-bold uppercase tracking-widest text-white/50 group-hover:text-white transition-colors">Top 1% Talent</span>
                         <motion.div 
                            className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full"
                            whileHover={{ translateX: "100%" }}
                            transition={{ duration: 0.5 }}
                         />
                    </div>
                </TiltCard>
            </motion.div>

            {/* Tall Card: Global Reach (Interactive Map) */}
            <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="md:col-span-1 row-span-1 md:row-span-2"
            >
                <TiltCard className="h-full w-full bg-[#0a0a0a] border border-white/5 rounded-3xl p-10 flex flex-col justify-between overflow-hidden group relative">
                    {/* Abstract Map Background */}
                    <div className="absolute inset-0 opacity-20">
                         <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                             <path d="M0,50 Q25,25 50,50 T100,50" fill="none" stroke="white" strokeWidth="0.5" strokeDasharray="4 4" />
                             <path d="M0,30 Q40,60 80,30" fill="none" stroke="white" strokeWidth="0.5" strokeDasharray="4 4" />
                             <path d="M20,100 Q50,50 80,100" fill="none" stroke="white" strokeWidth="0.5" strokeDasharray="4 4" />
                         </svg>
                    </div>
                    
                    {/* Pulsing Dots */}
                    {[1,2,3].map(i => (
                        <motion.div 
                            key={i}
                            className="absolute w-2 h-2 bg-green-400 rounded-full shadow-[0_0_10px_#4ade80]"
                            style={{ 
                                top: `${20 + i * 25}%`, 
                                left: `${20 + i * 30}%` 
                            }}
                            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                        />
                    ))}

                    <div className="absolute bottom-0 left-0 w-full h-2/3 bg-gradient-to-t from-[#0a0a0a] to-transparent" />

                    <div className="relative z-10">
                        <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mb-6 border border-white/10 group-hover:border-green-500/50 transition-colors">
                            <Globe className="text-green-400" size={24} />
                        </div>
                        <h3 className="text-3xl font-bold text-white mb-4">Global Reach</h3>
                        <p className="text-gray-400">Working with clients from New York to Tokyo. Time zones are just numbers; delivery is guaranteed.</p>
                    </div>
                    
                    <div className="mt-10 grid grid-cols-2 gap-4 relative z-10">
                         <div className="text-center p-4 bg-white/5 rounded-xl border border-white/5 group-hover:bg-white/10 transition-colors">
                             <span className="block text-2xl font-bold text-white">15+</span>
                             <span className="text-xs text-gray-500 uppercase">Countries</span>
                         </div>
                         <div className="text-center p-4 bg-white/5 rounded-xl border border-white/5 group-hover:bg-white/10 transition-colors">
                             <span className="block text-2xl font-bold text-white">100+</span>
                             <span className="text-xs text-gray-500 uppercase">Clients</span>
                         </div>
                    </div>
                </TiltCard>
            </motion.div>

            {/* Small Card 1: Speed (Scanning Line) */}
            <motion.div 
                 initial={{ opacity: 0, scale: 0.8 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 transition={{ duration: 0.6, delay: 0.2 }}
                 className="md:col-span-1 row-span-1"
            >
                <TiltCard className="h-full w-full bg-[#0a0a0a] border border-white/5 rounded-3xl p-8 flex flex-col justify-center items-center text-center overflow-hidden group hover:border-green-500/30 transition-colors relative">
                     {/* Scanning Line */}
                     <motion.div 
                        className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-50"
                        animate={{ top: ["0%", "100%", "0%"] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                     />
                     
                     <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 relative z-10 group-hover:scale-110 transition-transform">
                        <Clock className="text-emerald-400 relative z-10" size={32} />
                        <motion.div 
                            className="absolute inset-0 rounded-full border border-emerald-500/30"
                            animate={{ scale: [1, 1.2, 1], opacity: [1, 0, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                     </div>
                     
                     <h3 className="text-xl font-bold text-white mb-2">Lightning Fast</h3>
                     <p className="text-sm text-gray-400">Average turnaround of 48 hours for initial concepts.</p>
                </TiltCard>
            </motion.div>

            {/* Small Card 2: Passion (Heartbeat) */}
            <motion.div 
                 initial={{ opacity: 0, scale: 0.8 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 transition={{ duration: 0.6, delay: 0.3 }}
                 className="md:col-span-1 row-span-1"
            >
                <TiltCard className="h-full w-full bg-[#0a0a0a] border border-white/5 rounded-3xl p-8 flex flex-col justify-center items-center text-center overflow-hidden group hover:border-red-500/30 transition-colors">
                     <motion.div 
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
                     >
                        <Heart className="text-red-400 mb-4" size={40} fill="rgba(248, 113, 113, 0.2)" />
                     </motion.div>
                     <h3 className="text-xl font-bold text-white mb-2">Passion First</h3>
                     <p className="text-sm text-gray-400">I don't just work; I craft. Every pixel is placed with intent.</p>
                </TiltCard>
            </motion.div>

        </div>
      </div>
    </section>
  );
};

export default BentoGrid;