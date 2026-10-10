import React, { useEffect, useRef, useState } from 'react';
import ProjectCard from './ProjectCard';
import projects from '../data/projects';
import '../styles/Projects.css';


const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// Newest first, in runs of one year each.
const groupByYear = (list) => {
    const sorted = [...list].sort((a, b) => b.date.localeCompare(a.date));
    const groups = [];
    sorted.forEach((project) => {
        const year = project.date.slice(0, 4);
        const last = groups[groups.length - 1];
        if (last && last[0] === year) last[1].push(project);
        else groups.push([year, [project]]);
    });
    return groups;
};

const yearGroups = groupByYear(projects);

const prefersLessMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// The projects as a sideways timeline: one card per project, newest first,
// under a line with each project's month. The year sticks to the left edge
// until the next year pushes it out. It stays one height however many
// projects there are; the arrows move a screenful at a time.
const Projects = () => {
    const track = useRef(null);
    const [ends, setEnds] = useState({ start: true, end: false });

    // Whether the track is at either end, which turns the arrows off. Checked
    // on every scroll and whenever the track or its contents change size (Safari
    // can run the first check before the cards are laid out).
    useEffect(() => {
        const element = track.current;
        const update = () => {
            const max = element.scrollWidth - element.clientWidth;
            const start = element.scrollLeft <= 1;
            const end = element.scrollLeft >= max - 1;
            setEnds((previous) => (previous.start === start && previous.end === end ? previous : { start, end }));
        };
        update();
        element.addEventListener('scroll', update, { passive: true });
        const observer = new ResizeObserver(update);
        observer.observe(element);
        [...element.children].forEach((group) => observer.observe(group));
        return () => {
            element.removeEventListener('scroll', update);
            observer.disconnect();
        };
    }, []);

    // Moves a screenful of cards, landing exactly where a card rests, so the
    // snapping never pulls it back.
    const move = (direction) => {
        const element = track.current;
        const slots = [...element.querySelectorAll('.project-slot')];
        const stops = slots.map((slot) => slot.offsetLeft - slots[0].offsetLeft);
        const max = element.scrollWidth - element.clientWidth;
        let current = 0;
        stops.forEach((stop, i) => {
            if (Math.abs(stop - element.scrollLeft) < Math.abs(stops[current] - element.scrollLeft)) current = i;
        });
        const step = stops.length > 1 ? stops[1] : element.clientWidth;
        const perScreen = Math.max(1, Math.floor((element.clientWidth - slots[0].offsetLeft) / step));
        const target = Math.min(stops.length - 1, Math.max(0, current + direction * perScreen));
        element.scrollTo({ left: Math.min(max, stops[target]), behavior: prefersLessMotion() ? 'auto' : 'smooth' });
    };

    return (
        <section className="projects" id="projects">
            <div className="container projects-head">
                <h2 className="section-title">Projects<span className="title-period">.</span></h2>
                <div className="projects-arrows">
                    <button type="button" className="arrow" onClick={() => move(-1)} disabled={ends.start} aria-label="Newer projects">
                        ←
                    </button>
                    <button type="button" className="arrow" onClick={() => move(1)} disabled={ends.end} aria-label="Older projects">
                        →
                    </button>
                </div>
            </div>

            <div className="track-frame">
                <div className="project-track" ref={track} role="region" aria-label="Projects, newest first" tabIndex={0}>
                    {yearGroups.map(([year, items]) => (
                        <div className="year-group" key={year}>
                            <div className="year-row">
                                <h3 className="year-label">{year}</h3>
                            </div>
                            <div className="year-projects">
                                {items.map((project) => (
                                    <div className="project-slot" key={project.id}>
                                        <p className="project-month">
                                            <time dateTime={project.date}>{MONTHS[Number(project.date.slice(5, 7)) - 1]}</time>
                                        </p>
                                        <ProjectCard project={project} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
