import React from 'react';
import { LINKS } from '../content';
import Logo from './Logo';
import '../styles/Header.css';

// The letterhead: the mark on the left, where to find Sohan on the right.
const Header = () => (
    <header className="letterhead">
        <a className="logo" href="#top" aria-label="Sohan Bhat, back to top">
            <Logo />
        </a>
        <ul className="contact">
            {LINKS.map(({ label, href }) => {
                const external = !href.startsWith('mailto:');
                return (
                    <li key={label}>
                        <a href={href} target={external ? '_blank' : undefined} rel={external ? 'me noreferrer' : undefined}>
                            {label}
                        </a>
                    </li>
                );
            })}
        </ul>
    </header>
);

export default Header;
