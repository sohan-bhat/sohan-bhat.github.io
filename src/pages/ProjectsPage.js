import React, { useState } from 'react';
import Toolbar from '../components/Toolbar';
import Footer from '../components/Footer';
import { picture, started, ProjectLine } from '../components/ProjectParts';
import projects from '../data/projects';
import '../styles/Cards.css';
import '../styles/Pages.css';

// The Projects page: every project in one compact grid, newest first, so the
// whole list is a short scroll. Each is its picture, its name with its links
// right after it, its one line, and what kind of thing it is, what it is
// built with and when it started. The sorter beside the heading lists one
// kind of project at a time.
const sorted = [...projects].sort((a, b) => b.date.localeCompare(a.date));

// A group with no project in it gets no tab.
const TABS = ['all', ...['tools', 'ml', 'apps', 'hardware'].filter((group) => sorted.some((p) => p.groups.includes(group)))];

const ProjectsPage = () => {
    const [tab, setTab] = useState('all');
    const listed = sorted.filter((p) => tab === 'all' || p.groups.includes(tab));

    return (
        <>
            <Toolbar current="projects" />
            <main className="page">
                <div className="container">
                    <div className="page-head">
                        <h1 className="section-title">Projects<span className="title-period">.</span></h1>
                        <div className="sorter" role="group" aria-label="Show one kind of project">
                            {TABS.map((name) => (
                                <button key={name} type="button" className="sorter-tab" aria-pressed={name === tab} onClick={() => setTab(name)}>
                                    {name}
                                </button>
                            ))}
                        </div>
                    </div>

                    <ul className="tiles">
                        {listed.map((p, i) => {
                            const image = picture(p, '(max-width: 600px) 38vw, (max-width: 960px) 46vw, 300px');
                            return (
                                <li className="tile" key={p.id}>
                                    {/* The first row of pictures is what the page loads first. */}
                                    <img
                                        className="tile-shot"
                                        src={image.src}
                                        srcSet={image.srcSet}
                                        sizes={image.sizes}
                                        width="560"
                                        height="350"
                                        alt={image.alt}
                                        loading={i < 3 ? 'eager' : 'lazy'}
                                        fetchPriority={i === 0 ? 'high' : undefined}
                                        decoding="async"
                                    />
                                    <div className="tile-body">
                                        {/* No space between the name and its first link, so the
                                            two stay on one line; the links after it may wrap. */}
                                        <div className="tile-head">
                                            <h2 className="tile-title">{p.title}</h2>
                                            {p.links.map((link, n) => (
                                                <React.Fragment key={link.label}>
                                                    {n > 0 && ' '}
                                                    <a
                                                        className="tile-link text-link"
                                                        href={link.url}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        title={link.title}
                                                        aria-label={`${p.title} ${link.title || link.label}`}
                                                    >
                                                        {link.label}
                                                    </a>
                                                </React.Fragment>
                                            ))}
                                        </div>
                                        <ProjectLine project={p} className="show-line" />
                                        <p className="show-facts">
                                            <span>{p.kind}</span>
                                            <span>{p.stack.join(', ')}</span>
                                            <time dateTime={p.date}>{started(p)}</time>
                                            {p.retired && <span>Retired</span>}
                                        </p>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default ProjectsPage;
