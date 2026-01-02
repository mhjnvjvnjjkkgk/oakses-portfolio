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
    // Map speed (1-100) to duration (30s-5s) - higher speed = shorter duration
    const duration = Math.max(5, 35 - (animation.speed * 0.3));
    // Map scale (1-100) to size multiplier
    const sizeMultiplier = 0.5 + (animation.scale / 100);

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
            {/* CSS Keyframe Animations */}
            <style>{`
                @keyframes etherealMove1 {
                    0%, 100% { 
                        transform: translate(0%, 0%) scale(1);
                        opacity: 0.7;
                    }
                    25% { 
                        transform: translate(10%, -15%) scale(1.1);
                        opacity: 0.9;
                    }
                    50% { 
                        transform: translate(-5%, 10%) scale(0.95);
                        opacity: 0.6;
                    }
                    75% { 
                        transform: translate(-15%, -5%) scale(1.05);
                        opacity: 0.8;
                    }
                }
                
                @keyframes etherealMove2 {
                    0%, 100% { 
                        transform: translate(0%, 0%) scale(1);
                        opacity: 0.6;
                    }
                    33% { 
                        transform: translate(-20%, 15%) scale(1.15);
                        opacity: 0.8;
                    }
                    66% { 
                        transform: translate(15%, -10%) scale(0.9);
                        opacity: 0.5;
                    }
                }
                
                @keyframes etherealMove3 {
                    0%, 100% { 
                        transform: translate(0%, 0%) rotate(0deg) scale(1);
                        opacity: 0.5;
                    }
                    50% { 
                        transform: translate(10%, 10%) rotate(5deg) scale(1.1);
                        opacity: 0.7;
                    }
                }
                
                @keyframes etherealPulse {
                    0%, 100% { opacity: 0.3; }
                    50% { opacity: 0.6; }
                }
            `}</style>

            {/* Shadow Layer 1 - Large moving blob */}
            <div
                style={{
                    position: "absolute",
                    top: "-20%",
                    left: "-20%",
                    width: `${140 * sizeMultiplier}%`,
                    height: `${140 * sizeMultiplier}%`,
                    background: `radial-gradient(ellipse 60% 50% at 30% 40%, ${color} 0%, transparent 60%)`,
                    filter: "blur(60px)",
                    animation: `etherealMove1 ${duration}s ease-in-out infinite`,
                    willChange: "transform, opacity"
                }}
            />

            {/* Shadow Layer 2 - Medium blob opposite corner */}
            <div
                style={{
                    position: "absolute",
                    top: "-10%",
                    right: "-30%",
                    width: `${120 * sizeMultiplier}%`,
                    height: `${130 * sizeMultiplier}%`,
                    background: `radial-gradient(ellipse 50% 60% at 70% 60%, ${color} 0%, transparent 55%)`,
                    filter: "blur(50px)",
                    animation: `etherealMove2 ${duration * 1.3}s ease-in-out infinite`,
                    animationDelay: `-${duration * 0.3}s`,
                    willChange: "transform, opacity"
                }}
            />

            {/* Shadow Layer 3 - Center pulsing */}
            <div
                style={{
                    position: "absolute",
                    top: "10%",
                    left: "20%",
                    width: `${100 * sizeMultiplier}%`,
                    height: `${100 * sizeMultiplier}%`,
                    background: `radial-gradient(ellipse 40% 40% at 50% 50%, ${color} 0%, transparent 50%)`,
                    filter: "blur(80px)",
                    animation: `etherealMove3 ${duration * 1.5}s ease-in-out infinite`,
                    animationDelay: `-${duration * 0.6}s`,
                    willChange: "transform, opacity"
                }}
            />

            {/* Shadow Layer 4 - Bottom accent */}
            <div
                style={{
                    position: "absolute",
                    bottom: "-30%",
                    left: "10%",
                    width: `${80 * sizeMultiplier}%`,
                    height: `${80 * sizeMultiplier}%`,
                    background: `radial-gradient(ellipse 70% 40% at 40% 70%, ${color} 0%, transparent 50%)`,
                    filter: "blur(70px)",
                    animation: `etherealMove1 ${duration * 1.2}s ease-in-out infinite reverse`,
                    animationDelay: `-${duration * 0.5}s`,
                    willChange: "transform, opacity"
                }}
            />

            {/* Content Layer */}
            {children && (
                <div style={{ position: "relative", zIndex: 10, width: "100%", height: "100%" }}>
                    {children}
                </div>
            )}

            {/* Noise Overlay */}
            {noise && noise.opacity > 0 && (
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        opacity: noise.opacity * 0.4,
                        pointerEvents: "none",
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                        backgroundRepeat: 'repeat',
                        backgroundSize: `${noise.scale * 150}px ${noise.scale * 150}px`,
                        animation: `etherealPulse ${duration * 0.5}s ease-in-out infinite`
                    }}
                />
            )}
        </div>
    );
}

export default EtherealShadow;
