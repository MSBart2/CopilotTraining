---
agent: agent
description: 'One-word ship button: branch, commit, push, and create PR'
---

# Commit & Ship

Execute the complete git workflow to ship changes safely.

## Workflow Steps

### Step 1: Check Current Branch

First, determine the current git branch:
```bash
git branch --show-current
```

**If on `main` or `master`:**
- Create a new feature branch based on the changes
- Use kebab-case naming: `feature/description`, `fix/description`, or `docs/description`
- Branch name reflects what changed (analyze staged/unstaged files)

**If on a feature branch:**
- Stay on the current branch
- Continue with commit

### Step 2: Stage Changes

Stage all changes:
```bash
git add .
```

Check what will be committed:
```bash
git status
```

**If no changes to commit:**
- Report "No changes to commit" and exit

### Step 3: Generate Commit Message

Analyze the staged changes and generate a commit message following conventional commit format:

**Format**: `<type>(<scope>): <description>`

**Types**:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Formatting, missing semicolons, etc.
- `refactor`: Code restructuring without behavior change
- `test`: Adding or updating tests
- `chore`: Maintenance tasks, dependencies

**Examples**:
- `feat(api): add quotes endpoint with pagination`
- `fix(frontend): resolve episode cache invalidation bug`
- `docs(readme): update installation instructions`

### Step 4: Commit

Execute the commit with the generated message:
```bash
git commit -m "<generated message>"
```

### Step 5: Push to Remote

Push the branch, setting upstream if needed:
```bash
git push -u origin $(git branch --show-current)
```

### Step 6: Create Pull Request

Use GitHub CLI to create a PR:
```bash
gh pr create --title "<commit message>" --body "<detailed description>"
```

**PR Body includes**:
- Summary of changes
- Files modified
- Any testing notes
- Related issues (if detectable from branch name or commit)

## Error Handling

- **gh CLI not authenticated**: Prompt user to run `gh auth login`
- **No remote configured**: Report error and provide guidance
- **Merge conflicts**: Report and don't proceed with PR creation
- **Push rejected**: Suggest `git pull --rebase` first

## Safety Checks

1. Never force push
2. Always confirm before creating PR from main branch (expected to be rare)
3. Verify gh CLI is available before PR creation step

## Output

Report each step's result:
- ✅ Branch: `feature/add-quotes-endpoint` (created/existing)
- ✅ Staged: 3 files
- ✅ Committed: `feat(api): add quotes endpoint`
- ✅ Pushed: to origin/feature/add-quotes-endpoint
- ✅ PR Created: https://github.com/owner/repo/pull/123
