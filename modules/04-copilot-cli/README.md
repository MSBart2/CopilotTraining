# Module 4: GitHub Copilot CLI

## 📖 Overview

GitHub Copilot in the CLI (Command Line Interface) brings AI assistance to your terminal. Get help with shell commands, scripts, and Git operations directly from the command line. This module covers installation, usage, and practical applications of Copilot CLI.

## 🎯 Learning Objectives

- Install and configure GitHub Copilot CLI
- Use Copilot to explain shell commands
- Generate shell commands from natural language
- Get assistance with Git operations
- Create scripts and automation with Copilot
- Integrate CLI Copilot into daily workflows

## 📚 Content

### What is GitHub Copilot CLI?

GitHub Copilot CLI is a command-line interface tool that provides:
- Natural language to shell command translation
- Command explanations
- Git command assistance
- Script generation
- Best practices suggestions

**Key Commands:**
- `gh copilot suggest` - Get command suggestions
- `gh copilot explain` - Explain commands

**📖 Official Documentation:**
- [GitHub Copilot in the CLI](https://docs.github.com/en/copilot/github-copilot-in-the-cli)
- [GitHub CLI documentation](https://cli.github.com/)

### Installation

**Prerequisites:**
- GitHub Copilot subscription
- GitHub CLI (`gh`) installed

**Installing GitHub CLI:**

**macOS:**
```bash
brew install gh
```

**Windows:**
```powershell
winget install --id GitHub.cli
```

**Linux:**
```bash
# Debian/Ubuntu
sudo apt install gh

# Fedora/RHEL
sudo dnf install gh
```

**Installing Copilot CLI Extension:**
```bash
gh extension install github/gh-copilot
```

**Verify Installation:**
```bash
gh copilot --version
```

**Authentication:**
```bash
gh auth login
```

**📖 Official Documentation:**
- [Installing GitHub CLI](https://github.com/cli/cli#installation)
- [Installing Copilot CLI extension](https://docs.github.com/en/copilot/github-copilot-in-the-cli/using-github-copilot-in-the-cli)

### Using `gh copilot suggest`

Generate shell commands from natural language descriptions.

**Basic Usage:**
```bash
gh copilot suggest "find all large files"
```

**Interactive Mode:**
```bash
gh copilot suggest
# Then type your request when prompted
```

**Specify Shell Type:**
```bash
gh copilot suggest -t shell "list files modified today"
gh copilot suggest -t git "undo last commit"
gh copilot suggest -t gh "create a pull request"
```

**Shell Types:**
- `shell` - Generic shell commands
- `git` - Git commands
- `gh` - GitHub CLI commands

**Example Requests:**
- "compress a directory to tar.gz"
- "find all TODO comments in JavaScript files"
- "list processes using port 3000"
- "search for text in files recursively"

**📖 Official Documentation:**
- [Using gh copilot suggest](https://docs.github.com/en/copilot/github-copilot-in-the-cli/using-github-copilot-in-the-cli#asking-github-copilot-to-suggest-a-command)

### Using `gh copilot explain`

Understand what commands do before running them.

**Basic Usage:**
```bash
gh copilot explain "tar -xzvf archive.tar.gz"
```

**Explain from History:**
```bash
# View your history, then explain
gh copilot explain "docker run -d -p 8080:80 nginx"
```

**Interactive Mode:**
```bash
gh copilot explain
# Paste command when prompted
```

**What You Get:**
- Plain English explanation
- Breakdown of flags and options
- Potential side effects
- Safety considerations

**Example Commands to Explain:**
```bash
gh copilot explain "find . -name '*.log' -mtime +30 -delete"
gh copilot explain "awk '{print $1}' file.txt | sort | uniq -c"
gh copilot explain "git reset --hard HEAD~1"
```

**📖 Official Documentation:**
- [Using gh copilot explain](https://docs.github.com/en/copilot/github-copilot-in-the-cli/using-github-copilot-in-the-cli#asking-github-copilot-to-explain-a-command)

### Common Use Cases

**1. File Operations:**
```bash
gh copilot suggest "find files larger than 100MB"
gh copilot suggest "rename all .txt files to .md"
gh copilot suggest "copy only new files to backup directory"
```

**2. Git Operations:**
```bash
gh copilot suggest -t git "squash last 3 commits"
gh copilot suggest -t git "create branch from specific commit"
gh copilot suggest -t git "find commits by author in last month"
```

**3. System Administration:**
```bash
gh copilot suggest "check disk usage by directory"
gh copilot suggest "find processes consuming most memory"
gh copilot suggest "schedule a cron job for daily backup"
```

**4. Text Processing:**
```bash
gh copilot suggest "extract email addresses from file"
gh copilot suggest "count lines in all Python files"
gh copilot suggest "replace text in multiple files"
```

**5. Network Operations:**
```bash
gh copilot suggest "test if port is open"
gh copilot suggest "download file with resume support"
gh copilot suggest "check website response time"
```

**📖 Official Documentation:**
- [GitHub Copilot CLI usage examples](https://docs.github.com/en/copilot/github-copilot-in-the-cli/using-github-copilot-in-the-cli)

### Aliases and Shortcuts

Create shell aliases for faster access:

**Bash/Zsh:**
```bash
# Add to ~/.bashrc or ~/.zshrc
alias gcs='gh copilot suggest'
alias gce='gh copilot explain'
```

**Fish:**
```fish
# Add to ~/.config/fish/config.fish
alias gcs='gh copilot suggest'
alias gce='gh copilot explain'
```

**PowerShell:**
```powershell
# Add to $PROFILE
Set-Alias -Name gcs -Value 'gh copilot suggest'
Set-Alias -Name gce -Value 'gh copilot explain'
```

**Usage:**
```bash
gcs "find large files"
gce "rm -rf /"
```

### Integration with Shell History

**View and Explain History:**
```bash
# Bash/Zsh
history | tail -5
gh copilot explain "$(history | tail -1 | sed 's/^[ ]*[0-9]*[ ]*//')"
```

**Run Suggested Commands:**
```bash
# Get suggestion and store
CMD=$(gh copilot suggest "list docker containers" --no-interactive)
# Review before executing
echo $CMD
# Execute if safe
eval $CMD
```

**⚠️ Safety Note:** Always review generated commands before execution, especially those involving:
- File deletion
- System modifications
- Network operations
- Permission changes

### Best Practices

**1. Be Specific:**
```bash
# ❌ Vague
gh copilot suggest "do git stuff"

# ✅ Specific
gh copilot suggest -t git "create a new branch and switch to it"
```

**2. Specify Context:**
```bash
# Include important details
gh copilot suggest "find all .log files modified in the last 7 days in /var/log"
```

**3. Use Appropriate Type:**
```bash
# Use -t git for Git commands
gh copilot suggest -t git "show files changed in last commit"

# Use -t gh for GitHub CLI
gh copilot suggest -t gh "list my pull requests"
```

**4. Review Before Running:**
```bash
# Always understand what the command does
gh copilot suggest "delete old log files"
# Then use explain to understand
gh copilot explain "find /var/log -name '*.log' -mtime +30 -delete"
```

**📖 Official Documentation:**
- [Best practices for using Copilot CLI](https://docs.github.com/en/copilot/github-copilot-in-the-cli)

## 🔨 Exercises

### Exercise 1: Installation and Setup

**Objective**: Install and configure GitHub Copilot CLI.

**Steps:**
1. Install GitHub CLI if not already installed
2. Authenticate with GitHub: `gh auth login`
3. Install Copilot extension: `gh extension install github/gh-copilot`
4. Verify: `gh copilot --version`
5. Create aliases for convenience

**Verification:**
```bash
gh copilot suggest "list all files"
```

**📖 Reference:**
- [Installing Copilot CLI](https://docs.github.com/en/copilot/github-copilot-in-the-cli/using-github-copilot-in-the-cli)

### Exercise 2: Command Suggestions

**Objective**: Practice generating commands from natural language.

**Tasks:**
1. "Find all JavaScript files in current directory"
2. "Count lines of code in Python files"
3. "List files modified in the last 24 hours"
4. "Archive a directory with compression"
5. "Kill process running on port 3000"

**For Each:**
- Use `gh copilot suggest`
- Review the suggested command
- Test it in a safe environment
- Note any variations with multiple attempts

**📖 Reference:**
- [Using suggest command](https://docs.github.com/en/copilot/github-copilot-in-the-cli/using-github-copilot-in-the-cli#asking-github-copilot-to-suggest-a-command)

### Exercise 3: Command Explanations

**Objective**: Understand complex commands with `explain`.

**Commands to Explain:**
1. `find . -type f -name "*.log" -mtime +7 -exec rm {} \;`
2. `docker run -d -p 8080:80 -v $(pwd):/usr/share/nginx/html nginx`
3. `git log --graph --oneline --all --decorate`
4. `awk '{sum+=$1} END {print sum}' numbers.txt`
5. `ssh -L 8080:localhost:80 user@remote`

**Steps:**
```bash
gh copilot explain "<command>"
```

**Questions:**
- What does each flag mean?
- What are potential risks?
- How would you modify it?

**📖 Reference:**
- [Using explain command](https://docs.github.com/en/copilot/github-copilot-in-the-cli/using-github-copilot-in-the-cli#asking-github-copilot-to-explain-a-command)

### Exercise 4: Git Workflow Assistance

**Objective**: Use Copilot CLI for Git operations.

**Tasks:**
1. Create a new feature branch
   ```bash
   gh copilot suggest -t git "create and switch to new branch named feature/new-feature"
   ```

2. Stage and commit changes
   ```bash
   gh copilot suggest -t git "stage all changes and commit with message"
   ```

3. Undo last commit (keep changes)
   ```bash
   gh copilot suggest -t git "undo last commit but keep changes"
   ```

4. View commit history graphically
   ```bash
   gh copilot suggest -t git "show commit history with branch graph"
   ```

5. Cherry-pick a commit
   ```bash
   gh copilot suggest -t git "apply commit abc123 to current branch"
   ```

**📖 Reference:**
- [Git documentation](https://git-scm.com/doc)

### Exercise 5: GitHub CLI Operations

**Objective**: Use Copilot for GitHub CLI tasks.

**Tasks:**
1. "List my open pull requests"
2. "Create a pull request from current branch"
3. "View details of issue #42"
4. "List releases for this repository"
5. "Create a new issue"

**Commands:**
```bash
gh copilot suggest -t gh "<your description>"
```

**Exploration:**
- Try different phrasings
- Compare with manual `gh` commands
- Note useful flags and options

**📖 Reference:**
- [GitHub CLI manual](https://cli.github.com/manual/)

### Exercise 6: Script Generation

**Objective**: Generate shell scripts with Copilot.

**Task**: Create a backup script

**Prompt:**
```bash
gh copilot suggest "create a bash script that backs up a directory to dated tar.gz file"
```

**Refinements:**
- Ask for error handling
- Add logging
- Include compression
- Add email notification (if needed)

**Testing:**
1. Review generated script
2. Test in safe environment
3. Iterate with modifications
4. Save for actual use

**📖 Reference:**
- [Bash scripting guide](https://www.gnu.org/software/bash/manual/)

### Exercise 7: Daily Workflow Integration

**Objective**: Integrate Copilot CLI into daily tasks.

**Scenarios:**

**Morning Routine:**
```bash
# Check system status
gh copilot suggest "show disk usage and running processes"

# Update repositories
gh copilot suggest -t git "update all submodules"
```

**Development:**
```bash
# Before making changes
gh copilot suggest -t git "save current work without committing"

# During development
gh copilot suggest "find files containing specific text"
```

**End of Day:**
```bash
# Review work
gh copilot suggest -t git "show all changes made today"

# Cleanup
gh copilot suggest "remove all node_modules directories"
```

**Track Your Usage:**
- Which commands do you use most?
- Where does Copilot CLI save time?
- What commands still need manual intervention?

## 📝 Key Takeaways

- GitHub Copilot CLI brings AI assistance to the terminal
- `gh copilot suggest` generates commands from descriptions
- `gh copilot explain` helps understand complex commands
- Supports shell, git, and gh command types
- Always review generated commands before execution
- Aliases and shell integration improve efficiency
- Particularly useful for complex, rarely-used commands

## ➡️ Next Steps

Continue to [Module 5: Copilot in Other IDEs](../05-copilot-other-ides/README.md) to learn about using Copilot in JetBrains, Visual Studio, and other development environments.

## 🔗 Additional Resources

- [GitHub Copilot in the CLI documentation](https://docs.github.com/en/copilot/github-copilot-in-the-cli)
- [GitHub CLI documentation](https://cli.github.com/)
- [Shell scripting best practices](https://google.github.io/styleguide/shellguide.html)
- [Git command reference](https://git-scm.com/docs)
- [Effective Shell](https://effective-shell.com/)
