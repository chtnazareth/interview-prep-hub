'use client';

import { useState } from 'react';
import { useScrollAnimation } from '@/lib/useScrollAnimation';
import { useCopilotReadable } from '@copilotkit/react-core';
import data from '@/data/platforms.json';

function TagSpan({ text, color }: { text: string; color?: string }) {
  const cls = color ? `tag ${color}` : 'tag';
  return <span className={cls}>{text}</span>;
}

export default function PlatformsPage() {
  useScrollAnimation();
  const [activeFilter, setActiveFilter] = useState('all');

  useCopilotReadable({
    description: "Practice platforms and tools: practice sites, mock interviews, system design references, AI tools",
    value: JSON.stringify(data.cards.map((card) => ({
      title: card.title, category: card.category, description: card.description,
    }))),
  });

  return (
    <>
      <div className="page-hero">
        <img src={data.pageHero.icon} alt={data.pageHero.iconAlt} />
        <h1>{data.pageHero.title}</h1>
        <p>{data.pageHero.subtitle}</p>
      </div>

      <div className="container">
        <div className="filter-bar">
          {data.filters.map((f) => (
            <button
              key={f.value}
              className={`filter-btn${activeFilter === f.value ? ' active' : ''}`}
              onClick={() => setActiveFilter(f.value)}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div className="card-grid">
          {data.cards.map((card, i) => (
            <div
              key={i}
              className="card"
              data-category={card.category}
              style={{
                display:
                  activeFilter === 'all' || card.category === activeFilter
                    ? ''
                    : 'none',
              }}
            >
              <h3>{card.title}</h3>
              <p>{card.description}</p>
              {card.tags.map((tag, j) => (
                <TagSpan key={j} text={tag.text} color={tag.color} />
              ))}
              <br />
              <a
                className="card-link"
                href={card.link.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {card.link.text} &rarr;
              </a>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
