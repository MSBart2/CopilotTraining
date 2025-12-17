# Module 6: Advanced Features and New Capabilities

## 📖 Overview

This module explores cutting-edge GitHub Copilot features including Copilot Workspace, background agents, working trees, multi-file editing, code review assistance, and other advanced capabilities. Learn how to leverage these tools for complex development workflows.

## 🎯 Learning Objectives

- Understand GitHub Copilot Workspace and its capabilities
- Use background agents for automated tasks
- Work with Copilot Edits and working trees
- Leverage multi-file code changes
- Use Copilot for code reviews and pull requests
- Explore Copilot Extensions and customization
- Master advanced prompting techniques

## 📚 Content

### GitHub Copilot Workspace

**What is Copilot Workspace?**

Copilot Workspace is a development environment that combines natural language planning, code generation, and execution in an integrated experience. It's designed for tackling issues and features from concept to implementation.

**Key Features:**
- Natural language issue specification
- Automated implementation planning
- Multi-file code generation
- Integrated terminal and testing
- Collaboration features

**Access:**
- Available for GitHub Copilot Enterprise users
- Access via GitHub.com
- Integrated with Issues and Pull Requests

**Workflow:**
1. Start from a GitHub Issue
2. Describe what you want to build
3. Review generated plan
4. Execute implementation
5. Test and iterate
6. Create pull request

**📖 Official Documentation:**
- [GitHub Copilot Workspace](https://githubnext.com/projects/copilot-workspace)
- [GitHub Next Projects](https://githubnext.com/)
- [Copilot Workspace announcement](https://github.blog/2024-04-29-github-copilot-workspace/)

### Background Agents

**What are Background Agents?**

Background agents are AI assistants that work autonomously in the background while you code, performing tasks like:
- Code analysis and suggestions
- Security scanning
- Test generation
- Documentation updates
- Refactoring opportunities

**Types of Background Work:**
- **Continuous Analysis**: Ongoing code quality checks
- **Proactive Suggestions**: Improvements without explicit prompts
- **Contextual Learning**: Adapts to your codebase patterns
- **Automated Tasks**: Tests, docs, cleanup

**How They Work:**
- Monitor your codebase continuously
- Analyze patterns and potential issues
- Suggest improvements at appropriate times
- Work alongside your active development

**Example Use Cases:**
- Suggesting missing tests for new functions
- Identifying security vulnerabilities
- Recommending performance optimizations
- Flagging outdated dependencies
- Finding code duplication

**📖 Official Documentation:**
- [GitHub Copilot Enterprise features](https://docs.github.com/en/copilot/github-copilot-enterprise)
- [Proactive Copilot suggestions](https://github.blog/2024-07-29-github-copilot-chat-evolves-from-assistant-to-collaborator/)

### Copilot Edits and Working Trees

**Copilot Edits:**

A feature that enables coordinated multi-file changes with AI assistance.

**Key Capabilities:**
- Add multiple files to a working set
- Make coordinated changes across files
- Review all changes before applying
- Undo/redo across the entire working set
- Maintain consistency across files

**Opening Copilot Edits:**
- VS Code: Click Copilot icon → "Open Copilot Edits"
- Command Palette: "GitHub Copilot: Open Copilot Edits"
- Keyboard shortcut (configurable)

**Workflow:**
1. Open Copilot Edits panel
2. Add files to working set
3. Describe desired changes
4. Review generated changes
5. Accept, reject, or modify
6. Apply to codebase

**Working Set Management:**
- Add files manually
- Auto-detect related files
- Remove files from set
- Save working sets for later

**📖 Official Documentation:**
- [Multi-file editing with Copilot](https://code.visualstudio.com/docs/copilot/copilot-edits)
- [Copilot Edits announcement](https://code.visualstudio.com/updates/v1_86#_copilot-edits)

### Multi-File Code Changes

**Use Cases for Multi-File Changes:**

**1. Refactoring:**
- Rename classes/interfaces used across files
- Change function signatures
- Extract shared logic
- Reorganize code structure

**2. Feature Implementation:**
- Add new endpoints (API + controller + service)
- Implement across layers (frontend + backend)
- Update related tests

**3. API Changes:**
- Modify interface contracts
- Update all implementations
- Adjust consumers
- Update documentation

**4. Consistency Updates:**
- Apply coding standards
- Update error handling patterns
- Standardize logging
- Fix similar issues across files

**Best Practices:**
- Start with a clear description
- Review changes carefully
- Test after applying
- Commit frequently
- Use version control

**Example Prompt:**
```
Add authentication middleware to all API routes:
- Create middleware in auth.js
- Apply to routes in app.js
- Update tests in api.test.js
- Add error handling
```

**📖 Official Documentation:**
- [Working with multiple files](https://code.visualstudio.com/docs/copilot/copilot-edits)

### Code Review with Copilot

**PR Summaries (Enterprise):**

Automatically generate comprehensive pull request descriptions.

**What's Generated:**
- Overview of changes
- File-by-file breakdown
- Key modifications
- Testing notes
- Breaking changes
- Migration guide (if needed)

**How to Use:**
1. Create pull request
2. Click "Generate" with Copilot icon
3. Review and edit summary
4. Publish PR

**Review Assistance:**

Copilot helps reviewers understand changes:
- Explain code modifications
- Identify potential issues
- Suggest improvements
- Answer questions about changes

**For Reviewers:**
- Click on code sections
- Ask Copilot questions
- Get context and explanations
- Identify edge cases

**For Authors:**
- Use Copilot to self-review
- Generate test cases
- Add documentation
- Address feedback

**📖 Official Documentation:**
- [Copilot pull request summaries](https://docs.github.com/en/copilot/github-copilot-enterprise/copilot-pull-request-summaries)
- [Using Copilot in code reviews](https://docs.github.com/en/copilot/using-github-copilot/using-github-copilot-on-githubcom)

### Copilot Extensions

**What are Copilot Extensions?**

Extend Copilot's capabilities with third-party integrations and custom agents.

**Types of Extensions:**
- **Tool Integrations**: Connect to external services
- **Custom Agents**: Specialized AI assistants
- **Language-Specific**: Enhanced support for specific languages
- **Framework Helpers**: Framework-specific assistance

**Popular Extensions:**
- Docker (container management)
- Azure (cloud services)
- Database tools (SQL generation)
- Testing frameworks (test generation)

**Creating Custom Extensions:**
- Use GitHub Copilot SDK
- Define custom prompts
- Integrate with APIs
- Deploy as VS Code extension

**📖 Official Documentation:**
- [GitHub Copilot Extensions](https://docs.github.com/en/copilot/using-github-copilot/using-extensions-to-integrate-external-tools-with-copilot-chat)
- [Building Copilot Extensions](https://docs.github.com/en/copilot/building-copilot-extensions)
- [Copilot extensibility overview](https://code.visualstudio.com/api/extension-guides/chat)

### Knowledge Bases (Enterprise)

**Custom Knowledge for Copilot:**

Enterprise feature allowing organizations to provide custom context to Copilot.

**What You Can Add:**
- Internal documentation
- API specifications
- Architecture guides
- Coding standards
- Best practices
- Company-specific libraries

**Benefits:**
- Copilot understands your systems
- Suggestions follow company standards
- Generates compliant code
- References internal docs

**Setup:**
- Organization administrators configure
- Add documentation repositories
- Copilot indexes content
- Available to all users

**📖 Official Documentation:**
- [GitHub Copilot Enterprise knowledge bases](https://docs.github.com/en/copilot/github-copilot-enterprise/copilot-knowledge-bases)
- [Managing knowledge bases](https://docs.github.com/en/copilot/managing-copilot/managing-github-copilot-in-your-organization/enhancing-copilot-for-your-organization)

### Advanced Prompting Techniques

**Context Setting:**
```
Given a REST API using Express.js and MongoDB,
create authentication middleware with JWT tokens.
Include error handling and input validation.
```

**Iterative Refinement:**
```
1. "Create a user service"
2. "Add email validation"
3. "Add password hashing with bcrypt"
4. "Add error handling for database failures"
```

**Specific Constraints:**
```
Write a Python function to parse CSV files.
Requirements:
- Handle large files (>1GB)
- Use streaming
- Validate data types
- Include error handling
- Add type hints
```

**Style Guidelines:**
```
Refactor this code following these rules:
- Use async/await (no callbacks)
- Add JSDoc comments
- Extract functions < 20 lines
- Use const/let (no var)
```

**Testing Focus:**
```
Create unit tests for this function:
- Test happy path
- Test edge cases (empty, null, undefined)
- Test error conditions
- Mock external dependencies
- Aim for 100% coverage
```

**Documentation:**
```
Add documentation to this class:
- JSDoc/docstring for all public methods
- Parameter descriptions with types
- Return value descriptions
- Usage examples
- Note any side effects
```

**📖 Official Documentation:**
- [Best practices for prompt crafting](https://docs.github.com/en/copilot/using-github-copilot/prompt-engineering-for-github-copilot)
- [Getting better suggestions](https://docs.github.com/en/copilot/using-github-copilot/getting-started-with-github-copilot)

### Fine-tuned Models (Enterprise)

**Custom Model Training:**

Enterprise organizations can fine-tune Copilot on their codebase.

**Benefits:**
- Better suggestions for internal code
- Understands company patterns
- Follows organizational standards
- Improved accuracy

**Process:**
1. Organization opts in
2. Codebase analysis
3. Model fine-tuning
4. Deployment to users
5. Continuous improvement

**Privacy:**
- Data stays within organization
- No sharing with other customers
- Controlled by administrators

**📖 Official Documentation:**
- [GitHub Copilot Enterprise overview](https://docs.github.com/en/copilot/github-copilot-enterprise)
- [Copilot for Business vs Enterprise](https://docs.github.com/en/copilot/about-github-copilot/subscription-plans-for-github-copilot)

## 🔨 Exercises

### Exercise 1: Copilot Workspace Exploration

**Objective**: Experience Copilot Workspace (if available).

**Steps:**
1. Access Copilot Workspace (Enterprise users)
2. Create or select an issue
3. Describe implementation in natural language
4. Review generated plan
5. Execute and iterate
6. Create pull request

**If Not Available:**
- Read documentation
- Watch demo videos
- Plan how you'd use it

**📖 Reference:**
- [Copilot Workspace documentation](https://githubnext.com/projects/copilot-workspace)

### Exercise 2: Multi-File Refactoring

**Objective**: Practice coordinated multi-file changes.

**Setup:**
Create a simple project:
```javascript
// user.js
class User {
  constructor(name) {
    this.name = name;
  }
}

// userService.js
function createUser(name) {
  return new User(name);
}

// userController.js
function handleCreateUser(req, res) {
  const user = createUser(req.body.name);
  res.json(user);
}
```

**Task:**
Use Copilot Edits to:
1. Add email parameter to User
2. Update createUser function
3. Update controller
4. Add validation
5. Update all related code

**📖 Reference:**
- [Multi-file editing](https://code.visualstudio.com/docs/copilot/copilot-edits)

### Exercise 3: PR Summary Generation

**Objective**: Generate comprehensive PR descriptions.

**Steps:**
1. Make meaningful code changes
2. Create pull request
3. Use Copilot to generate summary (Enterprise)
4. Review and refine
5. Publish

**Manual Alternative:**
- Use Copilot Chat: "Generate PR description for these changes"
- Paste git diff
- Get summary

**Compare:**
- Manual description vs Copilot-generated
- Completeness
- Clarity
- Time saved

**📖 Reference:**
- [PR summaries](https://docs.github.com/en/copilot/github-copilot-enterprise/copilot-pull-request-summaries)

### Exercise 4: Advanced Prompting

**Objective**: Master complex prompting techniques.

**Scenario 1 - Detailed Requirements:**
```
Create a caching layer for API responses:
- Use Redis for storage
- Implement TTL (time to live)
- Handle cache misses gracefully
- Add cache invalidation on updates
- Include metrics/logging
- Write unit tests
```

**Scenario 2 - Style Constraints:**
```
Refactor this code to:
- Use functional programming style
- Avoid mutations
- Use composition over inheritance
- Add comprehensive error handling
- Follow SOLID principles
```

**Scenario 3 - Testing Focus:**
```
Generate tests for authentication flow:
- Happy path: valid credentials
- Invalid email format
- Wrong password
- Account locked
- Rate limiting
- Concurrent requests
```

**📖 Reference:**
- [Prompt engineering guide](https://docs.github.com/en/copilot/using-github-copilot/prompt-engineering-for-github-copilot)

### Exercise 5: Code Review Assistance

**Objective**: Use Copilot for thorough code reviews.

**Setup:**
1. Find a pull request (yours or teammate's)
2. Open in review mode

**Use Copilot to:**
1. Explain overall changes
2. Identify security issues
3. Suggest performance improvements
4. Check error handling
5. Verify test coverage
6. Review documentation

**Questions to Ask:**
- "What does this change do?"
- "Are there any security concerns?"
- "How does this affect performance?"
- "What edge cases might be missed?"
- "Is error handling complete?"

**📖 Reference:**
- [Code review with Copilot](https://docs.github.com/en/copilot/using-github-copilot/using-github-copilot-on-githubcom)

### Exercise 6: Working Set Management

**Objective**: Efficiently manage multi-file working sets.

**Tasks:**
1. Open Copilot Edits
2. Add related files:
   - Model/entity
   - Service layer
   - Controller
   - Tests
3. Make coordinated changes
4. Review all changes
5. Apply incrementally

**Best Practices:**
- Group logically related files
- Review before applying
- Test after each application
- Commit frequently

**📖 Reference:**
- [Copilot Edits documentation](https://code.visualstudio.com/docs/copilot/copilot-edits)

### Exercise 7: Extension Exploration

**Objective**: Discover and use Copilot extensions.

**Steps:**
1. Browse available extensions
2. Install relevant extensions
3. Test features
4. Compare with base Copilot
5. Evaluate usefulness

**Extensions to Try:**
- GitHub (Enterprise features)
- Docker (container help)
- Database extensions
- Cloud provider tools

**Evaluation:**
- Does it solve real problems?
- Integration quality?
- Performance impact?
- Would you keep it?

**📖 Reference:**
- [Copilot Extensions](https://docs.github.com/en/copilot/using-github-copilot/using-extensions-to-integrate-external-tools-with-copilot-chat)

## 📝 Key Takeaways

- Copilot Workspace provides end-to-end development flows
- Background agents work proactively on your codebase
- Multi-file editing enables coordinated changes
- Working trees maintain context across files
- Code review features improve PR quality
- Advanced prompting yields better results
- Enterprise features add organization-specific capabilities
- Extensions expand Copilot's functionality

## ➡️ Next Steps

Continue to [Module 7: Best Practices and Real-World Applications](../07-best-practices/README.md) to learn effective patterns and techniques for maximizing Copilot productivity.

## 🔗 Additional Resources

- [GitHub Copilot Workspace](https://githubnext.com/projects/copilot-workspace)
- [GitHub Copilot Enterprise](https://docs.github.com/en/copilot/github-copilot-enterprise)
- [Multi-file editing](https://code.visualstudio.com/docs/copilot/copilot-edits)
- [Copilot Extensions](https://docs.github.com/en/copilot/building-copilot-extensions)
- [PR summaries](https://docs.github.com/en/copilot/github-copilot-enterprise/copilot-pull-request-summaries)
- [Prompt engineering](https://docs.github.com/en/copilot/using-github-copilot/prompt-engineering-for-github-copilot)
- [GitHub Next](https://githubnext.com/)
