// Node wrapper for the Kokoro (Python) voice generator. Keeps audio-manifest.mjs
// as the single source of truth: it materializes the manifest data to a temp JSON
// and runs the Python generator inside the local .venv-audio. Forwards CLI args:
//   npm run audio -- --only arrival --force
//   npm run audio -- --only work          (after Ch2 sign-off)
//   npm run audio -- --voice MARIA --force

import { spawn } from 'node:child_process';
import { existsSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { beds, chapters } from './audio-manifest.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const py =
  process.platform === 'win32'
    ? join(root, '.venv-audio', 'Scripts', 'python.exe')
    : join(root, '.venv-audio', 'bin', 'python');

if (!existsSync(py)) {
  console.error(
    'Audio venv missing (.venv-audio). Do the one-time setup first — see\n' +
      'docs/audio/chapter-01-ai-voice-script.md (uv venv + Kokoro install).'
  );
  process.exit(1);
}

const manifestPath = join(tmpdir(), 'travesia-audio-manifest.json');
writeFileSync(manifestPath, JSON.stringify({ beds, chapters }), 'utf8');

const child = spawn(
  py,
  [join(root, 'scripts', 'generate-audio-kokoro.py'), ...process.argv.slice(2)],
  { stdio: 'inherit', cwd: root, env: { ...process.env, KOKORO_MANIFEST: manifestPath } }
);
child.on('exit', (code) => process.exit(code ?? 0));
