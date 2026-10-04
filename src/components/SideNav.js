import React, { useEffect, useState } from 'react';
import '../styles/SideNav.css';

const SECTIONS = [
    { id: 'intro', label: 'Intro' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'robotics', label: 'Robotics' },
];

// Each section is a long tick followed by short ones; the tick nearest to how
// far you've read through the section lights up, like a needle on a dial.
const TICKS = 4;

// The current section is the one under a line a third of the way down the
// window; progress (0 to 1) is how far the top of the window has moved
// through it. At the very bottom of the page, the last section counts as read.
const readPosition = () => {
    const line = window.innerHeight / 3;
    const tops = SECTIONS.map(({ id }) => document.getElementById(id).getBoundingClientRect().top);
    const pageBottom = document.documentElement.getBoundingClientRect().bottom;
    if (pageBottom - window.innerHeight < 2) return { index: SECTIONS.length - 1, progress: 1 };
    let index = 0;
    tops.forEach((top, i) => {
        if (top <= line) index = i;
    });
    const start = tops[index];
    const end = index + 1 < tops.length ? tops[index + 1] : pageBottom;
    const progress = Math.min(1, Math.max(0, -start / Math.max(1, end - start)));
    return { index, progress };
};

const SideNav = () => {
    const [position, setPosition] = useState({ index: 0, progress: 0 });

    useEffect(() => {
        let frame = 0;
        const update = () => {
            frame = 0;
            const next = readPosition();
            setPosition((previous) =>
                previous.index === next.index && Math.abs(previous.progress - next.progress) < 0.01 ? previous : next
            );
        };
        const schedule = () => {
            if (!frame) frame = requestAnimationFrame(update);
        };
        update();
        window.addEventListener('scroll', schedule, { passive: true });
        window.addEventListener('resize', schedule);
        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener('scroll', schedule);
            window.removeEventListener('resize', schedule);
        };
    }, []);

    const needle = Math.min(TICKS - 1, Math.floor(position.progress * TICKS));

    return (
        <nav className="side-nav" aria-label="Sections">
            <ol>
                {SECTIONS.map(({ id, label }, i) => {
                    const active = i === position.index;
                    return (
                        <li key={id}>
                            <a href={`#${id}`} className={active ? 'is-active' : undefined} aria-current={active ? 'location' : undefined}>
                                <span className="side-ticks" aria-hidden="true">
                                    {Array.from({ length: TICKS }, (_, t) => (
                                        <span key={t} className={`tick${t === 0 ? ' tick-major' : ''}${active && t === needle ? ' tick-needle' : ''}`} />
                                    ))}
                                </span>
                                <span className="side-label">{label}</span>
                            </a>
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
};

export default SideNav;
