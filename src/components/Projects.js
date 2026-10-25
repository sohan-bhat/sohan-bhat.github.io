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

// A tabbed folder, open or closed.
const FolderIcon = ({ open }) => (
    <svg className="finder-icon" viewBox="0 0 16 13" aria-hidden="true">
        <path className="folder-back" d="M1 2.5A1 1 0 0 1 2 1.5h4l1.5 1.5H14a1 1 0 0 1 1 1V11a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1z" />
        {open && <rect className="folder-sheet" x="2.5" y="3.5" width="11" height="6" />}
        <path className="folder-front" d={open ? 'M1 7h14v4a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1z' : 'M1 5h14v6a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1z'} />
    </svg>
);

// A page with a folded corner and a few lines of text.
const FileIcon = () => (
    <svg className="finder-icon" viewBox="0 0 13 15" aria-hidden="true">
        <path className="file-page" d="M1.5 1h6.5l3.5 3.5V13a1 1 0 0 1-1 1h-9a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z" />
        <path className="file-fold" d="M8 1v3.5h3.5" />
        <path className="file-lines" d="M3.5 7.5h6M3.5 9.5h6M3.5 11.5h4" />
    </svg>
);

// On tablets and phones the window is one column, and the open project
// expands in place under its row instead of in a preview pane.
const NARROW = '(max-width: 960px)';

const Projects = () => {
    const [closed, setClosed] = useState([]);
    const [openId, setOpenId] = useState(sorted[0].id);
    const rows = useRef({});
    const open = sorted.find((p) => p.id === openId);
    const visible = sorted.filter((p) => !closed.includes(p.date.slice(0, 4)));

    const toggle = (year) => setClosed((c) => (c.includes(year) ? c.filter((y) => y !== year) : [...c, year]));

    // Tapping the open row on a narrow screen folds it back up; on wider
    // screens the preview pane always shows something.
    const select = (id) => setOpenId(id === openId && window.matchMedia(NARROW).matches ? null : id);

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
                        <p className="finder-title">~/sohan/projects</p>
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
                                                <FolderIcon open={isOpen} />
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
                                                                aria-expanded={p.id === openId}
                                                                aria-controls={`project-${p.id} finder-preview`}
                                                                ref={(el) => {
                                                                    rows.current[p.id] = el;
                                                                }}
                                                                onClick={() => select(p.id)}
                                                            >
                                                                <span className="finder-name">
                                                                    <FileIcon />
                                                                    {p.title}
                                                                </span>
                                                                <span className="finder-kind">{p.kind}</span>
                                                                <span className="finder-date">{shortDate(p)}</span>
                                                            </button>
                                                            {p.id === openId && (
                                                                <div className="finder-inline" id={`project-${p.id}`}>
                                                                    <ProjectCard project={{ ...p, when: shortDate(p) }} />
                                                                </div>
                                                            )}
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>

                        <div className="finder-preview" id="finder-preview" aria-live="polite">
                            {open ? (
                                <ProjectCard key={open.id} project={{ ...open, when: shortDate(open) }} />
                            ) : (
                                <p className="finder-empty">Pick a project to see it here.</p>
                            )}
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
