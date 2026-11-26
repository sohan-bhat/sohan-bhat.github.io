import React, { useState } from 'react';
import Toolbar from '../components/Toolbar';
import Footer from '../components/Footer';
import { picture, ProjectLine } from '../components/ProjectParts';
import projects from '../data/projects';
import '../styles/Cards.css';
import '../styles/Pages.css';

// The Projects page: every project on a timeline, newest first, each year
// down a line on the left with its projects beside it. A project is its
// picture, its name, its one line and its links. The sorter beside the
// heading lists one kind of project at a time.
const sorted = [...projects].sort((a, b) => b.date.localeCompare(a.date));

// A group with no project in it gets no tab.
const TABS = ['all', ...['tools', 'ml', 'apps', 'hardware'].filter((group) => sorted.some((p) => p.groups.includes(group)))];

const ProjectsPage = () => {
    const [tab, setTab] = useState('all');
    const listed = sorted.filter((p) => tab === 'all' || p.groups.includes(tab));
    const years = [...new Set(listed.map((p) => p.date.slice(0, 4)))];

    return (
        <>
            <Toolbar current="projects" />
            <main className="page">
                <div className="container">
                    <div className="page-head">
                        <h1 className="section-title">Projects</h1>
                        <div className="sorter" role="group" aria-label="Show one kind of project">
                            {TABS.map((name) => (
                                <button key={name} type="button" className="sorter-tab" aria-pressed={name === tab} onClick={() => setTab(name)}>
                                    {name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* A timeline: each year down a line on the left, with its
                        projects beside it, newest first. */}
                    <ol className="timeline">
                        {years.map((year) => (
                            <li className="year" key={year}>
                                <h2 className="year-label">{year}</h2>
                                <ul className="tiles">
                                    {listed
                                        .filter((p) => p.date.startsWith(year))
                                        .map((p) => {
                                            const first = p === listed[0];
                                            const image = picture(p, '(max-width: 600px) 38vw, (max-width: 960px) 40vw, 268px');
                                            return (
                                                <li className="tile" key={p.id}>
                                                    <img
                                                        className="tile-shot"
                                                        src={image.src}
                                                        srcSet={image.srcSet}
                                                        sizes={image.sizes}
                                                        width="560"
                                                        height="350"
                                                        alt={image.alt}
                                                        loading={first ? 'eager' : 'lazy'}
                                                        fetchPriority={first ? 'high' : undefined}
                                                        decoding="async"
                                                    />
                                                    <div className="tile-body">
                                                        <h3 className="tile-title">{p.title}</h3>
                                                        <ProjectLine project={p} className="show-line" />
                                                        <p className="tile-links">
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
                                                            {p.retired && <span className="tile-note">Retired</span>}
                                                        </p>
                                                    </div>
                                                </li>
                                            );
                                        })}
                                </ul>
                            </li>
                        ))}
                    </ol>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default ProjectsPage;
