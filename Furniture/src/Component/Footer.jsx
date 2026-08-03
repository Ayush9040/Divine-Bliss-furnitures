import React from 'react';
import { ArrowRight, ArrowUp } from 'lucide-react';
import sofa from '../assets/sofaimage.webp';
import Logo from '../assets/Logo.webp';

export default function Footer() {
  return (
    <footer 
      className="relative w-full bg-amber-600 bg-cover bg-center flex items-center justify-center p-4 sm:p-8 lg:p-16" 
      style={{ backgroundImage: `url(${sofa})` }}
    >
      {/* Frosted Glass Overlay - Fully responsive padding and margins */}
      <div className="relative w-full max-w-7xl mx-auto my-4 sm:my-8 bg-neutral-500/70 backdrop-blur-md border border-white/10 rounded-2xl p-6 sm:p-10 lg:p-16 text-white flex flex-col justify-between shadow-2xl">
        
        {/* Main Content Grid - Stacks on mobile/tablet, 3 columns on large screens */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-16 xl:gap-24 mb-10 sm:mb-16">
          
          {/* Column 1: Logo & Description */}
          <div className="flex flex-col justify-between space-y-6 lg:space-y-8">
            <div className="flex items-center space-x-3">
              <img src={Logo} alt="Logo" className="h-8 sm:h-10 w-auto object-contain" />
            </div>
            
            <p className="text-neutral-300 text-sm sm:text-base max-w-sm leading-relaxed">
              We believe great design goes beyond aesthetics. It’s about how a space works, how it feels, and how it supports everyday life.
            </p>
          </div>

          {/* Column 2: Contact Info - Responsive borders and padding */}
          <div className="flex flex-col justify-between space-y-6 lg:space-y-8 lg:border-l lg:border-white/15 lg:pl-8 xl:pl-12">
            <div className="space-y-3 sm:space-y-4 text-sm text-neutral-300">
              <p className="leading-relaxed">
                27 Division St, New York,<br />
                NY 10002, USA
              </p>
              <p>+1 800 123 456 789</p>
              <p className="break-all">minkstudio@mail.com</p>
            </div>
            
            <div className="text-xs text-neutral-400">
              © 2026 Mink byWebGeniusLab
            </div>
          </div>

          {/* Column 3: Social Links & Newsletter - Responsive borders and layout */}
          <div className="flex flex-col justify-between space-y-6 lg:space-y-8 lg:border-l lg:border-white/15 lg:pl-8 xl:pl-12 md:col-span-2 lg:col-span-1">
            <div className="flex flex-col space-y-3 text-sm text-neutral-300">
              <a href="#instagram" className="hover:text-white transition-colors w-fit">Instagram</a>
              <a href="#behance" className="hover:text-white transition-colors w-fit">Behance</a>
              <a href="#facebook" className="hover:text-white transition-colors w-fit">Facebook</a>
              <a href="#pinterest" className="hover:text-white transition-colors w-fit">Pinterest</a>
            </div>

            <div className="flex items-center justify-between border-b border-white/20 pb-3 group cursor-pointer">
              <span className="text-sm tracking-wide text-neutral-200 group-hover:text-white transition-colors">
                Join Our Newsletter
              </span>
              <ArrowRight className="w-4 h-4 text-neutral-300 group-hover:translate-x-1 transition-transform shrink-0 ml-2" />
            </div>
          </div>

        </div>

      </div>

      {/* Floating Side Button (Red Tab) - Positioned safely for mobile screens */}
      <div className="absolute right-0 bottom-24 sm:bottom-32 bg-rose-500 p-2.5 sm:p-3 text-white rounded-l-md shadow-lg cursor-pointer hover:bg-rose-600 transition-colors z-10 hidden sm:block">
        <div className="w-4 h-4 sm:w-5 sm:h-5 border border-white/80 rounded-sm flex items-center justify-center text-[10px] sm:text-xs font-bold">
          [ ]
        </div>
      </div>

      {/* Scroll to Top Button - Responsive placement */}
      <div 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="absolute right-4 sm:right-8 bottom-4 sm:bottom-8 bg-white text-neutral-900 p-2.5 sm:p-3 rounded-md shadow-lg cursor-pointer hover:bg-neutral-100 transition-colors z-10"
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-4 h-4" />
      </div>

    </footer>
  );
}