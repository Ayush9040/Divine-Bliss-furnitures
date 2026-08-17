import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import xLogo from '../../assets/xLogo.svg';
import facebookLogo from '../../assets/facebookLogo.svg';
import instagramLogo from '../../assets/instagramLogo.svg';
import linkedinLogo from '../../assets/LinkdinLogo.svg';
import './ContactSection.css';

gsap.registerPlugin(ScrollTrigger);

const emailAddress = 'Divinebliss121@gmail.com';

export default function ContactSection() {
  const container = useRef(null);
  const emailRef = useRef(null);

  useGSAP(
    () => {
      const revealItems = gsap.utils.toArray('[data-contact-reveal]');
      revealItems.forEach((element, index) => {
        gsap.fromTo(
          element,
          { y: 42, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.95,
            delay: index * 0.035,
            ease: 'power3.out',
            scrollTrigger: { trigger: element, start: 'top 88%', once: true },
          },
        );
      });

      const letters = gsap.utils.toArray('.contact-email-letter');
      const middle = (letters.length - 1) / 2;

      gsap.fromTo(
        letters,
        {
          yPercent: (index) => -(24 + (middle - Math.abs(index - middle)) * 12.5),
        },
        {
          yPercent: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: emailRef.current,
            start: 'top 96%',
            end: 'top 58%',
            scrub: 0.65,
            invalidateOnRefresh: true,
          },
        },
      );
    },
    { scope: container },
  );

  return (
    <div ref={container}>
      <section className="contact-overview" aria-labelledby="contact-overview-title">
        <div className="contact-overview-shell">
          <div className="contact-overview-lead">
            <div className="contact-eyebrow" data-contact-reveal><i /> We'd Love to Hear From You</div>
            <h2 id="contact-overview-title" data-contact-reveal>
              <span>Let's Create </span>
              <span>Something Beautiful Together</span>
              {/* <span>and Inspires</span> */}
            </h2>
          </div>

          <div className="contact-overview-copy">
            <p className="contact-intro" data-contact-reveal>
              Whether you're furnishing a single room, designing an entire home, or looking for a bespoke solution, we're here to help bring your vision to life.
            </p>

            <div className="contact-details-grid">
              <div className="contact-detail" data-contact-reveal>
                <h3>Showroom Address:</h3>
                <address>
                  GROUND FLOOR, # SY NO 7, MARUTHI GARDEN,<br />
                  SARJAPUR ROAD, Wipro Corporate, Bengaluru,<br />
                  Bengaluru Urban, Bengaluru, Karnataka, 560035
                </address>
              </div>

              <div className="contact-detail" data-contact-reveal>
                <h3>Call Us:</h3>
                <a href="tel:9743444469">9743444469</a>
              </div>

              <div className="contact-detail" data-contact-reveal>
                <h3>Mail Us:</h3>
                <a href="mailto:Divinebliss121@gmail.com"> Divinebliss121@gmail.com</a>
              </div>

              <nav className="contact-social" aria-label="Contact social media" data-contact-reveal>
                <a href="https://x.com/" aria-label="X"><img src={xLogo} alt="" /></a>
                <a href="https://www.facebook.com/" aria-label="Facebook"><img src={facebookLogo} alt="" /></a>
                <a href="https://www.instagram.com/" aria-label="Instagram"><img src={instagramLogo} alt="" /></a>
                <a href="https://www.linkedin.com/" aria-label="LinkedIn"><img src={linkedinLogo} alt="" /></a>
              </nav>
            </div>
          </div>
        </div>
      </section>

      <section ref={emailRef} className="contact-email-banner" aria-label={emailAddress}>
        <h2 aria-hidden="true">
          {[...emailAddress].map((letter, index) => (
            <span className="contact-email-letter" key={`${letter}-${index}`}>{letter}</span>
          ))}
        </h2>
      </section>
    </div>
  );
}
