import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const workshopMachinery = [
  ".github/agents/module-planner.agent.md",
  ".github/agents/module-creator.agent.md",
  ".github/skills/module-author/SKILL.md",
  ".github/skills/exercise-author/SKILL.md",
];

const personas = ["Sarah", "Marcus", "David", "Elena", "Rafael", "Jessica"];

const executiveMachinery = [
  ".github/agents/exec-talk-generator.agent.md",
  ".github/agents/slide-generator.agent.md",
  ".github/skills/exec-recipe-review/SKILL.md",
  ".github/skills/exec-recipe-review/EXEC-RECIPE-TEMPLATE.yml",
];

async function read(path) {
  return readFile(new URL(`../${path}`, import.meta.url), "utf8");
}

test("workshop machinery uses live repository paths", async () => {
  for (const path of workshopMachinery) {
    const content = await read(path);
    assert.doesNotMatch(content, /(?:^|[\s`])modules\//m, `${path} still references modules/`);
  }
});

test("workshop planning represents all six personas", async () => {
  for (const path of workshopMachinery.slice(0, 3)) {
    const content = await read(path);
    for (const persona of personas) {
      assert.match(content, new RegExp(`\\b${persona}\\b`), `${path} omits ${persona}`);
    }
  }
});

test("module template produces valid active content", async () => {
  const template = await read(".github/skills/module-author/TEMPLATE.md");
  assert.match(template, /^---\r?\nstatus: active\r?\nupdated: YYYY-MM-DD\r?\n---/);
  assert.doesNotMatch(template, /�/, "module template contains encoding damage");
  for (const persona of personas) {
    assert.match(template, new RegExp(`\\b${persona}\\b`), `module template omits ${persona}`);
  }
});

test("executive machinery uses the live tech-talks/exec-* source path", async () => {
  for (const path of executiveMachinery) {
    const content = await read(path);
    assert.doesNotMatch(
      content,
      /(?:^|[\s`])exec-talks\/<topic>/m,
      `${path} still points to the retired exec-talks/<topic> source path`,
    );
  }
});

test("executive recipe template always imports the shared spine", async () => {
  const template = await read(".github/skills/exec-recipe-review/EXEC-RECIPE-TEMPLATE.yml");
  assert.match(template, /preamble:\s*\r?\n\s+- src: "\.\/exec-spine\.md"/);
  assert.doesNotMatch(template, /preamble:\s*\[\]/);
});

test("tech-talk generator distinguishes required and optional sections", async () => {
  const generator = await read(".github/agents/tech-talk-generator.agent.md");
  assert.match(generator, /Visual Assets.*optional/is);
  assert.doesNotMatch(generator, /all required sections[^\n]*Visual Assets/i);
});

test("talk generators require traceable evidence and audience outcomes", async () => {
  const techGenerator = await read(".github/agents/tech-talk-generator.agent.md");
  const execGenerator = await read(".github/agents/exec-talk-generator.agent.md");

  assert.match(techGenerator, /### Evidence map/);
  assert.match(techGenerator, /expected signal/i);
  assert.match(techGenerator, /how to validate/i);
  assert.match(execGenerator, /### Evidence map/);
  assert.match(execGenerator, /## Executive Content Fitness \(Hard Gate\)/);
  assert.match(execGenerator, /Decision-ready/);
  assert.match(execGenerator, /owner and success signal/i);
});

test("talk machinery uses live Workbench benches", async () => {
  const paths = [
    ".github/agents/tech-talk-generator.agent.md",
    ".github/agents/tech-talk-slide-generator.agent.md",
    ".github/agents/slide-generator.agent.md",
    ".github/skills/workbench/SKILL.md",
  ];
  for (const path of paths) {
    const content = await read(path);
    assert.doesNotMatch(content, /memories\/infra/, `${path} references the retired infra bench`);
  }
});

test("executive review preserves the factual opportunity-framed voice", async () => {
  const review = await read(".github/skills/exec-recipe-review/SKILL.md");
  assert.match(review, /memories\/exec-talks\/preferences\.md/);
  assert.doesNotMatch(review, /Missing urgency|cost of not acting|cost of delay/i);
});

test("tech-talk template is clean and produces observable actions", async () => {
  const template = await read("tech-talks/TEMPLATE.md");
  assert.doesNotMatch(template, /�/, "tech-talk template contains encoding damage");
  assert.match(template, /## What You Can Do Today/);
  assert.match(template, /Expected signal/);
  assert.match(template, /Validate/);
  assert.match(template, /Boundary/);
});

test("universal instructions own the education north star", async () => {
  const instructions = await read("AGENTS.md");
  assert.match(
    instructions,
    /Great Copilot education helps capable people form better judgment about context, delegation, verification, and authority, then lets them prove that judgment in their own work\./,
  );
  for (const lens of ["Context", "Delegation", "Verification", "Authority"]) {
    assert.match(instructions, new RegExp(`\\*\\*${lens}\\*\\*`));
  }
  assert.match(instructions, /attempt → inspect → adjust → rerun → validate/);
});

test("content planning and recipe review consume the judgment contract", async () => {
  const consumers = [
    ".github/agents/module-planner.agent.md",
    ".github/agents/module-creator.agent.md",
    ".github/agents/tech-talk-generator.agent.md",
    ".github/agents/exec-talk-generator.agent.md",
    ".github/agents/slide-generator.agent.md",
    ".github/agents/tech-talk-slide-generator.agent.md",
    ".github/skills/module-author/SKILL.md",
    ".github/skills/exercise-author/SKILL.md",
    ".github/skills/deck-recipe-review/SKILL.md",
    ".github/skills/exec-recipe-review/SKILL.md",
  ];
  for (const path of consumers) {
    const content = await read(path);
    assert.match(content, /Judgment and Transfer Contract/, `${path} does not consume the contract`);
  }
});

test("workshop and tech-talk templates require transfer to real work", async () => {
  for (const path of [
    ".github/skills/exercise-author/TEMPLATE.md",
    "tech-talks/TEMPLATE.md",
  ]) {
    const content = await read(path);
    assert.match(content, /Apply It to Your Work/, `${path} lacks a transfer prompt`);
    assert.match(content, /context/i, `${path} does not ask learners to examine context`);
    assert.match(content, /authority|approve|review owner/i, `${path} omits authority or ownership`);
  }
});