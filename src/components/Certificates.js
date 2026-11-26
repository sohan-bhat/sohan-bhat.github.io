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

// The home page's certificates: the newest five of those not kept to the
// Honors page.
const onHome = certificates.filter((c) => c.home !== false).slice(0, 5);

// A certificate's words: its title, then one line with who gave it and the
// year and at most two links. Verify opens the issuer's own page for it. The
// icon opens our copy of the PDF. Both open in a new tab, and a certificate
// with no issuer page has only the icon. `short` shows the short title
// where a certificate has one, to stay on one line.
const Words = ({ certificate: c, short, Title }) => (
    <>
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
    </>
);

// One certificate as a compact row, as on the home page.
export const Certificate = ({ certificate, short, Title = 'h3' }) => (
    <li className="cert-entry">
        <Words certificate={certificate} short={short} Title={Title} />
    </li>
);

// One certificate in the Honors page's gallery: a picture of it in a frame,
// every frame the same shape, and its row underneath. `eager` is for the
// pictures a visitor sees first; the rest load when scrolled to.
export const CertificateShot = ({ certificate: c, eager }) => (
    <li className="cert-shot">
        <div className="cert-frame">
            <img
                src={`/imgs/cert-${c.id}-1120.webp`}
                srcSet={`/imgs/cert-${c.id}-560.webp 560w, /imgs/cert-${c.id}-1120.webp 1120w`}
                sizes="(max-width: 700px) 92vw, 462px"
                width={c.picture[0]}
                height={c.picture[1]}
                alt={`${c.title.replace(/ certificate$/, '')} certificate from ${c.issuer}`}
                loading={eager ? 'eager' : 'lazy'}
                decoding="async"
            />
        </div>
        <div className="cert-entry">
            <Words certificate={c} Title="h2" />
        </div>
    </li>
);

// Certificates on the home page, in the intro under my photo. The View all
// link at the end of the heading's row opens the Honors page, which has
// every one with its picture. The list is src/data/certificates.js.
const Certificates = () => (
    <div className="hero-certs" id="certificates">
        <div className="section-head">
            <h2 className="section-title">Certificates</h2>
            <More href="/honors/" place="head" rest="certificates">
                View all
            </More>
        </div>
        <ul className="cert-list">
            {onHome.map((c) => (
                <Certificate key={c.id} certificate={c} short />
            ))}
        </ul>
        <More href="/honors/" place="foot" rest="certificates">
            View all
        </More>
    </div>
);

export default Certificates;
