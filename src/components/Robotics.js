import React from 'react';
import '../styles/Robotics.css';

// What I wrote each season, beside a photo of that season's robot. Each
// build has one detail you can check in the code it links to. A photo is
// served as <name>-<width>.webp at each of its widths.
const seasons = [
    {
        photo: {
            name: 'robot-field',
            widths: [480, 640, 800],
            height: 600,
            alt: 'Team 2714’s 2026 robot on the REBUILT field, with its Limelight camera at the front.',
            caption: 'Team 2714’s robot, REBUILT 2026',
        },
        builds: [
            {
                title: 'Autonomous routines',
                meta: '2026, Team 2728',
                detail: 'PathPlanner autos from three starting spots that shoot the preload, then make one or two trips to the neutral zone to pick up more and shoot again. I wrote 11 of the robot’s 12 autonomous routines.',
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
                detail: 'A tablet app that lets the drive team tap anywhere on the field to set a passing target. The robot then aims there instead of using auto-aim.',
                code: 'https://github.com/FRC2714/Airstrike-2026',
            },
        ],
    },
    {
        photo: {
            name: 'robot-2025',
            widths: [480, 640, 960],
            height: 480,
            alt: 'Jerk Chicken, Team 2714’s 2025 robot, on the field with its blue arm swung out to the side.',
            caption: 'Jerk Chicken, Team 2714’s robot, REEFSCAPE 2025',
        },
        builds: [
            {
                title: 'Driver heads-up display',
                meta: '2025, Team 2714',
                detail: 'It lights up which of the reef’s 12 stalks the operator picked, and the match clock changes color with 30 and 15 seconds left. It won the team the Innovation in Control Award, sponsored by nVent, at the Texas state championship.',
                code: 'https://github.com/FRC2714/bbq-hud/blob/1b67b4cf1a9ff527c1c5e01da16b8309465ed436/src/NetworkTablesHUD.tsx',
            },
        ],
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

            {seasons.map(({ photo, builds }) => (
                <div className="robotics-layout" key={photo.name}>
                    <figure className="robotics-figure">
                        <img
                            className="robotics-photo"
                            src={`/imgs/${photo.name}-480.webp`}
                            srcSet={photo.widths.map((w) => `/imgs/${photo.name}-${w}.webp ${w}w`).join(', ')}
                            sizes="(max-width: 600px) calc(100vw - 3rem), (max-width: 768px) 300px, 500px"
                            width="480"
                            height={photo.height}
                            alt={photo.alt}
                            loading="lazy"
                        />
                        <figcaption className="robotics-caption">{photo.caption}</figcaption>
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
            ))}

            <p className="robotics-results">Team 2714 won the Fort Worth District event in 2025 and 2026.</p>
            <a
                className="tba-link text-link focus-link"
                href="https://www.thebluealliance.com/team/2714"
                target="_blank"
                rel="noreferrer"
            >
                Team 2714 on The Blue Alliance
            </a>
        </div>
    </section>
);

export default Robotics;
