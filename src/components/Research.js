import React from 'react';
import '../styles/Research.css';

// The research, in the intro under the name and links, beside About.
const Research = () => (
    <div className="hero-research" id="research">
        <h2 className="section-title">Research<span className="title-period">.</span></h2>
        <article className="research-entry">
            <h3 className="research-paper-title">
                Early detection of silent training failures in neural networks
            </h3>
            <p className="research-meta">2026</p>
            <a
                className="research-link text-link focus-link"
                href="/lhd-paper.pdf"
                target="_blank"
                rel="noreferrer"
            >
                Read the paper
            </a>
        </article>
    </div>
);

export default Research;
