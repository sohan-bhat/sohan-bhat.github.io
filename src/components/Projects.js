import React, { useRef, useState } from 'react';
import ProjectCard from './ProjectCard';
import projects from '../data/projects';
import '../styles/Projects.css';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// Newest first, drawn as a git graph. Projects marked `main` are commits on
// the main branch, a bright line down the left. Every other project sits on
// a side branch beside it, which forks from main and merges back in.
const sorted = [...projects].sort((a, b) => b.date.localeCompare(a.date));
const shortDate = (p) => `${MONTHS[Number(p.date.slice(5, 7)) - 1]} ${p.date.slice(0, 4)}`;

const last = sorted.length - 1;
const firstMain = sorted.findIndex((p) => p.main);
const lastMain = sorted.reduce((found, p, i) => (p.main ? i : found), -1);
const head = sorted[firstMain] || sorted[0];

// What to draw beside each row. Main runs from its newest commit to its
// oldest. A run of side projects joins main with a curve at each end where
// there is a main commit to join.
const rows = sorted.map((project, i) => {
    const main = Boolean(project.main);
    const hasMain = firstMain !== -1;
    const sideAbove = !main && i > 0 && !sorted[i - 1].main;
    const sideBelow = !main && i < last && !sorted[i + 1].main;
    return {
        project,
        main,
        mainAbove: hasMain && ((i > firstMain && i <= lastMain) || (i === firstMain && i > 0)),
        mainBelow: hasMain && ((i >= firstMain && i < lastMain) || (i === lastMain && i < last)),
        // Under the newest side run, main starts at the foot of the row.
        mainTail: hasMain && i === firstMain - 1,
        sideAbove,
        sideBelow,
        merge: !main && !sideAbove && hasMain && i > firstMain,
        fork: !main && !sideBelow && hasMain && i < lastMain,
    };
});

// The lines are spans so they can run on past the row, down the side of a
// card opened under it on a phone. The dot and the curves are drawn in a
// box the size of the row. The numbers match --row and the lanes in
// Projects.css: rows 34 tall, main at x 14, the side branch at x 30.5.
const Graph = ({ row }) => (
    <span className="graph" aria-hidden="true">
        {row.mainAbove && <span className="graph-line graph-main graph-above" />}
        {row.mainBelow && <span className="graph-line graph-main graph-below" />}
        {row.mainTail && <span className="graph-line graph-main graph-tail" />}
        {row.sideAbove && <span className="graph-line graph-side graph-above" />}
        {row.sideBelow && <span className="graph-line graph-side graph-below" />}
        <svg className="graph-marks" viewBox="0 0 44 34" width="44" height="34">
            {row.merge && <path className="graph-curve" d="M30.5 13.5C30.5 6 14 8 14 0" />}
            {row.fork && <path className="graph-curve" d="M30.5 20.5C30.5 28 14 26 14 34" />}
            {row.main ? (
                <circle className="graph-commit" cx="14" cy="17" r="4.5" />
            ) : (
                <circle className="graph-commit graph-commit-side" cx="30.5" cy="17" r="3.5" />
            )}
        </svg>
    </span>
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
    // The newest project on main is open to begin with.
    const [openId, setOpenId] = useState(head.id);
    const buttons = useRef({});
    const open = sorted.find((p) => p.id === openId);

    // Tapping the open row on a narrow screen folds it back up; on wider
    // screens the preview pane always shows something.
    const select = (id) => setOpenId(id === openId && window.matchMedia(NARROW).matches ? null : id);

    const onKeyDown = (event) => {
        if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;
        const i = sorted.findIndex((p) => p.id === openId);
        const next = sorted[i + (event.key === 'ArrowDown' ? 1 : -1)];
        if (!next) return;
        event.preventDefault();
        setOpenId(next.id);
        buttons.current[next.id].focus();
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
                                {rows.map((row) => {
                                    const p = row.project;
                                    return (
                                        <li key={p.id} className={`finder-row${p.id === openId ? ' is-open' : ''}`}>
                                            <Graph row={row} />
                                            <button
                                                type="button"
                                                className={`finder-file${row.main ? ' is-main' : ''}`}
                                                aria-expanded={p.id === openId}
                                                aria-controls={`project-${p.id} finder-preview`}
                                                ref={(el) => {
                                                    buttons.current[p.id] = el;
                                                }}
                                                onClick={() => select(p.id)}
                                            >
                                                <span className="finder-name">
                                                    {p.icon ? (
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
                                                    {p === head && row.main && <span className="finder-branch">main</span>}
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
