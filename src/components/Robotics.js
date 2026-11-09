import React from 'react';
import '../styles/Robotics.css';

const builds = [
    {
        title: 'Fort Worth District wins',
        meta: '2025 and 2026, Team 2714',
        image: 'build-wins',
        alt: 'The robots of Team 10032, Team 2714 and Team 2728 behind three blue banners that read Winner 2026, FIRST in Texas District Fort Worth Event.',
        link: {
            label: 'The Blue Alliance',
            name: 'Team 2714 on The Blue Alliance',
            href: 'https://www.thebluealliance.com/team/2714',
        },
    },
    {
        title: 'Autonomous routines',
        meta: '2026, Team 2728',
        detail: 'I wrote 11 of the robot’s 12 autonomous routines.',
        image: 'build-autos',
        alt: 'TACO’s autonomous paths drawn in orange over a top view of the 2026 field.',
        link: {
            label: 'Code',
            name: 'Autonomous routines code',
            href: 'https://github.com/FRC2714/TACO-Rebuilt-2026/tree/847a62c7e399331f45e12266f7274c0170c1b470/src/main/deploy/pathplanner/autos',
        },
    },
    {
        title: 'Airstrike targeting app',
        meta: '2026, Team 2714',
        detail: 'The drive team taps the field to set a passing target.',
        image: 'build-airstrike',
        alt: 'Airstrike showing a top view of the field with a target ring, the target position and a row of zone buttons.',
        link: {
            label: 'Code',
            name: 'Airstrike targeting app code',
            href: 'https://github.com/FRC2714/Airstrike-2026',
        },
    },
    {
        title: 'Driver heads-up display',
        meta: '2025, Team 2714',
        detail: 'Won the Innovation in Control Award at the Texas state championship.',
        image: 'build-hud',
        alt: 'The heads-up display, a hexagon labeled Barge and Driver beside the connection status and time left.',
        link: {
            label: 'Code',
            name: 'Driver heads-up display code',
            href: 'https://github.com/FRC2714/bbq-hud/blob/1b67b4cf1a9ff527c1c5e01da16b8309465ed436/src/NetworkTablesHUD.tsx',
        },
    },
];

const Robotics = () => (
    <section className="robotics" id="robotics">
        <div className="container">
            <h2 className="section-title">Robotics<span className="title-period">.</span></h2>
            <p className="robotics-prose">
                I write Java for FRC Team 2714 and Team 2728.
            </p>

            <ul className="build-grid">
                {builds.map((build) => (
                    <li className="build" key={build.title}>
                        <img
                            className="build-image"
                            src={`/imgs/${build.image}-560.webp`}
                            srcSet={`/imgs/${build.image}-560.webp 560w, /imgs/${build.image}-1120.webp 1120w`}
                            sizes="(max-width: 600px) calc(100vw - 3rem), (max-width: 1000px) calc(50vw - 2.5rem), 270px"
                            width="560"
                            height="350"
                            alt={build.alt}
                            loading="lazy"
                        />
                        <h3 className="build-title">{build.title}</h3>
                        <p className="build-meta">{build.meta}</p>
                        {build.detail && <p className="build-detail">{build.detail}</p>}
                        <a
                            className="build-code text-link"
                            href={build.link.href}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={build.link.name}
                        >
                            {build.link.label}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    </section>
);

export default Robotics;
