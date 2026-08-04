import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import "./ServiceHero.css";

const ServiceHero = () => {
  return (
    <div
      className="page-hero service-hero"
      style={{
        backgroundImage: `url('https://wgl-dsites.net/mink/wp-content/uploads/2026/02/pt-services.webp')`,
      }}
    >
      <div className="service-hero-overlay" />

      <main className="service-hero-container">
        <div>
          <h1 className="service-hero-title">
            SERVICES
          </h1>
        </div>

        <div className="service-hero-breadcrumb">
          <Link to="/" className="service-hero-link">
            HOME
          </Link>
          <ArrowRight className="service-hero-arrow" />
          <span className="service-hero-current">
            SERVICES
          </span>
        </div>
      </main>
    </div>
  );
};

export default ServiceHero;
