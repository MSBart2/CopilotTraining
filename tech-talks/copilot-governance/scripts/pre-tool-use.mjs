#!/usr/bin/env node

import { readFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";

const SENSITIVE_PATHS = [
  /(^|[/\\])\.env(?:\.|$)/i,
  /(^|[/\\])secrets?([/\\]|$)/i,
  /(^|[/\\])\.github[/\\]workflows[/\\]deploy[^/\\]*\.ya?ml$/i,
  /(^|[/\\])src[/\\]auth[/\\](?:policy|keys?)[/\\]?/i,
];

const PUBLICATION_COMMANDS = [
  /(^|\s)git\s+push(?:\s|$)/i,
  /(^|\s)gh\s+pr\s+merge(?:\s|$)/i,
  /(^|\s)gh\s+release\s+create(?:\s|$)/i,
];

function collectStrings(value, result = []) {
  if (typeof value === "string") {
    result.push(value);
  } else if (Array.isArray(value)) {
    for (const item of value) collectStrings(item, result);
  } else if (value && typeof value === "object") {
    for (const item of Object.values(value)) collectStrings(item, result);
  }
  return result;
}

function decision(permissionDecision, permissionDecisionReason) {
  return {
    hookSpecificOutput: {
      hookEventName: "PreToolUse",
      permissionDecision,
      permissionDecisionReason,
    },
  };
}

export function evaluate(input) {
  if (input?.hookEventName !== "PreToolUse") {
    return decision("deny", "Policy received an unexpected hook event.");
  }

  const values = collectStrings(input.tool_input);

  if (values.some((value) => SENSITIVE_PATHS.some((pattern) => pattern.test(value)))) {
    return decision(
      "deny",
      "Sensitive authentication, secret, or deployment-policy paths require a separate owner-led change."
    );
  }

  if (values.some((value) => PUBLICATION_COMMANDS.some((pattern) => pattern.test(value)))) {
    return decision(
      "ask",
      "Publication changes repository state and requires explicit developer confirmation."
    );
  }

  return decision(
    "allow",
    "The request stays inside the bounded development workspace policy."
  );
}

async function main() {
  if (process.argv[2] === "--fixtures") {
    const fixturePath = process.argv[3];
    const fixtures = JSON.parse(await readFile(fixturePath, "utf8"));
    let failures = 0;

    for (const fixture of fixtures) {
      const actual = evaluate(fixture.input).hookSpecificOutput.permissionDecision;
      const passed = actual === fixture.expectedDecision;
      console.log(`${passed ? "PASS" : "FAIL"} ${fixture.name}: ${actual}`);
      if (!passed) failures += 1;
    }

    process.exitCode = failures === 0 ? 0 : 1;
    return;
  }

  let payload = "";
  process.stdin.setEncoding("utf8");
  for await (const chunk of process.stdin) payload += chunk;
  process.stdout.write(`${JSON.stringify(evaluate(JSON.parse(payload)))}\n`);
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((error) => {
    process.stderr.write(`${error.message}\n`);
    process.exitCode = 1;
  });
}
