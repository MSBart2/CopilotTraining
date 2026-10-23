# Dev Container Configuration

This repository includes a development container configuration that automatically sets up the ideal environment for the GitHub Copilot Training Workshop.

## What's Included

### Pre-installed Extensions

- **GitHub Copilot & Copilot Chat** — Required for all training exercises
- **Markdown Preview Mermaid Support** — Renders architecture diagrams in README files
- **Markdown All in One** — Enhanced Markdown editing experience
- **ESLint & Prettier** — Code quality and formatting for FanHub development
- **Docker** — Container management for FanHub's multi-service architecture
- **GitLens** — Enhanced git visualization (optional)

### Pre-configured Ports

- **3000** — FanHub Frontend (React)
- **3001** — FanHub Backend API (Node.js/Express)
- **5432** — PostgreSQL Database

### Features

- **Node.js 20** — Latest LTS version for FanHub development

Note: the default local dev container intentionally does not enable Docker-in-Docker. That feature adds significant startup complexity on Windows and is not required for normal content authoring in this repository.

Note: the local container definition also avoids Dev Container features that must be fetched during creation. If Docker Desktop and the base image are available locally, this keeps startup more reliable on Windows networks that intermittently fail against feature registries.

## Using This Dev Container

### Option 1: GitHub Codespaces (Recommended)

1. Click "Code" → "Create codespace on main"
2. Wait ~2-3 minutes for the environment to build
3. Everything is ready! Start with [Module 00](../workshop/00-orientation/README.md)

### Option 2: VS Code Desktop with Dev Containers

1. Install [Docker Desktop](https://www.docker.com/products/docker-desktop/)
2. Install the [Dev Containers extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)
3. Open this repository in VS Code
4. When prompted, click "Reopen in Container"
5. Wait for the container to build

## Why Use the Dev Container?

**Consistent Environment** — Everyone gets the same tools, extensions, and configuration

**Zero Setup** — No manual extension installation or configuration

**Diagram Support** — Mermaid diagrams render immediately in Markdown previews

**FanHub Ready** — All development tools for the training project pre-installed

**Isolation** — Your training environment doesn't conflict with other projects

## Troubleshooting

### Mermaid Diagrams Not Rendering?

1. Open Command Palette (Ctrl/Cmd+Shift+P)
2. Run "Markdown: Open Preview"
3. Diagrams render with the `bierner.markdown-mermaid` extension

### Ports Not Forwarding?

Check the "Ports" tab in VS Code's terminal panel. Ports auto-forward when services start.

### Container Build Fails?

Ensure Docker Desktop is running and you have enough disk space (5GB+ recommended).

### Container Hangs Before Startup Commands?

If VS Code stalls before `postCreateCommand` runs, the problem is usually in container creation or feature initialization rather than this repository's bootstrap.

This configuration keeps first attach intentionally light:

- No Docker-in-Docker feature by default
- No GitHub CLI Dev Container feature during image creation
- No Playwright browser download during container creation

After the container opens successfully, install optional tooling manually if needed:

```bash
npx playwright install --with-deps chromium
```

## Customization

Want to add more extensions or change settings? Edit [devcontainer.json](./devcontainer.json) and rebuild:

1. Command Palette → "Dev Containers: Rebuild Container"
2. Wait for rebuild to complete

## Learn More

- [Dev Containers Documentation](https://code.visualstudio.com/docs/devcontainers/containers)
- [GitHub Codespaces Documentation](https://docs.github.com/en/codespaces)
