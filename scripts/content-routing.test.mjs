import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { parseFeed, routeEvent, routeFeed } from "./content-routing-lib.mjs";

const root = join(import.meta.dirname, "..");
const registry = JSON.parse(readFileSync(join(root, ".github/content-routing/coverage.json"), "utf8"));
const profiles = [
  { slug: "vscode-latest", title: "VS Code Copilot", question: "How does VS Code evolve?", headings: ["Open Model Workbench"] },
  { slug: "copilot-cli", title: "GitHub Copilot CLI", question: "How do I bring AI to the terminal?", headings: ["Models", "Remote sessions"] },
  { slug: "agent-teams", title: "Agent Teams", question: "How do I compose multi-agent systems?", headings: ["Subagents"] }
];

test("parseFeed rejects future entries and deduplicates source URLs", () => {
  const xml = `<?xml version="1.0"?><rss><channel><title>Feed</title><lastBuildDate>Mon, 10 Aug 2026 16:00:05 GMT</lastBuildDate>
    <item><title>Valid</title><link>https://example.com/valid</link><description>One</description><pubDate>Mon, 10 Aug 2026 10:00:00 GMT</pubDate><guid>one</guid><category>GitHub</category></item>
    <item><title>Duplicate</title><link>https://example.com/valid</link><description>Two</description><pubDate>Mon, 10 Aug 2026 11:00:00 GMT</pubDate><guid>two</guid><category>GitHub</category></item>
    <item><title>Future</title><link>https://example.com/future</link><description>Three</description><pubDate>Tue, 11 Aug 2026 10:00:00 GMT</pubDate><guid>three</guid><category>GitHub</category></item>
  </channel></rss>`;
  const feed = parseFeed(xml, new Date("2026-08-10T16:00:05Z"));
  assert.equal(feed.events.length, 1);
  assert.equal(feed.duplicates.length, 1);
  assert.equal(feed.anomalies.length, 1);
  assert.equal(feed.anomalies[0].reason, "future-dated");
});

test("BYOK creates distinct obligations for VS Code and CLI without fanning out to generic agent talks", () => {
  const event = {
    id: "byok",
    title: "Use your own language model key in VS Code",
    source: "https://example.com/byok",
    published: "2026-08-10T00:00:00.000Z",
    categories: ["GitHub", "Visual Studio Code"],
    description: "BYOK adds custom endpoint and Ollama model support."
  };
  const result = routeEvent(event, registry, profiles);
  assert.equal(result.disposition, "review");
  assert.ok(result.candidates.some(({ talk }) => talk === "vscode-latest"));
  assert.ok(result.candidates.some(({ talk }) => talk === "copilot-cli"));
  assert.ok(!result.candidates.some(({ talk }) => talk === "agent-teams"));
  assert.equal(result.candidates.find(({ talk }) => talk === "vscode-latest").relationships[0].role, "explains");
  assert.equal(result.candidates.find(({ talk }) => talk === "copilot-cli").relationships[0].role, "applies");
});

test("generic agent wording does not create repository-wide fanout", () => {
  const event = {
    id: "generic",
    title: "Agent improvements",
    source: "https://example.com/generic",
    published: "2026-08-10T00:00:00.000Z",
    categories: ["GitHub"],
    description: "Agents complete work more quickly."
  };
  const result = routeEvent(event, registry, profiles);
  assert.equal(result.disposition, "no-match");
  assert.equal(result.candidates.length, 0);
});

test("README overlap cannot create candidates without an obligation match", () => {
  const event = {
    id: "notifications",
    title: "Custom thread subscriptions are being deprecated",
    source: "https://example.com/notifications",
    published: "2026-08-10T00:00:00.000Z",
    categories: ["GitHub"],
    description: "Enterprise owners can configure custom notification settings."
  };
  const result = routeEvent(event, registry, profiles);
  assert.equal(result.disposition, "no-match");
  assert.equal(result.candidates.length, 0);
});

test("code review effort routes to the owning review talk", () => {
  const event = {
    id: "review",
    title: "Copilot code review effort levels are generally available",
    source: "https://example.com/review",
    published: "2026-08-10T00:00:00.000Z",
    categories: ["GitHub"],
    description: "Choose Lite or Balanced review effort."
  };
  const result = routeEvent(event, registry, profiles);
  assert.equal(result.candidates[0].talk, "copilot-code-review");
  assert.equal(result.candidates[0].relationships[0].role, "explains");
});

test("ledger decisions prevent adjudicated events from reopening", () => {
  const event = {
    id: "review",
    title: "Copilot code review effort levels are generally available",
    source: "https://example.com/review",
    published: "2026-08-10T00:00:00.000Z",
    categories: ["GitHub"],
    description: "Choose Lite or Balanced review effort."
  };
  const feed = { title: "Feed", lastBuildDate: "2026-08-10T00:00:00.000Z", events: [event], anomalies: [], duplicates: [] };
  const ledger = { events: { review: { status: "adjudicated", decisions: [{ talk: "copilot-code-review", materiality: "content", status: "proposal-created", reason: "Missing control." }] } } };
  const report = routeFeed(feed, registry, profiles, { ledger });
  assert.equal(report.summary.review, 0);
  assert.equal(report.summary.adjudicated, 1);
  assert.equal(report.events[0].adjudication.decisions[0].talk, "copilot-code-review");
});