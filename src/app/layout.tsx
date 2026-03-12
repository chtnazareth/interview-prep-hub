'use client';

import '@/styles/globals.css';
import { usePathname } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';
import { getProgress } from '@/lib/progress';
import navigation from '@/data/navigation.json';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [progress, setProgress] = useState({ done: 0, total: 44, pct: 0 });

  const refreshProgress = useCallback(() => {
    setProgress(getProgress());
  }, []);

  useEffect(() => {
    refreshProgress();
    window.addEventListener('storage', refreshProgress);
    window.addEventListener('progress-update', refreshProgress);
    return () => {
      window.removeEventListener('storage', refreshProgress);
      window.removeEventListener('progress-update', refreshProgress);
    };
  }, [refreshProgress]);

  const circumference = 2 * Math.PI * 16;
  const dashoffset = circumference - (circumference * progress.pct) / 100;

  return (
    <html lang="en">
      <head>
        <title>Interview Prep Hub 2026</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        {/* Gradient Orbs */}
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
        <div className="orb orb-4" />

        {/* Nav */}
        <nav>
          <div className="logo-area">
            <a href="/">
              <div className="logo-icon">
                <img src="/img/rocket.png" alt="Logo" />
              </div>
              <span className="logo-text">Interview Prep Hub</span>
            </a>
          </div>
          <div className="nav-links">
            {navigation.map((item) => (
              <a
                key={item.key}
                href={item.href}
                className="nav-link"
                aria-current={pathname === item.href ? 'page' : undefined}
              >
                {item.label}
              </a>
            ))}
          </div>
          <div className="progress-area">
            <div className="progress-ring">
              <svg viewBox="0 0 40 40">
                <circle className="ring-bg" cx="20" cy="20" r="16" />
                <circle
                  className="ring-fill"
                  cx="20"
                  cy="20"
                  r="16"
                  style={{ strokeDashoffset: dashoffset }}
                />
              </svg>
            </div>
            <div className="progress-text">
              <strong>{progress.pct}% Complete</strong>
              {progress.done} of {progress.total} Lessons
            </div>
          </div>
        </nav>

        {children}

        {/* Footer */}
        <footer>
          <p>
            <span className="footer-name">Built by Claudio Nazareth</span>
          </p>
          <p>
            Interview Prep Hub 2026 &mdash; A structured guide for the AI era
            interview journey.
          </p>
          <p style={{ marginTop: '4px' }}>
            Data sourced from Tech Interview Handbook, ByteByteGo,
            Interviewing.io, and community research.
          </p>
        </footer>
      </body>
    </html>
  );
}
