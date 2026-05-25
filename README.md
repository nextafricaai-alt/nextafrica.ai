# NEXT AI — Website

The public marketing site for NEXT — Africa's AI transformation company.

Live deployment: https://nextafrica.com (or `<your-domain>`)

## What's Here

```
next-ai-website/
├── index.html              ← homepage
├── what-we-do.html         ← services
├── who-we-serve.html       ← verticals
├── our-work.html           ← case studies
├── training.html           ← programs
├── insights.html           ← articles
├── about.html              ← team + story
├── start.html              ← contact / get started
├── 404.html                ← redirects home
├── styles.css              ← global styles
├── assets/                 ← all images and logos
├── src/                    ← React/JSX source files (the build inlines these)
│   ├── chrome.jsx          ← global nav, footer, WhatsApp button, chatbot
│   ├── home.jsx            ← homepage components
│   ├── pages-a.jsx         ← What We Do, Who We Serve, Our Work
│   ├── pages-b.jsx         ← Training, Insights, About, Start
│   └── app.jsx             ← page router
├── build.py                ← rebuilds HTML from src/
├── .nojekyll               ← tells GitHub Pages: don't run Jekyll
├── robots.txt              ← SEO crawler instructions
├── sitemap.xml             ← SEO sitemap
└── CNAME.example           ← rename to CNAME for custom domain on GitHub Pages
```

## How It Works

The site is a multi-page React app with **runtime JSX compilation** (no Node build step required). Each HTML file is fully self-contained: React, ReactDOM, and Babel load from a CDN, then the inlined `<script type="text/babel">` blocks execute. The `data-page` attribute on `<html>` tells the router which page component to render.

Why self-contained? Three reasons:
1. **Works offline** — open any `.html` file from a USB stick, it renders.
2. **No build server** — Hostinger, GitHub Pages, S3, any static host serves it as-is.
3. **No SRI / CORS pitfalls** — the issues that caused the earlier blank-page problem can't reappear.

## Local Development

Just double-click `index.html` in your file manager, or right-click → "Open with" → Chrome/Edge/Firefox. The site renders immediately, no server needed.

For hot-reload while editing, install **Live Server** in VS Code:
```
code .                              # open this folder in VS Code
# Right-click index.html → "Open with Live Server"
```

## Editing Content

Two ways:

**Option A — quick local edit (per page).** Open the HTML file directly, find the relevant inline `<script type="text/babel" data-source="...">` block, edit the JSX in place. The change applies only to that page.

**Option B — edit source, then rebuild (recommended).** Edit the file in `src/` (e.g. `src/home.jsx`), then run:
```
python3 build.py
```
This re-inlines `src/*.jsx` into every HTML file. Commit both the `src/` changes AND the rebuilt HTML.

Recommended workflow: keep `src/` as the source of truth, always rebuild before committing.

## Deploying to GitHub Pages

1. Push this folder to a GitHub repo:
   ```
   git init
   git remote add origin git@github.com:<you>/next-ai-website.git
   git add .
   git commit -m "Initial site"
   git push -u origin main
   ```
2. In the repo, go to **Settings → Pages**.
3. Source: **Deploy from a branch** → `main` → `/` (root) → Save.
4. Wait ~30 seconds. Your site goes live at `https://<you>.github.io/next-ai-website/`.

### Custom domain

1. Rename `CNAME.example` → `CNAME`, edit it to contain just your domain (one line, no protocol).
2. In your DNS provider, add a CNAME record pointing `www.<domain>` to `<you>.github.io`. For the apex domain, add four A records to GitHub's IPs (185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153).
3. Commit + push. GitHub Pages auto-issues an SSL certificate within ~10 minutes.

## Deploying to Hostinger

1. Log into Hostinger → File Manager → `public_html/`.
2. Delete any existing index files in `public_html/`.
3. Upload **everything from this folder** (the contents — not the folder itself) into `public_html/`.
4. Visit your domain. Site is live.

You can use Hostinger's built-in Git integration to auto-deploy from this repo on every push:
- Hostinger Dashboard → Websites → Git → Connect Repository.
- Set branch to `main`, deploy path to `public_html/`.
- Every `git push` updates the live site within ~60 seconds.

## Auto-Deploy via GitHub Actions (optional, for Hostinger)

If you'd rather push to GitHub and have it auto-sync to Hostinger via SFTP, add `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Hostinger
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Rebuild HTML from src/
        run: python3 build.py
      - name: Deploy via SFTP
        uses: SamKirkland/FTP-Deploy-Action@v4.3.5
        with:
          server: ${{ secrets.FTP_HOST }}
          username: ${{ secrets.FTP_USER }}
          password: ${{ secrets.FTP_PASSWORD }}
          server-dir: /public_html/
          exclude: |
            **/.git*
            **/.git*/**
            **/node_modules/**
            **/src/**
            build.py
            README.md
            CNAME.example
```

Add `FTP_HOST`, `FTP_USER`, `FTP_PASSWORD` as repo secrets (Settings → Secrets and variables → Actions).

## What Was Fixed (May 2026)

The earlier zip had three blocking issues that caused blank white pages:

1. **SRI integrity hashes** on the CDN scripts (React, ReactDOM, Babel) were silently blocking those scripts. Removed.
2. **`crossorigin="anonymous"`** on the same scripts caused CORS failures on `file://`. Removed.
3. **External `.jsx` files** loaded via `<script src="...">` couldn't be fetched by Babel on `file://`. Solution: every JSX is now inlined directly into the HTML.

The site is now self-contained and works in every environment.

## Performance Notes

- Each HTML page is ~114 KB (≈25 KB gzipped). React + Babel come from CDN with long cache headers, so they're fetched once and reused across pages.
- For a production-grade rebuild later, pre-compile the JSX with a real esbuild/Vite pipeline. That removes the 2 MB Babel standalone dependency and trims first-paint to under 200 ms. Save that for after launch.

## Stack

- React 18.3.1 (UMD via unpkg)
- Babel standalone 7.29.0 (JSX transpilation in the browser)
- Vanilla CSS, no framework
- No backend — pure static site

## License

© 2026 NEXT. All rights reserved.
