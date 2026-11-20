import React from 'react';
import projects from '../data/projects';
import '../styles/Projects.css';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// Newest first, in two tiers. The featured projects are shown large, each
// with a screenshot of its site. Every other project is one row in the index
// under them, with its year, month, kind and stack in columns, so a long list
// still reads at a glance.
const sorted = [...projects].sort((a, b) => b.date.localeCompare(a.date));
const featured = sorted.filter((p) => p.featured);
const rest = sorted.filter((p) => !p.featured);
const monthOf = (p) => MONTHS[Number(p.date.slice(5, 7)) - 1];
const yearOf = (p) => p.date.slice(0, 4);

const Links = ({ project }) => (
    <div className="project-links">
        {project.links.map((link) => (
            <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="project-link text-link"
                title={link.title}
                aria-label={`${project.title} ${link.title || link.label}`}
            >
                {link.label}
            </a>
        ))}
    </div>
);

// The one short line about a project, then who it was built with, if
// anyone, each as @name.
const Line = ({ project, className }) => (
    <p className={className}>
        {project.line}
        {project.team && ', with '}
        {project.team &&
            project.team.map((person, i) => (
                <React.Fragment key={person.name}>
                    {i > 0 && ' and '}
                    <a className="project-person text-link" href={person.url} target="_blank" rel="noreferrer">
                        @{person.name}
                    </a>
                </React.Fragment>
            ))}
    </p>
);

// A featured project. The screenshot opens the site too, for the mouse; the
// Site link beside the name is the one in the tab order.
const Feature = ({ project }) => (
    <li className="feature">
        <a className="feature-shot" href={project.links[0].url} target="_blank" rel="noreferrer" tabIndex={-1}>
            <img
                src={`/imgs/card-${project.image}-560.webp`}
                srcSet={`/imgs/card-${project.image}-560.webp 560w, /imgs/card-${project.image}-1120.webp 1120w`}
                sizes="(max-width: 700px) calc(100vw - 3rem), 362px"
                width="560"
                height="350"
                alt={project.alt}
                loading="lazy"
                decoding="async"
            />
        </a>
        <div className="feature-head">
            <h3 className="feature-title">{project.title}</h3>
            <Links project={project} />
        </div>
        <Line project={project} className="feature-line" />
        <p className="feature-meta">
            <span>{project.kind}</span>
            <span>{project.stack.join(', ')}</span>
            <time dateTime={project.date}>
                {monthOf(project)} {yearOf(project)}
            </time>
        </p>
    </li>
);

// One row of the index. The year shows once, beside the first project of
// that year; on narrow screens each row carries its own year instead.
const Entry = ({ project, startsYear }) => (
    <li className={`entry${startsYear ? ' entry-starts-year' : ''}`}>
        <span className="entry-year">{startsYear && yearOf(project)}</span>
        <time className="entry-date" dateTime={project.date}>
            {monthOf(project)}
            <span className="entry-date-year"> {yearOf(project)}</span>
        </time>
        {project.icon && (
            <img className="entry-logo" src={project.icon} alt="" width="18" height="18" loading="lazy" decoding="async" />
        )}
        <div className="entry-main">
            <h3 className="entry-title">
                {project.title}
                {project.retired && <span className="entry-note">Retired</span>}
            </h3>
            <Line project={project} className="entry-line" />
        </div>
        <p className="entry-facts">
            <span className="entry-kind">{project.kind}</span>
            <span className="entry-stack">{project.stack.join(', ')}</span>
        </p>
        <Links project={project} />
    </li>
);

const Projects = () => (
    <section className="projects" id="projects">
        <div className="container">
            <h2 className="section-title">Projects<span className="title-period">.</span></h2>

            <ul className="features">
                {featured.map((p) => (
                    <Feature key={p.id} project={p} />
                ))}
            </ul>

            <ul className="entries">
                {rest.map((p, i) => (
                    <Entry key={p.id} project={p} startsYear={i === 0 || yearOf(rest[i - 1]) !== yearOf(p)} />
                ))}
            </ul>
        </div>
    </section>
);

export default Projects;
