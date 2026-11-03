import React from 'react';
import '../styles/About.css';

const About = () => (
    <section className="about" id="about">
        <div className="container">
            <div className="about-layout">
                <div className="about-col">
                    <h2 className="section-title">About<span className="title-period">.</span></h2>
                    <div className="about-prose">
                        <p>
                            I'm 15 and a sophomore at Heritage High School in Frisco, Texas.
                        </p>
                        <p>
                            I write neural networks from scratch in NumPy, and one of them,
                            signnet, led to my research.
                        </p>
                        <p>I also code for FRC Team 2714 and play soccer and tennis.</p>
                    </div>
                </div>

                <aside className="research-col" aria-label="Current research">
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
                </aside>
            </div>
        </div>
    </section>
);

export default About;
