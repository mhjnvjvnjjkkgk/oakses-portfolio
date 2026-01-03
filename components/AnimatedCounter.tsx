import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';

interface AnimatedCounterProps {
    target: number;
    suffix?: string;
    prefix?: string;
    duration?: number;
    className?: string;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
    target,
    suffix = '',
    prefix = '',
    duration = 1.5,
    className = '',
}) => {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: "0px" });
    const [displayValue, setDisplayValue] = useState(0);

    // Spring for smooth counting
    const springValue = useSpring(0, {
        stiffness: 100,
        damping: 30,
        duration: duration * 1000,
    });

    useEffect(() => {
        if (isInView) {
            springValue.set(target);
        }
    }, [isInView, target, springValue]);

    useEffect(() => {
        const unsubscribe = springValue.on("change", (latest) => {
            setDisplayValue(Math.round(latest));
        });
        return unsubscribe;
    }, [springValue]);

    // Format large numbers (e.g., 150000 -> 150K)
    const formatNumber = (num: number): string => {
        if (target >= 1000) {
            // For numbers like 150K, we need to format properly
            if (suffix.includes('K')) {
                return Math.round(num / 1000).toString();
            }
        }
        return num.toString();
    };

    return (
        <motion.span
            ref={ref}
            className={className}
            initial={{ opacity: 0.5 }}
            animate={{ opacity: isInView ? 1 : 0.5 }}
        >
            {prefix}{target >= 1000 && suffix.includes('K') ? formatNumber(displayValue * 1000) : displayValue}{suffix}
        </motion.span>
    );
};

export default AnimatedCounter;
