import React from 'react';
import '../styles/Rows.css';
import '../styles/Robotics.css';

const shot = (name) => ({
    src: `/imgs/${name}-560.webp`,
    srcSet: `/imgs/${name}-560.webp 560w, /imgs/${name}-1120.webp 1120w`,
    ratio: 1.6,
});

const photo = (name, ratio) => ({ src: `/imgs/${name}-480.webp`, ratio });

const builds = [
    {
        ...shot('build-wins'),
        title: 'Fort Worth District wins',
        meta: '2025 and 2026, Team 2714',
        alt: 'The robots of Team 10032, Team 2714 and Team 2728 behind three blue banners that read Winner 2026, FIRST in Texas District Fort Worth Event.',
        link: {
            label: 'The Blue Alliance',
            name: 'Team 2714 on The Blue Alliance',
            href: 'https://www.thebluealliance.com/team/2714',
        },
    },
    {
        ...shot('build-autos'),
        title: 'Autonomous routines',
        meta: '2026, Team 2728',
        detail: 'I wrote 11 of the robot’s 12 autonomous routines.',
        alt: 'TACO’s autonomous paths drawn in orange over a top view of the 2026 field.',
        link: {
            label: 'Code',
            name: 'Autonomous routines code',
            href: 'https://github.com/FRC2714/TACO-Rebuilt-2026/tree/847a62c7e399331f45e12266f7274c0170c1b470/src/main/deploy/pathplanner/autos',
        },
    },
    {
        ...shot('build-airstrike'),
        title: 'Airstrike targeting app',
        meta: '2026, Team 2714',
        detail: 'The drive team taps the field to set a passing target.',
        alt: 'Airstrike showing a top view of the field with a target ring, the target position and a row of zone buttons.',
        link: {
            label: 'Code',
            name: 'Airstrike targeting app code',
            href: 'https://github.com/FRC2714/Airstrike-2026',
        },
    },
    {
        ...shot('build-hud'),
        title: 'Driver heads-up display',
        meta: '2025, Team 2714',
        detail: 'Won the Innovation in Control Award at the Texas state championship.',
        alt: 'The heads-up display, a hexagon labeled Barge and Driver beside the connection status and time left.',
        link: {
            label: 'Code',
            name: 'Driver heads-up display code',
            href: 'https://github.com/FRC2714/bbq-hud/blob/1b67b4cf1a9ff527c1c5e01da16b8309465ed436/src/NetworkTablesHUD.tsx',
        },
    },
    {
        ...shot('build-limelight'),
        title: 'Limelight vision alignment',
        meta: '2026, Team 2728',
        detail: 'Two Limelights aim the robot at the hub within 0.3°.',
        alt: 'The hub and its AprilTags on the Fort Worth field, with Team 2714’s robot in front and TACO behind.',
        link: {
            label: 'Code',
            name: 'Limelight vision alignment code',
            href: 'https://github.com/FRC2714/TACO-Rebuilt-2026/blob/847a62c7e399331f45e12266f7274c0170c1b470/src/main/java/frc/robot/subsystems/DriveSubsystem.java#L157-L208',
        },
    },
    {
        ...photo('robot-taco', 1),
        title: 'TACO',
        meta: '2026, Team 2728',
        alt: 'TACO, Team 2728’s 2026 robot, on red bumpers behind a blue FIRST Robotics Competition winner banner.',
    },
    {
        ...photo('robot-field', 0.8),
        title: 'REBUILT robot',
        meta: '2026, Team 2714',
        alt: 'Team 2714’s 2026 robot on the REBUILT field, with its Limelight camera at the front.',
    },
    {
        ...photo('robot-2025', 1),
        title: 'Jerk Chicken',
        meta: '2025, Team 2714',
        alt: 'Jerk Chicken, Team 2714’s 2025 robot, on the field with its blue arm swung out to the side.',
    },
];

// Robotics: one line about the teams, then everything I built and the
// robots themselves, each in a row like the rows of Work. Nothing is hidden.
const Robotics = () => (
    <section className="robotics" id="robotics">
        <div className="container">
            <h2 className="section-title">Robotics<span className="title-period">.</span></h2>
            <p className="robotics-prose">I write Java for FRC Team 2714 and Team 2728.</p>

            <ul className="rows">
                {builds.map((build) => (
                    <li className="row" key={build.title}>
                        <div className="row-picture" style={{ '--ratio': build.ratio }}>
                            <img
                                src={build.src}
                                srcSet={build.srcSet}
                                sizes={build.srcSet ? '(max-width: 640px) calc(100vw - 3rem), 304px' : undefined}
                                width={Math.round(350 * build.ratio)}
                                height="350"
                                alt={build.alt}
                                loading="lazy"
                                decoding="async"
                            />
                        </div>
                        <div className="row-body">
                            <h3 className="row-title">{build.title}</h3>
                            <p className="row-note">{build.meta}</p>
                            {build.detail && <p className="row-text">{build.detail}</p>}
                            {build.link && (
                                <p className="row-links">
                                    <a href={build.link.href} target="_blank" rel="noreferrer" aria-label={build.link.name}>
                                        {build.link.label}
                                    </a>
                                </p>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    </section>
);

export default Robotics;
