'use client';

import { useState, useCallback } from 'react';
import { useScrollAnimation } from '@/lib/useScrollAnimation';
import { getCheckedItems, toggleItem } from '@/lib/progress';
import data from '@/data/roadmap-checklist.json';

export default function RoadmapPage() {
  useScrollAnimation();
  const [checked, setChecked] = useState<Record<string, boolean>>(getCheckedItems);

  const handleToggle = useCallback((id: string) => {
    const updated = toggleItem(id);
    setChecked({ ...updated });
  }, []);

  // Check if all items in a phase are completed
  function isPhaseComplete(items: { id: string }[]) {
    return items.length > 0 && items.every((item) => checked[item.id]);
  }

  return (
    <>
      <div className="page-hero">
        <img src={data.pageHero.icon} alt={data.pageHero.iconAlt} />
        <h1>{data.pageHero.title}</h1>
        <p>{data.pageHero.subtitle}</p>
      </div>

      <div className="container">
        <div className="timeline" id="roadmapTimeline">
          {data.phases.map((phase) => (
            <div
              key={phase.id}
              className={`timeline-item${isPhaseComplete(phase.items) ? ' completed' : ''}`}
              data-week={phase.id}
            >
              <h3>{phase.title}</h3>
              <p>{phase.description}</p>
              <ul className="checklist" data-group={phase.id}>
                {phase.items.map((item) => (
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
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
