# My Portfolio

This repository contains the source code for my personal portfolio website showcasing my skills, projects, and professional experience.

📋 Overview
A single page, set like the first page of a LaTeX paper: a title block, a one-line abstract with a footnote, and a timeline of everything I've made, by year and month. Clicking a project opens an index card with the details and links.

## Visit My Portfolio
You can view my live portfolio at: https://sohan-bhat.github.io

## Running locally

```bash
npm install
npm start          # dev server on http://localhost:3000
npm run build      # production build in build/
```

Pushing to `main` deploys to GitHub Pages through `.github/workflows/deploy.yml`.

After `react-scripts build`, `scripts/prerender.js` renders the page to static HTML so it shows up before the JavaScript loads; React then takes over for the cards.

## Editing

- Everything on the page lives in `src/content.js`: the abstract line and its footnote, the letterhead links, and the `WORK_LIST` of projects.
- Each project has a `title`, `type`, a `date` (`'YYYY-MM'`, the month it was made; the timeline is sorted by it), a one-sentence `line`, a few `facts`, its `links`, and `media` for the card. An optional `span` replaces the month in the card for longer projects.
- Card images go in `public/imgs/` as `card-<name>-560.webp` and `card-<name>-1120.webp`, cropped to 16:10.
- The abstract line also appears in the link-preview text in `public/index.html` (`og:description`) and in `public/og.png`; update those if it changes.

## Credits

Set in New Computer Modern, by Antonis Tsolomitis after Donald Knuth's Computer Modern, under the GUST Font License (see `public/fonts/`).

🔄 Updates
This portfolio is regularly updated with new projects and improvements. Star ⭐ this repo to stay informed!
