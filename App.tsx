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

import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import { Connect } from './components/Connect';
import ZoomParallax from './components/ZoomParallax';
import RotatingCard from './components/RotatingCard';
import WhatICanDo from './components/WhatICanDo';
import { EtherealShadow } from './components/ui/ethereal-shadow';

// Animated Noise Overlay - BASE LAYER with animation
const NoiseOverlay: React.FC<{ opacity?: number }> = ({ opacity = 0.4 }) => (
  <>
    <style>{`
      @keyframes noiseFlicker {
        0% { transform: translate(0, 0); }
        10% { transform: translate(-2%, -2%); }
        20% { transform: translate(2%, 1%); }
        30% { transform: translate(-1%, 2%); }
        40% { transform: translate(1%, -2%); }
        50% { transform: translate(-2%, 1%); }
        60% { transform: translate(2%, -1%); }
        70% { transform: translate(-1%, -2%); }
        80% { transform: translate(1%, 2%); }
        90% { transform: translate(-2%, -1%); }
        100% { transform: translate(0, 0); }
      }
    `}</style>
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1,
        pointerEvents: 'none',
        backgroundColor: '#1a1a1a',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: '-10%',
          width: '120%',
          height: '120%',
          opacity: opacity,
          background: `
            repeating-radial-gradient(#000 0 0.0001%, #fff 0 0.0002%) 50% 0/2500px 2500px,
            repeating-conic-gradient(#000 0 0.0001%, #fff 0 0.0002%) 60% 60%/2500px 2500px
          `,
          backgroundBlendMode: 'difference',
          animation: 'noiseFlicker 0.15s steps(8) infinite',
        }}
      />
    </div>
  </>
);

function App() {
  const [noiseOpacity] = useState(0.15);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="min-h-screen text-white selection:bg-green-500 selection:text-white relative">

      {/* Global keyframes for noise animation */}


      {/* Animated Noise - BASE LAYER */}
      <NoiseOverlay opacity={noiseOpacity} />

      {/* 3D Rotating Card that follows scroll */}
      <RotatingCard />

      {/* Navigation */}
      <Navigation />

      {/* Layer 3: Main content at z-10 */}
      <main className="relative z-10">
        <Hero />
        <div id="about">
          <About />
        </div>
        <WhatICanDo />
        <Skills />

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