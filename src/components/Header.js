import React from 'react';
import Contact from './Contact';
import '../styles/Header.css';

// The intro: who I am in one line, the contact links in one row, and the
// photo beside them (above the name on phones).
const Header = () => (
    <header className="header" id="intro">
        <div className="container hero">
            <div className="hero-text">
                <p className="hero-hi">hey, I'm</p>
                <h1 className="title">Sohan Bhat</h1>
                <p className="subtitle">
                    I'm 15 and a sophomore in Frisco, Texas. I build neural networks,
                    web apps, and robots.
                </p>
                <Contact cv />
            </div>

            <img
                className="hero-photo"
                src="/imgs/sohan-320.webp"
                srcSet="/imgs/sohan-320.webp 320w, /imgs/sohan-600.webp 600w, /imgs/sohan-1200.webp 1200w"
                sizes="(max-width: 640px) 112px, 200px"
                width="200"
                height="200"
                fetchPriority="high"
                alt="Sohan Bhat in the Rocky Mountains"
            />
        </div>
    </header>
);

export default Header;
