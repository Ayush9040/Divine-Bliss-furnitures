// import React, { useState } from 'react';
// import { Menu, X } from 'lucide-react';
// import Logo from '../assets/Logo.webp'
// import {Circle} from 'lucide-react'

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleMenu = () => {
//     setIsOpen(!isOpen);
//   };

//   const navLinks = [
//     { name: 'HOME', href: '#' },
//     { name: 'PAGES', href: '#' },
//     { name: 'PORTFOLIO', href: '#' },
//     { name: 'BLOG', href: '#' },
//     { name: 'SHOP', href: '#' },
//     { name: 'CONTACTS', href: '#' },
//   ];

//   return (
//     <header className=" w-full top-0 z-50 bg-white shadow-sm">
//       <div className="w-full sm:px-6 lg:px-8 bg-[#f0ede8]  ">
//         <div className="w-full flex items-center justify-between h-20 md:py-10 py-5 px-5">
//           {/* Logo */}
//           <div className=" shrink-0 flex items-center">
//             <img src={Logo} alt="Logo" className='h-10 ' />
//           </div>

//           {/* Desktop Navigation Links */}
//           <nav className="hidden md:flex items-center space-x-10">
//             {navLinks.map((link) => (
//               <a 
//                 key={link.name}
//                 href={link.href}
//                 className="text-black-600 font-medium transition-colors duration-200 text-sm lg:text-base flex items-center justify-center gap-2"
//               >
//                <Circle size={8}/> {link.name}
//               </a>
//             ))}
//           </nav>

//           {/* Desktop CTA Button */}
//           <div className="hidden md:flex items-center">
//             <a
//               href="#contact"
//               className="bg-white text-[#732c14] hover:bg-[#732c14] hover:text-white font-medium px-10 py-4 transition-colors duration-200 text-md shadow-sm "
//             >
//               GET IN TOUCH
//             </a>
//           </div>

//           {/* Mobile/Tablet Menu Button */}
//           <div className="flex md:hidden items-center">
//             <button
//               onClick={toggleMenu}
//               type="button"
//               className="text-gray-700 hover:text-indigo-600 focus:outline-none p-2 rounded-md transition-colors"
//               aria-label="Toggle menu"
//             >
//               {isOpen ? <X size={28} /> : <Menu size={28} />}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile/Tablet Dropdown Menu */}
//       <div
//       className={`md:hidden fixed inset-0 top-16 bg-[#f0ede8] backdrop-blur-sm z-40 transform transition-transform duration-300 ease-in-out  ${
//               isOpen ? "translate-y-0" : "translate-y-full"
//             }`}
//       >
//         <div className="px-4 pt-3 pb-6 space-y-3">
//           {navLinks.map((link) => (
//             <a
//               key={link.name}
//               href={link.href}
//               onClick={() => setIsOpen(false)}
//               className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50 transition-colors"
//             >
//               {link.name}
//             </a>
//           ))}
//           <div className="pt-2">
//             <a
//               href="#contact"
//               onClick={() => setIsOpen(false)}
//               className="w-full block text-center bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-5 py-3 rounded-lg transition-colors shadow-sm"
//             >
//               Get in Touch
//             </a>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Navbar;




import React, { useState } from 'react';
import { Menu, X, Circle, ArrowRight } from 'lucide-react';
import Logo from '../assets/Logo.webp';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navLinks = [
    { 
      name: 'HOME', 
      href: '#',
      hasDropdown: true,
      // Sample content for the popup mega menu
      dropdownContent: {
        title: "Discover Our Spaces",
        subtitle: "Explore modern architectural concepts and tailored design solutions crafted for everyday living.",
        links: ["Main Showcase", "Modern Minimalist", "Urban Loft", "Classic Interior"]
      }
    },
    { name: 'PAGES', href: '#', hasDropdown: false },
    { name: 'PORTFOLIO', href: '#', hasDropdown: false },
    { name: 'BLOG', href: '#', hasDropdown: false },
    { name: 'SHOP', href: '#', hasDropdown: false },
    { name: 'CONTACTS', href: '#', hasDropdown: false },
  ];

  return (
    <header className="w-full sticky top-0 z-50 bg-white shadow-sm">
      <div className="w-full sm:px-6 lg:px-8 bg-[#f0ede8]">
        <div className="w-full flex items-center justify-between h-20 md:py-10 py-5 px-5 relative">
          
          {/* Logo */}
          <div className="shrink-0 flex items-center">
            <img src={Logo} alt="Logo" className="h-10 w-auto object-contain" />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8 lg:space-x-10">
            {navLinks.map((link) => (
              <div 
                key={link.name}
                className="relative py-4"
                onMouseEnter={() => link.hasDropdown && setActiveDropdown(link.name)}
                onMouseLeave={() => link.hasDropdown && setActiveDropdown(null)}
              >
                <a 
                  href={link.href}
                  className="text-neutral-900 font-medium transition-colors duration-200 text-sm lg:text-base flex items-center justify-center gap-2 hover:text-[#732c14] "
                >
                  <Circle size={8} className='hover:fill-black' /> {link.name}
                </a>

                {/* Centered Large Popup Menu (40-45vh height, 60-65% width with equal side gaps) */}
                {link.hasDropdown && activeDropdown === link.name && (
                  <div className="fixed left-[5.5%] right-[5.5%] top-32 h-[65vh] bg-white shadow-2xl border border-neutral-200 p-8 z-50 flex flex-col justify-between animate-in fade-in slide-in-from-top-2 duration-300">
                    

                    
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Desktop CTA Button */}
          <div className="hidden md:flex items-center">
            <a
              href="#contact"
              className="bg-white text-[#732c14] hover:bg-[#732c14] hover:text-white font-medium px-8 lg:px-10 py-3.5 lg:py-4 transition-colors duration-200 text-sm lg:text-md shadow-sm border border-[#732c14]/20"
            >
              GET IN TOUCH
            </a>
          </div>

          {/* Mobile/Tablet Menu Button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={toggleMenu}
              type="button"
              className="text-neutral-800 hover:text-[#732c14] focus:outline-none p-2 rounded-md transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile/Tablet Dropdown Menu */}
      <div
        className={`md:hidden fixed inset-0 top-20 bg-[#f0ede8] backdrop-blur-sm z-40 transform transition-transform duration-300 ease-in-out overflow-y-auto ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="px-6 pt-4 pb-8 space-y-4">
          {navLinks.map((link) => (
            <div key={link.name} className="border-b border-neutral-300/60 pb-3">
              <a
                href={link.href}
                onClick={() => !link.hasDropdown && setIsOpen(false)}
                className="flex items-center justify-between py-2 text-lg font-medium text-neutral-800 hover:text-[#732c14] transition-colors"
              >
                <span className="flex items-center gap-3">
                  <Circle size={8} className="fill-current text-neutral-800" /> 
                  {link.name}
                </span>
              </a>
              
              {/* Mobile sub-items if it has a dropdown */}
              {link.hasDropdown && (
                <div className="pl-5 py-2 space-y-2 bg-neutral-200/40 rounded-lg mt-2">
                  <p className="text-xs text-neutral-500 font-semibold uppercase tracking-wider mb-2">Quick Options</p>
                  {link.dropdownContent.links.map((subItem, sIdx) => (
                    <a
                      key={sIdx}
                      href="#"
                      onClick={() => setIsOpen(false)}
                      className="block py-1.5 text-sm text-neutral-700 hover:text-[#732c14]"
                    >
                      {subItem}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
          
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
  );
};

export default Navbar;
