import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import '../styles/Robotics.css';

const shot = (name) => ({
    src: `/imgs/${name}-560.webp`,
    srcSet: `/imgs/${name}-560.webp 560w, /imgs/${name}-1120.webp 1120w`,
    ratio: 1.6,
});

const photo = (name, ratio) => ({ src: `/imgs/${name}-480.webp`, ratio });

const slides = [
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

const still = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const Robotics = () => {
    const [viewport, carousel] = useEmblaCarousel({ align: 'start', slidesToScroll: 'auto', containScroll: false });
    const [canPrev, setCanPrev] = useState(false);
    const [canNext, setCanNext] = useState(true);

    const sync = useCallback((api) => {
        setCanPrev(api.canScrollPrev());
        setCanNext(api.canScrollNext());
    }, []);

    useEffect(() => {
        if (!carousel) return undefined;
        sync(carousel);
        carousel.on('select', sync).on('reInit', sync);
        return () => {
            carousel.off('select', sync).off('reInit', sync);
        };
    }, [carousel, sync]);

    return (
        <section className="robotics" id="robotics">
            <div className="container">
                <h2 className="section-title">Robotics<span className="title-period">.</span></h2>
                <div className="robotics-head">
                    <p className="robotics-prose">
                        I write Java for FRC Team 2714 and Team 2728.
                    </p>
                    <div className="carousel-controls">
                        <button
                            type="button"
                            className="carousel-button"
                            aria-controls="robotics-slides"
                            disabled={!canPrev}
                            onClick={() => carousel && carousel.scrollPrev(still())}
                        >
                            Previous
                        </button>
                        <button
                            type="button"
                            className="carousel-button"
                            aria-controls="robotics-slides"
                            disabled={!canNext}
                            onClick={() => carousel && carousel.scrollNext(still())}
                        >
                            Next
                        </button>
                    </div>
                </div>

                <div className="carousel" ref={viewport}>
                    <ul className="build-track" id="robotics-slides">
                        {slides.map((slide) => (
                            <li className="build" key={slide.title} style={{ '--ratio': slide.ratio }}>
                                <img
                                    className="build-image"
                                    src={slide.src}
                                    srcSet={slide.srcSet}
                                    sizes={slide.srcSet ? '(max-width: 600px) 90vw, (max-width: 1000px) 45vw, 270px' : undefined}
                                    width={160 * slide.ratio}
                                    height="160"
                                    alt={slide.alt}
                                    loading="lazy"
                                    draggable="false"
                                />
                                <h3 className="build-title">{slide.title}</h3>
                                <p className="build-meta">{slide.meta}</p>
                                {slide.detail && <p className="build-detail">{slide.detail}</p>}
                                {slide.link && (
                                    <a
                                        className="build-code text-link"
                                        href={slide.link.href}
                                        target="_blank"
                                        rel="noreferrer"
                                        aria-label={slide.link.name}
                                    >
                                        {slide.link.label}
                                    </a>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default Robotics;
