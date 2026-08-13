import { useEffect } from 'react';
import ServicesHero from '../Component/services/ServiceHero';
import DesignProcess from '../Component/services/DesignProcess';
import ServiceStats from '../Component/services/ServiceStats';
import DesignServicesSection from '../Component/services/DesignServicesSection';
import ServicesTextScroller from '../Component/services/ServicesTextScroller';
import PricingPlans from '../Component/services/PricingPlans';

const Services = () => {
  useEffect(() => {
    const revealNodes = [...document.querySelectorAll('.services-reveal')];
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      revealNodes.forEach((node) => node.classList.add('is-visible'));
      return undefined;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: .12, rootMargin: '0px 0px -40px' });

    revealNodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="services-page">
      <ServicesHero />
      <DesignProcess />
      <ServiceStats />
      <DesignServicesSection />
      {/* <ServicesTextScroller /> */}
      {/* <PricingPlans /> */}
    </main>
  );
};

export default Services;
