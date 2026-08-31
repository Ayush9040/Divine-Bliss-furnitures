import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import leftImage from '../../assets/our_story_1.png';
import rightImage from '../../assets/our_story_2.png';
import './AboutContent.css';

gsap.registerPlugin(ScrollTrigger);

const headingLines = [
  ['Every', 'Home', 'Begins'],
  ['With', 'A', 'Story'],
];

function AnimatedHeading() {
  return headingLines.map((line, lineIndex) => (
    <span className="about-story-heading__line" key={line.join('-')}>
      {line.map((word, wordIndex) => (
        <span className="about-story-heading__word" key={`${word}-${lineIndex}-${wordIndex}`}>
          {word.split('').map((letter, letterIndex) => (
            <span className="about-story-heading__letter" key={`${letter}-${letterIndex}`}>
              {letter}
            </span>
          ))}
          {wordIndex < line.length - 1 && ' '}
        </span>
      ))}
    </span>
  ));
}

export default function AboutContent() {
  const sectionRef = useRef(null);

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.from('.about-story-heading__eyebrow', {
      autoAlpha: 0,
      y: 16,
      duration: 0.65,
      ease: 'power2.out',
      scrollTrigger: { trigger: '.about-story-heading', start: 'top 84%' },
    });

    gsap.from('.about-story-heading__letter', {
      autoAlpha: 0,
      yPercent: 115,
      duration: 0.8,
      ease: 'power3.out',
      stagger: 0.018,
      scrollTrigger: { trigger: '.about-story-heading__title', start: 'top 86%' },
    });

    gsap.from('.about-story__reveal', {
      autoAlpha: 0,
      y: 34,
      duration: 0.85,
      ease: 'power3.out',
      stagger: 0.11,
      scrollTrigger: { trigger: '.about-story-editorial', start: 'top 82%' },
    });

    gsap.from('.about-story__image', {
      autoAlpha: 0,
      y: 46,
      duration: 1,
      ease: 'power3.out',
      stagger: 0.14,
      scrollTrigger: { trigger: '.about-story__left-image', start: 'top 88%' },
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="about-story">
      <div className="about-story-heading">
        <div className="about-story-heading__inner">
          <span className="about-story-heading__eyebrow">
            <i aria-hidden="true" /> Smth Little About Us
          </span>
          <h2 className="about-story-heading__title"><AnimatedHeading /></h2>
        </div>
      </div>

      <div className="about-story-editorial">
        <div className="about-story-editorial__inner">
          <div className="about-story__column about-story__column--left">
            <p className="about-story__lead about-story__reveal">
              Since 2016, we've been helping homeowners create interiors that are as comfortable as they are beautiful.
            </p>
            <img
              className="about-story__image about-story__left-image"
              src={leftImage}
              alt="Calm contemporary living room"
            />
          </div>

          <div className="about-story__column about-story__column--right">
            <p className="about-story__copy about-story__reveal">
              The spaces we live in shape our everyday moments. At Divine Bliss, we believe the furniture within those spaces should be created with the same care, intention, and attention to detail.

            </p>
            <a className="about-story__link about-story__reveal" href="/#projects">
              View All Cases <ArrowRight aria-hidden="true" />
            </a>
            <img
              className="about-story__image about-story__right-image"
              src={rightImage}
              alt="Interior designers collaborating at a desk"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
