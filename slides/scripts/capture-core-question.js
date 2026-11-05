#!/usr/bin/env node
/**
 * capture-core-question.js
 * Screenshots slide 2 (Core Question) from every active tech-talk deck.
 * Output: captures/<deck>-core-question.png
 *
 * Usage: node scripts/capture-core-question.js [deck-slug]
 */

const { chromium } = require("playwright");
const { spawn, execSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const net = require("net");

const SLIDES_DIR = path.resolve(__dirname, "..");
const OUTPUT_DIR = path.resolve(SLIDES_DIR, "..", "captures");
const PORT = 3030;
const READY_WAIT_MS = 25000;
const VIEWPORT = { width: 1920, height: 1080 };

const DECKS = [
  "agent-teams",
  "agentic-journey",
  "agentic-sdlc",
  "copilot-acp",
  "copilot-azure-mcp",
  "copilot-chat-internals",
  "copilot-cli",
  "copilot-code-review",
  "copilot-hooks",
  "copilot-memory",
  "copilot-primitives",
  "copilot-sdk",
  "copilot-web",
  "enterprise-patterns",
  "mcp-apps",
  "vscode-latest",
];

const filter = process.argv[2] || null;
const decks = filter ? DECKS.filter((d) => d === filter) : DECKS;

function killPort(port) {
  try {
    const result = execSync(`netstat -ano | findstr ":${port} "`, {
      encoding: "utf8",
      stdio: ["pipe", "pipe", "ignore"],
    });
    const pids = new Set();
    for (const line of result.split("\n")) {
      const m = line.trim().match(/\s+(\d+)$/);
      if (m && m[1] !== "0") pids.add(m[1]);
    }
    for (const pid of pids) {
      try {
        execSync(`taskkill /PID ${pid} /F`, { stdio: "ignore" });
      } catch {}
    }
  } catch {}
}

function waitForPort(port, timeoutMs) {
  return new Promise((resolve) => {
    const deadline = Date.now() + timeoutMs;
    function attempt() {
      const s = new net.Socket();
      s.setTimeout(1000);
      s.connect(port, "127.0.0.1", () => {
        s.destroy();
        resolve(true);
      });
      s.on("error", () => {
        s.destroy();
        if (Date.now() < deadline) setTimeout(attempt, 1000);
        else resolve(false);
      });
      s.on("timeout", () => {
        s.destroy();
        if (Date.now() < deadline) setTimeout(attempt, 1000);
        else resolve(false);
      });
    }
    attempt();
  });
}

async function captureSlide2(slug) {
  console.log(`\n=== ${slug} ===`);

  killPort(PORT);
  await new Promise((r) => setTimeout(r, 1000));

  const deckFile = `tech-talks/${slug}.md`;
  const child = spawn(
    "cmd",
    ["/c", `npm run dev -- ${deckFile} --port ${PORT}`],
    { cwd: SLIDES_DIR, detached: true, stdio: "ignore" }
  );
  child.unref();

  console.log(`  Waiting for server...`);
  const ready = await waitForPort(PORT, READY_WAIT_MS);
  if (!ready) {
    console.log(`  TIMEOUT — skipping`);
    killPort(PORT);
    return false;
  }
  await new Promise((r) => setTimeout(r, 3000));

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: VIEWPORT,
    colorScheme: "dark",
  });
  const page = await context.newPage();
  await page.emulateMedia({ colorScheme: "dark", reducedMotion: "reduce" });

  let ok = false;
  try {
    await page.goto(`http://localhost:${PORT}/2`, {
      waitUntil: "networkidle",
      timeout: 15000,
    });
    await page.waitForTimeout(1500);
    await page.evaluate(() => {
      for (const sel of [
        ".slidev-nav",
        ".slidev-progress",
        "[class*='slidev-controls']",
        ".nav-return",
      ]) {
        document.querySelectorAll(sel).forEach((el) => (el.style.display = "none"));
      }
    });
    const outPath = path.join(OUTPUT_DIR, `${slug}-core-question.png`);
    await page.screenshot({ path: outPath, fullPage: false });
    console.log(`  Saved: ${slug}-core-question.png`);
    ok = true;
  } catch (e) {
    console.log(`  ERROR: ${e.message}`);
  }

  await browser.close();
  killPort(PORT);
  await new Promise((r) => setTimeout(r, 500));
  return ok;
}

async function main() {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  const failed = [];
  for (const slug of decks) {
    const ok = await captureSlide2(slug);
    if (!ok) failed.push(slug);
  }
  console.log(`\nDone. Failed: ${failed.length > 0 ? failed.join(", ") : "none"}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
