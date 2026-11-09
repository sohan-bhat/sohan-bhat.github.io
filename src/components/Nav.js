import React from 'react';
import { Link } from 'react-router';
import { pages } from '../pages';
import '../styles/Nav.css';

const Nav = ({ current }) => (
    <nav className="nav" aria-label="Pages">
        <div className="container">
            <ul className="nav-list">
                {pages.map((page) => (
                    <li key={page.path}>
                        <Link
                            className="nav-link"
                            to={page.path}
                            aria-current={page === current ? 'page' : undefined}
                        >
                            {page.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    </nav>
);

export default Nav;
