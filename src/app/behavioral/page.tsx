'use client';

import { useState, useCallback } from 'react';
import { useScrollAnimation } from '@/lib/useScrollAnimation';
import { getCheckedItems, toggleItem } from '@/lib/progress';
import data from '@/data/behavioral-checklist.json';

export default function BehavioralPage() {
  useScrollAnimation();
  const [checked, setChecked] = useState<Record<string, boolean>>(getCheckedItems);

  const handleToggle = useCallback((id: string) => {
    const updated = toggleItem(id);
    setChecked({ ...updated });
  }, []);

  return (
    <>
      <div className="page-hero">
        <img src={data.pageHero.icon} alt={data.pageHero.iconAlt} />
        <h1>{data.pageHero.title}</h1>
        <p>{data.pageHero.subtitle}</p>
      </div>

      <div className="container">
        <h3 style={{ marginBottom: '16px' }}>The STAR Method</h3>
        <div className="star-grid">
          {data.starCards.map((card) => (
            <div key={card.letter} className="star-card">
              <div className="letter">{card.letter}</div>
              <h4>{card.title}</h4>
              <p>{card.description}</p>
            </div>
          ))}
        </div>

        <h3 style={{ marginBottom: '16px' }}>{data.checklistTitle}</h3>
        <ul className="checklist" data-group="behavioral">
          {data.items.map((item) => (
            <li
              key={item.id}
              data-id={item.id}
              className={checked[item.id] ? 'done' : ''}
              onClick={() => handleToggle(item.id)}
            >
              <span className="check-box">
                {checked[item.id] ? '✓' : ''}
              </span>
              <span className="check-text">{item.text}</span>
            </li>
          ))}
        </ul>

        <div style={{ marginTop: '24px' }}>
          {data.tipBoxes.map((tip, i) => (
            <div key={i} className="tip-box">
              <h4>{tip.title}</h4>
              <p>{tip.text}</p>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '16px' }}>
          {data.links.map((link, i) => (
            <span key={i}>
              {i > 0 && <>&nbsp;&nbsp;|&nbsp;&nbsp;</>}
              <a href={link.url} target="_blank" rel="noopener noreferrer">
                {link.text} &rarr;
              </a>
            </span>
          ))}
        </div>
      </div>
    </>
  );
}
