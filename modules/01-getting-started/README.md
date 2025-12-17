# Module 1: Getting Started with GitHub Copilot

## 📖 Overview

This module introduces GitHub Copilot, covering licensing options, installation, setup, and fundamental concepts. By the end of this module, you'll have Copilot configured and understand its core capabilities.

## 🎯 Learning Objectives

- Understand what GitHub Copilot is and how it works
- Learn about licensing options and access
- Install and configure GitHub Copilot
- Understand privacy and security considerations
- Learn basic Copilot concepts and terminology

## 📚 Content

### What is GitHub Copilot?

GitHub Copilot is an AI pair programmer that helps you write code faster and with less work. It draws context from comments and code to suggest individual lines and whole functions instantly.

**Key Features:**
- AI-powered code completions
- Natural language to code conversion
- Context-aware suggestions
- Multi-language support
- Chat interface for Q&A and code explanations

### Licensing Options

GitHub Copilot is available in three tiers:

1. **GitHub Copilot Individual** - For individual developers
2. **GitHub Copilot Business** - For organizations, with enhanced privacy
3. **GitHub Copilot Enterprise** - Advanced features including knowledge bases and custom models

**📖 Official Documentation:**
- [GitHub Copilot Plans](https://docs.github.com/en/copilot/about-github-copilot/subscription-plans-for-github-copilot)
- [Pricing Information](https://github.com/features/copilot#pricing)

### Getting Access

**For Individual Users:**
1. Go to [GitHub Copilot Settings](https://github.com/settings/copilot)
2. Start a free trial or subscribe
3. Configure your settings

**For Organizations:**
1. Organization owners can enable Copilot in Settings
2. Assign licenses to users
3. Configure policies and settings

**📖 Official Documentation:**
- [Setting up GitHub Copilot](https://docs.github.com/en/copilot/setting-up-github-copilot)
- [Managing Copilot for your organization](https://docs.github.com/en/copilot/managing-copilot/managing-github-copilot-in-your-organization)

### Installation

GitHub Copilot can be installed in various development environments:

**Visual Studio Code:**
1. Open VS Code
2. Go to Extensions (Ctrl+Shift+X / Cmd+Shift+X)
3. Search for "GitHub Copilot"
4. Install both "GitHub Copilot" and "GitHub Copilot Chat"
5. Sign in with your GitHub account

**Other IDEs:**
- JetBrains IDEs
- Visual Studio
- Neovim
- (Covered in detail in Module 5)

**📖 Official Documentation:**
- [Installing the GitHub Copilot extension in Visual Studio Code](https://docs.github.com/en/copilot/managing-copilot/configure-personal-settings/installing-the-github-copilot-extension-in-your-environment)
- [GitHub Copilot in the CLI](https://docs.github.com/en/copilot/github-copilot-in-the-cli)

### Privacy and Security

Understanding how GitHub Copilot handles your data:

- **Code Snippets**: Short code snippets used for suggestions (retention varies by license)
- **Prompts**: Your prompts to Copilot Chat are processed to generate responses
- **Telemetry**: Usage data to improve the service
- **Business & Enterprise**: Enhanced privacy with no data retention

**📖 Official Documentation:**
- [GitHub Copilot Trust Center](https://resources.github.com/copilot-trust-center/)
- [Privacy statement for GitHub Copilot](https://docs.github.com/en/site-policy/privacy-policies/github-copilot-privacy-statement)
- [GitHub Copilot data usage](https://docs.github.com/en/copilot/managing-copilot/managing-copilot-as-an-individual-subscriber/about-github-copilot-individual#about-billing-for-github-copilot-individual)

### Core Concepts

**Code Completions:**
- Inline suggestions as you type
- Accept with Tab, dismiss with Esc
- View alternative suggestions with Alt+] / Option+]

**Copilot Chat:**
- Conversational interface for code help
- Ask questions, get explanations, generate code
- Context-aware based on open files

**Context:**
- Open files in your editor
- Comments and code structure
- File type and language

## 🔨 Exercises

### Exercise 1: Installation and Setup

**Objective**: Install and configure GitHub Copilot in your preferred IDE.

**Steps:**
1. Verify you have GitHub Copilot access at [github.com/settings/copilot](https://github.com/settings/copilot)
2. Install the GitHub Copilot extension in VS Code (or your IDE)
3. Sign in with your GitHub account
4. Verify Copilot is active (check status bar)

**Verification:**
- Create a new file `hello.py`
- Type `def greet(name):` and press Enter
- Observe Copilot's suggestion
- Accept the suggestion with Tab

**📖 Reference:**
- [Quickstart for GitHub Copilot](https://docs.github.com/en/copilot/quickstart)

### Exercise 2: First Code Suggestions

**Objective**: Practice accepting and working with Copilot suggestions.

**Steps:**
1. Create a new file `calculator.js`
2. Write a comment: `// function to add two numbers`
3. Press Enter and observe Copilot's suggestion
4. Accept the suggestion
5. Try alternate suggestions with Alt+] or Alt+[

**Challenge:**
- Write more functions (subtract, multiply, divide)
- Use comments to guide Copilot
- Experiment with different comment styles

**📖 Reference:**
- [Using GitHub Copilot code suggestions](https://docs.github.com/en/copilot/using-github-copilot/getting-code-suggestions-in-your-ide-with-github-copilot)

### Exercise 3: Using Copilot Chat

**Objective**: Learn to use the chat interface for code assistance.

**Steps:**
1. Open Copilot Chat (Ctrl+Shift+I / Cmd+Shift+I in VS Code)
2. Ask: "Explain what a REST API is"
3. Ask: "Write a function to validate an email address in Python"
4. Try the inline chat with Ctrl+I / Cmd+I

**Questions to Try:**
- "How do I read a JSON file in [your language]?"
- "Explain this code: [paste a code snippet]"
- "What are the differences between let, const, and var in JavaScript?"

**📖 Reference:**
- [Using GitHub Copilot Chat](https://docs.github.com/en/copilot/using-github-copilot/asking-github-copilot-questions-in-your-ide)

### Exercise 4: Understanding Context

**Objective**: Learn how Copilot uses context from your codebase.

**Steps:**
1. Create a file `user.js` with a User class:
   ```javascript
   class User {
       constructor(name, email) {
           this.name = name;
           this.email = email;
       }
   }
   ```
2. Create a new file `user-service.js`
3. Start typing: `// function to create a new user`
4. Notice how Copilot understands the User class from the other file

**Observations:**
- Copilot uses open files for context
- Related code improves suggestions
- File structure matters

**📖 Reference:**
- [Getting the most out of GitHub Copilot](https://docs.github.com/en/copilot/using-github-copilot/getting-started-with-github-copilot)

## 📝 Key Takeaways

- GitHub Copilot is available in multiple licensing tiers
- Installation is simple via IDE extensions
- Privacy and security are configurable
- Context from your code improves suggestions
- Both inline completions and chat interfaces are available

## ➡️ Next Steps

Continue to [Module 2: Copilot in Visual Studio Code](../02-copilot-vscode/README.md) to deep dive into VS Code specific features.

## 🔗 Additional Resources

- [GitHub Copilot Documentation](https://docs.github.com/en/copilot)
- [Microsoft Learn: Introduction to GitHub Copilot](https://learn.microsoft.com/en-us/training/modules/introduction-to-github-copilot/)
- [GitHub Copilot Getting Started Guide](https://docs.github.com/en/copilot/getting-started-with-github-copilot)
- [GitHub Skills: Copilot Course](https://github.com/skills/copilot)
