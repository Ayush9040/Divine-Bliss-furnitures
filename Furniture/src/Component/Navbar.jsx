import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Logo from '../assets/Logo.webp';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const navLinks = [
    { name: 'HOME', href: '#' },
    { 
      name: 'PAGES', 
      href: '#',
      hasDropdown: true,
      dropdownItems: [
        'About Us', 'Services', 'Our Team', 'Single Team', 
        'Philosophy', 'History', "FAQ's", 'Typography', 
        'Elements', 'Mega Menu Page', 'Coming Soon', 'Page 404'
      ]
    },
    { name: 'PORTFOLIO', href: '#' },
    { name: 'BLOG', href: '#' },
    { name: 'SHOP', href: '#' },
    { name: 'CONTACTS', href: '#' },
  ];

  return (
    <header className="navbar-header">
      <div className="navbar-container">
        <div className="navbar-wrapper">
          
          {/* Logo */}
          <div className="navbar-logo">
            <img src={Logo} alt="Mink Studio Logo" />
          </div>

          {/* Desktop Links */}
          <nav>
            <ul className="navbar-menu">
              {navLinks.map((link) => (
                <li 
                  key={link.name} 
                  className="nav-item"
                  onMouseEnter={() => link.hasDropdown && setActiveDropdown(link.name)}
                  onMouseLeave={() => link.hasDropdown && setActiveDropdown(null)}
                >
                  <a href={link.href} className="nav-link">
                    <span className="circle-icon" />
                    {link.name}
                  </a>

                  {/* Dropdown Menu */}
                  {link.hasDropdown && activeDropdown === link.name && (
                    <div className="dropdown-menu">
                      {link.dropdownItems.map((item, idx) => (
                        <a key={idx} href="#" className="dropdown-item">
                          {item}
                        </a>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Desktop CTA */}
          <div className="navbar-cta">
            <a href="#contact" className="cta-button">
              GET IN TOUCH
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="mobile-toggle" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <div className={`mobile-menu ${isOpen ? 'open' : ''}`}>
        {navLinks.map((link) => (
          <a key={link.name} href={link.href} className="nav-link" onClick={() => setIsOpen(false)}>
            <span className="circle-icon" />
            {link.name}
          </a>
        ))}
        <a href="#contact" className="cta-button" style={{ textAlign: 'center', marginTop: '1rem' }}>
          GET IN TOUCH
        </a>
      </div>
    </header>
  );
};

export default Navbar;