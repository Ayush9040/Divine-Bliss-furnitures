import { Circle, MoveRight } from "lucide-react";
import Sofa from "../assets/sofa.webp";
import basin from "../assets/basin.webp";
import floweDesign from "../assets/flowerDesign.webp";
import client1 from "../assets/clients-1.webp";
import client2 from "../assets/clients-2.webp";
import client3 from "../assets/clients-3.webp";
import client4 from "../assets/clients-4.webp";
import client5 from "../assets/clients-5.webp";
import client6 from "../assets/clients-6.webp";

const Aboutus = () => {
  const data = [client1, client2, client3, client4, client5, client6];
  return (
    <div className="w-full px-50 py-55">
      <div className="w-[80%] flex flex-col">
        <span className="flex items-center justify-start gap-2 text-[#732c14]">
          {" "}
          <Circle size={12} /> SMTH LITTLE ABOUT US
        </span>
        <div className="mt-10 uppercase text-5xl font-normal">
          Interior Design That Balances Beauty, Comfort, and Purpose in Every
          Detail
        </div>
      </div>

      <div className="w-full flex mt-10 justify-between">
        <div className="w-[46%] p-3 y-3 gap-25 flex flex-col">
          <span className="text-2xl">
            We believe great design goes <br /> beyond aesthetics.
          </span>
          <div>
            <img src={Sofa} alt="Sofa image" />
          </div>
        </div>
        <div className="w-[46%] z-0 text-xl flex flex-col gap-10">
          <span>
            It’s about how a space works, how it feels, and how it supports
            everyday life. By combining smart planning, high-quality materials,
            and a deep understanding of light, color, and form, we transform
            ideas into spaces that are beautiful, practical, and uniquely
            personal. Our goal is to create interiors that elevate experiences
            and stand the test of time.
          </span>
          <span className="flex items-center justify-start gap-2.5 text-amber-800 text-sm font-semibold">
            VIEW ALL CASES <MoveRight />{" "}
          </span>
          <div className="flex items-center justify-end mt-10">
            <img src={basin} alt="baisn imae" className="h-80" />
          </div>

          <div className="w-60 h-60 translate-0.5  bounceIn 2s ease-in-out;">
            <img src={floweDesign} alt="Flower Design" />
          </div>
        </div>

      </div>
      <div className="flex items-center justify-between mt-30">
        {data.map((e) => (
          <div>
            <img src={e} alt="client image" className="h-15  blur-sm hover:blur-none" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Aboutus;
