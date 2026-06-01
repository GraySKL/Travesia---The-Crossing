#!/usr/bin/env python3
"""Voice lab — audition Kokoro voices for Travesía.

Writes sample mp3s + an index.html into public/_voicelab/ so you can listen and
compare in the browser (http://localhost:<port>/_voicelab/index.html while
`npm run dev` is running). DISPOSABLE / authoring-only — it is NOT linked from the
app and NOT part of the build; delete public/_voicelab when you're done choosing.

Run it through the same venv the generator uses:
    .venv-audio/Scripts/python.exe scripts/voice-lab.py

Kokoro has no emotion/style control — the only levers are voice, speed, and
punctuation. Spanish has just 3 voices (all Castilian); English has many.
"""
import html
from pathlib import Path

import numpy as np

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "public" / "_voicelab"
SR = 24000

# Spanish: this is the WHOLE Kokoro Spanish catalog (lang_code 'e', Castilian).
SPANISH = [
    ("ef_dora", "e", "Female — the ONLY Spanish female (currently María/Rosa/Lucía)"),
    ("em_alex", "e", "Male — currently Don Beto"),
    ("em_santa", "e", "Male — novelty 'santa' voice (included so you can rule it out)"),
]
# English narrator candidates (a = US, b = UK). Curated, not exhaustive (~30 exist).
ENGLISH = [
    ("af_heart", "a", "US female — CURRENT narrator (quality grade A)"),
    ("af_bella", "a", "US female — more expressive (grade A-)"),
    ("af_nicole", "a", "US female — soft; REJECTED by user (too intimate/creepy) — do not assign"),
    ("af_aoede", "a", "US female — warm, even"),
    ("af_sky", "a", "US female — brighter"),
    ("bf_emma", "b", "UK female — measured"),
    ("bm_george", "b", "UK male — grave"),
    ("am_michael", "a", "US male — CURRENT agent voice"),
    ("am_fenrir", "a", "US male — deeper"),
    ("am_puck", "a", "US male — lively"),
]

ES_TEXT = "Tienes derecho a guardar silencio. No firmes nada. Pide un abogado."
EN_TEXT = ("The bus exhales and the doors fold open. You step down into a parking "
           "lot washed pale by early light.")
ES_SPEEDS = [1.0, 0.85, 0.7]
EN_SPEEDS = [1.0]

from kokoro import KPipeline  # noqa: E402  (heavy import, after constants)
import lameenc  # noqa: E402

_pipes = {}


def pipe(lang):
    if lang not in _pipes:
        _pipes[lang] = KPipeline(lang_code=lang, repo_id="hexgrad/Kokoro-82M")
    return _pipes[lang]


def as_np(a):
    return a if isinstance(a, np.ndarray) else a.detach().cpu().numpy()


_gap = np.zeros(int(SR * 0.12), dtype=np.float32)


def synth(text, voice, lang, speed):
    chunks = [as_np(a).astype(np.float32) for _, _, a in pipe(lang)(text, voice=voice, speed=speed)]
    if not chunks:
        return np.zeros(1, dtype=np.float32)
    out = chunks[0]
    for c in chunks[1:]:
        out = np.concatenate([out, _gap, c])
    return out


def write_mp3(path, audio):
    enc = lameenc.Encoder()
    enc.set_bit_rate(128)
    enc.set_in_sample_rate(SR)
    enc.set_channels(1)
    enc.set_quality(2)
    pcm = (np.clip(audio, -1, 1) * 32767).astype("<i2").tobytes()
    path.write_bytes(enc.encode(pcm) + enc.flush())


def build(group_title, voices, text, speeds, rows):
    items = []
    for voice, lang, label in voices:
        clips = []
        for sp in speeds:
            fn = f"{voice}.mp3" if len(speeds) == 1 else f"{voice}_{str(sp).replace('.', '_')}.mp3"
            try:
                print(f"  {voice} @ {sp} … ", end="", flush=True)
                write_mp3(OUT / fn, synth(text, voice, lang, sp))
                clips.append((sp, fn))
                print("ok")
            except Exception as e:  # noqa: BLE001 — a missing/uncacheable voice shouldn't kill the run
                print(f"FAILED ({e})")
        if clips:
            items.append((voice, label, clips))
    rows.append((group_title, text, items))


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    rows = []
    print("Spanish voices (the whole Kokoro Spanish catalog):")
    build("Spanish voices — lang_code 'e' (Castilian). This is the ENTIRE Kokoro Spanish catalog.",
          SPANISH, ES_TEXT, ES_SPEEDS, rows)
    print("English narrator candidates:")
    build("English narrator candidates (a curated subset of ~30).",
          ENGLISH, EN_TEXT, EN_SPEEDS, rows)

    def esc(s):
        return html.escape(s)

    parts = [
        "<!doctype html><meta charset=utf-8><title>Travesía — voice lab</title>",
        "<style>body{font:16px/1.55 system-ui,sans-serif;margin:2rem auto;max-width:46rem;padding:0 1rem;color:#1a1a1a}"
        "h1{margin-bottom:.2rem}h2{margin-top:2.2rem;border-bottom:1px solid #eee;padding-bottom:.3rem}"
        ".v{margin:.55rem 0;padding:.6rem .8rem;border:1px solid #e2e2e2;border-radius:10px}"
        ".l{font-weight:600}.s{color:#666;font-size:.85em}.sp{display:inline-flex;align-items:center;gap:.35rem;margin:.25rem 1rem .25rem 0}"
        "audio{height:34px}code{background:#f3f3f3;padding:.1em .35em;border-radius:4px}</style>",
        "<h1>Travesía — voice lab</h1>",
        "<p class=s>Disposable audition page (not part of the app). Same line per group; Spanish is also "
        "rendered at 3 speeds. Kokoro has no emotion/inflection control — only voice, speed, and punctuation. "
        "Pick the voices you like and tell Claude which <code>role → voice</code> to set.</p>",
    ]
    for title, text, items in rows:
        parts.append(f"<h2>{esc(title)}</h2><p class=s>“{esc(text)}”</p>")
        if not items:
            parts.append("<p class=s><em>None generated — voices may need to download and network was unavailable.</em></p>")
        for voice, label, clips in items:
            parts.append(f"<div class=v><div class=l>{esc(voice)}</div><div class=s>{esc(label)}</div>")
            for sp, fn in clips:
                spl = "normal" if sp == 1.0 else f"{sp}×"
                parts.append(f"<span class=sp>{esc(spl)} <audio controls preload=none src='./{esc(fn)}'></audio></span>")
            parts.append("</div>")
    (OUT / "index.html").write_text("\n".join(parts), encoding="utf-8")
    print(f"\nWrote {OUT / 'index.html'}")


if __name__ == "__main__":
    main()
