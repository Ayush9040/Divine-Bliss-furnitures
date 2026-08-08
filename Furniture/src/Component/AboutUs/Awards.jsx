
import React, { useState, useEffect , useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import "./Awards.css";
gsap.registerPlugin(ScrollTrigger);
const awardsData = [
  {
    year: "2019",
    title: "PRITZKER ARCHITECTURE PRIZE",
    category: "Project of the Year",
  },
  {
    year: "2019",
    title: "WORLD ARCHITECTURE FESTIVAL (WAF) AWARDS",
    category: "Gold Award Winner",
  },
  {
    year: "2022",
    title: "HOSPITALITY DESIGN AWARDS",
    category: "Best in Category",
  },
  {
    year: "2023",
    title: "DNA PARIS DESIGN AWARDS",
    category: "Honorable Mention",
  },
  {
    year: "2026",
    title: "SBID INTERNATIONAL DESIGN AWARDS",
    category: "Project of the Year",
  },
];

const statsData = [
  { start: 106, end: 340, label: 'unique houses built' , sym:'+' },
  { start: 20, end: 67, label: 'Designed Square Meters' ,sym:'K'},
  { start: 10, end: 25, label: 'skilled designers' , sym:"" },
];


const Awards = () => {
  const [counts, setCounts] = useState(statsData.map((item) => item.start));
  const sectionRef = useRef(null);

  useEffect(() => {
    const tweens = statsData.map((stat, index) => {
      const counterObj = { value: stat.start };

      return gsap.to(counterObj, {
        value: stat.end,
        duration: 2.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          once: true,
        },
        onUpdate: () => {
          setCounts((prevCounts) => {
            const updated = [...prevCounts];
            updated[index] = Math.floor(counterObj.value);
            return updated;
          });
        },
      });
    });

    return () => {
      tweens.forEach((tween) => tween.kill());
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section className="awards-section">
      <div className="awards-container">

        <div className="awards-header-top">
          <span className="awards-dot"></span>
          <span className="awards-subtitle">DESIGN PROCESS</span>
        </div>

        <h2 className="awards-title">OUR AWARDS AND RECOGNITIONS</h2>

        <div className="awards-list">
          {awardsData.map((award, index) => (
            <div key={index} className="award-row">
              <div className="award-year">{award.year}</div>
              <div className="award-name">{award.title}</div>
              <div className="award-category">{award.category}</div>
            </div>
          ))}
        </div>

          {/* counter animation  */}
        <div ref={sectionRef} className="counter-section">
          {statsData.map((stat, index) => (
          <div key={index} className="stat-card">
            <h2 className="stat-number">{counts[index]}{stat.sym}</h2>
            <p className="stat-label">{stat.label}</p>
          </div>
        ))}
        </div>
      </div>
    </section>
  );
};

export default Awards;
