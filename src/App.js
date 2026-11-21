import React from 'react';
import { pageFor } from './pages';
import './styles/App.css';

// `path` is the address being shown. The browser passes its own
// (src/index.js) and the build passes each page's in turn
// (scripts/prerender.js).
function App({ path = '/' }) {
    const Page = pageFor(path);
    return (
        <div className="App">
            <Page />
        </div>
    );
}

export default App;
