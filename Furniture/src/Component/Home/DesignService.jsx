import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';

// Placeholder or imported images matching your design structure
import interiorImg from '../../assets/sofaimage.webp'; // Replace with your service images if needed
import spaceImg from '../../assets/sofaimage.webp';
import furnitureImg from '../../assets/sofaimage.webp';

const services = [
  {
    id: "01",
    title: "RESIDENTIAL INTERIOR DESIGN",
    description: "We create comfortable, stylish homes that reflect your personality and lifestyle. From concept to completion, every detail is thoughtfully designed to feel personal and functional.",
    image: interiorImg,
  },
  {
    id: "02",
    title: "SPACE PLANNING & LAYOUT",
    description: "Smart planning is the foundation of great design. We optimize layouts to maximize space, improve functionality, and create seamless movement throughout the interior.",
    image: spaceImg,
  },
  {
    id: "03",
    title: "FURNITURE & MATERIAL SELECTION",
    description: "We curate high-end furniture, textures, and finishes that harmonize with your architectural vision, ensuring enduring elegance and absolute comfort.",
    image: furnitureImg,
  },
];

export default function DesignServicesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const imageRef = useRef(null);
  const contentRef = useRef(null);

  // GSAP animation when active index changes
  useEffect(() => {
    if (imageRef.current && contentRef.current) {
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, scale: 1.05 },
        { opacity: 1, scale: 1, duration: 0.6, ease: "power2.out" }
      );
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
      );
    }
  }, [activeIndex]);

  return (
    <section className="w-full bg-[#5C2314] text-white py-20 px-6 md:px-12 lg:px-20 min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left Column: Heading & Sticky CTA */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-[#D4AF37]"></span>
              <span className="text-xs uppercase tracking-[0.2em] text-neutral-300 font-semibold">
                Design Solutions
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-wide leading-tight">
              DESIGN SERVICES <br />
              <span className="font-normal">TAILORED TO YOUR</span> <br />
              SPACE
            </h2>
          </div>

          <div>
            <a
              href="#all-services"
              className="inline-flex items-center justify-between border border-white/40 hover:border-white px-8 py-4 text-sm font-medium tracking-wider uppercase transition-all duration-300 group w-fit"
            >
              <span>View All Services</span>
              <ArrowRight className="w-4 h-4 ml-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </div>

        {/* Right Column: Interactive Accordion / Tab System matching the video */}
        <div className="lg:col-span-7 flex flex-col divide-y divide-white/20 border-t border-b border-white/20">
          {services.map((service, index) => {
            const isActive = activeIndex === index;

            return (
              <div
                key={service.id}
                onMouseEnter={() => setActiveIndex(index)}
                className="group cursor-pointer py-8 transition-colors duration-300"
              >
                {/* Header Row */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6 lg:space-x-10">
                    <span className="text-xl lg:text-2xl font-light text-neutral-400 group-hover:text-white transition-colors">
                      {service.id}
                    </span>
                    <h3 className={`text-xl lg:text-2xl font-medium tracking-wide transition-colors ${isActive ? 'text-white' : 'text-neutral-300 group-hover:text-white'}`}>
                      {service.title}
                    </h3>
                  </div>
                </div>

                {/* Expandable Content (Appears smoothly on active hover) */}
                {isActive && (
                  <div ref={contentRef} className="mt-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center pt-2">
                    <div className="md:col-span-7 pr-0 md:pr-4">
                      <p className="text-neutral-300 text-sm md:text-base leading-relaxed">
                        {service.description}
                      </p>
                      <div className="mt-6">
                        <a
                          href="#more-about"
                          className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-widest text-white hover:text-neutral-200 transition-colors group/link"
                        >
                          <span>More About Us</span>
                          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/link:translate-x-1" />
                        </a>
                      </div>
                    </div>

                    {/* Inline Preview Image matching the slide layout */}
                    <div className="md:col-span-5 overflow-hidden rounded-md shadow-lg">
                      <img
                        ref={imageRef}
                        src={service.image}
                        alt={service.title}
                        className="w-full h-36 md:h-44 object-cover"
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}