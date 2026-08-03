import React, { useEffect, useRef } from 'react';
import { Circle, MoveRight } from "lucide-react";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Sofa from "../../assets/sofa.webp";
import basin from "../../assets/basin.webp";
import floweDesign from "../../assets/flowerDesign.webp";
import client1 from "../../assets/clients-1.webp";
import client2 from "../../assets/clients-2.webp";
import client3 from "../../assets/clients-3.webp";
import client4 from "../../assets/clients-4.webp";
import client5 from "../../assets/clients-5.webp";
import client6 from "../../assets/clients-6.webp";
import "./Aboutus.css";

gsap.registerPlugin(ScrollTrigger);

const Aboutus = () => {
  const badgeRef = useRef(null);
  const sectionRef = useRef(null);
  const data = [client1, client2, client3, client4, client5, client6];

  useEffect(() => {
    if (badgeRef.current && sectionRef.current) {
      gsap.to(badgeRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "bottom 30%",
          scrub: 1.2, // smooth scrubbing, takes 1.2 seconds to "catch up" to scrollbar
          markers: false, // set to true for debugging
        },
        y: -100, // move up by 100px
        duration: 1,
        ease: "none",
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <>
    <section className="about-section">
      <div className="about-top">
        <span className="about-tagline">
          <Circle size={10} className="about-tagline-icon" /> SMTH LITTLE ABOUT US
        </span>
        <h2 className="about-title">
          Interior Design That Balances Beauty, Comfort, and Purpose in Every Detail
        </h2>
      </div>

      <div className="about-grid">
        <div className="about-left">
          <p className="about-intro">
            We believe great design goes <span className="about-intro-break">beyond aesthetics.</span>
          </p>
          <div className="about-image-card">
            <img src={Sofa} alt="Sofa interior" className="about-image" />
          </div>
        </div>

        <div className="about-right" ref={sectionRef}>
          <p className="about-copy">
            It’s about how a space works, how it feels, and how it supports everyday life. By combining smart planning, high-quality materials, and a deep understanding of light, color, and form, we transform ideas into spaces that are beautiful, practical, and uniquely personal. Our goal is to create interiors that elevate experiences and stand the test of time.
          </p>

          <a href="#cases" className="about-link">
            VIEW ALL CASES <MoveRight className="about-link-icon" />
          </a>

          <div className="about-image-side">
            <img src={basin} alt="Basin interior design" className="about-side-image" />
          </div>

          <div className="about-badge" ref={badgeRef}>
            <img src={floweDesign} alt="Flower Design" className="about-badge-image" />
          </div>
        </div>
      </div>

      

    </section>
    <div className="about-clients">
        {data.map((clientLogo, index) => (
          <div key={index} className="about-client-logo">
            <img
              src={clientLogo}
              alt={`Client logo ${index + 1}`}
              className="about-client-logo-image"
            />
          </div>
        ))}
      </div>
      </>
  );
};

export default Aboutus;