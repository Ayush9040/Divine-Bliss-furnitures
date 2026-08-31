import React, { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './DesignService.css';

const services = [
  {
    id: '01',
    title: 'Residential Interior Design',
    description: 'We create comfortable, stylish homes that reflect your personality and lifestyle. From concept to completion, every detail is thoughtfully designed to feel personal and functional.',
    bgColor: '#732c14',
    textColor: '#ffffff',
    numberColor: 'rgba(255, 255, 255, 0.85)',
  },
  {
    id: '02',
    title: 'Space Planning & Layout',
    description: 'Smart planning is the foundation of great design. We optimize layouts to maximize space, improve functionality, and create seamless movement throughout the interior.',
    bgColor: '#e2dad0',
    textColor: '#1c1c1c',
    numberColor: '#732c14',
  },
  {
    id: '03',
    title: 'Furniture & Material Selection',
    description: 'We curate high-end furniture, textures, and finishes that harmonize with your architectural vision, ensuring enduring elegance and absolute comfort.',
    bgColor: '#ffffff',
    textColor: '#1c1c1c',
    numberColor: '#732c14',
  },
];

export default function DesignServicesSection() {
  const sectionRef = useRef(null);
  const rightColRef = useRef(null);
  const cardsRef = useRef([]);

  cardsRef.current = [];
  const addCardRef = (el) => {
    if (el && !cardsRef.current.includes(el)) cardsRef.current.push(el);
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const cards = cardsRef.current;
    if (!sectionRef.current || !rightColRef.current || cards.length < 2) return;

    const mm = gsap.matchMedia();
    mm.add('(min-width: 768px)', () => {
      const sectionHeight = sectionRef.current.offsetHeight;
      const headerHeight = 65;
      const hiddenCards = cards.slice(1);
      gsap.set(hiddenCards, { y: sectionHeight });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${hiddenCards.length * 700}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      hiddenCards.forEach((card, i) => {
        tl.to(card, { y: (i + 1) * headerHeight, ease: 'none', duration: 1 }, i === 0 ? 0 : '>+0.15');
      });

      return () => tl.scrollTrigger?.kill();
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} className="design-services-section">
      <div className="design-services-container">
        <div className="design-services-left">
          <div className="badge-row">
            <span className="badge-dot" />
            <span className="badge-label">Design Solutions</span>
          </div>
          <h2 className="services-title">Design Services<br /> Tailored To Your<br /> Space</h2>
          <a href="#all-services" className="services-cta">
            <span>View All Services</span>
            <ArrowRight size={18} />
          </a>
        </div>

        <div ref={rightColRef} className="design-services-right">
          <div className="cards-wrap">
            {services.map((service, idx) => (
              <article
                key={service.id}
                ref={addCardRef}
                className="service-card"
                style={{ backgroundColor: service.bgColor, color: service.textColor, zIndex: 10 + idx * 10 }}
              >
                <svg className="service-card-blueprint" viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M150 180 L400 60 L650 180 L650 500 L400 380 L150 500 Z" stroke="currentColor" strokeWidth="1.2" strokeDasharray="4 4" />
                  <path d="M400 60 L400 380 M150 180 L400 380 M650 180 L400 380" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M250 230 L550 230 M250 430 L550 430 M320 120 L320 460 M480 120 L480 460" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2 2" />
                </svg>
                <span className="service-card-number" style={{ color: service.numberColor }}>{service.id}</span>
                <div className="service-card-body">
                  <h3 className="service-card-title">{service.title}</h3>
                  <p className="service-card-desc">{service.description}</p>
                  <a className="service-card-link" href="#more-about">
                    <span>More About Us</span>
                    <ArrowRight size={16} />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
