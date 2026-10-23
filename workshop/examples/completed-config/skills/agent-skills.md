# FanHub Agent Skills Library

> Agent Skills teach GitHub Copilot domain-specific knowledge. This library contains skills for bug reproduction testing, product requirements, and FanHub development workflows.

## What Are Agent Skills?

**Agent Skills** are specialized folders containing:
- `SKILL.md` file with instructions (YAML frontmatter + markdown)
- Optional scripts, examples, and resources
- Domain-specific knowledge Copilot loads when relevant

Skills are part of an [open standard](https://github.com/agentskills/agentskills) used by various AI coding assistants.

### Where Skills Live

| Location | Scope | Use Case |
|----------|-------|----------|
| `.github/skills/` | Project | Shared with everyone on the project |
| `~/.copilot/skills/` | Personal | Available in all your projects |

### Skills vs Instructions vs Prompts

| Feature | Instructions | Prompts | Skills |
|---------|-------------|---------|--------|
| **Loaded** | Always | Manually invoked | Automatically when relevant |
| **Scope** | Broad standards | Specific templates | Specialized tasks |
| **Contains** | Guidelines | Structured queries | Instructions + scripts + examples |
| **Best for** | Team conventions | Repeatable workflows | Domain expertise |

---

## FanHub Skills Library

This library contains three production-ready skills for FanHub development. Each skill is stored in its own directory with a `SKILL.md` file following the [Agent Skills open standard](https://agentskills.io).

### 1. Bug Reproduction Test Generator

**Location**: `bug-reproduction-test-generator/SKILL.md`

**Purpose**: Generates failing tests that reproduce reported bugs in FanHub. Follows test-driven debugging principles—write a failing test first, then fix the bug.

**Key Features**:
- Bug reproduction test structure (describe/it blocks, Arrange/Act/Assert)
- Common bug categories (data integrity, null references, query errors, business logic)
- FanHub schema knowledge for realistic test data
- Test patterns that demonstrate the bug exists (fails at first — that proves the bug)

**Use this when**: A bug report comes in, reproducing issues before fixing them, preventing regression, or debugging data integrity problems.

[View Full Skill →](bug-reproduction-test-generator/SKILL.md)

---

### 2. Feature Requirements

**Location**: `feature-requirements/SKILL.md`

**Purpose**: Product requirements for FanHub features. Ensures features meet product standards for error handling, UX, analytics, accessibility, and responsive design.

**Key Features**:
- Error handling patterns (boundaries, async errors, user-friendly messages)
- User feedback requirements (loading states, notifications, confirmations)
- Analytics tracking conventions
- Accessibility standards (semantic HTML, ARIA, keyboard nav)
- Responsive design guidelines

**Use this when**: Creating new pages/routes, building React components, implementing user interactions, or adding forms.

[View Full Skill →](feature-requirements/SKILL.md)

---

### 3. API Endpoint Design

**Location**: `api-endpoint-design/SKILL.md`

**Purpose**: REST API design standards for FanHub's Express backend.

**Key Features**:
- URL conventions (lowercase, plural nouns, nested routes, versioning)
- HTTP method guidelines
- Response format standards (success/error structures)
- Status code usage
- Complete endpoint template

**Use this when**: Creating or modifying API endpoints to ensure consistency across the backend.

[View Full Skill →](api-endpoint-design/SKILL.md)

---

## Creating New Skills

### Skill Structure

Each skill lives in its own directory with a `SKILL.md` file:

```
skills/
├── your-skill/
│   ├── SKILL.md              # Main instructions
│   ├── schema.json           # Optional: JSON schema
│   ├── examples/             # Optional: Example files
│   │   ├── valid.json
│   │   └── invalid.json
│   └── scripts/              # Optional: Helper scripts
│       └── validate.js
```

### Skill Template

```markdown
---
name: your-skill-name
description: Brief description of when and why to use this skill.
---

# Skill Title

Brief introduction explaining the skill's purpose.

## Key Rules

List the main guidelines this skill enforces.

## Examples

### Good Example
```code
// Show valid implementation
```

### Bad Example
```code
// Show what to avoid and why
```

## When to Apply

Use this skill when:
- Scenario 1
- Scenario 2
- Scenario 3
```

---

## Community Skills

### Anthropic Skills Repository

High-quality skills for common development tasks:
- [github.com/anthropics/skills](https://github.com/anthropics/skills)

### GitHub Awesome Copilot Collection

Community-contributed skills and resources:
- [github.com/github/awesome-copilot](https://github.com/github/awesome-copilot)

### Adopting Community Skills

```bash
# Clone the community skill
git clone https://github.com/anthropics/skills /tmp/skills

# Copy and customize for FanHub
cp -r /tmp/skills/debugging .github/skills/
# Edit to fit FanHub conventions
```

---

## Skills Library Strategy

### Ownership

| Skill | Owner | Last Review |
|-------|-------|-------------|
| bug-reproduction-test-generator | Elena | [Date] |
| feature-requirements | Rafael | [Date] |
| api-endpoint-design | David | [Date] |

### Maintenance Schedule

- **Monthly**: Review skills for accuracy
- **Quarterly**: Update with new patterns/requirements
- **On-demand**: Update when underlying standards change

### Testing Skills

Verify skills work correctly:

```
@workspace Create a new character object for Eleven from Stranger Things

# Expected: Copilot applies bug-reproduction-test-generator skill automatically
# and includes all required fields with proper validation
```

---

## Related Resources

- [Module 4: Agent Skills](../../../04-agent-skills/README.md)
- [GitHub Docs: About Agent Skills](https://docs.github.com/en/copilot/concepts/agents/about-agent-skills)
- [Agent Skills Open Standard](https://github.com/agentskills/agentskills)
