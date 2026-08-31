import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ChevronDown, MapPin, MousePointer2 } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useContactForm from '../../hooks/useContactForm';
import { COLLECTION_OPTIONS, getCollectionLabel } from '../../utils/contactValidation';
import './LocationMap.css';

gsap.registerPlugin(ScrollTrigger);

const studioAddress = 'Ground Floor, # Sy No 7, Maruthi Garden, Sarjapur Road, Wipro Corporate, Bengaluru, Karnataka, 560035';
const mapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(studioAddress)}&t=m&z=16&output=embed&iwloc=near`;
export default function LocationMap() {
  const container = useRef(null);
  const collectionField = useRef(null);
  const [mapActive, setMapActive] = useState(false);
  const [collectionOpen, setCollectionOpen] = useState(false);
  const {
    values,
    errors,
    status,
    isSubmitting,
    setFieldValue,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useContactForm({
    formId: 'contact-page-form',
    requireNote: true,
    source: 'contact-page',
  });

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

  const selectedCollectionLabel = getCollectionLabel(values.collection);

  const selectCollection = (value) => {
    setFieldValue('collection', value);
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

        <div className="contact-map-highlight" aria-label="Divine Bliss showroom location">
          <span className="contact-map-highlight__label">Divine Bliss Showroom</span>
          <span className="contact-map-highlight__pin"><MapPin aria-hidden="true" /></span>
        </div>

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

      <div id="contact-form" className="contact-form-section">
        <div className="contact-form-panel">
          <div className="contact-form-eyebrow"><i /> Reach Out</div>
          <h2>Get in Touch</h2>
          <p>We'd be happy to answer your questions and help you take the next step toward creating a home you'll love.</p>

          <form id="contact-page-form" className="contact-form" noValidate onSubmit={handleSubmit}>
            <div className="contact-form-row">
              <label className="contact-field">
                <span className="sr-only">Name</span>
                <input
                  type="text"
                  name="name"
                  value={values.name}
                  placeholder="Name"
                  autoComplete="name"
                  maxLength="80"
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? 'contact-name-error' : undefined}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.name && <span id="contact-name-error" className="contact-field-error">{errors.name}</span>}
              </label>
              <label className="contact-field">
                <span className="sr-only">Email</span>
                <input
                  type="email"
                  name="email"
                  value={values.email}
                  placeholder="Email"
                  autoComplete="email"
                  maxLength="254"
                  spellCheck="false"
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'contact-email-error' : undefined}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.email && <span id="contact-email-error" className="contact-field-error">{errors.email}</span>}
              </label>
            </div>
            <div className="contact-form-row">
              <label className="contact-field">
                <span className="sr-only">Phone Number</span>
                <input
                  type="tel"
                  name="phone"
                  value={values.phone}
                  placeholder="Ph No"
                  autoComplete="tel-national"
                  inputMode="numeric"
                  pattern="[6-9][0-9]{9}"
                  maxLength="10"
                  aria-invalid={Boolean(errors.phone)}
                  aria-describedby={errors.phone ? 'contact-phone-error' : undefined}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.phone && <span id="contact-phone-error" className="contact-field-error">{errors.phone}</span>}
              </label>
              <div ref={collectionField} className={`contact-select-field ${collectionOpen ? 'is-open' : ''} ${errors.collection ? 'has-error' : ''}`}>
                <span id="collection-label" className="sr-only">Collections</span>
                <button
                  type="button"
                  className={`contact-select-trigger ${values.collection ? 'has-value' : ''}`}
                  data-field="collection"
                  aria-label={`Select collection, current value ${selectedCollectionLabel || 'none'}`}
                  aria-haspopup="listbox"
                  aria-expanded={collectionOpen}
                  aria-controls="collection-options"
                  aria-invalid={Boolean(errors.collection)}
                  aria-describedby={errors.collection ? 'contact-collection-error' : undefined}
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
                  {COLLECTION_OPTIONS.map((option, index) => (
                    <button
                      type="button"
                      role="option"
                      aria-selected={values.collection === option.value}
                      className={values.collection === option.value ? 'is-selected' : ''}
                      key={option.value}
                      onClick={() => selectCollection(option.value)}
                    >
                      <span>{String(index + 1).padStart(2, '0')}</span>
                      {option.label}
                    </button>
                  ))}
                </div>
                {errors.collection && <span id="contact-collection-error" className="contact-field-error">{errors.collection}</span>}
              </div>
            </div>
            <label className="contact-field">
              <span className="sr-only">Note</span>
              <textarea
                name="note"
                rows="3"
                value={values.note}
                maxLength="1000"
                placeholder="Note"
                aria-invalid={Boolean(errors.note)}
                aria-describedby={errors.note ? 'contact-note-error' : undefined}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.note && <span id="contact-note-error" className="contact-field-error">{errors.note}</span>}
            </label>
            <div className="contact-form-actions">
              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Verifying…' : 'Request Call Back'} <ArrowRight aria-hidden="true" />
              </button>
              {status.message && (
                <p className={`contact-form-status is-${status.type}`} role={status.type === 'error' ? 'alert' : 'status'}>
                  {status.message}
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
