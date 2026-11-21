import React, { useRef, useState } from 'react';
import ProjectCard from './ProjectCard';
import projects from '../data/projects';
import '../styles/Projects.css';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// Newest first, in folders by year. The paper and the best projects sit in
// the same list as the rest and stand out by size alone: a taller row with a
// small picture where the others have a logo.
const sorted = [...projects].sort((a, b) => b.date.localeCompare(a.date));
const yearOf = (p) => p.date.slice(0, 4);

// The sorter in the title bar. It reads as the end of the window's path, so
// ~/sohan/projects/ then tools shows only the tools. A group with no project
// in it gets no tab.
const TABS = ['all', ...['tools', 'ml', 'apps', 'hardware'].filter((group) => sorted.some((p) => p.groups.includes(group)))];
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

// A page with a folded corner and a few lines of text, for a project whose
// site has no logo of its own.
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
    const [tab, setTab] = useState('all');
    const [closed, setClosed] = useState([]);
    const [openId, setOpenId] = useState(sorted[0].id);
    const rows = useRef({});
    const listed = sorted.filter((p) => tab === 'all' || p.groups.includes(tab));
    const years = [...new Set(listed.map(yearOf))];
    const open = listed.find((p) => p.id === openId);
    const visible = listed.filter((p) => !closed.includes(yearOf(p)));

    // Switching tabs keeps the open project if it is still listed, and
    // otherwise opens the newest one that is.
    const sort = (next) => {
        setTab(next);
        const left = sorted.filter((p) => next === 'all' || p.groups.includes(next));
        if (openId && !left.some((p) => p.id === openId)) setOpenId(left[0].id);
    };

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
                        <p className="finder-title">~/sohan/projects/</p>
                        <div className="finder-tabs" role="group" aria-label="Show one kind of project">
                            {TABS.map((name) => (
                                <button key={name} type="button" className="finder-tab" aria-pressed={name === tab} onClick={() => sort(name)}>
                                    {name}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="finder-body">
                        <div className="finder-list" onKeyDown={onKeyDown}>
                            <ul>
                                {years.map((year) => {
                                    const isOpen = !closed.includes(year);
                                    const items = listed.filter((p) => yearOf(p) === year);
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
                                                                className={`finder-file${p.best ? ' is-best' : ''}`}
                                                                aria-expanded={p.id === openId}
                                                                aria-controls={`project-${p.id} finder-preview`}
                                                                ref={(el) => {
                                                                    rows.current[p.id] = el;
                                                                }}
                                                                onClick={() => select(p.id)}
                                                            >
                                                                <span className="finder-name">
                                                                    {p.best ? (
                                                                        <img
                                                                            className="finder-thumb"
                                                                            src={`/imgs/card-${p.image}-560.webp`}
                                                                            alt=""
                                                                            width="72"
                                                                            height="45"
                                                                            loading="lazy"
                                                                            decoding="async"
                                                                        />
                                                                    ) : p.icon ? (
                                                                        <img
                                                                            className="finder-icon finder-logo"
                                                                            src={p.icon}
                                                                            alt=""
                                                                            width="16"
                                                                            height="16"
                                                                            loading="lazy"
                                                                            decoding="async"
                                                                        />
                                                                    ) : (
                                                                        <FileIcon />
                                                                    )}
                                                                    {p.title}
                                                                </span>
                                                                <span className="finder-kind">{p.kind}</span>
                                                                <span className="finder-date">{shortDate(p)}</span>
                                                            </button>
                                                            {/* Every card is in the page, so search engines
                                                                see each project. Only the open one shows. */}
                                                            <div className="finder-inline" id={`project-${p.id}`} hidden={p.id !== openId}>
                                                                <ProjectCard project={{ ...p, when: shortDate(p) }} />
                                                            </div>
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
                </div>
            </div>
        </section>
    );
};

export default Projects;
