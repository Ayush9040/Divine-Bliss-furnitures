import AboutStatsSection from './AboutStatsSection';
import './BrandPrinciplesSection.css';

export const principles = [
  {
    title: 'More Than Furniture',
    paragraphs: [
      "At Divine Bliss, we don't simply manufacture sofas, dining furniture, and curtains—we create pieces that become part of everyday life.",
      'From quiet mornings on your favourite sofa to celebrations around the dining table, every product is designed to support the moments that matter most.',
      "By combining thoughtful design, quality materials, and meticulous craftsmanship, we create furniture that's made to be lived with for years to come.",
    ],
  },
  {
    title: 'Designed with Purpose',
    paragraphs: [
      "Good design isn't about following trends.",
      "It's about creating furniture that feels relevant today and timeless tomorrow.",
      'Every collection is developed with careful attention to proportion, comfort, functionality, and aesthetics, allowing each piece to complement modern homes while maintaining its own distinct character.',
    ],
  },
  {
    title: 'Crafted with Precision',
    paragraphs: [
      'Behind every Divine Bliss creation is a commitment to quality.',
      'Every stage, from selecting materials and refining designs to manufacturing and finishing, is approached with precision and care. Our focus is simple: create furniture that not only looks exceptional but performs beautifully in everyday living.',
      "It's this attention to detail that defines every piece we make.",
    ],
  },
  {
    title: 'Built Around Your Vision',
    paragraphs: [
      'No two homes are alike.',
      "That's why customization is at the heart of what we do.",
      "Whether it's selecting fabrics, finishes, dimensions, or configurations, we work with you to create furniture that feels like it was always meant to belong in your space.",
      "Because the best interiors aren't copied, they're created.",
    ],
  },
  {
    title: 'Looking Ahead',
    paragraphs: [
      'As homes continue to evolve, so do we.',
      "We're committed to designing furniture that reflects contemporary lifestyles while staying rooted in quality craftsmanship, thoughtful design, and lasting comfort.",
      "Every collection we create is another step toward helping people build homes they'll love living in.",
    ],
  },
];

export default function BrandPrinciplesSection() {
  return (
    <section className="about-principles" aria-labelledby="about-principles-title">
      <h2 id="about-principles-title" className="about-principles__heading">What Defines Divine Bliss</h2>

      <div className="about-principles__inner">
        {principles.map(({ title, paragraphs }, index) => (
          <article className="about-principle" key={title}>
            <div className="about-principle__card">
              <span className="about-principle__number" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3>{title}</h3>
              <div className="about-principle__copy">
                {paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
            </div>
          </article>
        ))}
      </div>

      <AboutStatsSection />

      <blockquote className="about-principles__quote">
        "Beautiful spaces aren&apos;t created by chance. They&apos;re shaped by thoughtful design, exceptional craftsmanship, and furniture made to last"
      </blockquote>
    </section>
  );
}
