import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ChevronDown, MousePointer2 } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './LocationMap.css';

gsap.registerPlugin(ScrollTrigger);

const studioAddress = 'GROUND FLOOR, # SY NO 7, MARUTHI GARDEN, SARJAPUR ROAD, Wipro Corporate, Bengaluru, Bengaluru Urban, Bengaluru, Karnataka, 560035';
const mapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(studioAddress)}&t=m&z=16&output=embed&iwloc=near`;
const collectionOptions = [
  { value: 'sofas', label: 'Sofas' },
  { value: 'dining', label: 'Dining' },
  { value: 'curtains', label: 'Curtains' },
];

export default function LocationMap() {
  const container = useRef(null);
  const collectionField = useRef(null);
  const [mapActive, setMapActive] = useState(false);
  const [collectionOpen, setCollectionOpen] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState('');

  useEffect(() => {
    if (!mapActive) return undefined;

    const stopMapInteraction = (event) => {
      if (event.key === 'Escape') setMapActive(false);
    };

    window.addEventListener('keydown', stopMapInteraction);
    return () => window.removeEventListener('keydown', stopMapInteraction);
  }, [mapActive]);

  useEffect(() => {
    if (!collectionOpen) return undefined;

    const closeCollectionMenu = (event) => {
      if (event.key === 'Escape') setCollectionOpen(false);
    };
    const closeOnOutsideClick = (event) => {
      if (!collectionField.current?.contains(event.target)) setCollectionOpen(false);
    };

    window.addEventListener('keydown', closeCollectionMenu);
    document.addEventListener('pointerdown', closeOnOutsideClick);
    return () => {
      window.removeEventListener('keydown', closeCollectionMenu);
      document.removeEventListener('pointerdown', closeOnOutsideClick);
    };
  }, [collectionOpen]);

  useGSAP(
    () => {
      gsap.fromTo(
        '.contact-form-panel',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.05,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.contact-form-panel', start: 'top 88%', once: true },
        },
      );
    },
    { scope: container },
  );

  const activateMap = () => {
    setMapActive(true);
  };

  const selectedCollectionLabel = collectionOptions.find(
    (option) => option.value === selectedCollection,
  )?.label;

  const selectCollection = (value) => {
    setSelectedCollection(value);
    setCollectionOpen(false);
  };

  return (
    <section ref={container} className="contact-location" aria-label="Location and contact form">
      <div
        className={`contact-map ${mapActive ? 'is-active' : ''}`}
        onPointerLeave={() => setMapActive(false)}
      >
        <iframe
          src={mapUrl}
          title="Divine Bliss showroom on Sarjapur Road, Bengaluru"
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          tabIndex={mapActive ? 0 : -1}
        />

        {!mapActive && (
          <button type="button" className="contact-map-guard" onClick={activateMap} aria-label="Activate interactive map">
            <span><MousePointer2 aria-hidden="true" /> Click to explore map</span>
          </button>
        )}

        {mapActive && (
          <button type="button" className="contact-map-release" onClick={() => setMapActive(false)}>
            Resume page scrolling
          </button>
        )}
      </div>

      <div className="contact-form-section">
        <div className="contact-form-panel">
          <div className="contact-form-eyebrow"><i /> Reach Out</div>
          <h2>Get in Touch</h2>
          <p>We'd be happy to answer your questions and help you take the next step toward creating a home you'll love.</p>

          <form className="contact-form" onSubmit={(event) => event.preventDefault()}>
            <div className="contact-form-row">
              <label>
                <span className="sr-only">Name</span>
                <input type="text" name="name" placeholder="Name" autoComplete="name" required />
              </label>
              <label>
                <span className="sr-only">Email</span>
                <input type="email" name="email" placeholder="Email" autoComplete="email" required />
              </label>
            </div>
            <div className="contact-form-row">
              <label>
                <span className="sr-only">Phone Number</span>
                <input type="tel" name="phone" placeholder="Ph No" autoComplete="tel" required />
              </label>
              <div ref={collectionField} className={`contact-select-field ${collectionOpen ? 'is-open' : ''}`}>
                <span id="collection-label" className="sr-only">Collections</span>
                <input type="hidden" name="collection" value={selectedCollection} />
                <button
                  type="button"
                  className={`contact-select-trigger ${selectedCollection ? 'has-value' : ''}`}
                  aria-label={`Select collection, current value ${selectedCollectionLabel || 'none'}`}
                  aria-haspopup="listbox"
                  aria-expanded={collectionOpen}
                  aria-controls="collection-options"
                  onClick={() => setCollectionOpen((open) => !open)}
                >
                  <span id="collection-value">{selectedCollectionLabel || 'Collections'}</span>
                  <ChevronDown aria-hidden="true" />
                </button>

                <div
                  id="collection-options"
                  className="contact-select-menu"
                  role="listbox"
                  aria-labelledby="collection-label"
                  hidden={!collectionOpen}
                >
                  {collectionOptions.map((option, index) => (
                    <button
                      type="button"
                      role="option"
                      aria-selected={selectedCollection === option.value}
                      className={selectedCollection === option.value ? 'is-selected' : ''}
                      key={option.value}
                      onClick={() => selectCollection(option.value)}
                    >
                      <span>{String(index + 1).padStart(2, '0')}</span>
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <label>
              <span className="sr-only">Note</span>
              <textarea name="note" rows="3" placeholder="Note" />
            </label>
            <button type="submit">Request Call Back <ArrowRight aria-hidden="true" /></button>
          </form>
        </div>
      </div>
    </section>
  );
}
