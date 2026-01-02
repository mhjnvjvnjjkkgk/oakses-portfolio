import React, { useEffect } from 'react';
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

// Animated Noise Background Component
const NoiseBackground: React.FC = () => (
  <>
    <div
      className="fixed inset-0 pointer-events-none z-[9999]"
      style={{
        opacity: 0.06,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat',
        backgroundSize: '200px 200px',
        animation: 'noise 0.2s steps(5) infinite',
      }}
    />
    <style>{`
      @keyframes noise {
        0% { transform: translate(0, 0); }
        25% { transform: translate(-5px, 5px); }
        50% { transform: translate(5px, -5px); }
        75% { transform: translate(-5px, -5px); }
        100% { transform: translate(5px, 5px); }
      }
    `}</style>
  </>
);

function App() {

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="bg-[#0f0f0f] min-h-screen text-white selection:bg-green-500 selection:text-white">

      {/* Ethereal Shadow Animated Overlay */}
      <div className="fixed inset-0 z-[3] pointer-events-none">
        <EtherealShadow
          color="rgba(60, 60, 60, 1)"
          animation={{ scale: 70, speed: 40 }}
          noise={{ opacity: 0.4, scale: 1.5 }}
        />
      </div>

      {/* Animated Noise Overlay */}
      <NoiseBackground />

      {/* 3D Rotating Card that follows scroll */}
      <RotatingCard />

      <Navigation />

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