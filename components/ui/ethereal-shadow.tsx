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
    color = 'rgba(10, 10, 10, 1)',
    animation = { scale: 50, speed: 50 },
    noise,
    style,
    className,
    children
}: EtherealShadowProps) {
    // Animation duration based on speed
    const duration = Math.max(8, 30 - (animation.speed * 0.22));

    return (
        <div
            className={className}
            style={{
                overflow: "hidden",
                position: "relative",
                width: "100%",
                height: "100%",
                backgroundColor: "#1a1a1a", // Dark gray base
                ...style
            }}
        >
            {/* CSS Keyframe Animations for sharp wave shadows + animated noise */}
            <style>{`
                @keyframes shadowWave1 {
                    0%, 100% { 
                        transform: translate(0%, 0%) scale(1) rotate(0deg);
                    }
                    25% { 
                        transform: translate(12%, -8%) scale(1.05) rotate(2deg);
                    }
                    50% { 
                        transform: translate(-8%, 12%) scale(0.98) rotate(-1deg);
                    }
                    75% { 
                        transform: translate(-12%, -4%) scale(1.02) rotate(1deg);
                    }
                }
                
                @keyframes shadowWave2 {
                    0%, 100% { 
                        transform: translate(0%, 0%) scale(1) skewX(0deg);
                    }
                    33% { 
                        transform: translate(-15%, 8%) scale(1.08) skewX(2deg);
                    }
                    66% { 
                        transform: translate(12%, -10%) scale(0.95) skewX(-2deg);
                    }
                }
                
                @keyframes shadowWave3 {
                    0%, 100% { 
                        transform: translate(0%, 0%) rotate(0deg) scale(1);
                    }
                    50% { 
                        transform: translate(8%, 8%) rotate(-3deg) scale(1.1);
                    }
                }
                
                @keyframes noiseFloat {
                    0% { 
                        transform: translate(0, 0);
                    }
                    25% { 
                        transform: translate(-2%, 1%);
                    }
                    50% { 
                        transform: translate(1%, -2%);
                    }
                    75% { 
                        transform: translate(-1%, -1%);
                    }
                    100% { 
                        transform: translate(0, 0);
                    }
                }
            `}</style>

            {/* Dark Wave Shadow 1 - SHARP diagonal (reduced blur) */}
            <div
                style={{
                    position: "absolute",
                    top: "-40%",
                    left: "-20%",
                    width: "160%",
                    height: "180%",
                    background: `linear-gradient(135deg, 
                        ${color} 0%, 
                        ${color} 25%, 
                        transparent 45%, 
                        transparent 55%, 
                        ${color} 75%, 
                        ${color} 100%)`,
                    filter: "blur(15px)", // Reduced from 30px for sharper edges
                    animation: `shadowWave1 ${duration}s ease-in-out infinite`,
                    opacity: 0.95,
                    willChange: "transform"
                }}
            />

            {/* Dark Wave Shadow 2 - SHARP counter diagonal */}
            <div
                style={{
                    position: "absolute",
                    top: "-30%",
                    right: "-30%",
                    width: "170%",
                    height: "160%",
                    background: `linear-gradient(-45deg, 
                        transparent 0%, 
                        transparent 30%, 
                        ${color} 40%, 
                        ${color} 55%, 
                        transparent 65%, 
                        transparent 100%)`,
                    filter: "blur(12px)", // Sharp
                    animation: `shadowWave2 ${duration * 1.3}s ease-in-out infinite`,
                    animationDelay: `-${duration * 0.3}s`,
                    opacity: 0.9,
                    willChange: "transform"
                }}
            />

            {/* Dark Wave Shadow 3 - SHARP horizontal band */}
            <div
                style={{
                    position: "absolute",
                    top: "25%",
                    left: "-15%",
                    width: "140%",
                    height: "60%",
                    background: `linear-gradient(180deg, 
                        transparent 0%, 
                        ${color} 35%, 
                        ${color} 55%, 
                        transparent 75%, 
                        transparent 100%)`,
                    filter: "blur(18px)", // Sharp
                    animation: `shadowWave3 ${duration * 0.8}s ease-in-out infinite`,
                    animationDelay: `-${duration * 0.5}s`,
                    opacity: 0.85,
                    willChange: "transform"
                }}
            />

            {/* Dark Wave Shadow 4 - Bottom accent SHARP */}
            <div
                style={{
                    position: "absolute",
                    bottom: "-20%",
                    left: "15%",
                    width: "100%",
                    height: "60%",
                    background: `radial-gradient(ellipse 70% 40% at 50% 80%, 
                        ${color} 0%, 
                        ${color} 35%, 
                        transparent 55%)`,
                    filter: "blur(10px)", // Very sharp
                    animation: `shadowWave1 ${duration * 1.1}s ease-in-out infinite reverse`,
                    animationDelay: `-${duration * 0.7}s`,
                    opacity: 0.9,
                    willChange: "transform"
                }}
            />

            {/* Content Layer */}
            {children && (
                <div style={{ position: "relative", zIndex: 10, width: "100%", height: "100%" }}>
                    {children}
                </div>
            )}

            {/* ANIMATED Noise Texture Overlay - smooth float animation */}
            {noise && noise.opacity > 0 && (
                <div
                    style={{
                        position: "absolute",
                        inset: "-5%",
                        width: "110%",
                        height: "110%",
                        opacity: noise.opacity,
                        pointerEvents: "none",
                        mixBlendMode: "overlay",
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.5' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                        backgroundRepeat: 'repeat',
                        backgroundSize: `${noise.scale * 250}px ${noise.scale * 250}px`,
                        animation: `noiseFloat ${duration * 0.5}s ease-in-out infinite`
                    }}
                />
            )}
        </div>
    );
}

export default EtherealShadow;
