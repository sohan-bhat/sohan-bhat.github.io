import React, { useEffect, useState } from 'react';
import Card from './Card';
import { split, picture, ProjectLine, ProjectLinks } from './ProjectParts';
import projects from '../data/projects';
import '../styles/Projects.css';

// Projects on the home page, in two tiers. The best are large cards, all one
// size, showing a picture and a name; the line and links slide up when a card
// is pointed at or tapped. The earlier ones are a row of links, each to its
// site. The heading opens the Projects page, which shows every one in full.
const { best, earlier } = split(projects);

const Projects = () => {
    // The one card whose line and links were opened by a tap or a click.
    const [openId, setOpenId] = useState(null);

    // A tap or click anywhere else closes it.
    useEffect(() => {
        if (!openId) return undefined;
        const close = (event) => {
            if (!event.target.closest('.card.is-open')) setOpenId(null);
        };
        document.addEventListener('pointerdown', close);
        return () => document.removeEventListener('pointerdown', close);
    }, [openId]);

    return (
        <section className="projects" id="projects">
            <div className="container">
                <h2 className="section-title">
                    <a href="/projects/">Projects</a>
                    <span className="title-period">.</span>
                </h2>

                <ul className="cards project-cards">
                    {best.map((p) => (
                        <Card
                            key={p.id}
                            id={p.id}
                            image={picture(p, '(max-width: 600px) calc(100vw - 3rem), (max-width: 1248px) 48vw, 564px')}
                            title={p.title}
                            about={
                                <>
                                    <ProjectLine project={p} className="card-line" />
                                    <ProjectLinks project={p} />
                                </>
                            }
                            open={p.id === openId}
                            onToggle={() => setOpenId(p.id === openId ? null : p.id)}
                            onClose={() => setOpenId(null)}
                        />
                    ))}
                </ul>

                <h3 className="earlier-label">Earlier</h3>
                <p className="earlier-links">
                    {earlier.map((p) => (
                        <a key={p.id} className="text-link" href={p.links[0].url} target="_blank" rel="noreferrer">
                            {p.title}
                        </a>
                    ))}
                </p>
            </div>
        </section>
    );
};

export default Projects;
