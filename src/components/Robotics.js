import React from 'react';
import '../styles/Cards.css';
import '../styles/Robotics.css';

const shot = (name) => ({
    src: `/imgs/${name}-560.webp`,
    srcSet: `/imgs/${name}-560.webp 560w, /imgs/${name}-1120.webp 1120w`,
});

// A robot photo. They are square or upright, so a card shows the band of the
// photo around `focus`, which is where the robot is.
const photo = (name, focus) => ({ src: `/imgs/${name}-480.webp`, focus });

const builds = [
    {
        ...shot('build-wins'),
        title: 'Fort Worth District wins',
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
        alt: 'The hub and its AprilTags on the Fort Worth field, with Team 2714’s robot in front and TACO behind.',
        link: {
            label: 'Code',
            name: 'Limelight vision alignment code',
            href: 'https://github.com/FRC2714/TACO-Rebuilt-2026/blob/847a62c7e399331f45e12266f7274c0170c1b470/src/main/java/frc/robot/subsystems/DriveSubsystem.java#L157-L208',
        },
    },
    {
        ...photo('robot-taco', '50% 0%'),
        title: 'TACO',
        alt: 'TACO, Team 2728’s 2026 robot, on red bumpers behind a blue FIRST Robotics Competition winner banner.',
    },
    {
        ...photo('robot-field', '50% 78%'),
        title: 'REBUILT robot',
        alt: 'Team 2714’s 2026 robot on the REBUILT field, with its Limelight camera at the front.',
    },
    {
        ...photo('robot-2025', '50% 40%'),
        title: 'Jerk Chicken',
        alt: 'Jerk Chicken, Team 2714’s 2025 robot, on the field with its blue arm swung out to the side.',
    },
];

// Robotics: one line about the teams, then everything at once in a grid of
// the same cards Projects uses. A card is its picture and its title, with
// its link under it where it has one.
const Robotics = () => (
    <section className="robotics" id="robotics">
        <div className="container">
            <h2 className="section-title">Robotics<span className="title-period">.</span></h2>
            <p className="robotics-prose">I write Java for FRC Team 2714 and Team 2728.</p>

            <ul className="cards robotics-cards">
                {builds.map((build) => (
                    <li className="card" key={build.title}>
                        <img
                            className="card-shot"
                            src={build.src}
                            srcSet={build.srcSet}
                            sizes={build.srcSet ? '(max-width: 960px) 46vw, 270px' : undefined}
                            style={build.focus ? { objectPosition: build.focus } : undefined}
                            width="560"
                            height="350"
                            alt={build.alt}
                            loading="lazy"
                            decoding="async"
                        />
                        <h3 className="card-title">{build.title}</h3>
                        {build.link && (
                            <p className="card-links">
                                <a className="text-link" href={build.link.href} target="_blank" rel="noreferrer" aria-label={build.link.name}>
                                    {build.link.label}
                                </a>
                            </p>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    </section>
);

export default Robotics;
