import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import heroSofa from '../assets/sofaImage.webp';
import buildingSketch from '../assets/building.webp';
import aboutChair from '../assets/sofa.webp';
import aboutBasin from '../assets/basin.webp';
import aboutLight from '../assets/flowerDesign.webp';
import client1 from '../assets/clients-1.webp';
import client2 from '../assets/clients-2.webp';
import client3 from '../assets/clients-3.webp';
import client4 from '../assets/clients-4.webp';
import client5 from '../assets/clients-5.webp';
import client6 from '../assets/clients-6.webp';
import service1 from '../assets/home-reference/service-blueprint-1.webp';
import service2 from '../assets/home-reference/service-blueprint-2.webp';
import service3 from '../assets/home-reference/service-blueprint-3.webp';
import project01 from '../assets/home-reference/project-01.webp';
import project02 from '../assets/home-reference/project-02.webp';
import project03 from '../assets/home-reference/project-03.webp';
import team01 from '../assets/home-reference/team-01.webp';
import team02 from '../assets/home-reference/team-02.webp';
import team03 from '../assets/home-reference/team-03.webp';
import team04 from '../assets/home-reference/team-04.webp';
import architecture01 from '../assets/home-reference/architecture-01.webp';
import architecture02 from '../assets/home-reference/architecture-02.webp';
import architecture03 from '../assets/home-reference/architecture-03.webp';
import benefitsTeam from '../assets/home-reference/benefits-team.webp';
import testimonial01 from '../assets/home-reference/testimonial-01.webp';
import testimonial02 from '../assets/home-reference/testimonial-02.webp';
import testimonial03 from '../assets/home-reference/testimonial-03.webp';
import testimonial04 from '../assets/home-reference/testimonial-04.webp';
import HomeFaq from '../Component/Home/HomeFaq';
import './Home.css';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    number: '01',
    title: 'Residential Interior Design',
    copy: 'We create comfortable, stylish homes that reflect your personality and lifestyle. From concept to completion, every detail is thoughtfully designed to feel personal and functional.',
    image: service1,
    tone: 'rust',
  },
  {
    number: '02',
    title: 'Space Planning & Layout',
    copy: 'Smart planning is the foundation of great design. We optimize layouts to maximize space, improve functionality, and create seamless movement throughout the interior.',
    image: service2,
    tone: 'stone',
  },
  {
    number: '03',
    title: 'Furniture & Material Selection',
    copy: 'We create comfortable, stylish homes that reflect your personality and lifestyle. From concept to completion, every detail is thoughtfully designed to feel personal and functional.',
    image: service3,
    tone: 'white',
  },
];

const projects = [
  ['Sofas', 'Designed to be the heart of your living space, our sofas combine inviting comfort with timeless design and customizable finishes.', 'Explore Sofas', project01],
  ['Dining', 'Create memorable gatherings around dining furniture crafted with elegant proportions, lasting materials, and exceptional attention to detail.', 'Dining', project02],
  ['Curtains', 'Complete your interiors with bespoke curtains tailored to your space, adding softness, texture, and effortless sophistication', 'Curtains', project03],
//   ['Emerald Heights', 'Furniture', 'Interior', project04],
//   ['Urban Apartment', 'Furniture', 'Space', project05],
//   ['Modern Loft', 'Architecture', 'Planning', project06],
//   ['City Penthouse', 'Furniture', 'Planning', project07],
//   ['Downtown Loft', 'Furniture', 'Space', project08],
//   ['Garden House', 'Interior', 'Space', project09],
//   ['Compact Living', 'Interior', 'Space', project10],
//   ['Open-Plan Home', 'Architecture', 'Planning', project11],
//   ['Coastal Home', 'Architecture', 'Interior', project12],
];

const team = [
  ['Sandra Lee', 'Creative Director', team01],
  ['Christina Grant', 'Lead Interior Designer', team02],
  ['Matey Black', 'Space Planner', team03],
  ['Mary Petterson', '3D Visualizer / CGI Artist', team04],
];

const architectureSolutions = [
  {
    number: '01',
    title: 'Why Divine Bliss',
    copy: "Great furniture begins long before it reaches your home. From carefully selected materials to precision manufacturing and meticulous finishing, every Divine Bliss piece is created with a commitment to quality that can be seen, felt, and experienced every day. Because luxury isn't defined by excess, it's defined by how beautifully something is made.",
    image: architecture01,
  },
  {
    number: '02',
    title: 'Bespoke Experience',
    copy: "No two homes are alike, and your furniture shouldn't be either. Choose from a curated selection of fabrics, colours, finishes, dimensions, and configurations to create pieces that fit your space perfectly. Our team works closely with you to ensure every detail reflects your style and requirements.",
    image: architecture02,
  },
  {
    number: '03',
    title: 'Visit the Showroom',
    copy: "The comfort of a sofa. The texture of a fabric. The craftsmanship behind every detail. These are best experienced firsthand. Visit our showroom to explore our collections, discover material options, and receive expert guidance in creating furniture that's tailored to your home.",
    image: architecture03,
  },
];

const testimonials = [
  {
    quote: 'We would highly recommend this agency to anyone looking for high-quality interior design.',
    name: 'Christian Grant',
    role: 'Company Client',
    image: testimonial01,
  },
  {
    quote: 'The team guided us through every decision, making the entire experience enjoyable and inspiring.',
    name: 'Monika Morison',
    role: 'Company Client',
    image: testimonial02,
  },
  {
    quote: 'The designers combined creativity with practicality and delivered a space that truly reflects our lifestyle.',
    name: 'Marry Parton',
    role: 'Company Client',
    image: testimonial03,
  },
  {
    quote: 'Every detail was thoughtfully considered, and the final result feels both beautiful and functional.',
    name: 'Matey Grant',
    role: 'Company Client',
    image: testimonial04,
  },
];

const SplitText = ({ children }) => (
  <>
    {[...children].map((letter, index) => (
      <span className="mink-letter-mask" key={`${letter}-${index}`}>
        <span className="mink-letter">{letter === ' ' ? '\u00a0' : letter}</span>
      </span>
    ))}
  </>
);

const InlineArrow = () => <ArrowRight aria-hidden="true" size={21} strokeWidth={1.5} />;

export default function Home() {
  const pageRef = useRef(null);
  const heroRef = useRef(null);
  const sketchRef = useRef(null);
  const aboutRef = useRef(null);
  const aboutChairRef = useRef(null);
  const aboutBasinRef = useRef(null);
  const aboutLightRef = useRef(null);
  const serviceRef = useRef(null);
  const servicePinRef = useRef(null);
  const [projectPage, setProjectPage] = useState(0);
  const [hoveredTeam, setHoveredTeam] = useState(0);
  const [activeArchitecture, setActiveArchitecture] = useState(0);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [testimonialInstant, setTestimonialInstant] = useState(false);

  const clientLogos = useMemo(
    () => [client1, client2, client3, client4, client5, client6],
    [],
  );

  useEffect(() => {
    const root = pageRef.current;
    if (!root) return undefined;

    const context = gsap.context(() => {
      const heroLetters = root.querySelectorAll('.mink-hero-title .mink-letter');
      gsap.fromTo(
        heroLetters,
        { yPercent: 115, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.8, stagger: 0.075, ease: 'power3.out', delay: 0.2 },
      );

      gsap.fromTo(
        root.querySelectorAll('.mink-hero-info, .mink-hero-image'),
        { y: 34, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.14, ease: 'power3.out', delay: 0.55 },
      );

      root.querySelectorAll('[data-reveal]').forEach((element) => {
        gsap.fromTo(
          element,
          { y: 45, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.95,
            ease: 'power3.out',
            scrollTrigger: { trigger: element, start: 'top 86%', once: true },
          },
        );
      });

      const portfolioLetters = root.querySelectorAll('.mink-projects-title .mink-letter');
      gsap.fromTo(
        portfolioLetters,
        { yPercent: 120, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.055,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.mink-projects-title', start: 'top 88%', once: true },
        },
      );

      const media = gsap.matchMedia();
      media.add('(prefers-reduced-motion: no-preference)', () => {
        const benefitsSection = root.querySelector('.mink-benefits');
        const benefitsLayout = benefitsSection?.querySelector('.mink-benefits-layout');
        if (!benefitsSection || !benefitsLayout) return undefined;

        const eyebrow = benefitsSection.querySelector('.mink-benefits-eyebrow');
        const title = benefitsSection.querySelector('.mink-benefits-title');
        const visual = benefitsSection.querySelector('.mink-benefits-visual');
        const copy = benefitsSection.querySelector('.mink-benefits-copy');

        gsap.set(eyebrow, { x: -70, opacity: 0 });
        gsap.set(title, { x: 100, opacity: 0 });
        gsap.set(visual, { x: -150, opacity: 0 });
        gsap.set(copy, { x: 150, opacity: 0 });

        const timeline = gsap.timeline({ paused: true });

        timeline
          .to(eyebrow, { x: 0, opacity: 1, duration: 0.72, ease: 'power3.out' })
          .to(title, { x: 0, opacity: 1, duration: 0.9, ease: 'power3.out' }, '<0.08')
          .to(visual, { x: 0, opacity: 1, duration: 1.05, ease: 'power3.out' }, '-=0.35')
          .to(copy, { x: 0, opacity: 1, duration: 1.05, ease: 'power3.out' }, '<0.08');

        const observer = new IntersectionObserver(
          ([entry]) => {
            if (!entry.isIntersecting) return;
            timeline.play();
            observer.disconnect();
          },
          { threshold: 0.08, rootMargin: '0px 0px -8% 0px' },
        );

        observer.observe(benefitsLayout);

        return () => {
          observer.disconnect();
          timeline.kill();
        };
      });

      media.add('(min-width: 901px)', () => {
        const cards = gsap.utils.toArray('.mink-service-card', serviceRef.current);
        const travel = () => Math.max(window.innerHeight, 760);
        gsap.set(cards.slice(1), { y: travel });

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: serviceRef.current,
            start: 'top top',
            end: () => `+=${Math.max(window.innerHeight * 1.45, 1150)}`,
            pin: servicePinRef.current,
            pinSpacing: true,
            scrub: 0.55,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        timeline
          .to(cards[1], { y: 86, duration: 1, ease: 'none' })
          .to(cards[2], { y: 172, duration: 1, ease: 'none' });

        return () => timeline.scrollTrigger?.kill();
      });

      media.add('(min-width: 1024px)', () => {
        const parallaxItems = [
          gsap.fromTo(aboutChairRef.current, { y: -67 }, {
            y: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: aboutRef.current,
              start: 'top top',
              end: '+=840',
              scrub: 1,
              invalidateOnRefresh: true,
            },
          }),
          gsap.fromTo(aboutBasinRef.current, { y: -128 }, {
            y: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: aboutRef.current,
              start: 'top top',
              end: '+=915',
              scrub: 1,
              invalidateOnRefresh: true,
            },
          }),
          gsap.fromTo(aboutLightRef.current, { y: 200 }, {
            y: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: aboutRef.current,
              start: 'top top',
              end: '+=1000',
              scrub: 1,
              invalidateOnRefresh: true,
            },
          }),
        ];

        return () => parallaxItems.forEach((animation) => animation.scrollTrigger?.kill());
      });

      requestAnimationFrame(() => ScrollTrigger.refresh());
    }, root);

    const moveSketch = (event) => {
      if (!heroRef.current || !sketchRef.current || window.innerWidth < 901) return;
      const bounds = heroRef.current.getBoundingClientRect();
      gsap.to(sketchRef.current, {
        x: (event.clientX - bounds.left - bounds.width / 2) * 0.018,
        y: (event.clientY - bounds.top - bounds.height / 2) * 0.018,
        duration: 0.8,
        overwrite: 'auto',
      });
    };

    const hero = heroRef.current;
    hero?.addEventListener('pointermove', moveSketch);

    return () => {
      hero?.removeEventListener('pointermove', moveSketch);
      context.revert();
    };
  }, []);

  const showPreviousProjects = () => setProjectPage((current) => (current + projects.length - 1) % projects.length);
  const showNextProjects = () => setProjectPage((current) => (current + 1) % projects.length);

  const showPreviousTestimonial = () => {
    if (testimonialIndex > 0) {
      setTestimonialIndex((current) => current - 1);
      return;
    }

    setTestimonialInstant(true);
    setTestimonialIndex(testimonials.length);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setTestimonialInstant(false);
        setTestimonialIndex(testimonials.length - 1);
      });
    });
  };

  const showNextTestimonial = () => setTestimonialIndex((current) => Math.min(current + 1, testimonials.length));

  const resetTestimonialLoop = () => {
    if (testimonialIndex !== testimonials.length) return;
    setTestimonialInstant(true);
    setTestimonialIndex(0);
    requestAnimationFrame(() => setTestimonialInstant(false));
  };

  return (
    <main ref={pageRef} className="mink-home">
      <section ref={heroRef} className="mink-hero" aria-labelledby="home-hero-title">
        <div className="mink-hero-sketch" ref={sketchRef} style={{ backgroundImage: `url(${buildingSketch})` }} />
        <div className="mink-wide-shell mink-hero-copy">
          <h1 id="home-hero-title" className="mink-hero-title">
            <span><SplitText>Crafted for</SplitText></span>
            <span><SplitText>Beautiful Living</SplitText></span>
          </h1>
          <div className="mink-hero-info">
            <p>From statement sofas to elegant dining furniture and bespoke curtains, Divine Bliss creates thoughtfully designed pieces that bring comfort, character, and timeless style into every home.</p>
            <a href="#about">More About Us <InlineArrow /></a>
          </div>
        </div>
      </section>

      <div className="mink-hero-image">
        <img src={heroSofa} alt="Warm modern living room with a sculptural cream sofa" />
      </div>

      <section id="about" ref={aboutRef} className="mink-about mink-shell">
        <div className="mink-section-heading" data-reveal>
          <span className="mink-eyebrow"><i /> Brand Introduction</span>
          <h2>Designed Around the Way You Live</h2>
        </div>
        <div className="mink-about-grid">
          <div className="mink-about-column" data-reveal>
            <p className="mink-about-lead">We believe great design goes beyond aesthetics.</p>
            <img ref={aboutChairRef} className="mink-about-chair" src={aboutChair} alt="Sculptural brown lounge chair in a finished interior" />
          </div>
          <div className="mink-about-column mink-about-copy" data-reveal>
            <p>Since 2016, Divine Bliss has been creating furniture that does more than complete a room, it transforms the way people experience their homes.
Every sofa, dining set, and curtain is thoughtfully designed with a balance of comfort, functionality, and refined aesthetics. Whether you're furnishing a new home or reimagining an existing space, our pieces are made to reflect your lifestyle, your taste, and your vision.
</p>
            <a className="mink-text-link" href="#projects">Discover Our Story <InlineArrow /></a>
            <div className="mink-about-collage">
              <img ref={aboutLightRef} src={aboutLight} alt="Sculptural ceiling light" />
              <img ref={aboutBasinRef} src={aboutBasin} alt="White marble basin detail" />
            </div>
          </div>
        </div>
      </section>

      <div className="mink-client-strip" aria-label="Selected clients">
        <div className="mink-client-track">
          {clientLogos.map((logo, index) => (
            <div className="mink-client-item" key={logo}>
              <img src={logo} alt={`Client ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>

      <section ref={serviceRef} className="mink-services" id="services">
        <div ref={servicePinRef} className="mink-services-pin">
          <div className="mink-services-layout mink-shell">
            <div className="mink-services-intro">
              <span className="mink-eyebrow mink-eyebrow-light"><i /> Design Solutions</span>
              <h2>Design Services<br />Tailored to Your<br />Space</h2>
              <a className="mink-outline-button" href="/services">View All Services <InlineArrow /></a>
            </div>
            <div className="mink-service-stack">
              {services.map((service, index) => (
                <article className={`mink-service-card mink-service-card--${service.tone}`} key={service.number} style={{ zIndex: index + 1 }}>
                  <img className="mink-service-art" src={service.image} alt="" aria-hidden="true" />
                  <span className="mink-service-number">{service.number}</span>
                  <div className="mink-service-copy">
                    <h3>{service.title}</h3>
                    <p>{service.copy}</p>
                    <a href="/about">More About Us <InlineArrow /></a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="mink-projects">
        <h2 className="mink-projects-title"><SplitText>Featured Collections</SplitText></h2>
        <div className="mink-project-window">
          <div
            className="mink-project-track"
            style={{
              '--project-desktop': `calc(-${projectPage * (100 / 3)}% - ${projectPage * 14}px)`,
              '--project-tablet': `calc(-${projectPage * 50}% - ${projectPage * 12}px)`,
              '--project-mobile': `calc(-${projectPage * 100}% - ${projectPage * 24}px)`,
            }}
          >
            {projects.map(([title, categoryA, categoryB, image]) => (
              <article className="mink-project" key={title}>
                <div className="mink-project-image"><img src={image} alt={`${title} interior`} /></div>
                <h3>{title}</h3>
                <p>{categoryA}</p>
                <p>{categoryB}</p>
              </article>
            ))}
          </div>
        </div>
        <div className="mink-project-controls">
          <button type="button" onClick={showPreviousProjects} aria-label="Previous projects"><ArrowLeft /></button>
          <button type="button" onClick={showNextProjects} aria-label="Next projects"><ArrowRight /></button>
        </div>
      </section>

      <section className="mink-benefits" aria-labelledby="mink-benefits-title">
        <div className="mink-benefits-shell">
          <span className="mink-eyebrow mink-benefits-eyebrow"><i /> Benefits Beyond Aesthetics</span>
          <h2 id="mink-benefits-title" className="mink-benefits-title">
            Every Home Deserves Furniture That
<br className="mink-benefits-title-break" />Feels Like It Belongs
          </h2>

          <div className="mink-benefits-layout">
            <div className="mink-benefits-visual">
              <svg className="mink-benefits-blueprint" viewBox="0 0 420 420" aria-hidden="true">
                <circle cx="210" cy="210" r="206" />
                <path d="M64 116h232v54h58v140H132v-42H64z" />
                <path d="M92 139h172v102H92zm172 31h64v71h-64zm-132 102h92v37h-92z" />
                <path d="M112 139v102m48-102v102m52-102v102m52-39h64M92 190h172M178 241v68" />
                <path d="M76 96l248 248M101 73l247 247M46 144l230 230" />
                <path d="M44 334h321M76 362h246M334 92v268" />
                <path d="M122 156a20 20 0 0 1 20 20M224 205a23 23 0 0 0 23 23M287 273a18 18 0 0 1 18-18" />
                <circle cx="142" cy="176" r="4" />
                <circle cx="247" cy="228" r="4" />
                <circle cx="305" cy="255" r="4" />
              </svg>
              <div className="mink-benefits-photo">
                <img src={benefitsTeam} alt="Interior architects collaborating over detailed floor plans" />
              </div>
            </div>

            <div className="mink-benefits-copy">
              <p>Whether you're furnishing a single room or designing your entire home.
              Divine Bliss is here to help you create spaces that are beautiful, comfortable, and distinctly yours.</p>
              <a href="/services">Let's Create Your Space <InlineArrow /></a>
            </div>
          </div>
        </div>
      </section>

      <section id="craftsmanship" className="mink-architecture">
        <div className="mink-architecture-heading" data-reveal>
          <span className="mink-eyebrow mink-architecture-eyebrow"><i /> Smth Little About Us</span>
          <h2>End-to-End Architectural Solutions</h2>
        </div>
        <div className="mink-architecture-frame">
          <div className="mink-architecture-accordion" data-reveal>
            {architectureSolutions.map((solution, index) => (
              <article
                className={`mink-architecture-panel ${activeArchitecture === index ? 'is-active' : ''}`}
                key={solution.number}
                tabIndex={0}
                aria-expanded={activeArchitecture === index}
                onMouseEnter={() => setActiveArchitecture(index)}
                onFocus={() => setActiveArchitecture(index)}
                onClick={() => setActiveArchitecture(index)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    setActiveArchitecture(index);
                  }
                }}
              >
                <img className="mink-architecture-image" src={solution.image} alt="" aria-hidden="true" />
                <div className="mink-architecture-overlay" />
                <div className="mink-architecture-panel-inner">
                  <span className="mink-architecture-number">{solution.number}</span>
                  <div className="mink-architecture-copy">
                    <h3>{solution.title}</h3>
                    <p>{solution.copy}</p>
                    <a href="/about">Explore More</a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mink-testimonials" aria-labelledby="mink-testimonials-title">
        <div className="mink-testimonials-heading mink-shell" data-reveal>
          <span className="mink-eyebrow"><i /> From Concept to Completion</span>
          <h2 id="mink-testimonials-title">What Clients Say</h2>
        </div>
        <div className="mink-testimonials-window" data-reveal>
          <div
            className={`mink-testimonials-track ${testimonialInstant ? 'is-instant' : ''}`}
            onTransitionEnd={resetTestimonialLoop}
            style={{
              '--testimonial-desktop': `calc(-${testimonialIndex * 25}% - ${testimonialIndex * 7.5}px)`,
              '--testimonial-tablet': `calc(-${testimonialIndex * 50}% - ${testimonialIndex * 15}px)`,
              '--testimonial-mobile': `calc(-${testimonialIndex * 100}% - ${testimonialIndex * 30}px)`,
            }}
          >
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <article
                className="mink-testimonial-card"
                key={`${testimonial.name}-${index}`}
                role="group"
                aria-label={`${(index % testimonials.length) + 1} of ${testimonials.length}`}
                aria-hidden={index >= testimonials.length}
              >
                <blockquote>“{testimonial.quote}”</blockquote>
                <div className="mink-testimonial-author">
                  <img src={testimonial.image} alt={index < testimonials.length ? `${testimonial.name} portrait` : ''} />
                  <div>
                    <h3>{testimonial.name}</h3>
                    <p>{testimonial.role}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
        <div className="mink-testimonial-controls" data-reveal>
          <button type="button" onClick={showPreviousTestimonial} aria-label="Previous testimonial"><ArrowLeft /></button>
          <button type="button" onClick={showNextTestimonial} aria-label="Next testimonial"><ArrowRight /></button>
        </div>
      </section>

      <section className="mink-team mink-shell">
        <div className="mink-section-heading mink-team-heading" data-reveal>
          <span className="mink-eyebrow"><i /> The People Behind the Design</span>
          <h2>The Minds and Hands Behind Our Signature Interiors</h2>
        </div>
        <div className="mink-team-list">
          {team.map(([name, role, image], index) => (
            <article
              className={`mink-team-member ${hoveredTeam === index ? 'is-active' : ''}`}
              key={name}
              onMouseEnter={() => setHoveredTeam(index)}
              onFocus={() => setHoveredTeam(index)}
            >
              <div className="mink-team-name">
                <h3>{name}</h3>
                <span>/</span>
                <p>{role}</p>
                <img src={image} alt={`${name}, ${role}`} />
              </div>
              <a href="/about">Read More</a>
            </article>
          ))}
        </div>
      </section>

      <HomeFaq />
    </main>
  );
}
