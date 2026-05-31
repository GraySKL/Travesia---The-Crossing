// Client-side scene runtime. Renders a Chapter's scenes into a root element,
// handles choices, captures vocabulary, plays audio (recorded clips over an
// ambient bed, with text-to-speech as a fallback), and persists progress to
// localStorage. Plain DOM, no framework — minimal bundle and audit surface.

import type { Chapter, Scene, Line, Effect, VocabItem } from './types';
import { loadSave, saveState, clearSave, type SaveState } from './state';
import { addVocab } from './glossary';
import {
  speechSupported,
  initVoices,
  hasVoiceFor,
  speakNow,
  speakSequence,
  stopSpeaking,
  isEnabled,
  setEnabled,
  type SpeakPart
} from './speech';
import { playClip, stopClip, setAmbient, stopAmbient } from './audio';

interface RunState {
  flags: Record<string, boolean>;
  vocab: VocabItem[];
  history: string[];
}

export function initGame(root: HTMLElement, chapter: Chapter): void {
  const saved = loadSave();
  const canResume = !!(
    saved &&
    saved.chapterId === chapter.id &&
    chapter.scenes[saved.sceneId]
  );

  const state: RunState = canResume
    ? {
        flags: saved!.flags ?? {},
        vocab: saved!.vocab ?? [],
        history: saved!.history ?? []
      }
    : { flags: {}, vocab: [], history: [] };

  let currentId: string = canResume ? saved!.sceneId : chapter.startScene;

  // Bumped whenever narration should stop (navigation, toggle, replay). Any
  // in-flight narrate loop checks this token and bails if it changed.
  let narrationToken = 0;

  root.innerHTML = '';
  const sceneEl = document.createElement('div');
  sceneEl.className = 'scene';
  const trayEl = document.createElement('div');
  trayEl.className = 'vocab-tray';
  root.append(sceneEl, trayEl);

  const clipUrl = (id: string): string => `/audio/${chapter.id}/${id}.mp3`;
  const ambientUrl = (bed: string): string => `/audio/ambient/${bed}.mp3`;

  function persist(): void {
    const s: SaveState = {
      chapterId: chapter.id,
      sceneId: currentId,
      flags: state.flags,
      vocab: state.vocab,
      history: state.history,
      updatedAt: Date.now()
    };
    saveState(s);
  }

  function applyEffect(e: Effect): void {
    if (e.type === 'flag') state.flags[e.name] = e.value ?? true;
    else if (e.type === 'learn') state.vocab = addVocab(state.vocab, e.vocab);
  }

  function learnFromGloss(item: VocabItem): void {
    const before = state.vocab.length;
    state.vocab = addVocab(state.vocab, item);
    if (state.vocab.length !== before) {
      renderTray();
      persist();
    }
  }

  function lineToParts(line: Line): SpeakPart[] {
    const parts: SpeakPart[] = [];
    if (line.speaker) parts.push({ text: `${line.speaker}.`, lang: 'en' });
    for (const seg of line.segments) {
      if ('en' in seg) parts.push({ text: seg.en, lang: 'en' });
      else parts.push({ text: seg.es, lang: 'es' });
    }
    return parts;
  }

  function ttsParts(parts: SpeakPart[]): Promise<void> {
    return new Promise((resolve) => speakSequence(parts, resolve));
  }

  function sceneHasAudio(scene: Scene): boolean {
    return (
      scene.lines.some((l) => !!(l.audio && l.audio.length)) ||
      !!(scene.endNoteAudio && scene.endNoteAudio.length)
    );
  }

  function cancelNarration(): void {
    narrationToken++;
    stopClip();
    stopSpeaking();
  }

  // Read the scene aloud: recorded clips where present, TTS otherwise.
  async function narrateScene(scene: Scene): Promise<void> {
    narrationToken++;
    const token = narrationToken;

    const playClips = async (ids: string[]): Promise<boolean> => {
      for (const id of ids) {
        if (token !== narrationToken) return false;
        const res = await playClip(clipUrl(id));
        if (res === 'error') return false; // signal fallback
      }
      return true;
    };

    for (const line of scene.lines) {
      if (token !== narrationToken) return;
      const ok = line.audio && line.audio.length ? await playClips(line.audio) : false;
      if (!ok) {
        if (token !== narrationToken) return;
        await ttsParts(lineToParts(line));
      }
    }

    if (token !== narrationToken) return;
    if (scene.end && scene.endNote) {
      const ok =
        scene.endNoteAudio && scene.endNoteAudio.length
          ? await playClips(scene.endNoteAudio)
          : false;
      if (!ok && token === narrationToken) {
        await ttsParts([{ text: scene.endNote, lang: 'en' }]);
      }
    }
  }

  function renderLine(line: Line): HTMLParagraphElement {
    const p = document.createElement('p');
    p.className = 'line';
    if (line.speaker) {
      const sp = document.createElement('span');
      sp.className = 'speaker';
      sp.textContent = `${line.speaker}: `;
      p.appendChild(sp);
    }
    for (const seg of line.segments) {
      if ('en' in seg) {
        p.appendChild(document.createTextNode(seg.en));
      } else {
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'gloss';
        b.dataset.revealed = 'false';
        b.setAttribute('aria-label', `Spanish: ${seg.es}. Tap for the meaning.`);
        b.textContent = seg.es;
        b.addEventListener('click', () => {
          speakNow(seg.es, 'es'); // hear the word (no-op if audio off / no voice)
          if (b.dataset.revealed === 'true') return;
          b.dataset.revealed = 'true';
          const en = document.createElement('span');
          en.className = 'gloss-en';
          en.textContent = ` (${seg.gloss}${seg.note ? ` · ${seg.note}` : ''})`;
          b.appendChild(en);
          learnFromGloss({ es: seg.es, en: seg.gloss, note: seg.note });
        });
        p.appendChild(b);
      }
    }
    return p;
  }

  function go(nextId: string, effects?: Effect[]): void {
    cancelNarration();
    if (effects) effects.forEach(applyEffect);
    currentId = nextId;
    render();
  }

  function renderSpeechBar(scene: Scene): void {
    if (!speechSupported()) return;
    const bar = document.createElement('div');
    bar.className = 'speech-bar';

    const enabled = isEnabled();
    const toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'speech-toggle';
    toggle.textContent = enabled ? '🔊 Audio on' : '🔇 Audio off';
    toggle.setAttribute('aria-pressed', String(enabled));
    toggle.addEventListener('click', () => {
      const next = !isEnabled();
      setEnabled(next);
      if (!next) {
        cancelNarration();
        stopAmbient();
      }
      render();
    });
    bar.appendChild(toggle);

    if (enabled && (sceneHasAudio(scene) || hasVoiceFor('es') || hasVoiceFor('en'))) {
      const readBtn = document.createElement('button');
      readBtn.type = 'button';
      readBtn.className = 'speech-read';
      readBtn.dataset.playing = 'false';
      readBtn.textContent = '▶ Read scene aloud';
      readBtn.addEventListener('click', () => {
        if (readBtn.dataset.playing === 'true') {
          cancelNarration();
          readBtn.dataset.playing = 'false';
          readBtn.textContent = '▶ Read scene aloud';
          return;
        }
        readBtn.dataset.playing = 'true';
        readBtn.textContent = '⏹ Stop';
        narrateScene(scene).then(() => {
          readBtn.dataset.playing = 'false';
          readBtn.textContent = '▶ Read scene aloud';
        });
      });
      bar.appendChild(readBtn);
    } else if (enabled) {
      const note = document.createElement('span');
      note.className = 'speech-note';
      note.textContent = 'No on-device voice available for read-aloud here.';
      bar.appendChild(note);
    }

    sceneEl.appendChild(bar);
  }

  function render(): void {
    const scene = chapter.scenes[currentId];
    if (!scene) {
      sceneEl.textContent = 'The story trails off here.';
      return;
    }
    if (scene.onEnter) scene.onEnter.forEach(applyEffect);
    if (!state.history.includes(scene.id)) state.history.push(scene.id);

    sceneEl.innerHTML = '';
    sceneEl.dataset.mood = scene.mood ?? '';

    // Ambient bed for this scene (quiet loop; pauses if audio is off).
    setAmbient(scene.ambient ? ambientUrl(scene.ambient) : null);

    renderSpeechBar(scene);

    for (const line of scene.lines) sceneEl.appendChild(renderLine(line));

    const actions = document.createElement('div');
    actions.className = 'actions';

    if (scene.end) {
      if (scene.endNote) {
        const note = document.createElement('p');
        note.className = 'end-note';
        note.textContent = scene.endNote;
        sceneEl.appendChild(note);
      }
      const again = document.createElement('button');
      again.type = 'button';
      again.className = 'btn btn-ghost';
      again.textContent = 'Play this chapter again';
      again.addEventListener('click', () => {
        cancelNarration();
        clearSave();
        state.flags = {};
        state.history = [];
        currentId = chapter.startScene;
        render();
      });
      const home = document.createElement('a');
      home.href = '/';
      home.className = 'btn btn-ghost';
      home.textContent = 'Return home';
      home.addEventListener('click', () => {
        cancelNarration();
        stopAmbient();
      });
      actions.append(again, home);
    } else if (scene.choices && scene.choices.length) {
      for (const choice of scene.choices) {
        if (choice.requires && !state.flags[choice.requires]) continue;
        const row = document.createElement('div');
        row.className = 'choice-row';

        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'btn btn-choice';
        btn.textContent = choice.es;
        btn.addEventListener('click', () => go(choice.next, choice.effects));
        row.appendChild(btn);

        if (choice.gloss || choice.audio) {
          const hint = document.createElement('button');
          hint.type = 'button';
          hint.className = 'hint';
          hint.textContent = '?';
          hint.setAttribute('aria-label', 'Hear this choice and show its meaning');
          const gloss = choice.gloss;
          const audio = choice.audio;
          hint.addEventListener('click', () => {
            // Pronounce: recorded clip if present, else text-to-speech.
            if (audio) {
              playClip(clipUrl(audio)).then((r) => {
                if (r === 'error') speakNow(choice.es, 'es');
              });
            } else {
              speakNow(choice.es, 'es');
            }
            // Reveal the English meaning once.
            if (gloss && !btn.querySelector('.choice-gloss')) {
              const g = document.createElement('span');
              g.className = 'choice-gloss';
              g.textContent = ` — ${gloss}`;
              btn.appendChild(g);
            }
          });
          row.appendChild(hint);
        }
        actions.appendChild(row);
      }
    } else if (scene.next) {
      const cont = document.createElement('button');
      cont.type = 'button';
      cont.className = 'btn btn-primary';
      cont.textContent = 'Continue';
      const nextId = scene.next;
      cont.addEventListener('click', () => go(nextId));
      actions.appendChild(cont);
    }

    sceneEl.appendChild(actions);
    renderTray();
    persist();

    // Auto-narrate only when this scene has recorded clips — the immersive
    // "you are there" experience. TTS-only scenes stay quiet until the player
    // taps "Read scene aloud" or a word.
    if (isEnabled() && sceneHasAudio(scene)) {
      const rb = sceneEl.querySelector('.speech-read') as HTMLButtonElement | null;
      if (rb) {
        rb.dataset.playing = 'true';
        rb.textContent = '⏹ Stop';
      }
      narrateScene(scene).then(() => {
        const rb2 = sceneEl.querySelector('.speech-read') as HTMLButtonElement | null;
        if (rb2) {
          rb2.dataset.playing = 'false';
          rb2.textContent = '▶ Read scene aloud';
        }
      });
    }
  }

  function renderTray(): void {
    trayEl.innerHTML = '';
    if (!state.vocab.length) return;
    const details = document.createElement('details');
    details.className = 'tray-details';
    const summary = document.createElement('summary');
    summary.textContent = `Words you've learned (${state.vocab.length})`;
    details.appendChild(summary);
    const ul = document.createElement('ul');
    for (const v of state.vocab) {
      const li = document.createElement('li');
      const es = document.createElement('strong');
      es.textContent = v.es;
      li.appendChild(es);
      li.appendChild(
        document.createTextNode(` — ${v.en}${v.note ? ` (${v.note})` : ''}`)
      );
      ul.appendChild(li);
    }
    details.appendChild(ul);
    trayEl.appendChild(details);
  }

  // Voices often arrive asynchronously; re-render when they do so the
  // read-aloud control can appear.
  if (speechSupported()) initVoices(() => render());
  render();
}
