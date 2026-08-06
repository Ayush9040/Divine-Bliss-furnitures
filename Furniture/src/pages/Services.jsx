import React from 'react';
import ServicesHero from '../Component/services/ServiceHero';
import DesignProcess from '../Component/services/DesignProcess';
import ServiceStats from '../Component/services/ServiceStats';
import DesignServicesSection from '../Component/Home/DesignService';
import ServicesTextScroller from '../Component/services/ServicesTextScroller';
import PricingPlans from '../Component/services/PricingPlans';

const Services = () => {
  return (
    <>
      <ServicesHero />
      <DesignProcess />
      <ServiceStats />
      <DesignServicesSection />
      <ServicesTextScroller />
      <PricingPlans />
    </>
  );
};

export default Services;
