// Runs after the prerender and fails the build if anything search engines
// rely on goes missing: the title, h1, description, canonical link,
// structured data, robots.txt and sitemap. It reads the built files only.

const fs = require('fs');
const path = require('path');

const BUILD = path.resolve(__dirname, '../build');
const html = fs.readFileSync(path.join(BUILD, 'index.html'), 'utf8');
const robots = fs.readFileSync(path.join(BUILD, 'robots.txt'), 'utf8');
const sitemap = fs.readFileSync(path.join(BUILD, 'sitemap.xml'), 'utf8');
const projectsSrc = fs.readFileSync(path.resolve(__dirname, '../src/data/projects.js'), 'utf8');

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
expect(html.includes('Frisco, Texas'), 'the About text in the prerendered HTML');

for (const [, projectTitle] of projectsSrc.matchAll(/^ {8}title: '([^']+)',$/gm)) {
    expect(html.includes(projectTitle), `the project "${projectTitle}" in the prerendered HTML`);
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

if (problems.length) {
    console.error(`SEO check failed. Expected:\n${problems.map((p) => `  - ${p}`).join('\n')}`);
    process.exit(1);
}
console.log('SEO check passed.');
