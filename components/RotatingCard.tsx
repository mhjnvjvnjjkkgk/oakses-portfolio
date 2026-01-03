import React, { useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

interface RotatingCardProps {
    frontImage?: string;
    backImage?: string;
}

const RotatingCard: React.FC<RotatingCardProps> = ({
    frontImage = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=600&fit=crop",
    backImage = "https://images.unsplash.com/photo-1593062096033-9a26b09da705?w=400&h=600&fit=crop"
}) => {
    const [isFrontLoaded, setIsFrontLoaded] = useState(false);
    const [isBackLoaded, setIsBackLoaded] = useState(false);
    const { scrollY } = useScroll();

    // ═══════════════════════════════════════════════════════════════
    // SPRING PHYSICS CONFIG
    // ═══════════════════════════════════════════════════════════════
    const springConfig = { stiffness: 80, damping: 20, mass: 1 };

    // ═══════════════════════════════════════════════════════════════
    // SCROLL TRANSFORMS
    // ═══════════════════════════════════════════════════════════════

    // Waypoints (extended range so animation completes when WhatICanDo is visible):
    // 0-1000: Center → Left (Hero to About)
    // 1000-1200: Short dwell at Left (About)
    // 1200-2400: Left → Right (About to WhatICanDo)
    // 2400+: Scroll away

    // X Position (vw): 50 → 25 → 25 → 65 (lands in right column, aligned with text)
    const xPosRaw = useTransform(scrollY, [0, 1000, 1200, 2400], [50, 25, 25, 65]);
    const xPos = useSpring(xPosRaw, springConfig);

    // Y Position (vh): 50 → 55 → 55 → 62 (lands aligned with Graphic Design - 2nd item)
    const yPosRaw = useTransform(scrollY, [0, 1000, 1200, 2400], [50, 55, 55, 62]);
    const yPos = useSpring(yPosRaw, springConfig);

    // Rotation Y: 0 → 180 → 180 → 360
    const rotateYRaw = useTransform(scrollY, [0, 1000, 1200, 2400], [0, 180, 180, 360]);
    const rotateY = useSpring(rotateYRaw, springConfig);

    // Tilt (rotateZ):
    // Moving Left → tilt LEFT (-15°)
    // At Left (dwell) → tilt LEFT (-15°)
    // Moving Right → swings through RIGHT, ends tilted LEFT (-15°)
    const rotateZRaw = useTransform(scrollY, [0, 500, 1000, 1200, 1800, 2400], [0, -20, -15, -15, 20, -15]);
    const rotateZ = useSpring(rotateZRaw, springConfig);

    // Scroll-away offset after landing (NO spring - must be linear)
    const scrollAwayY = useTransform(scrollY, (v) => v > 2400 ? -(v - 2400) : 0);

    // ═══════════════════════════════════════════════════════════════
    // RENDER
    // ═══════════════════════════════════════════════════════════════
    return (
        <>
            <motion.div
                className="fixed inset-0 pointer-events-none z-[50] hidden md:block"
                style={{ y: scrollAwayY }}
            >
                <motion.div
                    className="absolute"
                    style={{
                        width: 340,
                        height: 460,
                        left: useTransform(xPos, v => `${v}vw`),
                        top: useTransform(yPos, v => `${v}vh`),
                        translateX: '-50%',
                        translateY: '-50%',
                        rotateY,
                        rotateZ,
                        transformStyle: 'preserve-3d',
                        perspective: 1500,
                    }}
                >
                    {/* FRONT FACE */}
                    <div
                        className="absolute inset-0 rounded-2xl overflow-hidden bg-[#1a1a1a]"
                        style={{
                            backfaceVisibility: 'hidden',
                            transform: 'translateZ(6px)',
                            boxShadow: '0 30px 60px -15px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.1)',
                        }}
                    >
                        <img
                            src={frontImage}
                            alt="Front"
                            className={`w-full h-full object-cover transition-all duration-700 ease-out ${isFrontLoaded ? 'opacity-100 blur-0 scale-100' : 'opacity-0 blur-xl scale-110'}`}
                            onLoad={() => setIsFrontLoaded(true)}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                        <div className="absolute bottom-5 left-5">
                            <h3 className="text-3xl font-black" style={{ fontFamily: "'Bebas Neue', sans-serif", color: '#f5f0e8' }}>
                                OAKSES
                            </h3>
                        </div>
                        <div className="absolute bottom-5 right-5 w-10 h-10 bg-green-400 rounded-full flex items-center justify-center">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2.5">
                                <path d="M7 17L17 7M17 7H7M17 7V17" />
                            </svg>
                        </div>
                    </div>

                    {/* BACK FACE */}
                    <div
                        className="absolute inset-0 rounded-2xl overflow-hidden bg-[#1a1a1a]"
                        style={{
                            backfaceVisibility: 'hidden',
                            transform: 'rotateY(180deg) translateZ(6px)',
                            boxShadow: '0 30px 60px -15px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.1)',
                        }}
                    >
                        <img
                            src={backImage}
                            alt="Workspace"
                            className={`w-full h-full object-cover transition-all duration-700 ease-out ${isBackLoaded ? 'opacity-100 blur-0 scale-100' : 'opacity-0 blur-xl scale-110'}`}
                            onLoad={() => setIsBackLoaded(true)}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                        <div className="absolute bottom-5 left-5 right-5">
                            <p className="text-sm text-green-400 font-semibold uppercase tracking-wider">My Workspace</p>
                            <p className="text-white/80 text-xs mt-1">Where creativity happens</p>
                        </div>
                        <div className="absolute top-5 right-5 w-3 h-3 bg-green-400 rounded-full" />
                    </div>
                </motion.div>
            </motion.div>

            {/* Glow */}
            <motion.div
                className="fixed inset-0 pointer-events-none z-[49] hidden md:block"
                style={{ y: scrollAwayY }}
            >
                <motion.div
                    className="absolute w-[400px] h-[500px] rounded-full"
                    style={{
                        left: useTransform(xPos, v => `${v}vw`),
                        top: useTransform(yPos, v => `${v}vh`),
                        translateX: '-50%',
                        translateY: '-50%',
                        opacity: 0.12,
                        background: 'radial-gradient(circle, rgba(34,197,94,0.6) 0%, transparent 65%)',
                        filter: 'blur(60px)',
                    }}
                />
            </motion.div>
        </>
    );
};

export default RotatingCard;
