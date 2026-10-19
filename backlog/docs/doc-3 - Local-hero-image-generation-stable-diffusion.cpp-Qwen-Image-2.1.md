---
id: doc-3
title: Local hero image generation (stable-diffusion.cpp + Qwen-Image 2.1)
type: guide
created_date: '2026-10-18 12:03'
updated_date: '2026-10-18 12:12'
---
# Local hero image generation

How we generate article hero images locally (no cloud, no API keys) with
**stable-diffusion.cpp** (Qwen-Image 2.1), plus the repo scripts that crop
them into the required 1200×630 og:image.

## Why this stack

- **llama.cpp cannot generate images.** It is an LLM runtime; loading a
  Qwen-Image GGUF fails with `unknown model architecture: 'qwen_image'`,
  and its multimodality is vision *input* only. Do not reach for it.
- **stable-diffusion.cpp** (leejet) is the llama.cpp sibling for diffusion
  models. It runs Qwen-Image / Qwen-Image-2.1 natively from GGUF, ships
  `sd-cli` (one-shot) and `sd-server` (HTTP + embedded web UI at
  `http://127.0.0.1:7860`), and builds with Metal on Apple Silicon.
- Alternatives considered: FLUX.2 Klein 4B via ComfyUI (also supported by
  sd-server — a `scripts/hero-flux.mjs` exists as fallback), cloud APIs
  (gpt-image-2 / FLUX Schnell — cost money, need keys), Midjourney (no
  API). Local wins on cost and repeatability.
- License: Qwen-Image family is **Apache 2.0** — free for personal and
  commercial use. (FLUX.2 [dev] is non-commercial for model use;
  Klein 4B is Apache 2.0.)

## Machine setup (recorded 2026-10-18, Apple Silicon Mac)

### 1. Build stable-diffusion.cpp

```bash
cd ~ && git clone --recursive https://github.com/leejet/stable-diffusion.cpp
cd stable-diffusion.cpp
SDKROOT=/Library/Developer/CommandLineTools/SDKs/MacOSX26.5.sdk \
  cmake -B build -DCMAKE_BUILD_TYPE=Release \
        -DCMAKE_OSX_SYSROOT=/Library/Developer/CommandLineTools/SDKs/MacOSX26.5.sdk
cmake --build build --config Release -j 8
# → build/bin/sd-cli, build/bin/sd-server
```

**Known trap on this machine:** the newest SDK
(`MacOSX27.0.sdk`) is corrupt — every link fails with
`ld: tapi error: malformed file`. CMake auto-picks the newest SDK, so pin
`CMAKE_OSX_SYSROOT` to `MacOSX26.5.sdk` (verified working) until Apple
ships a fixed 27 SDK. `xcode-select` points at CommandLineTools only
(no full Xcode).

### 2. Download models (~13.4 GB, once)

```bash
mkdir -p ~/sdmodels && cd ~/sdmodels
curl -LO https://huggingface.co/leejet/Qwen-Image-2.1-GGUF/resolve/main/qwen_image_2.1-Q8_0.gguf          # 7.7 GB, diffusion
curl -LO https://huggingface.co/Comfy-Org/Qwen-Image-2.1/resolve/main/vae/qwen_image_2.1_vae_bf16.safetensors  # 0.7 GB
curl -LO https://huggingface.co/Qwen/Qwen3-VL-8B-Instruct-GGUF/resolve/main/Qwen3VL-8B-Instruct-Q4_K_M.gguf    # 5 GB, text encoder
```

For image *editing* additionally:
`mmproj-Qwen3VL-8B-Instruct-F16.gguf` (1.1 GB) + `--llm_vision`.

### 3. Start the server

```bash
~/stable-diffusion.cpp/build/bin/sd-server \
  --diffusion-model ~/sdmodels/qwen_image_2.1-Q8_0.gguf \
  --vae ~/sdmodels/qwen_image_2.1_vae_bf16.safetensors \
  --llm ~/sdmodels/Qwen3VL-8B-Instruct-Q4_K_M.gguf \
  --offload-to-cpu \
  --listen-ip 127.0.0.1 --listen-port 7860
```

Web UI: `http://127.0.0.1:7860` — prompt box, size, seed, steps, sampler.
API: OpenAI-compatible `POST /v1/images/generations`.

### 4. Generate a hero candidate

```bash
cd /Volumes/DEV/articles
SD_HOST=127.0.0.1 SD_PORT=7860 node scripts/hero-qwen.mjs
# → src/content/articles/0005-data-privacy-gdpr-in-ai/hero-qwen.png (raw)
#   .../hero-qwen-1200x630.png (cover-cropped, ready to compare)
```

The script contains the locked house-style prompt (colored-pencil on white
paper, throwing personal data toward a friendly robot, one orange accent,
**no text** — words are overlaid later as Caveat SVG paths).

## Repo conventions

- Candidates are written as `hero-<name>-1200x630.png` next to the article;
  they never overwrite `hero.png` / `hero.svg` / `index.md` until the user
  picks a winner.
- All hero work lives on an article branch (e.g. `review-0005-humanize`);
  generation scripts live on `hero-0005-local-gen` (PR #64, `scripts/README-hero.md`).
- In-image text: raster stays text-free; handwriting words are SVG paths
  (embedded font does NOT survive sharp/librsvg rendering — it silently
  falls back to a system font).
- Only 1200×630 is allowed in frontmatter/og:image.

## Expectations / limits

- Qwen-Image 2.1 Q8_0 (7.7 GB) + encoder (5 GB) + VAE ≈ 14 GB unified
  memory → comfortable on 32 GB with `--offload-to-cpu`.
- 1216×640 @ 40 steps: minutes per image on Apple GPU (not instant).
  Turbo/lightning GGUF variants exist if iteration speed becomes a problem.
- sd-server also supports FLUX.2 Klein (`docs/flux.md`) if we ever switch.

## Related

- `scripts/README-hero.md` — quick-start for both generation scripts
- `scripts/hero-qwen.mjs`, `scripts/hero-flux.mjs`
- Art-direction rules: `AGENTS.md` → Images & diagrams (PR #63)
