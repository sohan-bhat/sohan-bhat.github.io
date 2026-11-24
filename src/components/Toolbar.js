import React from 'react';
import '../styles/Toolbar.css';

// The bar across the top of every page: the S on the left, back to the home
// page, and on the right one link to each of the four pages. `current`
// names the page being shown. Each write-up carries the same bar (see
// scripts/build-write-ups.js).
const LINKS = [
    ['projects', 'Projects', '/projects/'],
    ['write-ups', 'Write-ups', '/write-ups/'],
    ['robotics', 'Robotics', '/robotics/'],
    ['honors', 'Honors', '/honors/'],
];

const Toolbar = ({ current }) => (
    <nav className="toolbar" aria-label="Site">
        <div className="container toolbar-inner">
            <a className="toolbar-home" href="/" aria-label="Sohan Bhat, home">
                <img src="/favicon.svg?v=2" alt="" width="26" height="26" />
            </a>
            <div className="toolbar-links">
                {LINKS.map(([name, label, url]) => (
                    <a key={name} href={url} aria-current={name === current ? 'page' : undefined}>
                        {label}
                    </a>
                ))}
            </div>
        </div>
    </nav>
);

export default Toolbar;
