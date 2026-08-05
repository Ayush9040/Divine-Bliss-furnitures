import React, { useState } from "react";
import { ShoppingBag, Search, ArrowRight, Circle, Menu, X } from "lucide-react";
import Logo from "../../assets/w-Logo.webp";
import "./AboutHero.css"; 

const AboutHeroSection = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const AboutList = [
    "About us",
    "service",
    "our team",
    "single team",
    "History",
  ];

  return (
    <div 
      className="contact-hero-container"
      style={{
        backgroundImage: `url('https://wgl-dsites.net/mink/wp-content/uploads/2026/02/pt-contacts.webp')`,
      }}
    >
      {/* Dark Overlay */}
      <div className="hero-overlay" />

      {/* Header / Navbar */}
      <header className="hero-header">
        {/* Logo */}
        <div className="hero-logo-container">
          <img src={Logo} alt="Logo" className="hero-logo" />
        </div>

        {/* Navigation Links (Desktop) */}
        <nav className="desktop-nav">
          <a href="#home" className="nav-link">
            <Circle size={9} />
            HOME
          </a>

          <div className="dropdown-container">
            <a href="#pages" className="nav-link">
              <Circle size={9} />
              PAGES
            </a>
            <div className="dropdown-menu">
              <ul className="dropdown-list">
                {AboutList.map((name, index) => (
                  <li key={index}>
                    <a href="#profile" className="dropdown-item">{name}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="dropdown-container">
            <a href="#portfolio" className="nav-link">
              <Circle size={9} />
              PORTFOLIO
            </a>
            <div className="dropdown-menu">
              <ul className="dropdown-list">
                {AboutList.map((name, index) => (
                  <li key={index}>
                    <a href="#profile" className="dropdown-item">{name}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="dropdown-container">
            <a href="#blog" className="nav-link">
              <Circle size={9} />
              BLOG
            </a>
            <div className="dropdown-menu">
              <ul className="dropdown-list">
                {AboutList.map((name, index) => (
                  <li key={index}>
                    <a href="#profile" className="dropdown-item">{name}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <a href="#shop" className="nav-link">
            <span className="dot-indicator"></span>
            SHOP
          </a>

          <a href="#contacts" className="nav-link active-contact">
            <Circle size={9} fill="white" /> CONTACTS
          </a>
        </nav>

        {/* Icons & CTA Button (Desktop) */}
        <div className="desktop-actions">
          <button aria-label="Cart" className="icon-btn">
            <ShoppingBag />
          </button>
          <button aria-label="Search" className="icon-btn">
            <Search className="search-icon" />
          </button>
          <button className="get-in-touch-btn">
            GET IN TOUCH
          </button>
        </div>

        {/* Hamburger Menu Toggle (Mobile/Tablet) */}
        <div className="mobile-toggle-container">
          <button
            onClick={toggleMenu}
            type="button"
            className="menu-toggle-btn"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={28} color="white" /> : <Menu size={28} color="white" />}
          </button>
        </div>

        {/* Mobile/Tablet Dropdown Menu */}
        <div className={`mobile-dropdown ${isOpen ? "open" : ""}`}>
          <div className="mobile-dropdown-content">
            <div className="mobile-nav-item-wrapper">
              <a href="#home" onClick={() => setIsOpen(false)} className="mobile-nav-link">
                <span className="mobile-flex-gap">
                  <Circle size={8} fill="currentColor" />
                  Home
                </span>
              </a>
              <div className="mobile-quick-options">
                <p className="quick-options-title">Quick Options</p>
              </div>
            </div>
            <div className="mobile-cta-wrapper">
              <a
                href="#contact"
                onClick={() => setIsOpen(false)}
                className="mobile-cta-btn"
              >
                GET IN TOUCH
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Main Hero Content */}
      <main className="hero-main">
        <div>
          <h1 className="hero-title">
            Aboutus
          </h1>
        </div>

        <div className="breadcrumb-container">
          <a href="#home" className="breadcrumb-link">
            HOME
          </a>
          <ArrowRight className="breadcrumb-arrow" />
          <span className="breadcrumb-current">
            About us
          </span>
        </div>
      </main>
    </div>
  );
};

export default AboutHeroSection;