import React from 'react';
import ServicesHero from '../Component/services/ServiceHero';
import DesignProcess from '../Component/services/DesignProcess';
import ServiceStats from '../Component/services/ServiceStats';
import DesignServicesSection from '../Component/Home/DesignService';

const Services = () => {
  return (
    <>
      <ServicesHero />
      <DesignProcess />
      <ServiceStats />
      <DesignServicesSection />
    </>
  );
};

export default Services;
