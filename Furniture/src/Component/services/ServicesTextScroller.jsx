import './ServicesTextScroller.css';

const items = ['Concept Development', '//', 'Architectural Design', '//', '3D Visualization', '//'];

export default function ServicesTextScroller() {
  return (
    <section className="services-scroller-section" aria-label="Interior design services">
      <div className="services-scroller-track">
        {[0, 1].map((group) => (
          <div className="services-scroller-group" aria-hidden={group === 1} key={group}>
            {items.map((item, index) => <span key={`${group}-${index}`}>{item}</span>)}
          </div>
        ))}
      </div>
    </section>
  );
}
