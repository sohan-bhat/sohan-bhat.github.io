import React from 'react';
import '../styles/About.css';

// A few lines about me, under my photo in the intro.
const About = () => (
    <div className="hero-about" id="about">
        <h2 className="section-title">About<span className="title-period">.</span></h2>
        <div className="about-prose">
            <p>I'm 15 and a sophomore in Frisco, Texas.</p>
            <p>I'm interested in machine learning and NLP.</p>
            <p>I also code for FRC Team 2714 and play soccer and tennis.</p>
        </div>
    </div>
);

export default About;
