'use client';

import { useEffect } from 'react';
import { useScrollAnimation } from '@/lib/useScrollAnimation';
import homeData from '@/data/home-cards.json';

function TagSpan({ text, color }: { text: string; color?: string }) {
  const cls = color ? `tag ${color}` : 'tag';
  return <span className={cls}>{text}</span>;
}

export default function HomePage() {
  useScrollAnimation();

  // Legacy hash redirect for old bookmarks
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    const map: Record<string, string> = {
      roadmap: '/roadmap',
      udemy: '/courses',
      youtube: '/youtube',
      platforms: '/platforms',
      behavioral: '/behavioral',
      'ai-aware': '/ai-aware',
    };
    if (map[hash]) window.location.replace(map[hash]);
  }, []);

  return (
    <>
      <div className="hero">
        <h1>
          Interview Prep <span>Hub 2026</span>
        </h1>
        <p>
          A structured guide for engineers returning to the interview game in
          the AI era.
        </p>
      </div>

      <div className="container">
        <section id="changes">
          <div className="section-header">
            <img
              className="section-icon"
              src={homeData.sectionIcon}
              alt={homeData.sectionIconAlt}
            />
            <h2>{homeData.sectionTitle}</h2>
            <p>{homeData.sectionSubtitle}</p>
          </div>
          <div className="card-grid">
            {homeData.cards.map((card, i) => (
              <div className="card" key={i}>
                <img
                  className="card-icon"
                  src={card.icon}
                  alt={card.iconAlt}
                />
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
        </section>
      </div>
    </>
  );
}
