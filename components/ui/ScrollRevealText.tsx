import React, { useRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';

interface ScrollRevealTextProps {
    children: string;
    className?: string;
}

export const ScrollRevealText: React.FC<ScrollRevealTextProps> = ({ children, className = "" }) => {
    const element = useRef(null);
    const { scrollYProgress } = useScroll({
        target: element,
        offset: ['start 0.9', 'start 0.4'] // Starts when entering view, finishes near center
    });

    const characters = children.split("");
    const totalChars = characters.length;

    return (
        <span ref={element} className={`inline-flex flex-wrap ${className}`}>
            {characters.map((char, i) => {
                const start = i / totalChars;
                const end = start + (1 / totalChars);
                const opacity = useTransform(scrollYProgress, [start, end], [0.1, 1]);
                
                return (
                    <motion.span 
                        key={i} 
                        style={{ opacity }}
                        className="inline-block"
                    >
                        {char === " " ? "\u00A0" : char}
                    </motion.span>
                )
            })}
        </span>
    );
}