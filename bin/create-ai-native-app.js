#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const args = process.argv.slice(2);
const name = args.find((arg) => !arg.startsWith("-"));

if (args.includes("--help") || args.includes("-h")) {
  console.log(`
create-ai-native-app

Usage:
  npx create-ai-native-app my-app

Creates a minimal AI Native Architecture project structure.
`);
  process.exit(0);
}

if (!name) {
  console.error("Please provide an app name.");
  console.error("Example: npx create-ai-native-app my-app");
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

write("index.html", `<div id="root"></div>
<script type="module" src="/src/main.tsx"></script>
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

write("src/app/router.tsx", `export function Router() {
  return <div>AI Native Architecture starter</div>;
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

createRoot(document.getElementById("root")!).render(<App />);
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

write("src/shared/http/client.ts", `export async function request<T>(input: RequestInfo, init?: RequestInit): Promise<T> {
  const response = await fetch(input, init);

  if (!response.ok) {
    throw new Error("Request failed");
  }

  return response.json() as Promise<T>;
}
`);

write("src/shared/config/env.ts", `export const env = {
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
