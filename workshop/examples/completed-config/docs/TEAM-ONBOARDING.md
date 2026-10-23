# GitHub Copilot Team Onboarding Kit

> **Purpose**: Self-service onboarding guide for teams adopting GitHub Copilot.  
> **Tier**: 🆓 Free (works with any tier, some features require Business/Enterprise)  
> **Audience**: Developers new to Copilot, team leads setting up their teams

---

## 🎯 Onboarding Goals

By completing this onboarding, you will:
- [ ] Have Copilot installed and configured
- [ ] Understand how to get effective suggestions
- [ ] Know where to find help and resources
- [ ] Be ready to use Copilot productively

**Estimated time**: 60-90 minutes

---

## 📋 Prerequisites Checklist

Before starting, confirm you have:

- [ ] GitHub account with Copilot license assigned
- [ ] VS Code installed (version 1.82 or later recommended)
- [ ] Access to at least one repository to practice

**Verify your license**: Visit [github.com/settings/copilot](https://github.com/settings/copilot)

---

## 🚀 Quick Start (15 minutes)

### Step 1: Install the Extension

1. Open VS Code
2. Go to Extensions (Ctrl+Shift+X / Cmd+Shift+X)
3. Search for "GitHub Copilot"
4. Install **GitHub Copilot** (by GitHub)
5. Also install **GitHub Copilot Chat** (by GitHub)

### Step 2: Sign In

1. Click the Copilot icon in the status bar (bottom right)
2. Click "Sign in to GitHub"
3. Complete the authentication flow
4. Return to VS Code

### Step 3: Verify It Works

1. Create a new file: `test.js`
2. Type: `// function to calculate fibonacci`
3. Wait for the ghost text suggestion
4. Press **Tab** to accept

🎉 **Congratulations!** You're ready to use Copilot.

---

## 🎓 Core Skills (30 minutes)

### Skill 1: Inline Suggestions

Copilot suggests code as you type. You'll see "ghost text" in gray.

**Keyboard Shortcuts**:
| Action | Windows/Linux | Mac |
|--------|---------------|-----|
| Accept suggestion | `Tab` | `Tab` |
| Reject suggestion | `Esc` | `Esc` |
| See alternatives | `Alt+]` / `Alt+[` | `Option+]` / `Option+[` |
| Accept word | `Ctrl+→` | `Cmd+→` |

**Practice**: Create a file and try these prompts as comments:
```javascript
// function to validate email address

// class representing a shopping cart

// async function to fetch user by id from API
```

### Skill 2: Chat Panel

For more complex questions, use Copilot Chat.

**Open Chat**: `Ctrl+Shift+I` (Windows/Linux) or `Cmd+Shift+I` (Mac)

**Try These**:
- "Explain this code" (with code selected)
- "Write tests for this function"
- "How do I handle errors in async functions?"
- "Refactor this to be more readable"

### Skill 3: Inline Chat

For quick edits without leaving your code.

**Open Inline Chat**: `Ctrl+I` (Windows/Linux) or `Cmd+I` (Mac)

**Try These** (select code first):
- "Add error handling"
- "Convert to TypeScript"
- "Add JSDoc comments"
- "Simplify this"

### Skill 4: Context is Everything

Copilot works better with more context:

**Good Context Sources**:
- Open related files in editor tabs
- Use `@workspace` to reference your codebase
- Add file references with `#file`
- Include examples of desired patterns

**Example**:
```
@workspace How do we handle authentication in this project?
```

---

## 📁 Your First Configuration (15 minutes)

### Repository Instructions

Create `.github/copilot-instructions.md` in your repository:

```markdown
# Copilot Instructions for [Project Name]

## Project Overview
[Brief description of what this project does]

## Tech Stack
- Frontend: [React/Vue/Angular/etc.]
- Backend: [Node.js/Python/Java/etc.]
- Database: [PostgreSQL/MongoDB/etc.]

## Coding Standards
- Use [TypeScript/JavaScript/Python/etc.]
- Follow [style guide name] style
- [Add your specific conventions]

## Common Patterns
[Describe patterns specific to your codebase]

## Testing
- Use [Jest/Pytest/etc.] for testing
- Tests go in [__tests__/tests/spec] folders
```

### Verify Configuration

1. Save the file
2. Open Copilot Chat
3. Ask: "Which coding standards does this project follow?"
4. Expect Copilot to reference your instructions

---

## 🔒 Security Awareness (10 minutes)

### What Copilot Can See
- Code in your current file
- Open files in editor tabs
- Repository context (when you use @workspace)
- Your prompts and questions

### What to Know
- Don't paste sensitive data (passwords, API keys) into prompts
- Review generated code for security issues
- AI can generate code with vulnerabilities
- Use your judgment, not blind acceptance

### Code Review for AI-Generated Code
Always verify:
- [ ] Input validation present
- [ ] No hardcoded secrets
- [ ] Error handling appropriate
- [ ] Logic is correct (trace through it)

---

## 💡 Tips for Success

### Do's ✅
- **Write clear comments** describing what you want
- **Provide examples** of desired output format
- **Break complex tasks** into smaller pieces
- **Review suggestions** before accepting
- **Use Tab wisely** - partial accepts are powerful

### Don'ts ❌
- **Don't accept blindly** - always understand the code
- **Don't share secrets** in prompts
- **Don't expect perfection** - AI makes mistakes
- **Don't skip tests** - generated code needs testing too

### When Copilot Struggles
If suggestions aren't helpful:
1. Add more context (comments, examples)
2. Be more specific in your request
3. Try rephrasing your prompt
4. Break the problem into smaller steps

---

## 📚 Resources

### Official Documentation
- [GitHub Copilot Docs](https://docs.github.com/en/copilot)
- [VS Code Copilot Guide](https://code.visualstudio.com/docs/copilot/overview)

### Team Resources
- [Our Organization Instructions](#) (link to your org's config)
- [Code Review Guide](./COPILOT-REVIEW-GUIDE.md)
- Questions? Contact: [your-copilot-champion@company.com]

### Community
- [GitHub Community Discussions](https://github.com/orgs/community/discussions/categories/copilot)

---

## ✅ Onboarding Completion Checklist

Before marking yourself onboarded, verify:

- [ ] Copilot extension installed and signed in
- [ ] Successfully received inline suggestions
- [ ] Used Copilot Chat for at least one question
- [ ] Reviewed your team's repository instructions
- [ ] Read the security awareness section
- [ ] Know where to find help (resources above)

**Completion Date**: _______________

---

## 📝 Feedback

Help us improve this onboarding:

1. **What was most helpful?**
   
2. **What was confusing?**
   
3. **What's missing?**
   
4. **Overall rating** (1-5): ___

Send feedback to: [copilot-feedback@company.com]

---

## 🎯 Next Steps

Now that you're onboarded:

1. **Use Copilot daily** for 2 weeks to build the habit
2. **Share tips** with teammates when you discover something useful
3. **Attend office hours** [if your team has them]
4. **Provide feedback** on what works and what doesn't

Welcome to AI-assisted development! 🚀

---

*Last updated: [Date]*  
*Version: 1.0*
