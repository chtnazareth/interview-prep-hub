'use client';

import { useEffect } from 'react';

export function useScrollAnimation() {
  useEffect(() => {
    const elements = document.querySelectorAll(
      '.section-header, .card, .timeline-item, .star-card, .tip-box, .page-hero'
    );

    elements.forEach((el) => {
      el.classList.add('anim');
      if (el.classList.contains('card') || el.classList.contains('star-card')) {
        const parent = el.parentElement;
        if (parent) {
          const siblings = Array.from(parent.children).filter(
            (c) =>
              c.classList.contains('card') || c.classList.contains('star-card')
          );
          (el as HTMLElement).style.setProperty(
            '--i',
            String(siblings.indexOf(el))
          );
        }
      }
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );

    document.querySelectorAll('.anim').forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}
