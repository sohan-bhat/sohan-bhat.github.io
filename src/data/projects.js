// What Work shows.
// `work` is the rows, in the order they appear. Each has a title, one line of
// text, its links and a picture. A row with a `titleUrl` has its title link
// there. `team` lists the people a project was built with; each is credited
// as @name after the line, linked to their profile. `image` names the
// card-<image>-560 and -1120 pictures in public/imgs, 16:10: an overview of
// the project's site or, for the paper, a figure from it.
// `earlier` is the older projects, named in one line under the rows, each
// linked to its site.
export const work = [
    {
        id: 'lhd',
        title: 'LHD, early detection of silent training failures in neural networks',
        titleUrl: '/write-ups/lhd/',
        line: 'Caught 87% of broken training runs, usually by epoch 3, with 2% false alarms.',
        links: [{ label: 'Read the paper', url: '/lhd-paper.pdf' }],
        image: 'lhd',
        alt: 'A chart from the paper. LHD has flagged 75% of the broken runs by epoch 3 and 84% by the end, and the accuracy curve 26%.',
    },
    {
        id: 'openhal',
        title: 'OpenHAL',
        line: 'Lets AI agents control hardware',
        links: [
            { label: 'Site', url: 'https://sohanbhat.me/OpenHAL/' },
            { label: 'Code', url: 'https://github.com/sohan-bhat/OpenHAL' },
        ],
        image: 'openhal',
        alt: 'OpenHAL’s site, its name above a one-line install command.',
    },
    {
        id: 'wobbl',
        title: 'wobbl',
        line: 'Physics simulation for hobbyists up to elite engineers',
        links: [
            { label: 'Site', url: 'https://sohanbhat.me/wobbl/' },
            { label: 'Code', url: 'https://github.com/sohan-bhat/wobbl' },
            { label: 'Video', url: 'https://www.youtube.com/watch?v=RtCNKbhABqE' },
        ],
        image: 'wobbl',
        alt: 'Wobbl’s site, “Simulate anything before you build it,” beside a 3D bracket colored by stress.',
    },
    {
        id: 'oopsy',
        title: 'oopsy',
        line: 'Undo for rm -rf, git and database mistakes',
        links: [
            { label: 'Site', url: 'https://sohanbhat.me/oopsy/' },
            { label: 'Code', url: 'https://github.com/sohan-bhat/oopsy' },
            { label: 'Video', url: 'https://youtu.be/Krh9cU08rIg' },
        ],
        image: 'oopsy',
        alt: 'Oopsy’s site, “Undo for rm -rf,” beside a terminal you can try in the browser.',
    },
    {
        id: 'hullo',
        title: 'hullo',
        line: 'What NASA left in space',
        team: [
            { name: 'Manas Agarwal', url: 'https://www.linkedin.com/in/manas-agarwal-610201322' },
            { name: 'Shiven Garisa', url: 'https://www.linkedin.com/in/shiven-garisa-2b10b0286' },
        ],
        links: [{ label: 'Site', url: 'https://sayhullo.netlify.app/' }],
        image: 'hullo',
        alt: 'Hullo’s site, “NASA left hardware across the solar system,” beside the Earth rising over the Moon.',
    },
];

export const earlier = [
    {
        title: 'taro',
        url: 'https://trytaro.vercel.app',
    },
    {
        title: 'signnet',
        url: 'https://sohanbhat.me/signnet/',
    },
    {
        title: 'ensemble',
        url: 'https://ensemble-qnd2.onrender.com',
    },
    {
        title: 'VacantCourt',
        url: 'https://vacantcourt.netlify.app',
    },
    {
        title: 'mochi',
        url: 'https://trymochi.netlify.app',
    },
    {
        title: 'CareerAI',
        url: 'https://careerai.netlify.app',
    },
];
