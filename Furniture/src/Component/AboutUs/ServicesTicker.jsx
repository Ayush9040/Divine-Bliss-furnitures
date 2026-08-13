import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import './ServicesTicker.css';

const tickerText = 'Concept Development // Architectural Design // 3D Visualization // ';

export default function ServicesTicker() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.to(trackRef.current, {
      xPercent: -50,
      duration: 125,
      repeat: -1,
      ease: 'none',
      force3D: true,
    });
  }, { scope: sectionRef });

  const sequence = Array.from({ length: 4 }, (_, index) => (
    <span key={index}>{tickerText}</span>
  ));

  return (
    <section ref={sectionRef} className="about-ticker" aria-hidden="true">
      <div ref={trackRef} className="about-ticker__track">
        <div className="about-ticker__group">{sequence}</div>
        <div className="about-ticker__group">{sequence}</div>
      </div>
    </section>
  );
}
