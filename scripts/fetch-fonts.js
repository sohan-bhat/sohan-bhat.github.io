// Puts the site's one web font into public/fonts before a build, so the site
// serves it itself. That folder is gitignored.
//
// Inter, the text face and the headings' stand-in on devices that are not
// Apple's, is under the SIL Open Font License and comes from the
// @fontsource-variable/inter package, so it is copied from there.
//
// The headings ask for the device's own San Francisco, which Apple does not
// license for websites to serve, so there is no file for it.
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'public', 'fonts');
const from = require.resolve('@fontsource-variable/inter/files/inter-latin-wght-normal.woff2');

fs.mkdirSync(dir, { recursive: true });
fs.copyFileSync(from, path.join(dir, 'inter-variable.woff2'));
