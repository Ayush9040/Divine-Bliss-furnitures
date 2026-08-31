import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import heroImage from '../assets/craftsmenship_banner.webp';
import timelineOne from '../assets/from_concept_to_creation.png';
import timelineTwo from '../assets/precision_manufacturing.png';
import timelineThree from '../assets/attention_to_every_detail.png';
import timelineFour from '../assets/comfort_without_compromise.png';
import timelineFive from '../assets/our_commitment.png';
import craftsmanshipLights from '../assets/craftsmanship-reference/craftsmanship-lights.webp';
import './Craftsmanship.css';

const timelineItems = [
  {
    step: '01',
    title: 'From Concept to Creation',
    subtitle: 'Designed with Intention',
    lead: 'Every piece begins with an idea.',
    paragraphs: [
      'Our design process focuses on creating furniture that complements contemporary lifestyles while remaining timeless in its appeal. Every proportion, curve, texture, and finish is carefully considered to ensure harmony between beauty and functionality.',
      'The result is furniture that doesn\'t simply occupy a space, it enhances it.',
    ],
    image: timelineOne,
  },
  {
    step: '02',
    title: 'Precision Manufacturing',
    subtitle: 'Where Design Meets Expertise',
    lead: 'Great furniture demands precision at every stage of production.',
    paragraphs: [
      'Our manufacturing process combines skilled workmanship with careful attention to detail, ensuring every component is crafted, assembled, and finished to meet our exacting standards.',
      'From structural integrity to surface finishes, every step is carried out with one goal in mind: creating furniture that stands the test of time.',
    ],
    image: timelineTwo,
  },
  {
    step: '03',
    title: 'Attention to Every Detail',
    subtitle: 'The Difference Is in the Finish',
    lead: 'Luxury is defined by the details.',
    paragraphs: [
      'Whether it\'s the smoothness of a surface, the alignment of every element, or the flawless finishing touches, our commitment to precision is evident in every piece that leaves our workshop.',
      'It\'s this dedication that transforms furniture into something truly exceptional.',
    ],
    image: timelineThree,
  },
  {
    step: '04',
    title: 'Comfort Without Compromise',
    subtitle: 'Designed to Be Lived In',
    lead: 'Beautiful furniture should also feel inviting.',
    paragraphs: [
      'Every Divine Bliss piece is designed with everyday comfort in mind, ensuring that elegance never comes at the expense of functionality. From relaxing evenings on a sofa to meaningful conversations around the dining table, our furniture is created to support the moments that matter most.',
    ],
    image: timelineFour,
  },
  {
    step: '05',
    title: 'Our Commitment',
    subtitle: 'Quality That Lasts Beyond Trends',
    lead: 'Trends come and go, but quality endures.',
    paragraphs: [
      'Our commitment extends beyond creating beautiful furniture, we strive to deliver products that continue to perform, inspire, and enrich homes for years to come.',
      'It\'s a philosophy that shapes every design decision and every piece we create.',
    ],
    image: timelineFive,
  },
];

const manifestoCopy = 'Every Detail Matters';
const manifestoWords = manifestoCopy.split(' ');
const manifestoParagraphs = [
  'Furniture is more than the sum of its materials. It’s the precision of every cut, the perfection of every stitch, and the care invested in every finishing touch.',
  'At Divine Bliss, craftsmanship is at the heart of everything we create. Every sofa, dining piece, and curtain is thoughtfully made to balance aesthetics, comfort, and lasting performance, ensuring every product is as beautiful as it is functional.',
];

export default function Craftsmanship() {
  const pageRef = useRef(null);
  const manifestoRef = useRef(null);
  const timelineRef = useRef(null);

  useGSAP(() => {
    const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } });

    timeline
      .from('.craft-hero__title', { autoAlpha: 0, y: 34, duration: 1 })
      .from('.craft-hero__breadcrumbs', { autoAlpha: 0, y: 18, duration: 0.75 }, '-=0.58');
  }, { scope: pageRef });

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });

    const revealNodes = pageRef.current?.querySelectorAll('.craft-reveal, .craft-timeline__entry');
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px 4% 0px' },
    );

    revealNodes?.forEach((node) => revealObserver.observe(node));

    let frame;
    const updateScrollEffects = () => {
      frame = undefined;
      const clamp = (value) => Math.min(Math.max(value, 0), 1);
      const timelineElement = timelineRef.current;
      const manifestoElement = manifestoRef.current;

      if (timelineElement) {
        const rect = timelineElement.getBoundingClientRect();
        const start = window.innerHeight * 0.76;
        const travel = rect.height + window.innerHeight * 0.48;
        const progress = clamp((start - rect.top) / travel);
        timelineElement.style.setProperty('--timeline-progress', progress.toFixed(4));
      }

      if (manifestoElement) {
        const title = manifestoElement.querySelector('.craft-manifesto__title');
        const words = manifestoElement.querySelectorAll('.craft-manifesto__word');
        const titleRect = title?.getBoundingClientRect();

        if (titleRect) {
          const revealStart = window.innerHeight * 0.85;
          const revealDistance = Math.max(window.innerHeight * 0.5, 280);
          const progress = clamp((revealStart - titleRect.top) / revealDistance);
          const sweep = progress * (words.length + 3);

          words.forEach((word, index) => {
            const wordProgress = progress === 0 ? 0 : clamp((sweep - index + 2.5) / 3);
            const easedProgress = 1 - Math.pow(1 - wordProgress, 1.7);
            word.style.opacity = (0.1 + easedProgress * 0.9).toFixed(3);
          });
        }

        const sectionRect = manifestoElement.getBoundingClientRect();
        const imageShift = Math.min(Math.max(-18 - sectionRect.top * 0.1, -124), 24);
        manifestoElement.style.setProperty('--manifesto-image-shift', `${imageShift.toFixed(1)}px`);
      }
    };

    const requestScrollUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateScrollEffects);
    };

    updateScrollEffects();
    window.addEventListener('scroll', requestScrollUpdate, { passive: true });
    window.addEventListener('resize', requestScrollUpdate, { passive: true });

    return () => {
      revealObserver.disconnect();
      window.removeEventListener('scroll', requestScrollUpdate);
      window.removeEventListener('resize', requestScrollUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <main ref={pageRef} className="craft-page">
      <section
        className="craft-hero page-hero"
        style={{
          backgroundImage: `linear-gradient(rgba(20, 20, 20, .34), rgba(20, 20, 20, .34)), url(${heroImage})`,
        }}
      >
        <div className="craft-hero__inner">
          <h1 className="craft-hero__title">Craftsmanship</h1>
          <nav className="craft-hero__breadcrumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <ArrowRight aria-hidden="true" />
            <span>Craftsmanship</span>
          </nav>
        </div>
      </section>

      <section className="craft-intro craft-reveal" aria-labelledby="craft-intro-title">
        <p className="craft-kicker">Introduction</p>
        <h2 id="craft-intro-title">
          Crafted with Precision.
          <span> Designed to Endure.</span>
        </h2>
        <p className="craft-intro__description">
          True craftsmanship isn&apos;t just seen, it&apos;s experienced. From the first sketch to the final finish,
          every Divine Bliss creation reflects our commitment to quality, attention to detail, and timeless design.
        </p>
      </section>

      <section ref={manifestoRef} className="craft-manifesto" aria-labelledby="craft-manifesto-title">
        <div className="craft-manifesto__inner">
          <div className="craft-manifesto__content">
            <p className="craft-manifesto__eyebrow">
              <span aria-hidden="true" />
              Our Craftsmanship
            </p>
            <h2 id="craft-manifesto-title" className="craft-manifesto__title" aria-label={manifestoCopy}>
              {manifestoWords.map((word, index) => (
                <span className="craft-manifesto__word" aria-hidden="true" key={`${word}-${index}`}>
                  {word}{index < manifestoWords.length - 1 ? ' ' : ''}
                </span>
              ))}
            </h2>
            <div className="craft-manifesto__description">
              {manifestoParagraphs.map((paragraph, paragraphIndex) => {
                const paragraphWords = paragraph.split(' ');

                return (
                  <p aria-label={paragraph} key={paragraph}>
                    {paragraphWords.map((word, wordIndex) => (
                      <span
                        className="craft-manifesto__word"
                        aria-hidden="true"
                        key={`${paragraphIndex}-${word}-${wordIndex}`}
                      >
                        {word}{wordIndex < paragraphWords.length - 1 ? ' ' : ''}
                      </span>
                    ))}
                  </p>
                );
              })}
            </div>
          </div>
        </div>
        <div className="craft-manifesto__art" aria-hidden="true">
          <img src={craftsmanshipLights} alt="" />
        </div>
      </section>

      <section className="craft-timeline-section" aria-label="Craftsmanship process">
        <div ref={timelineRef} className="craft-timeline">
          {timelineItems.map((item) => (
            <article className="craft-timeline__entry" key={item.step}>
              <span className="craft-timeline__dot" aria-hidden="true" />
              <div className="craft-timeline__image-shell">
                <img src={item.image} alt={item.title} />
              </div>
              <div className="craft-timeline__content">
                <p className="craft-timeline__subtitle">{item.subtitle}</p>
                <span className="craft-timeline__number" aria-hidden="true">{item.step}</span>
                <h3>{item.title}</h3>
                <p className="craft-timeline__lead">{item.lead}</p>
                <div className="craft-timeline__body">
                  {item.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="craft-closing craft-reveal" aria-labelledby="craft-closing-title">
        <div className="craft-closing__inner">
          <h2 id="craft-closing-title">
            Crafted for Today.
            <span>Designed for Tomorrow.</span>
          </h2>
          <p>
            Every Divine Bliss creation reflects our belief that exceptional furniture should offer lasting beauty,
            enduring comfort, and uncompromising quality, today, tomorrow, and for years to come.
          </p>
          <Link className="craft-closing__button" to="/contact#contact-form">
            Discuss Your Project
            <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}
