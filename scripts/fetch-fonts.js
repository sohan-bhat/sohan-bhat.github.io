// Puts the site's two fonts into public/fonts before a build, so the site
// serves them itself. That folder is gitignored.
//
// Excon, for the headings, is free from Fontshare under the ITF Free Font
// License, which allows self-hosting on your own site but not sharing the
// file through a repository, so it is downloaded here. It is the official
// file, unchanged (the license forbids subsetting).
//
// Source Sans 3, for everything else, is under the SIL Open Font License and
// comes from the @fontsource-variable/source-sans-3 package, so it is copied
// from there.
const fs = require('fs');
const path = require('path');

const fonts = {
    'excon-variable.woff2': 'excon@1',
};
const dir = path.join(__dirname, '..', 'public', 'fonts');

async function fetchFont(file, family) {
    const out = path.join(dir, file);
    if (fs.existsSync(out)) return;
    const sheet = await (await fetch(`https://api.fontshare.com/v2/css?f[]=${family}&display=swap`)).text();
    const match = sheet.match(/url\('(\/\/cdn\.fontshare\.com\/[^']+\.woff2)'\)/);
    if (!match) throw new Error(`No woff2 for ${family} in the Fontshare stylesheet`);
    const res = await fetch(`https:${match[1]}`);
    if (!res.ok) throw new Error(`${family} download failed: ${res.status}`);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(out, Buffer.from(await res.arrayBuffer()));
    console.log(`Downloaded ${family} from Fontshare into public/fonts/${file}.`);
}

function copySourceSans() {
    const from = require.resolve('@fontsource-variable/source-sans-3/files/source-sans-3-latin-wght-normal.woff2');
    fs.mkdirSync(dir, { recursive: true });
    fs.copyFileSync(from, path.join(dir, 'source-sans-3-variable.woff2'));
}

Promise.all(Object.entries(fonts).map(([file, family]) => fetchFont(file, family)))
    .then(copySourceSans)
    .catch((err) => {
        console.error(err.message);
        process.exit(1);
    });
