import Home from './Home';
import ProjectsPage from './ProjectsPage';
import WriteUpsPage from './WriteUpsPage';
import RoboticsPage from './RoboticsPage';
import HonorsPage from './HonorsPage';

// Every page of the site besides the write-ups themselves, which
// scripts/build-write-ups.js writes. Each has its address and its component, and
// every page but the home page has the title and description its HTML is
// given by scripts/prerender.js (the home page's are in public/index.html).
//
// The project sites share this domain, each at /<its repo's name>/, and a
// repo's site wins over a page here with the same address. So no repo with a
// site may be named projects, write-ups, robotics or honors.
export const pages = [
    { path: '/', Page: Home },
    {
        path: '/projects/',
        Page: ProjectsPage,
        title: 'Projects by Sohan Bhat',
        description: 'Every project by Sohan Bhat, each with a short description, the tools used and links to the site and code.',
    },
    {
        path: '/write-ups/',
        Page: WriteUpsPage,
        title: 'Write-ups by Sohan Bhat',
        description: 'Write-ups by Sohan Bhat on machine learning research and the tools I build.',
    },
    {
        path: '/robotics/',
        Page: RoboticsPage,
        title: 'Robotics by Sohan Bhat',
        description: 'What Sohan Bhat builds for FRC Team 2714 and Team 2728, with the robots and links to the code.',
    },
    {
        path: '/honors/',
        Page: HonorsPage,
        title: 'Honors of Sohan Bhat',
        description: 'Awards won by FRC Team 2714 in the 2025 and 2026 seasons, and every certificate Sohan Bhat has earned, each with a link for verification.',
    },
];

// The page for an address, with or without its closing slash. An address
// that is not a page gets the home page.
export const pageFor = (path) => {
    const address = path.replace(/index\.html$/, '').replace(/\/?$/, '/');
    return (pages.find((page) => page.path === address) || pages[0]).Page;
};
