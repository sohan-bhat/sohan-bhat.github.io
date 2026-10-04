import React from 'react';
import { PROFILE } from './content';
import './styles/App.css';
import Header from './components/Header';
import Title from './components/Title';
import Work from './components/Work';

// One page of a paper: letterhead, title block, a figure of the work, and a
// footnote and page number at the foot.
function App() {
    return (
        <div className="sheet">
            <Header />
            <main>
                <Title />
                <Work />
            </main>
            <aside className="footnote" aria-label="Footnote">
                <p>
                    <sup aria-hidden="true">1</sup> {PROFILE.aside}
                </p>
            </aside>
            <p className="folio" aria-hidden="true">
                1
            </p>
        </div>
    );
}

export default App;
