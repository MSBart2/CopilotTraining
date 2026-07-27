#!/usr/bin/env node
/**
 * inspect-slide.js — Slide inspection harness for Copilot
 *
 * Usage:
 *   node scripts/inspect-slide.js <deck-slug> <slide-number> [--port 3030]
 *   node scripts/inspect-slide.js start <deck-slug> [--port 3030]   # start slidev dev once
 *   npm run inspect -- agent-teams 5
 *   npm run inspect -- start agent-teams
 *
 * Slidev dev lifecycle:
 *   - The script NEVER stops slidev dev. It starts it once if the port is dead,
 *     then leaves it running for the entire editing session.
 *   - Subsequent inspect calls reuse the already-running server — no restart cost.
 *   - To start the server explicitly before your first inspection:
 *       node scripts/inspect-slide.js start <deck-slug>
 *
 * What it does per inspection:
 *   1. Finds the deck .md file by slug
 *   2. Starts slidev dev ONLY if port is not responding (leaves it running after)
 *   3. Takes a Playwright screenshot of the slide
 *   4. Detects overflow via DOM inspection
 *   5. Detects missing progress dots via MD source analysis
 *   6. Detects section color inconsistency via MD source analysis
 *   7. Prints a JSON report to stdout
 *   8. Saves screenshot to .harness/<deck>-<N>.png
 */

const { chromium } = require("playwright");
const { spawn } = require("child_process");
const http = require("http");
const fs = require("fs");
const path = require("path");

// ── Config ────────────────────────────────────────────────────────────────────

const SLIDES_DIR = path.resolve(__dirname, "..");
const HARNESS_DIR = path.join(SLIDES_DIR, "..", "captures");
const SLIDEV_READY_TIMEOUT_MS = 60_000;
const SLIDEV_POLL_INTERVAL_MS = 2000;
// Test at multiple viewport sizes to catch responsive breakpoint overflows
const VIEWPORTS = [
  { width: 1920, height: 1080, name: "desktop" },
  { width: 1366, height: 768, name: "laptop" },
  { width: 768, height: 1024, name: "tablet" },
];
// Use first viewport as primary for screenshot
const VIEWPORT = VIEWPORTS[0];

// ── Arg parsing ───────────────────────────────────────────────────────────────

const args = process.argv.slice(2);

if (args.length < 1 || args[0] === "--help") {
  console.log("Usage:");
  console.log(
    "  node scripts/inspect-slide.js start <deck-slug> [--port 3030]",
  );
  console.log(
    "  node scripts/inspect-slide.js <deck-slug> <slide-number> [--port 3030]",
  );
  console.log("Examples:");
  console.log("  node scripts/inspect-slide.js start agent-teams");
  console.log("  node scripts/inspect-slide.js agent-teams 5");
  console.log("  node scripts/inspect-slide.js agentic-sdlc 12 --port 3031");
  process.exit(0);
}

const isStartCmd = args[0] === "start";
const deckSlug = isStartCmd ? args[1] : args[0];
const isScanCmd = !isStartCmd && args[1] === "scan";
const slideNum = isStartCmd || isScanCmd ? null : parseInt(args[1], 10);
const portIdx = args.indexOf("--port");
const port = portIdx !== -1 ? parseInt(args[portIdx + 1], 10) : 3030;

if (!deckSlug) {
  console.error("Error: deck-slug is required");
  process.exit(1);
}

if (!isStartCmd && !isScanCmd && (isNaN(slideNum) || slideNum < 1)) {
  console.error("Error: slide-number must be a positive integer");
  process.exit(1);
}

// ── Find deck file ────────────────────────────────────────────────────────────

function findDeckFile(slug) {
  const searchDirs = ["tech-talks", "exec-talks", "workshop"];
  for (const dir of searchDirs) {
    const candidate = path.join(SLIDES_DIR, dir, `${slug}.md`);
    if (fs.existsSync(candidate)) return candidate;
  }
  return null;
}

const deckFile = findDeckFile(deckSlug);
if (!deckFile) {
  console.error(`Error: could not find deck file for slug "${deckSlug}"`);
  console.error("Searched: tech-talks/, exec-talks/, workshop/");
  process.exit(1);
}

// ── Port check ────────────────────────────────────────────────────────────────

function isPortResponding(p) {
  return new Promise((resolve) => {
    const net = require("net");
    const socket = new net.Socket();
    socket.setTimeout(2000);
    socket.connect(p, "127.0.0.1", () => {
      socket.destroy();
      resolve(true);
    });
    socket.on("error", (err) => {
      socket.destroy();
      // EADDRINUSE on connect = ephemeral port pool clogged; treat as "not yet ready"
      resolve(false);
    });
    socket.on("timeout", () => { socket.destroy(); resolve(false); });
  });
}

async function waitForPort(p, timeoutMs) {
  // Fixed sleep instead of polling — polling exhausts the ephemeral port pool via TimeWait
  const FIXED_WAIT_MS = 15000;
  console.error(`[harness] sleeping ${FIXED_WAIT_MS / 1000}s for slidev to start...`);
  await new Promise((r) => setTimeout(r, FIXED_WAIT_MS));
  console.error(`[harness] assuming slidev is ready`);
  return true;
}

// ── Slidev dev start ──────────────────────────────────────────────────────────

function startSlidevDev(file, p) {
  const relFile = path.relative(SLIDES_DIR, file).replace(/\\/g, "/");
  console.error(`[harness] Starting slidev dev: ${relFile} on port ${p}`);

  // On Windows, shell:true is required for npx to resolve correctly
  const child = spawn(
    "npx",
    ["slidev", "--remote=", relFile, "--port", String(p)],
    {
      cwd: SLIDES_DIR,
      detached: true,
      stdio: "ignore",
      shell: true,
    },
  );
  child.unref();
  console.error(`[harness] Slidev dev PID: ${child.pid}`);
  return child;
}

// ── MD analysis ───────────────────────────────────────────────────────────────

/**
 * Split the deck MD into slide blocks by \n---\n separators.
 * Returns array of { index (1-based), name, content } objects.
 */
function parseSlideDeck(filePath) {
  const raw = fs.readFileSync(filePath, "utf-8").replace(/^\uFEFF/, ""); // strip BOM
  // Normalize line endings before splitting so \r\n files work on Windows
  const normalized = raw.replace(/\r\n/g, "\n");
  // Skip the frontmatter block (content before the second --- line)
  const afterFrontmatter = normalized.replace(/^---\n[\s\S]*?\n---\n/, "");
  const blocks = afterFrontmatter.split(/\n---\n/);
  return blocks.map((content, i) => {
    const nameMatch = content.match(/<!--\s*SLIDE:\s*(.+?)\s*-->/);
    return {
      index: i + 1,
      name: nameMatch ? nameMatch[1].trim() : `Slide ${i + 1}`,
      content,
    };
  });
}

/**
 * Returns true if slide N is in the "closing section" — slides at or after
 * a known closing-section marker slide (e.g. "What You Can Do Today").
 * These slides are standalone (own colors, no section dots) and should be exempt.
 */
function isClosingSection(slides, n) {
  const CLOSING_MARKERS = [
    "What You Can Do Today",
    "What Can You Do Today",
    "Expected ROI",
    "Thank You",
    "References",
  ];
  for (let i = 0; i < slides.length; i++) {
    if (CLOSING_MARKERS.some((m) => slides[i].name.includes(m))) {
      return n >= i + 1; // 1-indexed: at or after this marker slide
    }
  }
  return false;
}

/**
 * Determine the Part (1-4) a slide belongs to by scanning backwards through
 * the slide list for the most recent section opener.
 */
function getSlideSection(slides, slideIndex) {
  const sectionPattern = /Part\s+(\d+)/i;
  for (let i = slideIndex - 1; i >= 0; i--) {
    const m =
      slides[i].name.match(sectionPattern) ||
      slides[i].content.match(/Part\s+(\d+)/i);
    if (m) return parseInt(m[1], 10);
  }
  return null;
}

/**
 * Check if a slide is a section opener (exempt from progress dot requirement).
 */
function isSectionOpener(slide) {
  return /Part\s+\d+/.test(slide.name) || /^Part \d+ —/.test(slide.name);
}

/**
 * Check if a slide has progress dots (the w-2 h-2 rounded-full dot pattern).
 */
function hasProgressDots(slide) {
  // Match both w-2 h-2 (div style) and w-2.5 h-2.5 (span style) dot patterns
  return /w-2\.?5?\s+h-2\.?5?\s+rounded-full/.test(slide.content);
}

/**
 * Validate HTML syntax for a slide:
 * - Checks that <div> opens are balanced with </div> closes
 * - Detects invalid end tags (extra closes without matching opens)
 * Returns { syntaxError: bool, opens: number, closes: number, balance: number, reason: string }
 */
function validateHTMLSyntax(slide) {
  // Count self-closing <div ... /> and paired <div>...</div>
  const opens = (slide.content.match(/<div[^>]*>/g) || []).length;
  const closes = (slide.content.match(/<\/div>/g) || []).length;
  const balance = opens - closes;

  if (balance > 0) {
    return {
      syntaxError: true,
      opens,
      closes,
      balance,
      reason: `${balance} unclosed div tag(s) — ${opens} opens, ${closes} closes`,
    };
  }
  if (balance < 0) {
    return {
      syntaxError: true,
      opens,
      closes,
      balance,
      reason: `${Math.abs(balance)} extra closing tag(s) — ${opens} opens, ${closes} closes`,
    };
  }

  return {
    syntaxError: false,
    opens,
    closes,
    balance: 0,
    reason: "balanced",
  };
}

/**
 * Extract the primary Tailwind color family from a slide's pill breadcrumb.
 * Looks for the first `from-{color}-` class in the slide content.
 * Returns e.g. "blue", "indigo", "purple", "cyan", "pink", or null.
 */
function extractPillColor(slide) {
  const m = slide.content.match(/from-([a-z]+)-\d{3}\/\d+\s+to-([a-z]+)-/);
  return m ? m[1] : null;
}

/**
 * Check color consistency for slide N within its section.
 * Returns { inconsistent: bool, expected: string|null, actual: string|null, reason: string }
 */
function analyzeColorConsistency(slides, n) {
  const slide = slides[n - 1];
  if (!slide)
    return {
      inconsistent: false,
      expected: null,
      actual: null,
      reason: "slide not found",
    };

  // Title, ToC, and section openers are exempt
  if (n === 1 || isSectionOpener(slide)) {
    return {
      inconsistent: false,
      expected: null,
      actual: null,
      reason: "exempt (title or section opener)",
    };
  }

  // Closing section slides are standalone (own colors are intentional)
  if (isClosingSection(slides, n)) {
    return {
      inconsistent: false,
      expected: null,
      actual: null,
      reason: "closing section slide (own color scheme)",
    };
  }

  const part = getSlideSection(slides, n);
  if (!part)
    return {
      inconsistent: false,
      expected: null,
      actual: null,
      reason: "no section detected",
    };

  // Find the section opener index (1-based)
  let sectionStartIdx = null;
  for (let i = n - 2; i >= 0; i--) {
    if (isSectionOpener(slides[i]) || /Part\s+\d+/.test(slides[i].content)) {
      sectionStartIdx = i + 1; // 1-based
      break;
    }
  }
  if (!sectionStartIdx)
    return {
      inconsistent: false,
      expected: null,
      actual: null,
      reason: "section start not found",
    };

  // Find the first content slide in the section (skip the opener itself)
  let referenceColor = null;
  let referenceSlide = null;
  for (let i = sectionStartIdx; i < slides.length; i++) {
    const s = slides[i];
    if (i + 1 === n) break; // stop before the current slide
    if (!isSectionOpener(s)) {
      const c = extractPillColor(s);
      if (c) {
        referenceColor = c;
        referenceSlide = i + 1;
        break;
      }
    }
  }

  const actualColor = extractPillColor(slide);

  if (!actualColor)
    return {
      inconsistent: false,
      expected: referenceColor,
      actual: null,
      reason: "no pill color detected on this slide",
    };
  if (!referenceColor)
    return {
      inconsistent: false,
      expected: null,
      actual: actualColor,
      reason: "no reference slide found in section yet",
    };

  if (actualColor !== referenceColor) {
    return {
      inconsistent: true,
      expected: referenceColor,
      actual: actualColor,
      reason: `s${n} uses "${actualColor}" but Part ${part} reference slide s${referenceSlide} uses "${referenceColor}"`,
    };
  }

  return {
    inconsistent: false,
    expected: referenceColor,
    actual: actualColor,
    reason: "color matches section",
  };
}

function analyzeSlideForDots(slides, n) {
  const slide = slides[n - 1];
  if (!slide)
    return {
      missingDots: false,
      sectionPart: null,
      exempt: true,
      reason: "slide not found",
    };

  // Title slide and section openers are exempt
  if (n === 1)
    return {
      missingDots: false,
      sectionPart: null,
      exempt: true,
      reason: "title slide",
    };
  if (isSectionOpener(slide))
    return {
      missingDots: false,
      sectionPart: null,
      exempt: true,
      reason: "section opener",
    };

  // Closing section slides (at or after "What You Can Do Today") are standalone
  if (isClosingSection(slides, n))
    return {
      missingDots: false,
      sectionPart: null,
      exempt: true,
      reason: "closing section slide",
    };

  const part = getSlideSection(slides, n);

  // Slides not belonging to any section are exempt (Core Question, ToC, closing slides)
  if (!part)
    return {
      missingDots: false,
      sectionPart: null,
      exempt: true,
      reason: "not in a numbered section",
    };

  const dots = hasProgressDots(slide);
  return {
    missingDots: !dots,
    sectionPart: part,
    exempt: false,
    reason: dots ? "dots present" : "dots missing — slide is in Part " + part,
  };
}

// ── Playwright screenshot + overflow detection ────────────────────────────────

async function inspectSlide(slideNumber, p, slides) {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: VIEWPORT,
    colorScheme: "dark",
  });
  const page = await context.newPage();

  const url = `http://localhost:${p}/${slideNumber}`;
  console.error(`[harness] Navigating to ${url}`);

  await page.emulateMedia({ colorScheme: "dark", reducedMotion: "reduce" });

  await page.goto(url, { waitUntil: "networkidle", timeout: 15_000 });

  // Extra wait for Slidev transitions/animations
  await page.waitForTimeout(800);

  // Overflow detection via DOM
  // Section openers use justify-center + large bg blur circles that inflate scrollHeight.
  // Skip overflow detection for them to avoid false positives.
  const isOpener = isSectionOpener(slides[slideNumber - 1]);

  let overflow = isOpener
    ? {
        detected: false,
        reason: "opener — overflow skipped (background blur elements)",
      }
    : null;

  // Test at multiple viewports to catch responsive breakpoint overflows
  if (!isOpener) {
    for (const viewport of VIEWPORTS) {
      await page.setViewportSize({
        width: viewport.width,
        height: viewport.height,
      });
      // Wait for layout reflow after viewport change
      await page.waitForTimeout(500);

      const overflowAtViewport = await page.evaluate((vp) => {
        // Slidev keeps adjacent slides in the DOM — querySelectorAll and find the VISIBLE one
        const layout =
          [...document.querySelectorAll(".slidev-layout")].find(
            (el) => el.clientHeight > 0,
          ) ||
          [...document.querySelectorAll(".slidev-slide-content")].find(
            (el) => el.clientHeight > 0,
          ) ||
          document.querySelector(".slidev-slide-container");

        if (!layout)
          return { detected: false, reason: "no visible layout element found" };

        // Strategy 1: Check scrollHeight (but skip if overflow:hidden is masking it)
        const contentWrapper = layout.querySelector('[class*="h-full"]');
        if (contentWrapper) {
          // Measure using bounding rect instead of scrollHeight to avoid overflow-hidden masking
          const wrapperRect = contentWrapper.getBoundingClientRect();
          const layoutRect = layout.getBoundingClientRect();

          // If wrapper's bottom exceeds layout's bottom, content is overflowing
          if (wrapperRect.bottom > layoutRect.bottom) {
            return {
              detected: true,
              reason: `content overflow at ${vp.name}: wrapper extends ${Math.round(wrapperRect.bottom - layoutRect.bottom)}px beyond slide boundary`,
            };
          }
        }

        // Strategy 2: Bounding rect check for any element bleeding past slide boundary
        const layoutRect = layout.getBoundingClientRect();
        const clipBottom = layoutRect.bottom;

        // Check all elements more comprehensively (no height filter to catch small but real overflow)
        const bleedingEl = [...layout.querySelectorAll("*")].find((el) => {
          const r = el.getBoundingClientRect();
          // Only skip very small elements (< 2px height — rendering artifacts)
          if (r.bottom <= clipBottom || r.height < 2) return false;

          // Skip elements inside overflow-y-auto/scroll containers (scrollable code blocks are intentional)
          let ancestor = el.parentElement;
          while (ancestor && ancestor !== layout) {
            const style = window.getComputedStyle(ancestor);
            if (style.overflowY === "auto" || style.overflowY === "scroll")
              return false;
            ancestor = ancestor.parentElement;
          }
          return true;
        });

        if (bleedingEl) {
          const r = bleedingEl.getBoundingClientRect();
          return {
            detected: true,
            reason: `element bleeds at ${vp.name}: y=${Math.round(r.bottom)} beyond clip=${Math.round(clipBottom)} (${Math.round(r.bottom - clipBottom)}px overflow)`,
          };
        }

        return { detected: false, reason: "ok" };
      }, viewport);

      if (overflowAtViewport.detected) {
        overflow = overflowAtViewport;
        break; // Found overflow, no need to test remaining viewports
      }
    }

    // If no overflow found at any viewport, report ok
    if (!overflow) {
      overflow = {
        detected: false,
        reason: "ok (tested at 1920, 1366, 768px)",
      };
    }
  }

  // Slide count shown in Slidev footer (e.g. "5 / 25") — lets us detect wrong-deck
  const renderedTotal = await page.evaluate(() => {
    const candidates = [...document.querySelectorAll("*")]
      .filter(
        (el) =>
          el.children.length === 0 && el.clientHeight > 0 && el.clientWidth > 0,
      )
      .map((el) => (el.textContent || "").trim())
      .filter((text) => /^\d+\s*\/\s*\d+$/.test(text));

    return candidates[0] || null;
  });

  // Screenshot
  fs.mkdirSync(HARNESS_DIR, { recursive: true });
  const screenshotPath = path.join(
    HARNESS_DIR,
    `${deckSlug}-${slideNumber}.png`,
  );
  await page.screenshot({ path: screenshotPath, fullPage: false });
  console.error(`[harness] Screenshot saved: ${screenshotPath}`);

  await browser.close();
  return { overflow, screenshotPath, renderedTotal };
}

// ── Main ──────────────────────────────────────────────────────────────────────

(async () => {
  // 1. Check if slidev dev is already running; start it if not
  let alreadyRunning = await isPortResponding(port);

  if (!alreadyRunning) {
    startSlidevDev(deckFile, port);
    console.error(`[harness] Waiting for slidev dev on port ${port}...`);
    const ready = await waitForPort(port, SLIDEV_READY_TIMEOUT_MS);
    if (!ready) {
      console.error(
        `[harness] ❌ Slidev dev did not respond within ${SLIDEV_READY_TIMEOUT_MS / 1000}s`,
      );
      process.exit(1);
    }
    await new Promise((r) => setTimeout(r, 1500)); // settle
    console.error(`[harness] ✅ Slidev dev ready`);
  } else {
    console.error(`[harness] Slidev dev on port ${port} ✓`);
  }

  // ── `start` subcommand: ensure server is up, then exit ──────────────────────
  if (isStartCmd) {
    const status = alreadyRunning ? "already_running" : "started";
    console.log(JSON.stringify({ status, port, deck: deckSlug }));
    console.error(`[harness] ✅ Slidev dev ready on port ${port}`);
    return;
  }

  // ── `scan` subcommand: inspect all slides with one browser session ────────────
  if (isScanCmd) {
    const slides = parseSlideDeck(deckFile);
    const totalSlides = slides.length;
    console.error(
      `[harness] Scanning ${totalSlides} slides in "${deckSlug}"...\n`,
    );

    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
      viewport: VIEWPORT,
      colorScheme: "dark",
    });
    const page = await context.newPage();
    fs.mkdirSync(HARNESS_DIR, { recursive: true });

    await page.emulateMedia({ colorScheme: "dark", reducedMotion: "reduce" });

    // Shared overflow evaluation — same logic as inspectSlide()
    const evalOverflow = () => {
      // Slidev keeps adjacent slides in the DOM — find the VISIBLE one
      const layout =
        [...document.querySelectorAll(".slidev-layout")].find(
          (el) => el.clientHeight > 0,
        ) ||
        [...document.querySelectorAll(".slidev-slide-content")].find(
          (el) => el.clientHeight > 0,
        ) ||
        document.querySelector(".slidev-slide-container");
      if (!layout)
        return { detected: false, reason: "no visible layout element found" };

      // Check h-full content wrapper scroll overflow (works even with overflow:hidden
      // because scrollHeight still reports true content height)
      const contentWrapper = layout.querySelector('[class*="h-full"]');
      if (
        contentWrapper &&
        contentWrapper.scrollHeight > contentWrapper.clientHeight + 6
      ) {
        return {
          detected: true,
          reason: `content scrollHeight ${contentWrapper.scrollHeight} > clientHeight ${contentWrapper.clientHeight} (+${contentWrapper.scrollHeight - contentWrapper.clientHeight}px clipped)`,
        };
      }

      // Fallback: compare all element positions against slide container bounding rect
      // (handles CSS scale() transforms — window.innerHeight would be wrong here)
      const layoutRect = layout.getBoundingClientRect();
      const clipBottom = layoutRect.bottom;
      const bleedingEl = [...layout.querySelectorAll("*")].find((el) => {
        const r = el.getBoundingClientRect();
        if (r.bottom <= clipBottom + 8 || r.width <= 10 || r.height <= 4)
          return false;
        // Skip elements inside overflow-y-auto/scroll containers (intentional scrollable code blocks)
        let ancestor = el.parentElement;
        while (ancestor && ancestor !== layout) {
          const style = window.getComputedStyle(ancestor);
          if (style.overflowY === "auto" || style.overflowY === "scroll")
            return false;
          ancestor = ancestor.parentElement;
        }
        return true;
      });
      if (bleedingEl) {
        const r = bleedingEl.getBoundingClientRect();
        return {
          detected: true,
          reason: `element bleeds to y=${Math.round(r.bottom)} (clip=${Math.round(clipBottom)}): ${bleedingEl.className.slice(0, 80)}`,
        };
      }
      return { detected: false, reason: "ok" };
    };

    const results = [];
    for (let n = 1; n <= totalSlides; n++) {
      const slideInfo = slides[n - 1];
      const dotAnalysis = analyzeSlideForDots(slides, n);
      const colorAnalysis = analyzeColorConsistency(slides, n);
      const syntaxAnalysis = validateHTMLSyntax(slideInfo);

      const url = `http://localhost:${port}/${n}`;
      await page.goto(url, { waitUntil: "networkidle", timeout: 15_000 });
      await page.waitForTimeout(600);

      // Section openers use justify-center with large background blurs — their
      // scrollHeight is inflated by decorative absolute elements, causing false
      // positives. Skip overflow detection for opener slides.
      let overflow;
      if (isSectionOpener(slideInfo)) {
        overflow = {
          detected: false,
          reason: "opener — overflow skipped (background blur elements)",
        };
      } else {
        overflow = await page.evaluate(evalOverflow);
      }

      const screenshotPath = path.join(HARNESS_DIR, `${deckSlug}-${n}.png`);
      await page.screenshot({ path: screenshotPath, fullPage: false });

      const hasIssues =
        overflow.detected ||
        dotAnalysis.missingDots ||
        colorAnalysis.inconsistent ||
        syntaxAnalysis.syntaxError;

      // Build per-slide output lines
      const statusIcon = hasIssues ? "🔴" : "✅";
      const openerTag =
        dotAnalysis.exempt && dotAnalysis.reason === "section opener"
          ? "  [OPENER]"
          : "";
      console.error(
        `  ${statusIcon} s${String(n).padStart(2)}  ${slideInfo.name.padEnd(45)}${openerTag}`,
      );

      if (syntaxAnalysis.syntaxError) {
        console.error(`       🚨 HTML SYNTAX: ${syntaxAnalysis.reason}`);
      }
      if (overflow.detected) {
        console.error(`       ⚠  OVERFLOW: ${overflow.reason}`);
      }
      if (dotAnalysis.missingDots) {
        console.error(`       ⚠  MISSING DOTS: ${dotAnalysis.reason}`);
      }
      if (colorAnalysis.inconsistent) {
        console.error(`       ⚠  COLOR: ${colorAnalysis.reason}`);
      }

      results.push({
        slide: n,
        name: slideInfo.name,
        syntaxError: syntaxAnalysis.syntaxError,
        syntaxOpens: syntaxAnalysis.opens,
        syntaxCloses: syntaxAnalysis.closes,
        syntaxBalance: syntaxAnalysis.balance,
        syntaxReason: syntaxAnalysis.reason,
        overflow: overflow.detected,
        overflowReason: overflow.reason,
        missingDots: dotAnalysis.missingDots,
        dotsExempt: dotAnalysis.exempt,
        sectionPart: dotAnalysis.sectionPart,
        dotsReason: dotAnalysis.reason,
        colorInconsistent: colorAnalysis.inconsistent,
        colorExpected: colorAnalysis.expected,
        colorActual: colorAnalysis.actual,
        colorReason: colorAnalysis.reason,
        screenshot: screenshotPath,
      });
    }

    await browser.close();

    const issueSlides = results.filter(
      (r) =>
        r.syntaxError || r.overflow || r.missingDots || r.colorInconsistent,
    );

    // Summary block
    console.error(`\n${"━".repeat(60)}`);
    if (issueSlides.length === 0) {
      console.error(`✅  All ${totalSlides} slides clean — no issues found`);
    } else {
      console.error(
        `🔴  ${issueSlides.length} slide(s) with issues out of ${totalSlides}:\n`,
      );
      for (const r of issueSlides) {
        console.error(`  s${r.slide}  "${r.name}"`);
        if (r.overflow) console.error(`      • OVERFLOW: ${r.overflowReason}`);
        if (r.missingDots)
          console.error(`      • MISSING DOTS: ${r.dotsReason}`);
        if (r.colorInconsistent)
          console.error(`      • COLOR: ${r.colorReason}`);
        console.error(`      📸 ${r.screenshot}`);
      }
    }
    console.error(`${"━".repeat(60)}\n`);

    console.log(JSON.stringify(results, null, 2));
    return;
  }

  const slides = parseSlideDeck(deckFile);
  const totalSlides = slides.length;

  if (slideNum > totalSlides) {
    console.error(
      `Error: slide ${slideNum} does not exist — deck has ${totalSlides} slides`,
    );
    process.exit(1);
  }

  const slideInfo = slides[slideNum - 1];
  const dotAnalysis = analyzeSlideForDots(slides, slideNum);
  const colorAnalysis = analyzeColorConsistency(slides, slideNum);
  const syntaxAnalysis = validateHTMLSyntax(slideInfo);

  // 3. Screenshot + overflow detection
  const { overflow, screenshotPath, renderedTotal } = await inspectSlide(
    slideNum,
    port,
    slides,
  );

  // Detect wrong-deck: if the server is serving a different file, the total slide
  // count in the footer won't match the parsed MD total.
  let wrongDeck = false;
  let wrongDeckWarning = null;
  if (renderedTotal) {
    const footerMatch = renderedTotal.match(/(\d+)\s*\/\s*(\d+)/);
    if (footerMatch) {
      const renderedSlideTotal = parseInt(footerMatch[2], 10);
      if (renderedSlideTotal !== totalSlides) {
        wrongDeck = true;
        wrongDeckWarning = `Slidev dev is serving a deck with ${renderedSlideTotal} slides, but "${deckSlug}" has ${totalSlides} slides. The screenshot is from the WRONG DECK. Start slidev dev with: npm exec slidev -- dev ${path.relative(SLIDES_DIR, deckFile)} --port ${port}`;
      }
    }
  }

  // 4. Report
  const report = {
    deck: deckSlug,
    slide: slideNum,
    totalSlides,
    name: slideInfo.name,
    wrongDeck,
    wrongDeckWarning,
    syntaxError: syntaxAnalysis.syntaxError,
    syntaxOpens: syntaxAnalysis.opens,
    syntaxCloses: syntaxAnalysis.closes,
    syntaxBalance: syntaxAnalysis.balance,
    syntaxReason: syntaxAnalysis.reason,
    overflow: wrongDeck ? null : overflow.detected,
    overflowReason: wrongDeck ? null : overflow.reason,
    missingDots: wrongDeck ? null : dotAnalysis.missingDots,
    dotsExempt: dotAnalysis.exempt,
    sectionPart: dotAnalysis.sectionPart,
    dotsReason: dotAnalysis.reason,
    colorInconsistent: wrongDeck ? null : colorAnalysis.inconsistent,
    colorExpected: colorAnalysis.expected,
    colorActual: colorAnalysis.actual,
    colorReason: colorAnalysis.reason,
    screenshot: screenshotPath,
    url: `http://localhost:${port}/${slideNum}`,
  };

  // Print JSON report to stdout (stderr used for progress messages)
  console.log(JSON.stringify(report, null, 2));

  // Human-readable summary to stderr
  console.error(`\n${"━".repeat(60)}`);
  if (wrongDeck) {
    console.error(`🚨 WRONG DECK: ${wrongDeckWarning}`);
  } else {
    const issues = [];
    if (report.syntaxError)
      issues.push(`🚨 HTML SYNTAX:  ${report.syntaxReason}`);
    if (report.overflow)
      issues.push(`⚠  OVERFLOW:      ${report.overflowReason}`);
    if (report.missingDots)
      issues.push(`⚠  MISSING DOTS:  ${report.dotsReason}`);
    if (report.colorInconsistent)
      issues.push(`⚠  COLOR MISMATCH: ${report.colorReason}`);

    if (issues.length === 0) {
      console.error(`✅  s${slideNum} "${slideInfo.name}" — clean`);
      console.error(
        `    Part ${dotAnalysis.sectionPart ?? "n/a"} · color: ${colorAnalysis.actual ?? "n/a"} · overflow: ${report.overflowReason}`,
      );
    } else {
      console.error(
        `🔴  s${slideNum} "${slideInfo.name}" — ${issues.length} issue(s):`,
      );
      issues.forEach((i) => console.error(`    ${i}`));
    }
  }
  console.error(`📸  Screenshot: ${screenshotPath}`);
  console.error(`🌐  Live: ${report.url}`);
  console.error(`${"━".repeat(60)}\n`);
})();
