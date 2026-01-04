import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';

const images = [
  "/samples/gallery/FOR YO DADDY.png",
  "/samples/gallery/another poster (3).jpg",
  "/samples/gallery/battle of underdogs thumbnail.png",
  "/samples/gallery/goku series.png",
  "/samples/gallery/new point table (9).jpg",
  "/samples/gallery/nvd back.jpeg",
  "/samples/gallery/nvd front.jpeg",
  "/samples/gallery/shunday showdown test 2 (8).jpg",
  "/samples/gallery/slot list 2 (2).jpg",
];

interface GalleryItemProps {
  src: string;
  index: number;
  containerX: MotionValue<number>;
  totalWidth: number;
}

const GalleryItem: React.FC<GalleryItemProps> = ({ src, index, containerX }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize(); // Check on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Approximate width of a card + gap. Using 400px as the base unit for calculation.
  const offset = index * 400;

  // Define the "Stick" plateau. 
  // On mobile, we make this wider (200px) so the image stays flat/centered longer during scroll.
  const plateauSize = isMobile ? 200 : 50;

  // inputRange with 4 points: [Start Entrance, Start Plateau, End Plateau, End Exit]
  const inputRange = [
    -offset - 700,
    -offset - plateauSize,
    -offset + plateauSize,
    -offset + 700
  ];

  // Enhanced 3D Parallax Effects with Plateau
  // The middle two values in the output array correspond to the plateau range in input
  const rotateY = useTransform(containerX, inputRange, [45, 0, 0, -45]);
  const z = useTransform(containerX, inputRange, [-300, 0, 0, -300]);
  const opacity = useTransform(containerX, inputRange, [0, 1, 1, 0]); // Fade out at edges
  const scale = useTransform(containerX, inputRange, [0.8, 1.15, 1.15, 0.8]); // Scale up and hold
  const y = useTransform(containerX, inputRange, [80, 0, 0, 80]); // Rise and hold

  return (
    <motion.div
      style={{
        rotateY,
        z,
        opacity: isMobile ? 1 : opacity,
        scale,
        y,
        perspective: 1000,
        transformStyle: "preserve-3d"
      }}
      className="relative w-[35vh] md:w-[45vh] flex-shrink-0 perspective-1000 z-10"
    >
      {/* Scroll Entrance Animation: Triggers when item enters viewport horizontally or vertically */}
      <motion.div
        initial={{ opacity: 0, y: 150, filter: "blur(20px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
        viewport={{ once: true, margin: "0px" }} // Trigger when entering view
        className="w-full h-full"
      >
        <motion.div
          className="w-full overflow-hidden rounded-xl bg-transparent border border-white/10 relative shadow-2xl group"
          whileHover={{ scale: 1.05, borderColor: "rgba(34, 197, 94, 0.5)" }}
          transition={{ duration: 0.4 }}
        >
          <img
            src={src}
            alt={`Gallery ${index} `}
            className="w-full h-auto object-cover grayscale-[50%] group-hover:grayscale-0 transition-all duration-700"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
            >
              <span className="text-green-400 font-mono text-xs mb-2 tracking-widest block">PROJECT 0{index + 1}</span>
              <h3 className="text-3xl font-bold text-white leading-none">{src.split('/').pop()?.replace(/\.(png|jpg|jpeg)$/i, '') || 'Visual Art'}</h3>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

const Gallery: React.FC = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Transform scroll progress to X translation
  const totalWidth = images.length * 400;
  const x = useTransform(scrollYProgress, [0, 1], [400, -totalWidth + 400]);
  const smoothX = useSpring(x, { stiffness: 50, damping: 15, mass: 0.5 });

  // Background parallax
  const bgX = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const textX = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacityText = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section ref={targetRef} className="h-[300vh] bg-transparent relative z-20">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden perspective-1000 bg-transparent">

        {/* Parallax Background Text with Scroll Fade In */}
        <motion.div
          style={{ x: textX, opacity: opacityText }}
          className="absolute top-1/2 -translate-y-1/2 left-0 whitespace-nowrap z-0 select-none pointer-events-none"
        >
          <motion.h2
            initial={{ opacity: 0, scale: 0.8, filter: "blur(20px)" }}
            whileInView={{ opacity: 0.05, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.5 }}
            viewport={{ once: true }}
            className="text-[30vw] font-black text-white leading-none tracking-tighter"
          >
            GALLERY
          </motion.h2>
        </motion.div>

        {/* Dynamic Background elements */}
        <motion.div
          style={{ x: bgX }}
          className="absolute top-20 right-20 w-96 h-96 bg-green-900/10 rounded-full blur-[100px] pointer-events-none"
        />



        {/* 3D Container */}
        <div className="w-full h-full flex items-center perspective-[1000px]">
          <motion.div
            ref={containerRef}
            style={{ x: smoothX }}
            className="flex gap-12 pl-[50vw] items-center preserve-3d"
          >
            {images.map((src, i) => (
              <GalleryItem
                key={i}
                src={src}
                index={i}
                containerX={smoothX}
                totalWidth={totalWidth}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
