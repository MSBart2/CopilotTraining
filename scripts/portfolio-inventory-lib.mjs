import {
  existsSync,
  readFileSync,
  readdirSync,
  statSync,
} from "node:fs";
import { basename, join, relative } from "node:path";

export const CURRENT_SECTIONS = [
  "Choose and Configure",
  "Delegate and Coordinate",
  "Verify and Govern",
  "Extend and Embed",
];
export const AUDIENCES = [
  "developer",
  "team-lead",
  "platform-engineer",
  "security",
  "architect",
  "engineering-leader",
];
export const LEVELS = ["foundational", "applied", "advanced", "strategic"];
export const FORMATS = ["core-talk", "clinic", "case-study", "release-brief"];

function parseScalar(rawValue) {
  const unquoted = rawValue.replace(/^(?:"([\s\S]*)"|'([\s\S]*)')$/, "$1$2");
  if (/^\[.*\]$/.test(unquoted)) {
    if (unquoted === "[]") return [];
    return unquoted
      .slice(1, -1)
      .split(",")
      .map((value) => value.trim().replace(/^(?:"(.*)"|'(.*)')$/, "$1$2"));
  }
  if (/^\d+$/.test(unquoted)) return Number(unquoted);
  return unquoted;
}

export function parseFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
  if (!match) return {};

  const result = {};
  let arrayKey = null;
  for (const line of match[1].split(/\r?\n/)) {
    const property = line.match(/^([A-Za-z][\w-]*):\s*(.*?)\s*$/);
    if (property) {
      const [, key, rawValue] = property;
      if (rawValue === "") {
        result[key] = [];
        arrayKey = key;
      } else {
        result[key] = parseScalar(rawValue);
        arrayKey = null;
      }
      continue;
    }
    const item = line.match(/^\s+-\s+(.+?)\s*$/);
    if (item && arrayKey) result[arrayKey].push(parseScalar(item[1]));
  }
  return result;
}

export function extractTitle(content) {
  return content.match(/^#\s+(.+)$/m)?.[1]?.trim() ?? null;
}

function toPosix(root, path) {
  return relative(root, path).replaceAll("\\", "/");
}

function fileRecord(root, path) {
  if (!existsSync(path)) return { path: toPosix(root, path), exists: false };
  const stats = statSync(path);
  return {
    path: toPosix(root, path),
    exists: true,
    bytes: stats.size,
    modified: stats.mtime.toISOString(),
  };
}

export function collectIndexSlugs(indexContent) {
  return [...indexContent.matchAll(/href="tech-talks\/([^/"#]+)\/"/g)]
    .map((match) => match[1])
    .filter((slug) => !slug.startsWith("exec-"));
}

export function collectPortfolio(root) {
  const talksRoot = join(root, "tech-talks");
  const slidesRoot = join(root, "slides", "tech-talks");
  const companionsRoot = join(root, "slides", "companions", "tech-talks");
  const indexPath = join(root, "slides", "index-custom.html");
  const indexSlugs = new Set(collectIndexSlugs(readFileSync(indexPath, "utf8")));
  const redirectsPath = join(root, ".github", "content-routing", "portfolio-redirects.json");
  let redirects = [];
  const redirectErrors = [];

  try {
    const registry = JSON.parse(readFileSync(redirectsPath, "utf8"));
    redirects = Array.isArray(registry.redirects) ? registry.redirects : [];
    if (!Array.isArray(registry.redirects)) redirectErrors.push("Redirect registry must contain a redirects array");
  } catch {
    redirectErrors.push("Redirect registry is missing or invalid");
  }

  const directories = readdirSync(talksRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();

  const ghostDirectories = directories.filter(
    (slug) => !existsSync(join(talksRoot, slug, "README.md")),
  );

  const talks = directories
    .filter((slug) => existsSync(join(talksRoot, slug, "README.md")))
    .map((slug) => {
      const readmePath = join(talksRoot, slug, "README.md");
      const readmeContent = readFileSync(readmePath, "utf8");
      const readme = parseFrontmatter(readmeContent);
      if (readme.section === "Executive Talks" || slug.startsWith("exec-")) {
        return null;
      }

      const deckPath = join(slidesRoot, `${slug}.md`);
      const deck = existsSync(deckPath)
        ? parseFrontmatter(readFileSync(deckPath, "utf8"))
        : {};
      const files = {
        readme: fileRecord(root, readmePath),
        recipe: fileRecord(root, join(talksRoot, slug, "deck.recipe.yml")),
        deck: fileRecord(root, deckPath),
        agendaMarkdown: fileRecord(root, join(companionsRoot, slug, "agenda.md")),
        agendaHtml: fileRecord(root, join(companionsRoot, slug, "agenda.html")),
        deckPdf: fileRecord(root, join(companionsRoot, slug, "deck.pdf")),
      };
      const errors = [];
      const portfolioState = readme.portfolioState ?? "deployed";
      const isCandidate = portfolioState === "candidate";
      const isArchived = readme.status === "archived";
      if (!["deployed", "candidate"].includes(portfolioState)) {
        errors.push(`README portfolioState is invalid: ${portfolioState}`);
      }
      if (!["active", "archived"].includes(readme.status)) {
        errors.push(`README status is invalid: ${readme.status ?? "missing"}`);
      }
      if (isArchived && isCandidate) errors.push("Archived talk cannot remain a candidate");
      if (!readme.updated) errors.push("README updated date is missing");
      if (!CURRENT_SECTIONS.includes(readme.section)) {
        errors.push(`README section is invalid: ${readme.section ?? "missing"}`);
      }
      if (!Array.isArray(readme.audience) || readme.audience.length === 0) {
        errors.push("README audience is missing");
      } else {
        const invalidAudiences = readme.audience.filter((value) => !AUDIENCES.includes(value));
        if (invalidAudiences.length) errors.push(`README audience is invalid: ${invalidAudiences.join(", ")}`);
      }
      if (!LEVELS.includes(readme.level)) errors.push(`README level is invalid: ${readme.level ?? "missing"}`);
      if (!Number.isInteger(readme.duration) || readme.duration < 20) {
        errors.push(`README duration is invalid: ${readme.duration ?? "missing"}`);
      }
      if (!FORMATS.includes(readme.format)) errors.push(`README format is invalid: ${readme.format ?? "missing"}`);
      if (typeof readme.decision !== "string" || readme.decision.length === 0) {
        errors.push("README decision is missing");
      }
      if (!Array.isArray(readme.prerequisites)) errors.push("README prerequisites must be an array");
      if (!Array.isArray(readme.related)) errors.push("README related must be an array");
      if (!isCandidate && !files.deck.exists) errors.push("Slide deck is missing");
      if (files.deck.exists && deck.status !== readme.status) {
        errors.push(`Status mismatch: README=${readme.status}, deck=${deck.status ?? "missing"}`);
      }
      if (files.deck.exists && deck.section !== readme.section) {
        errors.push(`Section mismatch: README=${readme.section}, deck=${deck.section ?? "missing"}`);
      }
      for (const [name, file] of Object.entries(files)) {
        if (isCandidate && name !== "readme") continue;
        if (isArchived && ["agendaMarkdown", "agendaHtml", "deckPdf"].includes(name)) continue;
        if (!file.exists) errors.push(`${name} is missing`);
      }
      if (!isArchived && !isCandidate && !indexSlugs.has(slug)) errors.push("Active catalog card is missing");

      return {
        slug,
        title: extractTitle(readmeContent),
        status: readme.status ?? null,
        portfolioState,
        updated: readme.updated ?? null,
        section: readme.section ?? null,
        audience: readme.audience ?? null,
        level: readme.level ?? null,
        duration: readme.duration ?? null,
        format: readme.format ?? null,
        decision: readme.decision ?? null,
        prerequisites: readme.prerequisites ?? null,
        related: readme.related ?? null,
        deckSection: deck.section ?? null,
        cataloged: indexSlugs.has(slug),
        files,
        errors,
      };
    })
    .filter(Boolean);

  const talkSlugs = new Set(talks.map(({ slug }) => slug));
  const orphanedCards = [...indexSlugs].filter((slug) => !talkSlugs.has(slug)).sort();
  const redirectsBySource = new Map();
  for (const redirect of redirects) {
    const required = ["source", "status", "target", "reason", "decisionId"];
    const missing = required.filter((key) => typeof redirect?.[key] !== "string" || redirect[key].length === 0);
    if (missing.length > 0) {
      redirectErrors.push(`Redirect entry is missing: ${missing.join(", ")}`);
      continue;
    }
    if (redirectsBySource.has(redirect.source)) {
      redirectErrors.push(`Duplicate redirect source: ${redirect.source}`);
      continue;
    }
    redirectsBySource.set(redirect.source, redirect);
  }

  const talksBySlug = new Map(talks.map((talk) => [talk.slug, talk]));
  for (const talk of talks) {
    if (talk.status === "archived" && !redirectsBySource.has(talk.slug)) {
      redirectErrors.push(`Archived talk has no redirect: ${talk.slug}`);
    }
  }
  for (const redirect of redirectsBySource.values()) {
    const source = talksBySlug.get(redirect.source);
    const target = talksBySlug.get(redirect.target);
    if (!source || source.status !== "archived") {
      redirectErrors.push(`Redirect source is not archived: ${redirect.source}`);
    }
    if (!target || target.status !== "active" || target.portfolioState !== "deployed") {
      redirectErrors.push(`Redirect target is not active and deployed: ${redirect.target}`);
    }
  }

  const activeTalks = talks.filter(({ status }) => status === "active");

  return {
    schemaVersion: 1,
    generatedAt: new Date().toISOString(),
    source: "tech-talks/*/README.md",
    counts: {
      totalTalks: talks.length,
      practitionerTalks: activeTalks.length,
      archivedTalks: talks.length - activeTalks.length,
      deployedTalks: activeTalks.filter(({ portfolioState }) => portfolioState === "deployed").length,
      candidateTalks: activeTalks.filter(({ portfolioState }) => portfolioState === "candidate").length,
      catalogCards: indexSlugs.size,
      validTalks: talks.filter(({ errors }) => errors.length === 0).length,
    },
    warnings: ghostDirectories.map((slug) => `Directory has no README and is not a portfolio artifact: ${slug}`),
    ghostDirectories,
    orphanedCards,
    redirects,
    redirectErrors,
    talks,
  };
}

export function normalizeGeneratedAt(inventory) {
  return { ...inventory, generatedAt: "<generated>" };
}

export function inventoryErrors(inventory) {
  return [
    ...inventory.redirectErrors,
    ...inventory.orphanedCards.map((slug) => `Orphaned catalog card: ${slug}`),
    ...inventory.talks.flatMap(({ slug, errors }) =>
      errors.map((error) => `${slug}: ${error}`),
    ),
  ];
}