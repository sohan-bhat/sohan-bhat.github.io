import React from 'react';
import Toolbar from '../components/Toolbar';
import Footer from '../components/Footer';
import builds from '../data/robotics';
import '../styles/Cards.css';
import '../styles/Pages.css';

// The Robotics page: everything I built and the robots, team by team, so a
// team is named once and not under every picture. Each is its picture, its
// title with the link to its code beside it, what I did where there is
// something to say, and the season.
const teams = [...new Set(builds.map((build) => build.team))].sort();
// The first picture on the page is what loads first, so it is not lazy.
const first = builds.find((build) => build.team === teams[0]);

const Build = ({ build }) => (
    <li className="show">
        <img
            className={`show-shot${build.photo ? ' show-photo' : ''}`}
            src={build.src}
            srcSet={build.srcSet}
            sizes={build.srcSet ? '(max-width: 760px) calc(100vw - 3rem), (max-width: 1000px) 44vw, 430px' : undefined}
            width={build.photo ? build.size[0] : 560}
            height={build.photo ? build.size[1] : 350}
            alt={build.alt}
            loading={build === first ? 'eager' : 'lazy'}
            fetchPriority={build === first ? 'high' : undefined}
            decoding="async"
        />
        <div className="show-body">
            <div className="show-head">
                <h3 className="show-title">{build.title}</h3>
                {build.link && (
                    <a className="show-aside text-link" href={build.link.href} target="_blank" rel="noreferrer" aria-label={build.link.name}>
                        {build.link.label}
                    </a>
                )}
            </div>
            {build.fact && <p className="show-line">{build.fact}</p>}
            <p className="show-facts">
                <span>{build.year}</span>
            </p>
        </div>
    </li>
);

const RoboticsPage = () => (
    <>
        <Toolbar current="robotics" />
        <main className="page">
            <div className="container">
                <h1 className="section-title">Robotics<span className="title-period">.</span></h1>

                {teams.map((team) => (
                    <section className="page-group" key={team}>
                        <h2 className="section-title">
                            Team {team}
                            <span className="title-period">.</span>
                        </h2>
                        <ul className="shows">
                            {builds
                                .filter((build) => build.team === team)
                                .map((build) => (
                                    <Build key={build.title} build={build} />
                                ))}
                        </ul>
                    </section>
                ))}
            </div>
        </main>
        <Footer />
    </>
);

export default RoboticsPage;
