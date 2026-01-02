import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Quote } from 'lucide-react';
import { ZoomSection } from './ui/ZoomSection';
import { InteractiveHeading } from './ui/InteractiveHeading';

const testimonials = [
  {
    name: "Alex Rivera",
    role: "CEO, FinTech Solutions",
    text: "OAKSES didn't just design a website; they forged a digital identity that skyrocketed our conversion rates by 200%. Absolutely phenomonal work.",
    image: "https://picsum.photos/100/100?random=10"
  },
  {
    name: "Sarah Jenkins",
    role: "Marketing Director, Aura",
    text: "The attention to detail is unmatched. Every animation, every transition feels intentional. It's rare to find a designer who codes this well.",
    image: "https://picsum.photos/100/100?random=11"
  },
  {
    name: "Marcus Chen",
    role: "Founder, Zenith",
    text: "We needed something futuristic yet usable. OAKSES delivered a masterpiece that looks like it's from 2030. Highly recommended.",
    image: "https://picsum.photos/100/100?random=12"
  },
  {
    name: "Emily Davis",
    role: "Creative Lead, Studio X",
    text: "Professional, fast, and incredibly talented. The branding kit we received was comprehensive and breathtaking.",
    image: "https://picsum.photos/100/100?random=13"
  }
];

const Testimonials: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section className="py-32 bg-[#0f0f0f] relative z-20 overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-20 mb-16 relative z-10">
        <ZoomSection>
          <h2 className="text-sm font-bold tracking-[0.3em] text-green-500 uppercase mb-4">Testimonials</h2>
          <div className="text-4xl md:text-5xl font-black text-white">
            <InteractiveHeading text="Trusted By" /> <br />
            <InteractiveHeading text="Visionaries" />
          </div>
        </ZoomSection>
      </div>

      {/* Draggable Slider */}
      <motion.div
        className="flex gap-8 px-6 md:px-20 cursor-grab active:cursor-grabbing"
        drag="x"
        dragConstraints={{ right: 0, left: -1000 }} // Adjust based on content width
      >
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            className="min-w-[350px] md:min-w-[500px] bg-[#0a0a0a] border border-white/5 p-10 rounded-3xl relative flex flex-col justify-between group hover:border-white/10 transition-colors"
            whileHover={{ y: -10 }}
          >
            <div className="absolute top-8 right-8 text-green-500/20 group-hover:text-green-500/40 transition-colors">
              <Quote size={60} />
            </div>

            <p className="text-xl md:text-2xl font-serif text-gray-300 italic mb-8 relative z-10 leading-relaxed">
              "{t.text}"
            </p>

            <div className="flex items-center gap-4">
              <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full border border-white/10 grayscale group-hover:grayscale-0 transition-all" />
              <div>
                <h4 className="text-white font-bold">{t.name}</h4>
                <p className="text-green-400 text-xs uppercase tracking-wider">{t.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Testimonials;