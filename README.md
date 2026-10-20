# R V Abhishek · Portfolio

An editorial portfolio built with Astro, TypeScript, MDX, and local SVG illustrations. Light and dark themes share the same content. The Stitch ZIP is a local design reference and is excluded from deployment.

## Development

```sh
npm ci
npm run dev -- --host 0.0.0.0
npm run check
npm run build
npm run test:links
npx playwright install chromium
npm run test:browser
```

The browser suite covers every published page at 360, 768, and 1440 pixels in both themes, checks WCAG A/AA with axe, and exercises filters, browser history, keyboard navigation, theme persistence, copying, the media simulation, and no-JavaScript navigation.

## Content

- `src/data/config.ts`: identity, contact, education, and base-aware URL helper.
- `src/data/projects.ts`: one ordered project source for Home, Work, and detail pages. All listed entries are published library items.
- `src/data/experience.ts`: experience, recognition, and credentials. Certificate actions only appear when an actual certificate URL is supplied.
- `src/data/skills.ts`: capabilities and supporting work.
- `src/content/blog/`: existing MDX writing and stable URLs. Drafts are excluded from indexes, RSS, and generated routes.
- `src/content/projects/`: validated case studies or concise notes. Project depth is deliberately unassigned.

### Publishing a project detail

After an explicit project-by-project choice, replace the unpublished `template.mdx` example or create a separate MDX entry. Set `projectSlug` to an existing project, choose `case-study` or `note`, fill in source-backed content, and set `published: true`. Set that project's `detail` to the MDX entry slug in `src/data/projects.ts`. The build rejects published entries without an explicit matching assignment. Run the link checker to verify the reverse reference. Notes render only the sections they contain. The optional Expense Logger walkthrough is deterministic and makes no API calls.

## Design and assets

Tokens and responsive styles are in `src/styles/global.css`; shared components are in `src/components/design/`. Fonts are self-hosted through Fontsource: Newsreader, Plus Jakarta Sans, and JetBrains Mono. No browser Tailwind CDN, avatar service, or runtime AI calls are used.

Regenerate the fixed portrait with `npm run portrait`. The selected options live in `scripts/generate-portrait.mjs`; the SVG is checked in. Notionists artwork is by Zoish under CC0; DiceBear generation code is MIT. The likeness was compared to the public GitHub profile photo. Portrait framing is theme-aware while the monochrome illustration retains a pale paper background.

Content comes from the supplied specification, existing resume, and public repository READMEs. Public Amagi text is generalized, with illustrative diagrams and no proprietary assets or unsupported performance measurements. SwaraSync has no verified public repository, so its library action points to its music narrative rather than a guessed URL. Certificate URLs were absent from the source and are omitted.

## Deployment

`.github/workflows/pages.yml` checks pull requests and deploys `main` to GitHub Pages using the repository base `/Portfolio-Website/`. The verification job builds both domain-root and repository-base variants. The workflow uploads only `dist/`.

```sh
SITE_URL=https://r-v-abhishek.github.io BASE_PATH=/Portfolio-Website/ npm run build
BASE_PATH=/Portfolio-Website/ npm run test:links
```

GitHub Pages is configured to use GitHub Actions as its source. The first deployment will run when the branch is merged. `rvabhishek.dev` remains the intended eventual address; the repository-base deployment must be verified before a separately reviewed domain cutover. At cutover, switch the deployment build to the verified domain and `/` base, then verify canonical URLs, sitemap, RSS, nested routes, DNS, and HTTPS. No CNAME or DNS change is included, and EC2 is untouched.

For domain-root builds, configuration defaults to `https://rvabhishek.dev` and `/`. Every internal navigation and asset path uses the configured base, including the static 404 page at unknown nested URLs.
