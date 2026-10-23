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
@slide-generator tech-talks/exec-strategy
```

For tech talks, use the **Tech Talk Slide Generator** instead:

```
@tech-talk-slide-generator tech-talks/copilot-cli
@tech-talk-slide-generator tech-talks/copilot-on-github
```

**What it does:**
- ✅ Extracts content from the module README
- ✅ Generates beautiful, branded slides
- ✅ Updates the slides index
- ✅ Reports completion with slide count and path

For tech talks, the source `tech-talks/{topic}/README.md` stays the reader-first deep dive. The slide generator adapts it into a presentation deck and works without visible slide-planning sections inside the README.

For fast iteration on a single tech talk, edit `tech-talks/{topic}/deck.recipe.yml` and then rerun the slide generator for that one topic. The recipe is the per-talk slide adaptation artifact; the README remains the source of content.

---

## 👀 Viewing Slides

Preview slides locally:

```bash
cd slides
npm run dev workshop/00-orientation.md
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
| `03-04-combined.md` | Custom prompts and Agent Skills |
| `05-mcp-servers.md` | Model Context Protocol servers |
| `06-custom-agents.md` | Building custom agents |
| `fanhub-unplugged.md` | Capstone: FanHub end to end |

### Tech Talks

Practitioner deep dives grouped by where the agent runs: Foundations, Agents at Your Keyboard, Agents on GitHub, Trust and Govern, and Extend and Embed. See [tech-talks/DECISION-GUIDE.md](../tech-talks/DECISION-GUIDE.md) to choose one.

### Executive Talks

The Agentic Operating Model: the decisions, owners, and success signals for leaders adopting agentic delivery.

---

## 🚀 Deploying Slides

**Automatic deployment:** All slides are automatically built and deployed to GitHub Pages via GitHub Actions on every commit to `main`. No manual deployment needed!

**Manual build** (for local testing):

```powershell
cd slides
.\build.ps1                 # all categories
.\build.ps1 Tech-talks      # single category
npm run build -- tech-talks/copilot-cli.md   # single deck
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
npm run dev workshop/03-custom-prompts.md
```

**Update slides when content changes:**
```
1. Edit the module README
2. @slide-generator workshop/module-name
3. Preview and commit both files together
```

**Update one tech-talk deck without redesigning the README:**
```
1. Edit tech-talks/topic-name/deck.recipe.yml
2. @slide-generator tech-talks/topic-name
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
