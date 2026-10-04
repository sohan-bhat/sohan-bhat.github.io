import React, { useEffect, useRef, useState } from 'react';
import '../styles/Dial.css';

const SECTIONS = [
    { id: 'intro', label: 'Intro' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'robotics', label: 'Robotics' },
];

// Wide enough for the names and links; on narrower screens the strip is a
// position indicator only.
const WIDE = '(min-width: 1100px)';

// How far down the page the reader is, in sections: 0 at the top, 1 when the
// About section reaches the top of the window, and so on. Sections that can't
// reach the top (the page ends first) count as reached at the very bottom.
const readPosition = () => {
    const y = window.scrollY;
    const bottom = document.documentElement.scrollHeight - window.innerHeight;
    const stops = SECTIONS.map(({ id }, i) =>
        i === 0 ? 0 : Math.min(bottom, document.getElementById(id).getBoundingClientRect().top + y)
    );
    const last = stops.length - 1;
    if (y >= stops[last]) return last;
    for (let i = last - 1; i >= 0; i--) {
        if (y >= stops[i]) return i + (y - stops[i]) / Math.max(1, stops[i + 1] - stops[i]);
    }
    return 0;
};

// A small vertical strip on the left edge with a mark for each section. It
// slides as the page scrolls, so the section you're reading sits at the
// terracotta index mark. On wide screens each mark has its name; clicking a
// name scrolls there.
const Dial = () => {
    const scale = useRef(null);
    const [active, setActive] = useState(0);
    const [wide, setWide] = useState(() => window.matchMedia(WIDE).matches);

    useEffect(() => {
        const query = window.matchMedia(WIDE);
        const change = () => setWide(query.matches);
        query.addEventListener('change', change);
        return () => query.removeEventListener('change', change);
    }, []);

    useEffect(() => {
        let frame = 0;
        const update = () => {
            frame = 0;
            const position = readPosition();
            scale.current.style.setProperty('--turn', position);
            const nearest = Math.round(position);
            setActive((previous) => (previous === nearest ? previous : nearest));
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

    return (
        <nav className="dial" aria-label="Sections" aria-hidden={wide ? undefined : true}>
            <div className="dial-scale" ref={scale}>
                {SECTIONS.slice(1).map(({ id }, i) => (
                    <span key={id} className="dial-tick" style={{ '--i': i + 0.5 }} />
                ))}
                {SECTIONS.map(({ id }, i) => (
                    <span key={id} className={`dial-mark${i === active ? ' is-active' : ''}`} style={{ '--i': i }} />
                ))}
                {wide &&
                    SECTIONS.map(({ id, label }, i) => (
                        <a
                            key={id}
                            href={`#${id}`}
                            className={`dial-section${i === active ? ' is-active' : ''}`}
                            style={{ '--i': i }}
                            aria-current={i === active ? 'location' : undefined}
                        >
                            {label}
                        </a>
                    ))}
            </div>
            <span className="dial-index" />
        </nav>
    );
};

export default Dial;
