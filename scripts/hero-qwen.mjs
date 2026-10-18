#!/usr/bin/env node
import { writeFile } from 'node:fs/promises';
import { request as httpRequest } from 'node:http';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const root = join(__dirname, '..');
const articleDir = join(root, 'src/content/articles/0005-data-privacy-gdpr-in-ai');

const SD_HOST = process.env.SD_HOST || '127.0.0.1';
const SD_PORT = process.env.SD_PORT || '7860';
const GENERATE_URL = `http://${SD_HOST}:${SD_PORT}/sdapi/v1/txt2img`;

const prompt = `Create a 1216×640 landscape illustration in colored-pencil style on plain white paper.
Show a minimal hand (only the fingers, no wrist) holding a laptop and throwing a handful of three small papers toward a friendly robot on the right.
Papers are in mid-flight, following a clear diagonal arc from left to right.
Each paper carries a simple icon: an envelope for an email, a phone handset for a phone number, and a small square photo. No actual text labels.
The robot is stylized, friendly, with a simple head and an arm; give it one orange accent (e.g., eye or a line on a paper).
Use only colored-pencil strokes and visible paper grain. Keep the whole scene hand-drawn comic-style.
No shading blobs, no 3-D or gloss, no logos, no frames, no text, and only 4–5 elements: hand, robot, envelope, phone, photo.`;

async function generate() {
  const body = JSON.stringify({
    prompt,
    negative_prompt: '',
    width: 1216,
    height: 640,
    steps: 30,
    cfg_scale: 2.5,
    sampler_name: 'Euler',
    batch_size: 1,
    seed: -1
  });

  // Raw http.request: undici's fetch aborts after 5 min waiting for headers,
  // and a full-res Qwen-Image render on this Mac takes longer than that.
  const data = await new Promise((resolve, reject) => {
    const req = httpRequest(
      {
        host: SD_HOST,
        port: Number(SD_PORT),
        path: '/sdapi/v1/txt2img',
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) },
        timeout: 45 * 60 * 1000 // 45 min: a 1216×640 render takes 15–25 min on this Mac
      },
      (res) => {
        let buf = '';
        res.on('data', (c) => (buf += c));
        res.on('end', () => {
          if (res.statusCode < 200 || res.statusCode >= 300) {
            reject(new Error(`sd-server error ${res.statusCode}: ${buf.slice(0, 200)}`));
          } else {
            try { resolve(JSON.parse(buf)); } catch (e) { reject(new Error('Bad JSON from sd-server')); }
          }
        });
      }
    );
    req.on('timeout', () => req.destroy(new Error('sd-server request timed out (30 min)')));
    req.on('error', reject);
    req.write(body);
    req.end();
  });
  if (!data.images || !data.images[0]) throw new Error('No images returned');
  return data.images[0]; // base64
}

async function saveAndCrop(b64, name) {
  const buf = Buffer.from(b64, 'base64');
  const raw = join(articleDir, name + '.png');
  await writeFile(raw, buf);
  const out = join(articleDir, name + '-1200x630.png');
  await sharp(raw).resize(1200, 630, { fit: 'cover', position: 'attention' }).png({ compressionLevel: 9 }).toFile(out);
  console.log('Wrote', out);
  return out;
}

async function main() {
  try {
    console.log('Calling sd-server at', GENERATE_URL);
    const b64 = await generate();
    await saveAndCrop(b64, 'hero-qwen');
    console.log('Done. Review hero-qwen-1200x630.png, then replace hero.png if approved.');
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

main();
