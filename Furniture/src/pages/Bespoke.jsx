import Materials from './Materials';
import bespokeHeroImage from '../assets/bespoke_banner.webp';
import timelineOne from '../assets/the_consultation.png';
import timelineTwo from '../assets/personalise_every_detail.jpg';
import timelineThree from '../assets/designed_to_fit_your_space.png';
import timelineFour from '../assets/from_design_to_delivery.png';
import timelineFive from '../assets/why_choose_bespoke.png';
import bespokeCutout from '../assets/bespoke.png';

const bespokeTimelineItems = [
  {
    step: '01',
    title: 'The Consultation',
    subtitle: 'It Begins with a Conversation',
    lead: 'Every bespoke journey starts by understanding you.',
    paragraphs: [
      'Our design consultants take the time to learn about your space, preferences, functional needs, and aesthetic vision. This collaborative approach ensures that every recommendation is thoughtfully tailored to your home.',
    ],
    image: timelineOne,
  },
  {
    step: '02',
    title: 'Personalise Every Detail',
    subtitle: 'Your Style, Your Way',
    lead: 'The smallest details often make the biggest difference.',
    paragraphs: [
      'Choose from a curated selection of upholstery fabrics, colours, finishes, dimensions, and design configurations to create furniture that reflects your personality while complementing your interiors.',
      'Because true luxury is found in the freedom to choose.',
    ],
    image: timelineTwo,
  },
  {
    step: '03',
    title: 'Designed to Fit Your Space',
    subtitle: 'Made for the Way You Live',
    lead: 'No two homes share the same layout, and no two families live the same way.',
    paragraphs: [
      'Whether you need a sofa designed for a compact living room, a dining table for entertaining guests, or curtains tailored to floor-to-ceiling windows, every piece is thoughtfully created to fit your space perfectly.',
    ],
    image: timelineThree,
  },
  {
    step: '04',
    title: 'From Design to Delivery',
    subtitle: 'A Seamless Experience',
    lead: 'Creating bespoke furniture should feel effortless.',
    paragraphs: [
      'From the initial consultation and material selection to manufacturing, delivery, and installation, our team guides you through every stage with care and attention to detail, ensuring a smooth and enjoyable experience from start to finish.',
    ],
    image: timelineFour,
  },
  {
    step: '05',
    title: 'Why Choose Bespoke?',
    subtitle: 'Furniture That Truly Feels Like Yours',
    lead: 'Bespoke furniture offers more than flexibility, it creates a deeper connection between your home and the pieces within it.',
    paragraphs: [
      "When furniture is designed specifically for your lifestyle and surroundings, it doesn't just look better, it feels right.",
    ],
    image: timelineFive,
  },
];

export default function Bespoke() {
  return (
    <Materials
      heroImage={bespokeHeroImage}
      pageTitle="Bespoke"
      introTitle="Designed for You."
      introTitleSecondLine="Crafted Around Your Home."
      introDescription="Your home is unlike any other, and your furniture should be too. At Divine Bliss, we offer bespoke solutions that allow you to create pieces tailored to your space, your style, and the way you live."
      manifestoEyebrow="The Art of Bespoke"
      manifestoTitle="Because Every Home Deserves Something Unique"
      manifestoParagraphs={[
        'Furniture should feel as though it was always meant to be part of your home.',
        "Our bespoke service gives you the freedom to personalise every detail, from dimensions and layouts to fabrics, finishes, and colours. Whether you're furnishing a compact apartment or a spacious villa, we help create furniture that fits beautifully into your lifestyle.",
      ]}
      manifestoImage={bespokeCutout}
      manifestoVariant="bespoke"
      timelineAriaLabel="Bespoke process"
      timelineItems={bespokeTimelineItems}
      closingTitle="Let's Create Something Beautiful Together"
      closingTitleSecondLine=""
      closingDescription="Whether you're furnishing a single room or designing your entire home, our bespoke service helps bring your ideas to life with thoughtful design, premium craftsmanship, and personalised attention."
      closingDescriptionSecondLine=""
      closingButtonLabel="Book a Design Consultation"
      closingButtonTo="/contact#contact-form"
    />
  );
}
