# Hero generation scripts

Two local paths (pick one):

## Option 1: Qwen-Image 2.1 via stable-diffusion.cpp (sd-server)
Recommended for text-free hero (we overlay words as SVG paths). Runs locally on Mac.

### Setup
1. Build or install stable-diffusion.cpp: https://github.com/leejet/stable-diffusion.cpp
2. Download models (Qwen-Image 2.1):
```bash
mkdir -p ~/sdmodels
curl -L -o ~/sdmodels/qwen_image_2.1-Q8_0.gguf https://huggingface.co/leejet/Qwen-Image-2.1-GGUF/resolve/main/qwen_image_2.1-Q8_0.gguf
curl -L -o ~/sdmodels/qwen_image_2.1_vae_bf16.safetensors https://huggingface.co/Comfy-Org/Qwen-Image-2.1/resolve/main/vae/qwen_image_2.1_vae_bf16.safetensors
curl -L -o ~/sdmodels/Qwen3VL-8B-Instruct-Q4_K_M.gguf https://huggingface.co/Qwen/Qwen3-VL-8B-Instruct-GGUF/resolve/main/Qwen3VL-8B-Instruct-Q4_K_M.gguf
```

3. Start sd-server (Metal):
```bash
sd-server \
  --diffusion-model ~/sdmodels/qwen_image_2.1-Q8_0.gguf \
  --vae ~/sdmodels/qwen_image_2.1_vae_bf16.safetensors \
  --llm ~/sdmodels/Qwen3VL-8B-Instruct-Q4_K_M.gguf \
  --offload-to-cpu --listen-ip 127.0.0.1 --listen-port 7860
```

4. Generate:
```bash
cd /Volumes/DEV/articles
SD_HOST=127.0.0.1 SD_PORT=7860 node scripts/hero-qwen.mjs
# → produces hero-qwen-1200x630.png in 0005 folder
```

## Option 2: FLUX.2 Klein 4B via ComfyUI Desktop (API)
1. Install ComfyUI Desktop
2. Put `flux2-klein-4b-Q4_K_M.gguf` in `~/ComfyUI/models/diffusion_models/`
3. Start ComfyUI (API on 8188)
4. `COMFYUI_HOST=127.0.0.1 COMFYUI_PORT=8188 node scripts/hero-flux.mjs`

## Workflow
- Generate candidate(s) as `hero-*-1200x630.png` (never overwrites hero.png/hero.svg/index.md)
- Pick winner → copy to `hero.png` (SVG stays as-is if present; we overlay words as paths)
- Commit only the new candidate(s) on the article branch, or replace hero.png in a separate commit after approval
