'use client';

import { useEffect } from 'react';
import { useScrollAnimation } from '@/lib/useScrollAnimation';
import { useCopilotReadable } from '@copilotkit/react-core';
import homeData from '@/data/home-cards.json';
import featuresData from '@/data/landing-features.json';
import stepsData from '@/data/landing-steps.json';
import testimonialsData from '@/data/landing-testimonials.json';

function TagSpan({ text, color }: { text: string; color?: string }) {
  const cls = color ? `tag ${color}` : 'tag';
  return <span className={cls}>{text}</span>;
}

export default function HomePage() {
  useScrollAnimation();

  useCopilotReadable({
    description: "Landing page for Interview Prep Hub 2026 — covers what changed in tech interviews, hub features, how it works, and testimonials from engineers who landed roles at top companies",
    value: JSON.stringify({
      whatChanged: homeData.cards.map((card) => ({
        title: card.title,
        description: card.description,
      })),
      features: featuresData.features.map((f) => ({
        title: f.title,
        description: f.description,
      })),
      steps: stepsData.steps.map((s) => ({
        title: s.title,
        description: s.description,
      })),
    }),
  });

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
      {/* Section 1: Hero */}
      <div className="hero">
        <h1>
          Interview Prep <span>Hub 2026</span>
        </h1>
        <p>
          A structured guide for engineers returning to the interview game in
          the AI era.
        </p>
        <div className="hero-stats">
          <span className="hero-stat">6 Sections</span>
          <span className="hero-stat">44 Checklist Items</span>
          <span className="hero-stat">12-Week Plan</span>
        </div>
        <a href="/roadmap" className="hero-cta">
          Start Your Prep
        </a>
      </div>

      <div className="container">
        {/* Section 2: The Interview Landscape */}
        <section id="landscape">
          <div className="landscape-header">
            <h2>{homeData.sectionTitle}</h2>
            <p>{homeData.sectionSubtitle}</p>
          </div>
          <div className="card-grid">
            {homeData.cards.map((card, i) => (
              <div className="card image-card" key={i}>
                <div className="card-image-wrapper">
                  {card.video ? (
                    <video
                      src={card.video}
                      autoPlay
                      muted
                      loop
                      playsInline
                      poster={card.image}
                    />
                  ) : card.image ? (
                    <img
                      src={card.image}
                      alt={card.imageAlt}
                      onError={(e) => {
                        const target = e.currentTarget;
                        target.style.display = 'none';
                        const placeholder = target.nextElementSibling as HTMLElement;
                        if (placeholder) placeholder.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <div
                    className="card-image-placeholder"
                    style={{ display: card.image || card.video ? 'none' : 'flex' }}
                  >
                    <img src={card.icon} alt={card.iconAlt} />
                  </div>
                </div>
                <div className="card-body">
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
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: Features */}
        <section id="features">
          <div className="section-header">
            <img
              className="section-icon"
              src="/img/toolbox.png"
              alt="Toolbox"
            />
            <h2>{featuresData.sectionTitle}</h2>
            <p>{featuresData.sectionSubtitle}</p>
          </div>
          <div className="card-grid">
            {featuresData.features.map((feature, i) => (
              <div className="card" key={i}>
                <img
                  className="card-icon"
                  src={feature.icon}
                  alt={feature.iconAlt}
                />
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: How It Works */}
        <section id="how-it-works">
          <div className="section-header">
            <img
              className="section-icon"
              src="/img/gear.png"
              alt="Process"
            />
            <h2>{stepsData.sectionTitle}</h2>
            <p>{stepsData.sectionSubtitle}</p>
          </div>
          <div className="steps-grid">
            {stepsData.steps.map((step, i) => (
              <div className="card step-card" key={i}>
                <div className="step-number">{step.number}</div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 5: Testimonials */}
        <section id="testimonials">
          <div className="section-header">
            <img
              className="section-icon"
              src="/img/people.png"
              alt="People"
            />
            <h2>{testimonialsData.sectionTitle}</h2>
            <p>{testimonialsData.sectionSubtitle}</p>
          </div>
          <div className="testimonials-grid">
            {testimonialsData.testimonials.map((t, i) => (
              <div
                className={`card testimonial-card ${t.accent}`}
                key={i}
              >
                <p className="testimonial-quote">{t.quote}</p>
                <div className="testimonial-author">{t.name}</div>
                <div className="testimonial-role">
                  {t.role} · {t.company}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 6: Final CTA */}
        <section className="cta-section" id="cta">
          <h2>Ready to Start Your Prep?</h2>
          <p>
            Join hundreds of engineers who structured their interview
            preparation and landed at top companies.
          </p>
          <div className="cta-buttons">
            <a href="/roadmap" className="hero-cta">
              Start the 12-Week Roadmap
            </a>
            <a href="/courses" className="cta-secondary">
              Explore All Resources
            </a>
          </div>
        </section>
      </div>
    </>
  );
}
