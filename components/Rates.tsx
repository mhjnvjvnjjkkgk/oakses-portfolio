import React, { useState } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';
import { ZoomSection } from './ui/ZoomSection';
import { ParallaxBackground } from './ui/ParallaxBackground';
import { InteractiveHeading } from './ui/InteractiveHeading';
import { ScrollRevealText } from './ui/ScrollRevealText';

const rates = [
  {
    title: "Logo Design",
    price: "₹300",
    period: "per logo",
    description: "Professional logo design specially made for your niche.",
    features: ["2 Free Revisions", "High Quality Render", "Source Files", "Fast Delivery"],
    color: "#4ade80",
    previewImage: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=300&h=200&fit=crop"
  },
  {
    title: "Website Creation",
    price: "₹10,000",
    period: "per website",
    description: "Beautifully animated, handcrafted websites for business or portfolio.",
    features: ["Handcrafted Code", "Full Source Code Provided", "Setup Instructions", "Animations Included"],
    color: "#10b981",
    previewImage: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=300&h=200&fit=crop"
  },
  {
    title: "Jersey Design",
    price: "₹500 - ₹650",
    period: "per design",
    description: "Custom jersey designs made ready for printing.",
    features: ["Print-Ready Files", "Multiple Name Variations", "Printing Available (₹400)", "Shipping Available (₹60)"],
    color: "#2dd4bf",
    previewImage: "https://images.unsplash.com/photo-1577212017184-80cc0da11274?w=300&h=200&fit=crop"
  },
  {
    title: "Thumbnail Design",
    price: "₹200",
    period: "per thumbnail",
    description: "High-CTR thumbnails that look great for your specific genre.",
    features: ["Genre-Specific Style", "High Resolution", "Click-Optimized", "Quick Turnaround"],
    color: "#a3e635",
    previewImage: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=300&h=200&fit=crop"
  },
  {
    title: "Poster Design",
    price: "₹250",
    period: "per poster",
    description: "Creative posters for events, promotions, and announcements.",
    features: ["Event-Focused", "Print & Digital Ready", "Eye-Catching Layouts", "Custom Graphics"],
    color: "#f472b6",
    previewImage: "https://images.unsplash.com/photo-1558485203-b5413009da02?w=300&h=200&fit=crop"
  },
  {
    title: "Brand Identity",
    price: "₹5,000",
    period: "full package",
    description: "Complete brand kit with colors, fonts, and logos.",
    features: ["Full Brand Kit", "Color Palette & Fonts", "All Source Files", "Niche-Specific Design"],
    color: "#818cf8",
    previewImage: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=300&h=200&fit=crop"
  }
];

interface CardProps {
  item: typeof rates[0];
  index: number;
  onHover: (index: number) => void;
  onLeave: () => void;
}

const Card: React.FC<CardProps> = ({ item, index, onHover, onLeave }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <ZoomSection index={index} delay={index * 0.1}>
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseEnter={() => onHover(index)}
        onMouseLeave={onLeave}
        className="group relative h-full bg-white/5 border border-white/10 rounded-2xl p-8 overflow-hidden hover:border-white/20 transition-colors flex flex-col"
      >
        {/* Spotlight Effect */}
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
          style={{
            background: useMotionTemplate`
                radial-gradient(
                650px circle at ${mouseX}px ${mouseY}px,
                ${item.color}15,
                transparent 80%
                )
            `
          }}
        />

        <div className="relative z-10 flex flex-col h-full">
          <motion.div
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.8, ease: "backOut" }}
            className="mb-6 inline-flex items-center justify-center w-14 h-14 rounded-full bg-white/5 border border-white/10 shadow-lg"
          >
            <Sparkles size={24} style={{ color: item.color }} />
          </motion.div>

          <h3 className="text-2xl font-bold text-white mb-3 group-hover:translate-x-1 transition-transform">{item.title}</h3>
          <p className="text-gray-400 text-sm mb-6 flex-grow leading-relaxed">{item.description}</p>

          <div className="mb-8 p-4 rounded-lg bg-black/20 border border-white/5 backdrop-blur-sm">
            <span className="text-gray-500 text-xs uppercase tracking-wider block mb-1">{item.period}</span>
            <span className="text-4xl font-black text-white tracking-tight">{item.price}</span>
          </div>

          <ul className="space-y-4 mb-8">
            {item.features.map((feat: string, i: number) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + (i * 0.1), duration: 0.5 }}
                className="flex items-start gap-3 text-sm text-gray-300 group-hover:text-white transition-colors"
              >
                <motion.div
                  whileHover={{ scale: 1.2, color: item.color }}
                  className="mt-0.5 min-w-[16px]"
                >
                  <Check size={16} style={{ color: item.color }} />
                </motion.div>
                {feat}
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>
    </ZoomSection>
  );
};

const Rates: React.FC = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  // Mouse tracking for preview image
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 150, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  return (
    <section
      className="py-32 px-6 md:px-20 bg-transparent relative z-20 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Cursor Preview Image */}
      <motion.div
        className="fixed z-[100] pointer-events-none w-[200px] h-[140px] rounded-xl overflow-hidden shadow-2xl border-2 border-green-500/30 hidden md:block"
        style={{
          left: smoothX,
          top: smoothY,
          translateX: 20,
          translateY: 20,
        }}
        animate={{
          opacity: hoveredCard !== null ? 1 : 0,
          scale: hoveredCard !== null ? 1 : 0.8,
        }}
        transition={{ duration: 0.2 }}
      >
        <AnimatePresence mode="popLayout">
          {hoveredCard !== null && (
            <motion.img
              key={hoveredCard}
              src={rates[hoveredCard].previewImage}
              alt="Service Preview"
              className="absolute inset-0 w-full h-full object-cover"
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              exit={{ y: "-100%", opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            />
          )}
        </AnimatePresence>
      </motion.div>

      <ParallaxBackground />
      {/* Animated Background blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            opacity: [0.1, 0.3, 0.1],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-[10%] left-[20%] w-[500px] h-[500px] bg-green-900/20 blur-[150px] rounded-full"
        />
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
            opacity: [0.1, 0.3, 0.1],
            scale: [1, 1.3, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear", delay: 2 }}
          className="absolute bottom-[10%] right-[10%] w-[600px] h-[600px] bg-emerald-900/20 blur-[150px] rounded-full"
        />

      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <ZoomSection
          className="mb-24 text-center"
        >
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-xs font-bold tracking-[0.2em] text-green-400 uppercase mb-6"
          >
            Invest In Quality
          </motion.span>
          <h3 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight flex justify-center gap-4 flex-wrap">
            <ScrollRevealText>Design</ScrollRevealText>
            <span className="text-green-500 inline-block drop-shadow-[0_0_15px_rgba(34,197,94,0.4)]">
              <ScrollRevealText>Rates</ScrollRevealText>
            </span>
          </h3>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg font-light leading-relaxed">
            Transparent pricing for premium design services. Elevate your brand with professional visual identity and digital assets tailored to your needs.
          </p>
        </ZoomSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {rates.map((rate, index) => (
            <Card
              key={index}
              item={rate}
              index={index}
              onHover={setHoveredCard}
              onLeave={() => setHoveredCard(null)}
            />
          ))}
        </div>

        <ZoomSection
          delay={0.6}
          className="mt-16 text-center"
        >
          <p className="text-gray-500 text-sm">Need a custom quote? <a href="#contact" className="text-white border-b border-white/30 hover:border-green-500 transition-colors">Let's talk about your specific needs.</a></p>
        </ZoomSection>
      </div>
    </section>
  );
}

export default Rates;
