# HANDOFF — Travesía / The Crossing

_Last updated: 2026-05-31. Read this first when resuming in a new session._

## What this is
A choose-your-own-adventure PWA that teaches **English-first allies** Spanish by living an
immigrant's journey through the U.S. — start in English, get pulled into Spanish via
tap-to-reveal gloss; **consequence over score**. Sibling to **Puente / Bridge** (the
Know-Your-Rights app, in `../Puente la Divide`). Full charter, tone rules, sourcing rules,
and threat model are in [CLAUDE.md](CLAUDE.md).

## Status — Chapter 1 vertical slice is DONE & verified
- `npm install`, `npm run check` (**0 errors**), `npm run build` all pass.
- Playable end to end: **Chapter 1 "Arrival"** (arrival → reunite with family → buying a
  house), with a flag-gated branch to two endings.
- **Read-aloud** accessibility via the Web Speech API, **on-device voices only** (cloud
  voices filtered out — threat model).
- **Audio playback layer** built (per-line recorded clips + looping ambient bed + TTS
  fallback + auto-play when clips exist). Drop-in ready, but **no audio files exist yet**,
  so it's TTS-only today.

## How to run
Node is installed at `C:\Program Files\nodejs` but is **NOT on the default PATH** in this
environment, and the working directory can drift between tool calls. So in each shell:
```bash
cd /c/Users/saral/Documents/GraySKL/Travesia
export PATH="/c/Program Files/nodejs:$PATH"
npm run dev      # serves http://localhost:4321
```

## Key files
- `src/game/types.ts` — story data model (Chapter / Scene / Line / Choice / Effect; audio fields)
- `src/game/engine.ts` — runtime: render, choices, vocab capture, audio narration, save
- `src/game/state.ts` — localStorage save/resume
- `src/game/speech.ts` — Web Speech TTS, **local voices only**
- `src/game/audio.ts` — recorded-clip + ambient-bed playback
- `src/content/story/chapter-01-arrival.ts` — Chapter 1 content + `sources`
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
1. **(small)** Confirm Chapter 1's live source URLs (homeownership / ITIN-mortgage / scams)
   and re-run story-vet to clear its **NEEDS HUMAN** verdict. Web fetches were blocked in the
   build env and the sites 403 bots — may need manual confirmation. See the annotated
   `sources` array in the chapter file.
2. **(small)** Clear the cosmetic Astro deprecation: move `src/content/story` → `src/story`
   (Astro auto-generates an unused content collection from anything under `src/content/`).
   Update imports in `index.astro`, `play/[chapter].astro`, and the chapter file
   (`../../game` → `../game`).
3. **(big)** **Chapter 2** — apply for a job → start working → caught by ICE → detention →
   removal to a third country. The hard, grounded chapter: real sourcing + tone discipline;
   story-vet will (and should) flag the heavy beats for human review.
4. **(when audio exists)** Generate AI clips per the production doc, drop into
   `public/audio/arrival/` + `public/audio/ambient/`, then wire `audio` / `ambient` ids into
   `chapter-01-arrival.ts` (mechanical — instructions in the doc).

## Known gotchas
- Node not on PATH (see "How to run").
- Chapter 1 story-vet = **NEEDS HUMAN** (sources unconfirmed; tone / Spanish / disclaimer all PASS).
- Build prints a content-collection **deprecation warning** — cosmetic; follow-up #2 clears it.
