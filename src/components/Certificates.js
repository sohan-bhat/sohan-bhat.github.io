import React from 'react';
import certificates from '../data/certificates';
import '../styles/Certificates.css';

// Certificates, in the intro under my photo, beside the write-ups. Each one
// links to the issuer's own page for it, and the small arrow beside the link
// downloads our own copy of the PDF. The list is src/data/certificates.js.

// An arrow dropping into a tray.
const DownloadIcon = () => (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 3v12" />
        <path d="M7 10l5 5 5-5" />
        <path d="M4 15v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4" />
    </svg>
);

const Certificates = () => (
    <div className="hero-certs" id="certificates">
        <h2 className="section-title">Certificates<span className="title-period">.</span></h2>
        <ul className="cert-list">
            {certificates.map((c) => (
                <li className="cert-entry" key={c.id}>
                    <h3 className="cert-title">{c.title}</h3>
                    <p className="cert-meta">
                        <span>{[c.issuer, c.year].filter(Boolean).join(', ')}</span>
                        {/* The links stay together: where the row has no room
                            for them, all of them go to the next line. */}
                        <span className="cert-links">
                        <a className="cert-link text-link" href={c.verify ? c.file : c.url} target="_blank" rel="noreferrer">
                            Certificate
                        </a>
                        {c.verify && (
                            <a
                                className="cert-link text-link"
                                href={c.verify}
                                target="_blank"
                                rel="noreferrer"
                                aria-label={`Verify the ${c.title} certificate`}
                            >
                                Verify
                            </a>
                        )}
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
                        </span>
                    </p>
                </li>
            ))}
        </ul>
    </div>
);

export default Certificates;
