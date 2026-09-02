import { ArrowRight, ArrowUp, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import footerBackground from '../assets/footer.png';
import BrandLogo from '../assets/divine_bliss.svg';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="mink-footer" style={{ backgroundImage: `url(${footerBackground})` }}>
      <div className="mink-footer-panel">
        <div className="mink-footer-brand">
          <img src={BrandLogo} alt="Divine Bliss" />
          <p>We believe great design goes beyond aesthetics. It's about how a space works, how it feels, and how it supports everyday life.</p>
        </div>

        <div className="mink-footer-contact">
          <div className="mink-footer-contact-list">
            <div className="mink-footer-contact-item mink-footer-contact-address">
              <MapPin aria-hidden="true" />
              <address>Ground Floor, # Sy No 7,<br />Maruthi Garden,<br />Sarjapur Road, Wipro Corporate,<br />Bengaluru, Karnataka, 560035</address>
            </div>
            <a className="mink-footer-contact-item" href="tel:9743444469">
              <Phone aria-hidden="true" />
              <span>9743444469</span>
            </a>
            <a className="mink-footer-contact-item" href="mailto:divinebliss121@gmail.com">
              <Mail aria-hidden="true" />
              <span>divinebliss121@gmail.com</span>
            </a>
          </div>
          <p>&copy; 2026 Divine Bliss</p>
        </div>

        <div className="mink-footer-links">
          <div>
            <nav aria-label="Quick links">
              <Link to="/collections">Collections</Link>
              <Link to="/about">Our Story</Link>
              <Link to="/craftsmanship">Craftsmanship</Link>
              <Link to="/materials">Materials</Link>
              <Link to="/bespoke">Bespoke</Link>
            </nav>
          </div>
          <Link className="mink-footer-cta" to="/contact">
            Get in Touch <ArrowRight size={21} />
          </Link>
        </div>
      </div>

      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="mink-footer-top"
        aria-label="Scroll to top"
      >
        <ArrowUp />
      </button>
    </footer>
  );
}
