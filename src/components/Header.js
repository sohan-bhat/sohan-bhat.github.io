import React from 'react';
import { FaGithub, FaXTwitter, FaInstagram } from 'react-icons/fa6';
import '../styles/Header.css';

// The intro: the name, a line about me and the links, beside my photo.
// Write-ups and Certificates follow it in src/pages/Home.js.
const Header = () => (
    <header className="header" id="intro">
        <div className="container hero-layout">
            <div className="hero-text">
                <h1 className="title">Sohan Bhat</h1>
                <p className="subtitle">
                    I'm 15 and a sophomore in Frisco, Texas. I build neural networks,
                    web apps, and robots.
                </p>

                <div className="social-links">
                    <a
                        href="mailto:sohanrambhat@gmail.com"
                        className="social-email text-link"
                    >
                        sohanrambhat@gmail.com
                    </a>
                    <a
                        href="https://github.com/sohan-bhat"
                        target="_blank"
                        rel="me noreferrer"
                        className="social-link"
                        aria-label="Sohan on GitHub"
                    >
                        <FaGithub />
                    </a>
                    <a
                        href="https://x.com/The_Sohan_Bhat"
                        target="_blank"
                        rel="me noreferrer"
                        className="social-link"
                        aria-label="Sohan on X"
                    >
                        <FaXTwitter />
                    </a>
                    <a
                        href="https://www.instagram.com/thesohanbhat"
                        target="_blank"
                        rel="me noreferrer"
                        className="social-link"
                        aria-label="Sohan on Instagram"
                    >
                        <FaInstagram />
                    </a>
                    <a className="hero-cv" href="/sohan-bhat-cv.pdf" target="_blank" rel="noreferrer">
                        CV
                    </a>
                </div>
            </div>

            <img
                className="hero-photo"
                src="/imgs/sohan-320.webp"
                srcSet="/imgs/sohan-320.webp 320w, /imgs/sohan-600.webp 600w, /imgs/sohan-1200.webp 1200w"
                sizes="(max-width: 600px) 112px, 270px"
                width="230"
                height="230"
                fetchPriority="high"
                alt="Sohan Bhat in the Rocky Mountains"
            />

        </div>
    </header>
);

export default Header;
