import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
// Exercise both formats in an isolated build; no fixture enters the real dist.
const source = process.cwd();
const fixture = fs.mkdtempSync(path.join(os.tmpdir(), "portfolio-detail-"));
for (const file of [
  "src",
  "public",
  "astro.config.mjs",
  "package.json",
  "tsconfig.json",
]) {
  fs.cpSync(path.join(source, file), path.join(fixture, file), {
    recursive: true,
  });
}
fs.symlinkSync(
  path.join(source, "node_modules"),
  path.join(fixture, "node_modules"),
  "dir",
);
const dataPath = path.join(fixture, "src/data/projects.ts");
fs.appendFileSync(dataPath, '\nprojects[0].detail = "template";\n');
const entryPath = path.join(fixture, "src/content/projects/template.mdx");
const original = fs.readFileSync(entryPath, "utf8");
function build(content) {
  fs.writeFileSync(entryPath, content);
  execFileSync(
    process.execPath,
    [path.join(source, "node_modules/astro/astro.js"), "build"],
    {
      cwd: fixture,
      env: { ...process.env, ASTRO_TELEMETRY_DISABLED: "1", BASE_PATH: "/" },
      stdio: "pipe",
    },
  );
  return fs.readFileSync(
    path.join(fixture, "dist/projects/template/index.html"),
    "utf8",
  );
}
const full = build(original.replace("published: false", "published: true"));
for (const marker of [
  "Case study",
  "chapter-nav",
  'data-simulation="expense"',
  "My contribution",
  "Status & limitations",
]) {
  if (!full.includes(marker))
    throw new Error(`Case-study fixture missing ${marker}`);
}
const note = build(
  original
    .replace("published: false", "published: true")
    .replace("format: case-study", "format: note")
    .replace("walkthrough: true", "walkthrough: false")
    .split("## Problem & motivation")[0] +
    "\nA concise, isolated note fixture.\n",
);
if (
  !note.includes("Project note") ||
  note.includes('chapter-nav" aria-label') ||
  note.includes('data-simulation="expense"') ||
  note.includes("Problem & motivation")
)
  throw new Error("Concise note rendered full-case-study elements");
console.log(
  "Verified case-study and concise-note templates in isolated builds. Real project details remain unpublished.",
);
