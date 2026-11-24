// Runs after the prerender and fails the build if anything search engines
// rely on goes missing: the title, h1, description, canonical link,
// structured data, robots.txt, the sitemap, the write-ups and the three pages. It reads the built files only.

const fs = require('fs');
const path = require('path');

const BUILD = path.resolve(__dirname, '../build');
const html = fs.readFileSync(path.join(BUILD, 'index.html'), 'utf8');
const robots = fs.readFileSync(path.join(BUILD, 'robots.txt'), 'utf8');
const sitemap = fs.readFileSync(path.join(BUILD, 'sitemap.xml'), 'utf8');
const projectsSrc = fs.readFileSync(path.resolve(__dirname, '../src/data/projects.js'), 'utf8');
const certificatesSrc = fs.readFileSync(path.resolve(__dirname, '../src/data/certificates.js'), 'utf8');

const NAME = 'Sohan Bhat';
const HOME = 'https://sohanbhat.me/';
const problems = [];
const expect = (ok, message) => ok || problems.push(message);
const text = (s) => s.replace(/<[^>]+>/g, '').trim();

const h1s = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)].map((m) => text(m[1]));
expect(h1s.length === 1 && h1s[0] === NAME, `one h1 reading "${NAME}", found ${JSON.stringify(h1s)}`);

const title = (html.match(/<title>([^<]*)<\/title>/) || [])[1] || '';
expect(title.startsWith(NAME), `a title starting with "${NAME}", found "${title}"`);

const description = (html.match(/<meta name="description" content="([^"]*)"/) || [])[1] || '';
expect(description.length >= 50 && description.length <= 160, `a description of 50 to 160 characters, found ${description.length}`);
expect(description.includes(NAME), 'the name in the description');
expect(!/[:\u2013\u2014\u00b7]/.test(description), 'no colon, dash or middle dot in the description');

expect(html.includes(`<link rel="canonical" href="${HOME}"`), `a canonical link to ${HOME}`);
expect(!/noindex/i.test(html), 'no noindex');
expect(!html.includes('sohan-bhat.github.io'), 'no links to the old sohan-bhat.github.io address');

// Every project is on the Projects page, and the best are on the home page.
const projectsPageFile = path.join(BUILD, 'projects/index.html');
const projectsPage = fs.existsSync(projectsPageFile) ? fs.readFileSync(projectsPageFile, 'utf8') : '';
for (const [, projectTitle] of projectsSrc.matchAll(/^ {8}title: '([^']+)',$/gm)) {
    expect(projectsPage.includes(projectTitle), `the project "${projectTitle}" on the Projects page`);
}

// Every certificate is on the Honors page.
const certificatesPageFile = path.join(BUILD, 'honors/index.html');
const certificatesPage = fs.existsSync(certificatesPageFile) ? fs.readFileSync(certificatesPageFile, 'utf8') : '';
for (const [, certTitle] of certificatesSrc.matchAll(/^ {8}title: '([^']+)',$/gm)) {
    expect(certificatesPage.includes(certTitle), `the certificate "${certTitle}" on the Honors page`);
}

const ldBlocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
expect(ldBlocks.length === 1, `one JSON-LD block, found ${ldBlocks.length}`);
try {
    const graph = JSON.parse(ldBlocks[0][1])['@graph'];
    const person = graph.find((node) => node['@type'] === 'Person');
    expect(person && person.name === NAME, 'a Person named Sohan Bhat in the JSON-LD');
    expect(person && person.sameAs && person.sameAs.length >= 3, 'the Person links to the three profiles');
    expect(graph.some((node) => node['@type'] === 'ProfilePage'), 'a ProfilePage in the JSON-LD');
} catch (err) {
    problems.push(`JSON-LD that parses (${err.message})`);
}

expect(robots.includes(`Sitemap: ${HOME}sitemap.xml`), 'robots.txt pointing at the sitemap');
expect(!/^Disallow:\s*\/\s*$/m.test(robots), 'robots.txt not blocking the site');
expect(sitemap.includes(`<loc>${HOME}</loc>`), 'the home page in the sitemap');

// The write-ups: every post in write-ups/ has its page, the page has its
// canonical link, links home and is in the sitemap, and the home page links
// to it.
for (const file of fs.readdirSync(path.resolve(__dirname, '../write-ups')).filter((f) => f.endsWith('.md'))) {
    const name = path.basename(file, '.md');
    const url = `${HOME}write-ups/${name}/`;
    const postFile = path.join(BUILD, 'write-ups', name, 'index.html');
    const post = fs.existsSync(postFile) ? fs.readFileSync(postFile, 'utf8') : '';
    expect(post, `the write-up's page at write-ups/${name}/`);
    expect(post.includes(`<link rel="canonical" href="${url}"`), `the write-up's canonical link to ${url}`);
    expect(post.includes('href="/" aria-label="Sohan Bhat, home"'), `a link home from write-ups/${name}/`);
    expect(!/noindex/i.test(post), `no noindex on write-ups/${name}/`);
    expect(sitemap.includes(`<loc>${url}</loc>`), `write-ups/${name}/ in the sitemap`);
    expect(html.includes(`<a href="/write-ups/${name}/">`), `a link from the home page to write-ups/${name}/`);
}

// The pages for Projects, Write-ups, Robotics and Honors: each has its own file with
// one h1, its own description and canonical link, is in the sitemap and is
// linked from the home page.
for (const name of ['projects', 'write-ups', 'robotics', 'honors']) {
    const url = `${HOME}${name}/`;
    const file = path.join(BUILD, name, 'index.html');
    const page = fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : '';
    expect(page, `the page at ${name}/`);
    expect((page.match(/<h1[ >]/g) || []).length === 1, `one h1 on ${name}/`);
    expect(page.includes(`<link rel="canonical" href="${url}"`), `the canonical link to ${url}`);
    const pageDescription = (page.match(/<meta name="description" content="([^"]*)"/) || [])[1] || '';
    expect(pageDescription.length >= 50 && pageDescription.length <= 160, `a description of 50 to 160 characters on ${name}/, found ${pageDescription.length}`);
    expect(pageDescription !== description, `a description of its own on ${name}/`);
    expect(!/[:\u2013\u2014\u00b7]/.test(pageDescription), `no colon, dash or middle dot in the description on ${name}/`);
    expect(!/noindex/i.test(page), `no noindex on ${name}/`);
    expect(sitemap.includes(`<loc>${url}</loc>`), `${name}/ in the sitemap`);
    expect(html.includes(`href="/${name}/"`), `a link from the home page to ${name}/`);
}

if (problems.length) {
    console.error(`SEO check failed. Expected:\n${problems.map((p) => `  - ${p}`).join('\n')}`);
    process.exit(1);
}
console.log('SEO check passed.');
