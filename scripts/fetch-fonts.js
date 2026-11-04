// Downloads the site's fonts into public/fonts before a build, so the site
// serves them itself. Satoshi and Tanker are free from Fontshare under the
// ITF Free Font License, which allows self-hosting on your own site but not
// sharing the files through a repository, so they are gitignored and fetched
// here instead. They are the official files, unchanged (the license forbids
// subsetting).
const fs = require('fs');
const path = require('path');

const fonts = {
    'satoshi-variable.woff2': 'satoshi@1',
    'tanker.woff2': 'tanker@400',
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

Promise.all(Object.entries(fonts).map(([file, family]) => fetchFont(file, family))).catch((err) => {
    console.error(err.message);
    process.exit(1);
});
