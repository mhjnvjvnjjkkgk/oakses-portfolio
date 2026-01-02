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
    color = 'rgba(40, 40, 40, 1)',
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
                backgroundColor: "#2a2a2a", // Gray base like reference
                ...style
            }}
        >
            {/* CSS Keyframe Animations for dramatic wave shadows */}
            <style>{`
                @keyframes shadowWave1 {
                    0%, 100% { 
                        transform: translate(0%, 0%) scale(1) rotate(0deg);
                    }
                    25% { 
                        transform: translate(15%, -10%) scale(1.1) rotate(3deg);
                    }
                    50% { 
                        transform: translate(-10%, 15%) scale(0.95) rotate(-2deg);
                    }
                    75% { 
                        transform: translate(-15%, -5%) scale(1.05) rotate(2deg);
                    }
                }
                
                @keyframes shadowWave2 {
                    0%, 100% { 
                        transform: translate(0%, 0%) scale(1) skewX(0deg);
                    }
                    33% { 
                        transform: translate(-20%, 10%) scale(1.15) skewX(3deg);
                    }
                    66% { 
                        transform: translate(15%, -15%) scale(0.9) skewX(-3deg);
                    }
                }
                
                @keyframes shadowWave3 {
                    0%, 100% { 
                        transform: translate(0%, 0%) rotate(0deg) scale(1);
                    }
                    50% { 
                        transform: translate(10%, 10%) rotate(-5deg) scale(1.2);
                    }
                }
            `}</style>

            {/* Dark Wave Shadow 1 - Large diagonal */}
            <div
                style={{
                    position: "absolute",
                    top: "-50%",
                    left: "-30%",
                    width: "180%",
                    height: "200%",
                    background: `linear-gradient(135deg, 
                        ${color} 0%, 
                        ${color} 20%, 
                        transparent 40%, 
                        transparent 60%, 
                        ${color} 80%, 
                        ${color} 100%)`,
                    filter: "blur(30px)",
                    animation: `shadowWave1 ${duration}s ease-in-out infinite`,
                    opacity: 0.9,
                    willChange: "transform"
                }}
            />

            {/* Dark Wave Shadow 2 - Counter diagonal */}
            <div
                style={{
                    position: "absolute",
                    top: "-40%",
                    right: "-40%",
                    width: "200%",
                    height: "180%",
                    background: `linear-gradient(-45deg, 
                        transparent 0%, 
                        transparent 25%, 
                        ${color} 35%, 
                        ${color} 50%, 
                        transparent 60%, 
                        transparent 100%)`,
                    filter: "blur(25px)",
                    animation: `shadowWave2 ${duration * 1.3}s ease-in-out infinite`,
                    animationDelay: `-${duration * 0.3}s`,
                    opacity: 0.85,
                    willChange: "transform"
                }}
            />

            {/* Dark Wave Shadow 3 - Horizontal band */}
            <div
                style={{
                    position: "absolute",
                    top: "20%",
                    left: "-20%",
                    width: "150%",
                    height: "80%",
                    background: `linear-gradient(180deg, 
                        transparent 0%, 
                        ${color} 30%, 
                        ${color} 50%, 
                        transparent 70%, 
                        transparent 100%)`,
                    filter: "blur(40px)",
                    animation: `shadowWave3 ${duration * 0.8}s ease-in-out infinite`,
                    animationDelay: `-${duration * 0.5}s`,
                    opacity: 0.8,
                    willChange: "transform"
                }}
            />

            {/* Dark Wave Shadow 4 - Bottom accent */}
            <div
                style={{
                    position: "absolute",
                    bottom: "-30%",
                    left: "10%",
                    width: "120%",
                    height: "80%",
                    background: `radial-gradient(ellipse 80% 50% at 50% 80%, 
                        ${color} 0%, 
                        ${color} 30%, 
                        transparent 60%)`,
                    filter: "blur(35px)",
                    animation: `shadowWave1 ${duration * 1.1}s ease-in-out infinite reverse`,
                    animationDelay: `-${duration * 0.7}s`,
                    opacity: 0.85,
                    willChange: "transform"
                }}
            />

            {/* Content Layer */}
            {children && (
                <div style={{ position: "relative", zIndex: 10, width: "100%", height: "100%" }}>
                    {children}
                </div>
            )}

            {/* Noise Texture Overlay */}
            {noise && noise.opacity > 0 && (
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        opacity: noise.opacity,
                        pointerEvents: "none",
                        mixBlendMode: "overlay",
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.4' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                        backgroundRepeat: 'repeat',
                        backgroundSize: `${noise.scale * 300}px ${noise.scale * 300}px`
                    }}
                />
            )}
        </div>
    );
}

export default EtherealShadow;
