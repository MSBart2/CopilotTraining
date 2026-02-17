# CopilotTraining Slide Decks

Beautiful presentation slides for workshop modules, tech talks, and executive briefings.

> **🌐 View Online**: [https://msbart2.github.io/CopilotTraining/](https://msbart2.github.io/CopilotTraining/)
>
> All slides are automatically built and deployed via GitHub Actions on every commit.

---

## ✨ Creating Slides is Easy

Use the **Slide Generator** agent to create slides:

```
@slide-generator workshop/03-custom-prompts
@slide-generator tech-talks/copilot-cli
@slide-generator exec-talks/agentic-delivery
```

**What it does:**
- ✅ Extracts content from the module README
- ✅ Generates beautiful, branded slides
- ✅ Updates the slides index
- ✅ Reports completion with slide count and path

---

## 👀 Viewing Slides

Preview slides locally:

```bash
cd slides
npx slidev workshop/00-orientation.md
```

Opens at `http://localhost:3030` with hot reload.

**Navigation:**
- `Space` / `→` = Next slide
- `←` = Previous slide
- `P` = Presenter mode
- `O` = Overview
- `F` = Fullscreen

---

## 📁 What's Available

### Workshop Modules

| Module | Topic |
|--------|-------|
| `00-orientation.md` | Training overview, personas, principles |
| `01-instructions.md` | Repository instructions |
| `02-agent-plan-mode.md` | Agent plan mode thinking |
| `03-custom-prompts.md` | Custom prompt engineering |
| `04-agent-skills.md` | Domain-specific Agent Skills |
| `05-mcp-servers.md` | Model Context Protocol servers |
| `06-custom-agents.md` | Building custom agents |

### Tech Talks

Agent orchestration, CI/CD workflows, memory systems, CLI tools, and more.

### Executive Talks

Agentic delivery, economics, and labor implications.

---

## 🚀 Deploying Slides

**Automatic deployment:** All slides are automatically built and deployed to GitHub Pages via GitHub Actions on every commit to `main`. No manual deployment needed!

**Manual build** (for local testing):

```bash
cd scripts
./build-all.sh              # Linux/Mac
build-all.ps1               # Windows/PowerShell
```

Outputs to `dist/` folder for GitHub Pages or any static host.

---

## 📚 Quick Reference

**Create slides:**
```
@slide-generator workshop/03-custom-prompts
```

**View locally:**
```bash
npx slidev workshop/03-custom-prompts.md
```

**Update slides when content changes:**
```
1. Edit the module README
2. @slide-generator workshop/module-name
3. Preview and commit both files together
```

---

## 🤝 Contributing

**Workflow:**
1. Update module README with new content
2. Run `@slide-generator workshop/module-name` to regenerate slides
3. Preview locally with `npx slidev`
4. Commit README and slides together

---

## Resources

- [Slidev Documentation](https://sli.dev/) — For advanced customization
- [DEPLOYMENT.md](./DEPLOYMENT.md) — GitHub Pages setup
- [Main Workshop README](../README.md) — For questions

---

**License:** Same as main CopilotTraining repository
