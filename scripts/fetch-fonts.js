// Puts the site's one font into public/fonts before a build, so the site
// serves it itself. That folder is gitignored.
//
// Source Sans 3 is under the SIL Open Font License and comes from the
// @fontsource-variable/source-sans-3 package, so it is copied from there.
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'public', 'fonts');
const from = require.resolve('@fontsource-variable/source-sans-3/files/source-sans-3-latin-wght-normal.woff2');

fs.mkdirSync(dir, { recursive: true });
fs.copyFileSync(from, path.join(dir, 'source-sans-3-variable.woff2'));
