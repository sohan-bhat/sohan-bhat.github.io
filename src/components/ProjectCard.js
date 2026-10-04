import React from 'react';
import '../styles/ProjectCard.css';

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// "2026-08-29" -> "August 2026"
const monthYear = (date) => {
    const [year, month] = date.split('-');
    return `${MONTHS[Number(month) - 1]} ${year}`;
};

// Keeps each "·" on the line before it, so a wrapped list never starts with one.
const keepDots = (text) => text.replace(/ · /g, '\u00a0· ');

// One project, laid out like an index card: the title, type, and date across
// the top, a rule, then the screenshot beside a sentence, facts, and links.
const ProjectCard = ({ project }) => (
    <article className="project-card">
        <header className="card-head">
            <div>
                <h4 className="card-title">{project.title}</h4>
                <p className="card-meta">{project.type}</p>
            </div>
            <time className="card-date" dateTime={project.date}>
                {monthYear(project.date)}
            </time>
        </header>

        <div className="card-body">
            <img
                className="card-image"
                src={`/imgs/card-${project.image}-560.webp`}
                srcSet={`/imgs/card-${project.image}-560.webp 560w, /imgs/card-${project.image}-1120.webp 1120w`}
                sizes="(max-width: 640px) 100vw, 300px"
                width="560"
                height="350"
                alt={project.alt}
                loading="lazy"
            />
            <div className="card-text">
                <p className="card-line">{project.line}</p>
                <dl className="card-facts">
                    {project.facts.map(([label, value]) => (
                        <div key={label}>
                            <dt>{label}</dt>
                            <dd>{keepDots(value)}</dd>
                        </div>
                    ))}
                </dl>
                <div className="card-links">
                    {project.links.map((link) => (
                        <a key={link.label} href={link.url} target="_blank" rel="noreferrer" className="card-link">
                            {link.label} ↗
                        </a>
                    ))}
                </div>
            </div>
        </div>
    </article>
);

export default React.memo(ProjectCard);
