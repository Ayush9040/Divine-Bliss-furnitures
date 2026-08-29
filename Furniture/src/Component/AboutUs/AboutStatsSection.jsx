import { useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import counterBackground from '../../assets/craftsmanship-reference/counter-bg.webp';
import counterCircle from '../../assets/craftsmanship-reference/counter-circle.webp';
import './AboutStatsSection.css';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { start: 100, end: 340, suffix: '+', label: 'Years of Service' },
  { start: 10, end: 67, suffix: 'K', label: 'Happy Customers' },
  { start: 10, end: 25, suffix: '', label: 'Unique Furniture Built' },
];

export default function AboutStatsSection() {
  const sectionRef = useRef(null);

  useGSAP(() => {
    const numberNodes = gsap.utils.toArray('.about-stats__value-number', sectionRef.current);
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      numberNodes.forEach((node) => {
        node.textContent = node.dataset.end;
      });
      return undefined;
    }

    const counterTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 78%',
        once: true,
      },
    });

    numberNodes.forEach((node) => {
      const counter = { value: Number(node.dataset.start) };

      counterTimeline.to(counter, {
        value: Number(node.dataset.end),
        duration: 1.2,
        ease: 'power2.out',
        snap: { value: 1 },
        onUpdate: () => {
          node.textContent = Math.round(counter.value).toString();
        },
      }, 0);
    });

    const circleTween = gsap.fromTo(
      '.about-stats__circle-image',
      { yPercent: -3 },
      {
        yPercent: 3,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.8,
        },
      },
    );

    const backgroundTween = gsap.fromTo(
      sectionRef.current,
      { backgroundPosition: '50% 47%' },
      {
        backgroundPosition: '50% 53%',
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.8,
        },
      },
    );

    return () => {
      counterTimeline.kill();
      circleTween.kill();
      backgroundTween.kill();
    };
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="about-stats"
      style={{ backgroundImage: `url(${counterBackground})` }}
      aria-label="Divine Bliss at a glance"
    >
      <div className="about-stats__inner">
        {stats.map(({ start, end, suffix, label }) => (
          <article className="about-stats__item" key={label}>
            <span className="about-stats__circle" aria-hidden="true">
              <img className="about-stats__circle-image" src={counterCircle} alt="" />
            </span>
            <div className="about-stats__content">
              <p className="about-stats__value" aria-label={`${end}${suffix}`}>
                <span
                  className="about-stats__value-number"
                  data-start={start}
                  data-end={end}
                  aria-hidden="true"
                >
                  {start}
                </span>
                <span className="about-stats__suffix" aria-hidden="true">{suffix}</span>
              </p>
              <h3>{label}</h3>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
