#!/usr/bin/env node
// ============================================================================
// generate-agendas.mjs — Timed session agenda companions from slide decks
// ============================================================================
//
// Layout (commit when happy; deploy only copies):
//   slides/companions/<category>/<slug>/agenda.md
//   slides/companions/<category>/<slug>/agenda.html
//
// Usage (from slides/ or repo root):
//   node scripts/generate-agendas.mjs                  # seed missing MD from decks
//   node scripts/generate-agendas.mjs copilot-cli
//   node scripts/generate-agendas.mjs --from-slides     # overwrite MD from deck
//   node scripts/generate-agendas.mjs --html-only       # rebuild HTML from MD
//   node scripts/generate-agendas.mjs --duration 50     # default total minutes
//
// Agenda shape (presenter handout):
//   Title
//   Agenda (45 min)
//   1. Section name (N min)
//
// Source of truth for seeding: the Slidev deck (TocSlide + closing structure).
// agenda.md remains editable; regenerate HTML after hand-tuning times/titles.
// ============================================================================

import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  writeFileSync,
} from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SLIDES = join(__dirname, "..");
const COMPANIONS = join(SLIDES, "companions");

const args = process.argv.slice(2);
const fromSlides =
  args.includes("--from-slides") || args.includes("--from-recipe");
const htmlOnly = args.includes("--html-only");
const durationIdx = args.indexOf("--duration");
const cliDuration =
  durationIdx >= 0 && args[durationIdx + 1]
    ? Number(args[durationIdx + 1])
    : null;
const slugFilter = args.find(
  (a, i) =>
    !a.startsWith("--") && !(durationIdx >= 0 && i === durationIdx + 1),
);

const DEFAULT_DURATION = 45;
const CATEGORY_FOLDERS = [
  { category: "tech-talks", dir: join(SLIDES, "tech-talks") },
  { category: "workshop", dir: join(SLIDES, "workshop") },
  { category: "exec-talks", dir: join(SLIDES, "exec-talks") },
];

function scalar(raw) {
  let v = String(raw).trim();
  if (
    (v.startsWith('"') && v.endsWith('"')) ||
    (v.startsWith("'") && v.endsWith("'"))
  ) {
    v = v.slice(1, -1);
  }
  return v.replace(/\\"/g, '"').replace(/&#39;/g, "'");
}

function parseFrontmatter(text) {
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) return { meta: {}, body: text };
  const meta = {};
  for (const line of m[1].split(/\r?\n/)) {
    const kv = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!kv) continue;
    meta[kv[1]] = scalar(kv[2]);
  }
  return { meta, body: text.slice(m[0].length) };
}

function extractBracketArray(src, openBracketIndex) {
  if (src[openBracketIndex] !== "[") return null;
  let depth = 0;
  let inStr = false;
  let quote = "";
  let escaped = false;
  for (let i = openBracketIndex; i < src.length; i++) {
    const ch = src[i];
    if (inStr) {
      if (escaped) {
        escaped = false;
        continue;
      }
      if (ch === "\\") {
        escaped = true;
        continue;
      }
      if (ch === quote) inStr = false;
      continue;
    }
    if (ch === '"' || ch === "'") {
      inStr = true;
      quote = ch;
      continue;
    }
    if (ch === "[") depth++;
    else if (ch === "]") {
      depth--;
      if (depth === 0) return src.slice(openBracketIndex, i + 1);
    }
  }
  return null;
}

function parseTocSections(deckText) {
  const tocIdx = deckText.search(/<TocSlide\b/);
  if (tocIdx < 0) return [];
  const after = deckText.slice(tocIdx);
  const quote = after.includes(":sections='")
    ? "'"
    : after.includes(':sections="')
      ? '"'
      : null;
  if (!quote) return [];
  const marker = `:sections=${quote}`;
  const mPos = after.indexOf(marker);
  if (mPos < 0) return [];
  let i = mPos + marker.length;
  while (/\s/.test(after[i])) i++;
  if (after[i] !== "[") return [];
  const arr = extractBracketArray(after, i);
  if (!arr) return [];

  const items = [];
  const objRe = /\{([^{}]*)\}/g;
  let om;
  while ((om = objRe.exec(arr))) {
    const block = om[1];
    const title = block.match(/\btitle:\s*["']([^"']+)["']/)?.[1];
    const slideRaw = block.match(/\bslide:\s*(\d+)/)?.[1];
    if (title) {
      items.push({
        title: title.trim(),
        slide: slideRaw ? Number(slideRaw) : null,
      });
    }
  }
  return items;
}

function parseSectionOpeners(deckText) {
  const items = [];
  const re = /<SectionOpenerSlide\b[\s\S]*?\/>/g;
  let m;
  while ((m = re.exec(deckText))) {
    const title = m[0].match(/\btitle="([^"]+)"/)?.[1];
    if (title) items.push({ title: title.trim(), slide: null });
  }
  return items;
}

function hasComponent(deckText, name) {
  return new RegExp(`<${name}\\b`).test(deckText);
}

function countSlideSeparators(deckText) {
  const parts = deckText.split(/\r?\n---\r?\n/);
  return Math.max(1, parts.length - 1);
}

function estimateWeights(tocItems, totalSlides) {
  if (tocItems.length && tocItems.every((t) => t.slide != null)) {
    const starts = tocItems.map((t) => t.slide);
    const weights = [];
    for (let i = 0; i < starts.length; i++) {
      const start = starts[i];
      const end =
        i + 1 < starts.length
          ? starts[i + 1]
          : Math.max(start + 1, totalSlides - 2);
      weights.push(Math.max(1, end - start));
    }
    return weights;
  }
  return tocItems.map(() => 1);
}

function allocateMinutes(weights, totalMinutes, closeReserve) {
  const bodyBudget = Math.max(weights.length * 2, totalMinutes - closeReserve);
  const sumW = weights.reduce((a, b) => a + b, 0) || 1;
  const mins = weights.map((w) => Math.max(2, Math.round((w / sumW) * bodyBudget)));
  let diff = bodyBudget - mins.reduce((a, b) => a + b, 0);
  let guard = 0;
  while (diff !== 0 && guard++ < 100) {
    if (diff > 0) {
      const i = mins.indexOf(Math.min(...mins));
      mins[i]++;
      diff--;
    } else {
      let i = -1;
      let best = -1;
      for (let k = 0; k < mins.length; k++) {
        if (mins[k] > 2 && mins[k] > best) {
          best = mins[k];
          i = k;
        }
      }
      if (i < 0) break;
      mins[i]--;
      diff++;
    }
  }
  return mins;
}

function buildClosingItems(deckText, remainingMinutes) {
  const items = [];
  const hasBA = hasComponent(deckText, "BeforeAfterSlide");
  const hasToday = hasComponent(deckText, "WhatYouCanDoTodaySlide");
  const hasRefs = hasComponent(deckText, "ReferencesSlide");

  if (hasBA || hasToday) {
    const title =
      hasBA && hasToday
        ? "Before/After & What You Can Do Today"
        : hasBA
          ? "Before / After"
          : "What You Can Do Today";
    items.push({ title, kind: "close" });
  }
  if (hasRefs) items.push({ title: "References", kind: "refs" });
  if (!items.length) return [];

  let budget = Math.max(items.length, remainingMinutes);
  if (items.length === 2 && items[1].kind === "refs") {
    const refs = Math.min(2, Math.max(1, Math.floor(budget / 3)));
    return [
      { title: items[0].title, minutes: budget - refs },
      { title: items[1].title, minutes: refs },
    ];
  }
  const base = Math.floor(budget / items.length);
  let rem = budget - base * items.length;
  return items.map((it) => {
    const minutes = Math.max(1, base + (rem > 0 ? 1 : 0));
    if (rem > 0) rem--;
    return { title: it.title, minutes };
  });
}


function decodeEntities(s) {
  return String(s)
    .replace(/&#x([0-9a-fA-F]+);/g, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function stripEmojiPrefix(title) {
  return title
    .replace(/^[\p{Emoji_Presentation}\p{Extended_Pictographic}\uFE0F\u200D\s]+/u, "")
    .trim();
}

/** Workshop/fanhub: Section opener slides with "Section N" + following h1 */
function parseHtmlSectionOpeners(deckText) {
  const items = [];
  const parts = deckText.split(/\r?\n---\r?\n/);
  for (const part of parts) {
    const isOpener =
      /Section Opener/i.test(part) ||
      /tracking-widest uppercase">\s*Section\s+\d+/i.test(part) ||
      />\s*Section\s+\d+\s*</i.test(part);
    if (!isOpener) continue;
    const h1 =
      part.match(/<h1[^>]*>\s*([\s\S]*?)\s*<\/h1>/i)?.[1] ||
      part.match(/class="[^"]*text-5xl[^"]*"[^>]*>\s*([\s\S]*?)\s*</i)?.[1];
    if (!h1) continue;
    const title = stripEmojiPrefix(
      decodeEntities(h1.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim()),
    );
    if (title && title.length < 80) items.push({ title, slide: null });
  }
  return items;
}

/** Cockpit decks: curated <!-- SLIDE: ... --> markers */
function parseSlideCommentAgenda(deckText) {
  const raw = [];
  const re = /<!--\s*SLIDE:\s*([^>]+?)\s*-->/g;
  let m;
  while ((m = re.exec(deckText))) {
    raw.push(decodeEntities(m[1].trim()));
  }

  const skipExact = new Set([
    "title",
    "thank you",
    "thanks",
    "agenda",
    "toc",
    "table of contents",
    "references",
    "spine overview",
    "spine decisions",
    "spine connection",
  ]);

  const prefer =
    /^(what you|how it|the |exercise|module |checklist|reflect|before|after|layered|file \d|prompt:|roadmap|build|validate|world|rule|fix|ship|vibe)/i;

  const items = [];
  for (const name of raw) {
    if (!name || name.length > 70) continue;
    if (/^part \d/i.test(name)) continue;
    const cleaned = stripEmojiPrefix(name);
    if (!cleaned) continue;
    const key = cleaned.toLowerCase();
    if (skipExact.has(key)) continue;
    if (/prompt:/i.test(cleaned) && !/roadmap/i.test(cleaned)) continue;
    // drop truncated monologue titles
    if (/\s(wi|bec|cod|ta)$/i.test(cleaned)) continue;
    if (cleaned.endsWith(" bec") || cleaned.endsWith(" wi")) continue;

    const hasEmoji = name !== cleaned;
    const isPrefer = prefer.test(cleaned) || hasEmoji;
    if (!isPrefer && items.length >= 4) continue;

    // collapse "File N of M — X" into keep
    items.push({ title: cleaned, slide: null, prefer: isPrefer });
  }

  // Prefer marked items; cap length
  let picked = items.filter((i) => i.prefer);
  if (picked.length < 3) picked = items;
  // de-dupe
  const seen = new Set();
  picked = picked.filter((i) => {
    const k = i.title.toLowerCase();
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
  if (picked.length > 8) {
    // keep first, middle samples, last conceptual
    const head = picked.slice(0, 4);
    const mid = picked.slice(4, -2).filter((_, idx) => idx % 2 === 0).slice(0, 2);
    const tail = picked.slice(-2);
    picked = [...head, ...mid, ...tail];
    // de-dupe again
    const s2 = new Set();
    picked = picked.filter((i) => {
      const k = i.title.toLowerCase();
      if (s2.has(k)) return false;
      s2.add(k);
      return true;
    });
  }
  return picked.map(({ title, slide }) => ({ title, slide }));
}

function parseDeckAgenda(deckPath, fallbackDuration) {
  const text = readFileSync(deckPath, "utf8");
  const { meta } = parseFrontmatter(text);

  const title =
    meta.title ||
    text.match(/<TitleSlide[\s\S]*?\btitle="([^"]+)"/)?.[1] ||
    "Session";

  const subtitle =
    text.match(/<TitleSlide[\s\S]*?\bsubtitle="([^"]+)"/)?.[1] ||
    meta.subtitle ||
    "";

    const durationFromText =
    Number(meta.duration) ||
    Number(text.match(/Workshop\s*[·•]\s*(\d+)\s*minutes?/i)?.[1]) ||
    Number(text.match(/(\d+)\s*minutes?\s+of\s+/i)?.[1]) ||
    null;
  const duration = durationFromText || fallbackDuration || DEFAULT_DURATION;
  const totalSlides = countSlideSeparators(text);

  let toc = parseTocSections(text);
  if (!toc.length) toc = parseSectionOpeners(text);
  if (!toc.length) toc = parseHtmlSectionOpeners(text);
  if (!toc.length) toc = parseSlideCommentAgenda(text);
  if (!toc.length) return { title, subtitle, duration, items: [] };

  const closeCount =
    (hasComponent(text, "BeforeAfterSlide") ||
    hasComponent(text, "WhatYouCanDoTodaySlide")
      ? 1
      : 0) + (hasComponent(text, "ReferencesSlide") ? 1 : 0);
  const closeReserve = closeCount ? Math.min(7, 2 + closeCount * 2) : 0;
  const weights = estimateWeights(toc, totalSlides);
  const bodyMins = allocateMinutes(weights, duration, closeReserve);
  const bodyUsed = bodyMins.reduce((a, b) => a + b, 0);
  const remaining = Math.max(closeCount, duration - bodyUsed);
  const closing = buildClosingItems(text, remaining);

  let items = [
    ...toc.map((t, i) => ({ title: t.title, minutes: bodyMins[i] })),
    ...closing,
  ];
  let sum = items.reduce((a, b) => a + b.minutes, 0);
  if (sum !== duration && items.length) {
    const delta = duration - sum;
    let idx = 0;
    const bodyLen = toc.length;
    for (let i = 1; i < bodyLen; i++) {
      if (items[i].minutes > items[idx].minutes) idx = i;
    }
    items[idx].minutes = Math.max(2, items[idx].minutes + delta);
  }

  return { title, subtitle, duration, items };
}

function parseAgendaMd(text) {
  const { meta, body } = parseFrontmatter(text);
  const items = [];

  const listRe =
    /^\s*(\d+)\.\s+(.+?)\s*(?:\((\d+)\s*min(?:utes)?\))?\s*$/gim;
  let m;
  while ((m = listRe.exec(body))) {
    items.push({
      title: m[2].replace(/\s+$/, "").trim(),
      minutes: m[3] ? Number(m[3]) : null,
    });
  }

  if (!items.length) {
    const secRe =
      /^##\s+(?:\d+\.\s*)?(.+?)\s*(?:\((\d+)\s*min(?:utes)?\))?\s*$/gim;
    while ((m = secRe.exec(body))) {
      items.push({
        title: m[1].trim(),
        minutes: m[2] ? Number(m[2]) : null,
      });
    }
  }

  const agendaHead = body.match(/Agenda\s*\((\d+)\s*min(?:utes)?\)/i);
  const duration =
    Number(meta.duration) ||
    (agendaHead ? Number(agendaHead[1]) : null) ||
    (items.every((i) => i.minutes)
      ? items.reduce((a, b) => a + b.minutes, 0)
      : DEFAULT_DURATION);

  const missing = items.filter((i) => !i.minutes);
  if (missing.length) {
    const known = items.reduce((a, b) => a + (b.minutes || 0), 0);
    const budget = Math.max(missing.length, duration - known);
    const base = Math.floor(budget / missing.length);
    let rem = budget - base * missing.length;
    for (const item of missing) {
      item.minutes = Math.max(1, base + (rem > 0 ? 1 : 0));
      if (rem > 0) rem--;
    }
  }

  const title =
    meta.title ||
    body.match(/^#\s+(.+)$/m)?.[1]?.trim() ||
    meta.slug ||
    "Agenda";

  return {
    meta: {
      title,
      subtitle: meta.subtitle || "",
      slug: meta.slug || "",
      category: meta.category || "tech-talks",
      duration,
      updated: meta.updated || "",
    },
    items,
  };
}

function renderAgendaMd({ title, subtitle, slug, category, duration, items }) {
  const today = new Date().toISOString().slice(0, 10);
  const lines = items
    .map((item, i) => `${i + 1}. ${item.title} (${item.minutes} min)`)
    .join("\n");

  return `---
title: ${JSON.stringify(title)}
subtitle: ${JSON.stringify(subtitle || "")}
slug: ${slug}
category: ${category}
duration: ${duration}
updated: ${today}
---

# ${title}

Agenda (${duration} min)

${lines}
`;
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderAgendaHtml({
  title,
  subtitle,
  slug,
  category,
  duration,
  items,
  updated,
}) {
  const rows = items
    .map(
      (item, i) => `
      <li class="row">
        <span class="num">${i + 1}</span>
        <span class="label">${escapeHtml(item.title)}</span>
        <span class="mins">${item.minutes} min</span>
      </li>`,
    )
    .join("\n");

  const totalCheck = items.reduce((a, b) => a + (b.minutes || 0), 0);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Agenda — ${escapeHtml(title)}</title>
  <style>
    :root {
      --bg: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
      --text: #e2e8f0;
      --muted: #94a3b8;
      --dim: #64748b;
      --card: rgba(255,255,255,0.06);
      --border: rgba(255,255,255,0.13);
      --accent: #22d3ee;
      --accent-2: #3b82f6;
      --chip: rgba(34,211,238,0.15);
    }
    @media (prefers-color-scheme: light) {
      :root {
        --bg: linear-gradient(135deg, #e8edf3 0%, #dde3ec 100%);
        --text: #0f172a;
        --muted: #334155;
        --dim: #64748b;
        --card: #ffffff;
        --border: rgba(0,0,0,0.12);
        --chip: rgba(14,165,233,0.12);
      }
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: "Avenir Next", "Segoe UI", Arial, sans-serif;
      background: var(--bg);
      color: var(--text);
      min-height: 100vh;
      padding: 2rem 1.25rem 3rem;
    }
    .wrap { max-width: 720px; margin: 0 auto; }
    .nav {
      display: flex; gap: 0.75rem; flex-wrap: wrap;
      margin-bottom: 1.5rem; font-size: 0.85rem;
    }
    .nav a {
      color: var(--muted); text-decoration: none;
      border: 1px solid var(--border); border-radius: 999px;
      padding: 0.35rem 0.8rem; background: var(--card);
    }
    .nav a:hover { color: var(--text); border-color: var(--accent); }
    header {
      background: var(--card);
      border: 1px solid var(--border);
      border-left: 4px solid var(--accent);
      border-radius: 12px;
      padding: 1.35rem 1.5rem;
      margin-bottom: 1.25rem;
    }
    .eyebrow {
      font-size: 0.72rem; font-weight: 800; letter-spacing: 0.1em;
      text-transform: uppercase; color: var(--accent); margin-bottom: 0.45rem;
    }
    h1 {
      font-size: clamp(1.45rem, 3vw, 1.9rem);
      line-height: 1.2;
      background: linear-gradient(135deg, var(--accent), var(--accent-2));
      -webkit-background-clip: text; background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-bottom: 0.4rem;
    }
    .subtitle { color: var(--muted); font-size: 1rem; line-height: 1.45; }
    .meta {
      margin-top: 0.85rem; display: flex; flex-wrap: wrap; gap: 0.5rem;
      align-items: center; color: var(--dim); font-size: 0.8rem;
    }
    .pill {
      display: inline-flex; align-items: center;
      background: var(--chip); color: var(--accent);
      border: 1px solid var(--border); border-radius: 999px;
      padding: 0.25rem 0.7rem; font-weight: 800; font-size: 0.78rem;
    }
    .panel {
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 0.5rem 0.35rem;
    }
    .panel-title {
      padding: 0.85rem 1.1rem 0.55rem;
      font-size: 0.78rem; font-weight: 800; letter-spacing: 0.08em;
      text-transform: uppercase; color: var(--dim);
    }
    ol.agenda { list-style: none; }
    .row {
      display: grid;
      grid-template-columns: 2.2rem 1fr auto;
      gap: 0.85rem;
      align-items: center;
      padding: 0.85rem 1.1rem;
      border-top: 1px solid var(--border);
    }
    .row:first-of-type { border-top: 0; }
    .num {
      width: 2rem; height: 2rem; border-radius: 999px;
      display: grid; place-items: center; font-weight: 800; font-size: 0.9rem;
      color: #0f172a; background: linear-gradient(135deg, var(--accent), var(--accent-2));
    }
    .label { font-size: 1.05rem; font-weight: 650; line-height: 1.3; }
    .mins {
      font-variant-numeric: tabular-nums;
      font-size: 0.88rem; font-weight: 800;
      color: var(--accent);
      background: var(--chip);
      border: 1px solid var(--border);
      border-radius: 999px;
      padding: 0.28rem 0.65rem;
      white-space: nowrap;
    }
    footer {
      margin-top: 1.25rem; color: var(--dim); font-size: 0.8rem;
      display: flex; justify-content: space-between; gap: 1rem; flex-wrap: wrap;
    }
  </style>
</head>
<body>
  <div class="wrap">
    <nav class="nav">
      <a href="../../index.html">← All content</a>
      <a href="./">Open slides</a>
      <a href="./deck.pdf">PDF</a>
    </nav>
    <header>
      <div class="eyebrow">Session agenda · ${escapeHtml(category)}</div>
      <h1>${escapeHtml(title)}</h1>
      ${subtitle ? `<p class="subtitle">${escapeHtml(subtitle)}</p>` : ""}
      <div class="meta">
        <span class="pill">Agenda · ${duration} min</span>
        <span>${escapeHtml(slug)}${updated ? ` · updated ${escapeHtml(updated)}` : ""}</span>
      </div>
    </header>
    <section class="panel">
      <div class="panel-title">Run of show</div>
      <ol class="agenda">
        ${rows}
      </ol>
    </section>
    <footer>
      <span>Generated locally from agenda.md — not built in CI.</span>
      <span>Listed ${totalCheck} min</span>
    </footer>
  </div>
</body>
</html>
`;
}

function discoverDecks() {
  const out = [];
  for (const { category, dir } of CATEGORY_FOLDERS) {
    if (!existsSync(dir)) continue;
    for (const ent of readdirSync(dir, { withFileTypes: true })) {
      if (!ent.isFile() || !ent.name.endsWith(".md")) continue;
      const slug = ent.name.replace(/\.md$/, "");
      if (["template", "component-test", "exec-spine"].includes(slug)) continue;
      if (slug.endsWith("-reference")) continue;
      if (slugFilter && slug !== slugFilter) continue;
      out.push({ slug, category, deckPath: join(dir, ent.name) });
    }
  }
  return out;
}

function discoverExistingMd() {
  const out = [];
  if (!existsSync(COMPANIONS)) return out;
  for (const cat of readdirSync(COMPANIONS, { withFileTypes: true })) {
    if (!cat.isDirectory()) continue;
    for (const slugDir of readdirSync(join(COMPANIONS, cat.name), {
      withFileTypes: true,
    })) {
      if (!slugDir.isDirectory()) continue;
      if (slugFilter && slugDir.name !== slugFilter) continue;
      const md = join(COMPANIONS, cat.name, slugDir.name, "agenda.md");
      if (existsSync(md)) {
        out.push({ slug: slugDir.name, category: cat.name, mdPath: md });
      }
    }
  }
  return out;
}

function writeOne({ slug, category, deckPath }) {
  const dir = join(COMPANIONS, category, slug);
  mkdirSync(dir, { recursive: true });
  const targetMd = join(dir, "agenda.md");
  const targetHtml = join(dir, "agenda.html");
  const fallbackDuration = cliDuration || DEFAULT_DURATION;

  if (htmlOnly) {
    if (!existsSync(targetMd)) {
      console.warn(`skip ${slug}: no agenda.md (--html-only)`);
      return false;
    }
  } else if (fromSlides || !existsSync(targetMd)) {
    if (!deckPath || !existsSync(deckPath)) {
      console.warn(`skip ${slug}: no deck to seed agenda.md`);
      return false;
    }
    const parsed = parseDeckAgenda(deckPath, fallbackDuration);
    if (!parsed.items.length) {
      console.warn(`skip ${slug}: could not derive agenda sections from deck`);
      return false;
    }
    writeFileSync(
      targetMd,
      renderAgendaMd({
        title: parsed.title,
        subtitle: parsed.subtitle,
        slug,
        category,
        duration: parsed.duration,
        items: parsed.items,
      }),
    );
    console.log(
      `  md  ${category}/${slug}/agenda.md (${parsed.items.length} items, ${parsed.duration} min)`,
    );
  }

  const mdText = readFileSync(targetMd, "utf8");
  const { meta, items } = parseAgendaMd(mdText);
  if (!items.length) {
    console.warn(`skip ${slug}: agenda.md has no timed items`);
    return false;
  }

  const title = meta.title || slug;
  const subtitle = meta.subtitle || "";
  const duration = meta.duration || items.reduce((a, b) => a + b.minutes, 0);
  const updated = meta.updated || new Date().toISOString().slice(0, 10);
  category = meta.category || category;
  slug = meta.slug || slug;

  writeFileSync(
    targetHtml,
    renderAgendaHtml({
      title,
      subtitle,
      slug,
      category,
      duration,
      items,
      updated,
    }),
  );
  console.log(`  html ${category}/${slug}/agenda.html`);
  return true;
}

function main() {
  console.log("generate-agendas — timed run-of-show companions\n");

  let targets = [];
  if (htmlOnly) {
    targets = discoverExistingMd();
  } else {
    targets = discoverDecks();
    if (fromSlides && slugFilter && !targets.length) {
      console.error(`No deck found for slug: ${slugFilter}`);
      process.exit(1);
    }
    if (!targets.length) targets = discoverExistingMd();
  }

  if (!targets.length) {
    console.log("Nothing to do.");
    return;
  }

  // Attach deck paths for existing-md-only entries
  if (!htmlOnly) {
    const deckMap = new Map(
      discoverDecks().map((d) => [`${d.category}/${d.slug}`, d.deckPath]),
    );
    targets = targets.map((t) =>
      t.deckPath
        ? t
        : { ...t, deckPath: deckMap.get(`${t.category}/${t.slug}`) },
    );
  }

  let n = 0;
  for (const t of targets) {
    if (writeOne(t)) n++;
  }
  console.log(`\nDone. ${n} agenda companion(s) updated under companions/.`);
  console.log(
    "Tip: edit agenda.md times by hand, then: npm run generate-agendas -- --html-only <slug>",
  );
}

main();
