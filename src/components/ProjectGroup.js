import React from 'react';
import ProjectCard from './ProjectCard';
import '../styles/ProjectGroup.css';

const ProjectGroup = ({ config, projects }) => {
    const ordered = [...projects].sort(
        (a, b) => config.order.indexOf(a.groupRole) - config.order.indexOf(b.groupRole)
    );

    return (
        <div className="project-group">
            <div className="project-group-header">
                <span className="project-group-tag">Linked system</span>
            </div>
            <div className="project-group-cards">
                {ordered.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </div>
        </div>
    );
};

export default ProjectGroup;
