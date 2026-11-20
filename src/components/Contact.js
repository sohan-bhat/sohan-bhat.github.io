import React from 'react';

// The contact links, one row of plain text links: the email address, then
// GitHub, X and Instagram, then the CV where it is asked for. The intro and
// the footer both use it, so they always match.
const Contact = ({ cv = false }) => (
    <p className="contact">
        <a href="mailto:sohanrambhat@gmail.com">sohanrambhat@gmail.com</a>
        <a href="https://github.com/sohan-bhat" target="_blank" rel="me noreferrer" aria-label="Sohan on GitHub">
            GitHub
        </a>
        <a href="https://x.com/The_Sohan_Bhat" target="_blank" rel="me noreferrer" aria-label="Sohan on X">
            X
        </a>
        <a href="https://www.instagram.com/thesohanbhat" target="_blank" rel="me noreferrer" aria-label="Sohan on Instagram">
            Instagram
        </a>
        {cv && (
            <a href="/sohan-bhat-cv.pdf" target="_blank" rel="noreferrer">
                CV
            </a>
        )}
    </p>
);

export default Contact;
