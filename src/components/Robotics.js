import React, { useState } from 'react';
import Card from './Card';
import builds from '../data/robotics';
import '../styles/Robotics.css';

// Robotics on the home page: one line about the teams, then everything at
// once in a grid of the same cards Projects uses, a picture and a title
// each. A card's link shows when it is pointed at or tapped. The heading
// opens the Robotics page, which says more about each.
const Robotics = () => {
    const [openId, setOpenId] = useState(null);

    return (
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
                            id={build.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}
                            image={{ src: build.src, srcSet: build.srcSet, sizes: '(max-width: 960px) 46vw, 270px', focus: build.focus, alt: build.alt }}
                            title={build.title}
                            about={
                                build.link && (
                                    <p className="card-links">
                                        <a className="text-link" href={build.link.href} target="_blank" rel="noreferrer" aria-label={build.link.name}>
                                            {build.link.label}
                                        </a>
                                    </p>
                                )
                            }
                            open={build.title === openId}
                            onToggle={() => setOpenId(build.title === openId ? null : build.title)}
                        />
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default Robotics;
