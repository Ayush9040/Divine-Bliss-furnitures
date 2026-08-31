import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import facebookLogo from '../assets/facebookLogo.svg';
import instagramLogo from '../assets/instagramLogo.svg';
import useContactForm from '../hooks/useContactForm';
import { COLLECTION_OPTIONS, getCollectionLabel } from '../utils/contactValidation';
import ShowroomMap from './ShowroomMap';
import './HeaderContactPanel.css';

export default function HeaderContactPanel() {
  const collectionField = useRef(null);
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
    formId: 'header-contact-form',
    source: 'header-popup',
  });

  useEffect(() => {
    if (!collectionOpen) return undefined;

    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setCollectionOpen(false);
    };
    const closeOnOutsideClick = (event) => {
      if (!collectionField.current?.contains(event.target)) setCollectionOpen(false);
    };

    window.addEventListener('keydown', closeOnEscape);
    document.addEventListener('pointerdown', closeOnOutsideClick);
    return () => {
      window.removeEventListener('keydown', closeOnEscape);
      document.removeEventListener('pointerdown', closeOnOutsideClick);
    };
  }, [collectionOpen]);

  const selectedCollectionLabel = getCollectionLabel(values.collection);

  const selectCollection = (value) => {
    setFieldValue('collection', value);
    setCollectionOpen(false);
  };

  return (
    <div className="header-contact-panel" role="dialog" aria-label="Contact Divine Bliss">
      <section className="header-contact-panel__details" aria-labelledby="header-contact-title">
        <h2 id="header-contact-title">Contacts</h2>

        <div className="header-contact-panel__detail">
          <h3>Showroom Address:</h3>
          <address>
            Ground Floor, # Sy No 7,<br />
            Maruthi Garden,<br />
            Sarjapur Road, Wipro Corporate,<br />
            Bengaluru, Karnataka, 560035
          </address>
        </div>

        <div className="header-contact-panel__detail">
          <h3>Call Us:</h3>
          <a href="tel:9743444469">9743444469</a>
        </div>

        <div className="header-contact-panel__detail">
          <h3>Mail Us:</h3>
          <a href="mailto:divinebliss121@gmail.com">divinebliss121@gmail.com</a>
        </div>

        <nav className="header-contact-panel__social" aria-label="Contact social media">
          <a href="https://www.facebook.com/DivineBlissOfficial" target="_blank" rel="noreferrer" aria-label="Facebook"><img src={facebookLogo} alt="" /></a>
          <a href="https://www.instagram.com/divine_bliss_official/" target="_blank" rel="noreferrer" aria-label="Instagram"><img src={instagramLogo} alt="" /></a>
        </nav>
      </section>

      <section className="header-contact-panel__form-wrap" aria-labelledby="header-contact-form-title">
        <h2 id="header-contact-form-title">Get in Touch</h2>
        <p>Share your details and our team will get in touch with you shortly.</p>

        <form id="header-contact-form" className="header-contact-panel__form" noValidate onSubmit={handleSubmit}>
          <label className="header-contact-field">
            <span className="sr-only">Name</span>
            <input
              type="text"
              name="name"
              value={values.name}
              placeholder="Your Name"
              autoComplete="name"
              maxLength="80"
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? 'header-name-error' : undefined}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.name && <span id="header-name-error" className="contact-field-error">{errors.name}</span>}
          </label>
          <label className="header-contact-field">
            <span className="sr-only">Email</span>
            <input
              type="email"
              name="email"
              value={values.email}
              placeholder="Your Email"
              autoComplete="email"
              maxLength="254"
              spellCheck="false"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? 'header-email-error' : undefined}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.email && <span id="header-email-error" className="contact-field-error">{errors.email}</span>}
          </label>
          <label className="header-contact-field">
            <span className="sr-only">Phone Number</span>
            <input
              type="tel"
              name="phone"
              value={values.phone}
              placeholder="Phone Number"
              autoComplete="tel-national"
              inputMode="numeric"
              pattern="[6-9][0-9]{9}"
              maxLength="10"
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={errors.phone ? 'header-phone-error' : undefined}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.phone && <span id="header-phone-error" className="contact-field-error">{errors.phone}</span>}
          </label>
          <div
            ref={collectionField}
            className={`header-contact-select ${collectionOpen ? 'is-open' : ''} ${errors.collection ? 'has-error' : ''}`}
          >
            <span id="header-collection-label" className="sr-only">Collections</span>
            <button
              type="button"
              className={`header-contact-select__trigger ${values.collection ? 'has-value' : ''}`}
              data-field="collection"
              aria-label={`Select collection, current value ${selectedCollectionLabel || 'none'}`}
              aria-haspopup="listbox"
              aria-expanded={collectionOpen}
              aria-controls="header-collection-options"
              aria-invalid={Boolean(errors.collection)}
              aria-describedby={errors.collection ? 'header-collection-error' : undefined}
              onClick={() => setCollectionOpen((open) => !open)}
            >
              <span>{selectedCollectionLabel || 'Collections'}</span>
              <ChevronDown aria-hidden="true" />
            </button>

            <div
              id="header-collection-options"
              className="header-contact-select__menu"
              role="listbox"
              aria-labelledby="header-collection-label"
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
            {errors.collection && <span id="header-collection-error" className="contact-field-error">{errors.collection}</span>}
          </div>

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Verifying…' : 'Request Call Back'} <ArrowRight aria-hidden="true" />
          </button>
          {status.message && (
            <p className={`contact-form-status is-${status.type}`} role={status.type === 'error' ? 'alert' : 'status'}>
              {status.message}
            </p>
          )}
        </form>
      </section>

      <div className="header-contact-panel__map">
        <ShowroomMap />
      </div>
    </div>
  );
}
