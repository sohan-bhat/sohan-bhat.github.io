import React, { useEffect, useRef } from 'react';
import { FaGithub, FaXTwitter, FaInstagram } from 'react-icons/fa6';
import '../styles/Footer.css';

// The copyright mark, drawn: a C in a ring.
const CopyrightMark = () => (
    <svg className="footer-mark" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" aria-hidden="true">
        <circle cx="8" cy="8" r="6.6" />
        <path d="M10.2 6.2a2.9 2.9 0 1 0 0 3.6" />
    </svg>
);

// This year. The page is built ahead of time, so the year in its HTML is
// the year of the build; once the page loads, today's year replaces it.
const Year = () => {
    const year = useRef(null);
    useEffect(() => {
        year.current.textContent = new Date().getFullYear();
    }, []);
    return (
        <span ref={year} suppressHydrationWarning>
            {new Date().getFullYear()}
        </span>
    );
};

// The copyright line, then the ways to reach me: the email, the CV as a
// plain link (its button is at the top of the home page) and the icons.
const Footer = () => (
    <footer className="footer">
        <div className="container footer-inner">
            <p className="footer-name">
                <CopyrightMark />
                <span>
                    <span className="visually-hidden">Copyright </span>
                    <Year /> Sohan Bhat
                </span>
            </p>
            <div className="footer-links">
                <a href="mailto:sohanrambhat@gmail.com" className="footer-email text-link">
                    sohanrambhat@gmail.com
                </a>
                <a href="/sohan-bhat-cv.pdf" className="footer-cv text-link">
                    CV
                </a>
                <div className="footer-icons">
                    <a
                        href="https://github.com/sohan-bhat"
                        target="_blank"
                        rel="me noreferrer"
                        className="footer-icon"
                        aria-label="Sohan on GitHub"
                    >
                        <FaGithub />
                    </a>
                    <a
                        href="https://x.com/The_Sohan_Bhat"
                        target="_blank"
                        rel="me noreferrer"
                        className="footer-icon"
                        aria-label="Sohan on X"
                    >
                        <FaXTwitter />
                    </a>
                    <a
                        href="https://www.instagram.com/thesohanbhat"
                        target="_blank"
                        rel="me noreferrer"
                        className="footer-icon"
                        aria-label="Sohan on Instagram"
                    >
                        <FaInstagram />
                    </a>
                </div>
            </div>
        </div>
    </footer>
);

export default Footer;
