import React from 'react';
import { motion } from 'framer-motion';

interface AboutCardProps {
    frontImage?: string;
    backImage?: string;
}

const AboutCard: React.FC<AboutCardProps> = ({
    frontImage = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=600&fit=crop",
    backImage = "https://images.unsplash.com/photo-1593062096033-9a26b09da705?w=400&h=600&fit=crop"
}) => {
    return (
        <div className="sticky top-32">
            {/* Card Container - Shows back side (rotated 180°) */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "0px" }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative w-[240px] h-[320px] md:w-[280px] md:h-[380px] mx-auto"
                style={{
                    transform: 'rotateY(180deg)',
                    transformStyle: 'preserve-3d',
                    perspective: 1500,
                }}
            >
                {/* Front Face (hidden due to 180° rotation) */}
                <div
                    className="absolute inset-0 rounded-2xl overflow-hidden"
                    style={{
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                        transform: 'translateZ(6px)',
                        boxShadow: '0 30px 60px -15px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255,255,255,0.1)',
                    }}
                >
                    <img src={frontImage} alt="Front" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-5 left-5">
                        <h3 className="text-3xl font-black tracking-tight" style={{ fontFamily: "'Bebas Neue', sans-serif", color: '#f5f0e8', textShadow: '0 2px 8px rgba(0,0,0,0.6)' }}>
                            OAKSES
                        </h3>
                    </div>
                    <div className="absolute bottom-5 right-5 w-10 h-10 bg-green-400 rounded-full flex items-center justify-center">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2.5">
                            <path d="M7 17L17 7M17 7H7M17 7V17" />
                        </svg>
                    </div>
                </div>

                {/* Back Face (visible due to 180° rotation) */}
                <div
                    className="absolute inset-0 rounded-2xl overflow-hidden"
                    style={{
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg) translateZ(6px)',
                        boxShadow: '0 30px 60px -15px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255,255,255,0.1)',
                    }}
                >
                    <img src={backImage} alt="Workspace" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-5 left-5 right-5">
                        <p className="text-sm text-green-400 font-semibold tracking-wider uppercase">My Workspace</p>
                        <p className="text-white/80 text-xs mt-1">Where creativity happens</p>
                    </div>
                    <motion.div
                        className="absolute top-5 right-5 w-3 h-3 bg-green-400 rounded-full"
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    />
                </div>
            </motion.div>

            {/* Glow effect */}
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[450px] rounded-full -z-10"
                style={{
                    opacity: 0.15,
                    background: 'radial-gradient(circle, rgba(34,197,94,0.6) 0%, transparent 65%)',
                    filter: 'blur(50px)',
                }}
            />
        </div>
    );
};

export default AboutCard;
