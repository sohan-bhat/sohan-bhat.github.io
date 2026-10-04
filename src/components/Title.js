import React, { useEffect, useState } from 'react';
import { MONTHS, PROFILE } from '../content';
import '../styles/Title.css';

// LaTeX's \today: the date the page is read. It's filled in after the page
// loads, so the prerendered HTML matches the first render.
const Today = () => {
    const [today, setToday] = useState(null);

    useEffect(() => setToday(new Date()), []);

    if (!today) return <p className="title-date">{' '}</p>;
    const iso = [today.getFullYear(), today.getMonth() + 1, today.getDate()].map((n) => String(n).padStart(2, '0')).join('-');
    return (
        <p className="title-date">
            <time dateTime={iso}>
                {MONTHS[today.getMonth()]} {today.getDate()}, {today.getFullYear()}
            </time>
        </p>
    );
};

// The title block of a paper: name, affiliation, date, and a one-line
// abstract, whose footnote is at the foot of the page (see App).
const Title = () => (
    <section className="title-block" aria-labelledby="name">
        <div className="portrait">
            <img
                src="/imgs/sohan-320.webp"
                srcSet="/imgs/sohan-320.webp 320w, /imgs/sohan-600.webp 600w"
                sizes="96px"
                width="96"
                height="96"
                alt="Sohan Bhat"
                fetchPriority="high"
            />
        </div>
        <h1 className="title-name" id="name">
            {PROFILE.name}
        </h1>
        <p className="title-place">
            {PROFILE.school}, {PROFILE.location}
        </p>
        <Today />
        <div className="abstract">
            <h2 className="abstract-heading">Abstract</h2>
            <p>
                {PROFILE.line}
                <sup aria-hidden="true">1</sup>
            </p>
        </div>
    </section>
);

export default Title;
