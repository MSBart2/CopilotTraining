# The FanHub Story

> A template for story-driven technical workshops. This document captures the narrative framework that makes learning engaging and memorable.

---

## 📖 Story Overview

### The Premise

**When**: Monday morning, 9:00 AM  
**Where**: TechCorp, a mid-sized software company  
**Duration**: One intense workday (8-10 hours, self-paced)  
**Stakes**: Prove that AI-assisted development delivers real value—or admit it's just hype

### The Inciting Incident

A contractor abandoned a half-built TV show fan site. The code works, barely. The team has until end of day to transform it into a production-ready application using GitHub Copilot.

**The challenge is deliberately messy:**
- Generic database schema ("shows", "characters", "episodes")
- Inconsistent API endpoints (some REST-ish, some not)
- Mixed frontend patterns (class components, functional, various styling approaches)
- Zero documentation, no tests, no standards
- Placeholder content everywhere
- Actual bugs in starter code (Episodes.js cache doesn't include seasonId, data dupe for 'Jesse Pinkman')

**Why this setup works:**
- Reflects real-world inherited codebases
- Creates immediate friction with AI tools (no context = bad suggestions)
- Makes the transformation visible and satisfying
- Allows personalization (learners pick their favorite TV show)

---

## 🏢 The Setting: TechCorp

### Company Profile

**TechCorp** is a fictional mid-sized software company that represents the typical enterprise environment where most developers work.

| Attribute | Details |
|-----------|---------|
| **Size** | ~200 employees, 40 developers |
| **Industry** | B2B SaaS (generic enough to be relatable) |
| **Tech Stack** | Modern but pragmatic (Node.js, React, PostgreSQL) |
| **Culture** | Collaborative but deadline-driven |
| **AI Adoption** | Early stages—some enthusiasm, some skepticism |

### Why TechCorp Works as a Setting

1. **Relatable scale** — Not a startup chaos, not enterprise bureaucracy
2. **Mixed experience levels** — Room for junior and senior perspectives
3. **Real constraints** — Deadlines, legacy code, competing priorities
4. **Growth potential** — Characters can evolve without breaking believability

---

## 👥 The Cast

### Core Principle: Diverse Archetypes, Universal Experiences

Each character represents a real archetype that learners recognize—either in themselves or their colleagues. The key is balancing:

- **Technical credibility** — They must feel like real developers
- **Emotional authenticity** — Their hopes and fears must resonate
- **Growth potential** — Each character transforms through the story

### Character Summary

| Character | Experience | Role | Starting State | Ending State |
|-----------|-----------|------|----------------|--------------|
| **Sarah** | 15 years | Sprint Lead | Skeptical challenger | Convinced advocate |
| **David** | 20 years | Architect | Worried about relevance | Empowered expert |
| **Marcus** | 5 years | DevOps Developer | Infrastructure-only | Full-stack + automation confident |
| **Jessica** | 1 year | Junior Dev | Intimidated learner | Empowered contributor |
| **Elena** | 8 years | QA Lead | Quality skeptic | AI-assisted QA champion |
| **Rafael** | 10 years | Product Manager | Requirements writer | Execution enabler |


## 📅 The Timeline

### Story Structure: One Intense Day

The single-day constraint creates urgency and focus. Each module represents roughly one hour of story time (though learners may spend more or less real time).

| Time | Module | Story Beat | Emotional Arc |
|------|--------|-----------|---------------|
| 9:00 AM | 0: Orientation | Challenge issued | Anxiety, skepticism |
| 10:00 AM | 1: Repository Instructions | First breakthrough | Hope emerges |
| 10:30 AM | 2: Agent Plan Mode | Systematic thinking | Confidence builds |
| 12:00 PM | 3: Custom Prompts | Expertise capture | Team alignment |
| 1:30 PM | 4: Custom Instructions | Context automation | Flow state |
| 3:00 PM | 5: Agent Skills | Domain mastery | Building anticipation |
| 4:00 PM | 6: MCP Servers | External connections | Growing excitement |
| 5:00 PM | 7: Custom Agents | **THE PAYOFF** — Agent builds with full context | Triumph |
| 5:30 PM | 8: Copilot Web | Workflow integration | Team sync |
| 6:00 PM | 9: Copilot CLI | Terminal automation | Power |
| 7:00 PM | 10: Agentic SDLC | Ship and reflect | Transformation |

### Pacing Principles

1. **Start with struggle** — Module 0 must establish the "before" state
2. **Early wins** — Module 1-2 deliver visible improvement quickly
3. **Build complexity gradually** — Each module adds one new concept
4. **Compound benefits** — Later modules show how features work together
5. **End with reflection** — Final module celebrates transformation

---

## 🎭 The Project: FanHub

### Why a TV Show Fan Site?

The project choice matters. FanHub works because:

1. **Universal appeal** — Everyone has favorite shows
2. **Personalizable** — Learners pick their own show (The Office, Breaking Bad, etc.)
3. **Clear domain** — Shows, characters, episodes, quotes are intuitive
4. **Rich enough for depth** — Authentication, search, admin features, etc.
5. **Not intimidating** — It's fun, not enterprise-serious

### Project Scope

**Starting state (Module 0):**
- Basic CRUD for shows, characters, episodes
- Generic placeholder data
- No authentication
- No search
- No documentation
- Inconsistent code patterns

**Ending state (Module 9):**
- Themed for learner's chosen show
- Full authentication system
- Search and filtering
- Admin tools
- Test coverage
- CI/CD pipeline
- Comprehensive documentation
- Consistent, well-structured code

### Technical Stack

| Layer | Technology | Why This Choice |
|-------|-----------|-----------------|
| Frontend | React | Widely known, good Copilot support |
| Backend | Node.js/Express | Accessible to most developers |
| Database | PostgreSQL | Real database, not toy data |
| Container | Docker | Modern deployment practices |
| CI/CD | GitHub Actions | Integrated with Copilot ecosystem |

---

## 🎯 Narrative Techniques

### The "Before and After" Pattern

Every exercise shows contrast:

```markdown
#### ❌ The "Before" — What Frustration Looks Like
[Describe the pain point without the skill being taught]

#### ✨ The "After" — The Improved Experience  
[Show the concrete improvement achieved]
```

### Character Reactions

Include emotional beats after key moments:

```markdown
#### 💭 [Character]'s Reaction
_"[Internal thought that reflects their transformation]"_
```

### The Skeptic's Journey (Sarah's Arc)

Sarah's skepticism serves a crucial narrative function:

1. **Validates learner concerns** — "It's okay to be skeptical"
2. **Sets high standards** — Results must be concrete, not hand-wavy
3. **Marks progress** — Her approval signals genuine achievement
4. **Models healthy adoption** — Skepticism → evidence → belief

### The Expert's Fear (David's Arc)

David's "will AI replace me?" fear must be handled carefully:

1. **Never dismiss it** — The fear is legitimate
2. **Show augmentation** — AI handles tedious work, experts focus on judgment
3. **Create "AI got it wrong" moments** — Experience catches AI mistakes
4. **Celebrate expertise** — Deep knowledge produces better AI results

### The Learner's Growth (Jessica's Arc)

Jessica represents anyone feeling overwhelmed:

1. **Normalize not knowing** — It's okay to be new
2. **Celebrate questions** — Curiosity is a strength
3. **Show accelerated learning** — AI explains as it generates
4. **Build confidence gradually** — Small wins compound

---



## 📚 Additional Resources

- [PERSONAS.md](PERSONAS.md) — Full character profiles
- [../README.md](../00-orientation/README.md) — Module 0 content
- [../../OUTLINE.md](../../OUTLINE.md) — Complete workshop outline
- [../../.github/copilot-instructions.md](../../.github/copilot-instructions.md) — Content creation guidelines

---

## 💡 Key Insight

> **Stories make learning stick.** When learners connect with characters facing relatable challenges, they remember not just the "how" but the "why." The FanHub story isn't decoration—it's the scaffolding that makes technical content meaningful and memorable.

The best technical workshops don't just teach skills. They transform how learners see themselves and their work. That transformation happens through story.
