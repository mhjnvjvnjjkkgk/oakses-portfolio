import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const ParallaxBackground = () => {
    const { scrollYProgress } = useScroll();
    
    // Create varying speeds for parallax depth relative to the entire page scroll
    const ySlow = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
    const yFast = useTransform(scrollYProgress, [0, 1], ["0%", "-100%"]);
    const yReverse = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    
    const rotate = useTransform(scrollYProgress, [0, 1], [0, 180]);
    const rotateRev = useTransform(scrollYProgress, [0, 1], [0, -180]);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            {/* Shape 1: Large Stroked Circle (Left) */}
            <motion.div 
                style={{ y: ySlow, rotate }}
                className="absolute top-[10%] left-[5%] w-[30vw] h-[30vw] border border-white/5 rounded-full opacity-50" 
            />
            
            {/* Shape 2: Large Stroked Circle (Right - Mirrored) */}
            {/* Replaced the Cross with a matching circle as requested */}
            <motion.div 
                style={{ y: ySlow, rotate: rotateRev }}
                className="absolute top-[10%] right-[5%] w-[30vw] h-[30vw] border border-white/5 rounded-full opacity-50" 
            />

            {/* Shape 3: Dashed Circle */}
            <motion.div 
                style={{ y: yReverse }}
                className="absolute bottom-[20%] left-[15%] w-64 h-64 border border-dashed border-white/5 rounded-full opacity-30" 
            />

             {/* Shape 4: Square */}
             <motion.div 
                style={{ y: yFast, rotate: rotate }}
                className="absolute top-[60%] right-[30%] w-32 h-32 border border-green-500/10 rotate-45" 
            />

            {/* Shape 5: Grid Points */}
            <motion.div 
                style={{ y: ySlow }}
                className="absolute top-[15%] right-[20%] grid grid-cols-4 gap-4 opacity-20"
            >
                {[...Array(16)].map((_, i) => (
                    <div key={i} className="w-1 h-1 bg-white rounded-full" />
                ))}
            </motion.div>
        </div>
    );
};