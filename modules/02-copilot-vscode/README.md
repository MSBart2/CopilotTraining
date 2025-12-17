# Module 2: Copilot in Visual Studio Code

## 📖 Overview

This module provides a comprehensive guide to using GitHub Copilot in Visual Studio Code, the most popular IDE for Copilot users. Learn about code completions, chat features, inline editing, and advanced VS Code-specific capabilities.

## 🎯 Learning Objectives

- Master code completion features in VS Code
- Use Copilot Chat effectively
- Leverage inline chat for quick edits
- Understand slash commands and agents
- Configure Copilot settings in VS Code
- Use Copilot for debugging and testing

## 📚 Content

### VS Code Extensions

Two essential extensions for full Copilot functionality:

1. **GitHub Copilot** - Code completions and suggestions
2. **GitHub Copilot Chat** - Conversational AI assistant

**Installation:**
```
1. Open VS Code Extensions (Ctrl+Shift+X / Cmd+Shift+X)
2. Search "GitHub Copilot"
3. Install both extensions
4. Reload VS Code
5. Sign in with GitHub account
```

**📖 Official Documentation:**
- [Getting started with GitHub Copilot in VS Code](https://docs.github.com/en/copilot/using-github-copilot/getting-started-with-github-copilot?tool=vscode)
- [GitHub Copilot in VS Code](https://code.visualstudio.com/docs/copilot/overview)

### Code Completions

**Inline Suggestions:**
- Appear as gray "ghost text" while typing
- Accept: `Tab`
- Reject: `Esc` or keep typing
- Next suggestion: `Alt+]` or `Option+]`
- Previous suggestion: `Alt+[` or `Option+[`
- Open completions panel: `Ctrl+Enter` / `Cmd+Enter`

**Best Practices for Completions:**
- Write clear, descriptive comments
- Use meaningful variable names
- Keep context files open
- Accept partial suggestions with `Ctrl+Right Arrow`

**📖 Official Documentation:**
- [Getting code suggestions in your IDE](https://docs.github.com/en/copilot/using-github-copilot/getting-code-suggestions-in-your-ide-with-github-copilot)

### Copilot Chat

**Opening Chat:**
- Chat sidebar: `Ctrl+Shift+I` / `Cmd+Shift+I`
- Quick Chat: `Ctrl+Shift+Alt+I` / `Cmd+Shift+Option+I`
- Inline Chat: `Ctrl+I` / `Cmd+I` (in editor)

**Chat Features:**
- Ask questions about code
- Generate new code
- Explain existing code
- Debug and fix errors
- Write tests
- Refactor code

**📖 Official Documentation:**
- [Using GitHub Copilot Chat in your IDE](https://docs.github.com/en/copilot/using-github-copilot/asking-github-copilot-questions-in-your-ide)

### Slash Commands

Slash commands provide quick access to common tasks:

- `/explain` - Explain selected code
- `/fix` - Suggest fixes for problems
- `/tests` - Generate unit tests
- `/help` - Show available commands
- `/clear` - Clear chat history
- `/doc` - Generate documentation
- `/optimize` - Optimize code performance
- `/simplify` - Simplify complex code

**Usage Example:**
```
Select code → Open Chat → Type: /tests
```

**📖 Official Documentation:**
- [Using chat participants and slash commands](https://docs.github.com/en/copilot/using-github-copilot/asking-github-copilot-questions-in-your-ide#using-keywords-in-your-prompts)

### Chat Participants (Agents)

Specialized agents for specific contexts:

- `@workspace` - Questions about your workspace/codebase
- `@vscode` - VS Code editor questions
- `@terminal` - Terminal and command-line help
- `@github` - GitHub-specific questions (Enterprise)

**Example Usage:**
```
@workspace Where is the user authentication implemented?
@vscode How do I configure keyboard shortcuts?
@terminal How do I find large files in current directory?
```

**📖 Official Documentation:**
- [Using chat participants](https://code.visualstudio.com/docs/copilot/copilot-chat#_chat-participants)
- [GitHub Copilot extensibility](https://code.visualstudio.com/api/extension-guides/chat)

### Inline Chat

Quick code edits directly in the editor:

**Keyboard Shortcut:** `Ctrl+I` / `Cmd+I`

**Use Cases:**
- Quick refactoring
- Add error handling
- Convert code style
- Add comments
- Fix issues

**Example Prompts:**
- "Add error handling to this function"
- "Convert this to async/await"
- "Add JSDoc comments"
- "Rename variables to be more descriptive"

**📖 Official Documentation:**
- [Inline chat in VS Code](https://code.visualstudio.com/docs/copilot/copilot-chat#_inline-chat)

### Copilot Edits (Multi-file Editing)

Make changes across multiple files simultaneously:

**Opening Copilot Edits:**
- Click "Open Copilot Edits" in the Copilot menu
- Or use Command Palette: "GitHub Copilot: Open Copilot Edits"

**Features:**
- Add multiple files to working set
- Make coordinated changes across files
- Review all changes before accepting
- Undo/redo across all files

**Use Cases:**
- Refactor function signatures used in multiple files
- Update API endpoints across frontend and backend
- Rename classes/interfaces throughout codebase
- Add consistent error handling

**📖 Official Documentation:**
- [Multi-file editing with Copilot](https://code.visualstudio.com/docs/copilot/copilot-edits)

### Settings and Configuration

**Accessing Settings:**
```
File → Preferences → Settings → Search "Copilot"
```

**Key Settings:**
- Enable/disable inline suggestions
- Enable/disable Copilot for specific languages
- Configure suggestion delay
- Set suggestion appearance

**Settings JSON:**
```json
{
  "github.copilot.enable": {
    "*": true,
    "markdown": false
  },
  "github.copilot.editor.enableAutoCompletions": true
}
```

**📖 Official Documentation:**
- [Configuring GitHub Copilot in your environment](https://docs.github.com/en/copilot/managing-copilot/configure-personal-settings/configuring-github-copilot-in-your-environment)

## 🔨 Exercises

### Exercise 1: Code Completion Mastery

**Objective**: Practice using code completions effectively.

**Steps:**
1. Create a new file `data-processor.js`
2. Write a comment: `// class to process and validate user data`
3. Accept the class suggestion
4. Add comment: `// method to validate email format`
5. Use Alt+] to cycle through suggestions
6. Accept the best one

**Challenge:**
Create a complete class with:
- Constructor with parameters
- At least 3 methods
- Error handling
- Input validation

**📖 Reference:**
- [Code completions documentation](https://docs.github.com/en/copilot/using-github-copilot/getting-code-suggestions-in-your-ide-with-github-copilot)

### Exercise 2: Chat Interface Practice

**Objective**: Master the Copilot Chat sidebar.

**Steps:**
1. Open Chat sidebar (`Ctrl+Shift+I`)
2. Ask: "What are React hooks?"
3. Ask: "Generate a custom React hook for fetching data"
4. Copy the code to a new file
5. Ask follow-up: "Add error handling and loading states"

**Additional Prompts:**
- "Explain the difference between Promise.all and Promise.race"
- "Show me how to implement a binary search in Python"
- "What are the SOLID principles?"

**📖 Reference:**
- [Asking GitHub Copilot questions](https://docs.github.com/en/copilot/using-github-copilot/asking-github-copilot-questions-in-your-ide)

### Exercise 3: Slash Commands

**Objective**: Use slash commands for common tasks.

**Steps:**
1. Create a function with intentional issues:
   ```javascript
   function processData(data) {
       let result = data.map(x => x * 2)
       return result
   }
   ```
2. Select the code
3. Open chat and use `/explain`
4. Use `/fix` to identify improvements
5. Use `/tests` to generate unit tests
6. Use `/doc` to add documentation

**Challenges:**
- Use `/optimize` on a slow algorithm
- Use `/simplify` on complex nested logic

**📖 Reference:**
- [Slash commands guide](https://code.visualstudio.com/docs/copilot/copilot-chat#_slash-commands)

### Exercise 4: Inline Chat Editing

**Objective**: Practice quick edits with inline chat.

**Steps:**
1. Create a simple synchronous function:
   ```javascript
   function fetchUser(id) {
       const response = fetch(`/api/users/${id}`)
       return response.json()
   }
   ```
2. Select the function
3. Press `Ctrl+I` / `Cmd+I`
4. Type: "Convert to async/await and add error handling"
5. Review and accept changes

**More Prompts to Try:**
- "Add TypeScript types"
- "Add input validation"
- "Add detailed comments"
- "Refactor to use arrow function"

**📖 Reference:**
- [Inline chat documentation](https://code.visualstudio.com/docs/copilot/copilot-chat#_inline-chat)

### Exercise 5: Chat Participants

**Objective**: Learn to use specialized chat agents.

**Steps:**
1. Open a project with multiple files
2. Open Chat and type: `@workspace Explain the architecture`
3. Ask: `@workspace Where is error handling implemented?`
4. Ask: `@vscode How do I split the editor vertically?`
5. Ask: `@terminal Command to find all .js files modified today`

**Exploration:**
- `@workspace Find all TODO comments`
- `@workspace How is authentication implemented?`
- `@vscode How do I set up debugging?`

**📖 Reference:**
- [Chat participants documentation](https://code.visualstudio.com/docs/copilot/copilot-chat#_chat-participants)

### Exercise 6: Multi-file Editing

**Objective**: Use Copilot Edits for cross-file changes.

**Steps:**
1. Create a small project:
   - `user.js` - User class
   - `userService.js` - Service using User
   - `userController.js` - Controller using UserService
2. Open Copilot Edits
3. Add all three files to the working set
4. Request: "Add email validation to User class and update all usages"
5. Review changes across all files
6. Accept or modify as needed

**📖 Reference:**
- [Copilot Edits documentation](https://code.visualstudio.com/docs/copilot/copilot-edits)

### Exercise 7: Test Generation

**Objective**: Generate comprehensive tests with Copilot.

**Steps:**
1. Create a module with functions:
   ```javascript
   // utils.js
   export function calculateTax(amount, rate) {
       return amount * rate;
   }
   
   export function formatCurrency(amount) {
       return `$${amount.toFixed(2)}`;
   }
   ```
2. Create `utils.test.js`
3. Use chat: `/tests for utils.js`
4. Review and refine the generated tests
5. Ask for edge cases: "Add tests for edge cases"

**📖 Reference:**
- [Test generation with Copilot](https://docs.github.com/en/copilot/using-github-copilot/asking-github-copilot-questions-in-your-ide)

## 📝 Key Takeaways

- VS Code offers the most comprehensive Copilot experience
- Inline suggestions, chat, and inline edits serve different purposes
- Slash commands provide quick access to common tasks
- Chat participants (@workspace, @vscode, @terminal) offer context-specific help
- Multi-file editing enables coordinated changes across codebases
- Configuration options allow customization of Copilot behavior

## ➡️ Next Steps

Continue to [Module 3: Copilot on the Web](../03-copilot-web/README.md) to learn about using Copilot directly on GitHub.com.

## 🔗 Additional Resources

- [VS Code Copilot Documentation](https://code.visualstudio.com/docs/copilot/overview)
- [GitHub Copilot in VS Code official docs](https://docs.github.com/en/copilot/using-github-copilot/getting-started-with-github-copilot?tool=vscode)
- [VS Code Copilot Chat Tutorial](https://code.visualstudio.com/docs/copilot/copilot-chat)
- [Copilot Tips and Tricks Video](https://www.youtube.com/watch?v=hPVatUSvZq0)
