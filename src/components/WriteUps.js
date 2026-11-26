import React from 'react';
import writeUps from '../data/write-ups.json';
import results from '../data/write-up-results';
import '../styles/WriteUps.css';

// Write-ups, under the intro's name and links, beside Certificates.
// Each is its title, which opens it, its main result in a sentence, and
// when it was published. The heading opens the Write-ups page. The list is built from the Markdown files in
// write-ups/ by scripts/build-write-ups.js, newest first.
const WriteUps = () => (
    <div className="hero-write-ups" id="write-ups">
        <h2 className="section-title">
            <a href="/write-ups/">Write-ups</a>
        </h2>
        <ul className="write-up-list">
            {writeUps.map((post) => (
                <li className="write-up" key={post.name}>
                    <h3 className="write-up-title">
                        <a href={post.url}>{post.title}</a>
                    </h3>
                    {results[post.name] && <p className="write-up-result">{results[post.name]}</p>}
                    <p className="write-up-meta">{post.published}</p>
                </li>
            ))}
        </ul>
    </div>
);

export default WriteUps;
