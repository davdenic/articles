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

function dist2(a: Pt, b: Pt): number {
  const dx = a.x - b.x, dy = a.y - b.y;
  return dx * dx + dy * dy;
}
function nearAny(p: Pt, arr: Pt[], d: number): boolean {
  const d2 = d * d;
  return arr.some((q) => dist2(p, q) < d2);
}

// Article cluster as a downward-growing triangular lattice → touching, regular
// HEXAGON cells radiating from the top-centre apex (index 0 = newest, then row
// by row). Guards close the boundary cells; small jittered filler fills around.
export function hexClusterMosaic(
  n: number,
  W: number,
  H: number,
  seed = 20260817
): { articleCells: Pt[][]; fillerCells: Pt[][] } {
  const rnd = mulberry32(seed);
  // rows needed for a downward triangle (1 + 2 + ... = triangular number >= n)
  const R = Math.max(0, Math.ceil((-1 + Math.sqrt(1 + 8 * n)) / 2) - 1);
  // spacing that keeps the cluster inside the frame (and cells text-sized)
  const a = Math.min(360, (0.6 * W) / Math.max(1, R), (0.8 * H) / Math.max(1, R + 1));
  const h = (a * Math.sqrt(3)) / 2;
  const y0 = a * 0.62;

  const articleSites: Pt[] = [];
  for (let r = 0; articleSites.length < n; r++) {
    for (let i = 0; i <= r && articleSites.length < n; i++) {
      articleSites.push({ x: W / 2 + (i - r / 2) * a, y: y0 + r * h });
    }
  }

  // guards = the 6 lattice neighbours of each article that aren't articles
  const nb = [
    { x: a, y: 0 }, { x: -a, y: 0 },
    { x: a / 2, y: h }, { x: -a / 2, y: h },
    { x: a / 2, y: -h }, { x: -a / 2, y: -h },
  ];
  const guards: Pt[] = [];
  articleSites.forEach((s) => {
    nb.forEach((o) => {
      const p = { x: s.x + o.x, y: s.y + o.y };
      if (nearAny(p, articleSites, a * 0.4)) return;
      if (nearAny(p, guards, a * 0.4)) return;
      guards.push(p);
    });
  });

  // small jittered background filler, kept clear of the cluster
  const scatter: Pt[] = [];
  const step = a * 0.6;
  const gx = Math.max(2, Math.round(W / step));
  const gy = Math.max(2, Math.round(H / step));
  for (let r = 0; r < gy; r++) {
    for (let c = 0; c < gx; c++) {
      const p = {
        x: ((c + 0.5) / gx) * W + (rnd() * 2 - 1) * step * 0.4,
        y: ((r + 0.5) / gy) * H + (rnd() * 2 - 1) * step * 0.4,
      };
      if (nearAny(p, articleSites, a * 0.9)) continue;
      if (nearAny(p, guards, a * 0.42)) continue;
      scatter.push(p);
    }
  }

  const sites = articleSites.concat(guards, scatter);
  const articleCells = articleSites.map((_, i) => cell(i, sites, W, H));
  const fillerCells: Pt[][] = [];
  for (let i = articleSites.length; i < sites.length; i++) fillerCells.push(cell(i, sites, W, H));
  return { articleCells, fillerCells };
}

// Mosaic where the ARTICLE cells come out near-regular pentagons/hexagons:
// each article site is ringed by evenly-spaced "guard" sites (5 or 6), so its
// Voronoi cell is a regular-ish polygon. Background filler fills the rest.
// No relaxation — that would break the regular rings.
export function buildRegularMosaic(
  articleSites: Pt[],
  W: number,
  H: number,
  seed = 20260817
): { articleCells: Pt[][]; fillerCells: Pt[][] } {
  const rnd = mulberry32(seed);
  const A = articleSites.length;

  // nearest-neighbour spacing among articles → guard-ring radius
  let dmin = Infinity;
  for (let i = 0; i < A; i++)
    for (let j = i + 1; j < A; j++) dmin = Math.min(dmin, Math.sqrt(dist2(articleSites[i], articleSites[j])));
  if (!isFinite(dmin)) dmin = Math.min(W, H) / 3;
  const Rg = dmin * 0.46;

  // guard ring per article: 5 or 6 sides, rotated a little for variety
  const guards: Pt[] = [];
  articleSites.forEach((a, k) => {
    const sides = k % 3 === 0 ? 5 : 6;
    const off = k * 0.7;
    for (let j = 0; j < sides; j++) {
      const ang = off + (j * 2 * Math.PI) / sides;
      guards.push({ x: a.x + Rg * Math.cos(ang), y: a.y + Rg * Math.sin(ang) });
    }
  });

  // background filler: a jittered grid, rejecting points that would intrude on
  // an article's guard ring (which would spoil the regular shape)
  const scatter: Pt[] = [];
  const step = Rg * 1.7;
  const gx = Math.max(2, Math.round(W / step));
  const gy = Math.max(2, Math.round(H / step));
  for (let r = 0; r < gy; r++) {
    for (let c = 0; c < gx; c++) {
      const p = {
        x: ((c + 0.5) / gx) * W + (rnd() * 2 - 1) * Rg * 0.4,
        y: ((r + 0.5) / gy) * H + (rnd() * 2 - 1) * Rg * 0.4,
      };
      if (nearAny(p, articleSites, Rg * 1.15)) continue;
      if (nearAny(p, guards, Rg * 0.55)) continue;
      scatter.push(p);
    }
  }

  const sites = articleSites.concat(guards, scatter);
  const articleCells = articleSites.map((_, i) => cell(i, sites, W, H));
  const fillerCells: Pt[][] = [];
  for (let i = A; i < sites.length; i++) fillerCells.push(cell(i, sites, W, H));
  return { articleCells, fillerCells };
}

// Relative article positions (0..1), genuinely radiating from top-centre:
// index 0 sits at the apex, the rest fan outward on widening downward arcs.
// Scaled to (W, H) by the caller.
const clamp01 = (v: number) => Math.max(0.05, Math.min(0.95, v));

export function radialLayout(n: number): Pt[] {
  const pts: Pt[] = [{ x: 0.5, y: 0.14 }]; // newest, top-centre apex
  const rings = [
    { r: 0.40, c: 2 },
    { r: 0.66, c: 3 },
    { r: 0.88, c: 4 },
    { r: 0.99, c: 5 },
  ];
  let i = 1;
  for (const ring of rings) {
    for (let j = 0; j < ring.c && i < n; j++, i++) {
      // fan across a downward arc: 38° (down-right) .. 142° (down-left)
      const deg = ring.c === 1 ? 90 : 38 + (104 * j) / (ring.c - 1);
      const rad = (deg * Math.PI) / 180;
      pts.push({
        x: clamp01(0.5 + ring.r * Math.cos(rad) * 0.62),
        y: clamp01(0.09 + ring.r * Math.sin(rad) * 0.98),
      });
    }
    if (i >= n) break;
  }
  // overflow (rare): scatter deeper down
  while (i < n) {
    pts.push({ x: clamp01(0.12 + ((i * 0.19) % 0.76)), y: clamp01(0.62 + ((i * 0.13) % 0.33)) });
    i++;
  }
  return pts;
}

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
