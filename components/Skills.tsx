import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform, useVelocity, useAnimationFrame, useMotionValue } from 'framer-motion';
import { wrap } from '@motionone/utils';

const skills = [
  "Brand Strategy", "Visual Identity", "Web Design", "Motion Graphics",
  "3D Modeling", "Art Direction", "UI/UX Design", "Packaging",
  "Social Media", "Illustration", "Typography", "Creative Direction"
];

interface ParallaxTextProps {
  items: string[];
  baseVelocity: number;
}

const MarqueeItem: React.FC<{ item: string }> = ({ item }) => {
  return (
    <motion.span
      className="text-4xl md:text-8xl font-black uppercase cursor-default px-8 transition-all duration-300"
      style={{
        color: 'transparent',
        WebkitTextStroke: '1px rgba(255,255,255,0.3)',
      } as React.CSSProperties}
      whileHover={{
        scale: 1.15,
        color: '#ffffff',
        WebkitTextStroke: '0px transparent',
        textShadow: '0 0 40px rgba(255,255,255,0.5), 0 0 80px rgba(34, 197, 94, 0.4)',
      } as any}
    >
      {item}
    </motion.span>
  )
}

const Marquee = ({ items, baseVelocity = 100 }: ParallaxTextProps) => {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });

  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false
  });

  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  const directionFactor = useRef<number>(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    // Apply scroll velocity to movement speed
    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  // Skew effect based on speed
  const skew = useTransform(smoothVelocity, [-1000, 1000], [-10, 10]);

  return (
    <div className="flex overflow-hidden whitespace-nowrap py-4 mask-image-gradient">
      <motion.div
        style={{ x, skewX: skew }}
        className="flex pr-8 items-center"
      >
        {[...items, ...items, ...items, ...items].map((item, i) => (
          <MarqueeItem key={i} item={item} />
        ))}
      </motion.div>
    </div>
  );
};

const Skills: React.FC = () => {
  return (
    <section className="py-20 bg-transparent relative z-20 overflow-hidden border-y border-white/5">
      <div className="rotate-[-2deg] scale-110">
        <Marquee baseVelocity={-1} items={skills} />
        <Marquee baseVelocity={1} items={skills} />
      </div>

      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-[#0f0f0f] via-transparent to-[#0f0f0f]" />
    </section>
  );
};

export default Skills;
