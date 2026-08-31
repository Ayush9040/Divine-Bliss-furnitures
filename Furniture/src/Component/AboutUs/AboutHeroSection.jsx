import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import heroImage from '../../assets/our_story_banner.webp';
import './AboutHero.css';

export default function AboutHeroSection() {
  const heroRef = useRef(null);

  useGSAP(() => {
    const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } });

    timeline
      .from('.about-page-hero__title', {
        autoAlpha: 0,
        y: 34,
        duration: 1,
      })
      .from('.about-page-hero__breadcrumbs', {
        autoAlpha: 0,
        y: 18,
        duration: 0.75,
      }, '-=0.58');
  }, { scope: heroRef });

  return (
    <section
      ref={heroRef}
      className="about-page-hero page-hero"
      style={{ backgroundImage: `linear-gradient(rgba(20, 20, 20, .34), rgba(20, 20, 20, .34)), url(${heroImage})` }}
    >
      <div className="about-page-hero__inner">
        <h1 className="about-page-hero__title">Our Story</h1>
        <nav className="about-page-hero__breadcrumbs" aria-label="Breadcrumb">
          <a href="/">Home</a>
          <ArrowRight aria-hidden="true" />
          <span>About Us</span>
        </nav>
      </div>
    </section>
  );
}
