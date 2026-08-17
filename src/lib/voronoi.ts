// Minimal, dependency-free Voronoi for the home mosaic.
// Cells are computed by half-plane clipping (each cell is the exact region
// closest to its site), clipped to the frame — so they tessellate gap-free.
// Article sites are pinned; filler sites get Lloyd relaxation so they spread
// evenly into the space around the articles.

export type Pt = { x: number; y: number };

// Deterministic PRNG so the layout is stable between builds.
function mulberry32(a: number): () => number {
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function clipHalf(poly: Pt[], nx: number, ny: number, mx: number, my: number): Pt[] {
  // keep the half-plane where (p - m) · n >= 0
  const out: Pt[] = [];
  const n = poly.length;
  for (let i = 0; i < n; i++) {
    const a = poly[i];
    const b = poly[(i + 1) % n];
    const da = (a.x - mx) * nx + (a.y - my) * ny;
    const db = (b.x - mx) * nx + (b.y - my) * ny;
    if (da >= 0) out.push(a);
    if (da >= 0 !== db >= 0) {
      const t = da / (da - db);
      out.push({ x: a.x + t * (b.x - a.x), y: a.y + t * (b.y - a.y) });
    }
  }
  return out;
}

export function cell(i: number, sites: Pt[], W: number, H: number): Pt[] {
  const s = sites[i];
  let poly: Pt[] = [
    { x: 0, y: 0 },
    { x: W, y: 0 },
    { x: W, y: H },
    { x: 0, y: H },
  ];
  for (let j = 0; j < sites.length; j++) {
    if (j === i) continue;
    const t = sites[j];
    poly = clipHalf(poly, s.x - t.x, s.y - t.y, (s.x + t.x) / 2, (s.y + t.y) / 2);
    if (poly.length < 3) break;
  }
  return poly;
}

export function polyArea(p: Pt[]): number {
  let s = 0;
  for (let i = 0; i < p.length; i++) {
    const j = (i + 1) % p.length;
    s += p[i].x * p[j].y - p[j].x * p[i].y;
  }
  return Math.abs(s / 2);
}

export function centroid(p: Pt[]): Pt {
  let A = 0, cx = 0, cy = 0;
  for (let i = 0; i < p.length; i++) {
    const j = (i + 1) % p.length;
    const cr = p[i].x * p[j].y - p[j].x * p[i].y;
    A += cr;
    cx += (p[i].x + p[j].x) * cr;
    cy += (p[i].y + p[j].y) * cr;
  }
  A /= 2;
  if (Math.abs(A) < 1e-6) return { x: p[0].x, y: p[0].y };
  return { x: cx / (6 * A), y: cy / (6 * A) };
}

const clamp = (v: number, a: number, b: number) => (v < a ? a : v > b ? b : v);

// Build the full mosaic. `articleSites` are pinned (their order = article order);
// `fillerCount` random filler sites are added and relaxed around them.
export function buildMosaic(
  articleSites: Pt[],
  fillerCount: number,
  W: number,
  H: number,
  seed = 20260817,
  pad = 6
): { articleCells: Pt[][]; fillerCells: Pt[][] } {
  const rnd = mulberry32(seed);
  const filler: Pt[] = [];
  for (let i = 0; i < fillerCount; i++) {
    filler.push({ x: pad + rnd() * (W - 2 * pad), y: pad + rnd() * (H - 2 * pad) });
  }
  const A = articleSites.length;
  // Lloyd relaxation on filler only (articles stay pinned).
  for (let pass = 0; pass < 2; pass++) {
    const sites = articleSites.concat(filler);
    for (let k = 0; k < filler.length; k++) {
      const c = centroid(cell(A + k, sites, W, H));
      filler[k] = { x: clamp(c.x, pad, W - pad), y: clamp(c.y, pad, H - pad) };
    }
  }
  const sites = articleSites.concat(filler);
  const articleCells = articleSites.map((_, i) => cell(i, sites, W, H));
  const fillerCells = filler.map((_, k) => cell(A + k, sites, W, H));
  return { articleCells, fillerCells };
}

// Relative article positions, radiating from top-centre (index 0 = newest).
// Scaled to (W, H) by the caller. Extra articles beyond this list fall back to
// a seeded scatter in the lower area.
export const ARTICLE_LAYOUT: Pt[] = [
  { x: 0.5, y: 0.13 },
  { x: 0.33, y: 0.31 },
  { x: 0.67, y: 0.31 },
  { x: 0.19, y: 0.53 },
  { x: 0.5, y: 0.5 },
  { x: 0.81, y: 0.53 },
  { x: 0.33, y: 0.73 },
  { x: 0.67, y: 0.73 },
  { x: 0.16, y: 0.87 },
  { x: 0.84, y: 0.87 },
  { x: 0.5, y: 0.88 },
];

export function pathFrom(poly: Pt[]): string {
  return 'M' + poly.map((p) => `${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' L ') + ' Z';
}

export function wrapTitle(s: string, max = 16, maxLines = 3): string[] {
  const words = s.split(' ');
  const lines: string[] = [];
  let cur = '';
  for (const w of words) {
    if ((cur + ' ' + w).trim().length > max) {
      if (cur) lines.push(cur);
      cur = w;
    } else cur = (cur + ' ' + w).trim();
  }
  if (cur) lines.push(cur);
  return lines.slice(0, maxLines);
}
