import React from 'react';
import '../styles/Robotics.css';

const seasons = [
    {
        year: 2026,
        name: 'REBUILT',
        note: 'Winner, Fort Worth District',
        photo: { src: '/imgs/robot-2026.jpg', alt: 'FRC Team 2714 robot at REBUILT 2026' },
        banner: { src: '/imgs/blue-banner.png', alt: 'Winner, 2026 Fort Worth District banner' },
    },
    {
        year: 2025,
        name: 'REEFSCAPE',
        note: 'Winner, Fort Worth District',
        photo: { src: '/imgs/robot-2025.jpg', alt: 'FRC Team 2714 robot at REEFSCAPE 2025' },
        banner: { src: '/imgs/banner-2025-fortworth.png', alt: 'Winner, 2025 Fort Worth District banner' },
    },
];

const Robotics = () => (
    <section className="robotics">
        <div className="container">
            <h2 className="section-title">Robotics<span className="title-period">.</span></h2>
            <p className="robotics-prose">
                I write Java for FRC Team 2714's robot, mostly autonomous routines and
                Limelight vision.
            </p>

            <div className="season-list">
                {seasons.map((season) => (
                    <article className="season-card" key={season.year}>
                        <img
                            className="season-photo"
                            src={season.photo.src}
                            alt={season.photo.alt}
                            loading="lazy"
                        />
                        <div className="season-info">
                            <h3 className="season-name">
                                <span className="season-year">{season.year}</span> {season.name}
                            </h3>
                            <p className="season-note">{season.note}</p>
                            <img
                                className="season-banner"
                                src={season.banner.src}
                                alt={season.banner.alt}
                                width="280"
                                height="390"
                                loading="lazy"
                            />
                        </div>
                    </article>
                ))}
            </div>

            <a
                className="tba-link"
                href="https://www.thebluealliance.com/team/2714"
                target="_blank"
                rel="noreferrer"
            >
                Team 2714 on The Blue Alliance ↗
            </a>
        </div>
    </section>
);

export default Robotics;
