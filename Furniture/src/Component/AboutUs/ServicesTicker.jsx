import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import "./ServicesTicker.css";

const TICKER_TEXT = "Concept Development // Architectural Design // 3D Visualization //";

const ServicesTicker = () => {
  const trackRef = useRef();
  const container = useRef();

  useGSAP(
    () => {
      // FIX: kill any tween already running on this element first.
      // React can invoke effects twice (StrictMode / fast refresh), which
      // was stacking two tweens on the same element and making the loop
      // look roughly 2x faster than intended.
      gsap.killTweensOf(trackRef.current);

      gsap.to(trackRef.current, {
        xPercent: -50,
        duration: 160, // FIX: was 30 — much too fast for a background ticker
        ease: "none",
        repeat: -1,
        force3D: true, // smoother, GPU-composited motion
      });
    },
    { scope: container }
  );

  return (
    <div ref={container} className="ticker-outer">
      <div ref={trackRef} className="ticker-track">
        <span className="ticker-item">{TICKER_TEXT} </span>
        <span className="ticker-item">{TICKER_TEXT} </span>
        <span className="ticker-item">{TICKER_TEXT} </span>
        <span className="ticker-item">{TICKER_TEXT} </span>
        {/* duplicate set — required for the seamless -50% loop */}
        <span className="ticker-item">{TICKER_TEXT} </span>
        <span className="ticker-item">{TICKER_TEXT} </span>
        <span className="ticker-item">{TICKER_TEXT} </span>
        <span className="ticker-item">{TICKER_TEXT} </span>
      </div>
    </div>
  );
};

export default ServicesTicker;
