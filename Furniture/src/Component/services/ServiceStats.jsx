import { useEffect, useRef, useState } from 'react';
import counterImage from '../../assets/services-reference/counter-bg.webp';
import counterCircle from '../../assets/services-reference/counter-circle.webp';
import './ServiceStats.css';

const stats = [
  [340, '+', 'Unique Houses Built'],
  [67, 'K', 'Designed Square Meters'],
  [25, '', 'Skilled Designers'],
];

function useAnimatedCounters(ref) {
  const [values, setValues] = useState([100, 10, 10]);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValues(stats.map(([target]) => target));
      return undefined;
    }

    let frame;
    let started = false;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || started) return;
      started = true;
      const start = performance.now();
      const from = [100, 10, 10];
      const animate = (now) => {
        const progress = Math.min((now - start) / 1700, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setValues(stats.map(([target], index) => Math.round(from[index] + (target - from[index]) * eased)));
        if (progress < 1) frame = requestAnimationFrame(animate);
      };
      frame = requestAnimationFrame(animate);
      observer.disconnect();
    }, { threshold: .28 });

    if (ref.current) observer.observe(ref.current);
    return () => { observer.disconnect(); cancelAnimationFrame(frame); };
  }, [ref]);

  return values;
}

export default function ServiceStats() {
  const sectionRef = useRef(null);
  const values = useAnimatedCounters(sectionRef);

  return (
    <section ref={sectionRef} className="service-stats-section" style={{ backgroundImage: `url(${counterImage})` }}>
      <div className="service-stats-shade" />
      <div className="service-stats-inner">
        {stats.map(([target, suffix, label], index) => (
          <article className="service-stat services-reveal" style={{ '--reveal-delay': `${index * 100}ms` }} key={target}>
            <img src={counterCircle} alt="" aria-hidden="true" />
            <p className="service-stat-number">{values[index]}{suffix}</p>
            <h2>{label}</h2>
          </article>
        ))}
      </div>
    </section>
  );
}
