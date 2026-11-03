---
status: active
updated: 2026-11-03
---

# Rehearsal: Copilot CLI — Intelligence Within Reach

**Source talk:** [Intelligence Within Reach](../README.md)\
**Question:** How do I get AI help right where I’m working?\
**Thesis:** Bring intelligence to the work, and keep the worker within reach.

These are **proposed checks**, not recorded results. Use a disposable repository,
synthetic logs, and an authorized staging environment. The optional
[FanHub repository](https://github.com/MSBart2/FanHub) remains a candidate for the
Node.js track; inspect its current files and test commands before rehearsal.
Do not assume historical bugs still exist.

## Follow the Four Distances

The approved November 3 deck has 36 slides: 40:00 estimated delivery and 5:00
questions in a 45-minute slot. Product verification remains dated November 2.
This is a practitioner answer to why CLI is useful, not a historical origin
claim or a comparison that ranks other surfaces.

Rehearse in this learning order; the numbered checks below remain stable links:

1. **Worker ↔ Work** — use check 1 to keep the Docker request, tool outputs,
   and next HTTP probe in one loop. Preserve `5001:5000`; observe the response
   before calling anything fixed.
2. **Intelligence ↔ Data** — start Copilot on authorized staging after SSH,
   then inspect the selected provider in check 3. Use the synthetic log proof
   below; compare host-only evidence with deliberate cloud placement.
3. **Workflow ↔ Running System** — use check 2 for failure-gated `copilot -p`,
   then check 6 for workflow concept → natural-language creation, review and
   registration → shell invocation and report. Check 4 bounds those actions.
4. **Now ↔ Later** — use the PR handoff in check 5, reuse the reviewed procedure
   from check 6, inspect active-session schedules, then checks 7–9 for retained
   context, recovery, original-host steering, and distinct cloud continuation.
   `/fleet` remains optional depth, not a cross-host orchestrator.

Every rehearsal records what is separated, the CLI action that brings it
closer, and the observable artifact that improves the next decision.

### Synthetic on-host log investigation

The slide shows a day of auth logs that stays on its host while Copilot
questions it with host tools and returns a short cited finding. Rehearse it on
an authorized disposable Unix host with a synthetic corpus that plants one
pattern: one service account failing from one documentation-range /24
(`203.0.113.0/24`) that is absent from yesterday's log.

```bash
N=20000   # raise toward the slide's illustrative scale if you like
awk -v n="$N" 'BEGIN {
  for (i = 0; i < n; i++) printf "2026-11-02T%02d:%02d:%02dZ sshd auth=ok user=app%d src=198.51.100.%d\n", i % 24, i % 60, i % 60, i % 40, 1 + i % 200
  for (i = 0; i < 412; i++) printf "2026-11-02T09:%02d:%02dZ sshd auth=fail user=svc-deploy src=203.0.113.%d\n", 40 + i % 20, i % 60, 1 + i % 250
  for (i = 0; i < 9; i++) printf "2026-11-02T08:%02d:00Z sshd auth=fail user=ci-runner src=198.51.100.%d\n", i, 10 + i
  for (i = 0; i < 7; i++) printf "2026-11-02T07:%02d:00Z sshd auth=fail user=backup src=192.0.2.%d\n", i, 20 + i
  for (i = 0; i < 2; i++) printf "2026-11-02T06:%02d:00Z sshd auth=fail user=app%d src=198.51.100.%d\n", i, i, 30 + i
}' > auth.log
awk -v n="$N" 'BEGIN {
  for (i = 0; i < n; i++) printf "2026-11-01T%02d:%02d:%02dZ sshd auth=ok user=app%d src=198.51.100.%d\n", i % 24, i % 60, i % 60, i % 40, 1 + i % 200
  for (i = 0; i < 8; i++) printf "2026-11-01T08:%02d:00Z sshd auth=fail user=ci-runner src=198.51.100.%d\n", i, 10 + i
}' > auth.log.1
```

Start `copilot` in that directory and ask, read-only: *"Investigate failed
authentications in auth.log. Cite counts I can rerun."* Inspect each requested
command before permitting it. The slide's representative path, verified
against this generator, is:

```bash
grep auth=fail auth.log | grep -o 'user=\S*' | sort | uniq -c | sort -rn | head -2
#   412 user=svc-deploy
#     9 user=ci-runner
grep 'fail user=svc-deploy' auth.log | grep -oE 'src=([0-9]+\.){2}[0-9]+' | sort | uniq -c
#   412 src=203.0.113
grep -c 'src=203\.0\.113\.' auth.log.1
# 0
```

Copilot may take a different path. Follow its actual commands and compare its
finding with the planted pattern (412 of 430 failures, one account, one new
/24). The finding establishes a lead, not a cause or a response: hand the next
decision to the account owner, and do not block clients or rotate credentials
from this session.

Host tools read the corpus; only command outputs and prompts reach the selected
inference provider. That is less data movement, not zero exposure. The slide
is an illustrative run, not a recorded Copilot result.

## Preflight

1. Install the current **standalone Copilot CLI** using the
   [official installation guide](https://docs.github.com/en/copilot/how-tos/set-up/install-copilot-cli).
   The retired `gh-copilot` extension is a different product.
2. Authenticate using the installed CLI's documented flow; inspect `copilot --version`.
   The November 2 source review uses **stable v1.0.105**; prereleases are separate.
3. Confirm repository and organization access. Inspect `/permissions show`.
   Keep least privilege and a named acceptance owner.
4. Inspect the host, OS sandbox prerequisites, network policy, and permitted data.
   Fresh managed policy can fail startup closed. Restore policy access or update
   the client rather than bypassing governance.
5. Before any cloud run, confirm paid-plan and organization access, supported
   clients, and current billing. Cloud-sandbox billing begins in November per
   the announcement; this walkthrough invents no rates.

For each check, record the request, actual action or decision, source artifact,
acceptance check, and recovery path. Mark a result verified only after observing it.

## 1. Plan an Evidence-First Diagnosis

Start `copilot` in a safe project and use **Shift+Tab** for Plan Mode after
checking the current shortcut.

```text
Diagnose why the backend container will not start.
Start with logs. Inspect compose configuration if the evidence points there.
Propose a plan; do not edit files yet.
```

Inspect the questions and proposed commands. Approve only the intended scope.
Read actual startup logs and listener state, then interpret the port mapping.
`5001:5000` validly forwards host port 5001 to container port 5000; it does not
prove a startup fault. If a client uses host port 5000, test the configured port
5001. If the process never starts, investigate the actual startup error.

**Proof:** Actual logs, listener/configuration comparison, and the repository's
documented health check.\
**Recovery:** Revise the hypothesis when the next check disagrees. No first-attempt
success or elapsed-time improvement is promised.

With FanHub, first reproduce a current issue and inspect the current test suite.
Ask Copilot to trace evidence before suggesting a fix; historical duplicate
character and filter bugs are not guaranteed fixtures.

## 2. Produce a CI Report with a Separate Acceptance Check

Prepare a redacted `failure.log` and the tools permitted to read it. In an
authenticated, appropriately scoped runner:

```bash
copilot -p "Summarize failure.log. Cite evidence and uncertainty. Do not edit."
```

Capture the response as a protected `failure-analysis.txt` artifact using the
runner's shell conventions. Retain the **original** test log and exit status.
This is a command pattern, not a complete tested Actions workflow.

Slide 14 places the command inside GitHub Actions: a Bash test step captures
`failure.log` with `tee` and `pipefail`; an explanation step gated on that test's
failure passes the log to `copilot -p`, writes `why.md`, and appends the explanation
to `$GITHUB_STEP_SUMMARY`. The runner needs an installed, authenticated CLI before
this excerpt runs. Bound and redact log context, use trusted runs, and confirm
that everyone who can view the job may see the summary. The failed test stays
failed even when Copilot successfully explains it.

**Proof:** The maintainer compares cited lines and proposed causes with the log
and a reproduction test. Analysis-command success and test status are separate.\
**Boundary:** Non-interactive requests still needing human permission are denied.
Pre-grant only necessary tools. PR commenting requires separate write authority;
do not automatically publish potentially sensitive output.

## 3. Inspect One Local Model Placement

Prepare an already-installed Ollama runtime and model that supports **tool calling
and streaming**. Keep the model choice current rather than pinning an old catalog.

```text
/model
```

Inspect discovery status, provider, and endpoint. Add the prepared local model,
optionally switch the current session, and ask for a summary of a synthetic file.
Compare the answer with the file.

**Proof:** Selected provider and endpoint plus a checked answer.\
**Boundary:** Discovery installs neither runtime nor model and automatically
discovers only local-machine Ollama. Remote Ollama needs provider configuration.
Local selection does not enable offline mode or disable telemetry.
`COPILOT_OFFLINE=true` does not stop context reaching a configured remote provider.
Future intelligent local routing is not taught as shipped.

## 4. Inspect Permission Decisions and Local Containment

On a disposable supported host:

```text
/permissions show
/permissions assisted
/sandbox enable
/sandbox status
/sandbox policy
```

Select assisted mode only when organization policy permits. Observe an eligible
unresolved request and an explicitly denied or escalated request. Record actual
decisions separately from the demonstration's verification status.

**Decision makers:** Manual leaves unresolved requests to the human; assisted
uses a review model for eligible requests; allow-all broadly preauthorizes within
enforced controls. Deny rules and enterprise restrictions remain effective.
Eligible enterprise ask rules may be model-approved. Assisted permissions do not
review sandbox-bypass requests. A review model can approve dangerous actions.

Compare harmless in-scope and out-of-scope test operations under the active sandbox
policy. **Local sandboxing is GA**; no experimental-startup prerequisite applies.
It is off by default unless managed policy requires it. MXC supplies OS restrictions,
not a separate VM or container. Built-in in-process file tools check policy best-effort.
Windows needs a suitable supported Windows 11 build; its proxy/host rules do not
provide the same direct-connection protection as macOS and Linux.

**Proof:** Actual policy, platform, tool request, and allowed/denied operation.\
**Recovery:** If behavior differs, stop and inspect policy and platform support.
OS sandboxing does not establish model execution location.

## 5. Choose Parallel Work or a Reviewed-PR Handoff

After reviewing a plan with independent subtasks:

```text
/fleet Implement the independent tests in this approved plan.
```

Inspect decomposition, dependencies, running tasks, combined diff, and tests.
`/fleet` operates inside one plan and execution context. Separate context windows
do not imply separate authorized remote hosts. Parallel model use can increase usage.

For a separate repository task whose acceptance object is a PR:

```text
& Audit API input validation in the approved scope; open a draft PR with findings.
```

Inspect local worktree state before handing off. Confirm current task access and
billing. The maintainer reviews the result; no completion time or notification
route is guaranteed. This differs from continuing an interactive cloud session.

## 6. Keep a Staging Investigation Ready to Repeat

### Dynamic workflow — public preview

#### The short version: create, review, run

A dynamic workflow is a program in a Copilot extension. Code repeats the steps;
agents interpret the evidence. It is not GitHub Actions YAML or simply a saved
prompt.

1. Start `copilot --experimental` in an authorized environment.
2. Describe the workflow to Copilot: collect service state and the last 30 log
   entries, ask agents about process health and dependency failures, and return
   findings with sources and uncertainty. Name it `staging-investigation`, ask
   for a project extension, read-only collection, synthetic evidence first, and
   a bounded AI credit limit.
3. Review the generated code, commands, permissions, inputs, and numeric budget.
   Creating the extension does not execute its workflow.
4. Confirm it persists outside the authoring session. In a fresh session ask
   `What dynamic workflows are available?`
5. After registration, invoke the workflow with its actual inputs and pregranted
   agent permissions:

   ```bash
   copilot --experimental workflow run staging-investigation \
     --result-file staging-report.json
   ```

   This short command assumes the authored workflow has suitable defaults.
   Supply required inputs with `--args` when its contract requires them. It
   does not connect to staging automatically. Run it where collection belongs.

Inspect the returned evidence before accepting a diagnosis. For a single log
summary, `copilot -p` is simpler. A recurring investigation with fixed collection,
several reasoning steps, and a consistent report is a useful workflow candidate.
The slides' readable report is a synthetic illustration, not a literal API result
or a recorded live run.

The remaining sections provide optional implementation depth. The repository's
JavaScript fixture core is not itself a registered Copilot extension.

After the earlier SSH investigation, keep its useful procedure: gather service
state and logs, analyze independent hypotheses, and return evidence-linked findings.
Code fixes collection, ordering, parallelism, and report assembly; agent judgment
can vary with the evidence. Run the CLI **on the already-authorized staging host**.
The workflow command neither connects to other hosts nor deploys across them.

These are **Copilot extension dynamic workflows**, distinct from GitHub Agentic
Workflows and Actions YAML. `/fleet` lets Copilot decompose a task; `copilot -p`
submits one prompt. Here a reusable program defines when to collect, reason, and
assemble the result.

#### Run the local fixture now

From the repository root, with Node.js 20 or later:

```bash
node --check tech-talks/copilot-cli/examples/staging-investigation.mjs
node tech-talks/copilot-cli/examples/staging-investigation.mjs --fixture
```

The [executable core](staging-investigation.mjs) needs no packages. The fixture
runner uses synthetic service state and logs plus **stub agents**. It prints a JSON
report on stdout and verification status on stderr. Assertions cover report
assembly, unknown-source-ID rejection, and agent-failure propagation.

Inspect `logs:3` beside the upstream finding. `human-review-required` is the report's
decision, not a test-runner status or permission approval. No live Copilot workflow,
host command, or agent diagnosis is exercised by this fixture.

#### Author and audit the preview extension adapter

**Setup still required:** This artifact is an executable JavaScript core, not a
registered Copilot extension. The public
[usage guide](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/use-dynamic-workflows)
documents invocation and registration locations but directs authors to built-in
guidance for the exact extension API. That guidance ships with the CLI (v1.0.105:
`defineWorkflow` and `joinSession` from `@github/copilot-sdk/extension`).
[extension.mjs](extension.mjs) shows the shape the deck uses; it is illustrative
and stub-tested, not a recorded Copilot run.

1. In a disposable, trusted repository with authenticated Copilot CLI and preview
   access, start `copilot --experimental`. Ask:

   ```text
   Show me the guidance for writing dynamic workflows.
   ```

2. Put a copy of `staging-investigation.mjs` beside the extension being authored.
   Request the adapter using the installed guidance:

   ```text
   Create a project-extension dynamic workflow named staging-investigation.
   Use the installed dynamic-workflow authoring guidance for the exact API.
   Import investigate from the adjacent staging-investigation.mjs.
   Accept one JSON input, fixture, default true; require a boolean.
   Implement analyze(request) with the documented workflow agent API.
   Give each agent only request.instruction, request.hypothesis, and
   request.evidence. No tools, shell commands, or remediation by agents.
   Require a structured result with hypothesis, finding, evidenceIds,
   and uncertainty. Pass it back to investigate for validation.
   Return await investigate(analyze, fixture) as the workflow result.
   Keep the two independent analyses parallel; stop if collection or analysis fails.
   Do not run live host collection during authoring.
   ```

3. Audit the adapter against the installed guidance. Verify registration name,
   boolean validation, default fixture behavior, result return, two-agent scope,
   limits, and tool restrictions. Extension JavaScript can execute host code;
   agent tool grants do not sandbox the extension itself. Never trust generated
   extension code solely because it registers.
4. Make the extension available outside its authoring session. The docs describe
   copying its directory containing `extension.mjs` into
   `.github/extensions/staging-investigation/` for the project, or
   `~/.copilot/extensions/staging-investigation/` personally. Keep the core beside
   the adapter and verify its relative import. Start a new experimental session
   and ask `What dynamic workflows are available?` Confirm the exact name.
   Copying the definition does not copy saved runs or progress.
5. Review the workflow's limits before running. Set an appropriate credit budget
   using the installed authoring/run guidance; no unverified limit API is supplied
   here. Grant any narrowly required agent tools or URLs **before** the command:
   `copilot workflow run` never displays permission prompts. This adapter design
   needs no agent tools; investigate and audit any request for additional access.

#### Invoke the registered extension and inspect a report

**Only after registration**, from this examples directory (Bash syntax):

```bash
copilot --experimental workflow run staging-investigation \
  --args @staging-input.json \
  --result-file staging-report.json
```

The supplied [input file](staging-input.json) sets `fixture: true`: the registered
adapter can ask real agents to analyze synthetic evidence. That differs from the
local fixture runner's deterministic stubs. The slide's excerpt is from the
**stub report**, not a recorded preview run. Use a fresh result filename for each
rehearsal and record actual status and run ID separately.

`--result-file` saves only the returned JSON value on successful completion with a
result. Progress and run metadata are separate. A failed, interrupted, or paused
run leaves an existing result file unchanged: an old report is not evidence that
the latest run succeeded. The documented `--silent --output-format json` mode
provides a run record with workflow name, run ID, status, and any returned result.

For project extension loading in an untrusted script working directory, the docs
offer `GITHUB_COPILOT_PROMPT_MODE_EXTENSIONS=true`. This authorizes repository code
to run; use it only after review, never as a blanket preflight bypass.

**Live-host prerequisites:** Linux systemd, access to `orders.service` state and
journal, authenticated preview runtime, provider/data approval, and an audited
adapter. `collect(false)` runs fixed read-only `systemctl show` and `journalctl`
commands with time/output bounds. It does **not** redact automatically. Inspect
the proposed data and implement approved redaction before sending real logs to
agents. Review current permissions and containment on that host. Fixture success
does not verify any of these live requirements.

**Proof:** Inspect the report's evidence, source IDs, findings, and uncertainty.
Independently check the upstream lead before accepting a cause. No restart,
deployment, or remediation authority is included.

**Recovery:** Failed collection calls for authorized host/access diagnosis.
Malformed findings or unsupported claims call for an adapter/request correction,
then a new checked run. `/workflows` shows resumable paused or limit-stopped runs;
saved steps can be reused, unsaved work can rerun, canceled runs cannot resume.
An optional checkpoint can support review; this core does not implement one.
Neither reuse nor checkpoints imply an unattended durable scheduler.

### Scheduled prompt — experimental, session-only

```text
/every 30min Summarize approved service health; do not change it.
```

Use an experimental session. Inspect the resulting schedule with bare `/every`
or `/after` and delete unwanted runs. Current docs also support self-paced `/every`
with model-selected cadence, `/loop` as an alias, user-invocable skills, and a broader
subset of schedulable work commands; inspect current syntax rather than assuming
only one slash-command exception.

**Boundary:** Execution requires an active interactive session. Fixed-interval
bounds are documented as 10 seconds through one day. Resumption restores schedules;
an overdue `/after` can fire immediately. Use an approved external scheduler for
work that must execute without the interactive session. Reporting does not authorize
remediation.

## 7. Check Context and Recover a Wrong Turn

Inspect `/context`; restate scope, source paths, and acceptance evidence before
`/compact`. Ask Copilot to restate the next plan afterward. Correct lost constraints
before acting. `/chronicle improve` can propose repository instruction edits; review
the `.github/copilot-instructions.md` diff before applying it.

Use `/rewind` or `/undo` for a wrong turn. Conversation only leaves files in place;
Conversation + files restores tracked Copilot edits and skips developer-authored edits.
Inspect the resulting tree. Experimental `/worktree` is a separate exploration and
requires Git. Git remains an additional safety net.

## 8. Prove Original-Host Remote Steering

On an authorized staging host:

```text
copilot
/permissions show
/remote on
/remote
```

Use the offered control UI from browser or mobile with the **same signed-in account**.
Ask for an evidence-only action. Inspect its actual execution on the original host.
Then run `/remote off` and inspect status again.

**Proof:** Same session, same original host, retained task boundary, actual source
output. The host and session must remain running. View-only sync is distinct from
steerable access. Current on/off/status documentation does not establish that the
older `--remote` syntax was removed.

For host-local forensics, use synthetic logs and a known aggregate. Ask for counts
over an approved time window; compare with source output. No automatic blocking,
deletion, or configuration change. Bulk logs need not be copied to the phone,
but prompts, context, and results still cross service boundaries. The talk's old
12 GB corpus is illustrative, not an observed benchmark.

## 9. Prove Connected Cloud Continuity Separately

Connected cloud sessions and cloud sandboxes are GA. Ordinary CLI execution
remains local by default. Start a deliberate cloud session:

```bash
copilot --cloud
```

1. Select the prepared repository and environment using the current UI. Record
   session and cloud-environment identity.
2. Request a small low-risk change. Inspect the actual file diff and relevant test.
   Retain a failed test as a failed test.
3. Open the **same connected session** from another supported client using the
   current handoff UI. Verify files and in-progress work.

**Proof:** Same session identity, changed file, test evidence, and continuation.
Snapshots preserve cloud files and in-progress work; this does not migrate a
staging-host process or expose its live evidence.

**Boundary:** `--cloud` is interactive and cannot combine with `-p` or `-i`.
Cloud versus Actions is selected at start; switching environment requires a new
session. Actions-only setup steps and runner requirements still need Actions.
Confirm exact handoff UI, client support, organization access, and current November
billing before rehearsal. If continuity fails, stop and inspect access rather than
substituting an unrelated session.

## Transfer to Your Work

What is separated? What brings it closer? What observable result improves?
Choose one task, evidence artifact, permission decision maker, acceptance owner,
and stop signal. Record actual results before claiming a benefit.

## References

Use the [landing reference inventory](../README.md) and
[claim-specific native notes](../../../slides/tech-talks/copilot-cli/notes.html).
They distinguish GA, preview, experimental scope, and the dated stable baseline.
