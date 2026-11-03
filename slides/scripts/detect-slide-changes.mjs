import { appendFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { getNativeDeck } from "./native-decks.mjs";

export function detectSlideChanges(files, slidesRoot) {
  const fullRebuild = files.some((file) =>
    /^slides\/(package(-lock)?\.json|style\.css|vite\.config\.ts|global-(top|bottom)\.vue|layouts\/|components\/|setup\/)/.test(file),
  );
  const fullNative = fullRebuild || files.some((file) =>
    /^slides\/(native\/|scripts\/(native-decks|build-native-decks|validate-native-deck)\.mjs)/.test(file),
  );
  const nativeSlugs = new Set();
  const changedSlides = new Set();
  const changedTalks = new Set();

  for (const file of files) {
    const nativeMatch = file.match(/^slides\/tech-talks\/([^/]+)\//);
    if (nativeMatch && getNativeDeck(slidesRoot, nativeMatch[1])) {
      nativeSlugs.add(nativeMatch[1]);
    }
    const slideMatch = file.match(/^slides\/((workshop|tech-talks|exec-talks)\/[^/]+\.md)$/);
    if (slideMatch && existsSync(join(slidesRoot, slideMatch[1]))) {
      const slug = slideMatch[1].slice("tech-talks/".length, -3);
      if (slideMatch[2] !== "tech-talks" || !getNativeDeck(slidesRoot, slug)) {
        changedSlides.add(slideMatch[1]);
      }
    }
    const talkMatch = file.match(/^tech-talks\/([^/]+)\//);
    if (talkMatch && talkMatch[1] !== "archive") changedTalks.add(talkMatch[1]);
  }

  for (const slug of changedTalks) {
    if (getNativeDeck(slidesRoot, slug)) {
      if (!nativeSlugs.has(slug)) {
        throw new Error(`Tech talk ${slug} requires a corresponding native deck update in slides/tech-talks/${slug}/.`);
      }
    } else if (!changedSlides.has(`tech-talks/${slug}.md`)) {
      throw new Error(`Tech talk ${slug} requires a corresponding slide update: slides/tech-talks/${slug}.md.`);
    }
  }

  return {
    full_rebuild: fullRebuild,
    full_native: fullNative,
    changed_slides: [...changedSlides].sort(),
    changed_native: [...nativeSlugs].sort(),
  };
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const [base, head] = process.argv.slice(2);
  if (!base || !head) throw new Error("Usage: node detect-slide-changes.mjs <base-sha> <head-sha>");
  const root = fileURLToPath(new URL("..", import.meta.url));
  const files = execFileSync("git", ["diff", "--name-only", `${base}...${head}`, "--", "slides/", "tech-talks/"], {
    encoding: "utf8",
  }).trim().split(/\r?\n/).filter(Boolean);
  const plan = detectSlideChanges(files, root);
  console.log(JSON.stringify(plan, null, 2));
  if (process.env.GITHUB_OUTPUT) {
    for (const [key, value] of Object.entries(plan)) {
      appendFileSync(process.env.GITHUB_OUTPUT,
        Array.isArray(value)
          ? `${key}<<SLIDE_CHANGES\n${value.join("\n")}\nSLIDE_CHANGES\n`
          : `${key}=${value}\n`);
    }
  }
}
