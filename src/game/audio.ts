// Playback for pre-recorded voice clips and a looping ambient bed.
//
// All audio ships with the app and is cached offline by the service worker —
// nothing is fetched at runtime from anywhere but our own origin, no telemetry.
// A missing clip simply rejects/errors; callers fall back to text-to-speech.

import { isEnabled } from './speech';

let voEl: HTMLAudioElement | null = null;
let ambientEl: HTMLAudioElement | null = null;
let currentAmbientSrc = '';

function vo(): HTMLAudioElement | null {
  if (typeof window === 'undefined') return null;
  if (!voEl) {
    voEl = new Audio();
    voEl.preload = 'auto';
  }
  return voEl;
}

function ambient(): HTMLAudioElement | null {
  if (typeof window === 'undefined') return null;
  if (!ambientEl) {
    ambientEl = new Audio();
    ambientEl.loop = true;
    ambientEl.preload = 'auto';
    ambientEl.volume = 0.22; // quiet bed, never competes with the voice
  }
  return ambientEl;
}

export type ClipResult = 'ok' | 'error';

/** Play a single voice clip at an optional playback rate (1 = normal, lower =
 *  slower; pitch preserved). Resolves 'ok' when it finishes, 'error' if it
 *  can't load/play (e.g., the file doesn't exist yet). */
export function playClip(url: string, rate = 1): Promise<ClipResult> {
  return new Promise((resolve) => {
    const el = vo();
    if (!el) {
      resolve('error');
      return;
    }
    const cleanup = (): void => {
      el.onended = null;
      el.onerror = null;
    };
    el.onended = () => {
      cleanup();
      resolve('ok');
    };
    el.onerror = () => {
      cleanup();
      resolve('error');
    };
    el.src = url;
    el.playbackRate = rate;
    el.preservesPitch = true; // keep pitch natural when slowed
    const p = el.play();
    if (p && typeof p.catch === 'function') {
      p.catch(() => {
        cleanup();
        resolve('error');
      });
    }
  });
}

export function stopClip(): void {
  if (voEl) {
    voEl.onended = null;
    voEl.onerror = null;
    voEl.pause();
  }
}

/** Switch the looping ambient bed. Pass null (or when audio is off) to stop. */
export function setAmbient(url: string | null): void {
  const el = ambient();
  if (!el) return;
  if (!url || !isEnabled()) {
    el.pause();
    currentAmbientSrc = url ?? '';
    return;
  }
  if (currentAmbientSrc === url && !el.paused) return;
  currentAmbientSrc = url;
  el.src = url;
  const p = el.play();
  // Autoplay may be blocked until the first user gesture, or the file may not
  // exist yet — both are fine, just don't throw.
  if (p && typeof p.catch === 'function') p.catch(() => {});
}

export function stopAmbient(): void {
  if (ambientEl) ambientEl.pause();
}
