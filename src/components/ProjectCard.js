import React from 'react';
import '../styles/ProjectCard.css';

// One project: the title and its links across the top, a screenshot of its
// site, one sentence, and what it's built with.
const ProjectCard = ({ project }) => (
    <article className="project-card">
        <header className="card-head">
            <h3 className="card-title">
                <span className="card-name">{project.title}</span>
                {project.retired && <span className="card-note">Retired</span>}
            </h3>
            <div className="card-links">
                {project.links.map((link) => (
                    <a
                        key={link.label}
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                        className="card-link text-link"
                        title={link.title}
                        aria-label={`${project.title} ${link.title || link.label}`}
                    >
                        {link.label}
                    </a>
                ))}
            </div>
        </header>

        <img
            className="card-image"
            src={`/imgs/card-${project.image}-560.webp`}
            srcSet={`/imgs/card-${project.image}-560.webp 560w, /imgs/card-${project.image}-1120.webp 1120w`}
            sizes="(max-width: 960px) calc(100vw - 4.5rem), 420px"
            width="560"
            height="350"
            alt={project.alt}
            loading="lazy"
        />

        <p className="card-line">{project.line}</p>
        <p className="card-foot">
            <span>{project.stack.join(', ')}</span>
            {project.when && <time dateTime={project.date}>{project.when}</time>}
        </p>
    </article>
);

export default React.memo(ProjectCard);
