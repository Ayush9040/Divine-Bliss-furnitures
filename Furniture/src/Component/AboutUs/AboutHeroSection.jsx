import React, { useState } from "react";
import { ShoppingBag, Search, ArrowRight, Circle, Menu, X } from "lucide-react";
import Logo from "../../assets/w-Logo.webp";
import "./AboutHero.css"; 

const AboutHeroSection = () => {

  return (
    <div 
      className="contact-hero-container"
      style={{
        backgroundImage: `url('https://wgl-dsites.net/mink/wp-content/uploads/2026/02/pt-contacts.webp')`,
      }}
    >
      <div className="hero-content">
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

    </div>
  );
};

export default AboutHeroSection;