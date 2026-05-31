// On-device text-to-speech via the Web Speech API (read-aloud / accessibility).
//
// THREAT MODEL: we use ONLY local, on-device voices (voice.localService === true).
// Some browsers (notably Chrome) ship cloud-backed voices that send the text to a
// server — that would leak what the player is reading, which is forbidden. If no
// local voice exists for a language, we degrade silently rather than speak via a
// remote service. Nothing here ever leaves the device.

const SETTING_KEY = 'travesia.speech.v1';

const LANG_FULL: Record<'es' | 'en', string> = { es: 'es-ES', en: 'en-US' };

export interface SpeakPart {
  text: string;
  lang: 'es' | 'en';
}

export function speechSupported(): boolean {
  return (
    typeof window !== 'undefined' &&
    'speechSynthesis' in window &&
    'SpeechSynthesisUtterance' in window
  );
}

let voicesCache: SpeechSynthesisVoice[] = [];

function refreshVoices(): void {
  if (!speechSupported()) return;
  // Local voices only — never cloud-backed.
  voicesCache = window.speechSynthesis.getVoices().filter((v) => v.localService);
}

export function initVoices(onReady?: () => void): void {
  if (!speechSupported()) return;
  refreshVoices();
  // Voices frequently load asynchronously; refresh when they arrive.
  window.speechSynthesis.onvoiceschanged = () => {
    refreshVoices();
    if (onReady) onReady();
  };
}

function pickVoice(lang: string): SpeechSynthesisVoice | undefined {
  if (!voicesCache.length) refreshVoices();
  const target = lang.toLowerCase();
  const prefix = target.slice(0, 2);
  return (
    voicesCache.find((v) => v.lang.toLowerCase().startsWith(target)) ??
    voicesCache.find((v) => v.lang.toLowerCase().startsWith(prefix))
  );
}

export function hasVoiceFor(lang: 'es' | 'en'): boolean {
  return !!pickVoice(LANG_FULL[lang]);
}

export function isEnabled(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return window.localStorage.getItem(SETTING_KEY) !== 'off';
  } catch {
    return true;
  }
}

export function setEnabled(on: boolean): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(SETTING_KEY, on ? 'on' : 'off');
  } catch {
    // ignore
  }
  if (!on) stopSpeaking();
}

export function stopSpeaking(): void {
  if (speechSupported()) window.speechSynthesis.cancel();
}

export function speakNow(text: string, lang: 'es' | 'en'): void {
  if (!speechSupported() || !isEnabled()) return;
  const voice = pickVoice(LANG_FULL[lang]);
  if (!voice) return; // no on-device voice — degrade, never use a cloud voice
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.voice = voice;
  u.lang = voice.lang;
  u.rate = 0.95;
  window.speechSynthesis.speak(u);
}

export function speakSequence(parts: SpeakPart[], onDone?: () => void): void {
  if (!speechSupported() || !isEnabled()) {
    if (onDone) onDone();
    return;
  }
  window.speechSynthesis.cancel();
  const queue = parts.filter((p) => p.text.trim().length > 0);
  let i = 0;
  const next = (): void => {
    if (i >= queue.length) {
      if (onDone) onDone();
      return;
    }
    const part = queue[i++];
    const voice = pickVoice(LANG_FULL[part.lang]);
    if (!voice) {
      next(); // skip parts with no on-device voice
      return;
    }
    const u = new SpeechSynthesisUtterance(part.text);
    u.voice = voice;
    u.lang = voice.lang;
    u.rate = 0.95;
    u.onend = next;
    u.onerror = next;
    window.speechSynthesis.speak(u);
  };
  next();
}
