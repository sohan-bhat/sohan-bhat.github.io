import React, { useState } from 'react';
import ProjectCard from './ProjectCard';
import projects from '../data/projects';
import '../styles/Projects.css';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// Newest first, in folders by year.
const sorted = [...projects].sort((a, b) => b.date.localeCompare(a.date));
const years = [...new Set(sorted.map((p) => p.date.slice(0, 4)))];
const monthOf = (p) => MONTHS[Number(p.date.slice(5, 7)) - 1];

const Folder = () => (
    <svg className="icon-folder" viewBox="0 0 20 16" aria-hidden="true">
        <path d="M1 3a2 2 0 0 1 2-2h4.2l2 2H17a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2z" />
    </svg>
);

const File = () => (
    <svg className="icon-file" viewBox="0 0 14 16" aria-hidden="true">
        <path d="M2 1h6.5L12 4.5V14a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z" />
        <path d="M8.5 1v3.5H12" />
    </svg>
);

// The projects in a window like a laptop's file browser: year folders on the
// left, that year's projects in the middle, and the open project on the right.
const Projects = () => {
    const [year, setYear] = useState(years[0]);
    const [openId, setOpenId] = useState(sorted[0].id);
    const files = sorted.filter((p) => p.date.startsWith(year));
    const open = sorted.find((p) => p.id === openId);

    const chooseYear = (y) => {
        setYear(y);
        setOpenId(sorted.find((p) => p.date.startsWith(y)).id);
    };

    return (
        <section className="projects" id="projects">
            <div className="container">
                <h2 className="section-title">Projects<span className="title-period">.</span></h2>

                <div className="finder">
                    <div className="finder-bar">
                        <span className="finder-lights" aria-hidden="true">
                            <i />
                            <i />
                            <i />
                        </span>
                        <p className="finder-path">
                            projects / {year} / <strong>{open.title}</strong>
                        </p>
                        <span className="finder-count">{sorted.length} items</span>
                    </div>

                    <div className="finder-body">
                        <ul className="finder-years" aria-label="Years">
                            {years.map((y) => (
                                <li key={y}>
                                    <button type="button" aria-pressed={y === year} onClick={() => chooseYear(y)}>
                                        <Folder />
                                        <span>{y}</span>
                                        <span className="finder-n">{sorted.filter((p) => p.date.startsWith(y)).length}</span>
                                    </button>
                                </li>
                            ))}
                        </ul>

                        <ul className="finder-files" aria-label={`Projects from ${year}`}>
                            {files.map((p) => (
                                <li key={p.id}>
                                    <button type="button" aria-pressed={p.id === openId} onClick={() => setOpenId(p.id)}>
                                        <File />
                                        <span className="finder-name">{p.title}</span>
                                        <span className="finder-date">{monthOf(p)}</span>
                                    </button>
                                </li>
                            ))}
                        </ul>

                        <div className="finder-preview" aria-live="polite">
                            <ProjectCard key={open.id} project={{ ...open, when: `${monthOf(open)} ${open.date.slice(0, 4)}` }} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Projects;
