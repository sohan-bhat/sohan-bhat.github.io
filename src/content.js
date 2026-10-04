// Everything the page shows, in one place.

export const PROFILE = {
    name: 'Sohan Bhat',
    line: 'I’m 15 and I build neural networks from scratch, web apps, and robots.',
    school: 'Heritage High School',
    location: 'Frisco, Texas',
    // Footnote 1, to the line above.
    aside: 'Also training for USACO Gold in C++. Off-screen: soccer, tennis, and hiking with my family.',
};

export const LINKS = [
    { label: 'GitHub', href: 'https://github.com/sohan-bhat' },
    { label: 'X', href: 'https://x.com/The_Sohan_Bhat' },
    { label: 'Instagram', href: 'https://www.instagram.com/thesohanbhat' },
    { label: 'Email', href: 'mailto:sohanrambhat@gmail.com' },
];

// `date` is the month each project started (for the paper, the month it was
// finished); the list is sorted by it, newest first. Rows show the date, title,
// and type; the rest appears in the card that opens from a row. `facts` are
// short label/value pairs.
const WORK_LIST = [
    {
        id: 'halt',
        title: 'HALT',
        type: 'Paper',
        date: '2026-09',
        line: 'The network trains, the loss falls, and the model is still wrong. A paper on catching that early.',
        facts: [['Origin', 'A SignNet bug that cost weeks']],
        links: [{ label: 'Paper', href: 'https://docs.google.com/document/d/1m9FRd58Kw7oxOFHpu17VgfbktLi-XrZAXAe1FFqH_d8/preview' }],
        media: { src: 'card-halt', alt: 'The first page of the paper, “Early Detection of Silent Training Failures in Neural Networks.”' },
    },
    {
        id: 'taro',
        title: 'Taro',
        type: 'Meeting agent',
        date: '2026-08',
        line: 'Joins Google Meet, listens for “Hey Taro,” then posts to Slack, files GitHub issues, and keeps to-do lists.',
        facts: [['Stack', 'TypeScript · Next.js · Gemini']],
        links: [
            { label: 'Demo', href: 'https://trytaro.vercel.app/demo' },
            { label: 'Code', href: 'https://github.com/sohan-bhat/Taro' },
        ],
        media: { src: 'card-taro', alt: 'Taro’s activation page: “Say it in the meeting. Done before you hang up.”' },
    },
    {
        id: 'signnet',
        title: 'SignNet',
        type: 'Neural net',
        date: '2026-06',
        line: 'A convolutional neural network that sorts German traffic signs, written in pure NumPy, backpropagation included.',
        facts: [
            ['Result', '90.06% test accuracy on 43 sign classes'],
            ['Stack', 'Python · NumPy · React'],
        ],
        links: [
            { label: 'Live', href: 'https://signnet-cnn.netlify.app' },
            { label: 'Code', href: 'https://github.com/sohan-bhat/signnet' },
        ],
        media: { src: 'card-signnet', alt: 'SignNet’s demo page, “Traffic sign classification, built from scratch,” with its test accuracy.' },
    },
    {
        id: 'ensemble',
        title: 'Ensemble',
        type: 'Web app',
        date: '2026-02',
        line: 'An r/place for music: one orchestral score the whole world writes, note by note.',
        facts: [['Stack', 'React · Express · VexFlow']],
        links: [
            { label: 'Live', href: 'https://ensemble-qnd2.onrender.com' },
            { label: 'Code', href: 'https://github.com/sohan-bhat/ensemble' },
        ],
        media: { src: 'card-ensemble', alt: 'Ensemble’s shared score for violins, viola, cello, and bass.' },
    },
    {
        id: 'frc',
        title: 'FRC 2714',
        type: 'Robot',
        date: '2025-01',
        span: '2025 and 2026 seasons',
        line: 'Java for Team 2714’s robot: autonomous routines and Limelight vision.',
        facts: [['Result', 'Fort Worth District winners, 2025 and 2026']],
        links: [{ label: 'The Blue Alliance', href: 'https://www.thebluealliance.com/team/2714' }],
        media: {
            pair: [
                { src: 'robot-2026-sq', label: '2026, Rebuilt', alt: 'Team 2714’s 2026 robot.' },
                { src: 'robot-2025-sq', label: '2025, Reefscape', alt: 'Team 2714’s 2025 robot.' },
            ],
        },
    },
    {
        id: 'vacantcourt',
        title: 'VacantCourt',
        type: 'Android + web',
        date: '2025-03',
        line: 'A phone at the court spots players with an on-device model; the website shows which courts are free.',
        facts: [['Stack', 'Kotlin · TensorFlow Lite · React']],
        links: [
            { label: 'Live', href: 'https://vacantcourt.netlify.app' },
            { label: 'App code', href: 'https://github.com/sohan-bhat/VacantCourtApp' },
            { label: 'Web code', href: 'https://github.com/sohan-bhat/VacantCourt' },
        ],
        media: { src: 'card-vacantcourt', alt: 'VacantCourt’s home page above a camera feed that boxes each player on the court.' },
    },
    {
        id: 'mochi',
        title: 'Mochi',
        type: 'Web app',
        date: '2024-07',
        line: 'Recipes from just the ingredients you already have.',
        facts: [['Stack', 'React · Node.js · Groq']],
        links: [
            { label: 'Live', href: 'https://trymochi.netlify.app' },
            { label: 'Code', href: 'https://github.com/sohan-bhat/Mochi' },
        ],
        media: { src: 'card-mochi', alt: 'Mochi’s home page: “Turn what you have into what you’ll cook tonight.”' },
    },
    {
        id: 'career-ai',
        title: 'Career AI',
        type: 'Web app',
        date: '2024-06',
        line: 'Career ideas from your interests, suggested by a personalized AI.',
        facts: [
            ['Status', 'Retired'],
            ['Stack', 'React · Node.js · Groq'],
        ],
        links: [
            { label: 'Live', href: 'https://careerai.netlify.app' },
            { label: 'Code', href: 'https://github.com/sohan-bhat/CareerAI' },
        ],
        media: { src: 'card-careerai', alt: 'Career AI suggesting careers from a list of interests.' },
    },
];

export const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export const WORK = [...WORK_LIST]
    .sort((a, b) => b.date.localeCompare(a.date))
    .map((item) => {
        const [year, month] = item.date.split('-');
        return { ...item, year, month: MONTHS[Number(month) - 1] };
    });
