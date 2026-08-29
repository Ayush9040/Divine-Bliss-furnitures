import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import heroImage from '../assets/sofa.webp';
import sofaOne from '../assets/home-reference/project-01.webp';
import sofaTwo from '../assets/home-reference/project-07.webp';
import diningOne from '../assets/home-reference/project-10.webp';
import diningTwo from '../assets/about-reference/service-03.webp';
import curtainOne from '../assets/home-reference/project-08.webp';
import curtainTwo from '../assets/home-reference/project-04.webp';
import mattressOne from '../assets/home-reference/project-02.webp';
import mattressTwo from '../assets/servicebg.webp';
import reclinerOne from '../assets/sofa.webp';
import reclinerTwo from '../assets/home-reference/project-03.webp';
import './Collections.css';

const collections = [
  {
    id: 'sofas',
    label: 'Sofas',
    description: [
      'Designed to be the heart of your living space, our sofas bring together inviting comfort, balanced proportions, and timeless character.',
      'Choose from considered configurations, premium upholstery, and customizable finishes to create seating that feels perfectly at home in your space.',
    ],
    items: [
      { title: 'Harmony Sectional', meta: 'Modular / Custom Upholstery', image: sofaOne },
      { title: 'Everyday Comfort', meta: 'Contemporary / Tailored Finish', image: sofaTwo },
    ],
  },
  {
    id: 'dining',
    label: 'Dining',
    description: [
      'Create a welcoming setting for everyday meals and memorable gatherings with dining furniture shaped by elegant proportions and enduring materials.',
      'From sculptural tables to supportive seating, every detail is considered for comfort, durability, and effortless entertaining.',
    ],
    items: [
      { title: 'Statement Dining', meta: 'Stone Finish / Six Seater', image: diningOne },
      { title: 'Sculpted Gathering', meta: 'Round Table / Upholstered Chairs', image: diningTwo },
    ],
  },
  {
    id: 'curtains',
    label: 'Curtains',
    description: [
      'Our bespoke curtains soften interiors, frame natural light, and introduce texture with a finish tailored precisely to your windows.',
      'Explore sheer, blackout, and layered solutions in a curated selection of fabrics, colours, and heading styles.',
    ],
    items: [
      { title: 'Layered Light', meta: 'Sheer / Full-Height Drapery', image: curtainOne },
      { title: 'Quiet Elegance', meta: 'Blackout / Tailored Finish', image: curtainTwo },
    ],
  },
  {
    id: 'mattress',
    label: 'Mattress',
    description: [
      'Thoughtfully engineered for restorative sleep, our mattresses balance responsive support, lasting comfort, and breathable materials.',
      'Multiple comfort profiles help you find the right feel while refined construction ensures dependable performance night after night.',
    ],
    items: [
      { title: 'Restful Comfort', meta: 'Responsive Support / Premium Feel', image: mattressOne },
      { title: 'Nightfall Suite', meta: 'Layered Comfort / Lasting Support', image: mattressTwo },
    ],
  },
  {
    id: 'recliners',
    label: 'Recliners',
    description: [
      'Settle into personalized comfort with recliners that combine smooth movement, supportive ergonomics, and sculptural design.',
      'Available in refined fabrics and finishes, each piece is designed to provide a relaxing experience without compromising the room around it.',
    ],
    items: [
      { title: 'Sculptural Recliner', meta: 'Ergonomic / Statement Form', image: reclinerOne },
      { title: 'Relaxed Lounge', meta: 'Deep Comfort / Refined Finish', image: reclinerTwo },
    ],
  },
];

export default function Collections() {
  const [activeCollectionId, setActiveCollectionId] = useState('sofas');
  const activeCollection = collections.find(({ id }) => id === activeCollectionId);

  return (
    <main className="collections-page">
      <section
        className="collections-hero page-hero"
        style={{ backgroundImage: `linear-gradient(rgba(18, 18, 18, .5), rgba(18, 18, 18, .5)), url(${heroImage})` }}
      >
        <div className="collections-hero__inner">
          <h1>Collections</h1>
          <nav className="collections-hero__breadcrumbs" aria-label="Breadcrumb">
            <a href="/">Home</a>
            <ArrowRight aria-hidden="true" />
            <span>Collections</span>
          </nav>
        </div>
      </section>

      <section className="collections-showcase" aria-labelledby="collections-showcase-title">
        <div className="collections-showcase__shell">
          <div className="collections-showcase__eyebrow"><i /> Our Collections</div>
          <h2 id="collections-showcase-title">
            A Curated Selection of Our Architectural and Interior Projects
          </h2>

          <div className="collections-showcase__intro">
            <h3>Designed to Complement Every Space</h3>
            <p>
              Furniture is more than what fills a room, it&apos;s what gives it character. Explore thoughtfully designed collections that bring together exceptional craftsmanship, timeless aesthetics, and everyday comfort.
            </p>
          </div>

          <div className="collections-tabs" role="tablist" aria-label="Furniture collections">
            {collections.map(({ id, label }) => (
              <button
                type="button"
                id={`collection-tab-${id}`}
                role="tab"
                aria-selected={activeCollectionId === id}
                aria-controls={`collection-panel-${id}`}
                tabIndex={activeCollectionId === id ? 0 : -1}
                className={activeCollectionId === id ? 'is-active' : ''}
                key={id}
                onClick={() => setActiveCollectionId(id)}
              >
                {label}
              </button>
            ))}
          </div>

          <div
            id={`collection-panel-${activeCollection.id}`}
            className="collections-panel"
            role="tabpanel"
            aria-labelledby={`collection-tab-${activeCollection.id}`}
            key={activeCollection.id}
          >
            <div className="collections-panel__description">
              <span>Description</span>
              <h3>{activeCollection.label}</h3>
              {activeCollection.description.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>

            <div className="collections-grid">
              {activeCollection.items.map((item) => (
                <article className="collection-card" key={item.title}>
                  <div className="collection-card__image">
                    <img src={item.image} alt={`${item.title} from the ${activeCollection.label} collection`} loading="lazy" />
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.meta.replace(' / ', '  ○  ')}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
