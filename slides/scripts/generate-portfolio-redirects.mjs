#!/usr/bin/env node
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const scriptsDir = dirname(fileURLToPath(import.meta.url));
const slidesRoot = join(scriptsDir, "..");
const repoRoot = join(slidesRoot, "..");
const registryPath = join(repoRoot, ".github", "content-routing", "portfolio-redirects.json");
const distRoot = join(slidesRoot, "dist");
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function redirectPage(target, reason) {
  const destination = `/CopilotTraining/tech-talks/${target}/`;
  const escapedDestination = escapeHtml(destination);
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="refresh" content="0; url=${escapedDestination}">
  <link rel="canonical" href="${escapedDestination}">
  <title>Talk moved</title>
</head>
<body>
  <p>${escapeHtml(reason)}</p>
  <p><a href="${escapedDestination}">Continue to the replacement talk</a></p>
  <script>window.location.replace(${JSON.stringify(destination)} + window.location.search + window.location.hash)</script>
</body>
</html>
`;
}

if (!existsSync(registryPath)) {
  console.error(`Redirect registry not found: ${registryPath}`);
  process.exit(1);
}

const registry = JSON.parse(readFileSync(registryPath, "utf8"));
if (!Array.isArray(registry.redirects)) {
  console.error("Redirect registry must contain a redirects array.");
  process.exit(1);
}

const seen = new Set();
for (const redirect of registry.redirects) {
  if (!slugPattern.test(redirect.source) || !slugPattern.test(redirect.target)) {
    console.error(`Unsafe redirect slug: ${redirect.source ?? "missing"} -> ${redirect.target ?? "missing"}`);
    process.exit(1);
  }
  if (typeof redirect.reason !== "string" || redirect.reason.length === 0) {
    console.error(`Redirect reason is missing: ${redirect.source}`);
    process.exit(1);
  }
  if (seen.has(redirect.source)) {
    console.error(`Duplicate redirect source: ${redirect.source}`);
    process.exit(1);
  }
  seen.add(redirect.source);

  const outputDir = join(distRoot, "tech-talks", redirect.source);
  mkdirSync(outputDir, { recursive: true });
  writeFileSync(join(outputDir, "index.html"), redirectPage(redirect.target, redirect.reason));
}

console.log(`Generated ${seen.size} portfolio redirect page(s).`);