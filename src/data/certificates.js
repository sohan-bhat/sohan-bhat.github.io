// Certificates, newest first. `url` is the issuer's own page for the
// certificate, so the link is the proof. `file` is a copy of the PDF in
// public/certificates, offered as a download in case the issuer's page goes
// away. `issuer` is left out where the title already names it. To add one,
// add an entry here and a hasCredential item in public/index.html.
const certificates = [
    {
        // The short link printed on the PDF, credly.com/go/hd9cOLz8, opens
        // this badge's print view. This is the badge's public page.
        id: 'mongodb-associate-developer',
        title: 'MongoDB Associate Developer',
        year: '2026',
        url: 'https://www.credly.com/badges/df80f06d-b947-453b-a4fd-e84cfaaa677a',
        file: '/certificates/mongodb-associate-developer.pdf',
    },
    {
        id: 'cs50x',
        title: 'CS50x, Introduction to Computer Science',
        issuer: 'Harvard',
        year: '2026',
        url: 'https://cs50.harvard.edu/certificates/c745d590-91f5-4cb1-8738-9e5aeda49f3b',
        file: '/certificates/cs50x.pdf',
    },
];

export default certificates;
