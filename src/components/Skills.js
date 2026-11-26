import React from 'react';
import skills from '../data/skills';
import '../styles/Skills.css';

// Skills, in the intro under the links: one small gray line of languages
// and tools, with space between them and no marks. The list is
// src/data/skills.js.
const Skills = () => (
    <ul className="skills-line" id="skills" aria-label="Skills">
        {skills.map((skill) => (
            <li key={skill}>{skill}</li>
        ))}
    </ul>
);

export default Skills;
