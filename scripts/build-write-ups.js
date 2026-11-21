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

const fs = require('fs');
const path = require('path');
const { marked } = require('marked');

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

const page = ({ name, title, author, published, summary, html }) => `<!DOCTYPE html>
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
    <link rel="preload" href="/fonts/excon-variable.woff2" as="font" type="font/woff2" crossorigin />
    <link rel="preload" href="/fonts/source-sans-3-variable.woff2" as="font" type="font/woff2" crossorigin />
    <style>
      @font-face {
        font-family: 'Excon';
        font-weight: 100 900;
        font-display: swap;
        src: url('/fonts/excon-variable.woff2') format('woff2');
      }
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
        --font-display: 'Excon', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
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
        border-radius: 5px;
      }
      .toolbar-links {
        display: flex;
        gap: 1.6rem;
        font-size: 0.9375rem;
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
        font-weight: 600;
      }
      th:not(:first-child),
      td:not(:first-child) {
        text-align: right;
        white-space: nowrap;
      }
    </style>
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
      </div>
    </nav>
    <main>
      <article>
        <h1>${escape(title)}</h1>
        <p class="byline">${escape(author)}, ${escape(published)}</p>
${html}
      </article>
    </main>
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

        const html = marked
            .parse(text, { gfm: true })
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
            .replace(/<p>(<strong>Figure \d+)/g, '<p class="caption">$1')
            // A wide table scrolls inside its own box on a phone.
            .replace(/<table>/g, '<div class="table"><table>')
            .replace(/<\/table>/g, '</table></div>')
            .trim()
            .replace(/^/gm, '        ');

        fs.writeFileSync(path.join(dir, 'index.html'), page({ name, title, author, published, summary, html }));
        return { name, title, published, url: `/write-ups/${name}/`, opening: first };
    })
    // Newest first.
    .sort((a, b) => new Date(`1 ${b.published} UTC`) - new Date(`1 ${a.published} UTC`));

fs.writeFileSync(LIST, `${JSON.stringify(posts, null, 4)}\n`);
console.log(`Built ${posts.length} write-up${posts.length === 1 ? '' : 's'} into public/write-ups.`);
