import React from 'react';
import More from './More';
import certificates from '../data/certificates';
import '../styles/Certificates.css';

// A sheet of paper with a folded corner and two lines of text.
const PdfIcon = () => (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
        <path d="M14 3v5h5" />
        <path d="M9 13h6" />
        <path d="M9 17h6" />
    </svg>
);

// One certificate, a compact row: its title, then one line with who gave it
// and the year and at most two links. Verify opens the issuer's own page
// for it. The icon opens our copy of the PDF. Both open in a new tab, and a
// certificate with no issuer page has only the icon. `short` shows the
// short title where a certificate has one, to stay on one line.
export const Certificate = ({ certificate: c, short, Title = 'h3' }) => (
    <li className="cert-entry">
        <Title className="cert-title" id={`cert-${c.id}`}>
            {(short && c.short) || c.title}
        </Title>
        <p className="cert-meta">
            <span>
                {c.issuer}, {c.earned.slice(0, 4)}
            </span>
            {c.verify && (
                <a className="cert-link text-link" href={c.verify} target="_blank" rel="noreferrer" aria-label={`Verify the ${c.title.replace(/ certificate$/, '')} certificate`}>
                    Verify
                </a>
            )}
            {c.file && (
                <a
                    className="cert-pdf"
                    href={c.file}
                    target="_blank"
                    rel="noreferrer"
                    title="View certificate PDF"
                    aria-label="View certificate PDF"
                    aria-describedby={`cert-${c.id}`}
                >
                    <PdfIcon />
                </a>
            )}
        </p>
    </li>
);

// Certificates on the home page, in the intro under my photo: the three
// marked `home`, newest first. The View all link at the end of the heading's
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
                    <Certificate key={c.id} certificate={c} short />
                ))}
        </ul>
        <More href="/certificates/" place="foot" rest="certificates">
            View all
        </More>
    </div>
);

export default Certificates;
