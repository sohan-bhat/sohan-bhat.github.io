import React from 'react';
import skills from '../data/skills';
import '../styles/Skills.css';

// Skills, in the intro under the write-ups: one compact wall of small badges,
// one per language or tool, in the order of the groups in the data. The list is src/data/skills.js.
const Skills = () => (
    <div className="hero-skills" id="skills">
        <h2 className="section-title">
            Skills<span className="title-period">.</span>
        </h2>
        <ul className="skill-wall">
            {skills.flatMap(({ items }) => items).map((item) => (
                <li className="skill" key={item}>
                    {item}
                </li>
            ))}
        </ul>
    </div>
);

export default Skills;
