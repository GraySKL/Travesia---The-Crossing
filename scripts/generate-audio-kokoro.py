#!/usr/bin/env python3
"""Travesía voice generator — Kokoro-82M (Apache-2.0), fully offline.

Reads the manifest JSON written by scripts/audio-kokoro.mjs (path in
$KOKORO_MANIFEST) and writes voice clips as MP3 into public/audio/<chapter>/<id>.mp3.
Kokoro is TEXT-TO-SPEECH ONLY — ambient beds are handled separately.

Run it through the Node wrapper so the manifest + venv are wired up:
    npm run audio -- [--only <chapter>] [--voice ROLE[,ROLE]] [--force]

License win: Kokoro is Apache-2.0, so this audio is freely redistributable in the
public/MIT repo, and generation happens entirely on-device (no API, no telemetry).
"""
import argparse
import json
import os
import sys
from pathlib import Path

import numpy as np

ROOT = Path(__file__).resolve().parent.parent
AUDIO = ROOT / "public" / "audio"
SR = 24000  # Kokoro output sample rate

# Character role -> (Kokoro voice, default lang_code, speed).
# Spanish is European/Castilian (Kokoro's only es voices); ef_dora is the sole
# Spanish female, so María/Rosa/Lucía share it, nudged apart slightly by speed.
# Spanish females run a touch slower (0.85–0.90) for learners.
VOICES = {
    "NARRATOR": ("af_heart", "a", 1.00),
    "MARIA":    ("ef_dora", "e", 0.90),
    "ROSA":     ("ef_dora", "e", 0.85),
    "BETO":     ("em_alex", "e", 0.95),
    "LUCIA":    ("ef_dora", "e", 0.90),
    "AGENT":    ("em_alex", "e", 1.00),  # Spanish — agent questions workers in Spanish; shares em_alex w/ BETO (only es male voice), set apart by flat/procedural context
}
LANG_OF = {"en": "a", "es": "e"}  # explicit per-clip language; "mix" uses role default


def load_manifest():
    p = os.environ.get("KOKORO_MANIFEST")
    if not p or not Path(p).exists():
        sys.exit("Manifest JSON not found — run via `npm run audio` (it writes it).")
    return json.loads(Path(p).read_text(encoding="utf-8"))


def as_np(a):
    return a if isinstance(a, np.ndarray) else a.detach().cpu().numpy()


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--only", help="limit to one chapter id")
    ap.add_argument("--voice", help="limit to these role(s), comma-separated")
    ap.add_argument("--force", action="store_true", help="overwrite existing files")
    args = ap.parse_args()
    only_voices = {v.strip() for v in (args.voice or "").split(",") if v.strip()}

    manifest = load_manifest()

    from kokoro import KPipeline  # deferred: heavy import
    import lameenc

    pipelines = {}

    def pipe(lang):
        if lang not in pipelines:
            pipelines[lang] = KPipeline(lang_code=lang, repo_id="hexgrad/Kokoro-82M")
        return pipelines[lang]

    gap = np.zeros(int(SR * 0.15), dtype=np.float32)  # breath between sentences

    def synth(text, voice, lang, speed):
        chunks = [as_np(a).astype(np.float32) for _, _, a in pipe(lang)(text, voice=voice, speed=speed)]
        if not chunks:
            return np.zeros(1, dtype=np.float32)
        out = chunks[0]
        for c in chunks[1:]:
            out = np.concatenate([out, gap, c])
        return out

    def write_mp3(path, audio):
        enc = lameenc.Encoder()
        enc.set_bit_rate(128)
        enc.set_in_sample_rate(SR)
        enc.set_channels(1)
        enc.set_quality(2)
        pcm = (np.clip(audio, -1, 1) * 32767).astype("<i2").tobytes()
        path.write_bytes(enc.encode(pcm) + enc.flush())

    made = skipped = failed = 0
    for chapter in manifest["chapters"]:
        if args.only and chapter["id"] != args.only:
            continue
        targeted = args.only == chapter["id"]
        if not chapter.get("ready", True) and not targeted:
            print(f'• skipping chapter "{chapter["id"]}" (ready: false — pass --only {chapter["id"]})')
            continue
        out_dir = AUDIO / chapter["id"]
        out_dir.mkdir(parents=True, exist_ok=True)
        for clip in chapter["clips"]:
            role = clip["voice"]
            if only_voices and role not in only_voices:
                continue
            out = out_dir / f'{clip["id"]}.mp3'
            if out.exists() and not args.force:
                skipped += 1
                continue
            if role not in VOICES:
                print(f'  ! {clip["id"]}: unknown role "{role}"')
                failed += 1
                continue
            voice, deflang, speed = VOICES[role]
            lang = LANG_OF.get(clip.get("lang"), deflang)
            try:
                print(f'  voice {chapter["id"]}/{clip["id"]}.mp3 ({role}/{voice}) … ', end="", flush=True)
                write_mp3(out, synth(clip["text"], voice, lang, speed))
                made += 1
                print("ok")
            except Exception as e:  # noqa: BLE001
                failed += 1
                print(f"FAILED\n        {e}")

    print(f"\nDone. {made} generated, {skipped} present, {failed} failed.")
    sys.exit(1 if failed else 0)


if __name__ == "__main__":
    main()
