'use client';

import '@/styles/globals.css';
import '@copilotkit/react-ui/styles.css';
import '@/styles/copilotkit.css';
import { usePathname } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';
import { getProgress } from '@/lib/progress';
import navigation from '@/data/navigation.json';
import { CopilotKit } from '@copilotkit/react-core';
import { CopilotPopup } from '@copilotkit/react-ui';
import { useCopilotReadable } from '@copilotkit/react-core';
import { TapedFooter } from '@/components/ui/footer-taped-design';

function GlobalReadable({ progress, pathname }: { progress: { pct: number; done: number; total: number }; pathname: string }) {
  useCopilotReadable({
    description: "User's overall interview preparation progress and current page",
    value: JSON.stringify({
      percentComplete: progress.pct,
      itemsDone: progress.done,
      totalItems: progress.total,
      currentPage: pathname,
      currentPageName: navigation.find((n) => n.href === pathname)?.label || 'Unknown',
    }),
  });
  return null;
}

const SYSTEM_PROMPT = `You are an expert Interview Prep Coach for software engineers preparing for senior/staff-level interviews at top tech companies.

You have access to the user's preparation progress on Interview Prep Hub, a structured 12-week preparation guide.

The site has these sections:
- Roadmap: 31 checklist items across 6 phases (Weeks 1-2: System Design Foundations, Weeks 3-5: Deep Dive, Weeks 6-7: Coding Refresh, Weeks 8-9: Behavioral & Leadership, Weeks 10-11: AI-Aware Practice, Week 12: Mock Interviews)
- Behavioral: 8 story categories to prepare using the STAR method (Situation, Task, Action, Result)
- AI-Aware: 5 practice items for AI-enabled interviews, plus Do's and Don'ts
- Courses: 6 Udemy courses for system design, coding, soft skills, AI/ML
- YouTube: 10 free channels for system design, coding, algorithms
- Platforms: 12 practice platforms, mock interview services, and AI tools

Your capabilities:
1. See the user's current progress (checked items and percentage)
2. See what page the user is currently viewing
3. Toggle checklist items as complete/incomplete when the user asks
4. Recommend what to study next based on progress
5. Explain interview concepts (STAR method, system design patterns, algorithms)
6. Generate mock interview questions (behavioral, system design, coding)
7. Provide study tips and strategies for senior/staff-level interviews

Be encouraging but direct. Use concrete examples. When suggesting study items, reference specific checklist items by name. Keep responses concise and actionable.`;

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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
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

        <CopilotKit runtimeUrl="/api/copilotkit">
          <GlobalReadable progress={progress} pathname={pathname} />
          <main>
            {children}

          </main>
          {/* Footer */}
          <TapedFooter />
          <CopilotPopup
            instructions={SYSTEM_PROMPT}
            labels={{
              title: "Interview Prep Coach",
              initial: "Hi! I'm your Interview Prep Coach. Ask me about study plans, concepts, or let me quiz you!",
            }}
          />
        </CopilotKit>
      </body>
    </html>
  );
}
