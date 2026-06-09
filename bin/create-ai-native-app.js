#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const args = process.argv.slice(2);
const name = args.find((arg) => !arg.startsWith("-"));

if (args.includes("--help") || args.includes("-h")) {
  console.log(`
@aniruddhlr/create-ai-native-app

Usage:
  npx @aniruddhlr/create-ai-native-app my-app

Creates a minimal AI Native Architecture project structure.
`);
  process.exit(0);
}

if (!name) {
  console.error("Please provide an app name.");
  console.error("Example: npx @aniruddhlr/create-ai-native-app my-app");
  process.exit(1);
}

const root = path.resolve(process.cwd(), name);

if (fs.existsSync(root)) {
  console.error(`Directory already exists: ${root}`);
  process.exit(1);
}

const dirs = [
  "src/app",
  "src/domains/tasks/list/components",
  "src/domains/tasks/detail/components",
  "src/shared/ui",
  "src/shared/http",
  "src/shared/config"
];

fs.mkdirSync(root, { recursive: true });

for (const dir of dirs) {
  fs.mkdirSync(path.join(root, dir), { recursive: true });
}

write("README.md", `# ${name}

Generated with AI Native Architecture.

## Structure

\`\`\`txt
src/
  app/
  domains/
  shared/
\`\`\`

Start feature work in \`src/domains\`. Keep UI, API, schema, types, state, and tests close to the feature.

## Scripts

\`\`\`bash
npm install
npm run dev
\`\`\`
`);

write("package.json", `{
  "name": "${toPackageName(name)}",
  "private": true,
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "test": "vitest",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^5.0.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "typescript": "^5.8.0",
    "vite": "^7.0.0",
    "vitest": "^3.0.0"
  }
}
`);

write("index.html", `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>AI Native App</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=Outfit:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`);

write("tsconfig.json", `{
  "compilerOptions": {
    "target": "ES2022",
    "useDefineForClassFields": true,
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "allowJs": false,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  },
  "include": ["src"]
}
`);

write("vite.config.ts", `import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    include: ["src/**/test.{ts,tsx}", "src/**/*.{test,spec}.{ts,tsx}"]
  }
});
`);

// Copy all template files from templates/ directory
const templatesPath = path.resolve(__dirname, "../templates");
if (fs.existsSync(templatesPath)) {
  const files = fs.readdirSync(templatesPath);
  for (const file of files) {
    const src = path.join(templatesPath, file);
    const dest = path.join(root, file);
    if (fs.statSync(src).isFile()) {
      fs.copyFileSync(src, dest);
    }
  }
} else {
  // Fallback: write standard AGENTS.md if templates folder is not found
  write("AGENTS.md", `# AGENTS.md

## Purpose

Canonical rules for agents working in this app.

This file is optimized for token efficiency, not prose readability.

## Load

Agents should read this before changing code.

## Protocol

Before editing:

1. Identify domain: src/domains/<domain>.
2. Identify feature: src/domains/<domain>/<feature>.
3. Read local schema, types, api, state, UI, and tests.
4. Search before adding code. Reuse existing local behavior.
5. Edit locally first. Touch src/shared only for cross-domain primitives.
6. Avoid duplicate business logic.
7. Update nearby tests.

Architecture:

- Runtime setup: src/app.
- Product behavior: src/domains.
- Cross-domain primitives: src/shared.
- Keep feature code together.

## Proof

Success target:

\`\`\`txt
Feature understood in fewer than 10 files.
Unrelated domains opened: 0.
Duplicate business logic added: 0.
Nearby tests updated: yes.
\`\`\`

## Limits

- Avoid global utils.ts, helpers.ts, common.ts, and misc.ts.
- Do not move code to shared after one use.
- Keep agent-loaded docs compact.
`);
}

// Generate the Cursor auto-load rules configuration
fs.mkdirSync(path.join(root, ".cursor/rules"), { recursive: true });
write(".cursor/rules/ai-native.mdc", `---
description: AI Native Architecture project rules
alwaysApply: true
---

Follow AGENTS.md. Optimize for local feature context, no duplicate business logic, and fewer than 10 files to understand a feature.
`);

write("src/app/router.tsx", `export function Router() {
  return (
    <div className="container">
      <header>
        <div className="badge">AI Native Starter</div>
        <h1>Environment Configured</h1>
        <p className="subtitle">Your codebase is structured and optimized for autonomous developer agents.</p>
      </header>

      <div className="card">
        <div className="section-title">
          <span>📁</span> Codebase Directory Structure
        </div>
        <pre className="tree-view">
{\`src/
├── app/               \`}<span className="tree-comment">// Application bootstrapping & routing</span>{\`
│   ├── App.tsx
│   ├── providers.tsx
│   └── router.tsx
├── \`}<span className="tree-highlight">domains/</span>{\`           \`}<span className="tree-comment">// Product domain behavior (Features live here)</span>{\`
│   └── \`}<span className="tree-domain">tasks/</span>{\`
│       ├── detail/
│       │   └── page.tsx
│       └── \`}<span className="tree-domain">list/</span>{\`
│           ├── components/
│           ├── api.ts
│           ├── schema.ts
│           ├── state.ts
│           ├── types.ts
│           └── test.tsx
└── shared/            \`}<span className="tree-comment">// Cross-domain base primitives</span>{\`
    ├── config/
    ├── http/
    └── ui/\`}
        </pre>
      </div>

      <div className="grid">
        <div className="grid-card">
          <h3>⚡ Local Features First</h3>
          <p>Keep your schemas, components, APIs, states, and tests colocated in target feature folders to prevent agent context pollution.</p>
        </div>
        <div className="grid-card">
          <h3>🤖 Short Agent Instructions</h3>
          <p>Canonical rules are loaded from AGENTS.md. Maintain concise protocols so context windows are not wasted on repetitive prose.</p>
        </div>
      </div>

      <div className="actions">
        <a href="https://github.com/aniruddhlr/ai-native-architecture" target="_blank" rel="noreferrer" className="btn btn-primary">
          View Documentation
        </a>
        <a href="https://github.com/aniruddhlr/ai-native-architecture" target="_blank" rel="noreferrer" className="btn btn-secondary">
          View GitHub
        </a>
      </div>
    </div>
  );
}
`);

write("src/app/App.tsx", `import { Providers } from "./providers";
import { Router } from "./router";

export function App() {
  return (
    <Providers>
      <Router />
    </Providers>
  );
}
`);

write("src/main.tsx", `import { createRoot } from "react-dom/client";
import { App } from "./app/App";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);
`);

write("src/index.css", `:root {
  --bg-color: #0b0f19;
  --panel-bg: rgba(17, 24, 39, 0.75);
  --border-color: rgba(255, 255, 255, 0.08);
  --primary-color: #3b82f6;
  --secondary-color: #8b5cf6;
  --text-main: #f3f4f6;
  --text-muted: #9ca3af;
  --accent-glow: radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.15), transparent 60%);
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  background-color: var(--bg-color);
  color: var(--text-main);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-x: hidden;
  position: relative;
}

body::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--accent-glow);
  pointer-events: none;
  z-index: 0;
}

.container {
  max-width: 800px;
  width: 90%;
  z-index: 1;
  padding: 40px 0;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

header {
  text-align: center;
  margin-bottom: 10px;
}

.badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1));
  border: 1px solid rgba(139, 92, 246, 0.2);
  padding: 6px 14px;
  border-radius: 100px;
  font-size: 0.8rem;
  font-weight: 600;
  color: #a78bfa;
  margin-bottom: 14px;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

h1 {
  font-family: 'Outfit', sans-serif;
  font-size: 2.2rem;
  font-weight: 700;
  background: linear-gradient(135deg, #ffffff 40%, #a78bfa 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 10px;
  letter-spacing: -0.02em;
}

p.subtitle {
  color: var(--text-muted);
  font-size: 1.05rem;
  line-height: 1.5;
}

.card {
  background: var(--panel-bg);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  padding: 28px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.section-title {
  font-family: 'Outfit', sans-serif;
  font-size: 1.15rem;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.tree-view {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.85rem;
  background: rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.04);
  padding: 20px;
  border-radius: 10px;
  line-height: 1.6;
  color: #d1d5db;
  overflow-x: auto;
}

.tree-comment {
  color: #6b7280;
}

.tree-highlight {
  color: #3b82f6;
  font-weight: 500;
}

.tree-domain {
  color: #10b981;
  font-weight: 500;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
}

.grid-card {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 18px;
  transition: all 0.2s ease;
}

.grid-card:hover {
  background: rgba(255, 255, 255, 0.04);
  border-color: rgba(139, 92, 246, 0.25);
  transform: translateY(-2px);
}

.grid-card h3 {
  font-size: 0.95rem;
  font-weight: 600;
  margin-bottom: 6px;
  color: #ffffff;
}

.grid-card p {
  font-size: 0.8rem;
  color: var(--text-muted);
  line-height: 1.4;
}

.actions {
  display: flex;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 10px;
}

.btn {
  font-family: inherit;
  font-weight: 600;
  font-size: 0.85rem;
  padding: 10px 20px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.btn-primary {
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  color: #ffffff;
  box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
}

.btn-primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 16px rgba(139, 92, 246, 0.45);
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #f3f4f6;
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.2);
}
`);

write("src/vite-env.d.ts", `/// <reference types="vite/client" />
`);

write("src/app/providers.tsx", `import type { ReactNode } from "react";

type ProvidersProps = {
  children: ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  return children;
}
`);

write("src/domains/tasks/list/page.tsx", `export function TaskListPage() {
  return null;
}
`);

write("src/domains/tasks/list/types.ts", `export type TaskListItem = {
  id: string;
  title: string;
  completed: boolean;
};
`);

write("src/domains/tasks/list/schema.ts", `export type TaskListQuery = {
  completed?: boolean;
};
`);

write("src/domains/tasks/list/api.ts", `import type { TaskListItem } from "./types";

export async function getTaskList(): Promise<TaskListItem[]> {
  return [];
}
`);

write("src/domains/tasks/list/state.ts", `export type TaskListState = {
  selectedTaskId?: string;
};
`);

write("src/domains/tasks/list/test.tsx", `import { describe, expect, it } from "vitest";

describe("task list", () => {
  it("has a scaffolded test", () => {
    expect(true).toBe(true);
  });
});
`);

write("src/domains/tasks/detail/page.tsx", `export function TaskDetailPage() {
  return null;
}
`);

write("src/shared/ui/Button.tsx", `import type { ButtonHTMLAttributes } from "react";

export function Button(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button {...props} />;
}
`);

write("src/shared/http/httpClient.ts", `export async function request<T>(input: RequestInfo, init?: RequestInit): Promise<T> {
  const response = await fetch(input, init);

  if (!response.ok) {
    throw new Error("Request failed");
  }

  return response.json() as Promise<T>;
}
`);

write("src/shared/config/appConfig.ts", `export const env = {
  mode: import.meta.env.MODE
};
`);

console.log(`Created ${name}`);
console.log("");
console.log("Next steps:");
console.log(`  cd ${name}`);
console.log("  Start building in src/domains");

function write(filePath, contents) {
  fs.writeFileSync(path.join(root, filePath), contents);
}

function toPackageName(value) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-_]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}
