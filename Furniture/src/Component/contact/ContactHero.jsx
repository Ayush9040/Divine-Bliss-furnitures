import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import contactHero from '../../assets/home-reference/contact-hero.webp';
import './ContactHero.css';

export default function ContactHero() {
  const container = useRef(null);

  useGSAP(
    () => {
      const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } });

      timeline
        .from('.page-hero-title', { y: 44, opacity: 0, duration: 0.9 })
        .from('.page-hero-breadcrumb', { y: 24, opacity: 0, duration: 0.75 }, '-=0.55');
    },
    { scope: container },
  );

  return (
    <section
      ref={container}
      className="page-hero"
      aria-labelledby="contact-page-title"
      style={{ backgroundImage: `url(${contactHero})` }}
    >
      <div className="page-hero-overlay" />
      <div className="page-hero-main">
        <h1 id="contact-page-title" className="page-hero-title">
          <span>Contact US</span>
          
        </h1>
        <nav className="page-hero-breadcrumb" aria-label="Breadcrumb">
          <Link to="/" className="page-hero-breadcrumb-link">Home</Link>
          <ArrowRight className="page-hero-breadcrumb-arrow" aria-hidden="true" />
          <span className="page-hero-breadcrumb-current" aria-current="page">Contacts</span>
        </nav>
      </div>
    </section>
  );
}
