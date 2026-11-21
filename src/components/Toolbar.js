import React from 'react';
import '../styles/Toolbar.css';

// The bar across the top: the S on the left, back to the top of the page,
// and one link to each section on the right. The blog's pages carry the same
// bar (see scripts/build-blog.js).
const Toolbar = () => (
    <nav className="toolbar" aria-label="Site">
        <div className="container toolbar-inner">
            <a className="toolbar-home" href="/" aria-label="Sohan Bhat, home">
                <img src="/favicon.svg?v=2" alt="" width="26" height="26" />
            </a>
            <div className="toolbar-links">
                <a href="#projects">Projects</a>
                <a href="#blogs">Blogs</a>
                <a href="#robotics">Robotics</a>
            </div>
        </div>
    </nav>
);

export default Toolbar;
