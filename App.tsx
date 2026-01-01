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
import CustomCursor from './components/CustomCursor';
import BentoGrid from './components/BentoGrid';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import { Connect } from './components/Connect';
import ZoomParallax from './components/ZoomParallax';
import { FallingPattern } from './components/ui/falling-pattern';

function App() {
  
  // Smooth scroll behavior hack for anchors
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="bg-[#050505] min-h-screen text-white selection:bg-green-500 selection:text-white relative">
      <CustomCursor />
      <Navigation />
      
      {/* Global Background Pattern */}
      <div className="fixed inset-0 pointer-events-none z-0">
         <FallingPattern 
            color="rgba(34, 197, 94, 0.2)" 
            backgroundColor="#050505" 
            blurIntensity="0px"
         />
      </div>

      <main className="relative z-10">
        <Hero />
        <div id="about">
          <About />
        </div>
        <Skills />
        <BentoGrid />
        
        {/* Zoom Parallax Section */}
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