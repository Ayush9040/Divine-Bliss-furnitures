import { useRef, useState } from "react";
import { ArrowRight, Lamp, Sofa as SofaIcon, LayoutGrid } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import "./ServiceCards.css";
import ser_1 from '../../assets/service_1.webp';
import ser_2 from '../../assets/service_2.webp';
import ser_3 from '../../assets/service_3.webp';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const CARDS = [
  {
    id: "furniture",
    icon: <Lamp className="service-card-icon" />,
    title: "Furniture Selection",
    description:
      "Regular stretching supports better posture, prevents injuries, and improves recovery after physical activity.",
    image: ser_1,
  },
  {
    id: "style",
    icon: <SofaIcon className="service-card-icon" />,
    title: "Choose Your Style",
    description:
      "Regular stretching supports better posture, prevents injuries, and improves recovery after physical activity.",
    image: ser_2,
  },
  {
    id: "collection",
    icon: <LayoutGrid className="service-card-icon" />,
    title: "Explore Collection",
    description:
      "Regular stretching supports better posture, prevents injuries, and improves recovery after physical activity.",
    image: ser_3,
  },
];

const ServiceCards = () => {
  const container = useRef();
  // "style" is open by default, matching the live screenshot
  const [activeId, setActiveId] = useState("style");

  useGSAP(
    () => {
      gsap.from(".service-card", {
        y: 50,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: container.current,
          start: "top 80%",
        },
      });
    },
    { scope: container }
  );

  return (
    <div ref={container} className="service-cards-row">
      {CARDS.map((card) => {
        const isActive = activeId === card.id;
        return (
          <div
            key={card.id}
            className={`service-card ${isActive ? "service-card--active" : ""}`}
            onMouseEnter={() => setActiveId(card.id)}
          >
            <div className="service-card-image" style={{ backgroundImage: `url(${card.image})` }} />

            <div className="service-card-panel">
              {card.icon}
              <h3 className="service-card-title">{card.title}</h3>
              <p className="service-card-desc">{card.description}</p>
              <a href="#read-more" className="service-card-link">
                Read More <ArrowRight className="service-card-link-icon" />
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ServiceCards;
