import React from 'react';
import skills from '../data/skills';
import '../styles/Skills.css';

// A line of skills under a heading on the home page: small and gray, the
// languages and tools with space between them and no marks. Projects shows
// the main list and Robotics its own; both are in src/data/skills.js.
// `label` names the list for a screen reader.
const Skills = ({ items = skills, label = 'Skills', id }) => (
    <ul className="skills-line" id={id} aria-label={label}>
        {items.map((skill, i) => (
            <React.Fragment key={skill}>
                {i > 0 && ' '}
                <li>{skill}</li>
            </React.Fragment>
        ))}
    </ul>
);

export default Skills;
