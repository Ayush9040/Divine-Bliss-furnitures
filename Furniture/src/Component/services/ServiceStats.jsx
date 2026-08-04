import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import bgImage from '../../assets/service_sec3_bg.webp';
import './ServiceStats.css';

const stats = [
  { target: 340, suffix: '+', label: 'UNIQUE HOUSES BUILT' },
  { target: 67, suffix: 'K', label: 'DESIGNED SQUARE METERS' },
  { target: 25, suffix: '', label: 'SKILLED DESIGNERS' },
];

const ServiceStats = () => {
  const sectionRef = useRef(null);
  const numRefs = useRef([]);

  numRefs.current = [];
  const addToRefs = (el) => {
    if (el && !numRefs.current.includes(el)) {
      numRefs.current.push(el);
    }
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Counter animation for numbers
      stats.forEach((stat, idx) => {
        const el = numRefs.current[idx];
        if (!el) return;

        const counter = { value: 0 };

        gsap.to(counter, {
          value: stat.target,
          duration: 2.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            once: true,
          },
          onUpdate: () => {
            el.innerText = `${Math.floor(counter.value)}${stat.suffix}`;
          },
        });
      });

      // Fade-in and slide-up transition
      gsap.from('.service-stat-item', {
        opacity: 0,
        y: 40,
        duration: 1,
        stagger: 0.25,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="service-stats-section"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="service-stats-overlay" />

      {/* Geometric Ellipse Arch Overlay Lines */}
      <svg
        className="service-stats-svg-overlay"
        viewBox="0 0 1440 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <ellipse
          cx="480"
          cy="300"
          rx="450"
          ry="270"
          stroke="white"
          strokeWidth="1.2"
        />
        <ellipse
          cx="960"
          cy="300"
          rx="450"
          ry="270"
          stroke="white"
          strokeWidth="1.2"
        />
      </svg>

      <div className="service-stats-container">
        <div className="service-stats-grid">
          {stats.map((stat, idx) => (
            <div key={idx} className="service-stat-item">
              <span ref={addToRefs} className="service-stat-number">
                0{stat.suffix}
              </span>
              <p className="service-stat-label">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceStats;
