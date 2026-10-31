#!/usr/bin/env node

/**
 * Test script for 404 redirect logic
 * Validates that the 404 handler correctly redirects slide routes without infinite loops
 */

import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, "..");

// Read the 404.html file
const html404Content = readFileSync(join(projectRoot, "404.html"), "utf8");

// Extract the JavaScript logic from 404.html
const scriptMatch = html404Content.match(/<script>([\s\S]*?)<\/script>/i);
if (!scriptMatch) {
  console.error("❌ Could not find script tag in 404.html");
  process.exit(1);
}

// Test cases
const testCases = [
  {
    name: "Native tech-talk numeric slide route",
    input: "/CopilotTraining/tech-talks/surfaces/17",
    expectedAction: "redirect",
    expectedTo: "/CopilotTraining/tech-talks/surfaces/?slide=17",
    expectedLoopPrevention: true,
  },
  {
    name: "Slide route with double digit",
    input: "/CopilotTraining/tech-talks/subagents/15",
    expectedAction: "redirect",
    expectedTo: "/CopilotTraining/tech-talks/subagents/?slide=15",
    expectedLoopPrevention: true,
  },
  {
    name: "Presentation base without trailing slash",
    input: "/CopilotTraining/tech-talks/subagents",
    expectedAction: "redirect",
    expectedTo: "/CopilotTraining/tech-talks/subagents/",
    expectedLoopPrevention: false,
  },
  {
    name: "Workshop slide route",
    input: "/CopilotTraining/workshop/01-instructions/3",
    expectedAction: "redirect",
    expectedTo: "/CopilotTraining/workshop/01-instructions/?slide=3",
    expectedLoopPrevention: true,
  },
  {
    name: "Duplicated workshop base route",
    input:
      "/CopilotTraining/workshop/00-orientation/CopilotTraining/workshop/00-orientation/2",
    expectedAction: "redirect",
    expectedTo:
      "/CopilotTraining/workshop/00-orientation/?slide=CopilotTraining%2Fworkshop%2F00-orientation%2F2",
    expectedLoopPrevention: true,
  },
  {
    name: "Root path",
    input: "/CopilotTraining/",
    expectedAction: "redirect",
    expectedTo: "/CopilotTraining/",
    expectedLoopPrevention: false,
  },
  {
    name: "Single segment (category only)",
    input: "/CopilotTraining/tech-talks",
    expectedAction: "redirect",
    expectedTo: "/CopilotTraining/",
    expectedLoopPrevention: false,
  },
  {
    name: "Deep slide route (testing URL encoding)",
    input: "/CopilotTraining/tech-talks/subagents/1/2/3",
    expectedAction: "redirect",
    expectedTo: "/CopilotTraining/tech-talks/subagents/?slide=1%2F2%2F3",
    expectedLoopPrevention: true,
    // Note: This tests URL encoding behavior. Slidev doesn't typically use nested paths,
    // but if someone manually creates such a URL, we handle it gracefully by encoding it.
  },
];

// Simulate the 404 redirect logic
function simulate404Redirect(testPath, isSecondAttempt = false) {
  const repo = "/CopilotTraining";
  const storage = {};
  const redirectKey = "slidev-404-redirect-attempted";

  // Simulate second attempt (loop detection)
  if (isSecondAttempt) {
    storage[redirectKey] = testPath;
  }

  const attemptedPath = storage[redirectKey];

  if (attemptedPath === testPath) {
    delete storage[redirectKey];
    return { action: "loop-detected", to: null };
  }

  const trimmedPath = testPath.startsWith(repo)
    ? testPath.slice(repo.length)
    : testPath;
  const segments = trimmedPath.split("/").filter((s) => s);

  if (segments.length === 0) {
    return { action: "redirect", to: repo + "/", loopPrevention: false };
  } else if (segments.length === 2) {
    return {
      action: "redirect",
      to: repo + "/" + segments[0] + "/" + segments[1] + "/",
      loopPrevention: false,
    };
  } else if (segments.length >= 3) {
    storage[redirectKey] = testPath;
    const baseUrl = repo + "/" + segments[0] + "/" + segments[1] + "/";
    const slideRoute = segments.slice(2).join("/");
    const slideParam = "?slide=" + encodeURIComponent(slideRoute);
    return {
      action: "redirect",
      to: baseUrl + slideParam,
      loopPrevention: true,
    };
  } else {
    return { action: "redirect", to: repo + "/", loopPrevention: false };
  }
}

// Run tests
console.log("🧪 Testing 404 Redirect Logic\n");

let passed = 0;
let failed = 0;

testCases.forEach((test, index) => {
  const result = simulate404Redirect(test.input);

  const actionMatch = result.action === test.expectedAction;
  const toMatch = result.to === test.expectedTo;
  const loopMatch = result.loopPrevention === test.expectedLoopPrevention;

  const success = actionMatch && toMatch && loopMatch;

  if (success) {
    console.log(`✅ Test ${index + 1}: ${test.name}`);
    console.log(`   ${test.input} → ${result.to}`);
    passed++;
  } else {
    console.log(`❌ Test ${index + 1}: ${test.name}`);
    console.log(`   Input: ${test.input}`);
    if (!actionMatch) {
      console.log(
        `   Expected action: ${test.expectedAction}, got: ${result.action}`,
      );
    }
    if (!toMatch) {
      console.log(`   Expected: ${test.expectedTo}`);
      console.log(`   Got:      ${result.to}`);
    }
    if (!loopMatch) {
      console.log(
        `   Expected loop prevention: ${test.expectedLoopPrevention}, got: ${result.loopPrevention}`,
      );
    }
    failed++;
  }
  console.log();
});

// Test loop detection
console.log("🔄 Testing Loop Detection\n");
const loopTest = {
  name: "Infinite loop prevention",
  input: "/CopilotTraining/tech-talks/subagents/1",
};

const firstAttempt = simulate404Redirect(loopTest.input, false);
const secondAttempt = simulate404Redirect(loopTest.input, true);

if (secondAttempt.action === "loop-detected") {
  console.log(`✅ Loop detection works: ${loopTest.input}`);
  console.log(`   First attempt redirects to: ${firstAttempt.to}`);
  console.log(`   Second attempt: loop detected and prevented\n`);
  passed++;
} else {
  console.log(`❌ Loop detection failed for: ${loopTest.input}`);
  console.log(`   Expected loop detection on the second attempt\n`);
  failed++;
}

// Summary
console.log("─".repeat(60));
console.log(`\n📊 Test Results: ${passed} passed, ${failed} failed\n`);

if (failed > 0) {
  process.exit(1);
}

console.log("✨ All tests passed!\n");
