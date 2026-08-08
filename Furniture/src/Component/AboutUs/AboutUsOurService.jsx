import React, { useState } from 'react';
import { ArrowRight ,MoveUpRight } from 'lucide-react';
import './AboutUsService.css'

const accordionData = [
  {
    id: 1,
    title: 'EXPLORE COLLECTION',
    description: 'Regular stretching supports better posture, prevents injuries, and improves recovery after physical activity.',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 2,
    title: 'CHOOSE YOUR STYLE',
    description: 'Thoughtfully curated interior designs tailored to bring comfort, elegance, and sophistication into your everyday living spaces.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 3,
    title: 'FURNITURE SELECTION',
    description: 'Discover handcrafted furniture pieces built with premium materials designed for long-lasting durability and timeless modern style.',
    image: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=800&q=80',
  },
];

const AboutUsOurService = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="accordion-section">
      <div className='text-section'>
          <h1 className='small-text'>From Concept to Completion</h1>
          <span className='main-text'>
            <h1>our services</h1>
            <div className='circle-animation' >
              <MoveUpRight className='Arrow' />
            </div>
          </span>
      </div>
      <div className="accordion-container">
        {accordionData.map((item, index) => {
          const isActive = activeIndex === index;
          return (
            <div
              key={item.id}
              className={`accordion-panel ${isActive ? 'active' : ''}`}
              onMouseEnter={() => setActiveIndex(index)}
            >
              <div className="panel-image-wrapper">
                <img src={item.image} alt={item.title} />
              </div>

              <div className="panel-content">
                <div className="content-inner">
                  <div className="panel-icon">
                    {/* Minimalist icon representation */}
                    <div className="icon-box"></div>
                  </div>
                  <h3 className="panel-title">{item.title}</h3>
                  <p className="panel-desc">{item.description}</p>
                  <a href="#read-more" className="panel-link">
                    READ MORE <ArrowRight size={16} />
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default AboutUsOurService;