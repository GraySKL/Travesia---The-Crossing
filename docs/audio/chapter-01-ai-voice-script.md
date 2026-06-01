# Chapter 1 — "Arrival": AI voice + ambiance production script (v1 draft)

This is the production script for generating Chapter 1's audio with an **AI voice tool**.
You run the tool and drop the files in; the app plays them (with TTS as a fallback for any
missing clip). Goal: a believable, warm, emotionally true first draft to put in front of
real testers fast.

> **Why AI voices (state this plainly, don't dress it up):** speed and zero budget — and,
> genuinely, **privacy and safety**. This app touches a community vulnerable to enforcement
> and could be subpoenaed. AI voices mean **no real person's voice or identity is ever tied
> to it.** That is a protective choice. Treat v1 voices as *feedback bait*: make them easy to
> swap, and ask testers directly whether the voices feel real or off.

---

## The disclaimer (ship this with the audio)

Surface in the footer / an "About the voices" note. Bilingual:

- **EN:** "The voices in Travesía are AI-generated. We chose this to launch quickly and to
  protect the privacy and safety of real community members — no real person's voice or
  identity is tied to this app."
- **ES:** "Las voces de Travesía son generadas por inteligencia artificial. Lo hicimos para
  lanzar pronto y para proteger la privacidad y la seguridad de personas reales de la
  comunidad: ninguna voz ni identidad real está vinculada a esta aplicación."

---

## Voice engine: Kokoro-82M (chosen — local, free, Apache-2.0)

Voices are generated with **Kokoro-82M** (https://huggingface.co/hexgrad/Kokoro-82M).
Why: it's **Apache-2.0**, so the audio is **freely redistributable** in this MIT/public repo,
and it runs **fully offline** on your machine — no API, no credits, no telemetry (matches the
threat model). MP3 out via `lameenc` (no ffmpeg).

**One-time setup** (Windows; needs internet once for Python 3.12, packages, and the model):
```bash
# uv manages an isolated Python 3.12 — PyTorch has no Python 3.14 wheels yet
python -m pip install uv
uv python install 3.12
uv venv .venv-audio --python 3.12          # .venv-audio is git-ignored
uv pip install --python .venv-audio kokoro soundfile lameenc espeakng-loader phonemizer-fork
uv pip install --python .venv-audio "en_core_web_sm @ https://github.com/explosion/spacy-models/releases/download/en_core_web_sm-3.8.0/en_core_web_sm-3.8.0-py3-none-any.whl"
```

**Generate:**
```bash
npm run audio -- --only arrival --force     # Chapter 1 voices
npm run audio -- --only work                # Chapter 2 — AFTER the dignity sign-off
npm run audio -- --voice MARIA --force      # just one role
```
The Node wrapper (`scripts/audio-kokoro.mjs`) feeds the manifest to the Python generator
(`scripts/generate-audio-kokoro.py`); the **role → Kokoro voice map** is at the top of that
Python file (NARRATOR=`af_heart`, MARIA/ROSA/LUCIA=`ef_dora`, BETO=`em_alex`, AGENT=`am_michael`).

**Caveats:** Kokoro's Spanish is **European/Castilian** (e.g. "gra-_th_-ias"), and there's only
one Spanish female voice (`ef_dora`), so María/Rosa/Lucía share it (nudged apart by speed).
Kokoro is **TTS-only** — ambient beds come from elsewhere (see Ambiance below).

## Ambient beds (where the background SFX came from)

Kokoro is voices-only. The 8 looping ambient beds in `public/audio/ambient/` are static
assets (prompts recorded in the `beds` map of `scripts/audio-manifest.mjs`). They were first
generated with ElevenLabs' SFX tool; for a **fully** clean-license repo, re-source them as
**CC0** field recordings (e.g. freesound.org, CC0-filtered) matching those descriptions.

**Ethics (any engine):** use stock/synthetic voices only — never clones of identifiable real
people without consent. Kokoro (Apache-2.0) already satisfies commercial-use + redistribution
for this MIT/public repo.

---

## Voice casting

Pick **Latin-American** Spanish voices (Mexican / Central-American feel), **not** Castilian.
For English, pick everyday, warm, working-class American voices — *not* a polished
announcer. The narrator can carry a light regional-South quality to match the setting.

| Voice | Who | Language | Profile & settings |
|---|---|---|---|
| **NARRATOR** | Second-person "you" — the player's grounded inner voice | English (US) | Warm, intimate, unhurried. Real, not broadcast. ElevenLabs: stability ~0.45, style low–med. |
| **MARÍA** | The cousin (prima); your first welcome | Spanish (MX/Latin-Am) | 30s–40s, bright, fast, affectionate, breathless with joy at first. |
| **TÍA ROSA** | The matriarch | Spanish (Latin-Am) | 50s–60s, warm, grounded, motherly. |
| **DON BETO** | Neighbor / community counselor; code-switches | Bilingual (Latin-Am Spanish + US English) | Middle-aged man, kind but serious, plain-spoken. Two voices acceptable if one tool can't code-switch: same character, ES clip + EN clip. |

> Realism tip: keep `rate`/pace natural, avoid over-enunciation. Generate 2–3 takes per line
> and keep the most human one.

---

## Per-line script (paste-ready)

Format: **[file id] SPEAKER (lang):** "text to paste" — *direction*. Optional v3 tags in `[]`.

### Scene `arrival` — bus depot, early dawn
- **[arrival-0] NARRATOR (en):** "The bus exhales and the doors fold open. You step down into a parking lot washed pale by early light. You don't know this city. You barely know the language." — *quiet, weary, a little lost.*
- **[arrival-1] NARRATOR (en):** "Across the lot, someone is waving both arms over their head — a woman, grinning." — *a lift of hope.*
- **[arrival-2] MARÍA (es):** "`[shouting, joyful]` ¡Aquí! ¡Aquí!" — *calling across the lot, almost laughing.*
- **[arrival-2b] NARRATOR (en):** "she calls, almost laughing." — *soft tag line.*

### Scene `greeting` — the hug
- **[greeting-0] NARRATOR (en):** "She reaches you out of breath and pulls you into a hug that nearly knocks you over."
- **[greeting-1] MARÍA (es):** "`[breathless, warm]` ¡Qué alegría verte! Soy tu prima, María." — *overflowing; "prima" said with pride.*
- **[greeting-2] NARRATOR (en):** "Prima. Cousin. You've only ever seen her face in photographs. Here she is, warm and real and smelling of coffee."
- **Player choices (pronunciation models — clear but natural, neutral Latin-Am Spanish):**
  - **[greeting-c1] (es):** "Gracias, prima."
  - **[greeting-c2] (es):** "Tengo mucho sueño."
  - **[greeting-c3] (es):** "¿Dónde vamos?"

### Scene `carRide` — old sedan, city sliding by
- **[carRide-0] NARRATOR (en):** "María drives an old sedan with a pine air-freshener swinging from the mirror. The city slides past — gas stations, a laundromat, a church."
- **[carRide-1] MARÍA (es):** "Vas a quedarte con nosotros. La familia ya está esperando." — *reassuring, matter-of-fact warmth.*
- **[carRide-2] NARRATOR (en):** "She talks the whole way. Then, slowing for a light, she says one word like it is a small prayer:"
- **[carRide-3] MARÍA (es):** "`[softly, tender]` Una casa." — *a held breath of longing.*
- **[carRide-3b] NARRATOR (en):** "Our own house. Someday."

### Scene `home` — crowded, warm apartment
- **[home-0] NARRATOR (en):** "The apartment is small and full. Cousins, a baby, a television murmuring. The whole room turns when you walk in."
- **[home-1] TÍA ROSA (es):** "`[warmly]` Pasa, pasa. Estás en tu casa." — *motherly, instantly at ease.*
- **[home-2] NARRATOR (en):** "There is rice and beans and a plate already set for you, as if they knew the exact hour you would arrive. Maybe they did."
- **Player choices:**
  - **[home-c1] (es):** "¿Y la casa?"
  - **[home-c2] (es):** "Necesito descansar."

### Scene `houseTalk` — evening, the serious conversation
- **[houseTalk-0] NARRATOR (en):** "Later, the talk circles back to the house. María's neighbor, Don Beto, has come by — he counsels families at the community center."
- **[houseTalk-1] DON BETO (es):** "Muchos creen que no pueden comprar una casa sin papeles." — *a knowing, weary patience.*
- **[houseTalk-1b] NARRATOR (en):** "He shakes his head."
- **[houseTalk-2a] DON BETO (en):** "But owning a home isn't about immigration status." — *plain, steady.*
- **[houseTalk-2b] DON BETO (es):** "No necesitas ser ciudadano." — *clear, reassuring.*
- **[houseTalk-2c] DON BETO (en):** "Plenty of families buy with an ITIN — a taxpayer ID — and a lender who works with them."
- **[houseTalk-3] NARRATOR (en):** "He lowers his voice, kind but serious."
- **[houseTalk-4a] DON BETO (en):** "Just — be careful who you trust with your money." — *protective.*
- **[houseTalk-4b] DON BETO (es):** "`[low, serious]` Hay estafas." — *a warning, gently delivered.*
- **Player choices:**
  - **[houseTalk-c1] (es):** "Quiero aprender más."
  - **[houseTalk-c2] (es):** "Gracias, Don Beto."

### Scene `endHopeful` — night, leaning in
- **[endHopeful-0] NARRATOR (en):** "That night you sleep on a borrowed couch under a borrowed blanket, in a country that does not yet know your name."
- **[endHopeful-1] NARRATOR (en):** "Down the hall, the family is still talking — about work, about papers, about a house with a door that locks and a kitchen that is theirs. Tomorrow you will go with María to the community center."
- **[endHopeful-2] NARRATOR (en):** "`[gentle, hopeful]` You asked. You leaned in. The dream of a home is real and, it turns out, possible — but everything good here will have to be fought for. The hard part has not come yet."

### Scene `endRest` — night, gentler
- **[endRest-0] NARRATOR (en):** "You are asleep before the dishes are done, on a borrowed couch under a borrowed blanket, in a country that does not yet know your name."
- **[endRest-1] NARRATOR (en):** "Down the hall, the family talks softly so as not to wake you — about work, about papers, about a house, someday."
- **[endRest-2] NARRATOR (en):** "`[gentle]` You needed rest, and that is allowed. The house, the questions, the long road — they will all still be there in the morning. The hard part has not come yet."

---

## Ambiance (one bed per scene mood)

Simplest fast path: **one looping ambient bed per scene**, played quietly under the voices.
Generate with ElevenLabs SFX, or use **CC0 / public-domain** field recordings (e.g.,
freesound.org filtered to CC0). **No copyrighted or recognizable music** — and for the car
radio, keep it to indistinct talk or omit it.

| Bed | Scene(s) | Contents | Level |
|---|---|---|---|
| `depot` | arrival, greeting | Diesel idle, brake hiss, sparse early-morning, distant footsteps on asphalt, a few birds | low |
| `car` | carRide | Old engine hum, turn-signal tick, muffled city outside, occasional passing car | low |
| `home` | home, houseTalk | Overlapping warm family chatter (indistinct), a baby cooing, faint Spanish-language TV, dishes/utensils | med-low (lower under houseTalk) |
| `night` | endHopeful, endRest | Fridge hum, a clock, distant muffled voices down a hall, faint street outside | very low |

---

## Technical / file spec (so clips drop into the app)

- **Format:** `.mp3` (the app resolves clips as `.mp3`). Mono is fine for VO.
- **Naming — voice lines:** `public/audio/arrival/<file-id>.mp3`
  (e.g., `public/audio/arrival/greeting-1.mp3`). The folder is the **chapter id**
  (`arrival`), matching the engine's resolver `/audio/<chapterId>/<id>.mp3`.
- **Naming — ambient beds:** `public/audio/ambient/<bed>.mp3`
  (e.g., `public/audio/ambient/depot.mp3`). Make these seamless loops.
- **Loudness:** voice ≈ **−16 LUFS**; ambient bed ≈ **−28 LUFS** (so it never competes).
- **Privacy hygiene:** strip metadata from exported files (some encoders embed device/app
  info). Don't record/generate on anything that geotags.
- Keep VO **dry** (no baked-in ambiance) if easy — the app layers the bed and respects the
  audio on/off toggle. If that's too slow for v1, baking a light bed into each clip is an
  acceptable shortcut.

---

## How this plugs into the app (BUILT — just add the files + wire the ids)

The playback layer now exists. To light it up:

1. **Drop the files in:** `public/audio/arrival/*.mp3` (voice lines) and
   `public/audio/ambient/*.mp3` (beds).
2. **Wire the ids into the story data** (`src/story/chapter-01-arrival.ts`):
   - Each line gets `audio: ['<file-id>', ...]` (two ids for a line spoken by a
     character then the narrator — e.g. `audio: ['carRide-3', 'carRide-3b']`).
   - Each scene gets `ambient: '<bed>'` (e.g. `ambient: 'depot'`).
   - Each choice may get `audio: '<file-id>'` (pronunciation model).
   - An ending scene may get `endNoteAudio: ['<file-id>']`.

Behavior once wired: scenes **with** clips auto-play on entry over the ambient bed (the
immersive "you are there" experience); any missing clip **falls back to on-device TTS**;
tapping a Spanish word speaks it (TTS); a choice's `?` plays its clip or TTS. Audio on/off
toggle and offline/no-network are unchanged.

**Status: the ids are now wired** into both `src/story/chapter-01-arrival.ts` and
`src/story/chapter-02-work.ts`. You only need to generate the files.

---

## Chapter 2 — "The Job": cast + ambiance (per-line texts/ids live in the manifest)

New voices beyond Chapter 1:

| Voice | Who | Language | Profile |
|---|---|---|---|
| **LUCIA** | Coworker who hands over the red card | Spanish (Latin-Am) | Warm but careful, working-class; teaches the rights lines quietly. |
| **AGENT** | The ICE officer at the raid | English (US) | Flat, procedural authority — **not** a cartoon villain. Restraint. |

New ambient beds: `plant` (cold processing-line hum), `raid` (uneasy fluorescent tension),
`detention` (bleak institutional room), `tarmac` (pre-dawn airfield). The opening `morning`
scene reuses the `home` bed.

> Tone note for the hard scenes: keep delivery **restrained** — the removal beats land harder
> the quieter they are read. Generate a couple of takes and keep the least theatrical.
