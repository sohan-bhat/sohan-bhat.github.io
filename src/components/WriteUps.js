import React from 'react';
import writeUps from '../data/write-ups.json';
import '../styles/WriteUps.css';

// Write-ups, in the intro under the name and links, beside Certificates.
// Each is its title, which opens it, and when it was published. The heading
// opens the Write-ups page. The list is built from the Markdown files in
// write-ups/ by scripts/build-write-ups.js, newest first.
const WriteUps = () => (
    <div className="hero-write-ups" id="write-ups">
        <h2 className="section-title">
            <a href="/write-ups/">Write-ups</a>
            <span className="title-period">.</span>
        </h2>
        <ul className="write-up-list">
            {writeUps.map((post) => (
                <li className="write-up" key={post.name}>
                    <h3 className="write-up-title">
                        <a href={post.url}>{post.title}</a>
                    </h3>
                    <p className="write-up-date">{post.published}</p>
                </li>
            ))}
        </ul>
    </div>
);

export default WriteUps;
