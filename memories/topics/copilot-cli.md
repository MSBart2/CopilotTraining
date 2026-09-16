# topics / copilot-cli

**Topic:** GitHub Copilot CLI

---

## Canonical description

GitHub Copilot CLI (`gh copilot`) is a terminal-native Copilot integration that provides two primary commands: `gh copilot suggest` (generates shell commands from natural language, with `--target` for bash/fish/zsh/powershell) and `gh copilot explain` (explains any command or error). Installed as a `gh` extension (`gh extension install github/gh-copilot`). Copilot in VS Code's integrated terminal extends this with inline suggestions, terminal context passed to chat, and `@terminal` agent in chat. These are related but distinct surfaces.

---

## Coverage map

| Artifact | Depth | Notes |
|---|---|---|
| `slides/tech-talks/copilot-cli.md` | Primary | Dedicated talk — `gh copilot suggest/explain`, shell integration, workflows |
| `slides/tech-talks/copilot-azure-mcp.md` | Major section | Part 1 uses `az` and `gh` CLI as the entry point before introducing MCP; CLI fluency is a prerequisite |
| `slides/tech-talks/vscode-latest.md` | Secondary | Terminal suggestions, terminal context in chat, explain-in-terminal — separate from `gh copilot` |
| `slides/tech-talks/multi-agent-coordination.md` | Mention | CLI and background sessions as operating surfaces for coordinated workstreams |
| `slides/tech-talks/agentic-sdlc.md` | Mention | CLI as part of the agentic developer toolkit in the SDLC section |

---

## Framing notes

- **`copilot-cli`** covers `gh copilot` as the terminal-native workflow — command generation and explanation in the shell, not in VS Code
- **`vscode-latest`** covers terminal Copilot as a VS Code feature — inline suggestions in the integrated terminal, the `@terminal` chat participant, and terminal context injection — **these are different products that share a name space**; avoid conflating them
- **`copilot-azure-mcp`** uses CLI as a *setup prerequisite*, not a teaching subject — it assumes `az` and `gh` proficiency and uses them to motivate why natural-language querying (MCP) is better
- The `--shell` / `--target` flag naming for `gh copilot suggest` has changed across versions; check release notes when updating `copilot-cli`

## Drift risks

- `vscode-latest` updates frequently — the terminal section often changes between VS Code releases; `copilot-cli` and `vscode-latest` use the word "terminal" to mean different things and should not be cross-referenced without clarifying which surface
- `copilot-azure-mcp` Part 1 setup steps include CLI authentication (`az login`, `gh auth login`) — if authentication flow changes, that section needs updating independently of `copilot-cli`
