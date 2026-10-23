# Demo: GitHub Copilot CLI — AI at the Point of Work

**Source talk:** [GitHub Copilot CLI: AI at the Point of Work](../README.md)
**Core question:** How do I bring AI to where the work actually is — and keep steering it from wherever I am?
**Target repo:** [github.com/MSBart2/FanHub](https://github.com/MSBart2/FanHub) (Node.js track)

---

## Prerequisites

- Copilot CLI installed and authenticated (`gh auth login` + `gh extension install github/gh-copilot`)
- FanHub cloned locally or open in a Codespace — Node.js track
- Confirm it works: `copilot --version`

---

## Exercise 1: Use Plan Mode to Debug a Real FanHub Bug

FanHub ships a known bug: the characters list contains a duplicate entry (Jesse Pinkman appears twice). If you jump straight into fixing it, you'll likely patch the wrong layer — API? seed data? display filter?

**Plan Mode (Shift+Tab)** makes Copilot ask clarifying questions before writing a single line.

```bash
cd fanhub/node
copilot
```

At the prompt, press **Shift+Tab** to enter Plan Mode, then type:

```
The characters list has a duplicate — Jesse Pinkman appears twice. Fix it.
```

Copilot will ask before acting:
- *"Do you want me to trace this from the seed file, the API response, or the frontend filter?"*
- *"Do you want me to also add a uniqueness constraint so this can't happen again?"*

Answer the questions. When a plan appears, review it — then approve to let Copilot implement.

**What to notice:** Without Plan Mode, Copilot picks one interpretation and runs with it. With Plan Mode, it surfaces the same questions a senior engineer would ask. The fix lands correctly on the first attempt instead of the third.

---

## Exercise 2: Programmatic Mode for CI Triage

FanHub's CI sometimes fails on a flaky integration test. In a real pipeline, you want a non-interactive `copilot -p` call that analyzes the failure and posts a summary — no human sitting at a prompt.

```bash
# Capture a test run output and pipe it for analysis
npm test 2>&1 | copilot -p "This is the test output from FanHub CI. Identify the failing test, explain the root cause, and suggest a fix."
```

The `-p` flag runs Copilot in **programmatic mode** — one prompt in, one structured response out, no interactive session. This is designed for GitHub Actions and scripts.

A minimal Actions step using this pattern:

```yaml
# .github/workflows/triage.yml
- name: Triage test failure
  if: failure()
  run: |
    npm test 2>&1 | copilot -p "Summarize the test failure and suggest a fix" >> $GITHUB_STEP_SUMMARY
```

**What to notice:** The `-p` flag is how Copilot leaves the IDE and enters CI/CD. Same model, headless execution, scriptable output.

---

## Exercise 3: `/fleet` Fan-Out — Fix Multiple Bugs in Parallel

FanHub has several known issues documented in `BUGS.md` (duplicate characters, broken genre filter, missing pagination). Use `/fleet` to tackle them in parallel rather than sequentially.

```bash
copilot
```

```
Read BUGS.md and list all open bugs.
```

Once you have the list:

```
/fleet Fix each of these bugs as parallel subtasks: [paste the list]
```

Copilot decomposes the work — each bug gets its own isolated subagent context window. Results are merged back into the coordinating session.

**What to notice:** `/fleet` is explicit fan-out. You're not asking Copilot to do everything sequentially in one context window (which degrades quality as it fills). You're decomposing the work into parallel agents and collecting results. The decomposition is the skill.

---

## Exercise 4: Remote Session — Steer from Any Device

The remote session capability puts the Copilot session on the machine where the problem lives. You steer from wherever you are.

Start a remote session in your Codespace (or any machine):

```bash
copilot --remote
```

Copilot will print a URL and QR code:
```
Remote session started.
Steer this session from: https://github.com/copilot/sessions/abc123
```

Open that URL in a browser (or scan the QR code from your phone). You now have a steering interface for a Copilot session running on the target machine.

From the browser, send:
```
Run the FanHub test suite and tell me which tests are failing.
```

**What to notice:** The session lives on the machine — access to its file system, environment variables, running processes. You steer from anywhere. This is "AI meets the problem where it lives" made concrete.

---

## Exercise 5: Cloud Delegation — Delegate and Free Your Terminal

Some tasks are too long to sit and watch. Use the `&` prefix to hand off work to GitHub's coding agent in the cloud. Your terminal stays free.

```bash
copilot
```

```
& Audit FanHub for all missing input validation in the API route handlers. Open a draft PR with findings.
```

The `&` prefix delegates the task to a background cloud agent. Copilot confirms the handoff and your terminal is immediately available for other work. You get a draft PR when the agent finishes.

**What to notice:** This is the flip side of remote sessions. Remote = AI goes to the machine. Cloud delegation = work goes to the cloud. Both free you from "sitting at the terminal."

---

## Key Takeaways

| Pattern | Command | When to use |
|---------|---------|-------------|
| Plan before building | `Shift+Tab` in interactive mode | Ambiguous problems, greenfield work |
| Headless / CI use | `copilot -p "..."` | GitHub Actions, scripts, pipelines |
| Parallel subtasks | `/fleet <decomposition>` | Multiple independent tasks |
| Remote troubleshooting | `copilot --remote` | Staging, prod, machines you're not sitting at |
| Background work | `& <task>` in interactive mode | Long-running audits, large refactors |

**The through-line:** AI stops being editor-bound. The session follows the work.

## References

- [About GitHub Copilot CLI](https://docs.github.com/en/copilot/concepts/agents/copilot-cli/about-copilot-cli)
- [Use Copilot CLI](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/use-copilot-cli)
- [Running tasks in parallel with /fleet](https://docs.github.com/en/copilot/concepts/agents/copilot-cli/fleet)
- [Steer a session remotely](https://docs.github.com/en/copilot/how-tos/copilot-cli/steer-remotely)
