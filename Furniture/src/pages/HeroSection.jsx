
import React, { useRef, useEffect, useState } from "react";
import { ArrowRight, X } from 'lucide-react';
import gsap from 'gsap';
import SofaImage from "../assets/sofaImage.webp";
import buildingImage from "../assets/building.webp";

const HeroSection = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const buildingRef = useRef(null);
  const bottomBarRef = useRef(null);
  const imageDivRef = useRef(null);
  
  // State for the sliding drawer panel
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const drawerRef = useRef(null);
  const backdropRef = useRef(null);

  useEffect(() => {
    // Simple, foolproof GSAP timeline that runs cleanly on every environment load
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // 1. Typewriter letter-by-letter setup
    const el = textRef.current;
    if (el) {
      const text = "Where Style Meets \nFunction";
      el.innerHTML = "";

      text.split("").forEach((char) => {
        const span = document.createElement("span");
        if (char === "\n") {
          el.appendChild(document.createElement("br"));
        } else {
          span.textContent = char === " " ? "\u00A0" : char;
          span.style.opacity = "0";
          el.appendChild(span);
        }
      });

      const spans = el.querySelectorAll("span");
      tl.to(spans, {
        opacity: 1,
        duration: 0.03,
        stagger: 0.04,
      }, 0.2);
    }

    // 2. Smooth entrance animation for the bottom bar and sofa image div
    tl.fromTo(
      [bottomBarRef.current, imageDivRef.current],
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.3 },
      0.4
    );

    // 3. Simple scroll parallax for the background building image
    const handleScroll = () => {
      if (buildingRef.current) {
        const scrollY = window.scrollY;
        gsap.to(buildingRef.current, {
          y: scrollY * 0.12,
          duration: 0.1,
          overwrite: "auto",
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Drawer open/close smooth GSAP animation
  useEffect(() => {
    if (isDrawerOpen) {
      gsap.to(drawerRef.current, { x: "0%", duration: 0.5, ease: "power3.out" });
      gsap.to(backdropRef.current, { opacity: 1, pointerEvents: "auto", duration: 0.3 });
    } else {
      gsap.to(drawerRef.current, { x: "100%", duration: 0.4, ease: "power3.in" });
      gsap.to(backdropRef.current, { opacity: 0, pointerEvents: "none", duration: 0.3 });
    }
  }, [isDrawerOpen]);

  return (
    <div ref={containerRef} className="w-full bg-[#f0ede8] overflow-hidden relative">
      
      {/* Sliding Drawer Backdrop */}
      <div 
        ref={backdropRef} 
        onClick={() => setIsDrawerOpen(false)}
        className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40 opacity-0 pointer-events-none transition-opacity"
      />

      {/* Sliding Drawer Panel (40% width, attached to right screen) */}
      <div 
        ref={drawerRef}
        className="fixed top-0 right-0 h-full w-full sm:w-[80%] md:w-[40%] bg-white shadow-2xl z-50 transform translate-x-full p-8 sm:p-12 flex flex-col justify-between"
      >
        <div>
          <div className="flex items-center justify-between pb-6 border-b border-neutral-200">
            <h2 className="text-2xl font-light tracking-wide text-neutral-900">About Our Studio</h2>
            <button 
              onClick={() => setIsDrawerOpen(false)}
              className="p-2 rounded-full hover:bg-neutral-100 transition-colors text-neutral-700"
            >
              <X size={24} />
            </button>
          </div>

          <div className="mt-8 space-y-6 text-neutral-600 text-sm sm:text-base leading-relaxed">
            <p>
              We craft bespoke architectural and interior experiences tailored around your distinct personality and everyday lifestyle.
            </p>
            <p>
              Our philosophy bridges the gap between raw functional utility and timeless aesthetic beauty, delivering spaces that elevate how you live, work, and feel.
            </p>
            <div className="p-6 bg-[#f0ede8] rounded-xl border border-neutral-200/60 mt-6">
              <h3 className="font-semibold text-neutral-900 mb-2">Core Expertise</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-neutral-700">
                <li>Residential Interior Architecture</li>
                <li>Custom Spatial Planning & Layouts</li>
                <li>High-End Material Curation</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-neutral-200 text-xs text-neutral-400 flex justify-between items-center">
          <span>Mink Studio Experience</span>
          <span>© 2026</span>
        </div>
      </div>

      <section className="relative overflow-hidden min-h-[65vh] flex flex-col justify-between py-12 px-6 sm:px-12 lg:px-20">
        
        {/* Background Architectural Sketch with Scroll & Hover Motion */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none flex items-center justify-end">
          <div 
            ref={buildingRef}
            style={{ backgroundImage: `url(${buildingImage})` }}
            className="w-full h-full bg-no-repeat bg-right bg-contain opacity-25 transition-transform duration-1000 ease-out hover:scale-105 hover:-translate-x-6"
          />
        </div>

        {/* Main Big Text Content with GSAP Typewriter */}
        <div className="relative z-10 max-w-7xl mt-8">
          <h1 
            ref={textRef}
            className="text-4xl sm:text-6xl capitalize lg:text-8xl font-light tracking-tight text-gray-900 leading-[1.1]"
          />
        </div>

        {/* Bottom Content Bar with Smooth GSAP Entrance */}
        <div ref={bottomBarRef} className="relative z-10 mt-16 opacity-0">
          <div className="w-full bg-[#EAE5DC]/80 backdrop-blur-sm border-t border-b border-gray-300/60 py-6 px-6 sm:px-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-sm rounded-lg">
            
            <div className="max-w-xs">
              <p className="text-xs sm:text-sm uppercase tracking-wider text-gray-800 font-medium leading-relaxed">
                Interior Design That Defines <br /> Modern Luxury
              </p>
            </div>

            <div>
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                27 Division St, New York, <br /> NY 10002, USA
              </p>
            </div>

            {/* Action Links & New Drawer Trigger Button */}
            <div className="flex items-center gap-4">
              <a 
                href="#about" 
                className="group inline-flex items-center gap-3 text-xs sm:text-sm font-semibold uppercase tracking-wider text-gray-900 hover:text-[#732c14] transition-colors"
              >
                More About Us 
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
              </a>

              {/* Small Action Button to open Right Drawer */}
            </div>

          </div >
          <div className=" py-5 flex items-end justify-end">
              <button
                onClick={() => setIsDrawerOpen(true)}
                className="bg-[#732c14] w-10 hover:bg-[#5a2210] text-white p-2.5 shadow-md transition-all duration-300 hover:scale-105 flex items-center justify-center cursor-pointer"
                aria-label="Open information drawer"
              >
                <ArrowRight className="w-4 h-4 -rotate-45" />
              </button>
          </div>
        </div>

      </section>

      {/* Hero Featured Sofa Image Div Section with Smooth Entrance */}
      <div ref={imageDivRef} className="w-full h-[40vh] sm:h-[55vh] md:h-[70vh] px-6 sm:px-12 lg:px-20 pb-12 opacity-0">
        <img 
          src={SofaImage} 
          alt="Luxury interior sofa showcase" 
          className="w-full h-full object-cover shadow-lg" 
        />
      </div>
    </div>
  );
};

export default HeroSection;

