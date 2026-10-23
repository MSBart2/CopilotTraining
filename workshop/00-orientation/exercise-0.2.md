# Exercise 0.1: Context Fundamentals — Quick Start

## 🔨 Exercise

**Lead:** Everyone ⭐ | **Time:** 10 min

> 📚 **Deep Dive:** For comprehensive coverage of Copilot Chat, context mechanisms, and VS Code 1.109 enhancements, see the [Copilot Chat Tech Talk](../../tech-talks/copilot-chat/README.md).

#### 📖 The Challenge

It's Monday, 9:15 AM. Marcus asks Copilot Chat a basic question:

> "How do I add a new character to the database?"

Copilot responds with... generic SQL syntax. It doesn't know about FanHub's database schema. **The quality of AI responses is directly proportional to the quality of context you provide.**

#### 🎯 Your Goal

Practice the five context mechanisms so you're ready for the rest of the workshop.

---

#### 📋 Quick Practice (5 minutes)

Try each mechanism once to feel the difference:

**1. `#file` — Known files**
```
What database tables exist? #file:backend/database/schema.sql
```

**2. `@workspace` — Project overview**
```
@workspace What is the overall architecture of this application?
```

**3. `#codebase` — Semantic search**
```
#codebase Where is authentication configured?
```

**4. `#fetch` — External docs**
```
#fetch https://react.dev/learn/thinking-in-react
What's the best way to structure React components based on this?
```

**5. Images — Visual context**
- Take a screenshot of an error message or UI mockup
- Drag-and-drop onto the Chat view
- Ask: "What's causing this?" or "Implement this design"

---

#### 💡 Context Decision Guide

| When you... | Use... |
|-------------|--------|
| Know the exact file | `#file:path/to/file` |
| Need project overview | `@workspace` |
| Looking for something specific | `#codebase` |
| Need current external docs | `#fetch <URL>` |
| Have a UI mockup/error screenshot | Drag image to chat |
| Working on the current file | Nothing! (implicit) |

---

#### ✅ Success Criteria

- [ ] Tried at least 3 of the 5 context mechanisms
- [ ] Noticed the difference between generic and context-aware responses
- [ ] Ready to use context throughout the workshop

#### 🧠 Mindful Moment

**Marcus's insight:** "This is like giving someone directions. 'Go there' is useless. 'Go to 123 Main St' gets results."

**Sarah's validation:** "Context is how you scale expertise. When I add architecture docs and standards, Copilot gives senior-dev answers."

---

## 🔗 What's Next

You've got the fundamentals. Now let's see what happens when Copilot has **no** context about your codebase patterns and standards.

**Continue to:** [Exercise 0.2: Experience "The Struggle"](exercise-0.2.md)

---

## ➡️ Next Exercise

**[Exercise 0.2: The Character Detail Challenge](exercise-0.2.md)** — Now that you know how to provide context, experience what happens when you build WITHOUT configuration or documentation. Feel the struggle, then we'll fix it in Module 1.
