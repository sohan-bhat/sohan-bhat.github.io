import React from 'react';
import ProjectCard from './ProjectCard';
import '../styles/Projects.css';

// `date` is when each project started. `image` names the card-<image>-560 and
// -1120 screenshots in public/imgs, cropped to 16:10.
const projects = [
    {
        id: 'taro',
        title: 'Taro',
        type: 'Meeting agent',
        date: '2026-08-29',
        line: 'A voice assistant for Google Meet. Say “Hey Taro” and it posts to Slack, files GitHub issues, or adds to a to-do list.',
        facts: [['Stack', 'TypeScript · Next.js · Gemini']],
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
        type: 'Neural network',
        date: '2026-06-12',
        line: 'A neural network that sorts German traffic signs, built from scratch in NumPy. No PyTorch, no autograd.',
        facts: [
            ['Result', '90% test accuracy on 43 classes'],
            ['Stack', 'Python · NumPy · React'],
        ],
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
        type: 'Web app',
        date: '2026-02-08',
        line: 'An r/place for music: one orchestral score the whole world writes, note by note.',
        facts: [['Stack', 'React · Express · VexFlow']],
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
        type: 'Android + web',
        date: '2025-03-17',
        line: 'A phone at the court spots players with an on-device model, and the website shows which courts are free.',
        facts: [['Stack', 'Kotlin · TensorFlow Lite · React']],
        links: [
            { label: 'Live', url: 'https://vacantcourt.netlify.app' },
            { label: 'App code', url: 'https://github.com/sohan-bhat/VacantCourtApp' },
            { label: 'Web code', url: 'https://github.com/sohan-bhat/VacantCourt' },
        ],
        image: 'vacantcourt',
        alt: 'VacantCourt’s home page above a camera feed that boxes each player on the court.',
    },
    {
        id: 'mochi',
        title: 'Mochi',
        type: 'Web app',
        date: '2024-07-25',
        line: 'Recipes from just the ingredients you already have.',
        facts: [['Stack', 'React · Node.js · Groq']],
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
        type: 'Web app',
        date: '2024-06-21',
        line: 'Career ideas from your interests, suggested by AI.',
        facts: [
            ['Status', 'Retired'],
            ['Stack', 'React · Node.js · Groq'],
        ],
        links: [
            { label: 'Live', url: 'https://careerai.netlify.app' },
            { label: 'Code', url: 'https://github.com/sohan-bhat/CareerAI' },
        ],
        image: 'careerai',
        alt: 'Career AI suggesting careers from a list of interests.',
    },
];

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

const Projects = () => (
    <section className="projects">
        <div className="container">
            <h2 className="section-title">Projects<span className="title-period">.</span></h2>

            <div className="time-spine">
                {yearGroups.map(([year, items]) => (
                    <div className="spine-year-group" key={year}>
                        <h3 className="spine-year">{year}</h3>
                        {items.map((project) => (
                            <ProjectCard key={project.id} project={project} />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    </section>
);

export default Projects;
