import React from 'react';
import skills from '../data/skills';
import '../styles/Skills.css';

// Skills, in the intro under the write-ups: one row per group, its name on
// the left and its languages or tools beside it, as plain text. The list is
// src/data/skills.js.
const Skills = () => (
    <div className="hero-skills" id="skills">
        <h2 className="section-title">
            Skills<span className="title-period">.</span>
        </h2>
        <dl className="skill-rows">
            {skills.map(({ group, items }) => (
                <div className="skill-row" key={group}>
                    <dt className="skill-label">{group}</dt>
                    <dd className="skill-list">{items.join(', ')}</dd>
                </div>
            ))}
        </dl>
    </div>
);

export default Skills;
