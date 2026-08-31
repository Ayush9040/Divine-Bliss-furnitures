import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import heroSofa from '../assets/home_page_hero_banner_1.png';
import buildingSketch from '../assets/building.webp';
import aboutChair from '../assets/intro_recliner.png';
import aboutBasin from '../assets/intro_curtain.png';
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
import project03 from '../assets/home-reference/project-03.webp';
import featuredSofa from '../assets/fc_sofa.png';
import featuredDining from '../assets/fc_dining.png';
import featuredRecliner from '../assets/fc_recliner.png';
import featuredMattress from '../assets/fc_mattress.png';
import team01 from '../assets/home-reference/team-01.webp';
import team02 from '../assets/home-reference/team-02.webp';
import team03 from '../assets/home-reference/team-03.webp';
import team04 from '../assets/home-reference/team-04.webp';
import architecture01 from '../assets/why_divine_bliss.webp';
import architecture02 from '../assets/bespoke_exp.webp';
import architecture03 from '../assets/visit_showroom.webp';
import benefitsCraftsmanship from '../assets/1.webp';
import benefitsSofa from '../assets/2.webp';
import HomeFaq from '../Component/Home/HomeFaq';
import './Home.css';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    number: '01',
    title: 'Craftsmanship',
    copy: "True craftsmanship isn't just seen, it's experienced. From the first sketch to the final finish, every Divine Bliss creation reflects our commitment to quality, attention to detail, and timeless design.",
    ctaLabel: 'Explore Craftsmanship',
    href: '/craftsmanship',
    image: service1,
    tone: 'rust',
  },
  {
    number: '02',
    title: 'Materials',
    copy: 'Every detail matters. From the fabrics you touch to the finishes you see, the materials behind every Divine Bliss creation are carefully chosen to deliver lasting comfort, enduring quality, and timeless appeal.',
    ctaLabel: 'Explore Materials',
    href: '/materials',
    image: service2,
    tone: 'stone',
  },
  {
    number: '03',
    title: 'Bespoke',
    copy: 'Your home is unlike any other, and your furniture should be too. At Divine Bliss, we offer bespoke solutions that allow you to create pieces tailored to your space, your style, and the way you live.',
    ctaLabel: 'Explore Bespoke',
    href: '/bespoke',
    image: service3,
    tone: 'white',
  },
];

const projects = [
  {
    id: 'sofas',
    title: 'Sofas',
    description: 'Designed to be the heart of your living space, our sofas combine inviting comfort with timeless design and customizable finishes.',
    ctaLabel: 'Explore Sofas',
    href: '/collections',
    image: featuredSofa,
  },
  {
    id: 'dining',
    title: 'Dining',
    description: 'Create memorable gatherings around dining furniture crafted with elegant proportions, lasting materials, and exceptional attention to detail.',
    ctaLabel: 'Explore Dining',
    href: '/collections',
    image: featuredDining,
  },
  {
    id: 'curtains',
    title: 'Curtains',
    description: 'Complete your interiors with bespoke curtains tailored to your space, adding softness, texture, and effortless sophistication.',
    ctaLabel: 'Explore Curtains',
    href: '/collections',
    image: project03,
  },
  {
    id: 'sofas-copy-one',
    title: 'Recliners',
    description: 'Designed to be the heart of your living space, our sofas combine inviting comfort with timeless design and customizable finishes.',
    ctaLabel: 'Explore Recliners',
    href: '/collections',
    image: featuredRecliner,
  },
  {
    id: 'sofas-copy-two',
    title: 'Mattress',
    description: 'Designed to be the heart of your living space, our sofas combine inviting comfort with timeless design and customizable finishes.',
    ctaLabel: 'Explore Mattress',
    href: '/collections',
    image: featuredMattress,
  },
];

const loopedProjects = [...projects, ...projects];
const SHOW_TEAM_SECTION = false;

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
    quote: 'We just followed his advise and the outcome is at the next level. He has designed our sofa so beautifully.',
    name: 'Shashidhar Hn',
    role: 'Google Review · 5 Stars',
    initials: 'SH',
  },
  {
    quote: "It's a wonderful company with good quality of leather sofas and better installations of products. You can afford the products without any doubts.",
    name: 'Ramanareddy Ravana',
    role: 'Google Review · 5 Stars',
    initials: 'RR',
  },
  {
    quote: 'Excellent leather quality, unique designs at best Prices, quick delivery & Professional installation...worth the visit',
    name: 'Tanushree Tanu',
    role: 'Google Review · 5 Stars',
    initials: 'TT',
  },
  {
    quote: 'Good hospitality and they actually understands your need. They don’t make the selection process complicated and show you why you need.',
    name: 'Anurag Anand',
    role: 'Google Review · 5 Stars',
    initials: 'AA',
  },
  {
    quote: "The Best place to get Customized sofa's with Brand leather and luxurious seating",
    name: 'Pavankalyan Reddy',
    role: 'Google Review · 5 Stars',
    initials: 'PR',
  },
  {
    quote: 'Very good service, fast delivery, excellent quality and Very comfortable sofas. Very happy with the overall experience.',
    name: 'Ananya Anand',
    role: 'Google Review · 5 Stars',
    initials: 'AA',
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
  const [projectInstant, setProjectInstant] = useState(false);
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

  const showPreviousProjects = () => {
    if (projectPage > 0) {
      setProjectPage((current) => current - 1);
      return;
    }

    setProjectInstant(true);
    setProjectPage(projects.length);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setProjectInstant(false);
        setProjectPage(projects.length - 1);
      });
    });
  };

  const showNextProjects = () => setProjectPage((current) => Math.min(current + 1, projects.length));

  const resetProjectLoop = (event) => {
    if (event.target !== event.currentTarget || event.propertyName !== 'transform' || projectPage !== projects.length) return;
    setProjectInstant(true);
    setProjectPage(0);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setProjectInstant(false));
    });
  };

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

  const resetTestimonialLoop = (event) => {
    if (
      event.target !== event.currentTarget
      || event.propertyName !== 'transform'
      || testimonialIndex !== testimonials.length
    ) return;

    setTestimonialInstant(true);
    setTestimonialIndex(0);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setTestimonialInstant(false));
    });
  };

  return (
    <main ref={pageRef} className="mink-home">
      <section ref={heroRef} className="mink-hero" aria-labelledby="home-hero-title">
        <div className="mink-hero-sketch" ref={sketchRef} style={{ backgroundImage: `url(${buildingSketch})` }} />
        <div className="mink-wide-shell mink-hero-copy">
          <h1 id="home-hero-title" className="mink-hero-title">
            <span><SplitText>Crafted For</SplitText></span>
            <span><SplitText>Beautiful Living</SplitText></span>
          </h1>
          <div className="mink-hero-info">
            <p>
              From Statement Sofas To Elegant Dining Furniture And Bespoke Curtains, Divine Bliss Creates Thoughtfully
              <span className="mink-hero-info-second-line">
                Designed Pieces That Bring Comfort, Character, And Timeless Style Into Every Home.
              </span>
            </p>
            <Link to="/about">More About Us <InlineArrow /></Link>
          </div>
        </div>
      </section>

      <div className="mink-hero-image">
        <img src={heroSofa} alt="Contemporary taupe sectional sofa in a warm neutral living room" />
      </div>

      <section id="about" ref={aboutRef} className="mink-about mink-shell">
        <div className="mink-section-heading" data-reveal>
          <span className="mink-eyebrow"><i /> Brand Introduction</span>
          <h2>Designed Around<span className="mink-about-title-second-line"> the Way You Live</span></h2>
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
              {/* Services page CTA is intentionally disabled for now. */}
              {/* <a className="mink-outline-button" href="/services">View All Services <InlineArrow /></a> */}
            </div>
            <div className="mink-service-stack">
              {services.map((service, index) => (
                <article className={`mink-service-card mink-service-card--${service.tone}`} key={service.number} style={{ zIndex: index + 1 }}>
                  <img className="mink-service-art" src={service.image} alt="" aria-hidden="true" />
                  <span className="mink-service-number">{service.number}</span>
                  <div className="mink-service-copy">
                    <h3>{service.title}</h3>
                    <p>{service.copy}</p>
                    <a href={service.href}>{service.ctaLabel} <InlineArrow /></a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="mink-projects">
        <h2 className="mink-projects-title">
          <span className="mink-projects-title-line"><SplitText>Featured</SplitText></span>{' '}
          <span className="mink-projects-title-line"><SplitText>Collections</SplitText></span>
        </h2>
        <div className="mink-project-window">
          <div
            className={`mink-project-track ${projectInstant ? 'is-instant' : ''}`}
            style={{
              '--project-desktop': `calc(-${projectPage * (100 / 3)}% - ${projectPage * 14}px)`,
              '--project-tablet': `calc(-${projectPage * 50}% - ${projectPage * 12}px)`,
              '--project-mobile': `calc(-${projectPage * 100}% - ${projectPage * 24}px)`,
            }}
            onTransitionEnd={resetProjectLoop}
          >
            {loopedProjects.map((project, index) => (
              <article className="mink-project" key={`${project.id}-${index < projects.length ? 'original' : 'loop'}`}>
                <div className="mink-project-image"><img src={project.image} alt={`${project.title} interior`} /></div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <a className="mink-project-cta" href={project.href}>{project.ctaLabel} <InlineArrow /></a>
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
              <div className="mink-benefits-photo mink-benefits-photo-primary">
                <img src={benefitsCraftsmanship} alt="Furniture designer selecting leather for a sofa" />
              </div>
              <div className="mink-benefits-photo mink-benefits-photo-secondary">
                <img src={benefitsSofa} alt="Finished brown leather Chesterfield sofa" />
              </div>
            </div>

            <div className="mink-benefits-copy">
              <p>Whether you're furnishing a single room or designing your entire home.
              Divine Bliss is here to help you create spaces that are beautiful, comfortable, and distinctly yours.</p>
              {/* Services page CTA is intentionally disabled for now. */}
              {/* <a href="/services">Let's Create Your Space <InlineArrow /></a> */}
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
              '--testimonial-desktop': `calc(-${testimonialIndex * (100 / 3)}% - ${testimonialIndex * 8}px)`,
              '--testimonial-tablet': `calc(-${testimonialIndex * 50}% - ${testimonialIndex * 10}px)`,
              '--testimonial-mobile': `calc(-${testimonialIndex * 100}% - ${testimonialIndex * 16}px)`,
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
                <blockquote>&ldquo;{testimonial.quote}&rdquo;</blockquote>
                <div className="mink-testimonial-author">
                  <span className="mink-testimonial-avatar" aria-hidden="true">{testimonial.initials}</span>
                  <div>
                    <h3 title={testimonial.name}>{testimonial.name}</h3>
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

      {/* Temporarily hidden; change SHOW_TEAM_SECTION to true to restore this section. */}
      {SHOW_TEAM_SECTION && (
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
      )}

      <HomeFaq />
    </main>
  );
}
