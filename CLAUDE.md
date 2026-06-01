# Travesía / The Crossing — Claude project context

A choose-your-own-adventure PWA that teaches **English-first allies** Spanish by living an immigrant's journey through the U.S. The player starts in English and is pulled increasingly into Spanish: you learn the language by living in it, and you build empathy by living the consequences. Sibling project to **Puente / Bridge** (the Know-Your-Rights tool); they share brand, ethos, and sourced content but ship separately.

## Core mechanic

- UI chrome is **English**. Spanish lives **inside the story** as the learning material, surfaced via tap-to-reveal gloss.
- **Scaffolding fades** across the journey: early scenes are mostly English with key Spanish words glossed; later scenes are Spanish-forward; choices increasingly require parsing Spanish.
- **Consequence over score.** Branches lead to different lived outcomes and reflection — never points, never "game over" gags.

## Scope

Phased, vertical-slice-first (see the build plan). Chapters depict real situations people doing the right thing face today:
1. Arrival → reunite with family → assistance buying a house.
2. Apply for a job → start working → caught by ICE → detention → removal to a third country.
3. … toward ~10 chapters.

If a request would change the core mechanic, the tone constraint, or the threat model, **stop and confirm with the user first.**

## Tone & dignity (NON-NEGOTIABLE)

This is fiction, but it depicts real injustices real people face. **Grounded realism, dignity-first.** Detention, family separation, and removal must never be trivialized, sensationalized, gamified for points, or played as a joke. Portray consequences as lived human outcomes. When in doubt, restraint.

## Content sourcing rules

The **narrative** (characters, plot, dialogue) is invented — expected for a story. But every **factual claim** about law, rights, or process must be grounded and cited in the chapter's `sources` and adjacent comments. **Do not invent facts.**

- Rights / encounter claims → ILRC (https://www.ilrc.org/redcards), NILC, ACLU, United We Dream.
- Process / event claims (homeownership, employment, detention, removal to a third country) → American Immigration Council, USCIS/ICE/DHS official pages, Migration Policy Institute, or reputable journalism (AP/Reuters/ProPublica) for documented real-case grounding.

Invoke the **`story-vet`** subagent (`.claude/agents/story-vet.md`) on any change under `src/story/**`. Every experience surfaces the bilingual disclaimer (in the layout footer):
"Travesía is a work of fiction for education and empathy. It is not legal advice. For your situation, contact a lawyer." / "Travesía es una obra de ficción para educación y empatía. No es asesoría legal. Para su situación, consulte a un abogado."

## Threat model (carried from Puente)

No accounts, no email, no analytics, no telemetry. No third-party CDNs/fonts. No location APIs. Service worker is **offline caching only — it must never call home.** All state (progress, vocabulary, choices) lives in `localStorage`. PWA-only distribution. MIT-licensed and public for audit. If you would add a dependency, network call, or script tag that touches any of this, **stop and confirm first.**

## Stack

- Astro (TypeScript), Tailwind v4, `@vite-pwa/astro` (offline SW + manifest). No backend.
- Story is **typed TS data** under `src/story/`; a small **vanilla-TS runtime** (`src/game/`) renders scenes in an Astro island — no UI-framework dependency.
- Build: `npm run dev` / `build` / `preview` / `check`. Hosting: Cloudflare Pages or Netlify, static.

## Token-saving conventions

- Subagents default to Sonnet (`CLAUDE_CODE_SUBAGENT_MODEL=sonnet`); route multi-query research to the `Explore` subagent.
- Don't bulk-read story content into the main context — grep into `src/story/**`.
- `.claudeignore` excludes `node_modules`, build output, and lock files.
- Prefer editing existing files over creating new ones.
