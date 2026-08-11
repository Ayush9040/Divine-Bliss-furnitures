import { useRef } from "react";
import { Circle } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import "./AwardsSection.css";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const AWARDS = [
  { year: "2019", name: "Pritzker Architecture Prize", note: "Project of the Year" },
  { year: "2019", name: "World Architecture Festival (WAF) Awards", note: "Gold Award Winner" },
  { year: "2022", name: "Hospitality Design Awards", note: "Best in Category" },
  { year: "2023", name: "DNA Paris Design Awards", note: "Honorable Mention" },
  { year: "2026", name: "SBID International Design Awards", note: "Project of the Year" },
];

const STATS = [
  { value: 340, suffix: "+", label: "Unique Houses Built" },
  { value: 67, suffix: "K", label: "Designed Square Meters" },
  { value: 25, suffix: "", label: "Skilled Designers" },
];

const AwardsSection = () => {
  const container = useRef();

  useGSAP(
    () => {
      // Guard against duplicate triggers stacking on remount
      ScrollTrigger.getAll().forEach((st) => {
        if (container.current.contains(st.trigger)) st.kill();
      });

      // Award rows stagger in as they scroll into view
      gsap.from(".award-row", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.15, // was 0.12 — slightly slower cadence between rows
        scrollTrigger: {
          trigger: ".awards-list",
          start: "top 85%",
        },
      });

      // Stat numbers count up from 0
      document.querySelectorAll(".stat-value").forEach((el) => {
        const target = Number(el.dataset.value);
        const suffix = el.dataset.suffix || "";
        const counter = { val: 0 };

        gsap.to(counter, {
          val: target,
          duration: 2.2, // was 1.6 — reads as a smoother, less rushed count
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
          },
          onUpdate: () => {
            el.textContent = Math.round(counter.val) + suffix;
          },
        });
      });
    },
    { scope: container }
  );

  return (
    <div ref={container} className="awards-section">
      <div className="awards-header">
        <span className="awards-eyebrow">
          <Circle size={10} /> Design Process
        </span>
        <h2 className="awards-title">Our Awards and Recognitions</h2>
      </div>

      <div className="awards-list">
        {AWARDS.map((award, i) => (
          <div className="award-row" key={i}>
            <span className="award-year">{award.year}</span>
            <span className="award-name">{award.name}</span>
            <span className="award-note">{award.note}</span>
          </div>
        ))}
      </div>

      <div className="awards-stats">
        {STATS.map((stat, i) => (
          <div className="stat-item" key={i}>
            <div className="stat-value" data-value={stat.value} data-suffix={stat.suffix}>
              0{stat.suffix}
            </div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AwardsSection;
