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
        title: "LOGO DESIGN",
        description: "Professional logo design specially made for your niche",
        details: [
            "₹300 per logo",
            "2 free revisions included",
            "High quality renders",
            "All source files provided"
        ],
        previewImage: "/samples/logo/si esports (4) (1).jpg"
    },
    {
        id: "02",
        title: "WEBSITE CREATION",
        description: "Beautifully animated, handcrafted websites for business or portfolio",
        details: [
            "₹10,000 per website",
            "Full source code provided with setup instructions",
            "Optional maintenance: ₹1,000/month (hosting + 2 changes/week)",
            "Custom animations and responsive design"
        ],
        previewImage: "/samples/WEBSITES/elevez.shop.png" // Website UI instead of roadmap
    },
    {
        id: "03",
        title: "JERSEY DESIGN",
        description: "Beautiful jersey designs made ready for printing",
        details: [
            "₹500-650 per design (4 jerseys with different names)",
            "Printing available: ₹400 per jersey",
            "Shipping available: ₹60 per 2 jerseys",
            "Print-ready files delivered"
        ],
        previewImage: "/samples/jersey/arpan front.jpeg" // Jersey design
    },
    {
        id: "04",
        title: "THUMBNAIL DESIGN",
        description: "High-CTR thumbnails that look great for your specific genre",
        details: [
            "₹200 per thumbnail",
            "Genre-specific styling",
            "Click-optimized designs",
            "Quick turnaround time"
        ],
        previewImage: "/samples/thumbnails/thumbanil 1.jpg" // Better thumbnail example
    },
    {
        id: "05",
        title: "POSTER DESIGN",
        description: "Creative posters for events, promotions, and announcements",
        details: [
            "₹250 per poster",
            "Event-focused designs",
            "Print & digital ready",
            "Custom graphics and layouts"
        ],
        previewImage: "/samples/poster/Poster (6).jpg"
    },
    {
        id: "06",
        title: "BRAND IDENTITY",
        description: "Complete brand kit with colors, logos, and fonts",
        details: [
            "₹5,000 full package",
            "Niche-specific design strategy",
            "Color palette and typography guidelines",
            "All source files included"
        ],
        previewImage: "/samples/logo/elevez main white logo (1).png"
    }
];

const WhatICanDo: React.FC = () => {
    const [openItem, setOpenItem] = useState<string | null>("01");
    const [hoveredItem, setHoveredItem] = useState<number | null>(null);

    // Mouse tracking for preview image
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const smoothX = useSpring(mouseX, { stiffness: 1000, damping: 15 });
    const smoothY = useSpring(mouseY, { stiffness: 1000, damping: 15 });

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

