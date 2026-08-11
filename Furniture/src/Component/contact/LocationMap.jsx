import React, { useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ScrollTrigger from 'gsap/ScrollTrigger';
import './LocationMap.css';

// Fix for default marker icon missing in React Leaflet
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

gsap.registerPlugin(useGSAP, ScrollTrigger);

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const openMap = () => {
  window.open(
    'https://www.google.com/maps/place/Riverside+Building,+County+Hall,+Westminster+Bridge+Rd,+London+SE1+7JA,+UK/@51.5031864,-0.1195192,17z/data=!3m1!4b1!4m6!3m5!1s0x487604c7c7eb9be3:0x3918653583725b56!8m2!3d51.5031864!4d-0.1195192!16s%2Fg%2F11b62lft4n?entry=ttu&g_ep=EgoyMDI2MDcyMi4wIKXMDSoASAFQAw%3D%3D'
  );
};

export default function LocationMap() {
  const position = [51.5033, -0.1195]; // London Eye coordinates
  const container = useRef();

  useGSAP(
    () => {
      // Floating info card fades/slides in over the map
      gsap.from('.map-info-card', {
        y: -20,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.2,
      });

      // "Let's discuss your project" panel reveals as it scrolls into view
      gsap.from('.form-panel', {
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.form-panel',
          start: 'top 85%',
        },
      });
    },
    { scope: container }
  );

  return (
    <div className="map-wrap" ref={container}>
      <div className="map-frame">
        {/* Leaflet Map */}
        <MapContainer
          center={position}
          zoom={13}
          scrollWheelZoom={true}
          zoomControl={false}
          className="w-full h-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup>London Eye</Popup>
          </Marker>
        </MapContainer>

        {/* Floating Info Card Overlay (Top-Left) */}
        <div className="map-info-card">
          <h2 className="map-info-title">London Eye</h2>
          <p className="map-info-address">
            Riverside Building, County Hall, Westminster Bridge Rd, London SE1 7PB, UK
          </p>

          <div className="map-info-rating">
            <span className="map-info-rating-value">4.5</span>
            <span className="map-info-rating-star">★</span>
            <span className="map-info-rating-count">(203,054)</span>
          </div>

          <div className="map-info-actions">
            <button onClick={openMap} className="map-info-btn-primary">
              <span>Open in Maps</span>
            </button>
            <button className="map-info-btn-icon">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="form-outer">
        <div className="form-section">
          <div className="form-panel">
            <div className="form-eyebrow">
              <span className="form-eyebrow-dot"></span>
              Discuss Your Vision
            </div>

            <h2 className="form-title">LET'S DISCUSS YOUR PROJECT</h2>

            <p className="form-subtitle">
              Your email address will not be published. Required fields are marked *
            </p>

            <form onSubmit={(e) => e.preventDefault()} className="contact-form">
              <div className="form-row">
                <div className="form-field">
                  <input type="text" placeholder="Your Name" className="form-input" />
                </div>
                <div className="form-field">
                  <input type="email" placeholder="Your Email" className="form-input" />
                </div>
              </div>

              <div className="form-field">
                <input type="text" placeholder="Website" className="form-input" />
              </div>

              <div className="form-field">
                <textarea rows="4" placeholder="Your Comment" className="form-textarea"></textarea>
              </div>

              <div className="form-submit-row">
                <button type="submit" className="form-submit-btn">
                  Leave A Comment
                  <ArrowRight className="form-submit-icon" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
