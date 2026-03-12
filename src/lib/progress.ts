const STORAGE_KEY = 'interview-prep-checks';
const TOTAL_ITEMS = 44;

export function getCheckedItems(): Record<string, boolean> {
  if (typeof window === 'undefined') return {};
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  } catch {
    return {};
  }
}

export function toggleItem(id: string): Record<string, boolean> {
  const checked = getCheckedItems();
  checked[id] = !checked[id];
  if (!checked[id]) delete checked[id];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(checked));
  window.dispatchEvent(new Event('progress-update'));
  return checked;
}

export function getProgress(checked?: Record<string, boolean>): {
  done: number;
  total: number;
  pct: number;
} {
  const items = checked ?? getCheckedItems();
  const done = Object.keys(items).filter(k => items[k]).length;
  return {
    done,
    total: TOTAL_ITEMS,
    pct: Math.round((done / TOTAL_ITEMS) * 100),
  };
}
