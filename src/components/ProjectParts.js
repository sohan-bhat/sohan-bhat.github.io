import React from 'react';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// The pieces of a project that the home page and the Projects page both
// show, so the two never drift apart.

// The best projects, in their set order, and the rest, newest first.
export const split = (projects) => ({
    best: projects.filter((p) => p.best).sort((a, b) => a.best - b.best),
    earlier: projects.filter((p) => !p.best).sort((a, b) => b.date.localeCompare(a.date)),
});

export const started = (p) => `${MONTHS[Number(p.date.slice(5, 7)) - 1]} ${p.date.slice(0, 4)}`;

export const picture = (p, sizes) => ({
    src: `/imgs/card-${p.image}-560.webp`,
    srcSet: `/imgs/card-${p.image}-560.webp 560w, /imgs/card-${p.image}-1120.webp 1120w`,
    sizes,
    alt: p.alt,
});

// The one line about a project, then who it was built with, each as @name.
export const ProjectLine = ({ project, className }) => (
    <p className={className}>
        {project.line}
        {project.team && ', with '}
        {project.team &&
            project.team.map((person, i) => (
                <React.Fragment key={person.name}>
                    {i > 0 && ' and '}
                    <a className="card-person text-link" href={person.url} target="_blank" rel="noreferrer">
                        @{person.name}
                    </a>
                </React.Fragment>
            ))}
    </p>
);

export const ProjectLinks = ({ project }) => (
    <p className="card-links">
        {project.links.map((link) => (
            <a
                key={link.label}
                className="text-link"
                href={link.url}
                target="_blank"
                rel="noreferrer"
                title={link.title}
                aria-label={`${project.title} ${link.title || link.label}`}
            >
                {link.label}
            </a>
        ))}
    </p>
);
