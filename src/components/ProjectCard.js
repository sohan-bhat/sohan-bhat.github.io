import React from 'react';
import '../styles/ProjectCard.css';

// One project, laid out like an index card: the title and its links across
// the top, a rule, the screenshot, one sentence, and what it's built with.
const ProjectCard = ({ project }) => (
    <article className="project-card">
        <header className="card-head">
            <h4 className="card-title">
                {project.title}
                {project.retired && <span className="card-tag">retired</span>}
            </h4>
            <div className="card-links">
                {project.links.map((link) => (
                    <a
                        key={link.label}
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                        className="card-link"
                        title={link.title}
                        aria-label={`${project.title} ${link.title || link.label}`}
                    >
                        {link.label} ↗
                    </a>
                ))}
            </div>
        </header>

        <img
            className="card-image"
            src={`/imgs/card-${project.image}-560.webp`}
            srcSet={`/imgs/card-${project.image}-560.webp 560w, /imgs/card-${project.image}-1120.webp 1120w`}
            sizes="(max-width: 640px) 84vw, 340px"
            width="560"
            height="350"
            alt={project.alt}
            loading="lazy"
        />

        <div className="card-text">
            <p className="card-line">{project.line}</p>
            <p className="card-stack">{project.stack.join(', ')}</p>
        </div>
    </article>
);

export default React.memo(ProjectCard);
