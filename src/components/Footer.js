import React from 'react';
import Contact from './Contact';
import '../styles/Footer.css';

const Footer = () => (
    <footer className="footer">
        <div className="container footer-inner">
            <p className="footer-name" suppressHydrationWarning>© {new Date().getFullYear()} Sohan Bhat</p>
            <Contact />
        </div>
    </footer>
);

export default Footer;
