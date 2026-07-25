import React from 'react';
import { Circle, MoveRight } from "lucide-react";
import Sofa from "../assets/sofa.webp";
import basin from "../assets/basin.webp";
import floweDesign from "../assets/flowerDesign.webp";
import client1 from "../assets/clients-1.webp";
import client2 from "../assets/clients-2.webp";
import client3 from "../assets/clients-3.webp";
import client4 from "../assets/clients-4.webp";
import client5 from "../assets/clients-5.webp";
import client6 from "../assets/clients-6.webp";

const Aboutus = () => {
  const data = [client1, client2, client3, client4, client5, client6];

  return (
    <section className="w-full px-6 sm:px-12 md:px-20 lg:px-32 py-16 md:py-25 lg:py-32 bg-[#f0ede8] overflow-hidden">
      
      {/* Top Header Section */}
      <div className="w-full lg:w-[85%] flex flex-col py-30">
        <span className="flex items-center justify-start gap-2 text-[#732c14] text-xs sm:text-sm font-medium tracking-widest uppercase">
          <Circle size={10} className="fill-current" /> SMTH LITTLE ABOUT US
        </span>
        <h2 className="mt-6 sm:mt-8 uppercase text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal leading-tight text-neutral-900">
          Interior Design That Balances Beauty, Comfort, and Purpose in Every Detail
        </h2>
      </div>

      {/* Main Content Grid */}
      <div className="w-full flex flex-col lg:flex-row mt-12 lg:mt-20 justify-between gap-12 lg:gap-16">
        
        {/* Left Column */}
        <div className="w-full lg:w-[46%] flex flex-col justify-between space-y-8 lg:space-y-12">
          <p className="text-xl sm:text-2xl font-light text-neutral-800 leading-snug">
            We believe great design goes <br className="hidden sm:inline" /> beyond aesthetics.
          </p>
          <div className="w-full overflow-hidden rounded-xl shadow-md">
            <img src={Sofa} alt="Sofa interior" className="w-full h-auto object-cover" />
          </div>
        </div>

        {/* Right Column */}
        <div className="w-full lg:w-[46%] text-base sm:text-lg text-neutral-700 flex flex-col gap-8 lg:gap-10">
          <p className="leading-relaxed">
            It’s about how a space works, how it feels, and how it supports everyday life. By combining smart planning, high-quality materials, and a deep understanding of light, color, and form, we transform ideas into spaces that are beautiful, practical, and uniquely personal. Our goal is to create interiors that elevate experiences and stand the test of time.
          </p>

          <div>
            <a href="#cases" className="inline-flex items-center justify-start gap-2.5 text-[#732c14] text-xs sm:text-sm font-semibold tracking-wider hover:opacity-85 transition-opacity group">
              VIEW ALL CASES <MoveRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>

          <div className="flex items-center justify-center sm:justify-end mt-4 lg:mt-8">
            <img src={basin} alt="Basin interior design" className="h-60 sm:h-72 lg:h-80 object-cover rounded-xl shadow-md" />
          </div>

          {/* Decorative Flower Badge / Accent */}
          <div className="hidden sm:block w-40 h-40 lg:w-60 lg:h-60 opacity-80 animate-pulse">
            <img src={floweDesign} alt="Flower Design" className="w-full h-full object-contain" />
          </div>
        </div>

      </div>

      {/* Client Logos Grid / Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 items-center justify-items-center gap-8 sm:gap-12 mt-20 lg:mt-32 pt-12 border-t border-neutral-300/60">
        {data.map((clientLogo, index) => (
          <div key={index} className="w-28 sm:w-32 flex items-center justify-center">
            <img 
              src={clientLogo} 
              alt={`Client logo ${index + 1}`} 
              className="h-10 sm:h-12 w-auto object-contain filter blur-[1px] hover:blur-none transition-all duration-300 opacity-70 hover:opacity-100 cursor-pointer" 
            />
          </div>
        ))}
      </div>

    </section>
  );
};

export default Aboutus;