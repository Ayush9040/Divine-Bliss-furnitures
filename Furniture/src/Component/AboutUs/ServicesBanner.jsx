import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import "./ServicesBanner.css";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const ServicesBanner = () => {
  const container = useRef();

  useGSAP(
    () => {
      // Guard against a duplicate timeline firing on strict-mode double
      // effects — same class of bug that made the ticker feel doubled up.
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === container.current) st.kill();
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top 75%",
        },
        defaults: { ease: "power2.out" },
      });

      tl.from(".services-banner-eyebrow", {
        opacity: 0,
        y: 20,
        duration: 0.7,
      })
        .from(
          ".services-banner-title",
          {
            opacity: 0,
            y: 30,
            duration: 1,
          },
          "-=0.35"
        )
        .from(
          ".services-banner-circle",
          {
            opacity: 0,
            scale: 0.5,
            duration: 0.7,
          },
          "-=0.5"
        )
        // The strike-through line draws left-to-right across the title —
        // slowed down and eased in/out so it reads as a deliberate stroke
        // rather than a snap.
        .fromTo(
          ".services-banner-strike",
          { scaleX: 0 },
          { scaleX: 1, duration: 1.1, ease: "power2.inOut", transformOrigin: "left center" },
          "-=0.25"
        );
    },
    { scope: container }
  );

  return (
    <div ref={container} className="services-banner">
      <span className="services-banner-eyebrow">From Concept to Completion</span>

      <div className="services-banner-title-wrap">
        <h2 className="services-banner-title">
          Our Services
          {/* <span className="services-banner-strike" aria-hidden="true" /> */}
        </h2>

        <a href="#services" className="services-banner-circle" aria-label="View services">
          <ArrowUpRight />
        </a>
      </div>
    </div>
  );
};

export default ServicesBanner;
