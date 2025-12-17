# Module 5: Copilot in Other IDEs

## 📖 Overview

While Visual Studio Code is popular for GitHub Copilot, it's available across many development environments. This module covers using Copilot in JetBrains IDEs, Visual Studio, Neovim, and other supported editors, with platform-specific features and configurations.

## 🎯 Learning Objectives

- Install and configure Copilot in JetBrains IDEs
- Use Copilot in Visual Studio (Windows/Mac)
- Set up Copilot in Neovim
- Understand platform-specific features and limitations
- Compare Copilot experience across different IDEs
- Choose the best environment for your workflow

## 📚 Content

### JetBrains IDEs

**Supported IDEs:**
- IntelliJ IDEA (Ultimate and Community)
- PyCharm (Professional and Community)
- WebStorm
- PhpStorm
- GoLand
- RubyMine
- CLion
- Rider
- Android Studio
- DataGrip
- AppCode

**📖 Official Documentation:**
- [GitHub Copilot in JetBrains IDEs](https://docs.github.com/en/copilot/managing-copilot/configure-personal-settings/installing-the-github-copilot-extension-in-your-environment?tool=jetbrains)
- [JetBrains Copilot Plugin](https://plugins.jetbrains.com/plugin/17718-github-copilot)

#### Installation (JetBrains)

**Method 1: Via IDE**
1. Open your JetBrains IDE
2. Go to Settings/Preferences (Ctrl+Alt+S / Cmd+,)
3. Navigate to Plugins
4. Search "GitHub Copilot"
5. Click Install
6. Restart IDE
7. Sign in with GitHub account

**Method 2: Via Marketplace**
1. Visit [JetBrains Marketplace](https://plugins.jetbrains.com/plugin/17718-github-copilot)
2. Click "Install to IDE"
3. Follow prompts

**Verification:**
- Tools → GitHub Copilot → Check Status
- Look for Copilot icon in status bar

**📖 Reference:**
- [Installing in JetBrains IDEs](https://docs.github.com/en/copilot/managing-copilot/configure-personal-settings/installing-the-github-copilot-extension-in-your-environment?tool=jetbrains)

#### Using Copilot in JetBrains

**Code Completions:**
- Suggestions appear automatically as ghost text
- Accept: `Tab`
- Reject: `Esc`
- Next suggestion: `Alt+]` / `Option+]`
- Previous: `Alt+[` / `Option+[`
- View all: `Alt+\` / `Option+\`

**Copilot Chat:**
- Open: Tools → GitHub Copilot → Copilot Chat
- Or keyboard shortcut (configurable)
- Chat in dedicated tool window
- Context from current file

**Features:**
- Code completions
- Chat assistance
- Code explanations
- Refactoring suggestions
- Test generation

**Settings:**
- Settings/Preferences → Tools → GitHub Copilot
- Enable/disable suggestions
- Configure keyboard shortcuts
- Set completion behavior

**📖 Reference:**
- [Getting code suggestions in JetBrains](https://docs.github.com/en/copilot/using-github-copilot/getting-code-suggestions-in-your-ide-with-github-copilot?tool=jetbrains)

### Visual Studio

**Supported Versions:**
- Visual Studio 2022 (17.4+)
- Visual Studio 2019 (16.11+)
- Visual Studio for Mac

**Editions:**
- Community
- Professional
- Enterprise

**📖 Official Documentation:**
- [GitHub Copilot in Visual Studio](https://docs.github.com/en/copilot/managing-copilot/configure-personal-settings/installing-the-github-copilot-extension-in-your-environment?tool=visualstudio)
- [Visual Studio Copilot extension](https://marketplace.visualstudio.com/items?itemName=GitHub.copilotvs)

#### Installation (Visual Studio)

**Visual Studio 2022:**
1. Open Visual Studio
2. Go to Extensions → Manage Extensions
3. Search "GitHub Copilot"
4. Download and install
5. Restart Visual Studio
6. Sign in: View → GitHub Copilot → Sign In

**Visual Studio for Mac:**
1. Open Visual Studio
2. Extensions → Gallery
3. Search "GitHub Copilot"
4. Install and restart

**📖 Reference:**
- [Installing in Visual Studio](https://docs.github.com/en/copilot/managing-copilot/configure-personal-settings/installing-the-github-copilot-extension-in-your-environment?tool=visualstudio)

#### Using Copilot in Visual Studio

**Code Completions:**
- Automatic inline suggestions
- Accept: `Tab`
- Reject: `Esc`
- Cycle suggestions: `Alt+.` (next), `Alt+,` (previous)
- View all: `Alt+/`

**Copilot Chat:**
- View → GitHub Copilot Chat
- Ask questions, generate code
- Explain selected code
- Generate tests

**Features:**
- IntelliSense integration
- Code completions
- Chat interface
- Slash commands
- Solution-wide context

**Slash Commands in Visual Studio:**
- `/explain` - Explain code
- `/fix` - Fix issues
- `/tests` - Generate tests
- `/doc` - Generate documentation
- `/optimize` - Optimize code

**Settings:**
- Tools → Options → GitHub Copilot
- Enable/disable features
- Configure behavior
- Set keyboard shortcuts

**📖 Reference:**
- [Using Copilot in Visual Studio](https://docs.github.com/en/copilot/using-github-copilot/getting-code-suggestions-in-your-ide-with-github-copilot?tool=visualstudio)

### Neovim

**Requirements:**
- Neovim 0.6+
- Node.js 18+
- Plugin manager (packer, lazy.nvim, etc.)

**📖 Official Documentation:**
- [GitHub Copilot for Neovim](https://github.com/github/copilot.vim)
- [Neovim documentation](https://neovim.io/doc/)

#### Installation (Neovim)

**Using vim-plug:**
```vim
" In init.vim or init.lua
Plug 'github/copilot.vim'
```

**Using packer:**
```lua
-- In packer config
use 'github/copilot.vim'
```

**Using lazy.nvim:**
```lua
{
  'github/copilot.vim',
  event = 'InsertEnter',
}
```

**Setup:**
1. Install plugin via plugin manager
2. Restart Neovim
3. Run `:Copilot setup`
4. Follow authentication prompts
5. Verify: `:Copilot status`

**📖 Reference:**
- [Copilot.vim repository](https://github.com/github/copilot.vim)

#### Using Copilot in Neovim

**Keybindings (default):**
- Accept suggestion: `<Tab>` (in insert mode)
- Dismiss: `<Esc>`
- Next suggestion: `Alt+]`
- Previous suggestion: `Alt+[`
- Accept word: `<C-Right>`
- Accept line: `<C-Down>`

**Commands:**
- `:Copilot` - Main command
- `:Copilot enable` - Enable Copilot
- `:Copilot disable` - Disable Copilot
- `:Copilot status` - Check status
- `:Copilot setup` - Run setup
- `:Copilot signout` - Sign out

**Configuration:**
```vim
" In init.vim
let g:copilot_enabled = v:true
let g:copilot_no_tab_map = v:true

" Custom keybindings
imap <silent><script><expr> <C-J> copilot#Accept("\<CR>")
```

```lua
-- In init.lua
vim.g.copilot_enabled = true
vim.g.copilot_no_tab_map = true

-- Custom keybindings
vim.api.nvim_set_keymap('i', '<C-J>', 'copilot#Accept("<CR>")', { 
  silent = true,
  expr = true 
})
```

**📖 Reference:**
- [Copilot.vim usage](https://github.com/github/copilot.vim#usage)

### Other Supported Editors

#### Azure Data Studio
- Install from Extensions marketplace
- Similar to VS Code experience
- SQL-focused assistance

**📖 Documentation:**
- [Azure Data Studio extensions](https://docs.microsoft.com/en-us/sql/azure-data-studio/extensions)

#### Eclipse
- Limited support via LSP (Language Server Protocol)
- Third-party plugins available
- Check Eclipse Marketplace

#### Emacs
- Via copilot.el package
- Community-maintained
- Requires Emacs 27.1+

**Repository:**
- [copilot.el](https://github.com/zerolfx/copilot.el)

#### Xcode
- Currently not officially supported
- Community exploring solutions
- Watch for updates

### Platform Comparison

| Feature | VS Code | JetBrains | Visual Studio | Neovim |
|---------|---------|-----------|---------------|---------|
| Code Completions | ✅ Full | ✅ Full | ✅ Full | ✅ Full |
| Chat Interface | ✅ Full | ✅ Full | ✅ Full | ⚠️ Limited |
| Inline Chat | ✅ Yes | ⚠️ Limited | ✅ Yes | ❌ No |
| Slash Commands | ✅ Yes | ⚠️ Limited | ✅ Yes | ❌ No |
| Multi-file Edit | ✅ Yes | ❌ No | ⚠️ Limited | ❌ No |
| @workspace | ✅ Yes | ❌ No | ✅ Yes | ❌ No |
| Setup Ease | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐ | ⭐ |

**Legend:**
- ✅ Full support
- ⚠️ Partial/Limited
- ❌ Not available
- ⭐ Ease rating (more stars = easier)

### Choosing Your IDE

**Choose VS Code if:**
- You want the most features
- Multi-file editing is important
- You use web technologies
- You prefer lightweight editors

**Choose JetBrains if:**
- You prefer powerful, specialized IDEs
- Language-specific features matter
- You work with Java, Python, Go, etc.
- You value deep code intelligence

**Choose Visual Studio if:**
- You develop .NET applications
- Windows development is primary
- Enterprise features are needed
- Visual Studio ecosystem is familiar

**Choose Neovim if:**
- Terminal-based workflow
- Keyboard-driven efficiency
- Customization is priority
- You're comfortable with Vim

## 🔨 Exercises

### Exercise 1: Multi-IDE Setup

**Objective**: Install Copilot in multiple IDEs.

**Steps:**
1. Install Copilot in your primary IDE
2. Install in at least one other IDE
3. Verify both installations
4. Sign in to each

**Comparison:**
- Note installation differences
- Compare UI/UX
- Test same code in both
- Identify preference

**📖 Reference:**
- [Installing in your environment](https://docs.github.com/en/copilot/managing-copilot/configure-personal-settings/installing-the-github-copilot-extension-in-your-environment)

### Exercise 2: JetBrains Features

**Objective**: Explore JetBrains-specific capabilities.

**Tasks (IntelliJ or PyCharm):**
1. Open a project
2. Create a new class/file
3. Use Copilot for code completion
4. Open Copilot Chat (Tools menu)
5. Ask about project structure
6. Generate tests for a class
7. Refactor with Copilot assistance

**Questions:**
- How does it integrate with IDE refactoring?
- Are suggestions language-aware?
- How's the chat experience?

**📖 Reference:**
- [JetBrains documentation](https://docs.github.com/en/copilot/using-github-copilot/getting-code-suggestions-in-your-ide-with-github-copilot?tool=jetbrains)

### Exercise 3: Visual Studio Integration

**Objective**: Use Copilot in Visual Studio.

**Tasks (Visual Studio 2022):**
1. Create a new C# project
2. Use Copilot for class creation
3. Open Copilot Chat window
4. Ask for design pattern implementation
5. Use `/tests` to generate unit tests
6. Try `/explain` on complex code

**C# Specific:**
- Generate async methods
- Create interfaces
- Implement LINQ queries
- Add exception handling

**📖 Reference:**
- [Visual Studio documentation](https://docs.github.com/en/copilot/using-github-copilot/getting-code-suggestions-in-your-ide-with-github-copilot?tool=visualstudio)

### Exercise 4: Neovim Workflow

**Objective**: Integrate Copilot into Neovim workflow.

**Setup:**
1. Install copilot.vim plugin
2. Configure keybindings
3. Customize settings
4. Test authentication

**Practice:**
1. Write a function with Copilot
2. Cycle through suggestions
3. Accept partial completions
4. Disable/enable as needed

**Customization:**
```lua
-- Try different configurations
vim.g.copilot_filetypes = {
  markdown = false,
  yaml = true,
}
```

**📖 Reference:**
- [Copilot.vim](https://github.com/github/copilot.vim)

### Exercise 5: Cross-IDE Project

**Objective**: Work on same project in different IDEs.

**Setup:**
1. Choose a small project
2. Open in VS Code
3. Open in JetBrains IDE
4. Open in Visual Studio (if applicable)

**Tasks:**
1. Add same feature in each IDE
2. Compare suggestion quality
3. Note workflow differences
4. Evaluate comfort level

**Metrics:**
- Speed of development
- Quality of suggestions
- Ease of use
- Preference

### Exercise 6: IDE-Specific Shortcuts

**Objective**: Master keyboard shortcuts for each IDE.

**Create Cheat Sheet:**

**VS Code:**
- Accept: `Tab`
- Next: `Alt+]`
- Inline chat: `Ctrl+I`
- Chat sidebar: `Ctrl+Shift+I`

**JetBrains:**
- Accept: `Tab`
- Next: `Alt+]`
- View all: `Alt+\`
- Chat: Tools menu

**Visual Studio:**
- Accept: `Tab`
- Next: `Alt+.`
- View all: `Alt+/`
- Chat: View menu

**Practice:**
- Use shortcuts instead of mouse
- Time yourself
- Track improvement

### Exercise 7: Configuration Management

**Objective**: Optimize settings in each IDE.

**VS Code:**
```json
{
  "github.copilot.enable": {
    "*": true,
    "markdown": false
  }
}
```

**JetBrains:**
- Settings → Tools → GitHub Copilot
- Configure per-language
- Set trigger delay

**Visual Studio:**
- Tools → Options → GitHub Copilot
- Adjust suggestion frequency
- Configure chat behavior

**Task:**
- Configure for your workflow
- Test different settings
- Document your preferences

## 📝 Key Takeaways

- GitHub Copilot supports many popular IDEs
- VS Code offers the most comprehensive feature set
- JetBrains provides excellent language-specific integration
- Visual Studio excels for .NET development
- Neovim offers terminal-based efficiency
- Choose IDE based on your workflow and language
- Core completion features consistent across platforms
- Advanced features vary by platform

## ➡️ Next Steps

Continue to [Module 6: Advanced Features and New Capabilities](../06-advanced-features/README.md) to learn about cutting-edge Copilot features like Workspace, background agents, and working trees.

## 🔗 Additional Resources

- [Installing Copilot in your environment](https://docs.github.com/en/copilot/managing-copilot/configure-personal-settings/installing-the-github-copilot-extension-in-your-environment)
- [JetBrains Copilot Plugin](https://plugins.jetbrains.com/plugin/17718-github-copilot)
- [Visual Studio Copilot Extension](https://marketplace.visualstudio.com/items?itemName=GitHub.copilotvs)
- [Copilot.vim Repository](https://github.com/github/copilot.vim)
- [VS Code Copilot Documentation](https://code.visualstudio.com/docs/copilot/overview)
