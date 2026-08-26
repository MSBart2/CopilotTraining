#!/usr/bin/env node

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { loadTalkProfiles, parseFeed, renderMarkdown, routeFeed } from "./content-routing-lib.mjs";

const args = process.argv.slice(2);
const valueFor = (name, fallback = null) => {
  const index = args.indexOf(name);
  return index === -1 ? fallback : args[index + 1];
};

const root = resolve(import.meta.dirname, "..");
const feedUrl = valueFor("--feed", "https://developer.microsoft.com/api/changelog/rss");
const outputDir = resolve(root, valueFor("--output-dir", ".github/content-routing"));
// npm treats --since as its own config and does not forward it. Honor
// npm_config_since so `npm run content:route -- --since DATE` still works.
const sinceArg = valueFor("--since") ?? process.env.npm_config_since ?? process.env.CONTENT_ROUTE_SINCE;
const sinceDays = Number.parseInt(valueFor("--since-days", process.env.LOOKBACK_DAYS ?? process.env.npm_config_since_days ?? "7"), 10);
const since = sinceArg ?? new Date(Date.now() - sinceDays * 86400000).toISOString();

const xml = /^https?:/i.test(feedUrl)
  ? await fetch(feedUrl, { headers: { "User-Agent": "CopilotTraining-ContentRouter/1.0" } }).then((response) => {
      if (!response.ok) throw new Error(`Feed request failed: HTTP ${response.status}`);
      return response.text();
    })
  : readFileSync(resolve(root, feedUrl), "utf8");

const registry = JSON.parse(readFileSync(join(root, ".github/content-routing/coverage.json"), "utf8"));
const ledger = JSON.parse(readFileSync(join(root, ".github/content-routing/ledger.json"), "utf8"));
const profiles = loadTalkProfiles(root);
const feed = parseFeed(xml);
const report = routeFeed(feed, registry, profiles, { since, ledger });
const markdown = renderMarkdown(report);

mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "latest-report.json"), `${JSON.stringify(report, null, 2)}\n`, "utf8");
writeFileSync(join(outputDir, "latest-report.md"), markdown, "utf8");

console.log(markdown);
console.error(`Wrote ${report.summary.review} review item(s) to ${outputDir}`);