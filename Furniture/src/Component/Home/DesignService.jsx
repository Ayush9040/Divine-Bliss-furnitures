import React, { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './DesignService.css';

import interiorImg from '../../assets/sofaImage.webp';
import spaceImg from '../../assets/LuxeHeight.webp';
import furnitureImg from '../../assets/urban.webp';

const services = [
  {
    id: "01",
    title: "RESIDENTIAL INTERIOR DESIGN",
    description:
      "We create comfortable, stylish homes that reflect your personality and lifestyle. From concept to completion, every detail is thoughtfully designed to feel personal and functional.",
    image: interiorImg,
    bgColor: "#7a3320",
    textColor: "#ffffff",
    numberColor: "rgba(255,255,255,0.55)",
  },
  {
    id: "02",
    title: "SPACE PLANNING & LAYOUT",
    description:
      "Smart planning is the foundation of great design. We optimize layouts to maximize space, improve functionality, and create seamless movement throughout the interior.",
    image: spaceImg,
    bgColor: "#e7e1d6",
    textColor: "#3a2a1f",
    numberColor: "rgba(58,42,31,0.45)",
  },
  {
    id: "03",
    title: "FURNITURE & MATERIAL SELECTION",
    description:
      "We curate high-end furniture, textures, and finishes that harmonize with your architectural vision, ensuring enduring elegance and absolute comfort.",
    image: furnitureImg,
    bgColor: "#ffffff",
    textColor: "#1c1c1c",
    numberColor: "rgba(0,0,0,0.32)",
  },
];

export default function DesignServicesSection() {
  const sectionRef = useRef(null);   // now the actual pin target
  const wrapRef = useRef(null);      // the fixed-height card stack frame
  const cardsRef = useRef([]);
  cardsRef.current = [];

  const addCardRef = (el) => {
    if (el && !cardsRef.current.includes(el)) cardsRef.current.push(el);
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const cards = cardsRef.current;
    if (!sectionRef.current || !wrapRef.current || cards.length < 2) return;

    const mm = gsap.matchMedia();

    const buildStack = (pinIt) => {
      const cardHeight = wrapRef.current.offsetHeight;
      const headerHeight =
        parseFloat(getComputedStyle(wrapRef.current).getPropertyValue('--header-height')) || 64;

      const hiddenCards = cards.slice(1);
      gsap.set(hiddenCards, { y: cardHeight });

      const tl = gsap.timeline({
        scrollTrigger: {
          // Pin the WHOLE SECTION (left text + right cards together),
          // not just the right column — this is what keeps the heading
          // fixed in place instead of scrolling away.
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${hiddenCards.length * (pinIt ? 500 : 350)}`,
          scrub: true,
          pin: pinIt ? sectionRef.current : false,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      hiddenCards.forEach((card, i) => {
        tl.to(
          card,
          { y: headerHeight * (i + 1), ease: 'power2.out', duration: 1 },
          i === 0 ? 0 : '>-0.1'
        );
      });

      return tl;
    };

    mm.add('(min-width: 768px)', () => {
      const tl = buildStack(true);
      return () => tl.scrollTrigger?.kill();
    });

    mm.add('(max-width: 767px)', () => {
      const tl = buildStack(false);
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
          <h2 className="services-title">
            DESIGN SERVICES<br /> <span>TAILORED TO YOUR</span><br /> SPACE
          </h2>
          <a href="#all-services" className="services-cta">
            View All Services <ArrowRight />
          </a>
        </div>

        <div className="design-services-right">
          <div ref={wrapRef} className="cards-wrap">
            {services.map((service, idx) => (
              <article
                key={service.id}
                ref={addCardRef}
                className="service-card"
                style={{
                  backgroundColor: service.bgColor,
                  color: service.textColor,
                  zIndex: 10 + idx * 10,
                }}
              >
                <img src={service.image} alt="" className="service-card-bg-image" />

                <span className="service-card-number" style={{ color: service.numberColor }}>
                  {service.id}
                </span>

                <div className="service-card-body">
                  <h3 className="service-card-title">{service.title}</h3>
                  <p className="service-card-desc">{service.description}</p>
                  <a className="service-card-link" href="#more-about">
                    MORE ABOUT US <ArrowRight size={16} />
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