import React from 'react';
import '../styles/Robotics.css';

// What I wrote, each with one detail you can check in the code it links to.
const builds = [
    {
        title: 'Autonomous routines',
        meta: '2026, Team 2728',
        detail: 'PathPlanner autos from three starting spots that shoot the preload, then make one or two trips to the neutral zone to pick up more and shoot again. I made 11 of the robot’s 12.',
        code: 'https://github.com/FRC2714/TACO-Rebuilt-2026/tree/847a62c7e399331f45e12266f7274c0170c1b470/src/main/deploy/pathplanner/autos',
    },
    {
        title: 'Limelight vision alignment',
        meta: '2026, Team 2728',
        detail: 'Two Limelights feed MegaTag2 poses into the robot’s position estimate, skipping frames while it spins faster than one turn a second. A PID loop then turns it to face the hub and counts it aligned within 0.3°.',
        code: 'https://github.com/FRC2714/TACO-Rebuilt-2026/blob/847a62c7e399331f45e12266f7274c0170c1b470/src/main/java/frc/robot/subsystems/DriveSubsystem.java#L157-L208',
    },
    {
        title: 'Airstrike targeting app',
        meta: '2026, Team 2714',
        detail: 'A tablet app for the drive team: tap anywhere on the field to set a passing target, and the robot aims there instead of using auto-aim.',
        code: 'https://github.com/FRC2714/Airstrike-2026',
    },
    {
        title: 'Driver heads-up display',
        meta: '2025, Team 2714',
        detail: 'It lights up which of the reef’s 12 stalks the operator picked, and the match clock changes color with 30 and 15 seconds left.',
        code: 'https://github.com/FRC2714/bbq-hud/blob/1b67b4cf1a9ff527c1c5e01da16b8309465ed436/src/NetworkTablesHUD.tsx',
    },
];

const Robotics = () => (
    <section className="robotics" id="robotics">
        <div className="container">
            <h2 className="section-title">Robotics<span className="title-period">.</span></h2>
            <p className="robotics-prose">
                I write Java for FRC Team 2714 and Team 2728, mostly autonomous routines
                and Limelight vision.
            </p>

            <div className="robotics-layout">
                <figure className="robotics-figure">
                    <img
                        className="robotics-photo"
                        src="/imgs/robot-field-480.webp"
                        srcSet="/imgs/robot-field-480.webp 480w, /imgs/robot-field-640.webp 640w, /imgs/robot-field-800.webp 800w"
                        sizes="(max-width: 768px) calc(100vw - 3rem), 400px"
                        width="480"
                        height="600"
                        alt="Team 2714’s 2026 robot on the REBUILT field, with its Limelight camera at the front."
                        loading="lazy"
                    />
                    <figcaption className="robotics-caption">Team 2714’s robot, REBUILT 2026</figcaption>
                </figure>

                <ul className="build-list">
                    {builds.map((build) => (
                        <li className="build" key={build.title}>
                            <h3 className="build-title">{build.title}</h3>
                            <p className="build-meta">{build.meta}</p>
                            <p className="build-detail">{build.detail}</p>
                            <a
                                className="build-code text-link"
                                href={build.code}
                                target="_blank"
                                rel="noreferrer"
                                aria-label={`${build.title} code`}
                            >
                                Code
                            </a>
                        </li>
                    ))}
                </ul>
            </div>

            <p className="robotics-results">Team results: Winner, Fort Worth District 2025 and 2026</p>
            <a
                className="tba-link retro-button"
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
