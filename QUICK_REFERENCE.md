# Quick Reference Guide

## Quick Links to Official Resources

### Essential Documentation
- [GitHub Copilot Docs](https://docs.github.com/en/copilot) - Official documentation
- [Copilot Trust Center](https://resources.github.com/copilot-trust-center/) - Privacy and security
- [Microsoft Learn](https://learn.microsoft.com/en-us/training/modules/introduction-to-github-copilot/) - Training courses
- [GitHub Blog](https://github.blog/tag/github-copilot/) - Latest updates and features

### Getting Started
- [Quickstart Guide](https://docs.github.com/en/copilot/quickstart)
- [Subscription Plans](https://docs.github.com/en/copilot/about-github-copilot/subscription-plans-for-github-copilot)
- [Installation Guide](https://docs.github.com/en/copilot/setting-up-github-copilot)

### Platform-Specific Guides
- [VS Code](https://code.visualstudio.com/docs/copilot/overview)
- [JetBrains IDEs](https://plugins.jetbrains.com/plugin/17718-github-copilot)
- [Visual Studio](https://marketplace.visualstudio.com/items?itemName=GitHub.copilotvs)
- [Neovim](https://github.com/github/copilot.vim)
- [CLI](https://docs.github.com/en/copilot/github-copilot-in-the-cli)

### Advanced Features
- [Copilot Workspace](https://githubnext.com/projects/copilot-workspace)
- [Multi-file Editing](https://code.visualstudio.com/docs/copilot/copilot-edits)
- [PR Summaries](https://docs.github.com/en/copilot/github-copilot-enterprise/copilot-pull-request-summaries)
- [Enterprise Features](https://docs.github.com/en/copilot/github-copilot-enterprise)

## Keyboard Shortcuts

### VS Code
- **Accept suggestion**: `Tab`
- **Reject**: `Esc`
- **Next suggestion**: `Alt+]` / `Option+]`
- **Previous suggestion**: `Alt+[` / `Option+[`
- **Inline chat**: `Ctrl+I` / `Cmd+I`
- **Chat sidebar**: `Ctrl+Shift+I` / `Cmd+Shift+I`
- **View all suggestions**: `Ctrl+Enter` / `Cmd+Enter`

### JetBrains
- **Accept**: `Tab`
- **Next**: `Alt+]` / `Option+]`
- **Previous**: `Alt+[` / `Option+[`
- **View all**: `Alt+\` / `Option+\`

### Visual Studio
- **Accept**: `Tab`
- **Next**: `Alt+.`
- **Previous**: `Alt+,`
- **View all**: `Alt+/`

## Common Slash Commands

- `/explain` - Explain selected code
- `/fix` - Suggest fixes for problems
- `/tests` - Generate unit tests
- `/help` - Show available commands
- `/doc` - Generate documentation
- `/optimize` - Optimize code
- `/simplify` - Simplify complex code

## Chat Participants (VS Code)

- `@workspace` - Questions about your codebase
- `@vscode` - VS Code editor questions
- `@terminal` - Terminal/command-line help
- `@github` - GitHub-specific (Enterprise)

## CLI Commands

```bash
# Suggest commands
gh copilot suggest "your description"
gh copilot suggest -t git "git-specific task"
gh copilot suggest -t gh "github cli task"

# Explain commands
gh copilot explain "command to explain"
```

## Best Practices Checklist

### Before Accepting Suggestions
- [ ] Understand what the code does
- [ ] Verify it meets requirements
- [ ] Check for security issues
- [ ] Ensure proper error handling
- [ ] Confirm it matches code style

### When Writing Prompts
- [ ] Be specific and clear
- [ ] Provide context
- [ ] Include requirements
- [ ] Specify error handling needs
- [ ] Mention testing expectations

### Code Review
- [ ] Review all generated code
- [ ] Test thoroughly
- [ ] Check security implications
- [ ] Verify performance
- [ ] Update documentation

## Quick Troubleshooting

### Copilot Not Working
1. Check status bar icon
2. Verify authentication: Sign out and back in
3. Check network connection
4. Restart IDE
5. Check subscription status

### Poor Suggestions
1. Provide more context in comments
2. Keep relevant files open
3. Use more specific prompts
4. Try inline chat for refinements
5. Iterate with follow-up prompts

### No Suggestions Appearing
1. Check if Copilot is enabled
2. Verify file type is supported
3. Check settings for that language
4. Try typing more to trigger
5. Check if in supported region

## Module Quick Access

1. [Getting Started](./modules/01-getting-started/README.md) - Installation and basics
2. [VS Code](./modules/02-copilot-vscode/README.md) - Full VS Code features
3. [Web/GitHub.com](./modules/03-copilot-web/README.md) - Browser-based usage
4. [CLI](./modules/04-copilot-cli/README.md) - Command-line interface
5. [Other IDEs](./modules/05-copilot-other-ides/README.md) - JetBrains, VS, Neovim
6. [Advanced Features](./modules/06-advanced-features/README.md) - Workspace, agents, multi-file
7. [Best Practices](./modules/07-best-practices/README.md) - Tips and real-world usage

## Common Use Cases

### Writing New Code
```javascript
// Describe what you want clearly
// function to validate email addresses using regex
// returns true if valid, false otherwise
// handles international domains
```

### Refactoring
```javascript
// Select code + Ctrl+I / Cmd+I
// Prompt: "Convert to async/await and add error handling"
```

### Testing
```javascript
// In chat or inline
// /tests for this function
// Add edge cases and error scenarios
```

### Documentation
```javascript
// Select function
// /doc to generate documentation
// Review and enhance
```

### Debugging
```javascript
// Select problematic code
// Ask: "What could be wrong with this code?"
// Or: "Why might this throw an error?"
```

## Security Reminders

⚠️ **Always Review:**
- Authentication/authorization code
- Input validation
- SQL queries
- API calls
- File operations
- Encryption/decryption

🚫 **Never Commit:**
- API keys or secrets
- Passwords
- Private keys
- Access tokens
- Personal information

✅ **Best Practices:**
- Use environment variables
- Validate all inputs
- Use parameterized queries
- Apply principle of least privilege
- Test security thoroughly

## Getting Help

- [GitHub Community Discussions](https://github.com/orgs/community/discussions/categories/copilot)
- [Troubleshooting Guide](https://docs.github.com/en/copilot/troubleshooting-github-copilot)
- [Contact GitHub Support](https://support.github.com/)

---

**Quick Tip**: Bookmark this page for easy reference while working with GitHub Copilot!
