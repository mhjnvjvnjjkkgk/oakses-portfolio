import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { InteractiveHeading } from './ui/InteractiveHeading';
import { Check, ChevronDown } from 'lucide-react';

interface ServiceItem {
    id: string;
    title: string;
    description: string;
    details: string[];
    previewImage: string;
}

const services: ServiceItem[] = [
    {
        id: "01",
        title: "UI/UX DESIGN",
        description: "Crafting intuitive digital experiences",
        details: [
            "Wireframing and prototyping",
            "User Interface design for web and mobile apps",
            "Usability testing and user feedback analysis",
            "Interaction design and micro-animations"
        ],
        previewImage: "/samples/thumbnails/Thumbnail - 2.jpg"
    },
    {
        id: "02",
        title: "GRAPHIC DESIGN",
        description: "Visual storytelling through brand assets",
        details: [
            "Brand identity and logo design",
            "Social media creatives and banners",
            "Marketing materials (brochures, flyers)",
            "Vector illustrations and iconography"
        ],
        previewImage: "/samples/logo/si esports (4) (1).jpg"
    },
    {
        id: "03",
        title: "WEB DESIGN",
        description: "Functional and beautiful websites",
        details: [
            "Responsive website design",
            "Landing page optimization",
            "Webflow / Framer development",
            "Design systems and style guides"
        ],
        previewImage: "/samples/others/Roadmap (7).jpg"
    },
    {
        id: "04",
        title: "BRANDING",
        description: "Complete visual identity systems",
        details: [
            "Visual identity strategy",
            "Brand guidelines and voice",
            "Logo suites and variations",
            "Corporate stationery design"
        ],
        previewImage: "/samples/jersey/sir mockup.png"
    }
];

const WhatICanDo: React.FC = () => {
    const [openItem, setOpenItem] = useState<string | null>("01");
    const [hoveredItem, setHoveredItem] = useState<number | null>(null);

    // Mouse tracking for preview image
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const smoothX = useSpring(mouseX, { stiffness: 150, damping: 20 });
    const smoothY = useSpring(mouseY, { stiffness: 150, damping: 20 });

    const handleMouseMove = (e: React.MouseEvent) => {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
    };

    const toggleItem = (id: string) => {
        setOpenItem(openItem === id ? null : id);
    };

    return (
        <section
            className="py-24 px-6 md:px-20 bg-transparent relative overflow-hidden"
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
                    opacity: hoveredItem !== null ? 1 : 0,
                    scale: hoveredItem !== null ? 1 : 0.8,
                }}
                transition={{ duration: 0.2 }}
            >
                <AnimatePresence mode="popLayout">
                    {hoveredItem !== null && (
                        <motion.img
                            key={hoveredItem}
                            src={services[hoveredItem].previewImage}
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

            {/* Background elements */}
            <div
                className="absolute top-1/2 left-0 w-[600px] h-[600px]"
                style={{
                    background: 'radial-gradient(circle, rgba(34, 197, 94, 0.05) 0%, transparent 70%)',
                    filter: 'blur(100px)',
                    transform: 'translate(-30%, -30%)',
                }}
            />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="mb-20">
                    <InteractiveHeading
                        title="What I Can Do For You"
                        subtitle="MY EXPERTISE"
                        align="left"
                    />
                    <p className="text-gray-400 max-w-2xl mt-6 text-lg">
                        As a digital designer, I am a visual storyteller, crafting experiences that connect deeply and spark creativity.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 relative">
                    {/* Left Column: List of Services (Accordion) */}
                    <div className="md:col-span-6 space-y-4">
                        {services.map((item, index) => {
                            const isOpen = openItem === item.id;

                            return (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    onClick={() => toggleItem(item.id)}
                                    onMouseEnter={() => setHoveredItem(index)}
                                    onMouseLeave={() => setHoveredItem(null)}
                                    className={`
                                        group border border-white/10 rounded-xl overflow-hidden cursor-pointer transition-all duration-300
                                        ${isOpen ? 'bg-white/5 border-green-500/50' : 'hover:border-white/30'}
                                    `}
                                >
                                    {/* Header */}
                                    <div className="p-6 md:p-8 flex items-center justify-between">
                                        <h3 className="text-2xl md:text-3xl font-black text-white flex items-baseline gap-4">
                                            <span className={`text-sm font-bold transition-colors ${isOpen ? 'text-green-400' : 'text-green-500/70 group-hover:text-green-400'}`}>
                                                {item.id}.
                                            </span>
                                            <span
                                                style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.05em' }}
                                                className={`transition-colors ${isOpen ? 'text-green-400' : 'text-white group-hover:text-white'}`}
                                            >
                                                {item.title}
                                            </span>
                                        </h3>

                                        <motion.div
                                            animate={{ rotate: isOpen ? 180 : 0 }}
                                            className={`w-8 h-8 rounded-full border flex items-center justify-center transition-colors ${isOpen ? 'border-green-500 text-green-500' : 'border-white/20 text-white/50 group-hover:border-white/50 group-hover:text-white'}`}
                                        >
                                            <ChevronDown className="w-4 h-4" />
                                        </motion.div>
                                    </div>

                                    {/* Expanded Details */}
                                    <AnimatePresence>
                                        {isOpen && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                            >
                                                <div className="px-6 pb-8 md:px-8 md:pb-8 pt-0 border-t border-white/5">
                                                    <div className="space-y-4 mt-6">
                                                        {item.details.map((detail, idx) => (
                                                            <motion.div
                                                                key={idx}
                                                                initial={{ opacity: 0, x: -10 }}
                                                                animate={{ opacity: 1, x: 0 }}
                                                                transition={{ delay: idx * 0.05 }}
                                                                className="flex items-start gap-4 text-gray-300"
                                                            >
                                                                <div className="mt-1 w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0">
                                                                    <Check className="w-3 h-3 text-green-500" />
                                                                </div>
                                                                <span className="text-sm md:text-base leading-relaxed">{detail}</span>
                                                            </motion.div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Right Column: Card Landing Zone */}
                    <div className="hidden md:flex md:col-span-6 relative justify-center items-center h-full min-h-[600px]">
                        {/* Card lands here via RotatingCard component */}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhatICanDo;
