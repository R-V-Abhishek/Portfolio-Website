import fs from "node:fs";
import path from "node:path";
const root = path.resolve(process.env.BUILD_DIR || "dist");
const base = (process.env.BASE_PATH || "/").replace(/\/$/, "");
const files = [];
function collect(dir) {
  for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
    const file = path.join(dir, item.name);
    if (item.isDirectory()) collect(file);
    else if (file.endsWith(".html")) files.push(file);
  }
}
collect(root);
const errors = [];
for (const file of files) {
  const html = fs.readFileSync(file, "utf8");
  const route = "/" + path.relative(root, file).replace(/index\.html$/, "");
  const canonical = new URL(base + route, "https://example.test");
  for (const match of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
    const raw = match[1].replaceAll("&amp;", "&");
    if (/^(https?:|mailto:|tel:|data:)/.test(raw)) continue;
    const link = new URL(raw, canonical);
    if (base && !link.pathname.startsWith(base + "/")) {
      errors.push(`${route}: link escapes deployment base: ${raw}`);
      continue;
    }
    const relative = decodeURIComponent(link.pathname.slice(base.length));
    let target = path.join(root, relative);
    if (fs.existsSync(target) && fs.statSync(target).isDirectory())
      target = path.join(target, "index.html");
    if (!fs.existsSync(target)) {
      errors.push(`${route}: missing ${raw}`);
      continue;
    }
    if (link.hash && target.endsWith(".html")) {
      const id = decodeURIComponent(link.hash.slice(1));
      const content = fs.readFileSync(target, "utf8");
      if (!content.includes(`id="${id}"`))
        errors.push(`${route}: missing anchor ${raw}`);
    }
  }
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]);
  if (new Set(ids).size !== ids.length) errors.push(`${route}: duplicate IDs`);
  if (!html.includes("<h1")) errors.push(`${route}: missing h1`);
}
if (
  fs.existsSync(path.join(root, "stitch_r_v_abhishek_portfolio_homepage.zip"))
)
  errors.push("Reference ZIP included in deployment");
if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log(
  `Verified ${files.length} routes: local links, anchors, unique IDs, deployment base, and reference exclusion.`,
);
