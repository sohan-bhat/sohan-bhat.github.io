// Builds the write-ups from the Markdown posts in write-ups/. For each post
// it writes a page to public/write-ups/<name>/ and copies the pictures it
// uses, and it writes the list the home page and the Write-ups page read,
// src/data/write-ups.json. All of that is generated and gitignored, so this
// runs before every build and every start.
//
// A post is written the way blog/lhd.md is in sohan-bhat/lhd, which
// write-ups/lhd.md here began as a copy of and has since been reworded: a
// `# Title`, then `### Author` and `### Published`, each followed by a line
// with its value, then the post itself. Pictures sit in write-ups/img and are
// linked as img/<file>. A PNG is taken to be a chart on a white page, and its
// white is let through to the site's paper; a JPG or WebP is shown as it is.
//
// The opening paragraph, which starts with TL;DR, is set in a card. A figure
// between `<!-- figure -->` and `<!-- /figure -->` is a still picture and its
// caption, which is what GitHub shows. When write-ups/data/<name>.json
// exists, the page shows the runs in that file in its place, one per tab,
// drawn by scripts/write-up-figure.js. Nothing in a post is bold.

const fs = require('fs');
const path = require('path');
const { marked } = require('marked');
const { figure, script } = require('./write-up-figure');

const ROOT = path.resolve(__dirname, '..');
const POSTS = path.join(ROOT, 'write-ups');
const OUT = path.join(ROOT, 'public', 'write-ups');
const LIST = path.join(ROOT, 'src', 'data', 'write-ups.json');
const SITE = 'https://sohanbhat.me';

const escape = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const plain = (s) => s.replace(/\*\*|__|`/g, '').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');

// The value on the line after a `### Label` heading, and the post without
// that heading and line.
const take = (text, label) => {
    const found = text.match(new RegExp(`^### ${label}[ \\t]*\\n+(.+)\\n`, 'm'));
    if (!found) throw new Error(`No "### ${label}" in the post`);
    return [found[1].trim(), text.replace(found[0], '')];
};

// A PNG's width and height, read from its header.
const pngSize = (file) => {
    const head = fs.readFileSync(file).subarray(16, 24);
    return [head.readUInt32BE(0), head.readUInt32BE(4)];
};

const page = ({ name, title, author, published, summary, html, tabs }) => `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <!-- Built by scripts/build-write-ups.js from write-ups/${name}.md. Edit that file, not this one. -->
    <link rel="icon" href="/favicon.ico" sizes="16x16 32x32 48x48" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg?v=2" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
    <link rel="manifest" href="/site.webmanifest" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#e9e3d6" />
    <meta name="color-scheme" content="light" />
    <title>${escape(title)}</title>
    <meta name="description" content="${escape(summary)}" />
    <link rel="canonical" href="${SITE}/write-ups/${name}/" />
    <meta name="author" content="${escape(author)}" />
    <meta name="robots" content="max-image-preview:large" />
    <script type="application/ld+json">
      ${JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: title,
          url: `${SITE}/write-ups/${name}/`,
          datePublished: new Date(`1 ${published} UTC`).toISOString().slice(0, 7),
          inLanguage: 'en',
          author: { '@type': 'Person', '@id': `${SITE}/#person`, name: author, url: `${SITE}/` },
          isPartOf: { '@id': `${SITE}/#website` },
      })}
    </script>
    <meta property="og:type" content="article" />
    <meta property="og:url" content="${SITE}/write-ups/${name}/" />
    <meta property="og:title" content="${escape(title)}" />
    <meta property="og:description" content="${escape(summary)}" />
    <meta property="og:image" content="${SITE}/og-image.jpg" />
    <meta property="og:site_name" content="Sohan Bhat" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:creator" content="@The_Sohan_Bhat" />
    <link rel="preload" href="/fonts/source-sans-3-variable.woff2" as="font" type="font/woff2" crossorigin />
    <style>
      @font-face {
        font-family: 'Source Sans 3';
        font-weight: 200 900;
        font-display: swap;
        src: url('/fonts/source-sans-3-variable.woff2') format('woff2');
      }
      /* The home page's tokens and toolbar, from src/styles/App.css. */
      :root {
        color-scheme: light;
        --bg: #e9e3d6;
        --ink: #26211b;
        --ink-soft: #62594d;
        --line: #d2c9b7;
        --edge: #a89c87;
        --accent: #a4441c;
        --font-body: 'Source Sans 3', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        --font-display: var(--font-body);
      }
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      body {
        font-family: var(--font-body);
        background-color: var(--bg);
        color: var(--ink);
        line-height: 1.7;
        overflow-wrap: break-word;
      }
      ::selection {
        background: rgb(164 68 28 / 0.18);
      }
      :focus-visible {
        outline: 2px solid var(--ink);
        outline-offset: 3px;
      }
      .toolbar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        max-width: 1000px;
        margin: 0 auto;
        padding: 1.1rem 1.5rem;
      }
      .toolbar-home {
        display: flex;
      }
      .toolbar-home img {
        display: block;
        border: 1px solid var(--edge);
        border-radius: 5px;
      }
      .toolbar-links {
        display: flex;
        gap: clamp(0.7rem, 3.2vw, 1.5rem);
        font-size: 0.9375rem;
      }
      @media (max-width: 350px) {
        .toolbar-links {
          gap: 0.55rem;
          font-size: 0.8125rem;
        }
      }
      @media (min-width: 601px) {
        .toolbar-links {
          gap: 1.5rem;
        }
      }
      .toolbar-links a {
        padding: 0.45rem 0;
        color: var(--ink-soft);
        text-decoration: none;
      }
      .toolbar-links a:hover,
      .toolbar-links a[aria-current] {
        color: var(--ink);
      }
      /* The site's motion, from MOTION in src/styles/App.css: colours fade,
         a pressed button dips 3%, and going to another page the browser
         cross-fades the two together. */
      .toolbar-links a,
      .toolbar-home {
        transition: color 150ms ease;
      }
      @media (prefers-reduced-motion: no-preference) {
        .toolbar-home {
          transition:
            color 150ms ease,
            transform 160ms cubic-bezier(0.23, 1, 0.32, 1);
        }
        .toolbar-home:active {
          transform: scale(0.97);
        }
        @view-transition {
          navigation: auto;
        }
        ::view-transition-old(root),
        ::view-transition-new(root) {
          animation-duration: 0.2s;
        }
      }
      /* The post: one column at a width that reads well. */
      main {
        max-width: 46rem;
        margin: 0 auto;
        padding: 3rem 1.5rem 6rem;
      }
      h1 {
        font-family: var(--font-display);
        font-size: clamp(1.9rem, 5vw, 2.6rem);
        font-weight: 700;
        line-height: 1.15;
        text-wrap: balance;
      }
      .byline {
        margin: 0.9rem 0 2.5rem;
        font-size: 0.9375rem;
        color: var(--ink-soft);
      }
      article h2 {
        margin: 2.75rem 0 0.8rem;
        font-family: var(--font-display);
        font-size: 1.6rem;
        font-weight: 700;
        line-height: 1.25;
      }
      article p,
      article ul,
      article ol {
        margin-top: 1rem;
        font-size: 1.125rem;
      }
      article ul,
      article ol {
        padding-left: 1.25rem;
      }
      article li + li {
        margin-top: 0.4rem;
      }
      article a {
        color: var(--accent);
        text-decoration: underline wavy;
        text-decoration-color: rgb(164 68 28 / 0.5);
        text-decoration-thickness: 1px;
        text-underline-offset: 5px;
        transition: text-decoration-color 150ms ease;
      }
      article a:hover {
        text-decoration-color: var(--accent);
      }
      article img {
        display: block;
        width: 100%;
        height: auto;
        margin-top: 1.75rem;
      }
      /* A chart drawn on a white page: its white is let through, so it
         sits on the site's own paper. */
      article img.chart {
        mix-blend-mode: multiply;
      }
      .caption {
        margin-top: 0.6rem;
        font-size: 0.9375rem;
        color: var(--ink-soft);
      }
      .table {
        margin-top: 1.5rem;
        overflow-x: auto;
      }
      table {
        width: 100%;
        border-collapse: collapse;
        font-size: 1.0625rem;
        font-variant-numeric: tabular-nums;
      }
      th,
      td {
        padding: 0.55rem 0.9rem 0.55rem 0;
        border-bottom: 1px solid var(--line);
        text-align: left;
        vertical-align: top;
      }
      th {
        border-bottom-color: var(--edge);
        font-weight: 400;
        color: var(--ink-soft);
      }
      th:not(:first-child),
      td:not(:first-child) {
        text-align: right;
        white-space: nowrap;
      }
      /* The summary, in a card. Its label is small and spaced, not bold. */
      .tldr,
      .demo-panel {
        border: 1px solid var(--line);
        border-radius: 8px;
        background: rgb(255 255 255 / 0.32);
      }
      .tldr {
        padding: 1rem 1.25rem 1.15rem;
      }
      .tldr p {
        margin-top: 0.25rem;
      }
      .tldr .tldr-label {
        margin-top: 0;
        font-size: 0.8125rem;
        letter-spacing: 0.14em;
        color: var(--ink-soft);
      }
      /* The figure: a tab for each run, two charts, and what was reported. */
      .demo {
        margin-top: 1.75rem;
      }
      .demo-tabs {
        display: flex;
        gap: 1.5rem;
        overflow-x: auto;
      }
      .demo-tabs button {
        padding: 0.5rem 0;
        border: 0;
        background: none;
        box-shadow: inset 0 -2px 0 transparent;
        color: var(--ink-soft);
        font: inherit;
        font-size: 1rem;
        white-space: nowrap;
        cursor: pointer;
        transition:
          color 150ms ease,
          box-shadow 150ms ease;
      }
      @media (prefers-reduced-motion: no-preference) {
        .demo-tabs button {
          transition:
            color 150ms ease,
            box-shadow 150ms ease,
            transform 160ms cubic-bezier(0.23, 1, 0.32, 1);
        }
        .demo-tabs button:active {
          transform: scale(0.97);
        }
      }
      .demo-tabs button:hover {
        color: var(--ink);
      }
      .demo-tabs button[aria-selected='true'] {
        box-shadow: inset 0 -2px 0 var(--accent);
        color: var(--ink);
      }
      .demo-tabs button:focus-visible {
        outline-offset: -2px;
      }
      .demo-panel {
        padding: 1rem 1.25rem 1.2rem;
        border-top-left-radius: 0;
      }
      .demo .demo-run {
        margin-top: 0;
        font-size: 1rem;
      }
      .demo-charts {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 0.5rem 1.5rem;
        margin-top: 0.9rem;
      }
      .demo-charts p {
        margin-top: 0;
        font-size: 0.9375rem;
        color: var(--ink-soft);
      }
      .demo svg {
        display: block;
        width: 100%;
        height: auto;
        font-size: 12px;
        fill: var(--ink-soft);
      }
      .demo .band {
        fill: rgb(98 89 77 / 0.17);
      }
      .demo .axis {
        stroke: var(--edge);
      }
      .demo .run {
        fill: none;
        stroke: var(--accent);
        stroke-width: 2;
        stroke-linejoin: round;
        stroke-linecap: round;
      }
      .demo .run.after {
        opacity: 0.3;
      }
      .demo .alarm {
        stroke: var(--ink);
        stroke-dasharray: 4 3;
      }
      .demo-answers {
        display: grid;
        grid-template-columns: max-content 1fr;
        gap: 0.3rem 1.1rem;
        margin-top: 0.9rem;
        padding-top: 0.9rem;
        border-top: 1px solid var(--line);
        font-size: 1rem;
      }
      .demo-answers dt {
        color: var(--ink-soft);
      }
      .demo .demo-signals {
        display: flex;
        flex-wrap: wrap;
        gap: 0.2rem 1.1rem;
        margin-top: 0.6rem;
        padding: 0;
        list-style: none;
        font-size: 0.9375rem;
        color: var(--ink-soft);
      }
      .demo .demo-signals li {
        margin: 0;
      }
      .demo .demo-signals .out {
        color: var(--accent);
      }
      @media (max-width: 600px) {
        .demo-tabs {
          gap: 1.1rem;
        }
        .demo-charts {
          grid-template-columns: 1fr;
        }
      }
    </style>
    <!-- Loads one of the site's own pages ahead when a link to it is about
         to be followed (pointed at for a moment, or pressed), so the page
         is there at once and the cross-fade starts without a wait. A
         browser without speculation rules skips this. The project sites
         and the PDFs are left out. -->
    <script type="speculationrules">
      {
        "prerender": [
          {
            "where": {
              "or": [
                { "href_matches": "/" },
                { "href_matches": "/projects/" },
                { "href_matches": "/write-ups/*" },
                { "href_matches": "/robotics/" },
                { "href_matches": "/honors/" }
              ]
            },
            "eagerness": "moderate"
          }
        ]
      }
    </script>
  </head>
  <body>
    <nav class="toolbar" aria-label="Site">
      <a class="toolbar-home" href="/" aria-label="Sohan Bhat, home">
        <img src="/favicon.svg?v=2" alt="" width="26" height="26" />
      </a>
      <div class="toolbar-links">
        <a href="/projects/">Projects</a>
        <a href="/write-ups/" aria-current="true">Write-ups</a>
        <a href="/robotics/">Robotics</a>
        <a href="/honors/">Honors</a>
      </div>
    </nav>
    <main>
      <article>
        <h1>${escape(title)}</h1>
        <p class="byline">${escape(author)}, ${escape(published)}</p>
${html}
      </article>
    </main>${tabs ? `\n    ${script}` : ''}
  </body>
</html>
`;

const posts = fs
    .readdirSync(POSTS)
    .filter((file) => file.endsWith('.md'))
    .map((file) => {
        const name = path.basename(file, '.md');
        let text = fs.readFileSync(path.join(POSTS, file), 'utf8');

        const heading = text.match(/^# (.+)\n/m);
        if (!heading) throw new Error(`No "# Title" in write-ups/${file}`);
        const title = heading[1].trim();
        text = text.replace(heading[0], '');
        let author;
        let published;
        [author, text] = take(text, 'Author');
        [published, text] = take(text, 'Published');

        // The page's description: the first paragraph without its TL;DR
        // label, as many whole sentences as a search result shows.
        const first = plain(text.trim().split(/\n\s*\n/)[0]).replace(/\s+/g, ' ').replace(/^TL;DR\s*/, '');
        let summary = '';
        for (const sentence of first.match(/[^.!?]+[.!?]+/g)) {
            if (summary && (summary + sentence).length > 158) break;
            summary += sentence;
        }
        summary = summary.trim();

        const dir = path.join(OUT, name);
        fs.mkdirSync(path.join(dir, 'img'), { recursive: true });

        // The still figure gives way to the runs in the post's data file.
        const data = path.join(POSTS, 'data', `${name}.json`);
        const still = /<!-- figure -->\s*<a id="([^"]+)"><\/a>[\s\S]*?<!-- \/figure -->/;
        const tabs = fs.existsSync(data) && still.test(text);
        let drawn = '';
        if (tabs) {
            const caption =
                'Figure 1. Four saved runs, each replayed through LHD. The band is the healthy range and the dashed line is the alarm.';
            drawn = figure(JSON.parse(fs.readFileSync(data, 'utf8')), text.match(still)[1], caption);
            text = text.replace(still, 'FIGUREGOESHERE');
        }

        const html = marked
            .parse(text, { gfm: true })
            .replace('<p>FIGUREGOESHERE</p>', () => drawn)
            // The summary's card, with its label on a line of its own.
            .replace(/<p>TL;DR ([\s\S]*?)<\/p>/, '<div class="tldr">\n<p class="tldr-label">TL;DR</p>\n<p>$1</p>\n</div>')
            // Each picture is copied beside the page, given its size so the
            // page does not jump as it loads, and marked if it is a chart.
            .replace(/<img src="(img\/[^"]+)"([^>]*)>/g, (_, src, rest) => {
                const from = path.join(POSTS, src);
                fs.copyFileSync(from, path.join(dir, src));
                const chart = src.endsWith('.png');
                const [width, height] = chart ? pngSize(from) : [];
                const size = chart ? ` width="${width}" height="${height}"` : '';
                return `<img src="${src}"${rest.replace(/\s*\/?$/, '')}${size}${chart ? ' class="chart"' : ''} loading="lazy" decoding="async">`;
            })
            // The line under a figure is its caption.
            .replace(/<p>(Figure \d+\.)/g, '<p class="caption">$1')
            // A wide table scrolls inside its own box on a phone.
            .replace(/<table>/g, '<div class="table"><table>')
            .replace(/<\/table>/g, '</table></div>')
            .trim()
            .replace(/^/gm, '        ');

        fs.writeFileSync(path.join(dir, 'index.html'), page({ name, title, author, published, summary, html, tabs }));
        return { name, title, published, url: `/write-ups/${name}/`, opening: first };
    })
    // Newest first.
    .sort((a, b) => new Date(`1 ${b.published} UTC`) - new Date(`1 ${a.published} UTC`));

fs.writeFileSync(LIST, `${JSON.stringify(posts, null, 4)}\n`);
console.log(`Built ${posts.length} write-up${posts.length === 1 ? '' : 's'} into public/write-ups.`);
