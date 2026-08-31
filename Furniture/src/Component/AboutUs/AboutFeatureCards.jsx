import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import './AboutFeatureCards.css';

const featureCards = [
  {
    number: '01',
    title: 'Craftsmanship',
    description: "True craftsmanship isn't just seen, it's experienced. From the first sketch to the final finish, every Divine Bliss creation reflects our commitment to quality, attention to detail, and timeless design.",
    link: '/craftsmanship',
    linkLabel: 'Explore Craftsmanship',
  },
  {
    number: '02',
    title: 'Materials',
    description: 'Every detail matters. From the fabrics you touch to the finishes you see, the materials behind every Divine Bliss creation are carefully chosen to deliver lasting comfort, enduring quality, and timeless appeal.',
    link: '/materials',
    linkLabel: 'Explore Materials',
  },
  {
    number: '03',
    title: 'Bespoke',
    description: 'Your home is unlike any other, and your furniture should be too. At Divine Bliss, we offer bespoke solutions that allow you to create pieces tailored to your space, your style, and the way you live.',
    link: '/bespoke',
    linkLabel: 'Explore Bespoke',
  },
];

export default function AboutFeatureCards() {
  return (
    <section className="about-feature-cards" aria-label="Explore Divine Bliss">
      {featureCards.map(({ number, title, description, link, linkLabel }) => (
        <article className="about-feature-card" key={title}>
          <span className="about-feature-card__number" aria-hidden="true">{number}</span>
          <h3>{title}</h3>
          <p>{description}</p>
          <Link className="about-feature-card__link" to={link} aria-label={linkLabel}>
            <span>{linkLabel}</span>
            <ArrowRight aria-hidden="true" />
          </Link>
        </article>
      ))}
    </section>
  );
}
