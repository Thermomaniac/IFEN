@AGENTS.md

# IFEN project rules

- All new IFEN pages and sections must inherit the established visual language and Framer Motion interaction language of the existing website unless the user explicitly requests a different animation behavior for a specific section.

## Design System as the Default Source

The coded design system is the source of truth for anything without a Paper design. Screens that already have Paper frames (course payment and bank-transfer modals, Training & Other Offers filters, therapist directory, expanded map) are implemented to match Paper exactly, built with the coded system. Figma is not a visual reference.

Source order when deciding how something should look or behave:

0. Paper frames, for screens explicitly designed there.
1. Coded design system: `src/styles/tokens.css` and the components in `src/components/`.
2. Existing pages (home, BCIA Mentoring, Module 1, Webinar, QEEG, the course listing).
3. Figma, only to clarify content or intent, never as the visual reference.
4. Mobbin, for patterns the system does not cover yet. Cite the screens used.
5. Generic assumptions, last.

## Direct Design + Implementation Rule

Design new pages directly in code. Build from existing components and tokens first; extend a component with an optional prop or variant before creating a new one. A new component is allowed only when no existing one fits, and it must use the same tokens, card treatment, band order, type scale and Reveal motion. No generic SaaS layouts, random card grids, arbitrary gradients, glassmorphism, oversized type or decorative animation. Do not reinvent IFEN. Extend IFEN.

Keep content data-driven (`src/data/`), i18n-safe (EN/DE/ES/EL, long German compounds must wrap) and responsive. Do not trim source content.

## Consistency Rule

Every page uses the same band sequence (ink hero, then mist, cream and white bands), section header (label, heading, intro), card style (4px radius, white, 1px border shadow), CtaButton, form input style and breakpoints (64rem, 48rem, 34rem, 30rem). The same thing must look and behave the same everywhere. If a change to a shared component is needed, check every page that uses it.

## Remaining pages programme

Five-phase redesign of the remaining IFEN pages, one phase per session. At session start, read in this order:

1. `PROGRESS.md`: active phase, what is done, open issues.
2. `ROADMAP.md`: phase scope, source URLs, nav plan, per-phase conventions.
3. `DESIGN-SYSTEM.md`: exact type, color, spacing, radius, breakpoint, component and motion values.

Execute only the active phase. After phase 5 a correction programme (phases A to H, listed in `ROADMAP.md`) runs in one session, each phase pushed to staging before the next starts. Before handoff run `npx eslint .`, `npx tsc --noEmit`, `npm run build`, render at 1440 / 390 / 320, then update `PROGRESS.md`. Work stays on `phase-2`; merge to `main` only when the user explicitly asks for a production release.

## Staging deploy after every phase

Hosting is Vercel: project `web` in team scope `shahariarritul120-2552s-projects`, connected through Git integration to `Thermomaniac/IFEN` on GitHub. Production branch is `main`. There is no local `.vercel/` link (it is gitignored, as is `.env.local`), and the Vercel CLI is not installed globally: use `npx vercel@latest ... --scope shahariarritul120-2552s-projects` when a CLI call is needed.

Deploys are triggered by `git push`. Every push to `phase-2` builds a preview automatically, so no `vercel deploy` is needed. When a phase is finished and its checks pass, commit the phase's files to `phase-2` and push `phase-2` to `origin`. This is standing approval from the user; no need to ask each time. Commit only the phase's own files and leave unrelated untracked work (e.g. `Research Document/`) out. Never run `vercel deploy --prod` and never push to `main` for a phase: a push to `main` is a production deploy.

After pushing, confirm the build with `npx vercel@latest list web --scope shahariarritul120-2552s-projects` (newest Preview row, state Ready). Staging URLs:

- Per deployment: the `web-<hash>-shahariarritul120-2552s-projects.vercel.app` URL from that list.
- Branch alias, always the latest `phase-2` build: `https://web-git-phase-2-shahariarritul120-2552s-projects.vercel.app`.

Previews are behind Vercel Deployment Protection. For automated checks, send the `x-vercel-protection-bypass` header, read from the project's `protectionBypass` (automation-bypass scope) via `npx vercel@latest api` straight into an env variable. Never print the secret or the project JSON, and only attach the header to requests for the preview origin. A successful build does not complete validation: check the affected routes and interactions on the preview.

## Production release

Only when the user explicitly asks: fast-forward `main` to `phase-2` (`git merge --ff-only`, no force) and push `main`. The push itself triggers the production deploy through Git integration; do not also run `vercel deploy --prod`. Confirm the newest Production row is Ready with `npx vercel@latest list web --scope shahariarritul120-2552s-projects`, then give the user the production URL. Training demo chips (`training.demoStates` in `src/data/site.ts`) must be `null` in production. Never change production environment variables or data.
