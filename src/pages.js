import { matchPath } from 'react-router';
import Header from './components/Header';
import Projects from './components/Projects';
import Robotics from './components/Robotics';

export const SITE = 'https://sohanbhat.me';

export const pages = [
    {
        path: '/',
        label: 'Home',
        title: 'Sohan Bhat',
        description: '15-year-old building ML research, agent tools and FRC robots.',
        Content: Header,
    },
    {
        path: '/projects/',
        label: 'Projects',
        title: 'Projects, Sohan Bhat',
        description: 'Sohan Bhat’s projects, newest first.',
        Content: Projects,
    },
    {
        path: '/robotics/',
        label: 'Robotics',
        title: 'Robotics, Sohan Bhat',
        description: 'Sohan Bhat writes Java for FRC Team 2714 and Team 2728.',
        Content: Robotics,
    },
];

export const missing = {
    title: 'Page not found, Sohan Bhat',
};

export const pageAt = (pathname) => {
    const path = pathname.replace(/\/index\.html$/, '/');
    return pages.find((page) => matchPath({ path: page.path, caseSensitive: true, end: true }, path));
};
