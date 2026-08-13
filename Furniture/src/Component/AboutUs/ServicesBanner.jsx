import { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './ServicesBanner.css';

gsap.registerPlugin(ScrollTrigger);

const title = 'Our Services';

export default function ServicesBanner() {
  const bannerRef = useRef(null);

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const timeline = gsap.timeline({
      scrollTrigger: { trigger: bannerRef.current, start: 'top 76%' },
      defaults: { ease: 'power3.out' },
    });

    timeline
      .from('.about-services-banner__eyebrow', { autoAlpha: 0, y: 14, duration: 0.6 })
      .from('.about-services-banner__letter', {
        autoAlpha: 0,
        yPercent: 115,
        rotateX: -30,
        duration: 0.75,
        stagger: 0.045,
      }, '-=.3')
      .from('.about-services-banner__button', {
        autoAlpha: 0,
        scale: .65,
        duration: .65,
      }, '-=.42');
  }, { scope: bannerRef });

  return (
    <div ref={bannerRef} className="about-services-banner">
      <span className="about-services-banner__eyebrow">From Concept to Completion</span>
      <div className="about-services-banner__row">
        <h2 id="about-services-title" className="about-services-banner__title" aria-label={title}>
          {title.split('').map((letter, index) => (
            <span className="about-services-banner__letter" key={`${letter}-${index}`}>
              {letter === ' ' ? '\u00a0' : letter}
            </span>
          ))}
        </h2>
        <a className="about-services-banner__button" href="/services" aria-label="View our services">
          <ArrowUpRight aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
