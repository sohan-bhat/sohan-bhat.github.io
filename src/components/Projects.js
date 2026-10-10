import React, { useRef, useState } from 'react';
import ProjectCard from './ProjectCard';
import projects from '../data/projects';
import '../styles/Projects.css';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// Newest first, in folders by year.
const sorted = [...projects].sort((a, b) => b.date.localeCompare(a.date));
const years = [...new Set(sorted.map((p) => p.date.slice(0, 4)))];
const monthOf = (p) => MONTHS[Number(p.date.slice(5, 7)) - 1];
const shortDate = (p) => `${monthOf(p)} ${p.date.slice(0, 4)}`;

// The projects in an old-school file window: a list of year folders that open
// and close, each project a row with its kind and date, and the selected
// project shown on the right. Arrow keys move through the open rows.
const Projects = () => {
    const [closed, setClosed] = useState([]);
    const [openId, setOpenId] = useState(sorted[0].id);
    const rows = useRef({});
    const open = sorted.find((p) => p.id === openId);
    const visible = sorted.filter((p) => !closed.includes(p.date.slice(0, 4)));

    const toggle = (year) => setClosed((c) => (c.includes(year) ? c.filter((y) => y !== year) : [...c, year]));

    const onKeyDown = (event) => {
        if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;
        const i = visible.findIndex((p) => p.id === openId);
        const next = visible[i + (event.key === 'ArrowDown' ? 1 : -1)];
        if (!next) return;
        event.preventDefault();
        setOpenId(next.id);
        rows.current[next.id].focus();
    };

    return (
        <section className="projects" id="projects">
            <div className="container">
                <h2 className="section-title">Projects<span className="title-period">.</span></h2>

                <div className="finder">
                    <div className="finder-bar">
                        <span className="finder-close" aria-hidden="true" />
                        <p className="finder-title">Projects</p>
                    </div>

                    <div className="finder-body">
                        <div className="finder-list" onKeyDown={onKeyDown}>
                            <div className="finder-head" aria-hidden="true">
                                <span>Name</span>
                                <span>Kind</span>
                                <span>Date</span>
                            </div>
                            <ul>
                                {years.map((year) => {
                                    const isOpen = !closed.includes(year);
                                    const items = sorted.filter((p) => p.date.startsWith(year));
                                    return (
                                        <li key={year}>
                                            <button type="button" className="finder-folder" aria-expanded={isOpen} onClick={() => toggle(year)}>
                                                <span className="finder-arrow" aria-hidden="true">
                                                    {isOpen ? '▾' : '▸'}
                                                </span>
                                                <span className="finder-icon finder-icon-folder" aria-hidden="true" />
                                                {year}
                                                <span className="finder-count">{items.length}</span>
                                            </button>
                                            {isOpen && (
                                                <ul>
                                                    {items.map((p) => (
                                                        <li key={p.id}>
                                                            <button
                                                                type="button"
                                                                className="finder-file"
                                                                aria-pressed={p.id === openId}
                                                                ref={(el) => {
                                                                    rows.current[p.id] = el;
                                                                }}
                                                                onClick={() => setOpenId(p.id)}
                                                            >
                                                                <span className="finder-name">
                                                                    <span className="finder-icon finder-icon-file" aria-hidden="true" />
                                                                    {p.title}
                                                                </span>
                                                                <span className="finder-kind">{p.kind}</span>
                                                                <span className="finder-date">{shortDate(p)}</span>
                                                            </button>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>

                        <div className="finder-preview" aria-live="polite">
                            <ProjectCard key={open.id} project={{ ...open, when: shortDate(open) }} />
                        </div>
                    </div>

                    <p className="finder-status">
                        {sorted.length} items, {years.length} folders
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Projects;
