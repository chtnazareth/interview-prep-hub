'use client';

import { useEffect } from 'react';
import { useScrollAnimation } from '@/lib/useScrollAnimation';
import { useCopilotReadable } from '@copilotkit/react-core';
import { CreativePricing } from '@/components/ui/creative-pricing';
import type { PricingTier } from '@/components/ui/creative-pricing';
import { Pencil, Star, Sparkles } from 'lucide-react';
import homeData from '@/data/home-cards.json';
import featuresData from '@/data/landing-features.json';
import stepsData from '@/data/landing-steps.json';
import testimonialsData from '@/data/landing-testimonials.json';

function TagSpan({ text, color }: { text: string; color?: string }) {
  const cls = color ? `tag ${color}` : 'tag';
  return <span className={cls}>{text}</span>;
}

/* Curved wave SVG for section dividers */
function WaveDivider({ direction = 'down', className = '' }: { direction?: 'down' | 'up'; className?: string }) {
  return (
    <div className={`section-divider ${className}`}>
      <svg viewBox="0 0 1440 48" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        {direction === 'down' ? (
          <path d="M0,0 C360,48 1080,0 1440,48 L1440,48 L0,48 Z" />
        ) : (
          <path d="M0,48 C360,0 1080,48 1440,0 L1440,48 L0,48 Z" />
        )}
      </svg>
    </div>
  );
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
        {/* Section 2: The Interview Landscape — BENTO GRID */}
        <section id="landscape">
          <div className="landscape-header">
            <h2>{homeData.sectionTitle}</h2>
            <p>{homeData.sectionSubtitle}</p>
          </div>
          <div className="bento-grid">
            {homeData.cards.map((card, i) => (
              <div key={i} className="card image-card">
                <div className="card-image-wrapper">
                  <div
                    className="card-image-placeholder"
                    style={{ display: 'flex' }}
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
      </div>

      {/* Wave divider: white → blue */}
      <WaveDivider direction="down" className="to-blue" />

      {/* Section 3: Features — blue tinted background */}
      <section id="features">
        <div className="container">
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
        </div>
      </section>

      {/* Wave divider: blue → white */}
      <WaveDivider direction="up" className="from-blue" />

      <div className="container">
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
      </div>

      {/* Wave divider: white → amber */}
      <WaveDivider direction="down" className="to-amber" />

      {/* Section 5: Testimonials — amber tinted background */}
      <section id="testimonials">
        <div className="container">
          <div className="section-header">
            <img
              className="section-icon"
              src="/img/people.png"
              alt="People"
            />
            <h2>{testimonialsData.sectionTitle}</h2>
            <p>{testimonialsData.sectionSubtitle}</p>
          </div>

          {/* Social proof stats bar (design research: concrete numbers) */}
          <div className="social-proof-bar">
            <div className="social-proof-stat">
              <div className="stat-number blue">87%</div>
              <div className="stat-label">Offer Rate</div>
            </div>
            <div className="social-proof-stat">
              <div className="stat-number green">2.4 mo</div>
              <div className="stat-label">Avg. Prep Time</div>
            </div>
            <div className="social-proof-stat">
              <div className="stat-number amber">3.2x</div>
              <div className="stat-label">More Interviews</div>
            </div>
            <div className="social-proof-stat">
              <div className="stat-number purple">500+</div>
              <div className="stat-label">Engineers Prepped</div>
            </div>
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
        </div>
      </section>

      {/* Wave divider: amber → white */}
      <WaveDivider direction="up" className="from-amber" />

      <div className="container">
        {/* Section 6: Pricing */}
        <section id="pricing" style={{ padding: '80px 0' }}>
          <CreativePricing
            tag="Flexible Plans"
            title="Invest in Your Career"
            description="Choose the prep intensity that fits your timeline"
            tiers={[
              {
                name: 'Self-Paced',
                icon: <Pencil className="w-6 h-6" />,
                price: 0,
                description: 'Free forever — start anytime',
                color: 'amber',
                features: [
                  '12-Week Roadmap',
                  '44 Checklist Items',
                  'Curated Resources',
                  'Progress Tracking',
                ],
              },
              {
                name: 'Pro Coach',
                icon: <Star className="w-6 h-6" />,
                price: 49,
                description: 'AI-powered coaching included',
                color: 'blue',
                popular: true,
                features: [
                  'Everything in Self-Paced',
                  'AI Interview Coach',
                  'Mock Interview Generator',
                  'Personalized Study Plan',
                ],
              },
              {
                name: 'Team Prep',
                icon: <Sparkles className="w-6 h-6" />,
                price: 149,
                description: 'For engineering teams',
                color: 'purple',
                features: [
                  'Everything in Pro Coach',
                  'Team Progress Dashboard',
                  'Custom Interview Banks',
                  'Priority Support',
                ],
              },
            ]}
          />
        </section>

        {/* Section 7: Final CTA */}
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
