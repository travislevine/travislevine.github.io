# Portfolio

Personal portfolio for Travis Levine — AI Automation & Software Engineer.

Built with Next.js (App Router, static export), Tailwind CSS v4, Framer Motion and Lucide icons.

## Running locally

Requires Node 20+.

```bash
npm install
npm run dev        # http://localhost:3000
```

Production build (static files go to `out/`):

```bash
npm run build
npm start          # serves out/ on http://localhost:3000
```

## Editing content

Everything (bio, projects, experience, skills, units) lives in `src/data/profile.ts`.

- Units are always shown highest mark first, and only HD / D / CR grades are rendered.
- Featured projects link to a GitHub repo automatically if a public repo matches one of `repoMatchers`.

## GitHub repos section

Public repos are fetched in the browser from `api.github.com/users/travislevine/repos`, so making a repo private
removes it from the site on the next visit — no rebuild needed (there's a 5 minute per-tab cache to stay under
GitHub's 60 req/hour anonymous limit).

Repos are ranked by `scoreRepo()` in `src/lib/github.ts`:

| Signal | Points |
| --- | --- |
| Description (25+ chars) | +30 |
| Has topics | +20 |
| Matches a keyword (ai, nextjs, supabase, automation, machine-learning, security, iot, embedded, docker, typescript, python, bikepark) | +25 |
| Stars | ×15 each |
| Forks | ×10 each |
| Size > 50 KB | +10 |
| Pushed/updated in the last 6 months | +15 |

Forks, archived repos, empty repos and the profile README repo are hidden by default (there's a toggle on `/projects`).

Tip: adding a description, topics and a homepage URL to a repo on GitHub bumps it up the list and adds a "Live" link.

## Deploying

The site is a static export, so any static host works.

- **Vercel**: import the repo, no settings needed.
- **Netlify**: import the repo; `netlify.toml` already sets the build command and `out` directory.
- **GitHub Pages**: Settings → Pages → Source: *GitHub Actions*, then run the *Deploy to GitHub Pages* workflow.
  The workflow sets the base path automatically (e.g. `/website`).
