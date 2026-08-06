import React from 'react';
import './ServicesTextScroller.css';

const ITEMS = [
  'Concept Development',
  '//',
  'Architectural Design',
  '//',
  '3D Visualization',
  '//',
  'Concept Development',
  '//',
  'Architectural Design',
  '//',
  '3D Visualization',
  '//',
  'Concept Development',
  '//',
  'Architectural Design',
  '//',
  '3D Visualization',
  '//',
  'Concept Development',
  '//',
  'Architectural Design',
  '//',
  '3D Visualization',
  '//',
  'Concept Development',
  '//',
  'Architectural Design',
  '//',
  '3D Visualization',
  '//',
];

const ServicesTextScroller = () => {
  // Duplicate items for seamless infinite loop
  const row = [...ITEMS, ...ITEMS];

  return (
    <section className="services-scroller-section">
      <div className="text-editor_wrapper text-editor_wrapper-clone scroller-row-1">
        {row.map((item, index) => (
          <span key={index}>{item}</span>
        ))}
      </div>
    </section>
  );
};

export default ServicesTextScroller;
