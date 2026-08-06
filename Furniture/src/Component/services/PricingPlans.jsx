import React, { useEffect, useRef } from 'react';
import './PricingPlans.css';

const plans = [
  {
    tier: 'BASIC DESIGN',
    price: '$199',
    subtitle: 'Perfect for Small Spaces',
    features: [
      'Design concept & style direction',
      'Space planning & furniture layout',
      'Mood boards & color palette',
      'One round of revisions',
    ],
  },
  {
    tier: 'FULL INTERIOR DESIGN',
    price: '$299',
    subtitle: 'Most Popular Solution',
    features: [
      'Detailed floor plans',
      'Lighting & electrical layouts',
      '3D visualizations',
      'Two rounds of revisions',
    ],
  },
  {
    tier: 'PREMIUM TURNKEY',
    price: '$399',
    subtitle: 'Complete Design',
    features: [
      'Custom furniture design',
      'Contractor & supplier coordination',
      'Site visits & design supervision',
      'Budget and timeline control',
    ],
  },
];

const PricingPlans = () => {
  const cardsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.15 }
    );

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="pricing-section">
      <div className="pricing-container">
        {/* Header */}
        <div className="pricing-header">
          <div className="pricing-tag">
            <span className="pricing-tag-dot" />
            PRICING PLANS
          </div>
          <h2 className="pricing-title">
            FLEXIBLE INTERIOR DESIGN<br />
            PACKAGES FOR EVERY PROJECT
          </h2>
        </div>

        {/* Cards */}
        <div className="pricing-grid">
          {plans.map((plan, idx) => (
            <div
              key={plan.tier}
              className="pricing-card"
              ref={(el) => (cardsRef.current[idx] = el)}
            >
              {/* Decorative architectural image — top right */}
              <img
                src="/pricing-card-bg.png"
                alt=""
                className="pricing-card-bg-img"
                aria-hidden="true"
              />

              <p className="pricing-card-tier">{plan.tier}</p>

              <div className="pricing-price-row">
                <span className="pricing-price">{plan.price}</span>
                <span className="pricing-price-meta">
                  <span>per</span>
                  <span>square meter</span>
                </span>
              </div>

              <h3 className="pricing-subtitle">{plan.subtitle}</h3>

              <ul className="pricing-features">
                {plan.features.map((feat) => (
                  <li key={feat}>{feat}</li>
                ))}
              </ul>

              <a href="/contact" className="pricing-cta">
                CHOOSE A PLAN
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingPlans;
