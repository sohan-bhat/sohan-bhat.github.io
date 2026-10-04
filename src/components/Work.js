import React, { useRef, useState } from 'react';
import { WORK } from '../content';
import InfoCard from './InfoCard';
import '../styles/Work.css';

// Everything Sohan has made, as a compact timeline: newest first, with the
// year marked where each year begins. Each row opens its card.
const Work = () => {
    const [active, setActive] = useState(null);
    const rows = useRef([]);

    const step = (by) => setActive((i) => (i + by + WORK.length) % WORK.length);

    // Return focus to the row of the card that was showing.
    const onClose = () => {
        if (active !== null && rows.current[active]) rows.current[active].focus();
        setActive(null);
    };

    return (
        <>
            <figure className="work" aria-labelledby="work-caption">
                <ol className="timeline">
                    {WORK.map((item, i) => {
                        const startsYear = i === 0 || WORK[i - 1].year !== item.year;
                        return (
                            <li key={item.id} className={startsYear ? 'starts-year' : undefined}>
                                <button
                                    type="button"
                                    className="row"
                                    aria-haspopup="dialog"
                                    ref={(element) => {
                                        rows.current[i] = element;
                                    }}
                                    onClick={() => setActive(i)}
                                >
                                    <span className="row-year" aria-hidden="true">
                                        {startsYear ? item.year : ''}
                                    </span>
                                    <span className="row-month" aria-hidden="true">
                                        {item.month.slice(0, 3)}
                                    </span>
                                    <span className="row-dot" aria-hidden="true" />
                                    <span className="row-title">{item.title}</span>{' '}
                                    <span className="row-type">{item.type}</span>
                                    <span className="visually-hidden">
                                        , {item.month} {item.year}
                                    </span>
                                </button>
                                {/* The card's text, kept in the page's HTML for search engines
                                    and for printing; hidden on screen. */}
                                <div className="row-details" hidden>
                                    <p>{item.line}</p>
                                    <ul>
                                        {item.facts.map(([label, value]) => (
                                            <li key={label}>
                                                {label}: {value}
                                            </li>
                                        ))}
                                        {item.links.map((link) => (
                                            <li key={link.label}>
                                                <a href={link.href}>{link.label}</a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </li>
                        );
                    })}
                </ol>
                <figcaption id="work-caption">Figure 1: Things I’ve made so far.</figcaption>
            </figure>
            <InfoCard index={active} onStep={step} onClose={onClose} />
        </>
    );
};

export default Work;
