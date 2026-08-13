import AboutHeroSection from '../Component/AboutUs/AboutHeroSection';
import AboutContent from '../Component/AboutUs/AboutContent';
import ServicesTicker from '../Component/AboutUs/ServicesTicker';
import ServicesBanner from '../Component/AboutUs/ServicesBanner';
import ServiceCards from '../Component/AboutUs/ServiceCards';
import AwardsSection from '../Component/AboutUs/AwardsSection';

export default function AboutUs() {
  return (
    <main className="about-page">
      <AboutHeroSection />
      <AboutContent />
      <ServicesTicker />
      <section className="about-services" aria-labelledby="about-services-title">
        <ServicesBanner />
        <ServiceCards />
      </section>
      <AwardsSection />
    </main>
  );
}
