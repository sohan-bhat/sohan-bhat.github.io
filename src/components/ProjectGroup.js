import React from 'react';
import ProjectCard from './ProjectCard';
import '../styles/ProjectGroup.css';

const ProjectGroup = ({ config, projects }) => {
    const ordered = [...projects].sort(
        (a, b) => config.order.indexOf(a.groupRole) - config.order.indexOf(b.groupRole)
    );

    return (
        <div className="project-group">
            <span className="project-group-label">
                <span className="project-group-name">{config.label}</span>
                <span className="project-group-flow">{config.flow}</span>
            </span>
            <div className="project-group-cards">
                {ordered.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </div>
        </div>
    );
};

export default ProjectGroup;
