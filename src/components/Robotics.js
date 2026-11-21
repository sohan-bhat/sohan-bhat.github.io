import React from 'react';
import Card, { useOpenCard } from './Card';
import More from './More';
import builds from '../data/robotics';
import '../styles/Robotics.css';

// Robotics on the home page: the four builds marked `top`, in a row of the
// same tiles Projects uses, a picture and a title each. A tile's link
// slides up when it is pointed at or tapped. The View all robotics link at the
// end of the heading's row, and the heading itself, open the Robotics page,
// which has everything.
const top = builds.filter((build) => build.top);
const idOf = (build) => build.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

const Robotics = () => {
    const { openId, toggle, close } = useOpenCard();

    return (
        <section className="robotics" id="robotics">
            <div className="container">
                <div className="section-head">
                    <h2 className="section-title">
                        <a href="/robotics/">Robotics</a>
                        <span className="title-period">.</span>
                    </h2>
                    <More href="/robotics/" place="head">
                        View all robotics
                    </More>
                </div>

                <ul className="cards robotics-cards">
                    {top.map((build) => (
                        <Card
                            key={build.title}
                            id={idOf(build)}
                            image={{ src: build.src, srcSet: build.srcSet, sizes: '(max-width: 960px) 46vw, 217px', focus: build.focus, alt: build.alt }}
                            title={build.title}
                            about={
                                <p className="card-links">
                                    <a className="text-link" href={build.link.href} target="_blank" rel="noreferrer" aria-label={build.link.name}>
                                        {build.link.label}
                                    </a>
                                </p>
                            }
                            open={idOf(build) === openId}
                            onToggle={() => toggle(idOf(build))}
                            onClose={close}
                        />
                    ))}
                </ul>

                <More href="/robotics/" place="foot">
                    View all robotics
                </More>
            </div>
        </section>
    );
};

export default Robotics;
