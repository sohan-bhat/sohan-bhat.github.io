import React from 'react';
import { work, earlier } from '../data/projects';
import '../styles/Rows.css';
import '../styles/Work.css';

// Site, Code and Video say nothing on their own to a screen reader, so those
// links are named with their project. A link such as Read the paper is not.
const SHORT = ['Site', 'Code', 'Video'];

// Work: the paper and four projects, one row each, then the earlier projects
// named in one line. A row is its picture, its title, one line of text (then
// who it was built with, each as @name) and its links. Nothing else.
const Work = () => (
    <section className="work" id="work">
        <div className="container">
            <h2 className="section-title">Work<span className="title-period">.</span></h2>

            <ul className="rows">
                {work.map((item) => (
                    <li className="row" key={item.id}>
                        <div className="row-picture">
                            <img
                                src={`/imgs/card-${item.image}-560.webp`}
                                srcSet={`/imgs/card-${item.image}-560.webp 560w, /imgs/card-${item.image}-1120.webp 1120w`}
                                sizes="(max-width: 640px) calc(100vw - 3rem), 304px"
                                width="560"
                                height="350"
                                alt={item.alt}
                                loading="lazy"
                                decoding="async"
                            />
                        </div>
                        <div className="row-body">
                            <h3 className="row-title">{item.titleUrl ? <a href={item.titleUrl}>{item.title}</a> : item.title}</h3>
                            <p className="row-text">
                                {item.line}
                                {item.team && ', with '}
                                {item.team &&
                                    item.team.map((person, i) => (
                                        <React.Fragment key={person.name}>
                                            {i > 0 && ' and '}
                                            <a className="person" href={person.url} target="_blank" rel="noreferrer">
                                                @{person.name}
                                            </a>
                                        </React.Fragment>
                                    ))}
                            </p>
                            <p className="row-links">
                                {item.links.map((link) => (
                                    <a
                                        key={link.label}
                                        href={link.url}
                                        target="_blank"
                                        rel="noreferrer"
                                        aria-label={SHORT.includes(link.label) ? `${item.title} ${link.label}` : undefined}
                                    >
                                        {link.label}
                                    </a>
                                ))}
                            </p>
                        </div>
                    </li>
                ))}
            </ul>

            <p className="work-earlier">
                Earlier:{' '}
                {earlier.map((project, i) => (
                    <React.Fragment key={project.title}>
                        {i > 0 && ', '}
                        <a href={project.url} target="_blank" rel="noreferrer">
                            {project.title}
                        </a>
                    </React.Fragment>
                ))}
            </p>
        </div>
    </section>
);

export default Work;
