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

const markup = renderToString(React.createElement(App));
let html = fs.readFileSync(BUILD_HTML, 'utf8');
const emptyRoot = '<div id="root"></div>';
if (!html.includes(emptyRoot)) {
    throw new Error(`prerender: ${emptyRoot} not found in build/index.html`);
}
html = html.replace(emptyRoot, () => `<div id="root">${markup}</div>`);
console.log(`Prerendered ${(markup.length / 1024).toFixed(1)} kB of HTML into build/index.html.`);

// If no component has state, effects, or event handlers, the prerendered HTML
// is the whole page, so it ships without the JavaScript bundle. Add any of
// those and the bundle is kept automatically.
const CLIENT_CODE =
    /\buse(State|Effect|LayoutEffect|Reducer|Ref|Context|Transition|SyncExternalStore)\b|\bon[A-Z][A-Za-z]*=/;
const hasClientCode = (dir) =>
    fs.readdirSync(dir, { withFileTypes: true }).some((entry) => {
        const file = path.join(dir, entry.name);
        if (entry.isDirectory()) return hasClientCode(file);
        return entry.name.endsWith('.js') && CLIENT_CODE.test(fs.readFileSync(file, 'utf8'));
    });

if (hasClientCode(SRC)) {
    console.log('Kept the JavaScript bundle: the app has client-side behavior.');
} else {
    const bundle = /<script defer="defer" src="[^"]*\/static\/js\/main\.[0-9a-f]+\.js"><\/script>/;
    if (!bundle.test(html)) throw new Error('prerender: bundle <script> not found in build/index.html');
    html = html.replace(bundle, '');
    console.log('Removed the JavaScript bundle: the page is static.');
}

fs.writeFileSync(BUILD_HTML, html);
