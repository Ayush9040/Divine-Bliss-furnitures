import React from 'react';
import { ArrowRight } from 'lucide-react';
import SofaImage from "../assets/sofaImage.webp"
// import buildingImage from '/assets/building.webp'

const HeroSection = () => {
  return (
    <>
    <section className="relative overflow-hidden bg-[#f0ede8] min-h-[65vh] flex flex-col justify-between py-12 px-6 sm:px-12 lg:px-20">
      
      {/* Background Architectural Sketch with Smooth Hover Motion */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none flex items-center justify-end">
        <div 
          style={{backgroundImage:`url(${('../assets/building.webp')})`}}
          className="w-full h-full bg-no-repeat bg-right bg-contain opacity-0 transition-transform duration-1000 ease-out hover:scale-105 hover:-translate-x-6 "
        />
      </div>

      {/* Main Big Text Content with Stagger Fade-In Animation */}
      <div className="relative z-10 max-w-5xl mt-8">
        <h1 className="flex flex-col text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight text-gray-900 leading-[1.1]">
          <h1  className=" typewriter-base animate-typing text-8xl font-mono">
            Where Style Meets <br />Function
          </h1>
        </h1>
      </div>

      {/* Bottom Content Bar with Delay Animation */}
      <div className="relative z-10 mt-16 opacity-0 animate-[fadeInUp_1s_cubic-bezier(0.16,1,0.3,1)_0.6s_forwards]">
        <div className="w-full bg-[#EAE5DC]/80 backdrop-blur-sm border-t border-b border-gray-300/60 py-6 px-6 sm:px-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          
          {/* Subtext Item 1 */}
          <div className="max-w-xs">
            <p className="text-xs sm:text-sm uppercase tracking-wider text-gray-800 font-medium leading-relaxed">
              Interior Design That Defines <br /> Modern Luxury
            </p>
          </div>

          {/* Subtext Item 2 */}
          <div>
            <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
              27 Division St, New York, <br /> NY 10002, USA
            </p>
          </div>

          {/* Action Link */}
          <div>
            <a 
              href="#about" 
              className="group inline-flex items-center gap-3 text-xs sm:text-sm font-semibold uppercase tracking-wider text-gray-900 hover:text-indigo-600 transition-colors"
            >
              More About Us 
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
            </a>
          </div>

        </div>
      </div>

      {/* Custom Keyframe Animations (Inject into Tailwind config or use arbitrary styles) */}
      <style>{`
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
      
    </section>
    <div className=' h-[45vh] md:h-[60vh] w-full'>
        <img src={SofaImage} alt="image" height={70} />
    </div>
    </>
  );
};

export default HeroSection;

