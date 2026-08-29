import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import heroImage from '../assets/craftsmanship-reference/craftsmanship-hero.webp';
import timelineOne from '../assets/craftsmanship-reference/timeline-1.webp';
import timelineTwo from '../assets/craftsmanship-reference/timeline-2.webp';
import timelineThree from '../assets/craftsmanship-reference/timeline-3.webp';
import timelineFour from '../assets/craftsmanship-reference/timeline-4.webp';
import timelineFive from '../assets/about-reference/about-left.webp';
import timelineSix from '../assets/sofaImage.webp';
import craftsmanshipLights from '../assets/craftsmanship-reference/craftsmanship-lights.webp';
import './Craftsmanship.css';

const defaultTimelineItems = [
  {
    step: '01',
    title: 'Upholstery Fabrics',
    subtitle: 'Comfort You Can Feel',
    lead: 'The right fabric transforms furniture from something you see into something you experience.',
    paragraphs: [
      'Our curated upholstery collection offers a diverse range of textures, colours, and finishes, allowing every sofa and chair to reflect your personal style while providing exceptional everyday comfort.',
      'Whether you prefer understated neutrals, bold statement tones, or tactile textures, our fabric options are designed to complement a wide variety of interiors.',
    ],
    image: timelineOne,
  },
  {
    step: '02',
    title: 'Wood & Structural Materials',
    subtitle: 'Built on Strength',
    lead: 'Behind every beautifully designed piece is a structure engineered for lasting performance.',
    paragraphs: [
      'Our furniture is crafted using carefully selected structural materials that provide stability, durability, and everyday reliability, creating pieces that are made to be enjoyed for years to come.',
    ],
    image: timelineTwo,
  },
  {
    step: '03',
    title: 'Finishes',
    subtitle: 'The Beauty Lies in the Details',
    lead: 'Every finish plays a role in defining the character of a piece.',
    paragraphs: [
      'From subtle textures to refined surface treatments, our carefully considered finishes enhance both the visual appeal and longevity of our furniture, ensuring every detail feels intentional.',
    ],
    image: timelineThree,
  },
  {
    step: '04',
    title: 'Curtain Fabrics',
    subtitle: 'Designed to Complete the Space',
    lead: 'Curtains bring softness, warmth, and depth to every room.',
    paragraphs: [
      'Our collection of premium curtain fabrics offers a wide selection of colours, textures, and drapes, helping you create interiors that feel balanced, inviting, and distinctly yours.',
      'Each solution is tailored to your space, ensuring the perfect blend of functionality and style.',
    ],
    image: timelineFour,
  },
  {
    step: '05',
    title: 'Colours & Customisation',
    subtitle: 'Made to Match Your Vision',
    lead: 'Every home has its own personality.',
    paragraphs: [
      'Choose from an extensive palette of colours, fabrics, textures, and finishes to create furniture that integrates seamlessly into your interiors. Whether your style is contemporary, classic, or somewhere in between, our customisation options help bring your vision to life.',
    ],
    image: timelineFive,
  },
  {
    step: '06',
    title: 'Care & Longevity',
    subtitle: 'Designed to Be Enjoyed for Years',
    lead: 'Beautiful furniture deserves thoughtful care.',
    paragraphs: [
      'With regular maintenance and the right care, your Divine Bliss furniture will continue to offer comfort, beauty, and functionality for years to come. Our team is always available to guide you on caring for your chosen materials and finishes.',
    ],
    image: timelineSix,
  },
];

const defaultManifestoTitle = 'Thoughtfully Selected Beautifully Finished';
const defaultManifestoParagraphs = [
  "The beauty of furniture lies beyond its design. It's found in the quality of the materials, the precision of the finishes, and the care invested in every detail.",
  'At Divine Bliss, we believe great furniture starts with thoughtful material selection. Each element is chosen to complement our designs while ensuring comfort, durability, and effortless elegance for years to come.',
];

export default function Materials({
  pageTitle = 'Materials',
  introTitle = 'Exceptional Furniture Begins',
  introTitleSecondLine = 'Exceptional Materials',
  introDescription = 'Every detail matters. From the fabrics you touch to the finishes you see, the materials behind every Divine Bliss creation are carefully chosen to deliver lasting comfort, enduring quality, and timeless appeal.',
  manifestoEyebrow = 'Our Materials',
  manifestoTitle = defaultManifestoTitle,
  manifestoParagraphs = defaultManifestoParagraphs,
  timelineAriaLabel = 'Materials process',
  timelineItems = defaultTimelineItems,
  closingTitle = 'Quality You Can See',
  closingTitleSecondLine = 'Comfort You Can Feel',
  closingDescription = 'Every material we select contributes to a singular goal: creating furniture',
  closingDescriptionSecondLine = 'that looks exceptional, feels inviting, and stands the test of time.',
  closingButtonLabel = 'Discover Our Collections',
  closingButtonTo = '/collections',
}) {
  const pageRef = useRef(null);
  const manifestoRef = useRef(null);
  const timelineRef = useRef(null);
  const manifestoWords = manifestoTitle.split(' ');

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
          <h1 className="craft-hero__title">{pageTitle}</h1>
          <nav className="craft-hero__breadcrumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <ArrowRight aria-hidden="true" />
            <span>{pageTitle}</span>
          </nav>
        </div>
      </section>

      <section className="craft-intro craft-reveal" aria-labelledby="craft-intro-title">
        <p className="craft-kicker">Introduction</p>
        <h2 id="craft-intro-title">
          {introTitle}
          <span> {introTitleSecondLine}</span>
        </h2>
        <p className="craft-intro__description">{introDescription}</p>
      </section>

      <section ref={manifestoRef} className="craft-manifesto" aria-labelledby="craft-manifesto-title">
        <div className="craft-manifesto__inner">
          <div className="craft-manifesto__content">
            <p className="craft-manifesto__eyebrow">
              <span aria-hidden="true" />
              {manifestoEyebrow}
            </p>
            <h2 id="craft-manifesto-title" className="craft-manifesto__title" aria-label={manifestoTitle}>
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

      <section className="craft-timeline-section" aria-label={timelineAriaLabel}>
        <div ref={timelineRef} className="craft-timeline">
          {timelineItems.map((item) => (
            <article className="craft-timeline__entry" key={item.step}>
              <span className="craft-timeline__dot" aria-hidden="true" />
              <div className="craft-timeline__image-shell">
                <img src={item.image} alt={item.title} />
              </div>
              <div className="craft-timeline__content">
                <span className="craft-timeline__number" aria-hidden="true">{item.step}</span>
                <h3>{item.title}</h3>
                <p className="craft-timeline__subtitle">{item.subtitle}</p>
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
            {closingTitle}
            {closingTitleSecondLine && <span>{closingTitleSecondLine}</span>}
          </h2>
          <p className="materials-closing__description">
            <span>{closingDescription}</span>
            {closingDescriptionSecondLine && <>{' '}<span>{closingDescriptionSecondLine}</span></>}
          </p>
          <Link className="craft-closing__button" to={closingButtonTo}>
            {closingButtonLabel}
            <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}
