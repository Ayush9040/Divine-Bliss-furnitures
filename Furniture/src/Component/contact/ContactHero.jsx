import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import "./ContactHero.css";

const ContactHero = () => {
  const container = useRef();

  // Fade + slide-up reveal on page load, matching the reveal style
  // used across the rest of the Contacts page (power3.out, staggered).
  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".page-hero-title", {
        y: 40,
        opacity: 0,
        duration: 1,
      }).from(
        ".page-hero-breadcrumb",
        {
          y: 20,
          opacity: 0,
          duration: 0.8,
        },
        "-=0.6" // overlap slightly with the title animation
      );
    },
    { scope: container }
  );

  return (
    <div
      ref={container}
      className="page-hero"
      style={{
        backgroundImage: `url('https://wgl-dsites.net/mink/wp-content/uploads/2026/02/pt-contacts.webp')`,
      }}
    >
      <div className="page-hero-overlay" />

      <main className="page-hero-main">
        <div>
          <h1 className="page-hero-title">Contacts</h1>
        </div>

        <div className="page-hero-breadcrumb">
          <Link to="/" className="page-hero-breadcrumb-link">
            HOME
          </Link>
          <ArrowRight className="page-hero-breadcrumb-arrow" />
          <span className="page-hero-breadcrumb-current">CONTACTS</span>
        </div>
      </main>
    </div>
  );
};

export default ContactHero;
