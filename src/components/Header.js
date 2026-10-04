import React from 'react';
import { FaGithub, FaXTwitter, FaInstagram } from 'react-icons/fa6';
import '../styles/Header.css';

const Header = () => (
    <header className="header" id="intro">
        <div className="container hero-layout">
            <div className="hero-text">
                <p className="hero-hi">hey, I'm</p>
                <h1 className="title">Sohan Bhat</h1>
                <p className="subtitle">
                    I build neural networks from scratch, web apps, and robots.
                </p>

                <div className="social-links">
                    <a
                        href="mailto:sohanrambhat@gmail.com"
                        className="social-email"
                    >
                        sohanrambhat@gmail.com
                    </a>
                    <a
                        href="https://github.com/sohan-bhat"
                        target="_blank"
                        rel="noreferrer"
                        className="social-link"
                        aria-label="GitHub"
                    >
                        <FaGithub />
                    </a>
                    <a
                        href="https://x.com/The_Sohan_Bhat"
                        target="_blank"
                        rel="noreferrer"
                        className="social-link"
                        aria-label="X"
                    >
                        <FaXTwitter />
                    </a>
                    <a
                        href="https://www.instagram.com/thesohanbhat"
                        target="_blank"
                        rel="noreferrer"
                        className="social-link"
                        aria-label="Instagram"
                    >
                        <FaInstagram />
                    </a>
                </div>
            </div>

            <img
                className="hero-photo"
                src="/imgs/sohan-320.webp"
                srcSet="/imgs/sohan-320.webp 320w, /imgs/sohan-600.webp 600w"
                sizes="(max-width: 600px) 150px, 230px"
                width="230"
                height="230"
                alt="Sohan Bhat in the Rocky Mountains"
            />
        </div>
    </header>
);

export default Header;
