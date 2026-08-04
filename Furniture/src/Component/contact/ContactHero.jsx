import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const ContactHero = () => {
  return (
    <div
      className="page-hero relative w-full min-h-[45vh] md:min-h-[55vh] bg-cover bg-center text-white"
      style={{
        backgroundImage: `url('https://wgl-dsites.net/mink/wp-content/uploads/2026/02/pt-contacts.webp')`,
      }}
    >
      <div className="absolute inset-0 bg-black/30" />

      <main className="relative z-10 px-7 max-w-8xl pt-32 pb-16 md:pt-40 md:pb-20 mx-auto flex items-center md:justify-between justify-center flex-col md:flex-row gap-6">
        <div>
          <h1 className="text-4xl md:text-6xl tracking-wide uppercase">
            Contacts
          </h1>
        </div>

        <div className="flex items-center text-sm font-medium tracking-widest text-gray-200">
          <Link
            to="/"
            className="hover:text-white transition-colors hover:underline underline-offset-4"
          >
            HOME
          </Link>
          <ArrowRight className="w-4 h-4 mx-3 text-gray-400" />
          <span className="text-white underline underline-offset-4">
            CONTACTS
          </span>
        </div>
      </main>
    </div>
  );
};

export default ContactHero;
