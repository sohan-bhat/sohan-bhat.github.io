import React from 'react';
import certificates from '../data/certificates';
import '../styles/Rows.css';
import '../styles/Certificates.css';

// Certificates, a list in the same style as the rows of Work, without the
// pictures: the title, who gave it and when, then the link to the issuer's
// own page for it. The small arrow beside the link downloads our own copy of
// the PDF. The list is src/data/certificates.js.

// An arrow dropping into a tray.
const DownloadIcon = () => (
    <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 3v12" />
        <path d="M7 10l5 5 5-5" />
        <path d="M4 15v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4" />
    </svg>
);

const Certificates = () => (
    <section className="certificates" id="certificates">
        <div className="container">
            <h2 className="section-title">Certificates<span className="title-period">.</span></h2>
            <ul className="cert-list">
                {certificates.map((c) => (
                    <li key={c.id}>
                        <h3 className="row-title">{c.title}</h3>
                        <p className="row-note">
                            {c.issuer}, {c.year}
                        </p>
                        <p className="row-links">
                            <a href={c.url} target="_blank" rel="noreferrer">
                                Certificate
                            </a>
                            {c.file && (
                                <a
                                    className="cert-download"
                                    href={c.file}
                                    download
                                    title="Download the PDF"
                                    aria-label={`Download the ${c.title} certificate as a PDF`}
                                >
                                    <DownloadIcon />
                                </a>
                            )}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    </section>
);

export default Certificates;
