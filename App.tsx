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

function App() {

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="min-h-screen text-white selection:bg-green-500 selection:text-white relative">

      {/* Ethereal Shadow - FIXED BACKGROUND at z-0 */}
      <div className="fixed inset-0 z-0">
        <EtherealShadow
          color="rgba(10, 10, 10, 0.9)"
          animation={{ scale: 100, speed: 40 }}
          noise={{ opacity: 0.3, scale: 1 }}
        />
      </div>

      {/* 3D Rotating Card that follows scroll */}
      <RotatingCard />

      {/* Navigation */}
      <Navigation />

      {/* Main content - on TOP of ethereal shadow */}
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