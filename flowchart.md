# Choosing a Copilot Configuration Point

A decision guide for **when**, **why**, and **how** to use each Copilot customization
type: **Instructions**, **Prompts**, **Skills**, and **Agents**.

---

## TL;DR — What each one is for

| Type | File(s) | Mental model | Invoked |
|---|---|---|---|
| **Instructions** | `*.instructions.md`, `copilot-instructions.md`, `AGENTS.md` | "Rules that are always true" | Automatically (passive context) |
| **Prompts** | `*.prompt.md` | "A saved task I run on demand" | Manually (slash command `/name`) |
| **Skills** | `SKILL.md` | "Domain know-how loaded when relevant" | Automatically (description match) |
| **Agents** | `*.agent.md` | "A specialized mode with its own tools/model" | Manually (pick the agent) |

---

## Decision flowchart

```mermaid
flowchart TD
    Start([I want to customize Copilot behavior]) --> Q1{What kind of<br/>customization?}

    Q1 -->|Standing rules &<br/>conventions| INSTR_PATH
    Q1 -->|A repeatable task<br/>I trigger myself| PROMPT_PATH
    Q1 -->|Packaged expertise<br/>for a domain| SKILL_PATH
    Q1 -->|A distinct working mode<br/>with its own tools| AGENT_PATH

    %% ---------- INSTRUCTIONS ----------
    subgraph INSTR_PATH[Instructions]
        direction TB
        I1{Should it apply<br/>always or only to<br/>certain files?}
        I1 -->|Everywhere, every request| I_GLOBAL["Use AGENTS.md or<br/>.github/copilot-instructions.md"]
        I1 -->|Only matching paths| I_SCOPED["Use a .instructions.md file<br/>with an applyTo glob"]
        I_GLOBAL --> I_WHY
        I_SCOPED --> I_WHY
        I_WHY["WHY: passive guardrails the model<br/>reads automatically — coding style,<br/>conventions, do/don't rules"]
    end

    %% ---------- PROMPTS ----------
    subgraph PROMPT_PATH[Prompts]
        direction TB
        P1{Do you trigger it<br/>on demand with inputs?}
        P1 -->|Yes, parameterized task| P_USE[".prompt.md → run as /command"]
        P1 -->|It should just always apply| P_REDIRECT["Reconsider →<br/>use Instructions instead"]
        P_USE --> P_WHY
        P_WHY["WHY: reusable, shareable task<br/>templates — scaffold a component,<br/>write a PR description, run a review"]
    end

    %% ---------- SKILLS ----------
    subgraph SKILL_PATH[Skills]
        direction TB
        S1{Is it reusable<br/>procedural knowledge<br/>for a topic?}
        S1 -->|Yes, multi-step domain workflow| S_USE["SKILL.md with a strong<br/>trigger description"]
        S1 -->|Just a one-off task| S_REDIRECT["Reconsider →<br/>use a Prompt instead"]
        S_USE --> S_WHY
        S_WHY["WHY: auto-loaded when the task<br/>matches the description — domain<br/>steps, tooling, validation recipes"]
    end

    %% ---------- AGENTS ----------
    subgraph AGENT_PATH[Agents]
        direction TB
        A1{Need a constrained mode<br/>— specific tools, model,<br/>or autonomy?}
        A1 -->|Yes| A_USE[".agent.md defining tools,<br/>model, and instructions"]
        A1 -->|No, just guidance| A_REDIRECT["Reconsider →<br/>Skill or Instructions"]
        A_USE --> A_WHY
        A_WHY["WHY: a named persona/mode with<br/>scoped capabilities — generators,<br/>reviewers, multi-step autonomous work"]
    end

    I_WHY --> Done([Author the file, test it,<br/>iterate])
    P_WHY --> Done
    P_REDIRECT --> Q1
    S_WHY --> Done
    S_REDIRECT --> Q1
    A_WHY --> Done
    A_REDIRECT --> Q1
```

---

## How they relate

```mermaid
flowchart LR
    Agent["Agent<br/>(.agent.md)"] -->|can invoke| Skill["Skill<br/>(SKILL.md)"]
    Agent -->|inherits| Instr["Instructions<br/>(AGENTS.md / *.instructions.md)"]
    Prompt["Prompt<br/>(.prompt.md)"] -->|can reference| Skill
    Skill -->|may call| Prompt
    Instr -. always-on context .-> Agent
    Instr -. always-on context .-> Prompt

    classDef passive fill:#e8f0fe,stroke:#4285f4,color:#1a1a1a;
    classDef active fill:#e6f4ea,stroke:#34a853,color:#1a1a1a;
    class Instr passive;
    class Prompt,Skill,Agent active;
```

- **Instructions** are passive and always-on; everything else inherits them.
- **Prompts** and **Agents** are user-triggered.
- **Skills** load automatically when a task matches their description.

---

## Quick chooser

- **"It should always be true."** → Instructions
- **"I'll run it when I need it, sometimes with inputs."** → Prompt
- **"It's reusable expertise that should kick in when relevant."** → Skill
- **"I need a dedicated mode with specific tools/model/autonomy."** → Agent
