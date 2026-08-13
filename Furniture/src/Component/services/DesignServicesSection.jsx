import { Link } from 'react-router-dom';
import serviceOne from '../../assets/services-reference/service-01.webp';
import serviceTwo from '../../assets/services-reference/service-02.webp';
import serviceThree from '../../assets/services-reference/service-03.webp';
import './DesignServicesSection.css';

const services = [
  ['01', 'Residential Interior Design', 'We create comfortable, stylish homes that reflect your personality and lifestyle. From concept to completion, every detail is thoughtfully designed to feel personal and functional.', serviceOne, 'is-brown'],
  ['02', 'Space Planning & Layout', 'Smart planning is the foundation of great design. We optimize layouts to maximize space, improve functionality, and create seamless movement throughout the interior.', serviceTwo, 'is-stone'],
  // ['03', 'Furniture & Material Selection', 'We create comfortable, stylish homes that reflect your personality and lifestyle. From concept to completion, every detail is thoughtfully designed to feel personal and functional.', serviceThree, 'is-white'],
];

const Arrow = () => <span className="services-inline-arrow" aria-hidden="true">⟶</span>;

export default function DesignServicesSection() {
  return (
    <section className="services-design-section" id="all-services">
      <div className="services-design-inner">
        <div className="services-design-intro services-reveal">
          <p className="services-eyebrow services-eyebrow-light"><i /> Design Solutions</p>
          <h2>Design Services Tailored to Your Space</h2>
          <a className="services-outline-button services-outline-button-light" href="#all-services">View All Services <Arrow /></a>
        </div>
        <div className="services-design-stack">
          {services.map(([number, title, copy, image, tone], index) => (
            <article className={`services-design-card ${tone}`} style={{ '--card-index': index, backgroundImage: `url(${image})` }} key={number}>
              <span className="services-design-number">{number}</span>
              <div className="services-design-copy">
                <h3>{title}</h3>
                <p>{copy}</p>
                <Link to="/about">More About Us <Arrow /></Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
