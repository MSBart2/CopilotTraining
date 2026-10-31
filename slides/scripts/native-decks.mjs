#!/usr/bin/env node
import { existsSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const REQUIRED_FILES = ["index.html", "slides.js", "scenes.js", "notes.html"];

export function getNativeDeck(slidesRoot, slug) {
  const dir = join(slidesRoot, "tech-talks", slug);
  if (!existsSync(dir) || !statSync(dir).isDirectory()) return null;

  if (slug === "dist" || !REQUIRED_FILES.some((name) => existsSync(join(dir, name)))) return null;

  const missing = REQUIRED_FILES.filter((name) => !existsSync(join(dir, name)));
  if (missing.length) {
    throw new Error(`Incomplete native deck tech-talks/${slug}; missing ${missing.join(", ")}`);
  }

  return {
    category: "tech-talks",
    slug,
    dir,
    entry: join(dir, "index.html"),
    notes: join(dir, "notes.html"),
    source: join(dir, "slides.js"),
  };
}

export function discoverNativeDecks(slidesRoot) {
  const dir = join(slidesRoot, "tech-talks");
  if (!existsSync(dir)) return [];

  return readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => getNativeDeck(slidesRoot, entry.name))
    .filter(Boolean)
    .sort((a, b) => a.slug.localeCompare(b.slug));
}
