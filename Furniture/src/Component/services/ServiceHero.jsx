import { Link } from 'react-router-dom';
import heroImage from '../../assets/services-reference/services-hero.webp';
import './ServiceHero.css';

const Arrow = () => (
  <svg viewBox="0 0 21 12" aria-hidden="true">
    <path d="M20.5 5.5a.63.63 0 0 1 0 .88l-5.3 5.3a.63.63 0 0 1-.88-.89l4.24-4.24H.63a.63.63 0 0 1 0-1.25h17.93l-4.24-4.23a.63.63 0 0 1 .88-.89l5.3 5.32Z" />
  </svg>
);

export default function ServiceHero() {
  return (
    <section className="page-hero service-hero" style={{ backgroundImage: `url(${heroImage})` }}>
      <div className="service-hero-shade" />
      <div className="service-hero-inner">
        <h1 className="service-hero-title">Services</h1>
        <nav className="service-hero-breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <Arrow />
          <span>Services</span>
        </nav>
      </div>
    </section>
  );
}
