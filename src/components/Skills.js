import React from 'react';
import skills from '../data/skills';
import '../styles/Skills.css';

// Skills, under the Projects heading on the home page: one small gray line
// that starts "Built with", then the languages and tools, with space
// between them and no marks. The list is src/data/skills.js.
const Skills = () => (
    <div className="skills-line" id="skills">
        <span className="skills-label" id="skills-label">
            Built with
        </span>
        <ul aria-labelledby="skills-label">
            {skills.map((skill) => (
                <React.Fragment key={skill}>
                    {' '}
                    <li>{skill}</li>
                </React.Fragment>
            ))}
        </ul>
    </div>
);

export default Skills;
