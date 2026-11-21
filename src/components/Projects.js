import React from 'react';
import projects from '../data/projects';
import '../styles/Cards.css';
import '../styles/Projects.css';

// Projects, in two tiers. The best are large cards, all one size: a picture,
// the name, the one line (then who it was built with, each as @name) and the
// links. The earlier ones are a row of links, each to its site.
const best = projects.filter((p) => p.best).sort((a, b) => a.best - b.best);
const earlier = projects.filter((p) => !p.best).sort((a, b) => b.date.localeCompare(a.date));

const Projects = () => (
    <section className="projects" id="projects">
        <div className="container">
            <h2 className="section-title">Projects<span className="title-period">.</span></h2>

            <ul className="cards project-cards">
                {best.map((p) => (
                    <li className="card" key={p.id}>
                        <img
                            className="card-shot"
                            src={`/imgs/card-${p.image}-560.webp`}
                            srcSet={`/imgs/card-${p.image}-560.webp 560w, /imgs/card-${p.image}-1120.webp 1120w`}
                            sizes="(max-width: 600px) calc(100vw - 3rem), (max-width: 1248px) 48vw, 564px"
                            width="560"
                            height="350"
                            alt={p.alt}
                            loading="lazy"
                            decoding="async"
                        />
                        <h3 className="card-title">{p.title}</h3>
                        <p className="card-line">
                            {p.line}
                            {p.team && ', with '}
                            {p.team &&
                                p.team.map((person, i) => (
                                    <React.Fragment key={person.name}>
                                        {i > 0 && ' and '}
                                        <a className="card-person text-link" href={person.url} target="_blank" rel="noreferrer">
                                            @{person.name}
                                        </a>
                                    </React.Fragment>
                                ))}
                        </p>
                        <p className="card-links">
                            {p.links.map((link) => (
                                <a
                                    key={link.label}
                                    className="text-link"
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
                    </li>
                ))}
            </ul>

            <h3 className="earlier-label">Earlier</h3>
            <p className="earlier-links">
                {earlier.map((p) => (
                    <a key={p.id} className="text-link" href={p.links[0].url} target="_blank" rel="noreferrer">
                        {p.title}
                    </a>
                ))}
            </p>
        </div>
    </section>
);

export default Projects;
