import { ArrowRight, ArrowUp } from 'lucide-react';
import footerBackground from '../assets/footer-bg.webp';
import WhiteLogo from '../assets/w-logo.webp';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="mink-footer" style={{ backgroundImage: `url(${footerBackground})` }}>
      <div className="mink-footer-panel">
        <div className="mink-footer-brand">
          <img src={WhiteLogo} alt="Mink Studio" />
          <p>We believe great design goes beyond aesthetics. It’s about how a space works, how it feels, and how it supports everyday life.</p>
        </div>

        <div className="mink-footer-contact">
          <div>
            <p>27 Division St, New York,<br />NY 10002, USA</p>
            <a href="tel:+1800123456789">+1 800 123 456 789</a>
            <a href="mailto:minkstudio@mail.com">minkstudio@mail.com</a>
          </div>
          <p>© 2026 Mink byWebGeniusLab</p>
        </div>

        <div className="mink-footer-social">
          <nav aria-label="Social media">
            <a href="https://www.instagram.com/">Instagram</a>
            <a href="https://www.behance.net/">Behance</a>
            <a href="https://www.facebook.com/">Facebook</a>
            <a href="https://www.pinterest.com/">Pinterest</a>
          </nav>
          <button type="button">Join Our Newsletter <ArrowRight size={21} /></button>
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
