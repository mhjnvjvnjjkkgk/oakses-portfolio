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

// Noise Overlay - inline animated noise texture
const NoiseOverlay: React.FC<{ opacity?: number }> = ({ opacity = 0.08 }) => (
  <>
    <style>{`
      @keyframes noiseAnim {
        0%, 100% { background-position: 0 0; }
        10% { background-position: -5% -5%; }
        20% { background-position: -10% 5%; }
        30% { background-position: 5% -10%; }
        40% { background-position: -5% 15%; }
        50% { background-position: -10% 5%; }
        60% { background-position: 15% 0; }
        70% { background-position: 0 10%; }
        80% { background-position: -15% 0; }
        90% { background-position: 10% 5%; }
      }
    `}</style>
    <div
      className="fixed inset-0 z-[5] pointer-events-none"
      style={{
        opacity: opacity,
        backgroundImage: `url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwBAMAAAClLOS0AAAAElBMVEUAAAAAAAAAAAAAAAAAAAAAAADgKxmiAAAABnRSTlMCBggKDA7RkHoLAAAASklEQVQ4y2NgGAWjAAj4GRj4GRgEGBj4BRgY+AUYGPgZGPj5GRj4+RkY+PkZGPj5GRj4GRQYGBQUFBQYFBgYFBQUGBQYRsEoGDoAABkJAxyd4T3TAAAAAElFTkSuQmCC")`,
        backgroundRepeat: 'repeat',
        animation: 'noiseAnim 0.2s steps(10) infinite',
      }}
    />
  </>
);

function App() {
  const [noiseOpacity] = useState(0.08);

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