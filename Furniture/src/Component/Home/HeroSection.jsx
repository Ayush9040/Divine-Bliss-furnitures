import React, { useRef, useEffect, useState } from "react";
import { ArrowRight, X } from "lucide-react";
import gsap from "gsap";
import SofaImage from "../../assets/sofaImage.webp";
import buildingImage from "../../assets/building.webp";
import "./HeroSection.css";

const HeroSection = () => {
  const containerRef = useRef(null);
  const buildingRef = useRef(null);
  const bottomBarRef = useRef(null);
  const imageDivRef = useRef(null);

  // References for text containers
  const titleLine1Ref = useRef(null);
  const titleLine2Ref = useRef(null);

  // State for sliding drawer
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const drawerRef = useRef(null);

  // Helper function to split text into masked letter spans for GSAP
  const renderLetterSpans = (text) => {
    return text.split("").map((char, index) => (
      <span key={index} className="letter-mask">
        <span className="letter-char">{char === " " ? "\u00A0" : char}</span>
      </span>
    ));
  };

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Grab all generated letter element nodes
    const lettersLine1 = titleLine1Ref.current?.querySelectorAll(".letter-char");
    const lettersLine2 = titleLine2Ref.current?.querySelectorAll(".letter-char");

    // 1. Letter-by-letter bottom-to-top reveal animation
    if (lettersLine1 && lettersLine2) {
      tl.fromTo(
        [...lettersLine1, ...lettersLine2],
        { y: "120%", opacity: 0 },
        {
          y: "0%",
          opacity: 1,
          duration: 0.7,
          stagger: 0.2,
          ease: "power3.out",
        },
        0.2
      );
    }

    // 2. Fade in and slide up bottom content bar & hero showcase image
    tl.fromTo(
      [bottomBarRef.current, imageDivRef.current],
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.2 },
      "-=0.4"
    );

    // 3. Smooth cursor tracking movement on background building sketch
    const handleMouseMove = (e) => {
      if (!containerRef.current || !buildingRef.current) return;

      const { left, top, width, height } = containerRef.current.getBoundingClientRect();
      const x = e.clientX - left - width / 2;
      const y = e.clientY - top - height / 2;

      gsap.to(buildingRef.current, {
        x: x * 0.03,
        y: y * 0.03,
        duration: 0.8,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    const currentContainer = containerRef.current;
    if (currentContainer) {
      currentContainer.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      if (currentContainer) {
        currentContainer.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, []);

  // Drawer Open / Close Animation
  useEffect(() => {
    if (isDrawerOpen) {
      gsap.to(drawerRef.current, { x: "0%", duration: 0.5, ease: "power3.out" });
    } else {
      gsap.to(drawerRef.current, { x: "100%", duration: 0.4, ease: "power3.in" });
    }
  }, [isDrawerOpen]);

  return (
    <div ref={containerRef} className="hero-container">
      
      <div className="home-hero">
        {/* Drawer Overlay Backdrop */}
      <div 
        className={`drawer-backdrop ${isDrawerOpen ? "open" : ""}`} 
        onClick={() => setIsDrawerOpen(false)} 
      />

      {/* Sliding Right Side Drawer Panel */}
      <div ref={drawerRef} className="drawer-panel">
        <div>
          <div className="drawer-header">
            <h2>About Our Studio</h2>
            <button className="drawer-close-btn" onClick={() => setIsDrawerOpen(false)}>
              <X size={22} />
            </button>
          </div>

          <div className="drawer-content">
            <p>
              We craft bespoke architectural and interior experiences tailored around your distinct personality and everyday lifestyle.
            </p>
            <p>
              Our philosophy bridges the gap between raw functional utility and timeless aesthetic beauty.
            </p>
            <div className="drawer-card">
              <h3>Core Expertise</h3>
              <ul>
                <li>Residential Interior Architecture</li>
                <li>Custom Spatial Planning & Layouts</li>
                <li>High-End Material Curation</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="drawer-footer">
          <span>Mink Studio Experience</span>
          <span>© 2026</span>
        </div>
      </div>

      {/* Interactive Main Hero Section */}
      <section className="hero-section">
        
        {/* Background Building Image following cursor movement */}
        <div className="building-bg-wrapper">
          <div 
            ref={buildingRef} 
            className="building-bg"
            style={{ backgroundImage: `url(${buildingImage})` }} 
          />
        </div>

        {/* Text Header with Letter-by-Letter Mask Animation */}
        <div className="hero-title-container">
          <h1 className="hero-title">
            <span ref={titleLine1Ref} className="line-block">
              {renderLetterSpans("Crafted for ")}
            </span>
            <span ref={titleLine2Ref} className="line-block">
              {renderLetterSpans("Beautiful Living")}
            </span>
          </h1>
        </div>

        {/* Bottom Content Bar */}
        <div ref={bottomBarRef} className="bottom-bar-wrapper">
          <div className="bottom-bar">
            <div className="bar-text-main">
              <div>Interior Design That Defines</div>
              <div> Modern Luxury</div>
            </div>

            <div className="bar-address">
              <div>27 Division St, New York,</div> 
              <div>NY 10002, USA</div>
            </div>

            <div>
              <a href="#about" className="about-link">
                More About Us <ArrowRight size={16} />
              </a>
            </div>
          </div>

          {/* Diagonal Arrow Action Button */}
          {/* <div className="drawer-trigger-wrapper">
            <button 
              className="drawer-trigger-btn"
              onClick={() => setIsDrawerOpen(true)}
              aria-label="Open sidebar drawer"
            >
              <ArrowRight size={18} />
            </button>
          </div> */}
        </div>
      </section>
      </div>

      {/* Showcase Sofa Image */}
      <div ref={imageDivRef} className="image-showcase">
        <img src={SofaImage} alt="Luxury interior showcase" />
      </div>
    </div>
  );
};

export default HeroSection;