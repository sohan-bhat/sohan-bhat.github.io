import React from 'react';
import '../styles/Research.css';

const Research = () => (
    <section className="research" id="research">
        <div className="container">
            <div className="research-col">
                <h2 className="section-title">Research<span className="title-period">.</span></h2>
                <article className="research-entry">
                    <h3 className="research-paper-title">
                        Early detection of silent training failures in neural networks
                    </h3>
                    <p className="research-meta">Research paper, 2026</p>
                    <a
                        className="research-link retro-button"
                        href="/lhd-paper.pdf"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Read the paper
                    </a>
                </article>
            </div>
        </div>
    </section>
);

export default Research;
