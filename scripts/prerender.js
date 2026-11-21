// Renders every page of the app (src/pages/index.js) to static HTML after
// `react-scripts build`, so each address has its own file and a page appears
// as soon as the HTML arrives instead of after the JavaScript runs. React
// then hydrates the existing markup (see src/index.js).

const fs = require('fs');
const path = require('path');
const Module = require('module');

// CRA's Babel preset compiles modules to CommonJS for Node only in its test
// env, which also emits development JSX, so React's development build is used
// here. Both builds produce the same HTML.
process.env.NODE_ENV = 'test';
process.env.BABEL_ENV = 'test';

// Resolve Babel from react-scripts, which already depends on it.
const fromReactScripts = { paths: [path.dirname(require.resolve('react-scripts/package.json'))] };
const babel = require(require.resolve('@babel/core', fromReactScripts));
const preset = require.resolve('babel-preset-react-app', fromReactScripts);

const SRC = path.resolve(__dirname, '../src');
const BUILD_HTML = path.resolve(__dirname, '../build/index.html');

const loadJs = Module._extensions['.js'];
Module._extensions['.js'] = (module, filename) => {
    if (!filename.startsWith(SRC)) return loadJs(module, filename);
    const { code } = babel.transformFileSync(filename, {
        babelrc: false,
        configFile: false,
        presets: [[preset, { runtime: 'automatic' }]],
    });
    module._compile(code, filename);
};
// Stylesheets are bundled by webpack; on the server they're no-ops.
Module._extensions['.css'] = () => {};

const React = require('react');
const { renderToString } = require('react-dom/server');
const App = require(path.join(SRC, 'App.js')).default;
const { pages } = require(path.join(SRC, 'pages/index.js'));

const template = fs.readFileSync(BUILD_HTML, 'utf8');
const emptyRoot = '<div id="root"></div>';
if (!template.includes(emptyRoot)) {
    throw new Error(`prerender: ${emptyRoot} not found in build/index.html`);
}

// Swaps one piece of the home page's head for a page's own, and fails the
// build if the piece is not there to swap.
const swap = (html, pattern, value) => {
    if (!pattern.test(html)) throw new Error(`prerender: ${pattern} not found in build/index.html`);
    return html.replace(pattern, value);
};
const attr = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;');

// Every page gets its own file, so each address answers with its own HTML.
// A page other than the home page also gets its own title, description and
// address in the head, and goes without the home page's structured data,
// which describes the home page.
for (const page of pages) {
    const markup = renderToString(React.createElement(App, { path: page.path }));
    let html = template.replace(emptyRoot, () => `<div id="root">${markup}</div>`);
    if (page.path !== '/') {
        const url = `https://sohanbhat.me${page.path}`;
        html = swap(html, /<title>[^<]*<\/title>/, `<title>${attr(page.title)}</title>`);
        html = swap(html, /<meta name="description" content="[^"]*"/, `<meta name="description" content="${attr(page.description)}"`);
        html = swap(html, /<link rel="canonical" href="[^"]*"/, `<link rel="canonical" href="${url}"`);
        html = swap(html, /<meta property="og:url" content="[^"]*"/, `<meta property="og:url" content="${url}"`);
        html = swap(html, /<meta property="og:title" content="[^"]*"/, `<meta property="og:title" content="${attr(page.title)}"`);
        html = swap(html, /<meta property="og:description" content="[^"]*"/, `<meta property="og:description" content="${attr(page.description)}"`);
        html = swap(html, /<script type="application\/ld\+json">[\s\S]*?<\/script>/, '');
    }
    const file = path.join(path.dirname(BUILD_HTML), page.path, 'index.html');
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, html);
    console.log(`Prerendered ${(markup.length / 1024).toFixed(1)} kB of HTML into build${page.path}index.html.`);
}
