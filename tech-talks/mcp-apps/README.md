---
status: active
updated: 2026-02-01
section: "Extend and Embed"
audience: [developer, platform-engineer]
level: advanced
duration: 40
format: clinic
decision: "When does an MCP response need an interactive interface?"
prerequisites: [copilot-sdk]
related: [copilot-acp, copilot-azure-mcp]
references:
  - url: https://code.visualstudio.com/blogs/2026/01/26/mcp-apps-support
    label: "MCP Apps support in VS Code"
    verified: 2026-02-01
  - url: https://code.visualstudio.com/docs/copilot/customization/mcp-servers
    label: "MCP servers documentation in VS Code"
    verified: 2026-02-01
  - url: https://modelcontextprotocol.io/
    label: "Model Context Protocol specification"
    verified: 2026-02-01
  - url: https://github.com/modelcontextprotocol/servers
    label: "MCP servers repository"
    verified: 2026-02-01
  - url: https://github.com/modelcontextprotocol/typescript-sdk
    label: "MCP TypeScript SDK"
    verified: 2026-02-01
---

# MCP Apps: Rich Interactive UI in Chat

> **The Question This Talk Answers:**
> *"How do I create interactive visualizations and UI components within chat instead of exporting data to external tools?"*

**Duration:** 40 minutes | **Target Audience:** Developers / MCP Server Authors / Tool Builders

---

## 📊 Content Fitness

| Criterion | Assessment | Notes |
|-----------|-----------|-------|
| **Relevant** | 🟢 High | Eliminates context-switching for data exploration; transforms chat from text interface to visual workspace |
| **Compelling** | 🟢 High | First capability that enables rich UI directly in chat—charts, tables, forms render inline with full interactivity |
| **Actionable** | 🟢 High | Working MCP Apps playground available; can build first interactive component in 30 minutes |

**Overall Status:** 🟢 Ready to use

---


## The Problem

### Key Points

- **Data visualization trapped in text**
  Charts, tables, and diagrams rendered as ASCII or markdown—hard to read, impossible to interact with

- **No interactive elements**
  Can't click, filter, sort, or drill down into results without leaving chat and opening external tools

- **Context switching for visuals**
  Copy data to spreadsheets, export to visualization tools, rebuild charts manually—5-10 minute detour per query

- **Static responses**
  Once generated, can't explore data differently without crafting new prompts and starting over

### Narrative

Traditional chat responses are text. Even when discussing visual data—sales charts, system diagrams, tables with hundreds of rows—the output is markdown tables or ASCII art. A developer asks about test coverage trends and receives a 200-line text table. They copy it to Excel, create a line chart, realize they need a different date range, return to chat, rephrase the prompt, and repeat the cycle.

This isn't just inconvenient—it breaks flow. The cognitive cost of context-switching between chat and visualization tools adds up: 5 minutes here to export CSV, 8 minutes there to format a chart, 15 minutes debugging why the date column didn't parse correctly. In an 8-hour day analyzing system metrics, a developer might spend 90 minutes on data formatting instead of insights.

MCP Apps solve this by bringing interactive UI directly into chat. When you ask for sales data, an interactive chart appears—hover for details, filter by region, drill down into specific months—without leaving the conversation. The chat panel transforms from a text stream into a visual workspace where data exploration happens inline.

---

## The Solution: MCP Apps

### What It Does

MCP Apps extend the Model Context Protocol to let MCP tools return rich UI component specifications instead of plain text. When a model calls an MCP tool, the server can respond with interactive elements—charts, tables, forms, trees, cards—that VS Code renders directly in the chat response with full interactivity preserved.

### Key Capabilities

- **Interactive Charts**: Bar, line, pie, scatter, area charts with hover details, zoom, and drill-down
- **Data Tables**: Sortable, filterable, paginated grids with search and CSV export
- **Input Forms**: Structured data collection with validation, dropdowns, checkboxes
- **Hierarchical Trees**: Expandable file/folder views with selection callbacks
- **Rich Cards**: Grid/list/carousel layouts with images, actions, and custom styling
- **Custom Components**: Sandboxed HTML/CSS/JavaScript for specialized visualizations

### Architecture Overview

MCP Apps work through a simple extension to the MCP tool response format. Instead of returning text content, tools return a component specification with type, data, and options. VS Code's chat renderer detects the component type and instantiates the appropriate interactive element in a sandboxed iframe with VS Code theme variables available.

The component lifecycle: User prompt → Model selects MCP tool → MCP server executes tool → Server returns component spec → VS Code renders interactive UI → User interacts → Actions trigger callbacks to MCP tools → Server processes and returns updated state.

Security is maintained through iframe sandboxing for custom components, CSP restrictions, and explicit approval for tool invocations from interactive elements.

**Official Documentation:**
- 📖 [MCP Apps Blog Post](https://code.visualstudio.com/blogs/2026/01/26/mcp-apps-support) — Introduction and capabilities overview
- 📖 [VS Code MCP Servers Documentation](https://code.visualstudio.com/docs/copilot/customization/mcp-servers) — MCP integration and configuration
- 📖 [Model Context Protocol Specification](https://modelcontextprotocol.io/) — Core MCP protocol details

---

## 📽️ Visual Assets

*MCP Apps are inherently visual—the feature itself is about rendering interactive UI. Screenshots from VS Code 1.109 release notes demonstrate the rendered components.*

### Key Visual Concepts

MCP Apps enable inline interactive visualizations within chat:

- **Charts render with full interactivity** — Pan, zoom, hover for details
- **Tables support real-world workflows** — Sort, filter, search, export CSV
- **Forms collect structured input** — Validation, dropdowns, type-aware fields
- **Trees navigate hierarchies** — Expand/collapse, icons, selection callbacks

**Note:** The [MCP Apps Playground repository](https://github.com/modelcontextprotocol/servers) contains working examples of all component types. Install locally to see live demonstrations.

---

## 📦 Key Artifacts

**This talk includes complete TypeScript implementations for all component types** shown inline in the major sections below.

### Primary Artifacts

*Shown inline with detailed explanation in the major sections*

- **Chart Component Specification** — Interactive data visualization with hover, zoom, drill-down
- **Table Component Specification** — Sortable, filterable grid with pagination and export
- **Form Component Specification** — Structured input collection with validation
- **Tree Component Specification** — Hierarchical expandable view with callbacks
- **MCP Server Implementation** — Complete server setup returning component specifications

### Supporting Files

*Available in MCP Apps Playground repository*

- **[MCP Apps Playground](https://github.com/modelcontextprotocol/servers)** — Working examples of all component types
- **[MCP SDK Documentation](https://github.com/modelcontextprotocol/typescript-sdk)** — TypeScript SDK for building MCP servers
- **[VS Code MCP Integration Guide](https://code.visualstudio.com/docs/copilot/customization/mcp-servers)** — Setup and debugging

---

## 🎯 Mental Model Shift

> **The Core Insight:** From "chat yields text that I visualize elsewhere" to "chat yields interactive visualizations I explore inline"

### Move Toward (Embrace These Patterns)

- ✅ **Component-First Responses**: Return UI components for visual data, not markdown tables → Users explore without leaving chat
- ✅ **Progressive Disclosure**: Show summary visualizations first, enable drill-down through interactions → Manage context window while preserving depth
- ✅ **Callback-Driven Updates**: Form submissions and tree selections trigger new MCP tool calls → Stateful multi-step workflows within chat
- ✅ **Inline Data Exploration**: Filter, sort, paginate without new prompts → 5-10x faster iteration cycles

### Move Away From (Retire These Habits)

- ⚠️ **ASCII Art Charts**: Rendering bar charts with █ characters or pie charts with text → Unreadable beyond toy examples, no interactivity
- ⚠️ **"Export to CSV" Workflows**: Instructing users to copy data and visualize externally → 5-10 minute context-switch per query
- ⚠️ **Static Code Blocks**: Returning HTML that users must save and open in browser → Extra steps, no theme integration

### Move Against (Active Resistance Required)

- 🛑 **Massive Markdown Tables**: Returning 500-row tables as text in chat → Exceeds context window, makes conversation unreadable, user must scroll endlessly
- 🛑 **Unsandboxed Custom HTML**: Returning arbitrary HTML/JavaScript without iframe isolation → XSS vulnerabilities, theme inconsistencies, violates CSP

> **Example Transformation:** Before: "Show sales by region" → 180-line markdown table → User copies to Excel → Creates pivot table → Formats chart → 12 minutes elapsed. After: "Show sales by region" → Interactive bar chart renders in chat → Click to filter top 5 → Hover for details → Export PNG if needed → 45 seconds elapsed.

---

## When to Use This Pattern

### Decision Tree

```
Q: What type of data are you presenting?
├─ Visual/Quantitative (charts, metrics, trends)
│  → Use MCP Apps components
│  └─ Best for: Data that benefits from visual representation
│
├─ Tabular with >20 rows
│  → Use MCP Apps table component
│  └─ Best for: Sortable, filterable datasets
│
├─ User needs to provide structured input
│  → Use MCP Apps form component
│  └─ Best for: Multi-field data collection with validation
│
├─ Hierarchical navigation (trees, menus)
│  → Use MCP Apps tree component
│  └─ Best for: File systems, org charts, nested data
│
└─ Simple text/code output (<100 lines)
   → Use standard text response
   └─ Best for: Code snippets, explanations, logs
```

### Use This Pattern When

- Presenting data that's naturally visual (charts, graphs, maps)
- Returning tables with >20 rows where sorting/filtering adds value
- Collecting structured input from users (forms with validation)
- Navigating hierarchical data (file systems, org structures)
- User benefits from inline exploration without tool-switching

### Don't Use This Pattern When

- Output is <100 lines of text/code → Standard markdown is clearer
- No interactive benefit → Visual complexity without user value
- Mobile/accessibility primary concern → Component complexity may hinder screen readers
- Network-constrained environments → Component rendering adds overhead

### Comparison with Related Features

| Aspect | MCP Apps | Standard Text | External Tools |
|--------|----------|---------------|----------------|
| **Best For** | Visual/tabular data | Code, explanations | Heavy analysis |
| **Interaction** | Inline (sort, filter) | None | Full (separate app) |
| **Setup Time** | 30-60 min (MCP server) | None | Varies |
| **Context Window** | Efficient (summarized) | Grows quickly | N/A |

---

<!-- 🎬 MAJOR SECTION: Component Types -->
## Component Types Deep-Dive

*Five built-in component types handle most visualization needs*

### Charts: Data Visualization

Interactive charts render directly in chat with full hover, zoom, and drill-down capabilities:

```typescript
// MCP tool return value for interactive chart
return {
  content: [{
    type: "component",
    component: {
      type: "chart",
      chartType: "bar",  // bar, line, pie, scatter, area
      title: "Monthly Revenue Trend",
      data: [
        { label: "Jan", value: 45000 },
        { label: "Feb", value: 52000 },
        { label: "Mar", value: 61000 },
        { label: "Apr", value: 58000 }
      ],
      options: {
        interactive: true,        // Enable hover tooltips
        colors: ["#4CAF50"],     // Custom color palette
        showLegend: true,
        animation: true          // Smooth rendering
      }
    }
  }]
};
```

**Capabilities:**
- **Hover details**: Exact values on mouseover
- **Multiple chart types**: Bar, line, pie, scatter, area
- **Custom styling**: Color palettes, legend position
- **Responsive**: Resizes with chat panel width

**Use when:** Presenting time-series data, comparisons, distributions, trends

---

### Tables: Interactive Data Grids

Sortable, filterable tables with pagination and export:

```typescript
return {
  content: [{
    type: "component",
    component: {
      type: "table",
      title: "Active Users",
      columns: [
        { key: "name", label: "Name", sortable: true },
        { key: "email", label: "Email", sortable: true },
        { key: "role", label: "Role", filterable: true },
        { key: "lastActive", label: "Last Active", sortable: true, type: "date" }
      ],
      data: [
        { name: "Alice Chen", email: "alice@example.com", role: "Admin", lastActive: "2025-02-06T10:30:00Z" },
        { name: "Bob Smith", email: "bob@example.com", role: "User", lastActive: "2025-02-05T14:20:00Z" },
        { name: "Carol White", email: "carol@example.com", role: "Editor", lastActive: "2025-02-06T09:15:00Z" }
      ],
      options: {
        pagination: true,
        pageSize: 10,
        searchable: true,       // Full-text search box
        exportable: true,       // CSV export button
        columnResizing: true
      }
    }
  }]
};
```

**Capabilities:**
- **Sorting**: Click column headers to sort ascending/descending
- **Filtering**: Dropdown filters for filterable columns
- **Search**: Full-text search across all columns
- **Pagination**: Navigate large datasets (10/25/50/100 per page)
- **Export**: Download as CSV
- **Type-aware**: Date formatting, number alignment

**Use when:** Displaying >20 rows of structured data where users need to find, sort, or filter records

---

### Forms: Structured Input Collection

Collect validated user input with type-aware fields:

```typescript
return {
  content: [{
    type: "component",
    component: {
      type: "form",
      title: "Create New User",
      description: "Fill in user details below",
      fields: [
        {
          name: "username",
          type: "text",
          label: "Username",
          required: true,
          pattern: "^[a-zA-Z0-9_]{3,20}$",
          errorMessage: "3-20 characters, alphanumeric and underscore only"
        },
        {
          name: "email",
          type: "email",
          label: "Email Address",
          required: true
        },
        {
          name: "role",
          type: "select",
          label: "Role",
          options: ["Admin", "Editor", "Viewer"],
          default: "Viewer"
        },
        {
          name: "notify",
          type: "checkbox",
          label: "Send welcome email",
          default: true
        }
      ],
      submitLabel: "Create User",
      onSubmit: "create-user-action"  // MCP tool to call with form data
    }
  }]
};
```

**Capabilities:**
- **Validation**: Required fields, pattern matching, type validation
- **Field types**: Text, email, number, select, checkbox, radio, textarea
- **Error messages**: Inline validation feedback
- **Submit callback**: Sends data to specified MCP tool
- **Default values**: Pre-populate fields

**Use when:** Collecting multi-field structured input with validation requirements

---

### Trees: Hierarchical Navigation

Expandable tree views for nested data:

```typescript
return {
  content: [{
    type: "component",
    component: {
      type: "tree",
      title: "Project Structure",
      data: [
        {
          label: "src/",
          icon: "folder",
          expandable: true,
          children: [
            { label: "index.ts", icon: "typescript", data: { path: "src/index.ts" } },
            {
              label: "components/",
              icon: "folder",
              expandable: true,
              children: [
                { label: "Button.tsx", icon: "react", data: { path: "src/components/Button.tsx" } },
                { label: "Input.tsx", icon: "react", data: { path: "src/components/Input.tsx" } }
              ]
            },
            { label: "utils/", icon: "folder", children: [
              { label: "helpers.ts", icon: "typescript", data: { path: "src/utils/helpers.ts" } }
            ]}
          ]
        },
        { label: "package.json", icon: "json", data: { path: "package.json" } }
      ],
      options: {
        expandable: true,
        defaultExpanded: 1,     // Expand first level by default
        selectable: true,
        onSelect: "open-file"   // MCP tool to call on node selection
      }
    }
  }]
};
```

**Capabilities:**
- **Expand/collapse**: Click to navigate hierarchy
- **Icons**: File-type or custom icons
- **Selection callback**: Trigger MCP tool on node click
- **Lazy loading**: Load children dynamically
- **Default state**: Control initial expansion

**Use when:** Navigating file systems, org charts, nested categories, hierarchical data

---

### Cards: Rich Visual Blocks

Grid, list, or carousel layouts with images and actions:

```typescript
return {
  content: [{
    type: "component",
    component: {
      type: "cards",
      layout: "grid",  // grid, list, carousel
      cards: [
        {
          title: "Premium Plan",
          subtitle: "$29/month",
          description: "Unlimited projects, 24/7 support, advanced analytics",
          image: "https://example.com/premium-plan.png",
          badge: "Popular",
          actions: [
            { label: "Select Plan", action: "select-plan", data: { plan: "premium" } },
            { label: "Learn More", action: "show-details", data: { plan: "premium" } }
          ]
        },
        {
          title: "Team Plan",
          subtitle: "$99/month",
          description: "Everything in Premium plus team management and SSO",
          image: "https://example.com/team-plan.png",
          badge: "Best Value",
          actions: [
            { label: "Select Plan", action: "select-plan", data: { plan: "team" } }
          ]
        }
      ],
      options: {
        cardWidth: "300px",
        gap: "16px"
      }
    }
  }]
};
```

**Capabilities:**
- **Layouts**: Grid (responsive columns), list (vertical stack), carousel (swipeable)
- **Rich content**: Title, subtitle, description, image, badges
- **Actions**: Multiple buttons per card triggering MCP tools
- **Responsive**: Adapts to container width

**Use when:** Presenting options (product selection, service tiers), portfolios, galleries

---

### Custom Components: Maximum Flexibility

For specialized visualizations beyond built-in types:

```typescript
return {
  content: [{
    type: "component",
    component: {
      type: "custom",
      html: `
        <div class="flame-graph">
          <h3>Performance Flame Graph</h3>
          <canvas id="flame-canvas" width="800" height="400"></canvas>
        </div>
      `,
      css: `
        .flame-graph {
          padding: 16px;
          background: var(--vscode-editor-background);
          border-radius: 4px;
        }
        .flame-graph h3 {
          color: var(--vscode-foreground);
          margin: 0 0 12px 0;
        }
        #flame-canvas {
          border: 1px solid var(--vscode-panel-border);
        }
      `,
      script: `
        const canvas = document.getElementById('flame-canvas');
        const ctx = canvas.getContext('2d');
        // Custom rendering logic for flame graph
        drawFlameGraph(ctx, data);
      `,
      data: { /* Performance trace data */ },
      sandbox: true  // Runs in isolated iframe
    }
  }]
};
```

**Security constraints:**
- Sandboxed iframe execution
- No access to VS Code APIs
- CSP restrictions apply
- Use VS Code CSS variables for theme consistency

**Use when:** Built-in components don't meet specialized visualization needs

---

<!-- 🎬 MAJOR SECTION: Building MCP Apps -->
## Building MCP Apps

*Complete MCP server implementation returning components*

### Basic MCP Server Structure

An MCP App is an MCP server with tools that return component specifications:

```typescript
// src/index.ts
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const server = new Server({
  name: "my-mcp-app",
  version: "1.0.0"
}, {
  capabilities: {
    tools: {}
  }
});

// Define a tool that returns a chart component
server.setRequestHandler("tools/list", async () => ({
  tools: [{
    name: "show-metrics",
    description: "Display project metrics as interactive charts",
    inputSchema: {
      type: "object",
      properties: {
        timeRange: {
          type: "string",
          enum: ["day", "week", "month"],
          description: "Time range for metrics"
        }
      },
      required: ["timeRange"]
    }
  }]
}));

server.setRequestHandler("tools/call", async (request) => {
  if (request.params.name === "show-metrics") {
    const { timeRange } = request.params.arguments;
    const data = await fetchMetrics(timeRange);

    return {
      content: [{
        type: "component",  // Key: return component, not text
        component: {
          type: "chart",
          chartType: "line",
          title: `Project Metrics (${timeRange})`,
          data: data,
          options: {
            interactive: true,
            showLegend: true
          }
        }
      }]
    };
  }
});

const transport = new StdioServerTransport();
await server.connect(transport);
```

**Key Points:**
- Return `type: "component"` in content array
- Component specification includes `type`, `title`, `data`, `options`
- VS Code detects component type and renders accordingly

---

### Component Schema Reference

All components follow this base schema:

```typescript
interface ComponentContent {
  type: "component";
  component: {
    type: "chart" | "table" | "form" | "tree" | "cards" | "custom";
    title?: string;
    // Type-specific properties (data, columns, fields, etc.)
    options?: {
      interactive?: boolean;
      // Type-specific options
    };
  };
}
```

**Common patterns:**
- `data` property holds the content (chart points, table rows, tree nodes)
- `options` control behavior (pagination, interactivity, styling)
- `onSubmit`/`onSelect` specify MCP tool callbacks for actions

---

### Callback Handling

Forms and trees can trigger MCP tool calls on user interaction:

```typescript
// Define form tool
{
  name: "create-user-form",
  description: "Show user creation form",
  inputSchema: { type: "object", properties: {} }
}

// Form response
return {
  content: [{
    type: "component",
    component: {
      type: "form",
      title: "Create New User",
      fields: [
        { name: "username", type: "text", required: true },
        { name: "email", type: "email", required: true }
      ],
      submitLabel: "Create",
      onSubmit: "process-user-creation"  // Calls this tool with form data
    }
  }]
};

// Define callback tool
{
  name: "process-user-creation",
  description: "Process user creation from form",
  inputSchema: {
    type: "object",
    properties: {
      username: { type: "string" },
      email: { type: "string" }
    }
  }
}

// Callback handler
if (request.params.name === "process-user-creation") {
  const { username, email } = request.params.arguments;
  await createUser(username, email);

  return {
    content: [{
      type: "text",
      text: `✅ User ${username} created successfully!`
    }]
  };
}
```

**Workflow:**
1. Tool returns form component with `onSubmit` callback
2. User fills form and clicks submit
3. VS Code calls specified MCP tool with form data
4. Tool processes data and returns confirmation

---

### Configuration in VS Code

Add MCP App server to `.vscode/mcp.json`:

```json
{
  "servers": {
    "my-metrics-app": {
      "type": "stdio",
      "command": "node",
      "args": ["${workspaceFolder}/mcp-apps/dist/index.js"]
    }
  }
}
```

**Testing:**
1. Build MCP server: `npm run build`
2. Restart VS Code or run `MCP: Restart Server`
3. In chat: `#my-metrics-app show-metrics --timeRange month`
4. Component renders inline

---

<!-- 🎬 MAJOR SECTION: Real-World Patterns -->
## Real-World Patterns

*Practical use cases that demonstrate MCP Apps value*

### Data Exploration Dashboard

**Pattern:** Single query returns multi-component dashboard

```typescript
{
  name: "project-dashboard",
  description: "Show comprehensive project dashboard",
  inputSchema: { type: "object", properties: {} }
}

// Returns multiple components
return {
  content: [
    {
      type: "component",
      component: {
        type: "chart",
        chartType: "bar",
        title: "Commits by Author",
        data: authorStats
      }
    },
    {
      type: "component",
      component: {
        type: "table",
        title: "Recent Pull Requests",
        columns: [
          { key: "title", label: "Title", sortable: true },
          { key: "author", label: "Author", sortable: true },
          { key: "status", label: "Status", filterable: true }
        ],
        data: recentPRs,
        options: { pagination: true, pageSize: 10 }
      }
    }
  ]
};
```

**Benefit:** Comprehensive view in single response, no context-switch

---

### Progressive Drill-Down

**Pattern:** Chart with callback to show detailed table

```typescript
// Initial chart
{
  type: "chart",
  chartType: "bar",
  title: "Sales by Region",
  data: regionSales,
  options: {
    interactive: true,
    onClick: "show-region-details"  // Callback tool
  }
}

// Callback returns detailed table
if (request.params.name === "show-region-details") {
  const { region } = request.params.arguments;
  const details = await fetchRegionDetails(region);

  return {
    content: [{
      type: "component",
      component: {
        type: "table",
        title: `${region} Sales Details`,
        columns: [
          { key: "product", label: "Product", sortable: true },
          { key: "units", label: "Units Sold", sortable: true },
          { key: "revenue", label: "Revenue", sortable: true, type: "currency" }
        ],
        data: details,
        options: { sortable: true, exportable: true }
      }
    }]
  };
}
```

**Benefit:** Summary → Details without new prompt, preserves context

---

### Form-Driven Workflows

**Pattern:** Multi-step guided process with forms

```typescript
// Step 1: Collect configuration
{
  type: "form",
  title: "Configure New API Endpoint",
  fields: [
    { name: "path", type: "text", required: true },
    { name: "method", type: "select", options: ["GET", "POST", "PUT", "DELETE"] },
    { name: "auth", type: "checkbox", label: "Require authentication" }
  ],
  onSubmit: "generate-endpoint-code"
}

// Step 2: Generate and show code
if (request.params.name === "generate-endpoint-code") {
  const { path, method, auth } = request.params.arguments;
  const code = generateEndpointCode(path, method, auth);

  return {
    content: [{
      type: "text",
      text: `\`\`\`typescript\n${code}\n\`\`\``
    }]
  };
}
```

**Benefit:** Structured input collection, guided workflows, validation

---

### Hierarchical Navigation

**Pattern:** Tree for file navigation with edit actions

```typescript
{
  type: "tree",
  title: "Project Files",
  data: buildFileTree(workspace),
  options: {
    expandable: true,
    selectable: true,
    onSelect: "open-file-details"
  }
}

// Callback shows file metadata
if (request.params.name === "open-file-details") {
  const { path } = request.params.arguments;
  const stats = await fs.stat(path);
  const preview = await fs.readFile(path, 'utf8');

  return {
    content: [
      { type: "text", text: `**File:** ${path}\n**Size:** ${stats.size} bytes\n**Modified:** ${stats.mtime}` },
      { type: "text", text: `\`\`\`\n${preview.slice(0, 500)}\n\`\`\`` }
    ]
  };
}
```

**Benefit:** Natural file system navigation, inline previews

---

<!-- 🎬 MAJOR SECTION: Integration -->
## Integration with VS Code Features

*Combining MCP Apps with agents, skills, and memory*

### With Custom Agents

Agents can leverage MCP Apps for visualization:

```markdown
---
name: data-analyst
description: Analyzes data with interactive visualizations
tools: ['search', 'fetch', 'analytics-dashboard']
mcp-servers:
  - name: analytics-app
    tools: ['show-metrics', 'show-table', 'create-chart']
---

You are a data analyst that helps users explore data visually.
When presenting quantitative data, always use interactive charts or tables from the analytics-app MCP server.
```

**User:** "Analyze last month's sales trends"
**Agent:** Calls `analytics-app.show-metrics` → Returns interactive line chart

---

### With Agent Skills

Skills can include MCP Apps tools in their workflow:

```markdown
---
name: code-review-reporter
description: Generates visual code review reports
tools: ['fs', 'git', 'review-dashboard/*']
---

# Code Review Reporter Skill

When generating code review reports:

1. Use `fs` to read changed files
2. Use `git` to fetch commit history
3. Use `review-dashboard/show-complexity` to display complexity chart
4. Use `review-dashboard/show-coverage` to display test coverage table

Always visualize quantitative metrics using MCP Apps components.
```

---

### With Copilot Memory

Memory can store dashboard preferences:

```
User: "Remember that I prefer bar charts over pie charts"
Agent: Stores preference in Copilot Memory

Future queries: "Show sales data"
Agent: Retrieves preference → Uses bar chart component
```

---

### Best Practices

**Design:**
- **Progressive disclosure**: Summary → Details on interaction
- **Responsive layouts**: Components adapt to chat panel width
- **Theme awareness**: Use VS Code CSS variables (`var(--vscode-foreground)`)
- **Loading states**: Show skeleton/spinner for async data

**Performance:**
- **Paginate large datasets**: Don't render 10,000 rows at once
- **Lazy load images**: Load visible content first
- **Cache queries**: MCP server-side caching for repeated requests
- **Optimize re-renders**: Only update changed data

**Security:**
- **Sandbox custom HTML**: Always use `sandbox: true` for custom components
- **Validate inputs**: Sanitize form data before processing
- **Rate limit**: Prevent abuse of callback tools
- **No sensitive data in logs**: Scrub credentials from component specs

---

## Real-World Use Cases

### Use Case 1: System Metrics Dashboard

**Problem:** DevOps team needs to analyze system metrics across 12 microservices. Current workflow: Query Prometheus → Export CSV → Import to Grafana → Customize charts → Share screenshot. 15-20 minutes per analysis.

**Solution:** MCP App queries Prometheus and returns interactive dashboard

```typescript
{
  name: "system-metrics",
  description: "Show system metrics dashboard",
  inputSchema: {
    type: "object",
    properties: {
      service: { type: "string", enum: ["api", "auth", "db", "cache", "..."] },
      timeRange: { type: "string", enum: ["1h", "24h", "7d"] }
    }
  }
}

// Returns multi-component dashboard
return {
  content: [
    { type: "component", component: { type: "chart", chartType: "line", title: "CPU Usage", data: cpuData } },
    { type: "component", component: { type: "chart", chartType: "area", title: "Memory Usage", data: memData } },
    { type: "component", component: { type: "table", title: "Error Logs", columns: [...], data: errors } }
  ]
};
```

**Outcome:** 15-20 minutes → 90 seconds. Team analyzes metrics 8x more frequently, catches issues 40% faster.

---

### Use Case 2: Database Query Results

**Problem:** Data analysts query production database, receive 500-row result set as text, copy to Excel for sorting/filtering. 10 minutes per query, 30+ queries per day.

**Solution:** MCP App returns sortable, filterable, exportable table

```typescript
{
  name: "query-database",
  description: "Execute SQL query and show interactive results",
  inputSchema: {
    type: "object",
    properties: {
      query: { type: "string", description: "SQL query to execute" }
    }
  }
}

// Returns interactive table
return {
  content: [{
    type: "component",
    component: {
      type: "table",
      title: "Query Results",
      columns: resultColumns,
      data: resultRows,
      options: {
        sortable: true,
        searchable: true,
        exportable: true,
        pagination: true,
        pageSize: 50
      }
    }
  }]
};
```

**Outcome:** 10 minutes → 2 minutes per query. Analysts explore data inline, export only final filtered results. 240 minutes saved per day across 3-person team.

---

### Use Case 3: Project Scaffolding Forms

**Problem:** Developers create new microservices monthly, must answer configuration questions (repo name, language, DB type, auth method). Current: 20-minute Slack thread with infra team → Manual setup → Review config.

**Solution:** MCP App form collects structured input, generates scaffold

```typescript
{
  name: "scaffold-service",
  description: "Interactive form to scaffold new microservice",
  inputSchema: { type: "object", properties: {} }
}

// Returns form
return {
  content: [{
    type: "component",
    component: {
      type: "form",
      title: "New Microservice Configuration",
      fields: [
        { name: "serviceName", type: "text", required: true, pattern: "^[a-z-]+$" },
        { name: "language", type: "select", options: ["TypeScript", "Python", "Go"] },
        { name: "database", type: "select", options: ["PostgreSQL", "MongoDB", "None"] },
        { name: "auth", type: "checkbox", label: "Requires authentication" },
        { name: "public", type: "checkbox", label: "Publicly accessible" }
      ],
      onSubmit: "generate-scaffold"
    }
  }]
};

// Callback generates repo
if (request.params.name === "generate-scaffold") {
  const config = request.params.arguments;
  await generateScaffold(config);
  return {
    content: [{ type: "text", text: `✅ Service ${config.serviceName} created! Repo: ${repoUrl}` }]
  };
}
```

**Outcome:** 20-minute Slack thread → 3-minute form submission. 100% configuration accuracy (validation prevents typos). Developers self-serve without infra team bottleneck.

---

## ✅ What You Can Do Today

**Immediate Actions (15 minutes):**
- [ ] Install MCP Apps Playground: `git clone https://github.com/modelcontextprotocol/servers && cd mcp-apps-playground && npm install`
- [ ] Add to `.vscode/mcp.json` following [setup instructions](https://github.com/modelcontextprotocol/servers#readme)
- [ ] Test: In chat, type `@mcp-apps-playground show me the chart demo`

**Short-Term Implementation (1 hour):**
- [ ] Identify one current "export to CSV" workflow in your team
- [ ] Build MCP server returning table or chart component for that data source
- [ ] Test with 2-3 colleagues, measure time savings

**Advanced Exploration (2-4 hours):**
- [ ] Build multi-step form workflow (config → generate → preview)
- [ ] Implement callback tools for interactive drill-down (chart click → detail table)
- [ ] Integrate MCP Apps with custom agent for domain-specific visualization

**Next Steps After Completion:**
1. ✅ Complete immediate actions to experience MCP Apps
2. 📖 Review [MCP SDK documentation](https://github.com/modelcontextprotocol/typescript-sdk) for server implementation details
3. 💬 Share MCP Apps with team, measure adoption and time savings
4. 🚀 Explore [custom components](#custom-components-maximum-flexibility) for specialized visualizations

---

## Related Patterns

### Complementary Features

- **[MCP Servers Workshop](../../workshop/05-mcp-servers/README.md)** — MCP fundamentals, tool development, configuration
- **[Custom Agents](../copilot-web/README.md)** — Building agents that leverage MCP Apps for visualization
- **[Agent Skills](../copilot-hooks/README.md)** — Packaging MCP Apps workflows as reusable skills

### Decision Flow

**If this talk doesn't fit your needs:**

```
Q: What's your actual goal?
├─ Need custom tools (not visualizations)
│  → See: MCP Servers Workshop
├─ Need agent orchestration with visualization
│  → See: Custom Agents + MCP Apps (combine both)
└─ Need organization-wide deployment
   → See: Enterprise Patterns
```

See [DECISION-GUIDE.md](../DECISION-GUIDE.md) for complete navigation help.

---

## 📚 Official Documentation

**Primary Documentation:**
- 📖 **[MCP Apps Blog Post](https://code.visualstudio.com/blogs/2026/01/26/mcp-apps-support)** — Introduction, capabilities overview, announcement
- 📖 **[VS Code MCP Servers Documentation](https://code.visualstudio.com/docs/copilot/customization/mcp-servers)** — MCP integration guide, configuration, troubleshooting
- 📖 **[Model Context Protocol Specification](https://modelcontextprotocol.io/)** — Core protocol details, standards, reference

**Additional Resources:**
- 🐙 [MCP Apps Playground](https://github.com/modelcontextprotocol/servers) — Working examples of all component types
- 🐙 [MCP TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk) — SDK for building MCP servers
- 📖 [VS Code Release Notes 1.109](https://code.visualstudio.com/updates/v1_109#_support-for-mcp-apps) — MCP Apps announcement and details

---

## 🎭 Behind the Scenes

*For those who want to understand the deeper mechanics*

### Component Rendering Architecture

1. **Tool Response Parsing**: VS Code chat renderer detects `type: "component"` in MCP tool response
2. **Component Type Detection**: Reads `component.type` to determine renderer (chart, table, form, etc.)
3. **Iframe Creation**: Spawns sandboxed iframe with VS Code theme context
4. **Data Serialization**: Passes component spec to iframe via `postMessage`
5. **Rendering**: Iframe instantiates appropriate UI element (chart library, table component, form fields)
6. **Interaction Handling**: User interactions (click, submit) post messages back to VS Code
7. **Callback Execution**: VS Code calls specified MCP tool with interaction data
8. **State Update**: New component spec returned, iframe re-renders

**Why This Matters:** Understanding the architecture helps debug rendering issues and optimize component payload size.

---

### Security Model

**Sandboxing:**
- Components render in iframes with `sandbox="allow-scripts allow-same-origin"`
- No access to `vscode.*` APIs or parent window
- CSP prevents external script loading

**Trust Boundaries:**
- MCP server trust established at configuration time (user confirms in `.vscode/mcp.json`)
- Tool invocations require explicit approval (first time per tool)
- Callback tools (onSubmit, onSelect) require approval before execution

**Data Flow:**
- Component data never persists outside chat session
- Export actions (CSV download) require explicit user click
- Images must be HTTPS URLs or data URIs (no file:// access)

**Key Takeaway:** MCP Apps security model balances flexibility (rich components) with safety (sandboxing, explicit approvals).
