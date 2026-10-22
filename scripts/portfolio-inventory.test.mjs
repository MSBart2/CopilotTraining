import test from "node:test";
import assert from "node:assert/strict";
import { join } from "node:path";
import {
  CURRENT_SECTIONS,
  LEGACY_SECTIONS,
  collectIndexSlugs,
  collectPortfolio,
  extractTitle,
  inventoryErrors,
  parseFrontmatter,
} from "./portfolio-inventory-lib.mjs";

const root = join(import.meta.dirname, "..");

test("parses scalar frontmatter and titles", () => {
  const content = `---\nstatus: active\nsection: "Choose and Configure"\nduration: 45\naudience:\n  - developer\n  - team-lead\n---\n\n# Example Talk\n`;
  assert.deepEqual(parseFrontmatter(content), {
    status: "active",
    section: "Choose and Configure",
    duration: 45,
    audience: ["developer", "team-lead"],
  });
  assert.equal(extractTitle(content), "Example Talk");
});

test("collects only practitioner catalog slugs", () => {
  const html = '<a href="tech-talks/copilot-cli/"></a><a href="tech-talks/exec-labor/"></a>';
  assert.deepEqual(collectIndexSlugs(html), ["copilot-cli"]);
});

test("active talks use runtime sections; legacy sections stay on archived talks", () => {
  const inventory = collectPortfolio(root);
  for (const talk of inventory.talks) {
    if (talk.status === "active") {
      assert.ok(CURRENT_SECTIONS.includes(talk.section), `${talk.slug} uses ${talk.section}`);
    } else {
      assert.ok(
        CURRENT_SECTIONS.includes(talk.section) || LEGACY_SECTIONS.includes(talk.section),
        `${talk.slug} uses ${talk.section}`,
      );
    }
    assert.ok(!talk.errors.some((error) => error.startsWith("README section is invalid")), talk.slug);
  }
});

test("discovers the current consolidated practitioner portfolio", () => {
  const inventory = collectPortfolio(root);
  assert.equal(inventory.counts.totalTalks, 31);
  assert.equal(inventory.counts.practitionerTalks, 22);
  assert.equal(inventory.counts.archivedTalks, 9);
  assert.equal(inventory.counts.deployedTalks, 21);
  assert.equal(inventory.counts.candidateTalks, 1);
  assert.equal(inventory.counts.catalogCards, 24);
  assert.equal(inventory.counts.validTalks, inventory.counts.totalTalks);
  assert.equal(inventory.redirects.length, 9);
  assert.equal(new Set(inventory.talks.map(({ slug }) => slug)).size, inventory.counts.totalTalks);
  assert.deepEqual(inventoryErrors(inventory), []);
});