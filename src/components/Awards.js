import React from 'react';
import seasons, { team } from '../data/awards';
import '../styles/Awards.css';

// Awards on the Honors page: the team's awards season by season, newest
// first. A season is its winner's banner, the year, and one row for each
// award with the event at the row's end. The team and a link to its record
// sit beside the heading, and the 2026 robot is in the right column. The
// list is src/data/awards.js.
const Awards = () => (
    <section className="page-group awards" id="awards">
        <div className="awards-head">
            <h2 className="section-title">Awards</h2>
            <p className="awards-team">
                <span>{team.name}</span>
                <a className="text-link" href={team.href} target="_blank" rel="noreferrer" aria-label={`Verify the awards of ${team.name} on The Blue Alliance`}>
                    Verify
                </a>
            </p>
        </div>

        <div className="awards-body">
            <ul className="award-seasons">
                {seasons.map((season) => (
                    <li className="award-season" key={season.year}>
                        <img
                            className="award-banner"
                            src={`/imgs/banner-${season.banner}-560.webp`}
                            width="560"
                            height="780"
                            alt={`The blue banner for winning the ${season.year} ${season.awards[0].event}`}
                            decoding="async"
                        />
                        <div>
                            <h3 className="award-year">{season.year}</h3>
                            <ul className="award-list">
                                {season.awards.map((award) => (
                                    <li key={`${award.name} ${award.event}`}>
                                        <span className="award-name">{award.name}</span>
                                        <span className="award-event">{award.event}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </li>
                ))}
            </ul>

            <img
                className="awards-photo"
                src="/imgs/robot-rebuilt-540.webp"
                srcSet="/imgs/robot-rebuilt-540.webp 540w, /imgs/robot-rebuilt-1080.webp 1080w"
                sizes="(max-width: 700px) calc(100vw - 3rem), 270px"
                width="1080"
                height="1020"
                alt="Team 2714’s 2026 robot on the REBUILT field"
                decoding="async"
            />
        </div>
    </section>
);

export default Awards;
