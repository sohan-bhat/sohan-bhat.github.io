import React, { useEffect, useRef, useState } from 'react';
import ProjectCard from './ProjectCard';
import '../styles/Projects.css';

// `date` is when each project started. `image` names the card-<image>-560 and
// -1120 screenshots in public/imgs, cropped to 16:10.
const projects = [
    {
        id: 'taro',
        title: 'Taro',
        date: '2026-08-29',
        line: 'A voice assistant for Google Meet. Say “Hey Taro” and it posts to Slack, files GitHub issues, or adds to a to-do list.',
        stack: ['TypeScript', 'Next.js', 'Gemini'],
        links: [
            { label: 'Demo', url: 'https://trytaro.vercel.app/demo' },
            { label: 'Code', url: 'https://github.com/sohan-bhat/Taro' },
        ],
        image: 'taro',
        alt: 'Taro’s activation page: “Say it in the meeting. Done before you hang up.”',
    },
    {
        id: 'signnet',
        title: 'SignNet',
        date: '2026-06-12',
        line: 'Sorts German traffic signs with 90% accuracy. Built from scratch in NumPy: no PyTorch, no autograd.',
        stack: ['Python', 'NumPy', 'React'],
        links: [
            { label: 'Live', url: 'https://signnet-cnn.netlify.app' },
            { label: 'Code', url: 'https://github.com/sohan-bhat/signnet' },
        ],
        image: 'signnet',
        alt: 'SignNet’s demo page, “Traffic sign classification, built from scratch,” with its test accuracy.',
    },
    {
        id: 'ensemble',
        title: 'Ensemble',
        date: '2026-02-08',
        line: 'An r/place for music: one orchestral score the whole world writes, note by note.',
        stack: ['React', 'Express', 'VexFlow'],
        links: [
            { label: 'Live', url: 'https://ensemble-qnd2.onrender.com' },
            { label: 'Code', url: 'https://github.com/sohan-bhat/ensemble' },
        ],
        image: 'ensemble',
        alt: 'Ensemble’s shared score for violins, viola, cello, and bass.',
    },
    {
        id: 'vacantcourt',
        title: 'VacantCourt',
        date: '2025-03-17',
        line: 'A phone at the court spots players with an on-device model, and the website shows which courts are free.',
        stack: ['Kotlin', 'TensorFlow Lite', 'React'],
        links: [
            { label: 'Live', url: 'https://vacantcourt.netlify.app' },
            { label: 'Code', url: 'https://github.com/sohan-bhat/VacantCourt', title: 'Website code' },
            { label: 'App', url: 'https://github.com/sohan-bhat/VacantCourtApp', title: 'Android app code' },
        ],
        image: 'vacantcourt',
        alt: 'VacantCourt’s home page above a camera feed that boxes each player on the court.',
    },
    {
        id: 'mochi',
        title: 'Mochi',
        date: '2024-07-25',
        line: 'Recipes from just the ingredients you already have.',
        stack: ['React', 'Node.js', 'Groq'],
        links: [
            { label: 'Live', url: 'https://trymochi.netlify.app' },
            { label: 'Code', url: 'https://github.com/sohan-bhat/Mochi' },
        ],
        image: 'mochi',
        alt: 'Mochi’s home page: “Turn what you have into what you’ll cook tonight.”',
    },
    {
        id: 'career-ai',
        title: 'Career AI',
        date: '2024-06-21',
        retired: true,
        line: 'Career ideas from your interests, suggested by AI.',
        stack: ['React', 'Node.js', 'Groq'],
        links: [
            { label: 'Live', url: 'https://careerai.netlify.app' },
            { label: 'Code', url: 'https://github.com/sohan-bhat/CareerAI' },
        ],
        image: 'careerai',
        alt: 'Career AI suggesting careers from a list of interests.',
    },
];

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
