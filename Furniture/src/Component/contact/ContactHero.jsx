import React from 'react';
import { ShoppingBag, Search, ArrowRight } from 'lucide-react';
import Logo from '../../assets/w-Logo.webp'

const ContactHero = () => {
  return (
    <div 
      className="relative w-full h-[55vh] bg-cover bg-center text-white"
      style={{ backgroundImage: `url('https://wgl-dsites.net/mink/wp-content/uploads/2026/02/pt-contacts.webp')` }}
    >
      {/* Dark Overlay for readability */}
      <div className="absolute inset-0 " />

      {/* Header / Navbar */}
      <header className="relative z-10 flex items-center justify-between px-8 py-6 border-b border-white/20">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <img src={Logo} alt="Logo" className='h-10 ' />
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
          <a href="#home" className="hover:text-gray-300 transition-colors">HOME</a>
          <a href="#pages" className="hover:text-gray-300 transition-colors">PAGES</a>
          <a href="#portfolio" className="hover:text-gray-300 transition-colors">PORTFOLIO</a>
          <a href="#blog" className="hover:text-gray-300 transition-colors">BLOG</a>
          <a href="#shop" className="hover:text-gray-300 transition-colors">SHOP</a>
          <a href="#contacts" className="text-white font-semibold flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-white inline-block"></span>
            CONTACTS
          </a>
        </nav>

        {/* Icons & CTA Button */}
        <div className="flex items-center space-x-6">
          <button aria-label="Cart" className="hover:text-gray-300 transition-colors">
            <ShoppingBag className="w-5 h-5" />
          </button>
          <button aria-label="Search" className="hover:text-gray-300 transition-colors">
            <Search className="w-5 h-5" />
          </button>
          
          {/* Get in Touch Button with Transparent Hover Effect */}
          <button className="px-6 py-3 bg-white text-black font-semibold text-sm tracking-wider border border-white transition-all duration-300 hover:bg-transparent hover:text-white">
            GET IN TOUCH
          </button>
        </div>
      </header>

      <main className="relative px-7 z-10 max-w-8xl pt-20 mt-10 mx-auto flex items-center justify-between ">
        <div>
          <h1 className="text-6xl md:text-6xl tracking-wide uppercase mb-4">
            Contacts
          </h1>
        </div>

        <div className="flex items-center text-sm font-medium tracking-widest text-gray-200">
          <a href="#home" className="hover:text-white transition-colors hover:underline underline-offset-4">HOME</a>
          <ArrowRight className="w-4 h-4 mx-3 text-gray-400" />
          <span className="text-white underline underline-offset-4 ">CONTACTS</span>
        </div>

      </main>
    </div>
  );
};

export default ContactHero;
