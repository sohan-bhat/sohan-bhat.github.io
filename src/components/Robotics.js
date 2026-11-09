import React from 'react';
import '../styles/Robotics.css';

const robots = [
    {
        name: 'robot-taco',
        widths: [360, 660],
        alt: 'TACO, Team 2728’s 2026 robot, on red bumpers behind a blue FIRST Robotics Competition winner banner.',
        caption: 'TACO, Team 2728, REBUILT 2026',
    },
    {
        name: 'robot-field',
        widths: [480, 640, 800],
        position: '50% 75%',
        alt: 'Team 2714’s 2026 robot on the REBUILT field, with its Limelight camera at the front.',
        caption: 'Team 2714, REBUILT 2026',
    },
    {
        name: 'robot-2025',
        widths: [480, 640, 960],
        alt: 'Jerk Chicken, Team 2714’s 2025 robot, on the field with its blue arm swung out to the side.',
        caption: 'Jerk Chicken, REEFSCAPE 2025',
    },
];

const builds = [
    {
        title: 'Autonomous routines',
        meta: '2026, Team 2728',
        detail: 'I wrote 11 of the robot’s 12 autonomous routines.',
        code: 'https://github.com/FRC2714/TACO-Rebuilt-2026/tree/847a62c7e399331f45e12266f7274c0170c1b470/src/main/deploy/pathplanner/autos',
        image: 'build-autos',
        alt: 'TACO’s autonomous paths drawn in orange over a top view of the 2026 field.',
    },
    {
        title: 'Limelight vision alignment',
        meta: '2026, Team 2728',
        detail: 'Two Limelights aim the robot at the hub within 0.3°.',
        code: 'https://github.com/FRC2714/TACO-Rebuilt-2026/blob/847a62c7e399331f45e12266f7274c0170c1b470/src/main/java/frc/robot/subsystems/DriveSubsystem.java#L157-L208',
        image: 'build-limelight',
        alt: 'The hub and its AprilTags on the Fort Worth field, with Team 2714’s robot in front and TACO behind.',
    },
    {
        title: 'Airstrike targeting app',
        meta: '2026, Team 2714',
        detail: 'The drive team taps the field to set a passing target.',
        code: 'https://github.com/FRC2714/Airstrike-2026',
        image: 'build-airstrike',
        alt: 'Airstrike showing a top view of the field with a target ring, the target position and a row of zone buttons.',
    },
    {
        title: 'Driver heads-up display',
        meta: '2025, Team 2714',
        detail: 'Won the Innovation in Control Award at the Texas state championship.',
        code: 'https://github.com/FRC2714/bbq-hud/blob/1b67b4cf1a9ff527c1c5e01da16b8309465ed436/src/NetworkTablesHUD.tsx',
        image: 'build-hud',
        alt: 'The heads-up display, a hexagon labeled Barge and Driver beside the connection status and time left.',
    },
];

const Robotics = () => (
    <section className="robotics" id="robotics">
        <div className="container">
            <h1 className="section-title">Robotics<span className="title-period">.</span></h1>
            <p className="robotics-prose">
                I write Java for FRC Team 2714 and Team 2728.
            </p>

            <div className="robot-strip">
                {robots.map((robot) => (
                    <figure className="robot" key={robot.name}>
                        <img
                            className="robot-photo"
                            src={`/imgs/${robot.name}-${robot.widths[0]}.webp`}
                            srcSet={robot.widths.map((w) => `/imgs/${robot.name}-${w}.webp ${w}w`).join(', ')}
                            sizes="(max-width: 600px) 30vw, 360px"
                            width="480"
                            height="480"
                            style={robot.position ? { objectPosition: robot.position } : undefined}
                            alt={robot.alt}
                            loading="lazy"
                        />
                        <figcaption className="robot-caption">{robot.caption}</figcaption>
                    </figure>
                ))}
            </div>

            <ul className="build-grid">
                {builds.map((build) => (
                    <li className="build" key={build.title}>
                        <img
                            className="build-image"
                            src={`/imgs/${build.image}-560.webp`}
                            srcSet={`/imgs/${build.image}-560.webp 560w, /imgs/${build.image}-1120.webp 1120w`}
                            sizes="(max-width: 700px) calc(100vw - 3rem), 550px"
                            width="560"
                            height="350"
                            alt={build.alt}
                            loading="lazy"
                        />
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
