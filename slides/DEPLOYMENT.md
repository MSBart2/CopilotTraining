# GitHub Pages Deployment Setup

This document explains how to enable and use the GitHub Pages deployment for CopilotTraining slide presentations.

## 🚀 Quick Setup

### 1. Enable GitHub Pages

1. Go to your repository **Settings** → **Pages**
2. Under **Source**, select **GitHub Actions**
3. Save the changes

That's it! The workflow is already configured and will deploy automatically.

### 2. Trigger Deployment

The workflow automatically runs when:
- You push changes to the `main` branch that affect files in `slides/**`
- You push changes to `.github/workflows/deploy-slides.yml`
- You manually trigger it from the Actions tab

### 3. Access Your Slides

After deployment completes (usually 2-3 minutes), your slides will be available at:

```
https://<username>.github.io/<repository-name>/
```

For this repository:
```
https://MSBart2.github.io/CopilotTraining/
```

---

## 📋 What Gets Deployed

The deployment includes:

### Homepage (`index.html`)
- **Workshop Modules** (Module 0-12): Progressive training modules
- **Executive Talks**: Strategic briefings for leadership
- **Tech Talks**: Technical deep-dives for practitioners

### Individual Presentations
Each `.md` file in the `slides/` directory (except `README.md` and `GLOBAL-LAYERS.md`) is built as a standalone Slidev presentation:

- `00-orientation.md` → `/00-orientation/`
- `01-instructions.md` → `/01-instructions/`
- `agentic-delivery.md` → `/agentic-delivery/`
- etc.

---

## 🛠️ Local Testing

### Build All Presentations Locally

```bash
cd slides
npm install
npm run build-all
```

This creates a `dist/` directory with all presentations.

### Preview Locally

**Homepage + companions** (no full build required):

```bash
cd slides
npm run sync-index
npm run generate-agendas -- vscode-latest   # → companions/.../agenda.md + .html
npm run export-pdf -- vscode-latest        # → companions/.../deck.pdf (optional)
npm run preview:index
```

Open: `http://127.0.0.1:8080/`

- **Agenda** chips link to `/<category>/<slug>/agenda.html`
- **PDF** chips link to `/<category>/<slug>/deck.pdf`
- Both are built **locally**, inspected, then committed under
  `slides/companions/`. Deploy only **copies** them (never regenerates).
- Use the **Deploy** agent (`.github/agents/deploy.agent.md`) to regen stale
  companions, hard-gate with `npm run check-companions -- --strict`, and
  snarky-commit before push. CI runs `copy-companions` +
  `verify-companions-dist` so a silent drop fails the build.

See [companions/README.md](./companions/README.md).

**Full dist** after a build:

```bash
cd slides/dist
python3 -m http.server 8080
```

Then open: `http://localhost:8080`

### Build Single Presentation

```bash
cd slides
npm run dev 00-orientation.md    # Live preview with hot reload
npm run build 00-orientation.md  # Build static version
```

---

## 🔧 How It Works

### GitHub Actions Workflow

The workflow (`.github/workflows/deploy-slides.yml`) does the following:

1. **Checkout**: Gets the latest code
2. **Setup Node.js**: Installs Node 20 with npm caching
3. **Install Dependencies**: Runs `npm ci` in slides directory
4. **Install Playwright**: For PDF/PPTX export capabilities
5. **Build All Presentations**:
   - Finds all `.md` files (excluding README and GLOBAL-LAYERS)
   - Builds each as a Slidev static site
   - Sets proper base paths for each presentation
6. **Copy Index & 404 Handler**: Moves `index.html` and `404.html` to dist root
7. **Upload Artifact**: Packages everything for Pages
8. **Deploy**: Publishes to GitHub Pages

### 404.html - Direct Link & Refresh Fix

The `404.html` file is crucial for SPA routing on GitHub Pages:

- **Problem**: Direct links like `/tech-talks/subagents/1` or browser refreshes return 404
- **Solution**: GitHub Pages serves `404.html` for missing paths, which redirects to the correct Slidev presentation
- **How it works**: Parses the URL path and redirects to the appropriate presentation's index, preserving slide numbers

This enables:
- ✅ Direct links to specific slides (e.g., `/tech-talks/subagents/1`)
- ✅ Browser refresh on any slide without losing your place
- ✅ Bookmarking and sharing specific slides

### Build Script

The `slides/scripts/build-all.sh` script:
- Automatically discovers all presentation files
- Builds each with the correct base path
- Generates the final dist structure
- Can be run locally for testing

---

## 📁 Directory Structure

After deployment, the GitHub Pages site has this structure:

```
/                              ← index.html (homepage)
├── 00-orientation/            ← Workshop Module 0
│   ├── index.html
│   └── assets/
├── 01-instructions/            ← Workshop Module 1
│   ├── index.html
│   └── assets/
├── ...
├── agentic-delivery/          ← Executive Talk
│   ├── index.html
│   └── assets/
└── agentic-repos/             ← Tech Talk
    ├── index.html
    └── assets/
```

---

## 🎨 Customizing the Homepage

The homepage (`slides/index.html`) uses:
- Dark "cockpit" theme matching GitHub's dark mode
- Responsive grid layout
- Category badges (Workshop, Tech Talk, Executive)
- Hover effects and smooth transitions

To customize:
1. Edit `slides/index.html`
2. Commit and push to main
3. Workflow will rebuild and redeploy

---

## 🔄 Updating Slides

### Workflow

1. **Edit Slide Content**: Modify `.md` files in `slides/` directory
2. **Commit Changes**: Push to main branch
3. **Automatic Deployment**: Workflow detects changes and rebuilds
4. **Live in Minutes**: New version appears at GitHub Pages URL

### Best Practices

- Test locally first with `npm run dev <file>.md`
- Check the Actions tab to monitor deployment progress
- Use meaningful commit messages for slide changes
- Keep presentations focused (under 25 slides; 2–5 per topic section)

---

## 🐛 Troubleshooting

### Deployment Failed

Check the Actions tab for error details. Common issues:

1. **Syntax Error in Markdown**: Validate your `.md` files
2. **Missing Dependencies**: Ensure `package.json` is up to date
3. **Build Timeout**: Large presentations may need optimization

### Slides Not Updating

1. **Clear Browser Cache**: Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
2. **Check Workflow Status**: Visit Actions tab to confirm deployment succeeded
3. **Verify File Paths**: Ensure slide links in `index.html` match build output

### 404 Not Found

1. **Confirm GitHub Pages is Enabled**: Settings → Pages → Source: GitHub Actions
2. **Check Base Paths**: Ensure workflow sets correct `--base` flag for each presentation
3. **Wait for Propagation**: GitHub Pages can take 1-2 minutes to update

### Local Build Issues

```bash
# Clear everything and reinstall
cd slides
rm -rf node_modules package-lock.json dist .slidev
npm install
npm run build-all
```

---

## 📊 Performance

- **Build Time**: ~30-60 seconds per presentation
- **Total Deployment**: 2-4 minutes for all presentations
- **Page Load**: Optimized static assets, fast loading
- **Caching**: GitHub Pages CDN provides global caching

---

## 🔒 Security & Permissions

The workflow uses minimal permissions:
- `contents: read` - Read repository contents
- `pages: write` - Deploy to GitHub Pages
- `id-token: write` - OIDC authentication for deployment

No secrets or credentials are required.

---

## � Troubleshooting

### Direct Links or Refreshes Return 404

**Symptom**: Links like `https://username.github.io/repo/tech-talks/subagents/1` show 404, or refreshing a slide returns 404.

**Cause**: GitHub Pages doesn't have server-side routing - it looks for physical files at the URL path.

**Solution**: The `404.html` file handles this by redirecting to the correct presentation. Ensure:
1. `404.html` exists in the `slides/` directory
2. The build script copies it to `dist/404.html`
3. The file is deployed to GitHub Pages

**Verify**: After deployment, check `https://username.github.io/repo/404.html` exists.

### Slides Not Updating

1. Check the Actions tab for deployment status
2. Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)
3. Verify files were changed in `slides/**` to trigger the workflow
4. Check if `gh-pages` branch was updated

### Build Failures

1. Run locally: `cd slides && npm run build-all`
2. Check for syntax errors in slide markdown
3. Verify all dependencies are installed
4. Review build logs in GitHub Actions for specific errors

---

## �📚 Additional Resources

- **Slidev Documentation**: https://sli.dev/
- **GitHub Pages Docs**: https://docs.github.com/en/pages
- **GitHub Actions Docs**: https://docs.github.com/en/actions
- **Workshop README**: [../slides/README.md](../slides/README.md)

---

## 🎯 Future Enhancements

Potential improvements:
- **Search functionality** across all presentations
- **PDF export** of all slides in workflow
- **Version tags** for releases
- **Analytics** to track popular modules
- **Dark/light mode toggle** on homepage
- **Incremental builds** (only rebuild changed presentations)

---

## 📞 Support

For issues or questions:
1. Check the [main README](../README.md)
2. Review [Slidev documentation](https://sli.dev/)
3. Open an issue on the repository

---

*Last updated: 2026-02-04*
