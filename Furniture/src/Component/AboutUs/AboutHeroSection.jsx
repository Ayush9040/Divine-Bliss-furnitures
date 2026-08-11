import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import "./AboutHero.css";

const AboutHeroSection = () => {
  const container = useRef();

  // Fade + slide-up reveal on load — matches the entrance style used
  // across the rest of the page (power3.out).
  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".hero-title", {
        y: 40,
        opacity: 0,
        duration: 1,
      }).from(
        ".breadcrumb-container",
        {
          y: 20,
          opacity: 0,
          duration: 0.8,
        },
        "-=0.6" // slight overlap with the title animation
      );
    },
    { scope: container }
  );

  return (
    <div
      ref={container}
      className="about-hero-container"
      style={{
        backgroundImage: `url('https://wgl-dsites.net/mink/wp-content/uploads/2026/02/pt-about.webp')`,
      }}
    >
      {/* Dark overlay for text legibility */}
      <div className="hero-overlay" />

      {/* Main Hero Content */}
      <main className="hero-main">
        <div>
          <h1 className="hero-title">About Us</h1>
        </div>

        <div className="breadcrumb-container">
          <a href="#home" className="breadcrumb-link">
            HOME
          </a>
          <ArrowRight className="breadcrumb-arrow" />
          <span className="breadcrumb-current">ABOUT US</span>
        </div>
      </main>
    </div>
  );
};

export default AboutHeroSection;
