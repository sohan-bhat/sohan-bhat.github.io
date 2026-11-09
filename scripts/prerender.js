// Renders the app to static HTML after `react-scripts build`, so the page
// appears as soon as the HTML arrives instead of after the JavaScript runs.
// React then hydrates the existing markup (see src/index.js).

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
const BUILD = path.resolve(__dirname, '../build');

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
const { StaticRouter } = require('react-router');
const App = require(path.join(SRC, 'App.js')).default;
const { SITE, pages, missing } = require(path.join(SRC, 'pages.js'));

const template = fs.readFileSync(path.join(BUILD, 'index.html'), 'utf8');

const escape = (text) =>
    text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const swap = (html, pattern, replacement) => {
    if (!pattern.test(html)) throw new Error(`prerender: ${pattern} not found in build/index.html`);
    return html.replace(pattern, () => replacement);
};

const metaContent = (html, attr, name, value) =>
    swap(html, new RegExp(`<meta ${attr}="${name}" content="[^"]*"/?>`), `<meta ${attr}="${name}" content="${escape(value)}"/>`);

const render = (location) => {
    const app = React.createElement(StaticRouter, { location }, React.createElement(App));
    return swap(template, /<div id="root"><\/div>/, `<div id="root">${renderToString(app)}</div>`);
};

const write = (file, html) => {
    const out = path.join(BUILD, file);
    fs.mkdirSync(path.dirname(out), { recursive: true });
    fs.writeFileSync(out, html);
    console.log(`Prerendered ${(html.length / 1024).toFixed(1)} kB into build/${file}.`);
};

for (const page of pages) {
    const url = SITE + page.path;
    let html = render(page.path);
    html = swap(html, /<title>[^<]*<\/title>/, `<title>${escape(page.title)}</title>`);
    html = swap(html, /<link rel="canonical" href="[^"]*"\/?>/, `<link rel="canonical" href="${url}"/>`);
    html = metaContent(html, 'name', 'description', page.description);
    html = metaContent(html, 'property', 'og:url', url);
    html = metaContent(html, 'property', 'og:title', page.title);
    html = metaContent(html, 'property', 'og:description', page.description);
    write(`${page.path.slice(1)}index.html`, html);
}

let notFound = render('/404');
notFound = swap(notFound, /<title>[^<]*<\/title>/, `<title>${escape(missing.title)}</title><meta name="robots" content="noindex"/>`);
notFound = swap(notFound, /<link rel="canonical" href="[^"]*"\/?>/, '');
notFound = swap(notFound, /<meta property="og:url" content="[^"]*"\/?>/, '');
write('404.html', notFound);
