#!/usr/bin/env node
// ============================================================================
// preview-index.mjs — Local homepage + companion artifact preview
// ============================================================================
//
// Serves:
//   /                 → live slides/index-custom.html
//   /tech-talks/...   → dist decks when built; companions for agenda/pdf
//
// Usage (from slides/):
//   npm run generate-agendas -- vscode-latest
//   npm run export-pdf -- vscode-latest
//   npm run preview:index
// ============================================================================

import {
  createReadStream,
  existsSync,
  mkdirSync,
  copyFileSync,
  statSync,
} from "fs";
import { createServer } from "http";
import { extname, join, normalize, dirname, relative } from "path";
import { fileURLToPath } from "url";
import { spawnSync } from "child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const DIST = join(ROOT, "dist");
const COMPANIONS = join(ROOT, "companions");
const INDEX_SRC = join(ROOT, "index-custom.html");

const portArg = process.argv.indexOf("--port");
const PORT = portArg >= 0 ? Number(process.argv[portArg + 1]) : 8080;

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".pdf": "application/pdf",
  ".md": "text/markdown; charset=utf-8",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".webp": "image/webp",
};

mkdirSync(DIST, { recursive: true });
copyFileSync(INDEX_SRC, join(DIST, "index.html"));

const logoSrc = join(ROOT, "tech-talks", "sdp-logo.png");
if (existsSync(logoSrc)) {
  mkdirSync(join(DIST, "tech-talks"), { recursive: true });
  copyFileSync(logoSrc, join(DIST, "tech-talks", "sdp-logo.png"));
}
if (existsSync(join(ROOT, "404.html"))) {
  copyFileSync(join(ROOT, "404.html"), join(DIST, "404.html"));
}

spawnSync(process.execPath, [join(__dirname, "copy-companions.mjs")], {
  cwd: ROOT,
  stdio: "inherit",
});

function resolveFile(rel) {
  const distPath = normalize(join(DIST, rel));
  if (distPath.startsWith(DIST) && existsSync(distPath) && statSync(distPath).isFile()) {
    return distPath;
  }
  if (distPath.startsWith(DIST) && existsSync(distPath) && statSync(distPath).isDirectory()) {
    const idx = join(distPath, "index.html");
    if (existsSync(idx)) return idx;
  }

  const parts = rel.split("/").filter(Boolean);
  if (parts.length >= 3) {
    const companionPath = normalize(join(COMPANIONS, ...parts));
    if (
      companionPath.startsWith(COMPANIONS) &&
      existsSync(companionPath) &&
      statSync(companionPath).isFile()
    ) {
      return companionPath;
    }
  }
  return null;
}

const server = createServer((req, res) => {
  try {
    const url = new URL(req.url || "/", `http://127.0.0.1:${PORT}`);
    let rel = decodeURIComponent(url.pathname);
    if (rel.startsWith("/CopilotTraining/")) {
      rel = rel.slice("/CopilotTraining".length);
    }

    if (rel === "/" || rel === "/index.html") {
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      createReadStream(INDEX_SRC).pipe(res);
      return;
    }

    let candidate = rel.replace(/^\//, "");
    if (candidate.endsWith("/")) candidate = candidate.slice(0, -1);

    let filePath = resolveFile(candidate);
    if (!filePath && !extname(candidate)) {
      filePath = resolveFile(candidate + "/index.html");
    }

    if (!filePath) {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      res.end(
        `Not found: ${rel}\nBuild the deck, or add companions under slides/companions/.\n`,
      );
      return;
    }

    const type = MIME[extname(filePath).toLowerCase()] || "application/octet-stream";
    if (req.method === "HEAD") {
      res.writeHead(200, { "Content-Type": type });
      res.end();
      return;
    }
    res.writeHead(200, { "Content-Type": type });
    createReadStream(filePath).pipe(res);
  } catch (err) {
    res.writeHead(500).end(String(err));
  }
});

server.listen(PORT, "127.0.0.1", () => {
  console.log(`\nHomepage preview: http://127.0.0.1:${PORT}/`);
  console.log(`Index source: ${relative(process.cwd(), INDEX_SRC)}`);
  console.log(`Companions:   ${relative(process.cwd(), COMPANIONS)}`);
  console.log("Agenda → /<category>/<slug>/agenda.html");
  console.log("PDF    → /<category>/<slug>/deck.pdf");
  console.log("Ctrl+C to stop.\n");
});
