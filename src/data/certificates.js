// Certificates, newest first. `file` is a copy of the PDF in
// public/certificates. A certificate is shown one of two ways.
// With `verify`: the Certificate link opens the PDF, and a Verify link opens
// `verify`, the issuer's own page that proves it.
// With `url`: the Certificate link opens `url`, the issuer's own page, and a
// small arrow beside it downloads the PDF, in case that page goes away.
// `issuer` is left out where the title already names it. To add one, add an
// entry here and a hasCredential item in public/index.html.
const certificates = [
    {
        // The short link printed on the PDF, credly.com/go/hd9cOLz8, opens
        // this badge's print view. This is the badge's public page.
        id: 'mongodb-associate-developer',
        title: 'MongoDB Associate Developer',
        year: '2026',
        verify: 'https://www.credly.com/badges/df80f06d-b947-453b-a4fd-e84cfaaa677a',
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
