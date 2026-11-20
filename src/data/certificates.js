// Certificates, newest first. `url` is the issuer's own page for the
// certificate, so the link is the proof. `file` is a copy of the PDF in
// public/certificates, offered as a download in case the issuer's page goes
// away. To add one, add an entry here.
const certificates = [
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
