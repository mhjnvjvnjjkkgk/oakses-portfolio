'use client';

import React, { CSSProperties } from 'react';

interface AnimationConfig {
    scale: number;
    speed: number;
}

interface NoiseConfig {
    opacity: number;
    scale: number;
}

interface EtherealShadowProps {
    color?: string;
    animation?: AnimationConfig;
    noise?: NoiseConfig;
    style?: CSSProperties;
    className?: string;
    children?: React.ReactNode;
}

export function EtherealShadow({
    color = 'rgba(60, 60, 60, 0.8)',
    animation = { scale: 50, speed: 50 },
    noise,
    style,
    className,
    children
}: EtherealShadowProps) {
    // Map speed (1-100) to duration - higher speed = shorter duration (faster animation)
    const duration = Math.max(3, 20 - (animation.speed * 0.17));
    // Map scale (1-100) to size multiplier
    const sizeMultiplier = 0.6 + (animation.scale / 100) * 0.8;

    return (
        <div
            className={className}
            style={{
                overflow: "hidden",
                position: "relative",
                width: "100%",
                height: "100%",
                ...style
            }}
        >
            {/* CSS Keyframe Animations - MORE VISIBLE */}
            <style>{`
                @keyframes etherealWave1 {
                    0% { 
                        transform: translate(0%, 0%) scale(1) rotate(0deg);
                    }
                    20% { 
                        transform: translate(25%, -20%) scale(1.2) rotate(2deg);
                    }
                    40% { 
                        transform: translate(-15%, 25%) scale(0.9) rotate(-3deg);
                    }
                    60% { 
                        transform: translate(-30%, -15%) scale(1.15) rotate(4deg);
                    }
                    80% { 
                        transform: translate(20%, 15%) scale(0.85) rotate(-2deg);
                    }
                    100% { 
                        transform: translate(0%, 0%) scale(1) rotate(0deg);
                    }
                }
                
                @keyframes etherealWave2 {
                    0% { 
                        transform: translate(0%, 0%) scale(1);
                    }
                    25% { 
                        transform: translate(-35%, 20%) scale(1.25);
                    }
                    50% { 
                        transform: translate(30%, -25%) scale(0.85);
                    }
                    75% { 
                        transform: translate(-20%, -30%) scale(1.1);
                    }
                    100% { 
                        transform: translate(0%, 0%) scale(1);
                    }
                }
                
                @keyframes etherealWave3 {
                    0% { 
                        transform: translate(0%, 0%) scale(1) rotate(0deg);
                    }
                    33% { 
                        transform: translate(20%, 30%) scale(1.3) rotate(5deg);
                    }
                    66% { 
                        transform: translate(-25%, -20%) scale(0.8) rotate(-5deg);
                    }
                    100% { 
                        transform: translate(0%, 0%) scale(1) rotate(0deg);
                    }
                }
                
                @keyframes etherealWave4 {
                    0%, 100% { 
                        transform: translateX(0%) translateY(0%);
                    }
                    50% { 
                        transform: translateX(-40%) translateY(20%);
                    }
                }
                
                @keyframes noiseShift {
                    0% { 
                        transform: translate(0, 0);
                        opacity: 0.4;
                    }
                    25% {
                        transform: translate(-3px, 3px);
                        opacity: 0.6;
                    }
                    50% { 
                        transform: translate(3px, -3px);
                        opacity: 0.3;
                    }
                    75% {
                        transform: translate(-2px, -2px);
                        opacity: 0.5;
                    }
                    100% { 
                        transform: translate(0, 0);
                        opacity: 0.4;
                    }
                }
            `}</style>

            {/* Shadow Layer 1 - Large moving blob TOP LEFT */}
            <div
                style={{
                    position: "absolute",
                    top: "-30%",
                    left: "-30%",
                    width: `${150 * sizeMultiplier}%`,
                    height: `${150 * sizeMultiplier}%`,
                    background: `radial-gradient(ellipse 50% 40% at 40% 40%, ${color} 0%, transparent 55%)`,
                    filter: "blur(40px)",
                    animation: `etherealWave1 ${duration}s ease-in-out infinite`,
                    willChange: "transform"
                }}
            />

            {/* Shadow Layer 2 - Blob TOP RIGHT */}
            <div
                style={{
                    position: "absolute",
                    top: "-20%",
                    right: "-40%",
                    width: `${140 * sizeMultiplier}%`,
                    height: `${140 * sizeMultiplier}%`,
                    background: `radial-gradient(ellipse 45% 55% at 60% 50%, ${color} 0%, transparent 50%)`,
                    filter: "blur(50px)",
                    animation: `etherealWave2 ${duration * 1.2}s ease-in-out infinite`,
                    animationDelay: `-${duration * 0.4}s`,
                    willChange: "transform"
                }}
            />

            {/* Shadow Layer 3 - Blob BOTTOM LEFT */}
            <div
                style={{
                    position: "absolute",
                    bottom: "-25%",
                    left: "-20%",
                    width: `${120 * sizeMultiplier}%`,
                    height: `${130 * sizeMultiplier}%`,
                    background: `radial-gradient(ellipse 55% 45% at 35% 60%, ${color} 0%, transparent 50%)`,
                    filter: "blur(45px)",
                    animation: `etherealWave3 ${duration * 0.9}s ease-in-out infinite`,
                    animationDelay: `-${duration * 0.7}s`,
                    willChange: "transform"
                }}
            />

            {/* Shadow Layer 4 - Blob BOTTOM RIGHT */}
            <div
                style={{
                    position: "absolute",
                    bottom: "-35%",
                    right: "-25%",
                    width: `${100 * sizeMultiplier}%`,
                    height: `${110 * sizeMultiplier}%`,
                    background: `radial-gradient(ellipse 50% 50% at 65% 55%, ${color} 0%, transparent 55%)`,
                    filter: "blur(55px)",
                    animation: `etherealWave4 ${duration * 1.5}s ease-in-out infinite`,
                    animationDelay: `-${duration * 0.2}s`,
                    willChange: "transform"
                }}
            />

            {/* Content Layer */}
            {children && (
                <div style={{ position: "relative", zIndex: 10, width: "100%", height: "100%" }}>
                    {children}
                </div>
            )}

            {/* Static Noise Overlay - bigger particles, no flickering */}
            {noise && noise.opacity > 0 && (
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        opacity: noise.opacity * 0.4,
                        pointerEvents: "none",
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.25' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                        backgroundRepeat: 'repeat',
                        backgroundSize: `${noise.scale * 400}px ${noise.scale * 400}px`
                    }}
                />
            )}
        </div>
    );
}

export default EtherealShadow;
