import React from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';
import { ZoomSection } from './ui/ZoomSection';
import { ParallaxBackground } from './ui/ParallaxBackground';
import { InteractiveHeading } from './ui/InteractiveHeading';
import { ScrollRevealText } from './ui/ScrollRevealText';

const rates = [
  {
    title: "Logo Design",
    price: "$299",
    period: "starting at",
    description: "A timeless mark that defines your brand's essence.",
    features: ["3 Unique Concepts", "Brand Guidelines", "Vector Source Files", "Social Media Kit"],
    color: "#4ade80" // green-400 (bright green)
  },
  {
    title: "Website Creation",
    price: "$1,499",
    period: "starting at",
    description: "Immersive, high-performance digital experiences.",
    features: ["Custom 3D Design", "Responsive Layout", "CMS Integration", "SEO Optimization"],
    color: "#10b981" // emerald-500 (deep green)
  },
  {
    title: "Thumbnail Design",
    price: "$49",
    period: "per design",
    description: "High-CTR visuals designed to stop the scroll.",
    features: ["Click-Optimized", "Photo Manipulation", "Source Files", "24h Turnaround"],
    color: "#a3e635" // lime-400 (neon green)
  },
  {
    title: "Jersey Design",
    price: "$199",
    period: "per kit",
    description: "Professional esports and sports apparel design.",
    features: ["Sublimation Ready", "3D Mockup Render", "Print-Ready Files", "Pattern Creation"],
    color: "#2dd4bf" // teal-400 (teal green)
  }
];

interface CardProps {
  item: typeof rates[0];
  index: number;
}

const Card: React.FC<CardProps> = ({ item, index }) => {
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
  return (
    <section className="py-32 px-6 md:px-20 bg-[#0f0f0f] relative z-20 overflow-hidden">
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
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
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
            <Card key={index} item={rate} index={index} />
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