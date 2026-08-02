import { ShoppingBag, Search, ArrowRight, Circle } from "lucide-react";
import Logo from "../../assets/w-Logo.webp";
import BagLogo from "../../assets/svg_13.svg";
import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import Home1 from "../../assets/Home1.webp"
import Home2 from "../../assets/Home2.webp"
import Home3 from "../../assets/Home3.webp"
import Home4 from "../../assets/Home4.webp"

const ContactHero = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const AboutList = [
    "About us",
    "service",
    "our team ",
    "single team",
    " History",
  ];
  return (
    <div
      className="relative w-full h-[10%] md:h-[55vh]  bg-cover bg-center text-white"
      style={{
        backgroundImage: `url('https://wgl-dsites.net/mink/wp-content/uploads/2026/02/pt-contacts.webp')`,
      }}
    >
      {/* Dark Overlay for readability */}
      <div className="absolute inset-0 " />

      {/* Header / Navbar */}
      <header className="relative z-10 flex items-center justify-between px-8 py-6 border-b border-white/20">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <img src={Logo} alt="Logo" className="h-10 " />
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
          
            <a
              href="#home"
              className=" flex justify-center items-center gap-2.5 text-md font-bold"
            >
              <Circle size={9} />
              HOME
            </a>

          <div className=" relative inline-block group">
            <a
              href="#pages"
              className=" flex justify-center items-center gap-2.5 text-md font-bold"
            >
              <Circle size={9} />
              PAGES
            </a>
            <div className="absolute left-0 mt-10 w-48 bg-[#efece6] border border-gray-200 shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-1 group-hover:translate-y-0 z-50">
              <ul className="py-2 text-sm text-gray-700">
                {AboutList.map((name) => (
                  <li>
                    <a
                      href="#profile"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      {name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className=" relative inline-block group">
            <a
              href="#portfolio"
              className="flex justify-center items-center gap-2.5 text-md font-bold"
            >
              <Circle size={9} />
              PORTFOLIO
            </a>

            <div className="absolute left-0 mt-10 w-48 bg-[#efece6] border border-gray-200 shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-1 group-hover:translate-y-0 z-50">
              <ul className="py-2 text-sm text-gray-700">
                {AboutList.map((name) => (
                  <li>
                    <a
                      href="#profile"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      {name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className=" relative inline-block group">
            <a
              href="#blog"
              className=" hover:fill-white flex justify-center items-center gap-2.5 text-md font-bold"
            >
              <Circle size={9} />
              BLOG
            </a>
            <div className="absolute left-0 mt-10 w-48 bg-[#efece6] border border-gray-200 shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-1 group-hover:translate-y-0 z-50">
              <ul className="py-2 text-sm text-gray-700">
                {AboutList.map((name) => (
                  <li>
                    <a
                      href="#profile"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      {name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          
            <a
              href="#shop"
              className=" hover:fill-white flex justify-center items-center gap-2.5  text-md font-bold"
            >
              <span className="h-2 w-2 border rounded-full"></span>
              SHOP
            </a>

            <a
              href="#contacts"
              className="text-white font-bold text-md flex justify-center items-center gap-2.5"
            >
              <Circle size={9} fill="white" /> CONTACTS
            </a>
 
        </nav>

        {/* Icons & CTA Button */}
        <div className="md:flex hidden items-center space-x-6">
          <button
            aria-label="Cart"
            className="hover:text-gray-300 transition-colors"
          >
            <ShoppingBag />
          </button>
          <button
            aria-label="Search"
            className="hover:text-gray-300 transition-colors"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Get in Touch Button with Transparent Hover Effect */}
          <button className="px-6 py-3 bg-white text-black font-semibold text-sm tracking-wider border border-white transition-all duration-300 hover:bg-transparent hover:text-white">
            GET IN TOUCH
          </button>
        </div>

        <div className="flex md:hidden  items-center">
          <button
            onClick={toggleMenu}
            type="button"
            className="text-neutral-800 hover:text-[#732c14] focus:outline-none p-2 rounded-md transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X size={28} color="white" />
            ) : (
              <Menu size={28} color="white" />
            )}
          </button>
        </div>

        {/* Mobile/Tablet Dropdown Menu */}
        <div
          className={`md:hidden fixed inset-0 top-20 bg-[#f0ede8] backdrop-blur-sm z-40 transform transition-transform duration-300 ease-in-out overflow-y-auto ${
            isOpen ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <div className="px-6 pt-4 pb-8 space-y-4">
            <div className="border-b border-neutral-300/60 pb-3">
              <a className="flex items-center justify-between py-2 text-lg font-medium text-neutral-800 hover:text-[#732c14] transition-colors">
                <span className="flex items-center gap-3">
                  <Circle size={8} className="fill-current text-neutral-800" />
                  Home
                </span>
              </a>

              {/* Mobile sub-items if it has a dropdown */}

              <div className="pl-5 py-2 space-y-2 bg-neutral-200/40 rounded-lg mt-2">
                <p className="text-xs text-neutral-500 font-semibold uppercase tracking-wider mb-2">
                  Quick Options
                </p>
              </div>
            </div>

            <div className="pt-4">
              <a
                href="#contact"
                onClick={() => setIsOpen(false)}
                className="w-full block text-center bg-[#732c14] hover:bg-[#5a2210] text-white font-medium px-5 py-3.5 rounded-lg transition-colors shadow-sm"
              >
                GET IN TOUCH
              </a>
            </div>
          </div>
        </div>
      </header>

      <main className="relative px-7 z-10 max-w-8xl p-5 md:pt-20 md:mt-10 mx-auto flex items-center md:justify-between justify-center flex-col md:flex-row">
        <div>
          <h1 className="text-4xl md:text-6xl tracking-wide uppercase mb-4">
            Contacts
          </h1>
        </div>

        <div className="flex items-center text-sm font-medium tracking-widest text-gray-200">
          <a
            href="#home"
            className="hover:text-white transition-colors hover:underline underline-offset-4"
          >
            HOME
          </a>
          <ArrowRight className="w-4 h-4 mx-3 text-gray-400" />
          <span className="text-white underline underline-offset-4 ">
            CONTACTS
          </span>
        </div>
      </main>
    </div>
  );
};

export default ContactHero;
