import React from 'react';
import skills from '../data/skills';
import '../styles/Skills.css';

// Skills, under the Projects heading on the home page: one small gray line
// of languages and tools, with space between them and no marks. The list
// is src/data/skills.js.
const Skills = () => (
    <ul className="skills-line" id="skills" aria-label="Skills">
        {skills.map((skill, i) => (
            <React.Fragment key={skill}>
                {i > 0 && ' '}
                <li>{skill}</li>
            </React.Fragment>
        ))}
    </ul>
);

export default Skills;
