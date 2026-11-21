import React from 'react';
import Card, { useOpenCard } from './Card';
import { split, picture, ProjectLine, ProjectLinks } from './ProjectParts';
import projects from '../data/projects';
import '../styles/Projects.css';

// Projects on the home page: the best ones as large tiles, all one size,
// showing a picture and a name; the line and links slide up when a tile is
// pointed at or tapped. The View all link beside the heading, and the
// heading itself, open the Projects page, which has every project.
const { best } = split(projects);

const Projects = () => {
    const { openId, toggle, close } = useOpenCard();

    return (
        <section className="projects" id="projects">
            <div className="container">
                <div className="section-head">
                    <h2 className="section-title">
                        <a href="/projects/">Projects</a>
                        <span className="title-period">.</span>
                    </h2>
                    <a className="more text-link" href="/projects/" aria-label="View all projects">
                        View all
                    </a>
                </div>

                <ul className="cards project-cards">
                    {best.map((p) => (
                        <Card
                            key={p.id}
                            id={p.id}
                            image={picture(p, '(max-width: 600px) calc(100vw - 3rem), (max-width: 1000px) 48vw, 462px')}
                            title={p.title}
                            about={
                                <>
                                    <ProjectLine project={p} className="card-line" />
                                    <ProjectLinks project={p} />
                                </>
                            }
                            open={p.id === openId}
                            onToggle={() => toggle(p.id)}
                            onClose={close}
                        />
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default Projects;
