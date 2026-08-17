import AboutHeroSection from '../Component/AboutUs/AboutHeroSection';
import AboutContent from '../Component/AboutUs/AboutContent';
import ServicesTicker from '../Component/AboutUs/ServicesTicker';
// import ServicesBanner from '../Component/AboutUs/ServicesBanner';
// import ServiceCards from '../Component/AboutUs/ServiceCards';
import BrandPrinciplesSection from '../Component/AboutUs/BrandPrinciplesSection';
// import AwardsSection from '../Component/AboutUs/AwardsSection';

export default function AboutUs() {
  return (
    <main className="about-page">
      <AboutHeroSection />
      <AboutContent />
      <ServicesTicker />
      {/* Temporarily hidden while the new brand principles section is live.
      <section className="about-services" aria-labelledby="about-services-title">
        <ServicesBanner />
        <ServiceCards />
      </section>
      */}
      <BrandPrinciplesSection />
      {/* Temporarily hidden: awards list and statistics/number section.
      <AwardsSection />
      */}
    </main>
  );
}
