// Illustrative only: the kind of extension.mjs Copilot can generate from the
// slide's authoring request. API shape from the dynamic-workflow guidance
// bundled with Copilot CLI v1.0.105 (experimental; subject to change).
// Project location: .github/extensions/staging-investigation/extension.mjs
//
// Review before trusting it: extension code runs host commands directly,
// outside agent tool permissions. Collection here is read-only.
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { defineWorkflow, joinSession } from "@github/copilot-sdk/extension";

const sh = async (...args) => (await promisify(execFile)(...args)).stdout;

const investigate = defineWorkflow({
  meta: {
    name: "staging-investigation",
    description: "Read-only investigation of orders.service. No args.",
    phases: [{ title: "Collect" }, { title: "Analyze" }],
    limits: { maxAiCredits: 5 }, // the ceiling you confirmed with Copilot
  },
  run: async (ctx) => {
    ctx.phase("Collect");
    const evidence = await ctx.step("collect-v1", async () => ({
      state: await sh("systemctl", ["show", "orders.service", "-p", "ActiveState"]),
      logs: await sh("journalctl", ["-u", "orders.service", "-n", "30", "--no-pager"]),
    }));

    ctx.phase("Analyze");
    const findings = await ctx.parallel(["process health", "dependency failures"].map(
      (focus) => () => ctx.agent(
        `Examine ${focus}. Cite log lines; state uncertainty.\n${JSON.stringify(evidence)}`,
        { label: focus })));

    return { evidence, findings, decision: "human review required" };
  },
});

await joinSession({ workflows: [investigate] });
