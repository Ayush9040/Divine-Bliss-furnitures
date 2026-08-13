import { Link } from 'react-router-dom';
import './DesignProcess.css';

const steps = [
  ['01', 'Consultation & Brief', 'During this stage, we discuss lifestyle needs, functional requirements, aesthetic preferences, timeline.'],
  ['02', 'Concept & Space Planning', 'Based on the brief, we develop a cohesive design concept that defines the look, mood, and functionality.'],
  ['03', 'Design Development', 'We select materials, finishes, furniture, lighting, and custom elements while preparing detailed drawings.'],
  ['04', 'Implementation & Styling', 'The final stage includes installation, styling, and finishing that transform the design into a fully realized interior.'],
];

const Arrow = () => <span className="services-inline-arrow" aria-hidden="true">⟶</span>;

export default function DesignProcess() {
  return (
    <section className="design-process-section">
      <div className="design-process-inner">
        <div className="process-intro services-reveal">
          <p className="services-eyebrow"><i /> Design Process</p>
          <h2>How We Bring Spaces to Life</h2>
          <Link to="/contact" className="services-outline-button">Get in Touch <Arrow /></Link>
        </div>
        <div className="process-grid">
          {steps.map(([number, title, copy], index) => (
            <article className="process-step services-reveal" style={{ '--reveal-delay': `${index * 85}ms` }} key={number}>
              <span className="process-number">{number}</span>
              <div className="process-step-copy">
                <h3>{title}</h3>
                <p>{copy}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
