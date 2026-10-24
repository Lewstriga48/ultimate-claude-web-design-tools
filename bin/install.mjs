#!/usr/bin/env node
// Ultimate Claude Web Design Tools and Package
// by Arda Ata Arslan
//
// One-shot setup: installs a curated stack of Claude Code design/animation
// skills and MCP servers into the project you run this from (skills) and
// your user-level Claude Code config (plugins + MCP servers).

import { execSync } from "node:child_process";

const steps = [];
let failures = 0;

function run(label, cmd) {
  console.log(`\n→ ${label}`);
  console.log(`  $ ${cmd}`);
  try {
    execSync(cmd, { stdio: "inherit" });
    steps.push({ label, ok: true });
  } catch (err) {
    failures += 1;
    steps.push({ label, ok: false, error: err.message });
    console.warn(`  ! "${label}" did not finish cleanly (continuing). ${err.message}`);
  }
}

console.log("Ultimate Claude Web Design Tools and Package — setup starting");
console.log("by Arda Ata Arslan\n");

// Sanity check: Claude Code CLI must be installed.
try {
  execSync("claude --version", { stdio: "ignore" });
} catch {
  console.error(
    "Claude Code CLI ('claude') was not found on PATH. Install it first: https://claude.com/claude-code"
  );
  process.exit(1);
}

// 1. Emil Kowalski's design/animation skill pack (project-scoped skills).
run(
  "Install emilkowalski/skills (design + animation skills)",
  "npx skills@latest add emilkowalski/skills --all -y"
);

// 2. Impeccable plugin (design vocabulary, anti-pattern detector, hooks).
run(
  "Add Impeccable marketplace",
  "claude plugin marketplace add pbakaus/impeccable"
);
run(
  "Install Impeccable plugin",
  "claude plugin install impeccable@impeccable"
);

// 3. Taste-skill plugin (art direction, reference library, browser check).
run(
  "Add taste-skill marketplace",
  "claude plugin marketplace add Leonxlnx/taste-skill"
);
run(
  "Install taste-skill plugin",
  "claude plugin install taste-skill@taste-skill"
);

// 4. Figma MCP server (official, remote, OAuth).
run(
  "Add Figma MCP server (user scope)",
  'claude mcp add --transport http figma https://mcp.figma.com/mcp -s user'
);

// 5. Playwright MCP server (official, local, stdio).
run(
  "Add Playwright MCP server (user scope)",
  "claude mcp add playwright -s user -- npx -y @playwright/mcp@latest"
);

console.log("\n──────────────────────────────────────────────");
console.log("Setup finished.");
console.log(`  ${steps.filter((s) => s.ok).length}/${steps.length} steps completed cleanly.`);
if (failures > 0) {
  console.log(
    "  Some steps reported a non-zero exit (often because they were already installed) — check the log above."
  );
}

console.log("\nManual follow-ups:");
console.log("  1. Figma needs you to sign in once:  claude mcp login figma");
console.log("     (run that in an interactive terminal, not a script)");
console.log("  2. Optionally turn on Impeccable's automated checks:");
console.log("     /impeccable init");
console.log("     /impeccable hooks on");
console.log("\nRestart/reload Claude Code so the new skills, plugins and MCP servers are picked up.");
