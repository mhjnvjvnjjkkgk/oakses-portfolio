import React, { useRef } from 'react';
import { useScroll, useTransform, motion, useSpring } from 'framer-motion';

export default function ZoomParallax() {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start start', 'end end']
    });

    // Smooth the scroll progress for buttery animation
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Scale transforms for parallax effect - using smoothed progress
    const scales = [
        useTransform(smoothProgress, [0, 1], [1, 4]),
        useTransform(smoothProgress, [0, 1], [1, 5.5]),
        useTransform(smoothProgress, [0, 1], [1, 8]),
        useTransform(smoothProgress, [0, 1], [1, 12]),
        useTransform(smoothProgress, [0, 1], [1, 18]),
        useTransform(smoothProgress, [0, 1], [1, 25]),
    ];

    const textScale = useTransform(smoothProgress, [0, 0.8], [1, 45]);
    const textOpacity = useTransform(smoothProgress, [0, 0.6, 0.8], [1, 1, 0]);
    const opacityFade = useTransform(smoothProgress, [0, 0.9, 1], [1, 1, 0]);

    // 16 images for a rich parallax experience
    const pictures = [
        // Layer 1 - Deep Background (slowest)
        {
            src: "https://picsum.photos/600/800?random=1",
            scale: scales[0],
            rotation: -5,
            className: "w-[22vw] h-[20vh] -top-[30vh] -left-[26vw]"
        },
        {
            src: "https://picsum.photos/800/600?random=2",
            scale: scales[0],
            rotation: 4,
            className: "w-[24vw] h-[18vh] -top-[26vh] left-[20vw]"
        },
        {
            src: "https://picsum.photos/700/700?random=16",
            scale: scales[0],
            rotation: -2,
            className: "w-[20vw] h-[18vh] top-[28vh] left-[38vw]"
        },
        // Layer 2
        {
            src: "https://picsum.photos/500/700?random=3",
            scale: scales[1],
            rotation: -3,
            className: "w-[16vw] h-[24vh] top-[20vh] -left-[26vw]"
        },
        {
            src: "https://picsum.photos/700/500?random=4",
            scale: scales[1],
            rotation: 5,
            className: "w-[18vw] h-[16vh] top-[24vh] left-[24vw]"
        },
        {
            src: "https://picsum.photos/600/500?random=15",
            scale: scales[1],
            rotation: -4,
            className: "w-[16vw] h-[14vh] -top-[34vh] left-[5vw]"
        },
        // Layer 3
        {
            src: "https://picsum.photos/600/600?random=5",
            scale: scales[2],
            rotation: 2,
            className: "w-[14vw] h-[14vh] -top-[10vh] -left-[36vw]"
        },
        {
            src: "https://picsum.photos/650/450?random=6",
            scale: scales[2],
            rotation: -4,
            className: "w-[16vw] h-[12vh] top-[6vh] left-[32vw]"
        },
        {
            src: "https://picsum.photos/550/550?random=11",
            scale: scales[2],
            rotation: 6,
            className: "w-[12vw] h-[12vh] top-[32vh] -left-[8vw]"
        },
        // Layer 4
        {
            src: "https://picsum.photos/500/500?random=7",
            scale: scales[3],
            rotation: 6,
            className: "w-[11vw] h-[10vh] -top-[36vh] left-[10vw]"
        },
        {
            src: "https://picsum.photos/450/650?random=8",
            scale: scales[3],
            rotation: -2,
            className: "w-[12vw] h-[16vh] top-[32vh] -left-[14vw]"
        },
        {
            src: "https://picsum.photos/480/480?random=13",
            scale: scales[3],
            rotation: -7,
            className: "w-[10vw] h-[10vh] -top-[20vh] left-[38vw]"
        },
        // Layer 5
        {
            src: "https://picsum.photos/400/400?random=9",
            scale: scales[4],
            rotation: 8,
            className: "w-[9vw] h-[9vh] top-[4vh] -left-[16vw]"
        },
        {
            src: "https://picsum.photos/400/600?random=10",
            scale: scales[4],
            rotation: -6,
            className: "w-[10vw] h-[12vh] -top-[16vh] left-[14vw]"
        },
        // Layer 6 - Foreground (fastest)
        {
            src: "https://picsum.photos/480/680?random=12",
            scale: scales[5],
            rotation: 10,
            className: "w-[8vw] h-[10vh] -top-[22vh] -left-[40vw]"
        },
        {
            src: "https://picsum.photos/420/420?random=14",
            scale: scales[5],
            rotation: -10,
            className: "w-[7vw] h-[7vh] top-[18vh] left-[40vw]"
        },
    ];

    return (
        <div ref={container} className="h-[300vh] relative bg-[#0f0f0f]">
            <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">

                {/* Central Text */}
                <motion.div
                    style={{ scale: textScale, opacity: textOpacity }}
                    className="absolute z-50 text-center pointer-events-none"
                >
                    <h2
                        className="text-[8vw] md:text-[5vw] font-black text-transparent tracking-tighter"
                        style={{ WebkitTextStroke: '1px rgba(255, 255, 255, 0.3)' }}
                    >
                        MY WORK
                    </h2>
                </motion.div>

                {pictures.map(({ src, scale, className, rotation }, index) => (
                    <motion.div
                        key={index}
                        style={{ scale, opacity: opacityFade }}
                        className="absolute top-0 w-full h-full flex items-center justify-center pointer-events-none"
                    >
                        <div className={`relative ${className}`}>
                            <div
                                className="w-full h-full rounded-xl overflow-hidden border border-white/10 bg-neutral-900"
                                style={{ transform: `rotate(${rotation}deg)` }}
                            >
                                <img
                                    src={src}
                                    loading="lazy"
                                    className="object-cover w-full h-full opacity-85"
                                    alt="Work"
                                />
                            </div>
                        </div>
                    </motion.div>
                ))}

                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0f0f0f_90%)] pointer-events-none z-10" />
            </div>
        </div>
    );
}