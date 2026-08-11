import React from "react";
import { Circle, MoveRight } from "lucide-react";
import Sofa from "../../assets/sofa.webp";
import AboutContent from "../../assets/AboutContent.webp";
import "./AboutContent.css";
const Aboutus = () => {

 

  return (
    <section className="about-section">
      {/* Top Header Section */}
      <div className="about-header-wrapper">
        <span className="about-subtitle">
          <Circle size={10} /> SMTH LITTLE ABOUT US
        </span>
        <h2 className="about-title">
          Interior Design That Balances <br /> Beauty, Comfort, and Purpose in{" "}
          <br /> Every Detail
        </h2>
      </div>

      {/* Main Content Grid */}
      <div className="about-main-grid">
        {/* Left Column */}
        <div className="about-left-col">
          <p className="about-tagline">
            We believe great design goes <br className="desktop-break" /> beyond
            aesthetics.
          </p>
          <div className="about-image-wrapper">
            <img src={Sofa} alt="Sofa interior" className="about-img" />
          </div>
        </div>

        {/* Right Column */}
        <div className="about-right-col">
          <p className="about-description">
            It’s about how a space works, how it feels, and how it supports
            everyday life. By combining smart planning, high-quality materials,
            and a deep understanding of light, color, and form, we transform
            ideas into spaces that are beautiful, practical, and uniquely
            personal. Our goal is to create interiors that elevate experiences
            and stand the test of time.
          </p>

          <div>
            <a href="#cases" className="about-link group">
              VIEW ALL CASES <MoveRight className="about-link-icon" />
            </a>
          </div>

          <div className="about-basin-wrapper">
            <img
              src={AboutContent}
              alt="Basin interior design"
              className="about-basin-img"
            />
          </div>
        </div>

      </div>
        

        {/* animation text */}
    </section>
  );
};

export default Aboutus;
