# Portfolio Dashboard

This is a **Github Pages–friendly dashboard** for showcasing what I’m actively working on (projects, Asana activity, metrics). It is designed to be hosted at:

https://JesseFuentes1985.github.io/-Portfolio-Dashboard-

## Goals

- **Showcase work**: Projects, weekly momentum, and work in Asana
- **Thin client**: All UI is static and can run on GitHub Pages
- **Asana-friendly**: Provides a pattern to keep personal API tokens out of the public repo

## Getting started

1. **Open the repo in VS Code** (you already have it open).
2. Preview locally with a simple HTTP server:

   ```bash
   python -m http.server 8000
   ```

   Then open http://localhost:8000 in your browser.

## Hosting on GitHub Pages

1. Push this repo to GitHub.
2. In the repo settings, enable GitHub Pages using the `main` branch (or `gh-pages` if you prefer).
3. The site will appear at `https://<your-username>.github.io/<repo-name>/`.

## Asana integration (next step)

This project is built for GitHub Pages, which means the UI is purely static. That makes it important to avoid exposing an Asana API token in client-side code.

### What this repo includes

- `data/asana.example.json`: a sample snapshot you can use as a starting point.
- `scripts/fetch-asana.js`: a small Node script that fetches Asana data using an API token and writes `data/asana.json`.
- `.github/workflows/asana-sync.yml`: a GitHub Actions workflow that runs on a schedule (and can be triggered manually) to refresh `data/asana.json`.

### How to enable real Asana data

1. Create a GitHub repo secret named `ASANA_TOKEN` with your personal Asana API token.
2. (Optional) Preview locally by running:

   ```bash
   npm install
   ASANA_TOKEN=your_token npm run fetch-asana
   python -m http.server 8000
   ```

   This will write `data/asana.json` and start a local web server.

3. Push your code to GitHub and enable Pages in the repo settings. The workflow will update `data/asana.json` automatically on schedule (and when you run it manually).

### How the page uses the data

The frontend checks for `data/asana.json` and falls back to built-in mock data when the file is missing. This makes it safe to keep iterating on the UI while you hook up real Asana results.

---

### Next steps

1. Decide which Asana fields you want to show (tasks, completed counts, project status, etc.).
2. Update `scripts/fetch-asana.js` to fetch those fields and shape the output.
3. Update `app.js` if you want additional charts or tables based on the Asana snapshot.

If you'd like, I can help you customize the Asana query and polish the dashboard visuals further.