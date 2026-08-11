import React, { useRef } from "react";
import { Circle } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import xLogo from "../../assets/xLogo.svg";
import facebookLogo from "../../assets/facebookLogo.svg";
import instagramLogo from "../../assets/instagramLogo.svg";
import LinkdinLogo from "../../assets/LinkdinLogo.svg";
import "./ContactSection.css";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const ContactSection = () => {
  const container = useRef();

  useGSAP(
    () => {
      gsap.from(".animate-left-col", {
        x: -80,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
      });

      gsap.from(".animate-right-col", {
        x: 80,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.1,
      });

      // Giant email banner fades/scales up as it enters view
      gsap.from(".text-animi", {
        opacity: 0,
        y: 30,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".text-animi",
          start: "top 90%",
        },
      });
    },
    { scope: container }
  );

  return (
    <div ref={container} className="contact-section">
      <div className="contact-eyebrow-row">
        <div className="contact-eyebrow">
          <Circle size={10} /> Discuss your vision
        </div>
      </div>

      <div className="contact-columns">
        {/* left div */}
        <div className="contact-col-left">
          <h1>
            Ready to Create a <br />
            Space That Works <br />
            and Inspires
          </h1>
        </div>

        {/* right div */}
        <div className="contact-col-right">
          <div>
            <h1 className="contact-intro">
              Get in touch to discuss your employee wellbeing needs today.{" "}
              <br className="contact-intro-break" /> Please give us a call, drop us an email.
            </h1>
          </div>

          <div className="contact-info-row">
            <div className="animate-left-col">
              <h3 className="contact-label">We Are Here:</h3>
              <p className="contact-address">
                27 Division St, New York,
                <br />
                NY 10002, USA
              </p>
            </div>

            <div className="animate-right-col">
              <h3 className="contact-label">Call Us:</h3>
              <p className="contact-phone">+1 800 432 45 34</p>
            </div>
          </div>

          <div className="contact-mail-row">
            <div className="animate-left-col">
              <h3 className="contact-label">Mail Us:</h3>
              <p className="contact-email">minkstudio@mail.com</p>
            </div>

            <div className="animate-right-col contact-social">
              <img src={xLogo} alt="x logo" />
              <img src={facebookLogo} alt="facebook logo" />
              <img src={instagramLogo} alt="instagram logo" />
              <img src={LinkdinLogo} alt="Linkdin Logo" />
            </div>
          </div>
        </div>
      </div>

      <div className="contact-email-banner">
        <h1 className="text-animi">minkstudio@mail.com</h1>
      </div>
    </div>
  );
};

export default ContactSection;
