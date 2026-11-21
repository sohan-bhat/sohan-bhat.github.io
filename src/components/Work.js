import React from 'react';
import projects from '../data/projects';
import '../styles/Work.css';

// Work: the paper and my best projects, the short list to look at first.
// Each is its picture, its name, one line and its links, and nothing else.
// The projects are the ones marked `best` in src/data/projects.js, in that
// order; the rest are in the window under Earlier.
const best = projects.filter((p) => p.best).sort((a, b) => a.best - b.best);

const Work = () => (
    <section className="work" id="work">
        <div className="container">
            <h2 className="section-title">Work<span className="title-period">.</span></h2>

            <ul className="work-list">
                {/* The paper. Its title links to its own page, and the result
                    line quotes the paper's numbers, so update it with the
                    paper. */}
                <li className="work-item">
                    <img
                        className="work-shot"
                        src="/imgs/card-lhd-560.webp"
                        srcSet="/imgs/card-lhd-560.webp 560w, /imgs/card-lhd-1120.webp 1120w"
                        sizes="(max-width: 600px) calc(100vw - 3rem), (max-width: 960px) 40vw, 250px"
                        width="560"
                        height="350"
                        alt="A chart from the paper. LHD has flagged 75% of the broken runs by epoch 3 and 84% by the end, and the accuracy curve 26%."
                        loading="lazy"
                        decoding="async"
                    />
                    <div className="work-text">
                        <h3 className="work-title">
                            <a href="/write-ups/lhd/">
                                LHD, early detection of silent training failures in neural networks
                            </a>
                        </h3>
                        <p className="work-line">
                            Caught 87% of broken training runs, usually by epoch 3, with 2% false alarms.
                        </p>
                        <p className="work-links">
                            <a className="work-link text-link focus-link" href="/lhd-paper.pdf" target="_blank" rel="noreferrer">
                                Read the paper
                            </a>
                        </p>
                    </div>
                </li>

                {best.map((p) => (
                    <li className="work-item" key={p.id}>
                        <img
                            className="work-shot"
                            src={`/imgs/card-${p.image}-560.webp`}
                            srcSet={`/imgs/card-${p.image}-560.webp 560w, /imgs/card-${p.image}-1120.webp 1120w`}
                            sizes="(max-width: 600px) calc(100vw - 3rem), (max-width: 960px) 40vw, 250px"
                            width="560"
                            height="350"
                            alt={p.alt}
                            loading="lazy"
                            decoding="async"
                        />
                        <div className="work-text">
                            <h3 className="work-title">{p.title}</h3>
                            <p className="work-line">
                                {p.line}
                                {p.team && ', with '}
                                {p.team &&
                                    p.team.map((person, i) => (
                                        <React.Fragment key={person.name}>
                                            {i > 0 && ' and '}
                                            <a className="work-person text-link" href={person.url} target="_blank" rel="noreferrer">
                                                @{person.name}
                                            </a>
                                        </React.Fragment>
                                    ))}
                            </p>
                            <p className="work-links">
                                {p.links.map((link) => (
                                    <a
                                        key={link.label}
                                        className="work-link text-link"
                                        href={link.url}
                                        target="_blank"
                                        rel="noreferrer"
                                        title={link.title}
                                        aria-label={`${p.title} ${link.title || link.label}`}
                                    >
                                        {link.label}
                                    </a>
                                ))}
                            </p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    </section>
);

export default Work;
