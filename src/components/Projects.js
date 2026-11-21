import React, { useState } from 'react';
import projects from '../data/projects';
import '../styles/Projects.css';

// Projects as a wall of pictures. The paper and the best projects come first
// and are simply bigger: the first two the largest, the rest of the best a
// size smaller, and every other project small under them, newest first.
// Size is the only thing that marks the best. A project shows just its
// picture and its name; its one line and its links come up over the picture
// when it is pointed at, focused or tapped.
const best = projects.filter((p) => p.best).sort((a, b) => a.best - b.best);
const rest = projects.filter((p) => !p.best).sort((a, b) => b.date.localeCompare(a.date));
const ordered = [...best, ...rest];

// The sorter beside the heading. A group with no project in it gets no tab.
const TABS = ['all', ...['tools', 'ml', 'apps', 'hardware'].filter((group) => ordered.some((p) => p.groups.includes(group)))];

// How wide each size of picture is drawn, for the browser to pick a file.
const SIZES = {
    large: '(max-width: 600px) calc(100vw - 3rem), (max-width: 960px) 48vw, 564px',
    medium: '(max-width: 600px) calc(100vw - 3rem), (max-width: 960px) 31vw, 368px',
    small: '(max-width: 600px) 45vw, (max-width: 960px) 23vw, 172px',
};

const Tile = ({ project, size, open, onToggle }) => {
    const name = project.longTitle || project.title;
    return (
        <li className={`tile tile-${size}${open ? ' is-open' : ''}`}>
            <div className="tile-frame">
                <button
                    type="button"
                    className="tile-shot"
                    aria-expanded={open}
                    aria-controls={`about-${project.id}`}
                    aria-label={`About ${project.title}`}
                    onClick={onToggle}
                >
                    <img
                        src={`/imgs/card-${project.image}-560.webp`}
                        srcSet={`/imgs/card-${project.image}-560.webp 560w, /imgs/card-${project.image}-1120.webp 1120w`}
                        sizes={SIZES[size]}
                        width="560"
                        height="350"
                        alt={project.alt}
                        loading="lazy"
                        decoding="async"
                    />
                </button>
                <div className="tile-about" id={`about-${project.id}`}>
                    <p className="tile-line">
                        {project.line}
                        {project.team && ', with '}
                        {project.team &&
                            project.team.map((person, i) => (
                                <React.Fragment key={person.name}>
                                    {i > 0 && ' and '}
                                    <a className="tile-person text-link" href={person.url} target="_blank" rel="noreferrer">
                                        @{person.name}
                                    </a>
                                </React.Fragment>
                            ))}
                    </p>
                    <p className="tile-links">
                        {project.links.map((link) => (
                            <a
                                key={link.label}
                                className="tile-link text-link"
                                href={link.url}
                                target="_blank"
                                rel="noreferrer"
                                title={link.title}
                                aria-label={`${project.title} ${link.title || link.label}`}
                            >
                                {link.label}
                            </a>
                        ))}
                    </p>
                </div>
            </div>
            {/* The name opens the project: its site, or for the paper its
                own page. */}
            <h3 className="tile-name">
                {project.titleUrl ? (
                    <a href={project.titleUrl}>{name}</a>
                ) : (
                    <a href={project.links[0].url} target="_blank" rel="noreferrer">
                        {name}
                    </a>
                )}
            </h3>
        </li>
    );
};

const Projects = () => {
    const [tab, setTab] = useState('all');
    // The one project whose line and links were opened by a tap.
    const [openId, setOpenId] = useState(null);

    const listed = ordered.filter((p) => tab === 'all' || p.groups.includes(tab));
    const listedBest = listed.filter((p) => p.best);
    const sizeOf = (p) => (!p.best ? 'small' : listedBest.indexOf(p) < 2 ? 'large' : 'medium');

    return (
        <section className="projects" id="projects">
            <div className="container">
                <div className="projects-head">
                    <h2 className="section-title">Projects<span className="title-period">.</span></h2>
                    <div className="sorter" role="group" aria-label="Show one kind of project">
                        {TABS.map((name) => (
                            <button
                                key={name}
                                type="button"
                                className="sorter-tab"
                                aria-pressed={name === tab}
                                onClick={() => {
                                    setTab(name);
                                    setOpenId(null);
                                }}
                            >
                                {name}
                            </button>
                        ))}
                    </div>
                </div>

                <ul className="tiles">
                    {listed.map((p) => (
                        <Tile
                            key={p.id}
                            project={p}
                            size={sizeOf(p)}
                            open={p.id === openId}
                            onToggle={() => setOpenId(p.id === openId ? null : p.id)}
                        />
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default Projects;
