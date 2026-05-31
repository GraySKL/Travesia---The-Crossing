// Save/resume state. Lives ENTIRELY in localStorage — nothing leaves the
// device. No accounts, no sync, no telemetry (see CLAUDE.md threat model).

import type { VocabItem } from './types';

const KEY = 'travesia.save.v1';

export interface SaveState {
  chapterId: string;
  sceneId: string;
  flags: Record<string, boolean>;
  vocab: VocabItem[];
  history: string[];
  updatedAt: number;
}

function available(): boolean {
  return typeof window !== 'undefined' && 'localStorage' in window;
}

export function loadSave(): SaveState | null {
  if (!available()) return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return null;
    return JSON.parse(raw) as SaveState;
  } catch {
    return null;
  }
}

export function saveState(state: SaveState): void {
  if (!available()) return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    // Storage full or blocked — fail silently. Nothing here is critical and
    // nothing leaves the device regardless.
  }
}

export function clearSave(): void {
  if (!available()) return;
  try {
    window.localStorage.removeItem(KEY);
  } catch {
    // ignore
  }
}

export function hasSave(): boolean {
  return loadSave() !== null;
}
