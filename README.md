# Ultimate Claude Web Design Tools and Package

by **Arda Ata Arslan**

One command that equips a project with a curated Claude Code design/animation
stack: skills, plugins, and MCP servers, so you don't have to wire each one up
by hand on every new project.

## Usage

Run inside the project you want to equip (Claude Code must already be
installed and on `PATH`, Node.js 20+ required):

```bash
npx github:Lewstriga48/ultimate-claude-web-design-tools
```

Then restart/reload Claude Code so the new skills, plugins and MCP servers
are picked up.

## What it installs

| # | What | Source | Scope |
|---|------|--------|-------|
| 1 | 15 design/animation skills (`emil-design-eng`, `animate`, `review-animations`, `apple-design`, `ask-sonner`, …) | [emilkowalski/skills](https://github.com/emilkowalski/skills) | project (`.claude/skills`) |
| 2 | **Impeccable** plugin — design vocabulary, 62-check anti-pattern detector, slash commands, hooks | [pbakaus/impeccable](https://github.com/pbakaus/impeccable) | user |
| 3 | **taste-skill** plugin — art direction, reference image library, real-browser inspector | [Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill) | user |
| 4 | **Figma** MCP server (official, remote, OAuth) | `https://mcp.figma.com/mcp` | user |
| 5 | **Playwright** MCP server (official, local) | [`@playwright/mcp`](https://www.npmjs.com/package/@playwright/mcp) | user |

Each step is idempotent-ish: if something is already installed, the script
logs a warning and keeps going rather than aborting.

## Manual follow-ups (can't be scripted)

1. **Figma needs an interactive OAuth login once:**
   ```bash
   claude mcp login figma
   ```
   Run this yourself in a real terminal (not through automation) — it opens
   a browser window for you to approve.

2. **Optionally turn on Impeccable's automated design checks:**
   ```
   /impeccable init
   /impeccable hooks on
   ```
   Approve the hooks when your tool asks.

## Requirements

- [Claude Code](https://claude.com/claude-code) installed and on `PATH`
- Node.js 20 or newer

## Credits & licenses

This package only orchestrates installs — it does not vendor the third-party
code. All credit for the actual skills/plugins goes to their authors:

- [emilkowalski/skills](https://github.com/emilkowalski/skills) — MIT, © Emil Kowalski
- [pbakaus/impeccable](https://github.com/pbakaus/impeccable) — Apache-2.0, © Paul Bakaus
- [Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill) — MIT, © leonxlnx
- [microsoft/playwright-mcp](https://github.com/microsoft/playwright-mcp) — Apache-2.0, © Microsoft
- Figma MCP server — © Figma

This wrapper (`bin/install.mjs`, `package.json`, this README) is MIT-licensed,
© Arda Ata Arslan.
