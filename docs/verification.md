# Redesign verification · 20 October 2026

- `npm run check`: no errors, warnings, or hints.
- Production build: 11 published HTML routes; existing article URLs retained. All project details remain unpublished by user choice.
- `npm run test:links`: local links, anchors, unique IDs, base paths, and reference ZIP exclusion pass for both root and `/Portfolio-Website/` builds.
- `npm run test:templates`: full case-study and concise-note formats render in isolated builds; the Expense Logger simulation is present only when enabled.
- `npm run test:browser`: 10 tests pass, covering all 11 routes at 360, 768, and 1440 pixels in light/dark themes. No horizontal overflow or axe WCAG A/AA violations in those checks. Interaction checks cover theme persistence, menu focus/scroll restoration, URL filters/history/reset, clipboard, simulations, and no-JavaScript navigation.
- 30 full-page production screenshots captured locally in `reports/visual/`. Reviewed desktop Home and About, tablet Work, and mobile Home and Amagi compositions; diagrams and portrait inspected separately.
- Lighthouse mobile: Home and Work each score **97 performance / 100 accessibility / 100 best practices / 100 SEO**. Raw JSON is retained locally under `reports/lighthouse/`; scores are measurements on this workstation, not ongoing guarantees.
- Repository-base browser smoke check: Home, Work, article, and unknown nested path; nested 404 navigation and assets work. Base-aware canonical, sitemap, and RSS paths inspected.
- Existing resume is preserved and its local download destination resolves. Public GitHub project destinations were verified against the account's repository API and core project READMEs inspected. Existing LinkedIn identity is retained from the resume. Certificate URLs were unavailable and no placeholder certificate actions are shown. Elite/Top 1% recognition is not assigned to a particular course without evidence.

## Remaining release work

GitHub Pages is configured to use GitHub Actions, with no custom domain set. The workflow deploys from `main`. Deployment and live-domain checks remain pending branch review/merge. DNS, HTTPS cutover, and EC2 retirement have not been performed.

The dependency audit reports 21 advisories (2 low, 2 moderate, 16 high, 1 critical), the same severity counts observed immediately after installing the original lockfile. Direct affected dependencies include Astro, MDX, RSS, and Sharp. A broad framework upgrade is outside this redesign; do not treat this as a clean dependency audit.
