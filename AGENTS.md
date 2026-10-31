# Agent instructions

Read this file before editing. It applies to the entire repository. Keep shared guidance here; `CLAUDE.md` imports this file.

## Start here

- This is R V Abhishek’s public portfolio: **Patterns, signals, and systems.** It covers ML, computer vision, NLP, agentic AI, useful software, and Carnatic music.
- Read `README.md`, inspect the relevant implementation and `package.json`, and run `git status --short --branch` before changing files. Preserve unrelated work.
- Work inside this repository. The surrounding Resume workspace may contain other Git repositories and unrelated resumes; do not stage or push the parent directory.
- Inspect actual data, source, and outputs before deciding. Search narrowly with `rg`. Make the smallest coherent change using existing patterns.
- Do accessible read/write/test work yourself. Ask only for information or authorization that cannot be established from available sources.
- User shorthand: `ga` = execute; `pbp` = read-only discovery, concrete plan, then wait for approval before implementation; `bb` = be brief; `mon` = check a running process periodically until it finishes. Number questions `q1`, `q2`, etc. and proposed follow-ups `f1`, `f2`, etc., continuing the session’s numbering.

## Architecture and sources of truth

Preserve Astro static generation, TypeScript, MDX, npm with `package-lock.json`, RSS, and sitemap. No backend or framework migration unless the task requires it.

| Location                                            | Responsibility                                                                             |
| --------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| `src/data/config.ts`                                | Identity, contact, education, and the base-aware `url()` helper                            |
| `src/data/projects.ts`                              | Shared project names, descriptions, topics, ordering, homepage placement, and destinations |
| `src/data/experience.ts`                            | Industry pillars, community roles, credentials, and recognition                            |
| `src/data/skills.ts`                                | Capabilities, tools, and supporting-work links                                             |
| `src/content/config.ts`                             | Validated blog and project-entry contracts                                                 |
| `src/content/blog/`                                 | Published writing, drafts, metadata, and stable article URLs                               |
| `src/content/projects/`                             | Explicitly assigned case studies or concise notes                                          |
| `src/layouts/`, `src/components/design/`            | Shared page shell and reusable design components                                           |
| `src/styles/global.css`                             | Semantic themes, typography, layout, and responsive rules                                  |
| `scripts/`, `tests/`, `.github/workflows/pages.yml` | Asset generation, verification, browser tests, and deployment                              |

Use these sources instead of duplicating content arrays in pages. Inspect producers, schemas, and consumers before changing their contracts.

## Content and design constraints

- Ground personal facts, project technologies, external links, dates, credentials, and metrics in user-confirmed or inspected sources. Do not invent demos, profile accounts, certificate URLs, project claims, availability, or response-time promises.
- Keep Amagi descriptions general and public-safe. Do not publish proprietary assets, internal identifiers, or unsupported operational/performance claims. Label conceptual diagrams and simulations as illustrative.
- **Project details remain unpublished by explicit user choice.** Do not infer a case-study lineup. Publishing requires an explicit project-by-project assignment, completed source-backed narrative, `published: true`, and a matching project `detail` reference. Preserve draft exclusion from routes, indexes, RSS, and sitemap.
- SwaraSync has no verified public repository in the existing content; do not guess a URL. Missing certificate URLs should produce no placeholder action. Do not assign NPTEL Elite/Top 1% recognition to a specific course without evidence.
- Preserve editorial serif headings, cool light surfaces, charcoal dark surfaces, cobalt accents, and restrained coral illustrations. Both themes must cover navigation, footer, panels, code, overlays, and figures.
- Fonts and illustrations stay local. Keep Newsreader, Plus Jakarta Sans, JetBrains Mono, and theme-aware SVGs. Do not restore Matrix rain, custom cursors, 3D card effects, browser Tailwind CDN, fake telemetry, or a job-seeking banner.
- Preserve keyboard access, visible focus, menu focus/scroll restoration, persistent theme choice, accessible filter feedback, URL/history state, reduced-motion support, and useful no-JavaScript fallbacks.
- Keep mobile layouts readable with no page-level horizontal overflow. Bound code/table scrolling to their containers. Keep simulations deterministic, resettable, and free of live model calls.
- Change generated portrait assets through `scripts/generate-portrait.mjs` and `npm run portrait`; preserve fixed options and attribution. Keep the original Stitch ZIP local and excluded from deployment.

## Verification

Use existing npm scripts. Install with `npm ci` when needed; do not change package managers or upgrade unrelated dependencies. Inspect and fix failures, then rerun the affected check.

- Documentation-only edits: check referenced paths/commands, inspect the diff, and run `git diff --check`; no full browser suite is needed.
- Code or content edits: run `npm run check`, `npm run build`, and `npm run test:links`.
- Project-template changes: also run `npm run test:templates`; it uses isolated builds and must not publish fixture details into the real site.
- Layout, theme, navigation, or interaction changes: run `npm run test:browser`, then inspect affected production layouts at 360, 768, and 1440 pixels in light/dark mode. Use `npm run test:visual` with a running production preview when screenshots help.
- Preview commands: `npm run dev -- --host 0.0.0.0` or, after building, `npm run preview -- --host 0.0.0.0 --port 4321`. Install the matching browser with `npx playwright install chromium` only if needed. Stop servers you started when finished.
- Base-path/deployment changes: build with `SITE_URL=https://r-v-abhishek.github.io BASE_PATH=/Portfolio-Website/ npm run build`, then run `BASE_PATH=/Portfolio-Website/ npm run test:links`. Verify nested routes, 404 navigation/assets, canonical URLs, RSS, and sitemap.
- `docs/verification.md` records a historical baseline, not proof that the current checkout passes. Remeasure performance and recheck dependency advisories before making current claims. Do not silently apply a broad dependency upgrade.

## Git and release boundaries

- Prefer a `codex/` feature branch, focused Conventional Commits, and PRs. Inspect branch/PR state before creating duplicates. Stage only task changes; review the diff before committing. Push, merge, and publish according to the current task’s authorization.
- The live site uses `https://r-v-abhishek.github.io/Portfolio-Website/`. The workflow verifies PRs and deploys pushes to `main`; merging can publish changes.
- Default configuration uses the intended `rvabhishek.dev` domain, but the deployment workflow supplies the repository URL and base. Use `url()` for internal navigation and assets; do not replace it with root-relative links that break GitHub Pages or nested 404s.
- DNS/custom-domain cutover and EC2 retirement are separate work. Do not infer authorization for them from an ordinary content or UI task.
- The GitHub profile README is a separate repository (`R-V-Abhishek/R-V-Abhishek`), not this website. Coordinate shared facts and links when requested without assuming a sibling checkout exists.
- If multiple GitHub identities are configured, verify the account. Use an existing personal SSH profile or a command-scoped authenticated transport when necessary; do not rewrite global SSH/credential configuration or expose tokens.
- Report what changed, what was verified, and any remaining issues. Keep this guide aligned with actual implementation and user decisions.
