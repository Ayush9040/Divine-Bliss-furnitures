import { useState } from 'react';
import './HomeFaq.css';

const FAQ_COLUMNS = [
  [
    'What services do you offer?',
    'How does the design process work?',
    'How long does a typical project take?',
  ],
  [
    'Do you manage contractors and suppliers?',
    'Can I be involved in the design decisions?',
    'Do you offer online or remote design services?',
  ],
];

const FAQ_ANSWER = 'Our gym is open every day. Weekdays typically have early morning and late evening hours, while weekend schedules may be slightly shorter. Please check our timetable or contact reception for exact hours.';

function FaqColumn({ column, columnIndex, openItems, onToggle }) {
  return (
    <div className="mink-faq-column" data-reveal>
      {column.map((question, itemIndex) => {
        const itemId = `${columnIndex}-${itemIndex}`;
        const isOpen = openItems.has(itemId);
        const buttonId = `mink-faq-button-${itemId}`;
        const panelId = `mink-faq-panel-${itemId}`;

        return (
          <article className={`mink-faq-item${isOpen ? ' is-open' : ''}`} key={question}>
            <button
              id={buttonId}
              className="mink-faq-question"
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => onToggle(itemId)}
            >
              <span>{question}</span>
              <i className="mink-faq-icon" aria-hidden="true" />
            </button>
            <div
              id={panelId}
              className="mink-faq-answer"
              role="region"
              aria-labelledby={buttonId}
              aria-hidden={!isOpen}
            >
              <div>
                <p>{FAQ_ANSWER}</p>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}

export default function HomeFaq() {
  const [openItems, setOpenItems] = useState(() => new Set(['0-0', '1-0']));

  const toggleItem = (itemId) => {
    setOpenItems((current) => {
      const next = new Set(current);
      if (next.has(itemId)) next.delete(itemId);
      else next.add(itemId);
      return next;
    });
  };

  return (
    <section className="mink-faq" aria-labelledby="mink-faq-title">
      <div className="mink-faq-shell">
        <div className="mink-faq-heading" data-reveal>
          <span className="mink-faq-eyebrow"><i /> Questions You May Have</span>
          <h2 id="mink-faq-title">Frequently Asked Questions</h2>
        </div>

        <div className="mink-faq-columns">
          {FAQ_COLUMNS.map((column, columnIndex) => (
            <FaqColumn
              column={column}
              columnIndex={columnIndex}
              key={column[0]}
              openItems={openItems}
              onToggle={toggleItem}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
