#!/usr/bin/env node
/**
 * capture-deck-slides.js
 * For each active tech-talk deck:
 *   1. Kill any process on port 3030
 *   2. Start slidev dev for that deck
 *   3. Wait for server ready
 *   4. Screenshot slide 1 (title) and slide N (thank-you)
 *   5. Save to ../thankyou-screenshots/<deck>-title.png and <deck>-thankyou.png
 *   6. Kill the server, move to next deck
 *
 * Usage: node scripts/capture-deck-slides.js [deck-slug]
 *   (omit deck-slug to run all active decks)
 */

const { chromium } = require("playwright");
const { spawn, execSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const net = require("net");

const SLIDES_DIR = path.resolve(__dirname, "..");
const OUTPUT_DIR = path.resolve(SLIDES_DIR, "..", "captures");
const PORT = 3030;
const READY_WAIT_MS = 20000;
const VIEWPORT = { width: 1920, height: 1080 };

const DECKS = [
  { slug: "agent-teams",             last: 25 },
  { slug: "agentic-journey",         last: 21 },
  { slug: "agentic-sdlc",            last: 25 },
  { slug: "copilot-acp",             last: 24 },
  { slug: "copilot-azure-mcp",       last: 21 },
  { slug: "copilot-chat-internals",  last: 19 },
  { slug: "copilot-cli",             last: 33 },
  { slug: "copilot-code-review",     last: 24 },
  { slug: "copilot-code-review-new", last: 24 },
  { slug: "copilot-hooks",           last: 25 },
  { slug: "copilot-memory",          last: 23 },
  { slug: "copilot-primitives",      last: 21 },
  { slug: "copilot-sdk",             last: 18 },
  { slug: "copilot-web",             last: 21 },
  { slug: "enterprise-patterns",     last: 22 },
  { slug: "mcp-apps",                last: 25 },
  { slug: "multi-step-tasks",        last: 23 },
  { slug: "parallel-execution",      last: 18 },
  { slug: "terminal-sandboxing",     last: 25 },
  { slug: "vscode-latest",           last: 24 },
];

// Optional single-deck filter from CLI arg
const filter = process.argv[2] || null;
const decks = filter ? DECKS.filter(d => d.slug === filter) : DECKS;

fs.mkdirSync(OUTPUT_DIR, { recursive: true });

function killPort(port) {
  try {
    // Windows: find and kill process owning the port
    const result = execSync(`netstat -ano | findstr ":${port} "`, { encoding: "utf8", stdio: ["pipe","pipe","ignore"] });
    const pids = new Set();
    for (const line of result.split("\n")) {
      const m = line.trim().match(/\s+(\d+)$/);
      if (m && m[1] !== "0") pids.add(m[1]);
    }
    for (const pid of pids) {
      try { execSync(`taskkill /PID ${pid} /F`, { stdio: "ignore" }); } catch {}
    }
  } catch {}
}

function waitForPort(port, timeoutMs) {
  return new Promise((resolve) => {
    const deadline = Date.now() + timeoutMs;
    function attempt() {
      const s = new net.Socket();
      s.setTimeout(1000);
      s.connect(port, "127.0.0.1", () => { s.destroy(); resolve(true); });
      s.on("error", () => { s.destroy(); if (Date.now() < deadline) setTimeout(attempt, 1000); else resolve(false); });
      s.on("timeout", () => { s.destroy(); if (Date.now() < deadline) setTimeout(attempt, 1000); else resolve(false); });
    }
    attempt();
  });
}

async function captureDeck(deck) {
  console.log(`\n=== ${deck.slug} ===`);

  // Kill any existing server
  killPort(PORT);
  await new Promise(r => setTimeout(r, 1000));

  // Start slidev dev for this deck
  const deckFile = `tech-talks/${deck.slug}.md`;
  console.log(`  Starting slidev for ${deckFile}...`);
  const child = spawn("npx", ["slidev", "--remote=", deckFile, "--port", String(PORT)], {
    cwd: SLIDES_DIR,
    detached: true,
    stdio: "ignore",
    shell: true,
  });
  child.unref();

  // Wait for server to be ready
  console.log(`  Waiting for server...`);
  const ready = await waitForPort(PORT, READY_WAIT_MS);
  if (!ready) {
    console.log(`  ERROR: server did not start in ${READY_WAIT_MS}ms`);
    killPort(PORT);
    return false;
  }
  // Extra settle time for Slidev to finish compiling
  await new Promise(r => setTimeout(r, 3000));

  // Launch browser and screenshot
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: VIEWPORT, colorScheme: "dark" });
  const page = await context.newPage();
  await page.emulateMedia({ colorScheme: "dark", reducedMotion: "reduce" });

  let success = true;

  for (const [slideNum, label] of [[1, "title"], [deck.last, "thankyou"]]) {
    console.log(`  Capturing slide ${slideNum} (${label})...`);
    try {
      await page.goto(`http://localhost:${PORT}/${slideNum}`, { waitUntil: "networkidle", timeout: 15000 });
      await page.waitForTimeout(1500);

      // Hide Slidev UI chrome (navigation arrows, progress bar)
      await page.evaluate(() => {
        for (const sel of [".slidev-nav", ".slidev-progress", "[class*='slidev-controls']", ".nav-return"]) {
          document.querySelectorAll(sel).forEach(el => el.style.display = "none");
        }
      });

      const outPath = path.join(OUTPUT_DIR, `${deck.slug}-${label}.png`);
      await page.screenshot({ path: outPath, fullPage: false });
      console.log(`  Saved: captures/${deck.slug}-${label}.png`);
    } catch (err) {
      console.log(`  ERROR capturing slide ${slideNum}: ${err.message}`);
      success = false;
    }
  }

  await browser.close();
  killPort(PORT);
  await new Promise(r => setTimeout(r, 500));
  return success;
}

async function main() {
  const results = { ok: [], failed: [] };
  for (const deck of decks) {
    const ok = await captureDeck(deck);
    (ok ? results.ok : results.failed).push(deck.slug);
  }

  console.log(`\n${"=".repeat(50)}`);
  console.log(`Done. ${results.ok.length}/${decks.length} decks captured.`);
  if (results.failed.length) console.log(`Failed: ${results.failed.join(", ")}`);
}

main().catch(err => { console.error(err); process.exit(1); });
