
import React, { useRef, useEffect } from "react";
import Basin from "../../assets/basin.webp";
import { Circle, MoveLeft, MoveRight } from "lucide-react";
import gsap from "gsap";

const Design = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;

    const text = "Spaces We’ve Designed";
    el.innerHTML = "";

    // Split text into individual spans for clean typewriter animation
    text.split("").forEach((char) => {
      const span = document.createElement("span");
      span.textContent = char === " " ? "\u00A0" : char;
      span.style.opacity = "0";
      el.appendChild(span);
    });

    const spans = el.querySelectorAll("span");

    // GSAP smooth typewriter animation
    gsap.to(spans, {
      opacity: 1,
      duration: 0.04,
      stagger: 0.05,
      ease: "power1.inOut",
    });

    // Smooth entrance animation for cards
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current.querySelectorAll('.animate-card'),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power3.out", delay: 0.3 }
      );
    }
  }, []);

  return (
    <div ref={containerRef} className="w-full flex flex-col items-center px-4 sm:px-8 md:px-16 py-16 md:py-24 bg-[#f0ede8] overflow-hidden">
      
      {/* Typewriter Header Section */}
      <div className="w-full text-center px-2">
        <h1 
          ref={textRef}
          className="text-3xl sm:text-5xl capitalize md:text-6xl lg:text-8xl font-light tracking-tight text-neutral-900 leading-tight"
        />
      </div>

      {/* Grid Content Cards - Fully Responsive */}
      <div className="pt-12 sm:pt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 w-full max-w-7xl">
        
        {/* Card 1 */}
        <div className="flex flex-col gap-6 animate-card opacity-0">
          <div className="overflow-hidden rounded-xl shadow-md">
            <img
              src={Basin}
              alt="Harmony Residence"
              className="h-64 sm:h-72 md:h-80 w-full object-cover transition-transform duration-700 ease-out hover:scale-105"
            />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-normal text-neutral-900">Harmony Residence</h2>
            <span className="flex items-center justify-start gap-3 font-semibold text-xs sm:text-sm text-neutral-500 tracking-wider mt-1">
              Architecture <Circle size={8} className="fill-current" /> Planning
            </span>
          </div>
        </div>

        {/* Card 2 */}
        <div className="flex flex-col gap-6 animate-card opacity-0">
          <div className="overflow-hidden rounded-xl shadow-md">
            <img
              src={Basin}
              alt="Grove Apartments"
              className="h-64 sm:h-72 md:h-80 w-full object-cover transition-transform duration-700 ease-out hover:scale-105"
            />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-normal text-neutral-900">Grove Apartments</h2>
            <span className="flex items-center justify-start gap-3 font-semibold text-xs sm:text-sm text-neutral-500 tracking-wider mt-1">
              Architecture <Circle size={8} className="fill-current" /> Planning
            </span>
          </div>
        </div>

        {/* Card 3 */}
        <div className="flex flex-col gap-6 animate-card opacity-0 md:col-span-2 lg:col-span-1">
          <div className="overflow-hidden rounded-xl shadow-md">
            <img
              src={Basin}
              alt="Luxe Heights"
              className="h-64 sm:h-72 md:h-80 w-full object-cover transition-transform duration-700 ease-out hover:scale-105"
            />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-normal text-neutral-900">Luxe Heights</h2>
            <span className="flex items-center justify-start gap-3 font-semibold text-xs sm:text-sm text-neutral-500 tracking-wider mt-1">
              Architecture <Circle size={8} className="fill-current" /> Planning
            </span>
          </div>
        </div>

      </div>

      {/* Navigation Arrows */}
      <div className="flex items-center text-[#732c14] gap-6 py-12 cursor-pointer">
        <MoveLeft size={28} className="hover:-translate-x-1 transition-transform" /> 
        <MoveRight size={28} className="hover:translate-x-1 transition-transform" />
      </div>

    </div>
  );
};

export default Design;
