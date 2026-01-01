import React, { useRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';

export default function ZoomParallax() {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start start', 'end end']
    });

    // Extremely wide scale range to create a long, deep tunnel effect.
    // The velocities (max scale) vary significantly to simulate objects at different distances.
    const scales = [
        useTransform(scrollYProgress, [0, 1], [1, 4]),   // Background (Slow)
        useTransform(scrollYProgress, [0, 1], [1, 6]),
        useTransform(scrollYProgress, [0, 1], [1, 8]),
        useTransform(scrollYProgress, [0, 1], [1, 12]),  // Mid-range
        useTransform(scrollYProgress, [0, 1], [1, 18]),
        useTransform(scrollYProgress, [0, 1], [1, 26]),
        useTransform(scrollYProgress, [0, 1], [1, 38]),  // Fast
        useTransform(scrollYProgress, [0, 1], [1, 55]),  // Very fast
        useTransform(scrollYProgress, [0, 1], [1, 90]),  // Warp speed (Foreground)
    ];

    // UPDATED TEXT ANIMATION:
    // Increased the scroll range from 0.45 to 0.85 to significantly slow down the zoom effect.
    // This allows the text to stay on screen longer and zoom more gradually.
    const textScale = useTransform(scrollYProgress, [0, 0.85], [1, 50]); 
    const textOpacity = useTransform(scrollYProgress, [0, 0.7, 0.85], [1, 1, 0]);
    const textBlur = useTransform(scrollYProgress, [0, 0.7, 0.85], ["0px", "0px", "10px"]);

    // Images fade out very late (0.95) to ensure they are visible until the next section takes over.
    const opacityFade = useTransform(scrollYProgress, [0, 0.95, 1], [1, 1, 0]);

    const pictures = [
        // LAYER 1: DEEP BACKGROUND (Slowest)
        {
            src: "https://picsum.photos/600/800?random=1",
            scale: scales[0],
            rotation: -5,
            className: "w-[25vw] h-[25vh] -top-[40vh] -left-[35vw] z-10" 
        },
        {
            src: "https://picsum.photos/800/600?random=2",
            scale: scales[0],
            rotation: 3,
            className: "w-[30vw] h-[25vh] -top-[35vh] left-[30vw] z-10" 
        },
        
        // LAYER 2: MID-BACKGROUND
        {
            src: "https://picsum.photos/500/700?random=3",
            scale: scales[1],
            rotation: -3,
            className: "w-[20vw] h-[35vh] top-[30vh] -left-[35vw] z-20"
        },
        {
            src: "https://picsum.photos/700/500?random=4",
            scale: scales[1],
            rotation: 5,
            className: "w-[25vw] h-[25vh] top-[35vh] left-[30vw] z-20"
        },
        
        // LAYER 3: MID-RANGE
        {
            src: "https://picsum.photos/600/600?random=5",
            scale: scales[2],
            rotation: 2,
            className: "w-[18vw] h-[22vh] -top-[15vh] -left-[45vw] z-30"
        },
        {
            src: "https://picsum.photos/800/800?random=6",
            scale: scales[2],
            rotation: -4,
            className: "w-[25vw] h-[25vh] top-[5vh] left-[45vw] z-30"
        },

        // LAYER 4: ACCELERATING
        {
            src: "https://picsum.photos/500/500?random=7",
            scale: scales[3],
            rotation: 6,
            className: "w-[15vw] h-[15vh] -top-[45vh] left-[5vw] z-40"
        },
        {
            src: "https://picsum.photos/600/900?random=8",
            scale: scales[3],
            rotation: -2,
            className: "w-[20vw] h-[28vh] top-[45vh] -left-[10vw] z-40"
        },
        
        // LAYER 5: FAST
        {
            src: "https://picsum.photos/400/400?random=9",
            scale: scales[4],
            rotation: 10,
            className: "w-[12vw] h-[12vh] top-[10vh] -left-[15vw] z-50"
        },
        {
            src: "https://picsum.photos/400/600?random=10",
            scale: scales[4],
            rotation: -8,
            className: "w-[15vw] h-[20vh] -top-[15vh] left-[15vw] z-50"
        },

        // LAYER 6: SUPER FAST (Filling the gap)
        {
             src: "https://picsum.photos/450/650?random=11",
             scale: scales[5],
             rotation: 15,
             className: "w-[18vw] h-[25vh] top-[20vh] -left-[25vw] z-50"
        },
        {
             src: "https://picsum.photos/650/450?random=12",
             scale: scales[6],
             rotation: -12,
             className: "w-[20vw] h-[15vh] -top-[20vh] left-[25vw] z-50"
        },

        // LAYER 7: WARP SPEED (Foreground elements passing by closely)
        {
             src: "https://picsum.photos/300/300?random=13",
             scale: scales[7],
             rotation: 45,
             className: "w-[10vw] h-[10vh] top-[0vh] left-[10vw] z-50"
        },
        {
             src: "https://picsum.photos/300/500?random=14",
             scale: scales[8], // Max Velocity
             rotation: -20,
             className: "w-[12vw] h-[18vh] -top-[10vh] -left-[10vw] z-50"
        }
    ];
    
    // Animation for letter-by-letter reveal
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };
    
    const letterVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { 
            y: 0, 
            opacity: 1,
            transition: { duration: 0.5, ease: "easeOut" }
        }
    };

    return (
        <div ref={container} className="h-[300vh] relative z-20 bg-[#050505]">
            <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center perspective-[1000px]">
                
                {/* Central Context Text - Increased Z-Index to stay above images initially */}
                <motion.div 
                    style={{ scale: textScale, opacity: textOpacity, filter: textBlur }}
                    className="absolute z-[60] flex flex-col items-center justify-center text-center pointer-events-none origin-center"
                >
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                         <h2 className="text-[8vw] md:text-[5vw] font-black text-transparent text-stroke-white tracking-tighter leading-none flex flex-wrap justify-center gap-4">
                            {/* Manual splitting for granular control via variants, or we wrap InteractiveHeading */}
                            {/* We use map here to apply the variants to each letter manually for entrance */}
                            {"ENTERING GALLERY".split("").map((char, i) => (
                                <motion.span key={i} variants={letterVariants}>
                                    {char === " " ? "\u00A0" : char}
                                </motion.span>
                            ))}
                        </h2>
                    </motion.div>
                </motion.div>

                {pictures.map( ({src, scale, className, rotation}, index) => {
                    return (
                        <motion.div 
                            key={index} 
                            style={{ scale, opacity: opacityFade }} 
                            className="absolute top-0 w-full h-full flex items-center justify-center pointer-events-none"
                        >
                            <div className={`relative flex items-center justify-center ${className}`}>
                                <motion.div 
                                    initial={{ rotate: rotation }}
                                    className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-neutral-900/50 backdrop-blur-sm"
                                >
                                    <img 
                                        src={src} 
                                        className="object-cover w-full h-full grayscale-[30%] opacity-80 hover:grayscale-0 transition-all duration-500" 
                                        alt="Zoom Parallax Asset" 
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-50" />
                                </motion.div>
                            </div>
                        </motion.div>
                    )
                })}
                
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050505_95%)] pointer-events-none z-10" />
            </div>
        </div>
    )
}