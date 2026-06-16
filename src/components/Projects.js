import React from 'react';
import ProjectCard from './ProjectCard';
import ProjectGroup from './ProjectGroup';
import '../styles/Projects.css';

const projects = [
    {
        id: 6,
        title: "SignNet",
        description: "A convolutional neural network that sorts German traffic signs into 43 classes — backpropagation and all, written from scratch in pure NumPy with no PyTorch, TensorFlow, or autograd.",
        image: "/imgs/SignNet.png",
        tags: ["Python", "NumPy", "React", "TypeScript"],
        demoLink: "https://signnet-cnn.netlify.app",
        codeLink: "https://github.com/sohan-bhat/signnet",
    },
    {
        id: 4,
        title: "VacantCourt Config Utility",
        description: "Android app running on-device person detection (TensorFlow Lite) and pushing live court occupancy to Firebase. Camera in, signal out.",
        image: "/imgs/VacantCourtApp.png",
        tags: ["Kotlin", "Android", "TensorFlow Lite", "Firebase", "CameraX"],
        codeLink: "https://github.com/sohan-bhat/VacantCourtApp",
        groupId: "vacantcourt",
        groupRole: "source"
    },
    {
        id: 1,
        title: "VacantCourt",
        description: "A real-time court availability system that finds free, nearby courts and shows if they're available. Play more, wait less.",
        image: "/imgs/VacantCourtWebsite.png",
        tags: ["Vite", "React", "Firebase", "Kotlin", "TensorFlow Lite"],
        demoLink: "https://vacantcourt.netlify.app",
        codeLink: "https://github.com/sohan-bhat/vacantcourtwebsite",
        groupId: "vacantcourt",
        groupRole: "sink"
    },
    {
        id: 5,
        title: "Ensemble",
        description: "An r/place for music — one shared orchestral score the whole world writes together, note by note. Anyone, anywhere, adds to the same global symphony.",
        image: "/imgs/Ensemble.png",
        tags: ["React", "Vite", "Express", "VexFlow", "LibSQL"],
        demoLink: "https://ensemble-qnd2.onrender.com",
        codeLink: "https://github.com/sohan-bhat/ensemble",
    },

    {
        id: 2,
        title: "Mochi",
        description: "A fully responsive recipe finder from just the ingredients you have!",
        image: "/imgs/Mochi.png",
        tags: ["React", "Node.js", "Groq API"],
        demoLink: "https://trymochi.netlify.app",
        codeLink: "https://github.com/sohan-bhat/Mochi",
    },
    {
        id: 3,
        title: "Career AI",
        description: "Find your dream careers with the help of a personalized on-board AI just based on your interests!",
        image: "/imgs/CareerAI.png",
        tags: ["React", "Node.js", "Groq API"],
        demoLink: "https://careerai.netlify.app",
        codeLink: "https://github.com/sohan-bhat/CareerAI",
        legacy: true,
    }
];

const projectGroups = {
    vacantcourt: {
        label: 'VacantCourt',
        order: ['source', 'sink']
    }
};

// Build the render order, preserving the array order of `projects`. A grouped
// project is emitted as a single ProjectGroup at the position of its first
// member; later members of the same group are skipped.
const buildRenderList = (list) => {
    const out = [];
    const seen = new Set();
    list.forEach((p) => {
        if (!p.groupId) {
            out.push({ type: 'card', project: p });
            return;
        }
        if (seen.has(p.groupId)) return;
        seen.add(p.groupId);
        out.push({
            type: 'group',
            groupId: p.groupId,
            members: list.filter((x) => x.groupId === p.groupId),
        });
    });
    return out;
};

const Projects = () => {
    const renderList = buildRenderList(projects);

    return (
        <section className="projects">
            <div className="container">
                <h2 className="section-title">Projects<span className="title-period">.</span></h2>
                <div className="project-grid">
                    {renderList.map((item) =>
                        item.type === 'group' ? (
                            <ProjectGroup
                                key={item.groupId}
                                config={projectGroups[item.groupId]}
                                projects={item.members}
                            />
                        ) : (
                            <ProjectCard key={item.project.id} project={item.project} />
                        )
                    )}
                </div>
            </div>
        </section>
    );
};

export default Projects;
