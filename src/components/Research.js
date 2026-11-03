import React from 'react';
import '../styles/Research.css';

// The research, in the intro under the name and links, beside About. The
// result line quotes the paper's numbers, so update it with the paper.
const Research = () => (
    <div className="hero-research" id="research">
        <h2 className="section-title">Research<span className="title-period">.</span></h2>
        <article className="research-entry">
            <h3 className="research-paper-title">
                LHD, early detection of silent training failures in neural networks
            </h3>
            <p className="research-meta">2026</p>
            <p className="research-result">
                Across 885 training runs, LHD caught 94 of the 105 planted faults that cost
                2 or more points of accuracy, with 3 false alarms in 150 healthy runs.
            </p>
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
