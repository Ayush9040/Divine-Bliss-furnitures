
import React, { useRef } from "react";
import { Circle } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import xLogo from "../../assets/xLogo.svg";
import facebookLogo from "../../assets/facebookLogo.svg";
import instagramLogo from "../../assets/instagramLogo.svg";
import LinkdinLogo from "../../assets/LinkdinLogo.svg";

gsap.registerPlugin(useGSAP );

const ContactSection = () => {
  const container = useRef();

  useGSAP(() => {
    
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
  }, { scope: container });

  return (
    <div ref={container} className="w-full px-6 md:px-16 lg:px-43 py-16 md:py-24 lg:py-34 bg-[#f0ede8] overflow-hidden">
      <div className="w-full flex">
        <div className="font-bold uppercase flex items-center justify-start gap-2 text-[#732c14] text-xs md:text-sm">
          <Circle size={10} /> Discuss your vision
        </div>
      </div>

      <div className="flex flex-col lg:flex-row w-full mt-6 leading-tight gap-12 lg:gap-0">
        
        {/* left div */}
        <div className="w-full lg:w-[50%] uppercase text-3xl md:text-4xl lg:text-5xl ">
          <h1>
            Ready to Create a <br />
            Space That Works <br />
            and Inspires
          </h1>
        </div>

        {/* right div */}
        <div className="w-full lg:w-[50%] ">
          <div>
            <h1 className="text-base md:text-lg text-gray-800">
              Get in touch to discuss your employee wellbeing needs today.{" "}
              <br className="hidden sm:block" /> Please give us a call, drop us an email.
            </h1>
          </div>

          <div className="mt-8 md:mt-10 flex flex-col sm:flex-row gap-8 sm:gap-20 lg:gap-30 ">
            <div className="animate-left-col">
              <h3 className="text-xs font-bold tracking-widest text-[#8C4A32] uppercase mb-2">
                We Are Here:
              </h3>
              <p className="text-sm leading-relaxed text-gray-700">
                27 Division St, New York,
                <br />
                NY 10002, USA
              </p>
            </div>

            <div className="animate-right-col">
              <h3 className="text-xs font-bold tracking-widest text-[#8C4A32] uppercase mb-2">
                Call Us:
              </h3>
              <p className="text-sm font-medium text-gray-700">
                +1 800 432 45 34
              </p>
            </div>
          </div>

          <div className="mt-8 md:mt-10 flex flex-col sm:flex-row sm:items-center justify-between sm:justify-start gap-8 sm:gap-20 lg:gap-30">
            <div className="animate-left-col">
              <h3 className="text-xs font-bold tracking-widest text-[#8C4A32] uppercase mb-2">
                Mail Us:
              </h3>
              <p className="text-sm font-medium text-gray-700">
                minkstudio@mail.com
              </p>
            </div>

            <div className="animate-right-col flex items-center justify-start sm:justify-center gap-4 sm:pl-4">
              <img src={xLogo} alt="x logo" className="h-5 w-5 cursor-pointer hover:opacity-75 transition-opacity" />
              <img src={facebookLogo} alt="facebook logo" className="h-5 w-5 cursor-pointer hover:opacity-75 transition-opacity" />
              <img src={instagramLogo} alt="instagram logo" className="h-5 w-5 cursor-pointer hover:opacity-75 transition-opacity" />
              <img src={LinkdinLogo} alt="Linkdin Logo" className="h-5 w-5 cursor-pointer hover:opacity-75 transition-opacity" />
            </div>
          </div>

        </div>

      </div>
      <div className=" mt-20 ">
        <h1 className="uppercase text-8xl">
          minkstudio@mail.com 
        </h1>
      </div>
    </div>
  );
};

export default ContactSection;
