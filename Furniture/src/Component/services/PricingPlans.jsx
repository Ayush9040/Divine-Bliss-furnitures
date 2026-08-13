import { Link } from 'react-router-dom';
import pricingOne from '../../assets/services-reference/pricing-01.webp';
import pricingTwo from '../../assets/services-reference/pricing-02.webp';
import pricingThree from '../../assets/services-reference/pricing-03.webp';
import './PricingPlans.css';

const plans = [
  ['Basic Design', '199', 'Perfect for Small Spaces', ['Design concept & style direction', 'Space planning & furniture layout', 'Mood boards & color palette', 'One round of revisions'], pricingOne],
  ['Full Interior Design', '299', 'Most Popular Solution', ['Detailed floor plans', 'Lighting & electrical layouts', '3D visualizations', 'Two rounds of revisions'], pricingTwo],
  ['Premium Turnkey', '399', 'Complete Design', ['Custom furniture design', 'Contractor & supplier coordination', 'Site visits & design supervision', 'Budget and timeline control'], pricingThree],
];

export default function PricingPlans() {
  return (
    <section className="pricing-section">
      <header className="pricing-heading services-reveal">
        <p className="services-eyebrow"><i /> Pricing Plans</p>
        <h2>Flexible Interior Design<br />Packages for Every Project</h2>
      </header>
      <div className="pricing-grid">
        {plans.map(([name, price, tagline, features, image], index) => (
          <article className="pricing-card services-reveal" style={{ '--reveal-delay': `${index * 90}ms`, backgroundImage: `url(${image})` }} key={name}>
            <p className="pricing-name">{name}</p>
            <div className="pricing-price-row">
              <span className="pricing-currency">$</span>
              <span className="pricing-price">{price}</span>
              <span className="pricing-unit">per<br />square meter</span>
            </div>
            <h3>{tagline}</h3>
            <ul>{features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
            <Link to="/contact">Choose a Plan</Link>
          </article>
        ))}
      </div>
    </section>
  );
}
