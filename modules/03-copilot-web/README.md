# Module 3: Copilot on the Web (GitHub.com)

## 📖 Overview

GitHub Copilot is available directly in your browser on GitHub.com, enabling AI-assisted coding without leaving your repository. This module covers using Copilot for pull requests, code reviews, discussions, and the web-based code editor.

## 🎯 Learning Objectives

- Use Copilot in GitHub pull requests and code reviews
- Leverage Copilot in GitHub Issues and Discussions
- Access Copilot in the web-based code editor
- Use Copilot for code exploration and understanding
- Understand GitHub.com-specific Copilot features

## 📚 Content

### Copilot in Pull Requests

**Available Features:**
- Code suggestions in the web editor
- PR description generation
- Code explanation and review assistance
- Answer questions about changes

**How to Access:**
1. Navigate to any pull request
2. Look for the Copilot icon
3. Click to ask questions or get explanations

**Use Cases:**
- Understanding complex PRs
- Reviewing large changesets
- Generating PR summaries
- Asking about specific code changes

**📖 Official Documentation:**
- [Using GitHub Copilot in github.com](https://docs.github.com/en/copilot/using-github-copilot/using-github-copilot-on-githubcom)
- [GitHub Copilot in pull requests](https://docs.github.com/en/copilot/github-copilot-enterprise/copilot-pull-request-summaries/about-copilot-pull-request-summaries)

### Copilot Pull Request Summaries

**Feature**: Automatically generate PR descriptions (Enterprise feature)

**How it Works:**
1. Create a new pull request
2. Click "Generate" with the Copilot icon
3. Copilot analyzes your changes
4. Creates a comprehensive description

**What's Included:**
- Summary of changes
- Files modified
- Key features added
- Breaking changes (if any)

**📖 Official Documentation:**
- [Creating a pull request summary with GitHub Copilot](https://docs.github.com/en/copilot/github-copilot-enterprise/copilot-pull-request-summaries/creating-a-pull-request-summary-with-github-copilot)

### Copilot in Code Review

**Review Assistance:**
- Explain code changes
- Identify potential issues
- Suggest improvements
- Answer reviewer questions

**How to Use:**
1. Open a PR in review mode
2. Click on any code section
3. Use Copilot to ask questions
4. Get explanations and context

**Example Questions:**
- "What does this function do?"
- "Are there any security concerns in this change?"
- "How does this affect performance?"
- "What test coverage would be appropriate?"

**📖 Official Documentation:**
- [Using Copilot in code reviews](https://docs.github.com/en/copilot/using-github-copilot/using-github-copilot-on-githubcom)

### GitHub.com Code Editor (github.dev)

**Accessing the Editor:**
- Press `.` (period) in any repository
- Or change `.com` to `.dev` in the URL
- Or click "Code" → "Open with github.dev"

**Copilot Features in github.dev:**
- Full code completions
- Inline suggestions
- Chat interface (if enabled)
- Multi-file editing

**Use Cases:**
- Quick edits without cloning
- Code exploration and understanding
- Creating small features or fixes
- Documentation updates

**📖 Official Documentation:**
- [github.dev web-based editor](https://docs.github.com/en/codespaces/the-githubdev-web-based-editor)
- [GitHub Copilot in the web editor](https://docs.github.com/en/copilot/using-github-copilot/using-github-copilot-on-githubcom)

### Copilot in GitHub Issues

**Features:**
- Generate issue templates
- Suggest solutions to reported problems
- Create task breakdowns
- Provide context about related code

**How to Use:**
1. Open or create an issue
2. Click the Copilot icon
3. Ask questions or request assistance
4. Get suggestions for issue content

**Example Uses:**
- "Generate a bug report template"
- "What code might be causing this error?"
- "Break down this feature into smaller tasks"

**📖 Official Documentation:**
- [GitHub Copilot in Issues](https://docs.github.com/en/copilot/using-github-copilot/using-github-copilot-on-githubcom)

### Copilot in GitHub Discussions

**Capabilities:**
- Answer technical questions
- Provide code examples
- Explain concepts
- Suggest best practices

**How to Access:**
1. Navigate to repository Discussions
2. Use Copilot to help formulate questions
3. Get suggestions for answers
4. Generate code examples

**📖 Official Documentation:**
- [GitHub Discussions documentation](https://docs.github.com/en/discussions)

### GitHub Copilot Chat in github.com (Enterprise)

**Enterprise Feature**: Full chat interface on GitHub.com

**Capabilities:**
- Ask questions about repositories
- Get code explanations
- Generate code snippets
- Understand project architecture

**Access:**
- Look for chat icon in the navigation
- Available in Enterprise tier
- Context-aware of current repository

**📖 Official Documentation:**
- [GitHub Copilot Enterprise features](https://docs.github.com/en/copilot/github-copilot-enterprise/overview/about-github-copilot-enterprise)

### Mobile Access

**GitHub Mobile App:**
- View Copilot-generated PR summaries
- Read Copilot assistance in reviews
- Access on iOS and Android

**Note**: Full Copilot editing not available on mobile, but you can view Copilot-generated content.

**📖 Official Documentation:**
- [GitHub Mobile](https://docs.github.com/en/get-started/using-github/github-mobile)

## 🔨 Exercises

### Exercise 1: Pull Request Description Generation

**Objective**: Use Copilot to generate PR descriptions.

**Steps:**
1. Create a branch with some code changes
2. Open a new pull request
3. Click "Generate" with Copilot (Enterprise users)
4. Review the generated description
5. Edit and refine as needed

**For non-Enterprise users:**
- Use Copilot Chat in VS Code
- Ask: "Generate a PR description for these changes"
- Paste git diff output for context

**📖 Reference:**
- [PR summaries documentation](https://docs.github.com/en/copilot/github-copilot-enterprise/copilot-pull-request-summaries)

### Exercise 2: Code Review with Copilot

**Objective**: Use Copilot to assist in code reviews.

**Steps:**
1. Open a pull request (yours or a teammate's)
2. Review the changed files
3. Click on a complex code section
4. Use Copilot to ask:
   - "Explain what this code does"
   - "Are there any potential bugs?"
   - "How can this be improved?"
5. Use insights to write better review comments

**Discussion:**
- How did Copilot's explanation help?
- Did it identify issues you missed?
- Were suggestions actionable?

**📖 Reference:**
- [Using Copilot on GitHub.com](https://docs.github.com/en/copilot/using-github-copilot/using-github-copilot-on-githubcom)

### Exercise 3: Quick Edits with github.dev

**Objective**: Make code changes using the web editor.

**Steps:**
1. Navigate to any repository
2. Press `.` to open github.dev
3. Make a small change (e.g., fix a typo, update README)
4. Use Copilot for suggestions if available
5. Commit directly from the web editor

**Tasks:**
- Update documentation
- Fix a small bug
- Add a simple feature
- Create a new file

**📖 Reference:**
- [Web-based editor documentation](https://docs.github.com/en/codespaces/the-githubdev-web-based-editor)

### Exercise 4: Issue Enhancement

**Objective**: Use Copilot to improve issue content.

**Steps:**
1. Create or open an issue
2. Use Copilot to:
   - Generate a clearer description
   - Add reproduction steps
   - Suggest acceptance criteria
   - Break into sub-tasks
3. Compare original vs enhanced version

**Example Prompts:**
- "Clarify this bug report"
- "Add steps to reproduce"
- "Create a feature request template"

**📖 Reference:**
- [GitHub Issues documentation](https://docs.github.com/en/issues)

### Exercise 5: Repository Exploration

**Objective**: Use Copilot to understand an unfamiliar repository.

**Steps:**
1. Choose an open-source repository you're unfamiliar with
2. Use Copilot to ask:
   - "What is the purpose of this repository?"
   - "Explain the project structure"
   - "Where is the main business logic?"
   - "How is testing implemented?"
3. Navigate to suggested files
4. Ask follow-up questions

**📖 Reference:**
- [Using Copilot for code exploration](https://docs.github.com/en/copilot/using-github-copilot)

### Exercise 6: Collaborative Review Session

**Objective**: Practice team code review with Copilot.

**Setup:**
1. Team member creates PR with substantial changes
2. Reviewer uses Copilot for assistance
3. Both discuss Copilot's insights

**Process:**
1. Reviewer asks Copilot about changes
2. Copilot provides explanations
3. Use insights for review comments
4. Author responds to feedback
5. Iterate with Copilot assistance

**Discussion Points:**
- Did Copilot catch issues humans missed?
- Were explanations helpful?
- How did it affect review speed/quality?

**📖 Reference:**
- [Best practices for code review](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests)

## 📝 Key Takeaways

- GitHub Copilot integrates directly into GitHub.com workflows
- PR summaries automate description writing (Enterprise)
- Code review assistance helps understand complex changes
- github.dev provides a full editing experience in the browser
- Copilot works in Issues and Discussions for better collaboration
- Web-based Copilot complements IDE usage

## ➡️ Next Steps

Continue to [Module 4: GitHub Copilot CLI](../04-copilot-cli/README.md) to learn about using Copilot from the command line.

## 🔗 Additional Resources

- [GitHub Copilot on GitHub.com](https://docs.github.com/en/copilot/using-github-copilot/using-github-copilot-on-githubcom)
- [GitHub Copilot Enterprise features](https://docs.github.com/en/enterprise-cloud@latest/copilot/github-copilot-enterprise)
- [github.dev documentation](https://docs.github.com/en/codespaces/the-githubdev-web-based-editor)
- [GitHub Pull Request documentation](https://docs.github.com/en/pull-requests)
- [Code review best practices](https://github.blog/developer-skills/github/how-to-review-code-effectively-a-github-staff-engineers-philosophy/)
