import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Logo from '../assets/Logo.webp'
import {Circle} from 'lucide-react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navLinks = [
    { name: 'HOME', href: '#' },
    { name: 'PAGES', href: '#' },
    { name: 'PORTFOLIO', href: '#' },
    { name: 'BLOG', href: '#' },
    { name: 'SHOP', href: '#' },
    { name: 'CONTACTS', href: '#' },
  ];

  return (
    <header className=" w-full top-0 z-50 bg-white shadow-sm">
      <div className="w-full sm:px-6 lg:px-8 bg-[#f0ede8]  ">
        <div className="w-full flex items-center justify-between h-20 md:py-10 py-5 px-5">
          {/* Logo */}
          <div className=" shrink-0 flex items-center">
            <img src={Logo} alt="Logo" className='h-10 ' />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <a 
                key={link.name}
                href={link.href}
                className="text-black-600 font-medium transition-colors duration-200 text-sm lg:text-base flex items-center justify-center gap-2"
              >
               <Circle size={8}/> {link.name}
              </a>
            ))}
          </nav>

          {/* Desktop CTA Button */}
          <div className="hidden md:flex items-center">
            <a
              href="#contact"
              className="bg-white text-[#732c14] hover:bg-[#732c14] hover:text-white font-medium px-10 py-4 transition-colors duration-200 text-md shadow-sm "
            >
              GET IN TOUCH
            </a>
          </div>

          {/* Mobile/Tablet Menu Button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={toggleMenu}
              type="button"
              className="text-gray-700 hover:text-indigo-600 focus:outline-none p-2 rounded-md transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile/Tablet Dropdown Menu */}
      <div
      className={`md:hidden fixed inset-0 top-16 bg-[#f0ede8] backdrop-blur-sm z-40 transform transition-transform duration-300 ease-in-out  ${
              isOpen ? "translate-y-0" : "translate-y-full"
            }`}
      >
        <div className="px-4 pt-3 pb-6 space-y-3">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50 transition-colors"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-2">
            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="w-full block text-center bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-5 py-3 rounded-lg transition-colors shadow-sm"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;