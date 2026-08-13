import { useRef, useState } from 'react';
import { ArrowRight, LampDesk, Sofa, LayoutGrid } from 'lucide-react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import serviceOne from '../../assets/about-reference/service-01.webp';
import serviceTwo from '../../assets/about-reference/service-02.webp';
import serviceThree from '../../assets/about-reference/service-03.webp';
import './ServiceCards.css';

gsap.registerPlugin(ScrollTrigger);

const cards = [
  { id: 'furniture', title: 'Furniture Selection', image: serviceOne, Icon: LampDesk },
  { id: 'style', title: 'Choose Your Style', image: serviceTwo, Icon: Sofa },
  { id: 'collection', title: 'Explore Collection', image: serviceThree, Icon: LayoutGrid },
];

export default function ServiceCards() {
  const cardsRef = useRef(null);
  const [activeId, setActiveId] = useState('furniture');

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.from('.about-service-card', {
      autoAlpha: 0,
      y: 38,
      duration: .85,
      stagger: .1,
      ease: 'power3.out',
      scrollTrigger: { trigger: cardsRef.current, start: 'top 84%' },
    });
  }, { scope: cardsRef });

  const activate = (id) => setActiveId(id);

  return (
    <div ref={cardsRef} className="about-service-cards">
      {cards.map(({ id, title, image, Icon }) => (
        <article
          className={`about-service-card ${activeId === id ? 'is-active' : ''}`}
          key={id}
          tabIndex={0}
          aria-expanded={activeId === id}
          onMouseEnter={() => activate(id)}
          onFocus={() => activate(id)}
          onClick={() => activate(id)}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              activate(id);
            }
          }}
        >
          <img className="about-service-card__image" src={image} alt="" aria-hidden="true" />
          <div className="about-service-card__content">
            <div className="about-service-card__content-inner">
              <Icon className="about-service-card__icon" aria-hidden="true" />
              <h3>{title}</h3>
              <p>Regular stretching supports better posture, prevents injuries, and improves recovery after physical activity.</p>
              <a href="/services">Read More <ArrowRight aria-hidden="true" /></a>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
