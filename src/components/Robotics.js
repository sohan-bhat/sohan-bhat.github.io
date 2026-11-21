import React from 'react';
import Card from './Card';
import builds from '../data/robotics';
import '../styles/Robotics.css';

// Robotics on the home page: one line about the teams, then everything at
// once in a grid of the same cards Projects uses. A card is its picture and
// its title, with the link to its code beside the title. The heading opens
// the Robotics page, which says more about each.
const Robotics = () => (
    <section className="robotics" id="robotics">
        <div className="container">
            <h2 className="section-title">
                <a href="/robotics/">Robotics</a>
                <span className="title-period">.</span>
            </h2>
            <p className="robotics-prose">I write Java for FRC Team 2714 and Team 2728.</p>

            <ul className="cards robotics-cards">
                {builds.map((build) => (
                    <Card
                        key={build.title}
                        image={{ src: build.src, srcSet: build.srcSet, sizes: '(max-width: 960px) 46vw, 270px', focus: build.focus, alt: build.alt }}
                        title={build.title}
                        aside={
                            build.link && (
                                <a className="card-aside text-link" href={build.link.href} target="_blank" rel="noreferrer" aria-label={build.link.name}>
                                    {build.link.label}
                                </a>
                            )
                        }
                    />
                ))}
            </ul>
        </div>
    </section>
);

export default Robotics;
