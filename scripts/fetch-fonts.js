// Downloads Satoshi into public/fonts before a build, so the site serves it
// itself. Satoshi is free from Fontshare under the ITF Free Font License,
// which allows self-hosting on your own site but not sharing the files
// through a repository, so the file is gitignored and fetched here instead.
// It is the official variable font, unchanged (the license forbids subsetting).
const fs = require('fs');
const path = require('path');

const out = path.join(__dirname, '..', 'public', 'fonts', 'satoshi-variable.woff2');
const css = 'https://api.fontshare.com/v2/css?f[]=satoshi@1&display=swap';

(async () => {
    if (fs.existsSync(out)) return;
    const sheet = await (await fetch(css)).text();
    const match = sheet.match(/url\('(\/\/cdn\.fontshare\.com\/[^']+\.woff2)'\)/);
    if (!match) throw new Error('No Satoshi woff2 in the Fontshare stylesheet');
    const res = await fetch(`https:${match[1]}`);
    if (!res.ok) throw new Error(`Satoshi download failed: ${res.status}`);
    fs.mkdirSync(path.dirname(out), { recursive: true });
    fs.writeFileSync(out, Buffer.from(await res.arrayBuffer()));
    console.log(`Downloaded Satoshi from Fontshare into ${path.relative(process.cwd(), out)}.`);
})().catch((err) => {
    console.error(err.message);
    process.exit(1);
});
