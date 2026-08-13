#!/usr/bin/env node
// ============================================================================
// export-pdfs.mjs — Export Slidev decks to compact companion PDFs (local only)
// ============================================================================
//
// Default path (compact):
//   1) slidev export --format png --scale <scale>
//   2) sharp → JPEG (mozjpeg)
//   3) pdf-lib assemble 16:9 pages
//
// Why not plain `slidev export --format pdf`?
//   Chromium print-PDF rasterizes every slide at high DPI and ships huge
//   Flate/PNG image streams (~6–9 MB/deck). Compact mode is typically 4–8× smaller.
//
// Output:
//   slides/companions/<category>/<slug>/deck.pdf
//
// Usage (from slides/):
//   node scripts/export-pdfs.mjs                     # all active decks, compact
//   node scripts/export-pdfs.mjs vscode-latest
//   node scripts/export-pdfs.mjs --folder tech-talks
//   node scripts/export-pdfs.mjs --scale 0.75 --quality 72
//   node scripts/export-pdfs.mjs --native             # original slidev PDF (large)
//
// Requires: playwright-chromium (slidev), sharp, pdf-lib
// ============================================================================

import { spawnSync } from "child_process";
import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readdirSync,
  readFileSync,
  rmSync,
  statSync,
  writeFileSync,
} from "fs";
import { tmpdir } from "os";
import { basename, dirname, join } from "path";
import { fileURLToPath } from "url";
import { PDFDocument } from "pdf-lib";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const COMPANIONS = join(ROOT, "companions");

const args = process.argv.slice(2);
const folderFilter = (() => {
  const i = args.indexOf("--folder");
  return i >= 0 ? args[i + 1] : null;
})();
const scaleIdx = args.indexOf("--scale");
const qualityIdx = args.indexOf("--quality");
const scale =
  scaleIdx >= 0 && args[scaleIdx + 1] ? Number(args[scaleIdx + 1]) : 1;
const quality =
  qualityIdx >= 0 && args[qualityIdx + 1] ? Number(args[qualityIdx + 1]) : 72;
const native = args.includes("--native");
const slugFilter = args.find((a, i) => {
  if (a.startsWith("--")) return false;
  const prev = args[i - 1];
  if (prev === "--folder" || prev === "--scale" || prev === "--quality")
    return false;
  return true;
});

// 16:9 slide page in PDF points (72 dpi): 13.333" × 7.5"
const PAGE_W = 960;
const PAGE_H = 540;

function isArchived(filePath) {
  const head = readFileSync(filePath, "utf8").slice(0, 800);
  return /^status:\s*archived\b/m.test(head);
}

function discoverDecks() {
  const decks = [];
  const categories = ["tech-talks", "workshop", "exec-talks"];
  for (const cat of categories) {
    if (folderFilter && cat !== folderFilter) continue;
    const dir = join(ROOT, cat);
    if (!existsSync(dir)) continue;
    for (const file of readdirSync(dir).filter((f) => f.endsWith(".md"))) {
      const slug = basename(file, ".md");
      if (
        ["global-top", "global-bottom", "template", "exec-spine"].includes(slug)
      )
        continue;
      if (slug.endsWith("-reference") || slug === "component-test") continue;
      if (slugFilter && slug !== slugFilter) continue;
      const abs = join(dir, file);
      if (isArchived(abs)) continue;
      decks.push({ category: cat, slug, rel: join(cat, file).replace(/\\/g, "/") });
    }
  }
  return decks;
}

function runSlidev(exportArgs) {
  return spawnSync(
    process.platform === "win32" ? "npx.cmd" : "npx",
    ["slidev", "export", ...exportArgs],
    { cwd: ROOT, stdio: "inherit", shell: process.platform === "win32" },
  );
}

function exportNative(deck, outFile) {
  const result = runSlidev([
    deck.rel,
    "--format",
    "pdf",
    "--output",
    outFile,
  ]);
  return result.status === 0 && existsSync(outFile);
}

function naturalPngSort(a, b) {
  const na = Number(basename(a, ".png").replace(/\D/g, "")) || 0;
  const nb = Number(basename(b, ".png").replace(/\D/g, "")) || 0;
  if (na !== nb) return na - nb;
  return a.localeCompare(b);
}

async function pngsToCompactPdf(pngDir, outFile) {
  const pngs = readdirSync(pngDir)
    .filter((f) => f.toLowerCase().endsWith(".png"))
    .map((f) => join(pngDir, f))
    .sort(naturalPngSort);

  if (!pngs.length) throw new Error(`no PNGs in ${pngDir}`);

  const pdf = await PDFDocument.create();
  for (const pngPath of pngs) {
    const jpg = await sharp(pngPath)
      .resize({
        width: Math.round(1920 * scale),
        height: Math.round(1080 * scale),
        fit: "inside",
        withoutEnlargement: false,
      })
      .jpeg({ quality, mozjpeg: true, chromaSubsampling: "4:2:0" })
      .toBuffer();

    const image = await pdf.embedJpg(jpg);
    const page = pdf.addPage([PAGE_W, PAGE_H]);
    page.drawImage(image, {
      x: 0,
      y: 0,
      width: PAGE_W,
      height: PAGE_H,
    });
  }

  writeFileSync(outFile, await pdf.save());
  return pngs.length;
}

async function exportCompact(deck, outFile) {
  const tmp = mkdtempSync(join(tmpdir(), `slidev-pdf-${deck.slug}-`));
  try {
    // Slidev writes PNGs into the output directory
    const result = runSlidev([
      deck.rel,
      "--format",
      "png",
      "--scale",
      String(scale),
      "--output",
      tmp,
    ]);
    if (result.status !== 0) return false;

    // Sometimes slidev nests under tmp/<slug>/
    let pngDir = tmp;
    const nested = readdirSync(tmp, { withFileTypes: true });
    const pngHere = nested.some(
      (d) => d.isFile() && d.name.toLowerCase().endsWith(".png"),
    );
    if (!pngHere) {
      const sub = nested.find((d) => d.isDirectory());
      if (sub) pngDir = join(tmp, sub.name);
    }

    const pages = await pngsToCompactPdf(pngDir, outFile);
    console.log(`   (${pages} pages, scale=${scale}, jpeg q=${quality})`);
    return existsSync(outFile);
  } finally {
    rmSync(tmp, { recursive: true, force: true });
  }
}

async function exportOne(deck) {
  const outDir = join(COMPANIONS, deck.category, deck.slug);
  mkdirSync(outDir, { recursive: true });
  const outFile = join(outDir, "deck.pdf");
  const mode = native ? "native" : "compact";

  console.log(`📄 ${deck.category}/${deck.slug} → deck.pdf [${mode}]`);

  let ok = false;
  try {
    ok = native
      ? exportNative(deck, outFile)
      : await exportCompact(deck, outFile);
  } catch (err) {
    console.error(`❌ ${deck.slug}:`, err?.message || err);
    return false;
  }

  if (!ok) {
    console.error(`❌ Failed: ${deck.slug}`);
    return false;
  }

  const mb = (statSync(outFile).size / (1024 * 1024)).toFixed(2);
  console.log(`   ✓ ${mb} MB`);
  return true;
}

const decks = discoverDecks();
if (!decks.length) {
  console.error("No decks matched. Check slug/folder filters.");
  process.exit(1);
}

console.log(
  `Exporting ${decks.length} deck(s) to companions/ (${native ? "native slidev PDF" : `compact jpeg q=${quality} scale=${scale}`}) …`,
);

let ok = 0;
let fail = 0;
for (const deck of decks) {
  if (await exportOne(deck)) ok++;
  else fail++;
}

console.log(`\nDone. ${ok} ok, ${fail} failed.`);
console.log("Commit companions only after visual inspection.");
process.exit(fail ? 1 : 0);
