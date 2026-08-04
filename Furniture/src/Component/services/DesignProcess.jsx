import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './DesignProcess.css';

const processSteps = [
  {
    number: '01',
    title: 'CONSULTATION & BRIEF',
    description:
      'During this stage, we discuss lifestyle needs, functional requirements, aesthetic preferences, timeline.',
  },
  {
    number: '02',
    title: 'CONCEPT & SPACE PLANNING',
    description:
      'Based on the brief, we develop a cohesive design concept that defines the look, mood, and functionality.',
  },
  {
    number: '03',
    title: 'DESIGN DEVELOPMENT',
    description:
      'We select materials, finishes, furniture, lighting, and custom elements while preparing detailed drawings.',
  },
  {
    number: '04',
    title: 'IMPLEMENTATION & STYLING',
    description:
      'The final stage includes installation, styling, and finishing that transform the design into a fully realized interior.',
  },
];

const DesignProcess = () => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const windowRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(min-width: 1024px)', () => {
        const track = trackRef.current;
        const win = windowRef.current;

        if (!track || !win) return;

        // Calculate scroll height delta between track and window
        const scrollDistance = track.scrollHeight - win.clientHeight;

        if (scrollDistance > 0) {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top top',
              end: `+=${scrollDistance + 350}`,
              pin: true,
              scrub: 1,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          tl.to(track, {
            y: -scrollDistance,
            ease: 'none',
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="design-process-section">
      <div className="design-process-container">
        <div className="design-process-wrapper">
          {/* Left Column - Locked on left side while section is pinned */}
          <div className="process-left">
            <div className="process-tag">
              <span className="process-tag-bullet" />
              <span>DESIGN PROCESS</span>
            </div>

            <h2 className="process-title">
              HOW WE<br />
              BRING SPACES<br />
              TO LIFE
            </h2>

            <div className="process-cta-wrap">
              <Link to="/contact" className="process-cta">
                <span>GET IN TOUCH</span>
                <ArrowRight className="process-cta-arrow" />
              </Link>
            </div>
          </div>

          {/* Right Column - Window frame and scrolling track */}
          <div ref={windowRef} className="process-right-window">
            <div ref={trackRef} className="process-right-track">
              {processSteps.map((step) => (
                <div key={step.number} className="process-card">
                  <span className="process-number">{step.number}</span>
                  <h3 className="process-card-title">{step.title}</h3>
                  <p className="process-card-desc">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DesignProcess;
