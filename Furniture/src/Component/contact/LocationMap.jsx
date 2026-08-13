import { useEffect, useRef, useState } from 'react';
import { ArrowRight, MousePointer2 } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './LocationMap.css';

gsap.registerPlugin(ScrollTrigger);

const mapUrl = 'https://maps.google.com/maps?q=London%20Eye%2C%20London%2C%20United%20Kingdom&t=m&z=10&output=embed&iwloc=near';

export default function LocationMap() {
  const container = useRef(null);
  const [mapActive, setMapActive] = useState(false);

  useEffect(() => {
    if (!mapActive) return undefined;

    const stopMapInteraction = (event) => {
      if (event.key === 'Escape') setMapActive(false);
    };

    window.addEventListener('keydown', stopMapInteraction);
    return () => window.removeEventListener('keydown', stopMapInteraction);
  }, [mapActive]);

  useGSAP(
    () => {
      gsap.fromTo(
        '.contact-form-panel',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.05,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.contact-form-panel', start: 'top 88%', once: true },
        },
      );
    },
    { scope: container },
  );

  const activateMap = () => {
    setMapActive(true);
  };

  return (
    <section ref={container} className="contact-location" aria-label="Location and contact form">
      <div
        className={`contact-map ${mapActive ? 'is-active' : ''}`}
        onPointerLeave={() => setMapActive(false)}
      >
        <iframe
          src={mapUrl}
          title="Mink Studio location at the London Eye"
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          tabIndex={mapActive ? 0 : -1}
        />

        {!mapActive && (
          <button type="button" className="contact-map-guard" onClick={activateMap} aria-label="Activate interactive map">
            <span><MousePointer2 aria-hidden="true" /> Click to explore map</span>
          </button>
        )}

        {mapActive && (
          <button type="button" className="contact-map-release" onClick={() => setMapActive(false)}>
            Resume page scrolling
          </button>
        )}
      </div>

      <div className="contact-form-section">
        <div className="contact-form-panel">
          <div className="contact-form-eyebrow"><i /> Discuss Your Vision</div>
          <h2>Let’s Discuss Your Project</h2>
          <p>Your email address will not be published. Required fields are marked *</p>

          <form className="contact-form" onSubmit={(event) => event.preventDefault()}>
            <div className="contact-form-row">
              <label>
                <span className="sr-only">Your Name</span>
                <input type="text" name="name" placeholder="Your Name" autoComplete="name" />
              </label>
              <label>
                <span className="sr-only">Your Email</span>
                <input type="email" name="email" placeholder="Your Email" autoComplete="email" />
              </label>
            </div>
            <label>
              <span className="sr-only">Website</span>
              <input type="url" name="website" placeholder="Website" autoComplete="url" />
            </label>
            <label>
              <span className="sr-only">Your Comment</span>
              <textarea name="comment" rows="3" placeholder="Your Comment" />
            </label>
            <button type="submit">Leave A Comment <ArrowRight aria-hidden="true" /></button>
          </form>
        </div>
      </div>
    </section>
  );
}
