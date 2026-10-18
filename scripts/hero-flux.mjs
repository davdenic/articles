#!/usr/bin/env node
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const root = join(__dirname, '..');
const articleDir = join(root, 'src/content/articles/0005-data-privacy-gdpr-in-ai');

const COMFY_HOST = process.env.COMFYUI_HOST || '127.0.0.1';
const COMFY_PORT = process.env.COMFYUI_PORT || '8188';
const COMFY_URL = `http://${COMFY_HOST}:${COMFY_PORT}/prompt`;

const prompt = `Create a 1216×640 landscape illustration in colored-pencil style on plain white paper.
Show a minimal hand (only the fingers, no wrist) holding a laptop and throwing a handful of three small papers toward a friendly robot on the right.
Papers are in mid-flight, following a clear diagonal arc from left to right.
Each paper carries a simple icon: an envelope for an email, a phone handset for a phone number, and a small square photo. No actual text labels.
The robot is stylized, friendly, with a simple head and an arm; give it one orange accent (e.g., eye or a line on a paper).
Use only colored-pencil strokes and visible paper grain. Keep the whole scene hand-drawn comic-style.
No shading blobs, no 3-D or gloss, no logos, no frames, no text, and only 4–5 elements: hand, robot, envelope, phone, photo.`;

async function queuePrompt() {
  const workflow = {
    '1': {
      inputs: { text: prompt, clip: ['2', 0] },
      class_type: 'CLIPTextEncode',
      _meta: { title: 'Positive Prompt' }
    },
    '2': {
      inputs: { model: ['4', 0], clip: ['4', 1] },
      class_type: 'CheckpointLoaderSimple',
      _meta: { title: 'Load Checkpoint' }
    },
    '3': {
      inputs: { text: '', clip: ['2', 0] },
      class_type: 'CLIPTextEncode',
      _meta: { title: 'Negative Prompt' }
    },
    '4': {
      inputs: {
        ckpt_name: 'flux2-klein-4b-Q4_K_M.gguf'
      },
      class_type: 'GGUFLoader',
      _meta: { title: 'GGUFLoader' }
    },
    '5': {
      inputs: {
        width: 1216,
        height: 640,
        batch_size: 1
      },
      class_type: 'EmptyLatentImage',
      _meta: { title: 'Empty Latent' }
    },
    '6': {
      inputs: {
        seed: Math.floor(Math.random() * 2 ** 31),
        steps: 25,
        cfg: 3.8,
        sampler_name: 'euler',
        scheduler: 'normal',
        denoise: 1,
        model: ['4', 0],
        positive: ['1', 0],
        negative: ['3', 0],
        latent_image: ['5', 0]
      },
      class_type: 'KSampler',
      _meta: { title: 'KSampler' }
    },
    '7': {
      inputs: { samples: ['6', 0], vae: ['4', 2] },
      class_type: 'VAEDecode',
      _meta: { title: 'VAE Decode' }
    },
    '8': {
      inputs: { images: ['7', 0], filename_prefix: 'hero-flux' },
      class_type: 'SaveImage',
      _meta: { title: 'Save Image' }
    }
  };

  const res = await fetch(COMFY_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt: workflow })
  });

  if (!res.ok) throw new Error(`ComfyUI queue failed: ${res.status} ${res.statusText}`);
  const data = await res.json();
  console.log('Queued:', data.prompt_id);
  return data.prompt_id;
}

async function waitForCompletion(promptId) {
  const historyUrl = `http://${COMFY_HOST}:${COMFY_PORT}/history/${promptId}`;
  for (let i = 0; i < 600; i++) { // ~10 minutes max
    const res = await fetch(historyUrl);
    if (!res.ok) { await new Promise(r => setTimeout(r, 1000)); continue; }
    const hist = await res.json();
    if (hist[promptId]) {
      const outputs = hist[promptId].outputs || {};
      const save = outputs['8'] || Object.values(outputs)[0];
      const images = save?.images || [];
      return images[0]; // { filename, subfolder, type }
    }
    await new Promise(r => setTimeout(r, 1000));
  }
  throw new Error('Timed out waiting for ComfyUI');
}

async function downloadImage(img) {
  const url = `http://${COMFY_HOST}:${COMFY_PORT}/view?filename=${encodeURIComponent(img.filename)}&type=${img.type || 'output'}&subfolder=${img.subfolder || ''}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Download failed: ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  const raw = join(articleDir, 'hero-flux.png');
  await writeFile(raw, buf);
  console.log('Saved', raw);
  return raw;
}

async function cropTo1200x630(src) {
  const out = join(articleDir, 'hero-flux-1200x630.png');
  await sharp(src)
    .resize(1200, 630, { fit: 'cover', position: 'attention' })
    .png({ compressionLevel: 9 })
    .toFile(out);
  console.log('Cropped to', out);
  return out;
}

async function main() {
  try {
    const pid = await queuePrompt();
    const img = await waitForCompletion(pid);
    const raw = await downloadImage(img);
    await cropTo1200x630(raw);
    console.log('Done. Inspect hero-flux-1200x630.png and replace hero.png if you like it.');
  } catch (e) {
    console.error('Error:', e);
    process.exit(1);
  }
}

main();
