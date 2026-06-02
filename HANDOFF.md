# HANDOFF — Travesía / The Crossing

_Last updated: 2026-06-01. Read this first when resuming in a new session._

## What this is
A choose-your-own-adventure PWA that teaches **English-first allies** Spanish by living an
immigrant's journey through the U.S. — start in English, get pulled into Spanish via
tap-to-reveal gloss; **consequence over score**. Sibling to **Puente / Bridge** (the
Know-Your-Rights app, in `../Puente la Divide`). Full charter, tone rules, sourcing rules,
and threat model are in [CLAUDE.md](CLAUDE.md).

## Status — Chapters 1 & 2 built and SHIP; Chapter 3 is next
- `npm run check` (**0 errors, 0 warnings**) and `npm run build` pass. The old
  content-collection **deprecation warning is gone** (story moved out of `src/content/`).
- **Chapter 1 "Arrival"** (arrival → reunite with family → buying a house), flag-gated to
  two endings. story-vet **2026-05-31 = SHIP** (sources confirmed: NAR, IRS, CFPB, FTC).
- **Chapter 2 "The Job"** (job → the plant → worksite ICE raid → detention → removal to a
  third country). Branches at the raid: **assert rights** vs. **comply out of fear** — both
  end in removal, with different preserved dignity / legal thread (consequence over score).
  story-vet 2026-05-31 = NEEDS HUMAN REVIEW; **human signed off 2026-06-01 = SHIP** (read
  detainedA/B, courtA, removalA/B; Spanish lines confirmed kept as written). Sources: AIC,
  ILRC, NILC + 8 USC 1362, SCOTUSblog, CFR.
- Chapters now **chain**: an ending shows **"Continue to the next chapter →"** when the
  chapter sets the new optional `nextChapter` field on `Chapter` (Ch1 → Ch2).
- **Read-aloud** via the Web Speech API, **on-device voices only** (cloud voices filtered —
  threat model). The ambient bed now **stops ~5s after the read-aloud finishes** (no longer
  loops indefinitely).
- **Audio: voices via Kokoro-82M (local, Apache-2.0, offline).** `npm run audio`
  (Node wrapper → Python generator in a uv-managed `.venv-audio` Python 3.12) synthesizes
  voices offline into `public/audio/`; clip + `ambient` ids wired into both chapters; the
  bilingual "voices are AI-generated" disclaimer is in the footer. **Chapter 1 regenerated
  with Kokoro** (37 clips, mp3 via `lameenc`, redistributable — license gate gone). Spanish is
  European/Castilian (`ef_dora`); cast→voice map in `scripts/generate-audio-kokoro.py`.
  **Ch2 voices are generated** (41 clips, 2026-06-01). Originally provisional; the dignity
  sign-off landed 2026-06-01 with the prose unchanged, so they are now the approved set and the
  manifest marks `work` `ready:true`. Regenerate with `npm run audio -- --only work` only if
  the prose changes. The **ICE agent now questions in Spanish** (`AGENT → em_alex`, shares Don
  Beto's voice — Kokoro's only es-male) and the raid-choice pronunciation models use Lucía's
  voice. `af_nicole` is rejected (user: "creepy"). Audition voices via `scripts/voice-lab.py`.
  **Ambient beds** are still the 8 ElevenLabs SFX in `public/audio/ambient/`
  (Kokoro is TTS-only; swap for CC0 for a fully clean license). One-time setup in the audio doc.
- **Learning aids.** Replay-speed control (normal / 0.75× / 0.5×) applies to word taps, the
  choice `?`, and rehearsal (`getRate`/`setRate` in `speech.ts`, `playbackRate` in
  `audio.ts`); Spanish female voices baked a bit slower (manifest `speed: 0.9`). The in-play
  **"Words you've learned" tray entries are tappable to hear** (not just the ending list). Each
  chapter ending shows the **full learned-words list** (tap a word to hear it) and a
  **rehearsal flashcard activity** (hear / reveal / shuffle / prev-next, no score). All in
  `engine.ts`.

## How to run
Node is installed at `C:\Program Files\nodejs` but is **NOT on the default PATH** in this
environment, and the working directory can drift between tool calls. So in each shell:
```bash
cd /c/Users/saral/Documents/GraySKL/Travesia
export PATH="/c/Program Files/nodejs:$PATH"
npm run dev      # serves http://localhost:4321
```

## Key files
- `src/game/types.ts` — story data model (Chapter / Scene / Line / Choice / Effect; audio
  fields; `nextChapter` for chapter chaining)
- `src/game/engine.ts` — runtime: render, choices, vocab capture, audio narration, save,
  end-of-chapter "continue to next chapter" link
- `src/game/state.ts` — localStorage save/resume
- `src/game/speech.ts` — Web Speech TTS, **local voices only**
- `src/game/audio.ts` — recorded-clip + ambient-bed playback
- `src/story/index.ts` — chapter registry (array order = play order)
- `src/story/chapter-01-arrival.ts` — Chapter 1 content + `sources` (story-vet: SHIP)
- `src/story/chapter-02-work.ts` — Chapter 2 content + `sources` (story-vet: NEEDS HUMAN)
- `scripts/audio-manifest.mjs` — canonical clip texts + ambient-bed prompts (audio source of truth)
- `scripts/audio-kokoro.mjs` + `scripts/generate-audio-kokoro.py` — Kokoro voice generator (`npm run audio`)
- `scripts/voice-lab.py` — disposable voice-audition tool (samples + HTML page → `public/_voicelab/`)
- `src/components/SceneRunner.astro` — mounts the engine + game styles
- `src/pages/index.astro`, `src/pages/play/[chapter].astro` — title screen + play route
- `docs/audio/chapter-01-ai-voice-script.md` — AI-voice production script, ambiance spec,
  bilingual disclaimer, and exact wiring instructions
- `.claude/agents/story-vet.md` — content/tone/Spanish vetting agent (Sonnet)

## Decisions locked
- **Audience:** English-first allies (Spanish-first UI is a later phase).
- **Tone:** grounded, dignity-first; never trivialize detention/removal. HARD constraint.
- **Voices:** AI-generated for v1 (no budget for talent; speed; also keeps any real person's
  identity off a subpoenable app). On-device TTS is the accessibility fallback. Disclaimer
  text is in the production doc.
- **Stack:** Astro 5 + Tailwind v4 + `@vite-pwa/astro`; server-less, `localStorage` only, no
  telemetry/CDNs; MIT. **No i18n routing** (English UI; Spanish in story). **No MDX** (story
  is typed TS). Hand-rolled engine (no Ink). Astro CLI telemetry disabled.

## Open follow-ups (suggested order)
1. **(big) Chapter 3 — IN PROGRESS / next.** Next in the arc (toward ~10), continuing after
   Ch2's third-country removal. Direction (2026-06-01 user): a new journey forward that
   introduces new vocabulary while rehearsing already-learned words; POV still TBD (protagonist
   abroad vs. María & family left in the US vs. both threads). Same discipline: source every
   factual claim in `sources`, run story-vet, expect NEEDS HUMAN on any hardship beat. Wire it
   up: set Ch2's `nextChapter: '<id>'` and register the chapter in `src/story/index.ts`.
2. **(audio)** Voices generate locally via **Kokoro** (offline, Apache-2.0 → redistributable):
   one-time setup, then `npm run audio -- --only arrival --force` (Ch1 done; Ch2 done too, 41
   clips, now `ready:true`). Setup + caveats (European-accent Spanish) in
   `docs/audio/chapter-01-ai-voice-script.md`. Ambient beds are still ElevenLabs SFX —
   optionally re-source as CC0 for a fully clean license.
4. **(audio polish)** Six Ch2 lines are single `lang:'mix'` clips (`morning-3`, `theCard-3/4`,
   `theRaid-0`, `detainedA-4`, `courtA-1`), so an embedded other-language word is synthesized
   through the wrong pipeline. Ch1 avoided this by splitting mixed lines into per-language
   clips — do the same if the slight mispronunciation bothers (needs a call on how the English
   narrator should voice embedded Spanish vocab words).

DONE since last handoff (2026-05-31): confirmed Ch1 sources (NAR/IRS/CFPB/FTC) → story-vet
SHIP; moved `src/content/story` → `src/story` (deprecation cleared); built + vetted
**Chapter 2 "The Job"**; added `nextChapter` chapter-chaining; built the AI-voice + SFX
audio pipeline (`npm run audio`) and wired clip/`ambient` ids into both chapters (+ the
AI-voices footer disclaimer); human-confirmed all Ch1 + Ch2 source links.

DONE 2026-06-01: generated Ch2 voices (provisional, 41 clips); switched the ICE agent to
Spanish (`AGENT → em_alex`); fixed "Three letters across their backs: ICE"; pointed the
raid-choice pronunciation models at Lucía's voice; ambient bed now stops ~5s after the
read-aloud; made the in-play learned-words tray tappable; added `scripts/voice-lab.py`
(`af_nicole` rejected). **First real commit since the Ch1 slice** — all of the above is
committed on `main` (local only, no remote).

DONE 2026-06-01 (later): **Ch2 human dignity sign-off COMPLETE.** A human read and approved
detainedA/B, courtA, removalA/B (detention + third-country removal) as restrained/dignity-
first. Spanish kept as written — the agent's `usted` line, the choice "Contesto sus preguntas"
(*sus*), and "No lo olvidaré" (neuter *lo*). Prose unchanged, so the provisional Ch2 audio
stands and `work` was flipped to `ready:true`. **Ch2 SOURCING STATUS → SHIP.**

## Known gotchas
- Node not on PATH (see "How to run").
- Audio generation runs in a uv-managed **Python 3.12 venv** (`.venv-audio`, git-ignored)
  because PyTorch has no Python 3.14 wheels; `npm run audio` uses it. Setup in the audio doc.
- **Chapter 2 = SHIP** (human dignity sign-off complete 2026-06-01). The detention/removal
  scenes were read and approved as restrained/dignity-first; the prose vetted as restrained.
- `npm run check`/`build` print a Node `DEP0205 module.register` deprecation — it comes from
  Astro/Node internals, is unrelated to our code, and is harmless. (The old *content-
  collection* deprecation is gone now that the story lives in `src/story`.)
