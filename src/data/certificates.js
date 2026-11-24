// Certificates. `earned` is when each was earned, and lists are newest
// first, so a new one slots in by its date. The home page shows the newest
// five and the Honors page shows them all, each with its picture.
// `verify` is the issuer's own page for a certificate, the Verify link.
// `file` is a copy of the PDF in public/certificates, opened by the icon.
// One with no issuer page has only the icon. `short` is the title the home
// page uses where the full one does not fit its column on one line.
// `picture` is the width and height of the PDF's first page as a picture,
// which is public/imgs/cert-<id>-1120.webp with a 560 wide copy beside it.
// To add one, add an entry here, its two pictures, and a hasCredential item
// in public/index.html.
const certificates = [
    {
        id: 'neo4j-certified-professional',
        title: 'Neo4j Certified Professional',
        issuer: 'Neo4j',
        earned: '2026-11-22',
        verify: 'https://graphacademy.neo4j.com/c/1304f850-b3ee-4c30-a534-5a1ef7956841',
        file: '/certificates/neo4j-certified-professional.pdf',
        picture: [1120, 588],
    },
    {
        id: 'hackerrank-software-engineer',
        title: 'HackerRank Software Engineer certificate',
        short: 'Software Engineer',
        issuer: 'HackerRank',
        earned: '2026-11-21',
        verify: 'https://www.hackerrank.com/certificates/afa5ebe6b947',
        file: '/certificates/hackerrank-software-engineer.pdf',
        picture: [1120, 853],
    },
    {
        id: 'hackerrank-problem-solving-intermediate',
        title: 'Problem Solving (Intermediate)',
        short: 'Problem Solving',
        issuer: 'HackerRank',
        earned: '2026-11-21',
        verify: 'https://www.hackerrank.com/certificates/ed6512f46484',
        file: '/certificates/hackerrank-problem-solving-intermediate.pdf',
        picture: [1120, 853],
    },
    {
        // The short link printed on the PDF, credly.com/go/hd9cOLz8, opens
        // this badge's print view. This is the badge's public page.
        id: 'mongodb-associate-developer',
        title: 'MongoDB Associate Developer',
        issuer: 'MongoDB',
        earned: '2026-11-20',
        verify: 'https://www.credly.com/badges/df80f06d-b947-453b-a4fd-e84cfaaa677a',
        file: '/certificates/mongodb-associate-developer.pdf',
        picture: [1120, 865],
    },
    {
        id: 'cs50x',
        title: 'CS50x, Introduction to Computer Science',
        // The home page's column fits this on one line; Harvard is under it.
        short: 'CS50x',
        issuer: 'Harvard',
        earned: '2026-11-15',
        verify: 'https://cs50.harvard.edu/certificates/c745d590-91f5-4cb1-8738-9e5aeda49f3b',
        file: '/certificates/cs50x.pdf',
        picture: [1120, 865],
    },
];

// Newest first.
export default [...certificates].sort((a, b) => b.earned.localeCompare(a.earned));
