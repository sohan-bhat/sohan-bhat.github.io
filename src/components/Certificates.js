import React from 'react';
import More from './More';
import certificates from '../data/certificates';
import '../styles/Certificates.css';

// An arrow dropping into a tray.
const DownloadIcon = () => (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 3v12" />
        <path d="M7 10l5 5 5-5" />
        <path d="M4 15v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4" />
    </svg>
);

// One certificate, a compact row: its title, then one line with who gave it
// and the year and a Verify link to the issuer's page that proves it (a
// Certificate link where the issuer has only a page for it). `download` adds
// the small arrow that downloads our own copy of the PDF. `short` shows the
// short title where a certificate has one, to stay on one line.
export const Certificate = ({ certificate: c, download, short, Title = 'h3' }) => (
    <li className="cert-entry">
        <Title className="cert-title">{(short && c.short) || c.title}</Title>
        <p className="cert-meta">
            <span>
                {c.issuer}, {c.earned.slice(0, 4)}
            </span>
            <a
                className="cert-link text-link"
                href={c.verify || c.url}
                target="_blank"
                rel="noreferrer"
                aria-label={c.verify ? `Verify the ${c.title} certificate` : `The ${c.title} certificate`}
            >
                {c.verify ? 'Verify' : 'Certificate'}
            </a>
            {download && c.file && (
                <a className="cert-download" href={c.file} download title="Download the PDF" aria-label={`Download the ${c.title} certificate as a PDF`}>
                    <DownloadIcon />
                </a>
            )}
        </p>
    </li>
);

// Certificates on the home page, in the intro under my photo: the three
// marked `home`, newest first, each with its download arrow. The View all link at the end of the heading's
// row, and the heading itself, open the Certificates page, which has every
// one. The list is src/data/certificates.js.
const Certificates = () => (
    <div className="hero-certs" id="certificates">
        <div className="section-head">
            <h2 className="section-title">
                <a href="/certificates/">Certificates</a>
                <span className="title-period">.</span>
            </h2>
            <More href="/certificates/" place="head" rest="certificates">
                View all
            </More>
        </div>
        <ul className="cert-list">
            {certificates
                .filter((c) => c.home)
                .map((c) => (
                    <Certificate key={c.id} certificate={c} short download />
                ))}
        </ul>
        <More href="/certificates/" place="foot" rest="certificates">
            View all
        </More>
    </div>
);

export default Certificates;
