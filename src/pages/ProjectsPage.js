import React from 'react';
import Toolbar from '../components/Toolbar';
import Footer from '../components/Footer';
import { split, picture, started, ProjectLine, ProjectLinks } from '../components/ProjectParts';
import projects from '../data/projects';
import '../styles/Cards.css';
import '../styles/Pages.css';

// The Projects page: every project in full, the best first and then the
// rest, newest first. Each is its picture, its name, its one line, what kind
// of thing it is, what it is built with and when it started, and its links.
const { best, earlier } = split(projects);

const ProjectsPage = () => (
    <>
        <Toolbar current="projects" />
        <main className="page">
            <div className="container">
                <h1 className="section-title">Projects<span className="title-period">.</span></h1>
                <ul className="shows">
                    {[...best, ...earlier].map((p, i) => {
                        // The first picture is what the page loads first.
                        const first = i === 0;
                        const image = picture(p, '(max-width: 760px) calc(100vw - 3rem), (max-width: 1248px) 44vw, 520px');
                        return (
                            <li className="show" key={p.id}>
                                <img
                                    className="show-shot"
                                    src={image.src}
                                    srcSet={image.srcSet}
                                    sizes={image.sizes}
                                    width="560"
                                    height="350"
                                    alt={image.alt}
                                    loading={first ? 'eager' : 'lazy'}
                                    fetchPriority={first ? 'high' : undefined}
                                    decoding="async"
                                />
                                <div className="show-body">
                                    <h2 className="show-title">
                                        {p.title}
                                        {p.retired && <span className="show-note">Retired</span>}
                                    </h2>
                                    <ProjectLine project={p} className="show-line" />
                                    <p className="show-facts">
                                        <span>{p.kind}</span>
                                        <span>{p.stack.join(', ')}</span>
                                        <time dateTime={p.date}>{started(p)}</time>
                                    </p>
                                    <ProjectLinks project={p} />
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </main>
        <Footer />
    </>
);

export default ProjectsPage;
