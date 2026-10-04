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
                            I like building machine learning from scratch to see how it works.
                            SignNet, a neural network written in plain NumPy, led to my research
                            paper on silent training failures.
                        </p>
                        <p>
                            I also program for FRC Team 2714 and train for USACO Gold. Away from
                            the screen, I play soccer and tennis and go hiking with my family.
                        </p>
                    </div>
                </div>

                <aside className="research-col" aria-label="Current research">
                    <h2 className="section-title">Research<span className="title-period">.</span></h2>
                    <article className="research-entry">
                        <h3 className="research-paper-title">
                            Early detection of silent training failures in neural networks
                        </h3>
                        <p className="research-meta">Sohan Bhat, 2026</p>
                        <p className="research-description">
                            The network trains, the loss falls, and the model is still wrong.
                            A paper on catching that early.
                        </p>
                        <a
                            className="research-link"
                            href="https://docs.google.com/document/d/1m9FRd58Kw7oxOFHpu17VgfbktLi-XrZAXAe1FFqH_d8/edit?usp=sharing"
                            target="_blank"
                            rel="noreferrer"
                        >
                            Read the preprint ↗
                        </a>
                    </article>
                </aside>
            </div>
        </div>
    </section>
);

export default About;
