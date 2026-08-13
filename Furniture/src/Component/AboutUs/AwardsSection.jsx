import { useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './AwardsSection.css';

gsap.registerPlugin(ScrollTrigger);

const awards = [
  ['2019', 'Pritzker Architecture Prize', 'Project of the Year'],
  ['2019', 'World Architecture Festival (WAF) Awards', 'Gold Award Winner'],
  ['2022', 'Hospitality Design Awards', 'Best in Category'],
  ['2023', 'DNA Paris Design Awards', 'Honorable Mention'],
  ['2026', 'SBID International Design Awards', 'Project of the Year'],
];

const stats = [
  [340, '+', 'Unique Houses Built'],
  [67, 'K', 'Designed Square Meters'],
  [25, '', 'Skilled Designers'],
];

export default function AwardsSection() {
  const sectionRef = useRef(null);

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      sectionRef.current.querySelectorAll('.about-stat__value').forEach((element) => {
        element.textContent = `${element.dataset.value}${element.dataset.suffix}`;
      });
      return;
    }

    gsap.from('.about-awards__heading', {
      autoAlpha: 0,
      y: 28,
      duration: .8,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.about-awards__heading', start: 'top 85%' },
    });

    gsap.from('.about-award', {
      autoAlpha: 0,
      y: 24,
      duration: .72,
      stagger: .1,
      ease: 'power2.out',
      scrollTrigger: { trigger: '.about-awards__list', start: 'top 86%' },
    });

    sectionRef.current.querySelectorAll('.about-stat__value').forEach((element) => {
      const counter = { value: 0 };
      const end = Number(element.dataset.value);
      const suffix = element.dataset.suffix;

      gsap.to(counter, {
        value: end,
        duration: 1.5,
        ease: 'power2.out',
        scrollTrigger: { trigger: element, start: 'top 92%' },
        onUpdate: () => {
          element.textContent = `${Math.round(counter.value)}${suffix}`;
        },
      });
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="about-awards">
      <div className="about-awards__body">
        <div className="about-awards__heading">
          <span className="about-awards__eyebrow"><i aria-hidden="true" /> Design Process</span>
          <h2>Our Awards and Recognitions</h2>
        </div>

        <div className="about-awards__list">
          {awards.map(([year, title, note]) => (
            <article className="about-award" key={`${year}-${title}`}>
              <span className="about-award__year">{year}</span>
              <h3>{title}</h3>
              <p>{note}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="about-stats">
        {stats.map(([value, suffix, label]) => (
          <article className="about-stat" key={label}>
            <div className="about-stat__value" data-value={value} data-suffix={suffix}>0{suffix}</div>
            <div className="about-stat__label">{label}</div>
          </article>
        ))}
      </div>
    </section>
  );
}
