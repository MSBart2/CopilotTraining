#!/usr/bin/env node
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import {
  collectPortfolio,
  inventoryErrors,
  normalizeGeneratedAt,
} from "./portfolio-inventory-lib.mjs";

const root = join(import.meta.dirname, "..");
const outputPath = join(root, "tech-talks", "portfolio.generated.json");
const inventory = collectPortfolio(root);
const errors = inventoryErrors(inventory);

if (process.argv.includes("--check")) {
  let committed;
  try {
    committed = JSON.parse(readFileSync(outputPath, "utf8"));
  } catch {
    console.error("Portfolio inventory is missing or invalid. Run: npm run portfolio:generate");
    process.exit(1);
  }

  if (
    JSON.stringify(normalizeGeneratedAt(committed)) !==
    JSON.stringify(normalizeGeneratedAt(inventory))
  ) {
    console.error("Portfolio inventory is stale. Run: npm run portfolio:generate");
    process.exit(1);
  }
} else {
  writeFileSync(outputPath, `${JSON.stringify(inventory, null, 2)}\n`);
  console.log(`Generated ${inventory.counts.practitionerTalks} practitioner talks.`);
}

if (errors.length > 0) {
  console.error(errors.map((error) => `- ${error}`).join("\n"));
  process.exit(1);
}

console.log("Portfolio inventory is valid.");