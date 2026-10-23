<!-- Reference implementation for Module 3, Exercise 3.3: Variable-Driven Prompts -->
<!-- This example demonstrates: Selection-based debugging with automatic context capture -->

---

name: debug-build
description: 'Analyze build failures with automatic context'
agent: 'ask'
tools: ['codebase']
argument-hint: 'Select error output in terminal before running'

---

Analyze this build failure for FanHub project.

## Captured Context

**Current file:** ${file}  
**File directory:** ${fileDirname}  
**Workspace root:** ${workspaceFolder}  
**Project:** FanHub TV show fan site

**Error output:**

```
${selection}
```

## Diagnostic Steps

### 1. Error Pattern Recognition

Identify the error category:

- **Dependency error**: Missing module, version conflict, install failure
- **Syntax error**: Invalid JavaScript/JSX, TypeScript type error
- **Build configuration**: Webpack, Docker, npm scripts issue
- **Environment error**: Missing env vars, wrong Node version, path issues
- **Runtime error**: Port conflicts, database connection, permission denied

### 2. Configuration Analysis

Check relevant configuration files based on error type:

**Docker issues** → Review:

- [docker-compose.yml](../../../../../fanhub/docker-compose.yml)
- [backend/Dockerfile](../../../../../fanhub/backend/Dockerfile)
- [frontend/Dockerfile](../../../../../fanhub/frontend/Dockerfile)

**Dependency issues** → Review:

- [package.json](../../../../../slides/package.json) (root)
- [backend/package.json](../../../../../fanhub/backend/package.json)
- [frontend/package.json](../../../../../fanhub/frontend/package.json)
- Look for version conflicts between dependencies

**Build script issues** → Review:

- npm scripts in package.json
- Build commands in docker-compose.yml
- CI/CD configuration if present

**Environment issues** → Check:

- Required environment variables
- .env.example vs actual .env
- Port assignments and conflicts

### 3. Architecture Compliance

Verify ${file} follows [ARCHITECTURE.md](../../docs/ARCHITECTURE.md) patterns:

- Correct file location and imports
- Following documented build process
- Using documented tech stack versions

### 4. Recent Changes Impact

Analyze what might have changed:

- Recent modifications to ${file}
- Related dependency updates
- Configuration file changes
- Environment variable updates

### 5. Common FanHub Build Issues

Check against known project-specific problems:

**Port conflicts**:

- Frontend default: 3000
- Backend default: 5000
- PostgreSQL: 5432
- Redis (if used): 6379

**Database connection**:

- PostgreSQL must start before backend
- Connection string format: `postgresql://user:password@host:port/database`
- Default credentials in docker-compose.yml

**Module resolution**:

- Backend uses CommonJS (require/module.exports)
- Frontend uses ES modules (import/export)
- No mixing module systems

**File paths**:

- Use forward slashes (/) not backslashes (\)
- Relative imports start from src/ root
- Docker volume paths must match host paths

## Output Format

### 🔍 Root Cause

```
The build is failing because [specific problem].
Located in: ${file} at line [X]
Error type: [category]
```

### 🔧 Fix

Provide exact commands or code changes:

**Quick fix** (immediate solution):

```bash
# Commands to run
cd ${workspaceFolder}
npm install [package]@[version]
```

**Code fix** (if applicable):

```javascript
// In ${file}, line X:
// Before:
[current code]

// After:
[fixed code]
```

**Configuration fix**:

```yaml
# In docker-compose.yml:
[updated configuration]
```

### 🛡️ Prevention

How to avoid this in the future:

- Lock dependency versions in package.json
- Document environment requirements
- Add validation scripts
- Update ARCHITECTURE.md with learnings

### ✅ Verification

Steps to confirm the fix works:

```bash
# 1. Clean slate
docker-compose down -v
rm -rf node_modules

# 2. Rebuild
docker-compose build

# 3. Start
docker-compose up

# 4. Verify
# [Specific checks to confirm it works]
```

### 🔗 Related Files to Review

Based on the error, you may also need to check:

- [File 1] - [Why it's relevant]
- [File 2] - [Why it's relevant]

### 📊 Impact Assessment

- **Severity**: Critical/High/Medium/Low
- **Affected**: Frontend/Backend/Database/All
- **Deployment risk**: Can this break production?
- **Time to fix**: Estimated minutes

## Additional Context

If more information is needed, ask about:

- Recent changes (git log)
- Environment details (Node version, OS)
- Previous working state (when did it last build?)
- Other developers experiencing same issue?
