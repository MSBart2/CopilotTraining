/*
  Enterprise Patterns — deck-only scenes and the title visual.
  Layer tones stay fixed across the deck: enterprise = github (indigo), team = remote (blue),
  repository = local (cyan), personal = runtime (violet). Orange marks a block or limit,
  green the effective (verified) result, purple the hero idea.
*/
(() => {
  const { svg, html, measure, wrap } = window.Kit;
  const L = { enterprise: 'github', team: 'remote', repository: 'local', personal: 'runtime' };
  const code = (x, y, lines, { lh = 30, cls = 'code' } = {}) =>
    lines.map((l, i) => svg.text(x, y + i * lh, l, { cls, anchor: 'start' })).join('');
  const chipW = (label, size = 17, pad = 14) => Math.round(measure(label, size) + pad * 2);
  const row = (labels, x, y, { gap = 12, size = 17, h = 32, z, cls = '' } = {}) => {
    let cx = x;
    return labels.map((l) => {
      const c = svg.chip(cx, y, l, { z, size, h, cls });
      cx += c.w + gap;
      return c.markup;
    }).join('');
  };
  const sw = (x, y, on, at) => svg.g(
    svg.rect(x, y, 60, 28, { cls: on ? 'switch-track on' : 'switch-track', r: 14 }) +
    svg.glide(svg.circle(on ? x + 46 : x + 14, y + 14, 10, { cls: 'switch-knob' }), [on ? -32 : 32, 0], at), {});

  /* Title visual: four layer rings around one developer. */
  const layerRings = () => {
    const C = 380;
    const rings = [
      { r: 330, label: 'enterprise', file: 'managed-settings.json', z: L.enterprise },
      { r: 255, label: 'team', file: 'teams/*.json', z: L.team },
      { r: 180, label: 'repository', file: '.github/copilot/settings.json', z: L.repository },
      { r: 105, label: 'personal', file: 'client settings', z: L.personal }
    ];
    const circ = (r) => `M${C - r} ${C}a${r} ${r} 0 1 0 ${2 * r} 0a${r} ${r} 0 1 0 ${-2 * r} 0`;
    let body = '';
    rings.forEach((g, i) => {
      const at = 200 + 260 * i;
      body += svg.g(svg.trace(circ(g.r), { cls: 'route layer-ring', at, dur: 900 }), { cls: `z-${g.z}` });
      const w = chipW(g.label, 19, 18);
      body += svg.pop(svg.chip(C - w / 2, C - g.r - 19, g.label, { z: g.z, size: 19, h: 38, pad: 18 }).markup, at + 500);
      const fw = chipW(g.file, 14, 12);
      body += svg.enter(svg.chip(C - fw / 2, C + g.r - 14, g.file, { z: g.z, size: 14, h: 28, pad: 12 }).markup, at + 700);
    });
    body += svg.pop(svg.g(svg.circle(C, C, 62, { cls: 'task' }), { cls: 'z-purple' }) +
      svg.text(C, C - 8, 'ONE', { cls: 't-xs t-mono' }) + svg.text(C, C + 22, 'developer', { cls: 't-sm' }), 1400);
    body += svg.halo(C, C, 62, { z: 'purple', at: 1800 });
    body += svg.ride(`M${C} ${C - 330}L${C} ${C - 62}`, { z: 'green', at: 2000, dur: 2600, r: 7 });
    return svg.scene(760, 760, 'Four rings, enterprise, team, repository, and personal, each with its settings file, surround one developer who receives one effective answer.', body, 'rings');
  };

  /* Cold open: one platform team, four product teams, four surfaces, three asks with three owners. */
  const threeAsks = (s) => {
    const teams = ['payments-core', 'payments-mobile', 'platform-sre', 'more teams'];
    const surfaces = ['VS Code', 'Copilot CLI', 'Copilot app', 'Cloud agent'];
    const lay = (labels, y) => {
      const ws = labels.map((l) => chipW(l));
      const total = ws.reduce((a, b) => a + b, 0) + 14 * (labels.length - 1);
      let x = (640 - total) / 2;
      return labels.map((l, i) => { const o = { l, x, w: ws[i], y }; x += ws[i] + 14; return o; });
    };
    const tc = lay(teams, 58);
    const sc = lay(surfaces, 446);
    let body = svg.text(320, 38, 'PRODUCT TEAMS', { cls: 't-xs t-mono' }) + svg.text(320, 432, 'COPILOT SURFACES', { cls: 't-xs t-mono' });
    tc.forEach((c, i) => {
      body += svg.trace(`M300 210C300 150 ${c.x + c.w / 2} 150 ${c.x + c.w / 2} 92`, { cls: 'wire', at: 500 + 80 * i, dur: 500 });
      body += svg.pop(svg.chip(c.x, c.y, c.l, { z: L.team }).markup, 300 + 80 * i);
    });
    sc.forEach((c, i) => {
      body += svg.trace(`M300 312C300 380 ${c.x + c.w / 2} 380 ${c.x + c.w / 2} 444`, { cls: 'wire', at: 700 + 80 * i, dur: 500 });
      body += svg.pop(svg.chip(c.x, c.y, c.l, { z: 'purple' }).markup, 500 + 80 * i);
    });
    body += svg.pop(svg.g(svg.rect(170, 210, 260, 102, { cls: 'box task', r: 18 }) +
      svg.text(300, 248, 'PLATFORM TEAM', { cls: 't-xs t-mono' }) + svg.text(300, 288, 'one baseline', { cls: 't-lg' }), { cls: 'z-purple' }), 150);
    const asks = [
      { tag: 'EVERYONE · enterprise', title: 'A shared security baseline', desc: 'The same plugin on every repository and surface', z: L.enterprise },
      { tag: 'ONE TEAM · payments', title: 'An extra review plugin', desc: 'Only the payments teams need it', z: L.team },
      { tag: 'ONE REPOSITORY · maintainers', title: 'An optional scanner', desc: 'On by default; contributors can switch it off', z: L.repository }
    ];
    asks.forEach((a, i) => {
      const y = i * 166;
      const at = 1300 + 700 * i;
      body += svg.trace(`M432 261C580 261 580 ${y + 75} 718 ${y + 75}`, { cls: 'wire link', at: at - 200, dur: 400 });
      body += svg.g(svg.enter(
        svg.rect(720, y, 720, 150, { cls: 'zone', r: 18 }) +
        svg.text(748, y + 40, a.tag, { cls: 't-xs t-mono z-text', anchor: 'start' }) +
        svg.text(748, y + 84, a.title, { cls: 't-lg', anchor: 'start' }) +
        svg.text(748, y + 122, a.desc, { cls: 't-muted', anchor: 'start' }), at) +
        svg.pop(svg.circle(1384, y + 75, 26, { cls: 'stop' }) + svg.text(1384, y + 85, String(i + 1), { cls: 't-lg' }), at + 250), { cls: `z-${a.z}` });
    });
    const label = 'A platform team serves several product teams across VS Code, Copilot CLI, the Copilot app, and the cloud agent. Three asks arrive: a shared security baseline for everyone, an extra review plugin for the payments teams, and an optional scanner one repository wants on by default.';
    return `${html.head(s)}${svg.scene(1440, 500, label, body)}`;
  };

  /* Part 1: copies in five repositories collapse into one release-guard package. */
  const pluginUnit = (s) => {
    const files = ['release-checklist skill', 'release-notes MCP', 'reviewer agent', 'hooks.json'];
    let body = '';
    ['A', 'B', 'C', 'D', 'E'].forEach((n, i) => {
      const x = i * 296;
      const at = 250 + 120 * i;
      body += svg.enter(svg.g(svg.rect(x, 0, 256, 200, { cls: 'box', r: 16 }) +
        svg.text(x + 22, 38, `📁 repo ${n}`, { cls: 't-sm', anchor: 'start' }) +
        svg.g(files.map((f, k) => svg.text(x + 22, 76 + k * 30, f, { cls: 't-xs', anchor: 'start' })).join(''), { cls: 'dim faded m-dim', at: 2000 }), {}), at);
      body += svg.trace(`M${x + 128} 204C${x + 128} 260 720 250 720 298`, { cls: 'wire link', at: 1100 + 80 * i, dur: 600 });
    });
    const parts = ['skill', 'MCP server', 'agent', 'hooks'];
    const total = parts.reduce((a, p) => a + chipW(p), 0) + 12 * 3;
    body += svg.pop(svg.g(
      svg.rect(420, 300, 600, 200, { cls: 'box task', r: 20 }) +
      svg.text(720, 350, '📦 release-guard', { cls: 't-lg' }) +
      svg.text(720, 384, 'v1.4.0 · release-guard@platform-tools', { cls: 't-sm t-muted' }), { cls: 'z-purple' }) +
      row(parts, 720 - total / 2, 420, { z: 'purple' }), 1700);
    body += svg.g(svg.enter(svg.rect(0, 350, 360, 100, { cls: 'zone', r: 16 }) +
      svg.text(24, 386, 'BEFORE', { cls: 't-xs t-mono z-text', anchor: 'start' }) +
      svg.text(24, 422, 'Five copies to patch', { anchor: 'start' }), 600), { cls: 'z-orange' });
    body += svg.g(svg.enter(svg.rect(1080, 350, 360, 100, { cls: 'zone', r: 16 }) +
      svg.text(1104, 386, 'AFTER', { cls: 't-xs t-mono z-text', anchor: 'start' }) +
      svg.text(1104, 422, 'One release to update', { anchor: 'start' }), 2300), { cls: 'z-green' });
    const label = 'Five repositories each hold copies of the same release-checklist skill, release-notes MCP config, reviewer agent, and hooks. The copies collapse into one release-guard plugin, version 1.4.0, addressable as release-guard@platform-tools, so one release updates every repository.';
    return `${html.head(s)}${svg.scene(1440, 500, label, body)}`;
  };

  /* Part 1: the Agent Plugins 1.0 layout, portable zone versus Copilot zone, and the $schema line. */
  const pluginAnatomy = (s) => {
    const tree = ['release-guard/', '├── plugin.json', '├── skills/', '│   └── release-checklist/', '│       ├── SKILL.md', '│       └── scripts/verify-changelog.sh', '├── mcp.json',
      '└── com.github.copilot/', '    ├── agents/', '    │   └── release-reviewer.agent.md', '    └── hooks/', '        └── hooks.json'];
    const y0 = 36;
    const lh = 34;
    let body = '';
    body += svg.g(svg.pop(svg.rect(0, y0 + lh - 26, 610, lh * 6 + 2, { cls: 'zone', r: 12 }), 700), { cls: 'z-green' });
    body += svg.g(svg.pop(svg.rect(0, y0 + lh * 7 - 26, 610, lh * 5 + 2, { cls: 'zone', r: 12 }), 1300), { cls: 'z-purple' });
    body += svg.enter(code(20, y0, tree, { lh, cls: 'code tree' }), 200);
    body += svg.g(svg.enter(svg.text(596, y0 + lh * 2, 'PORTABLE', { cls: 't-xs t-mono z-text', anchor: 'end' }) +
      svg.text(596, y0 + lh * 3, 'any agent client', { cls: 't-xs', anchor: 'end' }), 900), { cls: 'z-green' });
    body += svg.g(svg.enter(svg.text(596, y0 + lh * 8, 'COPILOT-ONLY', { cls: 't-xs t-mono z-text', anchor: 'end' }) +
      svg.text(596, y0 + lh * 10, 'others ignore it', { cls: 't-xs', anchor: 'end' }), 1500), { cls: 'z-purple' });
    const json = ['{', '  "$schema": "https://agent-plugins.org/schemas/1.0.0/plugin.schema.json",', '  "name": "release-guard",',
      '  "description": "Release checklist, release-notes MCP, reviewer agent",', '  "version": "1.4.0",', '  "author": { "name": "Platform Engineering" },', '  "license": "MIT"', '}'];
    body += svg.enter(svg.rect(650, 0, 790, 310, { cls: 'box', r: 16 }), 400);
    body += svg.g(svg.pop(svg.rect(662, 74 + 30 - 21, 768, 28, { cls: 'zone', r: 6 }), 2000), { cls: 'z-purple' });
    body += svg.enter(svg.text(674, 36, 'release-guard/plugin.json', { cls: 't-xs t-mono', anchor: 'start' }) +
      code(674, 74, json, { lh: 30 }), 400);
    body += svg.g(svg.enter(svg.rect(650, 330, 790, 60, { cls: 'zone', r: 14 }) +
      svg.text(674, 367, 'Without $schema, Copilot CLI reads it as the legacy Copilot format', { cls: 't-sm', anchor: 'start' }), 2300), { cls: 'z-orange' });
    body += svg.g(svg.enter(svg.rect(650, 404, 790, 60, { cls: 'zone', r: 14 }) +
      svg.text(674, 441, 'Spec v1 defines two component types: skills and MCP servers', { cls: 't-sm', anchor: 'start' }), 2500), { cls: 'z-github' });
    const label = 'The release-guard plugin tree: plugin.json, skills/release-checklist, and mcp.json form the portable zone any agent client loads; com.github.copilot/ holds Copilot-only agents and hooks that other clients ignore. plugin.json declares $schema for Agent Plugins 1.0; without it Copilot CLI reads the legacy format.';
    return `${html.head(s)}${svg.scene(1440, 470, label, body)}`;
  };

  /* Part 1: marketplace.json name + plugin name = PLUGIN@MARKETPLACE. */
  const marketplaceId = (s) => {
    const json = ['{', '  "name": "platform-tools",', '  "owner": { "name": "Platform Engineering" },', '  "metadata": { "version": "2026.11.0" },', '  "plugins": [',
      '    { "name": "release-guard", "version": "1.4.0",', '      "source": "./plugins/release-guard" },', '    { "name": "pci-review", "version": "0.9.2",',
      '      "source": "./plugins/pci-review" },', '    { "name": "legacy-deploy", "version": "3.1.0",', '      "source": "./plugins/legacy-deploy" }', '  ]', '}'];
    const ly = (k) => 72 + k * 30 - 21;
    let body = svg.enter(svg.rect(0, 0, 760, 470, { cls: 'box', r: 16 }), 200);
    body += svg.g(svg.pop(svg.rect(12, ly(1), 736, 28, { cls: 'zone', r: 6 }), 600), { cls: 'z-purple' });
    body += svg.g(svg.pop(svg.rect(12, ly(5), 736, 28, { cls: 'zone', r: 6 }), 900), { cls: 'z-local' });
    body += svg.enter(svg.text(24, 36, 'acme-corp/platform-tools · marketplace.json', { cls: 't-xs t-mono', anchor: 'start' }) +
      code(24, 72, json, { lh: 30 }), 200);
    const pw = chipW('release-guard', 20, 14);
    const mw = chipW('platform-tools', 20, 14);
    body += svg.text(920, 40, 'PLUGIN', { cls: 't-xs t-mono' }) + svg.text(1250, 40, 'MARKETPLACE', { cls: 't-xs t-mono' });
    body += svg.glide(svg.chip(920 - pw / 2, 56, 'release-guard', { z: 'local', size: 20, h: 44 }).markup, [-60, 40], 1100);
    body += svg.glide(svg.chip(1250 - mw / 2, 56, 'platform-tools', { z: 'purple', size: 20, h: 44 }).markup, [-200, 0], 1100);
    body += svg.enter(svg.text(1085, 87, '@', { cls: 't-lg' }), 1500);
    body += svg.trace('M920 104C920 140 1130 130 1130 166', { cls: 'wire link', at: 1700, dur: 400 });
    body += svg.trace('M1250 104C1250 140 1130 130 1130 166', { cls: 'wire link', at: 1700, dur: 400 });
    const iw = chipW('release-guard@platform-tools', 24, 28);
    body += svg.pop(svg.chip(1130 - iw / 2, 170, 'release-guard@platform-tools', { z: 'purple', size: 24, h: 56, pad: 28, cls: 'hero-chip' }).markup, 2100);
    body += svg.enter(svg.text(820, 266, 'EACH PLUGIN MOVES THROUGH THREE STATES', { cls: 't-xs t-mono', anchor: 'start' }), 2400);
    const states = [
      { name: 'Available', cap: 'in a visible marketplace', z: L.enterprise },
      { name: 'Installed', cap: 'files on the client', z: L.personal },
      { name: 'Enabled', cap: 'components load', z: L.repository }
    ];
    states.forEach((st, i) => {
      const x = 820 + i * 216;
      const at = 2600 + 300 * i;
      body += svg.g(svg.enter(svg.rect(x, 280, 188, 52, { cls: 'zone', r: 12 }) +
        svg.text(x + 94, 314, st.name, { cls: 't-sm z-text' }), at), { cls: `z-${st.z}` });
      body += svg.enter(svg.text(x + 94, 356, st.cap, { cls: 't-xs t-muted' }), at + 100);
      if (i < 2) body += svg.trace(`M${x + 190} 306L${x + 214} 306`, { cls: 'wire link', at: at + 200, dur: 200 });
    });
    body += svg.g(svg.enter(svg.rect(820, 374, 620, 50, { cls: 'zone', r: 12 }) +
      svg.text(844, 406, '🔒 Required: installed, enabled, and locked on by policy', { cls: 't-sm', anchor: 'start' }), 3600), { cls: `z-${L.enterprise}` });
    body += svg.g(svg.enter(svg.rect(820, 436, 620, 44, { cls: 'zone', r: 12 }) +
      svg.text(844, 465, 'Renaming the marketplace changes every id', { cls: 't-xs', anchor: 'start' }), 3900), { cls: 'z-orange' });
    const label = 'marketplace.json in acme-corp/platform-tools has name platform-tools and lists release-guard, pci-review, and legacy-deploy. The plugin name plus the marketplace name form the id release-guard@platform-tools; renaming the marketplace changes every id. Each plugin moves through three states: available in a visible marketplace, installed on the client, and enabled so its components load; required is the locked variant, installed, enabled, and locked on by policy.';
    return `${html.head(s)}${svg.scene(1440, 480, label, body)}`;
  };

  /* Part 2: four bands, file, owner, can, cannot, with precedence running down. */
  const LAYERS = [
    { name: 'Enterprise', rank: 'RANK 1 · WINS', z: L.enterprise, file: ['.github-private/copilot/', 'managed-settings.json'], owner: 'Enterprise owners, platform team',
      can: 'Require (true) or block (false); approve marketplaces; mark keys overridable', cannot: 'Make a plugin optional and on by default' },
    { name: 'Team', rank: 'RANK 2', z: L.team, file: ['copilot/teams/*.json', '+ team-mappings.json'], owner: 'Platform team, PRs from the team',
      can: 'Add plugins on top of the baseline; set keys marked overridable', cannot: 'Change keys the enterprise did not mark overridable' },
    { name: 'Repository', rank: 'RANK 3', z: L.repository, file: ['.github/copilot/settings.json'], owner: 'Repository maintainers',
      can: 'Turn on default plugins for contributors in trusted repositories', cannot: 'Override managed settings' },
    { name: 'Personal', rank: 'RANK 4', z: L.personal, file: ['client settings'], owner: 'Developer',
      can: 'Switch off repository defaults where supported; install from allowed marketplaces', cannot: 'Disable a required plugin or use an unapproved marketplace' }
  ];
  const fourLayers = (s) => {
    const cols = { name: 72, file: 262, owner: 585, can: 812, cannot: 1140 };
    let body = svg.text(22, 20, 'WINS', { cls: 't-xs t-mono' }) +
      ['LAYER', 'FILE', 'OWNER', 'CAN', 'CANNOT'].map((h, i) => svg.text(Object.values(cols)[i], 20, h, { cls: 't-xs t-mono col-label', anchor: 'start' })).join('');
    LAYERS.forEach((ly, i) => {
      const y = 36 + i * 120;
      const at = 300 + 300 * i;
      body += svg.g(svg.enter(
        svg.rect(48, y, 1392, 110, { cls: 'zone', r: 14 }) +
        svg.text(cols.name, y + 50, ly.name, { cls: 't-lg z-text', anchor: 'start' }) +
        svg.text(cols.name, y + 80, ly.rank, { cls: 't-xs t-mono', anchor: 'start' }) +
        code(cols.file, y + (ly.file.length > 1 ? 46 : 60), ly.file, { lh: 26, cls: 'code code-sm' }) +
        svg.lines(cols.owner, y + 46, ly.owner, { cls: 't-sm', anchor: 'start', max: 20, lh: 24 }) +
        svg.lines(cols.can, y + 36, ly.can, { cls: 't-sm t-body', anchor: 'start', max: 30, lh: 24 }) +
        svg.lines(cols.cannot, y + 36, ly.cannot, { cls: 't-sm t-cannot', anchor: 'start', max: 28, lh: 24 }), at), { cls: `z-${ly.z}` });
    });
    body += svg.trace('M22 40L22 500', { cls: 'wire link', at: 1500, dur: 900 }) +
      svg.pop(svg.path('M12 488L22 504L32 488', { cls: 'wire link' }), 2300) +
      svg.ride('M22 40L22 500', { z: 'purple', at: 2500, dur: 2400, r: 6 });
    const conds = [
      ['Team files need server-managed delivery', L.team],
      ['Managed controls need GHEC licenses', L.enterprise],
      ['Repository defaults need trusted repositories', L.repository]
    ];
    body += svg.enter(svg.text(48, 548, 'APPLIES WHEN', { cls: 't-xs t-mono', anchor: 'start' }), 2800);
    let cx = 190;
    conds.forEach(([t, z], i) => {
      const c = svg.chip(cx, 524, t, { z, size: 16, h: 34 });
      body += svg.pop(c.markup, 3000 + 250 * i);
      cx += c.w + 14;
    });
    const label = `Four layers in precedence order. ${LAYERS.map((l) => `${l.name}: file ${l.file.join(' ')}, owned by ${l.owner}; can ${l.can}; cannot ${l.cannot}.`).join(' ')} A layer applies only when its condition holds: team files need server-managed delivery, managed controls need GitHub Enterprise Cloud licenses, and repository defaults need trusted repositories.`;
    return `${html.head(s)}${svg.scene(1440, 560, label, body)}`;
  };

  /* Part 2: the enterprise managed-settings.json, block by block. */
  const enterpriseFile = (s) => {
    const json = ['{', '  "extraKnownMarketplaces": {', '    "platform-tools": {', '      "source": { "source": "github", "repo": "acme-corp/platform-tools" } },',
      '    "awesome-copilot": {', '      "source": { "source": "github", "repo": "github/awesome-copilot" } }', '  },', '  "strictKnownMarketplaces": [',
      '    { "source": "github", "repo": "acme-corp/platform-tools" },', '    { "source": "github", "repo": "github/awesome-copilot" }', '  ],', '  "enabledPlugins": {',
      '    "release-guard@platform-tools": true,', '    "legacy-deploy@platform-tools": false', '  }', '}'];
    const y0 = 70;
    const lh = 29;
    const hl = (k, n, z, at) => svg.g(svg.pop(svg.rect(12, y0 + k * lh - 21, 796, lh * n - 1, { cls: 'zone', r: 6 }), at), { cls: `z-${z}` });
    let body = svg.enter(svg.rect(0, 0, 820, 540, { cls: 'box', r: 16 }), 200);
    body += hl(12, 1, L.enterprise, 700) + hl(13, 1, 'orange', 1300) + hl(7, 4, 'purple', 1900);
    body += svg.enter(svg.text(24, 36, 'acme-corp/.github-private · copilot/managed-settings.json', { cls: 't-xs t-mono', anchor: 'start' }) +
      code(24, y0, json, { lh }), 200);
    const card = (y, h, z, tag, id, desc, at) => svg.g(svg.enter(
      svg.rect(860, y, 580, h, { cls: 'zone', r: 16 }) +
      svg.text(884, y + 34, tag, { cls: 't-xs t-mono z-text', anchor: 'start' }) +
      svg.text(884, y + 66, id, { cls: 'code', anchor: 'start' }) +
      svg.text(884, y + 94, desc, { cls: 't-xs', anchor: 'start' }), at), { cls: `z-${z}` });
    body += card(0, 112, L.enterprise, 'REQUIRED · true', 'release-guard@platform-tools', 'Installed, enabled, and locked on for everyone', 900);
    body += card(128, 112, 'orange', 'BLOCKED · false', 'legacy-deploy@platform-tools', 'Install refused for everyone', 1500);
    const y3 = 256;
    body += svg.g(svg.enter(svg.rect(860, y3, 580, 284, { cls: 'zone', r: 16 }) +
      svg.text(884, y3 + 34, 'APPROVED SOURCES ONLY · strictKnownMarketplaces', { cls: 't-xs t-mono z-text', anchor: 'start' }) +
      svg.lines(884, y3 + 196, 'Built-in marketplaces turn off with it, so awesome-copilot is listed explicitly. Members need read access to each marketplace repository.', { cls: 't-xs', anchor: 'start', max: 62, lh: 22 }), 2100), { cls: 'z-purple' });
    body += svg.pop(row(['platform-tools ✓', 'awesome-copilot ✓'], 884, y3 + 56, { z: 'green' }), 2300);
    const bw = chipW('built-in marketplaces');
    body += svg.g(svg.chip(884, y3 + 108, 'built-in marketplaces', { z: 'orange' }).markup, { cls: 'dim faded m-dim', at: 2700 }) +
      svg.pop(svg.path(`M878 ${y3 + 124}L${890 + bw} ${y3 + 124}`, { cls: 'strike' }), 2900) +
      svg.enter(svg.text(904 + bw, y3 + 130, 'turned off', { cls: 't-xs t-cannot', anchor: 'start' }), 2900);
    const label = 'Enterprise managed-settings.json: extraKnownMarketplaces adds platform-tools and awesome-copilot; strictKnownMarketplaces limits installs to those two and turns off the built-in marketplaces; enabledPlugins requires release-guard@platform-tools (true) and blocks legacy-deploy@platform-tools (false).';
    return `${html.head(s)}${svg.scene(1440, 540, label, body)}`;
  };

  /* Part 2: team mapping, additive plugins, and least-restrictive merge for a two-team member. */
  const teamFile = (s) => {
    const card = (y, h, title, lines, at) => svg.enter(svg.g(svg.rect(0, y, 500, h, { cls: 'box', r: 16 }) +
      svg.text(22, y + 32, title, { cls: 't-xs t-mono', anchor: 'start' }) + code(22, y + 66, lines, { lh: 26, cls: 'code code-sm' }), {}), at);
    let body = card(0, 196, '.github-private/copilot/team-mappings.json', ['{', '  "payments.json": [', '    "payments-core", "payments-mobile" ],', '  "fusion-high.json": [ "platform-sre" ]', '}'], 200) +
      card(214, 196, '.github-private/copilot/teams/payments.json', ['{', '  "enabledPlugins": {', '    "pci-review@platform-tools": true', '  }', '}'], 500);
    body += svg.text(540, 20, 'PAYMENTS-CORE · PLUGIN LIST', { cls: 't-xs t-mono', anchor: 'start' });
    const rows = [
      { id: 'release-guard@platform-tools', note: 'enterprise · required, locked', z: L.enterprise, at: 800, cls: 'zone' },
      { id: 'pci-review@platform-tools', note: 'team · added by payments.json', z: L.team, at: 1300, cls: 'zone', glide: [-260, 0] },
      { id: 'legacy-deploy@platform-tools', note: 'blocked · a team file cannot unblock it', z: 'orange', at: 1900, cls: 'zone dashed' }
    ];
    rows.forEach((r, i) => {
      const y = 36 + i * 76;
      const inner = svg.g(svg.rect(540, y, 440, 64, { cls: r.cls, r: 12 }) +
        svg.text(560, y + 28, r.id, { cls: 'code', anchor: 'start' }) +
        svg.text(560, y + 52, r.note, { cls: 't-xs z-text', anchor: 'start' }), { cls: `z-${r.z}` });
      body += r.glide ? svg.glide(inner, r.glide, r.at) : svg.enter(inner, r.at);
    });
    body += svg.enter(svg.g(svg.rect(540, 276, 440, 134, { cls: 'box soft', r: 14 }) +
      svg.lines(560, 306, 'enabledPlugins is additive: a team file adds on top of the enterprise list.', { cls: 't-sm', anchor: 'start', max: 40, lh: 24 }) +
      svg.lines(560, 364, 'Every other key moves only when the enterprise marked it overridable.', { cls: 't-sm t-muted', anchor: 'start', max: 40, lh: 24 }), {}), 2300);
    body += svg.text(1020, 20, 'MEMBER OF PAYMENTS-CORE + PLATFORM-SRE', { cls: 't-xs t-mono', anchor: 'start' });
    body += svg.enter(svg.g(svg.rect(1020, 36, 420, 88, { cls: 'zone', r: 14 }) +
      svg.text(1040, 66, 'copilot/teams/fusion-high.json', { cls: 't-xs t-mono z-text', anchor: 'start' }) +
      svg.text(1040, 100, '{ "fusionTier": "high" }', { cls: 'code', anchor: 'start' }), { cls: `z-${L.team}` }), 2600);
    [['Enterprise', '"standard", overridable'], ['payments.json', 'not set'], ['fusion-high.json', '"high"']].forEach(([k, v], i) => {
      const y = 140 + i * 48;
      body += svg.enter(svg.g(svg.rect(1020, y, 420, 42, { cls: 'box soft', r: 10 }) +
        svg.text(1040, y + 28, k, { cls: 't-sm', anchor: 'start' }) +
        svg.text(1420, y + 28, v, { cls: 'code', anchor: 'end' }), {}), 2800 + 150 * i);
    });
    body += svg.g(svg.pop(svg.g(svg.rect(1020, 300, 420, 110, { cls: 'zone', r: 16 }) +
      svg.text(1040, 330, 'EFFECTIVE fusionTier', { cls: 't-xs t-mono z-text', anchor: 'start' }) +
      svg.text(1040, 368, '"high"', { cls: 't-lg', anchor: 'start' }) +
      svg.text(1040, 396, 'least restrictive per key, beneath enterprise', { cls: 't-xs', anchor: 'start' }), {}), 3400), { cls: 'z-green' });
    const label = 'team-mappings.json maps payments.json to payments-core and payments-mobile and fusion-high.json to platform-sre. payments.json adds pci-review on top of the enterprise list, and a team file cannot unblock legacy-deploy. A member of payments-core and platform-sre gets fusionTier high, the least restrictive value, beneath enterprise settings.';
    return `${html.head(s)}${svg.scene(1440, 410, label, body)}`;
  };

  /* Part 2 anchor: four sources feed one developer's effective plugin list. */
  const anchorDemo = (s) => {
    const src = [
      { tag: 'ENTERPRISE · managed-settings.json', val: '"release-guard@platform-tools": true', note: 'required, locked on', z: L.enterprise },
      { tag: 'TEAM · teams/payments.json', val: '"pci-review@platform-tools": true', note: 'added for the payments teams', z: L.team },
      { tag: 'REPOSITORY · .github/copilot/settings.json', val: '"github-security@awesome-copilot": true', note: 'default on in a trusted repository', z: L.repository },
      { tag: 'PERSONAL · client settings', val: 'github-security → off', note: 'the developer switches it off', z: L.personal }
    ];
    const list = [
      { id: 'release-guard@platform-tools', state: 'enabled · locked on, disable refused', badges: [['enterprise', L.enterprise]], z: L.enterprise, at: 600 },
      { id: 'pci-review@platform-tools', state: 'enabled · added by the team file', badges: [['team', L.team]], z: L.team, at: 1400 },
      { id: 'github-security@awesome-copilot', state: 'repository default on → switched off, still installed', badges: [['repository', L.repository], ['personal', L.personal]], z: L.repository, at: 2200, sw: true },
      { id: 'legacy-deploy@platform-tools', state: 'blocked · install refused (next slide)', badges: [['enterprise', 'orange']], z: 'orange', at: 3600, dashed: true }
    ];
    const atFor = [600, 1400, 2200, 3000];
    let body = '';
    src.forEach((c, i) => {
      const y = i * 108;
      body += svg.g(svg.enter(svg.rect(0, y, 500, 96, { cls: 'zone', r: 14 }) +
        svg.text(20, y + 30, c.tag, { cls: 't-xs t-mono z-text', anchor: 'start' }) +
        svg.text(20, y + 60, c.val, { cls: 'code code-sm', anchor: 'start' }) +
        svg.text(20, y + 84, c.note, { cls: 't-xs', anchor: 'start' }), atFor[i] - 300), { cls: `z-${c.z}` });
    });
    body += svg.enter(svg.g(svg.rect(580, 0, 860, 410, { cls: 'box', r: 18 }) +
      svg.text(604, 32, 'payments-core developer · Copilot CLI · effective plugins', { cls: 't-xs t-mono', anchor: 'start' }), {}), 200);
    list.forEach((r, i) => {
      const y = 52 + i * 88;
      const target = i === 2 ? 2 : i === 3 ? 0 : i;
      const sy = (target === 2 ? 2 : target) * 108 + 48;
      if (i < 3) body += svg.g(svg.trace(`M502 ${sy}C550 ${sy} 550 ${y + 39} 598 ${y + 39}`, { cls: 'route thin', at: r.at - 150, dur: 400 }), { cls: `z-${r.z}` });
      body += svg.g(svg.enter(svg.rect(600, y, 820, 78, { cls: r.dashed ? 'zone dashed' : 'zone', r: 12 }) +
        svg.text(622, y + 34, r.id, { cls: 'code', anchor: 'start' }) +
        svg.text(622, y + 60, r.state, { cls: 't-xs', anchor: 'start' }), r.at), { cls: `z-${r.z}` });
      let bx = 1404;
      [...r.badges].reverse().forEach(([b, z], k) => {
        const w = chipW(b, 15, 14);
        bx -= w;
        body += svg.pop(svg.chip(bx, y + 22, b, { z, size: 15, h: 32 }).markup, r.at + 200 + (r.sw && k === 0 ? 800 : 0));
        bx -= 10;
      });
      if (r.sw) body += svg.pop(sw(bx - 66, y + 24, false, 3000), 2400);
    });
    body += svg.trace('M502 372C550 372 550 268 598 268', { cls: 'wire link dashed', at: 2900, dur: 400 });
    body += svg.g(svg.pop(svg.g(svg.rect(0, 432, 1440, 92, { cls: 'zone', r: 16 }) +
      svg.text(24, 464, 'EFFECTIVE ANSWER · ONE DEVELOPER', { cls: 't-xs t-mono z-text', anchor: 'start' }) +
      svg.text(24, 502, '✓ release-guard locked on  ·  ✓ pci-review on  ·  ○ github-security off  ·  ✕ legacy-deploy refused', { anchor: 'start' }), {}), 4200), { cls: 'z-green' });
    const label = 'One payments-core developer in Copilot CLI. release-guard arrives locked on from the enterprise; pci-review arrives from the team file; github-security arrives on by repository default and the developer switches it off, so it stays installed and disabled; legacy-deploy is blocked by the enterprise. One effective answer from four layers.';
    return `${html.head(s)}${svg.scene(1440, 524, label, body)}`;
  };

  /* Part 3: the same four bands gain model, Fusion, telemetry, and freshness entries. */
  const samePath = (s) => {
    const bands = [
      { name: 'Enterprise', file: 'managed-settings.json', z: L.enterprise, old: ['enabledPlugins', 'extraKnownMarketplaces', 'strictKnownMarketplaces'], add: ['model: fusion', 'fusionTier: standard', 'allowedMcpServers', 'telemetry.capture', 'forceRemoteSettingsRefresh'] },
      { name: 'Team', file: 'teams/*.json', z: L.team, old: ['enabledPlugins (additive)'], add: ['fusionTier: high · platform-sre'] },
      { name: 'Repository', file: '.github/copilot/settings.json', z: L.repository, old: ['enabledPlugins defaults'], add: [] },
      { name: 'Personal', file: 'client settings', z: L.personal, old: ['switch off defaults'], add: [] }
    ];
    let body = '';
    bands.forEach((b, i) => {
      const y = i * 116;
      const at = 200 + 200 * i;
      body += svg.g(svg.enter(svg.rect(0, y, 1440, 104, { cls: 'zone', r: 14 }) +
        svg.text(24, y + 44, b.name, { cls: 't-lg z-text', anchor: 'start' }) +
        svg.text(24, y + 76, b.file, { cls: 't-xs t-mono', anchor: 'start' }), at), { cls: `z-${b.z}` });
      body += svg.enter(svg.g(row(b.old, 310, y + 16, { z: b.z }), { cls: 'dim faded m-dim', at: 600 }), at + 200);
      if (b.add.length) body += svg.glide(row(b.add, 310, y + 58, { z: 'purple', cls: 'on' }), [240, 0], 1400 + 500 * i);
    });
    body += svg.halo(470, 190, 22, { z: 'purple', at: 2600 });
    const label = 'The four-layer stack from Part 2. The enterprise band already holds enabledPlugins and marketplace keys and now gains model fusion, fusionTier standard, allowedMcpServers, telemetry capture, and forceRemoteSettingsRefresh; the team band gains fusionTier high for platform-sre; repository and personal bands keep plugin defaults and opt-out.';
    return `${html.head(s)}${svg.scene(1440, 452, label, body)}${html.footnote(s.footnote)}`;
  };

  /* Part 3: one overridable key, two developers, two Fusion effort levels. */
  const fusionTierTeam = (s) => {
    let body = svg.g(svg.enter(svg.rect(0, 0, 640, 150, { cls: 'zone', r: 16 }) +
      svg.text(24, 34, 'ENTERPRISE · managed-settings.json', { cls: 't-xs t-mono z-text', anchor: 'start' }) +
      code(24, 76, ['"model": { "overridable": "fusion" },', '"fusionTier": { "overridable": "standard" }'], { lh: 34 }), 200), { cls: `z-${L.enterprise}` });
    body += svg.g(svg.enter(svg.rect(0, 168, 640, 130, { cls: 'zone', r: 16 }) +
      svg.text(24, 202, 'TEAM · copilot/teams/fusion-high.json', { cls: 't-xs t-mono z-text', anchor: 'start' }) +
      svg.text(24, 240, '{ "fusionTier": "high" }', { cls: 'code', anchor: 'start' }) +
      svg.text(24, 274, 'mapped to platform-sre in team-mappings.json', { cls: 't-xs', anchor: 'start' }), 600), { cls: `z-${L.team}` });
    body += svg.enter(svg.g(svg.rect(0, 316, 640, 100, { cls: 'box soft', r: 14 }) +
      svg.lines(24, 350, 'Values from most to least restrictive: standard, high, max, unmanaged. Any value except unmanaged locks the tier.', { cls: 't-sm t-muted', anchor: 'start', max: 58, lh: 28 }), {}), 900);
    const sessions = [
      { who: 'payments-core developer · new session', on: 0, result: 'Fusion effort: Standard · enterprise default', at: 1300 },
      { who: 'platform-sre developer · new session', on: 1, result: 'Fusion effort: High · fusion-high.json', at: 2000 }
    ];
    sessions.forEach((ss, i) => {
      const y = i * 235;
      body += svg.enter(svg.g(svg.rect(700, y, 740, 215, { cls: 'box', r: 18 }) +
        svg.text(724, y + 40, ss.who, { cls: 't-sm', anchor: 'start' }) +
        svg.text(724, y + 182, ss.result, { cls: 't-sm t-muted', anchor: 'start' }), {}), ss.at - 400);
      ['Standard', 'High', 'Max'].forEach((t, k) => {
        const x = 724 + k * 232;
        const active = k === ss.on;
        const seg = svg.g(svg.rect(x, y + 70, 222, 70, { cls: active ? 'zone' : 'box soft', r: 12 }) +
          svg.text(x + 111, y + 113, t, { cls: active ? 't-lg z-text' : 't-sm t-muted' }), { cls: active ? 'z-purple' : '' });
        body += active ? svg.pop(seg, ss.at + 300) : svg.enter(seg, ss.at);
      });
      body += svg.halo(724 + ss.on * 232 + 111, y + 105, 30, { z: 'purple', at: ss.at + 600 });
    });
    const label = 'Managed settings set model fusion and fusionTier standard, both overridable. fusion-high.json sets fusionTier high and maps to platform-sre. A payments-core developer starts at Standard effort; a platform-sre developer starts at High.';
    return `${html.head(s)}${svg.scene(1440, 450, label, body)}`;
  };

  /* Part 3: capture panel with identity on and five content classes off; one span with identity and no content. */
  const telemetryCapture = (s) => {
    const classes = [
      ['identity', 'account, OS user, machine name', true], ['prompts', 'what the developer typed', false], ['responses', 'model output', false],
      ['toolArguments', 'includes plugin, hook, MCP ids', false], ['toolOutput', 'what tools returned', false], ['policyDetail', 'for example raw sandbox paths', false]
    ];
    let body = svg.text(0, 18, 'telemetry.capture · managed settings', { cls: 't-xs t-mono', anchor: 'start' });
    classes.forEach(([n, d, on], i) => {
      const y = 36 + i * 62;
      const at = 300 + 160 * i;
      body += svg.g(svg.enter(svg.rect(0, y, 760, 54, { cls: on ? 'zone' : 'box soft', r: 12 }) +
        svg.text(20, y + 34, n, { cls: on ? 'code z-text' : 'code', anchor: 'start' }) +
        svg.text(250, y + 34, d, { cls: 't-xs', anchor: 'start' }) +
        svg.text(660, y + 34, on ? 'ON' : 'OFF', { cls: on ? 't-xs t-mono z-text' : 't-xs t-mono', anchor: 'end' }), at), { cls: on ? 'z-green' : '' });
      body += svg.pop(sw(680, y + 13, on, at + 300), at + 150);
    });
    const attrs = [['✓', 'Copilot account name'], ['✓', 'local OS account'], ['✓', 'machine name'], ['—', 'prompt text'], ['—', 'response text'], ['—', 'tool arguments and output']];
    body += svg.g(svg.enter(svg.rect(820, 36, 620, 364, { cls: 'zone', r: 18 }) +
      svg.text(844, 70, 'OTEL SPAN · one Copilot request', { cls: 't-xs t-mono z-text', anchor: 'start' }), 1400), { cls: 'z-purple' });
    attrs.forEach(([m, t], i) => {
      body += svg.enter(svg.text(850, 116 + i * 46, `${m}  ${t}`, { cls: m === '✓' ? 't-sm' : 't-sm t-muted', anchor: 'start' }), 1700 + 180 * i);
    });
    body += svg.ride('M760 63C790 63 790 110 840 110', { z: 'green', at: 1800, dur: 1800, r: 6 });
    body += svg.g(svg.enter(svg.rect(0, 420, 1440, 70, { cls: 'zone', r: 14 }) +
      svg.text(24, 462, 'Precedence: managed › local settings › SDK config › environment. The highest managed source supplies the whole telemetry object.', { cls: 't-sm', anchor: 'start' }), 2900), { cls: `z-${L.enterprise}` });
    const label = 'Managed telemetry capture: identity on; prompts, responses, toolArguments, toolOutput, and policyDetail off by default. The exported span carries Copilot account name, OS account, and machine name, with no prompt, response, or tool content. Managed values beat local settings, SDK config, and environment, and the highest managed source supplies the whole telemetry object.';
    return `${html.head(s)}${svg.scene(1440, 490, label, body)}${html.footnote(s.footnote)}`;
  };

  /* Part 4: native layers versus APM, with a short apm.yml beside the table. */
  const APM_ROWS = [
    ['Require or block for everyone', ['✓', 'enabledPlugins true or false'], ['—', 'apm-policy.yml governs APM installs only']],
    ['Different requirements per team', ['✓', 'team files, additive plugins'], ['—', '']],
    ['Recommend for one repository', ['✓', '.github/copilot/settings.json'], ['✓', 'apm.yml in the repository']],
    ['One manifest, many agent tools', ['◐', 'skills and MCP are portable'], ['✓', 'deploys to each harness']],
    ['Pin versions and content hashes', ['◐', 'versions, optional autoUpdate'], ['✓', 'lockfile pins hashes']],
    ['Enforcement on Copilot surfaces', ['✓', 'managed, fail-closed refresh'], ['—', '']],
    ['Models, Fusion tier, telemetry', ['✓', 'same managed path'], ['—', '']]
  ];
  const nativeVsApm = (s) => {
    const cell = (x, y, [m, t], at, z) => {
      const lines = t ? wrap(t, 26) : [];
      const tone = m === '✓' ? z : m === '◐' ? 'orange' : '';
      return svg.g(svg.pop(svg.text(x, y + 36, m, { cls: tone ? 'mark z-text' : 'mark t-muted' }), at), { cls: tone ? `z-${tone}` : '' }) +
        svg.enter(lines.map((l, k) => svg.text(x + 22, y + (lines.length > 1 ? 26 : 35) + k * 20, l, { cls: 't-xs', anchor: 'start' })).join(''), at);
    };
    let body = [['NEED', 20], ['NATIVE LAYERS', 350], ['APM', 650]].map(([t, x]) => svg.text(x, 22, t, { cls: 't-xs t-mono col-label', anchor: 'start' })).join('');
    APM_ROWS.forEach(([need, n, a], i) => {
      const y = 40 + i * 66;
      const at = 300 + 220 * i;
      body += svg.enter(svg.g(svg.rect(0, y, 920, 58, { cls: 'box soft', r: 12 }) +
        svg.text(20, y + 35, need, { cls: 't-sm', anchor: 'start' }), {}), at);
      body += cell(352, y, n, at + 120, L.enterprise) + cell(652, y, a, at + 200, 'purple');
    });
    body += svg.enter(svg.g(svg.rect(960, 0, 480, 232, { cls: 'box', r: 16 }) +
      svg.text(984, 34, 'apm.yml · product repository', { cls: 't-xs t-mono', anchor: 'start' }) +
      code(984, 72, ['name: payments-service', 'version: 1.0.0', 'dependencies:', '  apm:', '    - acme-corp/platform-tools/plugins/release-guard'], { lh: 30, cls: 'code code-xs' }), {}), 1800);
    body += svg.g(svg.enter(svg.rect(960, 250, 480, 112, { cls: 'zone', r: 14 }) +
      svg.lines(984, 282, 'apm install deploys to each selected harness; the lockfile records version, commit, and content hash.', { cls: 't-sm', anchor: 'start', max: 42, lh: 26 }), 2200), { cls: 'z-purple' });
    body += svg.g(svg.enter(svg.rect(960, 380, 480, 112, { cls: 'zone', r: 14 }) +
      svg.lines(984, 412, 'Side by side: APM writes repository files; managed settings still win on Copilot surfaces.', { cls: 't-sm', anchor: 'start', max: 42, lh: 26 }), 2600), { cls: 'z-green' });
    const label = `Native layers versus APM. ${APM_ROWS.map(([need, n, a]) => `${need}: native ${n[0] === '✓' ? 'yes' : n[0] === '◐' ? 'partly' : 'no'}${n[1] ? ` (${n[1]})` : ''}; APM ${a[0] === '✓' ? 'yes' : 'no'}${a[1] ? ` (${a[1]})` : ''}.`).join(' ')} apm.yml lists acme-corp/platform-tools/plugins/release-guard; the lockfile pins version, commit, and content hash; managed settings still win on Copilot surfaces.`;
    return `${html.head(s)}${svg.scene(1440, 502, label, body)}`;
  };

  /* Part 2: the .github-private governance repository, its contents, its ruleset, and who merges changes. */
  const governanceRepo = (s) => {
    let body = svg.enter(svg.g(svg.rect(0, 0, 420, 250, { cls: 'box', r: 16 }) +
      svg.text(24, 34, 'ENTERPRISE · AI CONTROLS', { cls: 't-xs t-mono', anchor: 'start' }) +
      svg.text(24, 74, 'Agents → Configuration source', { cls: 't-sm', anchor: 'start' }) +
      svg.lines(24, 176, 'The Configuration summary lists what the repository supplies.', { cls: 't-xs t-muted', anchor: 'start', max: 40, lh: 22 }), {}), 200);
    body += svg.pop(svg.chip(24, 96, 'org: acme-corp', { z: L.enterprise, size: 17, h: 34 }).markup, 500);
    body += svg.g(svg.trace('M420 113C445 113 445 60 470 60', { cls: 'route thin', at: 700, dur: 400 }), { cls: `z-${L.enterprise}` });
    body += svg.enter(svg.g(svg.rect(0, 270, 420, 150, { cls: 'box soft', r: 16 }) +
      svg.text(24, 302, 'VISIBILITY', { cls: 't-xs t-mono', anchor: 'start' }) +
      svg.text(24, 340, 'Internal: members propose by PR', { cls: 't-sm', anchor: 'start' }) +
      svg.text(24, 376, 'Private: grant access by hand', { cls: 't-sm t-muted', anchor: 'start' }), {}), 900);
    body += svg.enter(svg.g(svg.rect(470, 0, 520, 420, { cls: 'box', r: 18 }) +
      svg.text(494, 36, 'acme-corp/.github-private', { cls: 'code', anchor: 'start' }), {}), 400);
    const files = [
      ['copilot/managed-settings.json', 'enterprise', L.enterprise],
      ['copilot/team-mappings.json', 'team map', L.team],
      ['copilot/teams/*.json', 'team files', L.team],
      ['agent profiles/', 'folder unconfirmed', 'purple']
    ];
    files.forEach(([f, tag, z], i) => {
      const y = 62 + i * 52;
      const at = 1000 + 300 * i;
      body += svg.g(svg.enter(svg.rect(490, y, 480, 44, { cls: 'zone', r: 10 }) +
        svg.text(506, y + 29, f, { cls: 'code code-sm', anchor: 'start' }) +
        svg.text(954, y + 28, tag, { cls: 't-xs z-text', anchor: 'end' }), at), { cls: `z-${z}` });
    });
    body += svg.g(svg.trace('M482 54L978 54L978 274L482 274Z', { cls: 'route thin', at: 2300, dur: 700 }), { cls: 'z-purple' });
    body += svg.g(svg.enter(svg.rect(490, 292, 480, 112, { cls: 'zone', r: 12 }) +
      svg.text(510, 322, '🛡 RULESET · Protect agent files', { cls: 't-xs t-mono z-text', anchor: 'start' }) +
      svg.lines(510, 352, 'Only enterprise owners and bypass actors edit agent profiles; members with write access still open PRs.', { cls: 't-xs', anchor: 'start', max: 54, lh: 22 }), 2600), { cls: 'z-purple' });
    body += svg.enter(svg.g(svg.rect(1040, 0, 400, 130, { cls: 'box', r: 16 }) +
      svg.text(1062, 34, 'MEMBER PULL REQUEST', { cls: 't-xs t-mono', anchor: 'start' }) +
      svg.text(1062, 72, 'teams/payments.json', { cls: 'code code-sm', anchor: 'start' }) +
      svg.text(1062, 104, '+ pci-review@platform-tools', { cls: 'code code-sm', anchor: 'start' }), {}), 3000);
    body += svg.trace('M1240 132L1240 158', { cls: 'wire link', at: 3300, dur: 200 });
    body += svg.g(svg.enter(svg.rect(1040, 160, 400, 260, { cls: 'zone', r: 16 }) +
      svg.text(1062, 194, 'AI MANAGERS · enterprise team', { cls: 't-xs t-mono z-text', anchor: 'start' }) +
      svg.lines(1062, 228, 'Custom role: Manage enterprise AI controls and Read enterprise audit logs', { cls: 't-sm', anchor: 'start', max: 34, lh: 26 }) +
      svg.lines(1062, 330, 'Holds ruleset bypass; merges governance PRs', { cls: 't-sm', anchor: 'start', max: 34, lh: 26 }) +
      svg.text(1062, 400, 'Custom roles: public preview', { cls: 't-xs t-muted', anchor: 'start' }), 3500), { cls: 'z-green' });
    body += svg.g(svg.trace('M1040 290C1015 290 1015 160 992 160', { cls: 'route thin', at: 3900, dur: 400 }), { cls: 'z-green' });
    body += svg.ride('M1040 290C1015 290 1015 160 992 160', { z: 'green', at: 4200, dur: 1600, r: 6 });
    body += svg.g(svg.enter(svg.rect(0, 440, 1440, 60, { cls: 'zone', r: 14 }) +
      svg.text(24, 478, 'Settings reach every user on the plan with a supported client, whether or not they can read this repository', { cls: 't-sm', anchor: 'start' }), 4500), { cls: `z-${L.enterprise}` });
    const label = 'Enterprise AI controls, Agents, Configuration source points at the acme-corp org; its .github-private repository holds copilot/managed-settings.json, copilot/team-mappings.json, copilot/teams/*.json, and enterprise agent profiles (folder unconfirmed). A ruleset lets only enterprise owners and bypass actors edit agent profiles while members with write access open pull requests. An AI managers enterprise team with a custom role and ruleset bypass merges a member pull request that adds pci-review to teams/payments.json. Internal visibility lets members propose changes; settings reach every user on the plan whether or not they can read the repository.';
    return `${html.head(s)}${svg.scene(1440, 500, label, body)}`;
  };

  /* Part 3: the MCP allowlist and denylist, three servers tested against them, and three boundaries. */
  const mcpAllowlist = (s) => {
    const json = ['{', '  "allowedMcpServers": [', '    { "serverUrl": "https://api.githubcopilot.com/*" },', '    { "serverCommand": ["npx", "@playwright/mcp@latest"] }', '  ],',
      '  "deniedMcpServers": [', '    { "serverCommand": ["npx",', '      "@modelcontextprotocol/server-filesystem", "/"] }', '  ]', '}'];
    const y0 = 70;
    const lh = 30;
    const hl = (k, n, z, at) => svg.g(svg.pop(svg.rect(12, y0 + k * lh - 21, 636, lh * n - 2, { cls: 'zone', r: 6 }), at), { cls: `z-${z}` });
    let body = svg.enter(svg.rect(0, 0, 660, 420, { cls: 'box', r: 16 }), 200);
    body += hl(2, 2, 'green', 600) + hl(6, 2, 'orange', 1000);
    body += svg.enter(svg.text(24, 36, 'copilot/managed-settings.json · overridable keys', { cls: 't-xs t-mono', anchor: 'start' }) +
      code(24, y0, json, { lh, cls: 'code code-sm' }) +
      svg.lines(24, 386, 'Allow entries follow the docs example; the deny entry is a worked example.', { cls: 't-xs t-muted', anchor: 'start', max: 76, lh: 20 }), 200);
    const tests = [
      { srv: 'serverUrl https://api.githubcopilot.com/mcp/', res: '✓ matches allow · runs', z: 'green' },
      { srv: 'a serverCommand on neither list', res: '✕ no allow match · blocked', z: 'orange', cls: 't-sm t-muted' },
      { srv: 'npx …/server-filesystem /', res: '✕ matches deny · blocked, deny wins', z: 'orange' }
    ];
    body += svg.text(700, 20, 'SERVER TESTS', { cls: 't-xs t-mono', anchor: 'start' });
    tests.forEach((t, i) => {
      const y = 34 + i * 96;
      const at = 1400 + 600 * i;
      body += svg.enter(svg.g(svg.rect(700, y, 740, 84, { cls: 'box soft', r: 12 }) +
        svg.text(724, y + 34, t.srv, { cls: t.cls || 'code code-sm', anchor: 'start' }), {}), at);
      body += svg.g(svg.pop(svg.text(724, y + 66, t.res, { cls: 't-sm z-text', anchor: 'start' }), at + 300), { cls: `z-${t.z}` });
    });
    body += svg.g(svg.enter(svg.rect(700, 334, 740, 86, { cls: 'zone', r: 12 }) +
      svg.lines(724, 368, 'Covers user and repository MCP servers and Copilot connectors; team files widen or narrow it where overridable.', { cls: 't-xs', anchor: 'start', max: 78, lh: 22 }), 3400), { cls: `z-${L.enterprise}` });
    const sides = [
      ['POLICY PLANE FIRST', 'MCP servers in Copilot policy must be enabled', 'purple'],
      ['PREVIEW PATH', 'Registry only restriction: public preview', 'orange'],
      ['OUTSIDE THE LIST', 'Agent-profile servers: cloud agent firewall', 'orange']
    ];
    sides.forEach(([tag, d, z], i) => {
      const x = i * 488;
      body += svg.g(svg.enter(svg.rect(x, 440, 464, 84, { cls: 'zone', r: 14 }) +
        svg.text(x + 22, 472, tag, { cls: 't-xs t-mono z-text', anchor: 'start' }) +
        svg.text(x + 22, 504, d, { cls: 't-xs', anchor: 'start' }), 3800 + 250 * i), { cls: `z-${z}` });
    });
    const label = 'Managed settings allowedMcpServers permit https://api.githubcopilot.com/* and npx @playwright/mcp@latest; deniedMcpServers blocks the filesystem server pointed at the root, a worked example. The GitHub MCP URL matches the allowlist and runs; a command on neither list is blocked; the filesystem-root command matches the denylist and is blocked because deny wins. The lists cover user and repository MCP servers and Copilot connectors. Boundaries: the MCP servers in Copilot policy must be enabled, the registry-only restriction is public preview, and MCP servers in repository agent profiles fall to the cloud agent firewall.';
    return `${html.head(s)}${svg.scene(1440, 524, label, body)}`;
  };

  window.SCENES = {
    'layer-rings': layerRings,
    'three-asks': threeAsks,
    'plugin-unit': pluginUnit,
    'plugin-anatomy': pluginAnatomy,
    'marketplace-id': marketplaceId,
    'governance-repo': governanceRepo,
    'four-layers': fourLayers,
    'enterprise-file': enterpriseFile,
    'team-file': teamFile,
    'anchor-demo': anchorDemo,
    'same-path': samePath,
    'fusion-tier-team': fusionTierTeam,
    'mcp-allowlist': mcpAllowlist,
    'telemetry-capture': telemetryCapture,
    'native-vs-apm': nativeVsApm
  };
})();
