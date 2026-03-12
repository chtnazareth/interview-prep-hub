'use client';

import { useState, useCallback } from 'react';
import { useScrollAnimation } from '@/lib/useScrollAnimation';
import { getCheckedItems, toggleItem } from '@/lib/progress';
import { useCopilotReadable, useCopilotAction } from '@copilotkit/react-core';
import data from '@/data/ai-aware-checklist.json';

export default function AiAwarePage() {
  useScrollAnimation();
  const [checked, setChecked] = useState<Record<string, boolean>>(getCheckedItems);

  const handleToggle = useCallback((id: string) => {
    const updated = toggleItem(id);
    setChecked({ ...updated });
  }, []);

  useCopilotReadable({
    description: "AI-Aware interview tips with 5 practice items, Do's/Don'ts, and ethical warning",
    value: JSON.stringify({
      practiceItems: data.items.map((item) => ({
        id: item.id, text: item.text, done: !!checked[item.id],
      })),
      dos: data.dos,
      donts: data.donts,
    }),
  });

  useCopilotAction({
    name: "toggleAiAwareItem",
    description: "Toggle an AI-aware practice item as done or undone",
    parameters: [{ name: "itemId", type: "string" as const, description: "Item ID e.g. a-1 through a-5", required: true }],
    handler: ({ itemId }) => { handleToggle(itemId); },
  });

  return (
    <>
      <div className="page-hero">
        <img src={data.pageHero.icon} alt={data.pageHero.iconAlt} />
        <h1>{data.pageHero.title}</h1>
        <p>{data.pageHero.subtitle}</p>
      </div>

      <div className="container">
        <div className="tip-box">
          <h4>{data.coreShift.title}</h4>
          <p>{data.coreShift.text}</p>
        </div>

        <h3 style={{ margin: '24px 0 16px' }}>{data.checklistTitle}</h3>
        <ul className="checklist" data-group="ai-aware">
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

        <h3 style={{ margin: '24px 0 16px' }}>Do&apos;s and Don&apos;ts</h3>
        <div className="card-grid">
          <div className="card" style={{ borderColor: 'rgba(63,185,80,0.4)' }}>
            <h3 style={{ color: 'var(--accent2)' }}>Do&apos;s</h3>
            <ul
              style={{
                fontSize: '14px',
                color: 'var(--text-muted)',
                paddingLeft: '16px',
              }}
            >
              {data.dos.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="card" style={{ borderColor: 'rgba(255,123,114,0.4)' }}>
            <h3 style={{ color: 'var(--accent5)' }}>Don&apos;ts</h3>
            <ul
              style={{
                fontSize: '14px',
                color: 'var(--text-muted)',
                paddingLeft: '16px',
              }}
            >
              {data.donts.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="tip-box warn" style={{ marginTop: '16px' }}>
          <h4>{data.ethicalWarning.title}</h4>
          <p>{data.ethicalWarning.text}</p>
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
