import React, { useEffect, useState } from 'react';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Gallery from './components/Gallery';
import Process from './components/Process';
import Services from './components/Services';
import Work from './components/Work';
import Rates from './components/Rates';
import Contact from './components/Contact';
import Navigation from './components/Navigation';
import BentoGrid from './components/BentoGrid';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import { Connect } from './components/Connect';
import ZoomParallax from './components/ZoomParallax';
import RotatingCard from './components/RotatingCard';
import WhatICanDo from './components/WhatICanDo';
import { EtherealShadow } from './components/ui/ethereal-shadow';

// Animated Film Grain Noise Overlay
const NoiseOverlay: React.FC<{ opacity?: number }> = ({ opacity = 0.25 }) => (
  <div
    className="fixed inset-0 z-[5] pointer-events-none"
    style={{
      opacity: opacity,
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
      backgroundRepeat: 'repeat',
      backgroundSize: '50px 50px',
      animation: 'noiseShift 0.05s steps(10) infinite',
    }}
  />
);

function App() {
  const [noiseOpacity] = useState(0.25);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="min-h-screen text-white selection:bg-green-500 selection:text-white relative">

      {/* Global keyframes for noise animation */}
      <style>{`
        @keyframes noiseShift {
          0% { transform: translate(0, 0); }
          10% { transform: translate(-1%, -1%); }
          20% { transform: translate(1%, 0%); }
          30% { transform: translate(-1%, 1%); }
          40% { transform: translate(0%, -1%); }
          50% { transform: translate(1%, 1%); }
          60% { transform: translate(-1%, 0%); }
          70% { transform: translate(0%, 1%); }
          80% { transform: translate(1%, -1%); }
          90% { transform: translate(-1%, 1%); }
          100% { transform: translate(0, 0); }
        }
      `}</style>

      {/* Layer 1: Ethereal Shadow - FIXED BACKGROUND at z-0 */}
      <div className="fixed inset-0 z-0">
        <EtherealShadow
          color="rgba(5, 5, 5, 0.95)"
          animation={{ scale: 100, speed: 40 }}
          noise={{ opacity: 0, scale: 1 }} // Disabled internal noise, using separate layer
        />
      </div>

      {/* Layer 2: Animated Noise Overlay at z-5 (above shadow, below content) */}
      <NoiseOverlay opacity={noiseOpacity} />

      {/* 3D Rotating Card that follows scroll */}
      <RotatingCard />

      {/* Navigation */}
      <Navigation />

      {/* Layer 3: Main content at z-10 (on TOP of everything) */}
      <main className="relative z-10">
        <Hero />
        <div id="about">
          <About />
        </div>
        <WhatICanDo />
        <Skills />
        <BentoGrid />

        <ZoomParallax />

        <div id="gallery">
          <Gallery />
        </div>
        <div id="services">
          <Services />
        </div>
        <Process />
        <div id="work">
          <Work />
        </div>
        <Testimonials />
        <div id="rates">
          <Rates />
        </div>
        <FAQ />
        <div id="contact">
          <Contact />
        </div>
        <Connect />
      </main>
    </div>
  );
}

export default App;