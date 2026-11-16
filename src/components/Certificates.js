import React from 'react';
import certificates from '../data/certificates';
import '../styles/Certificates.css';

// Certificates, in the intro under About. Each one links to the issuer's
// own page for it. The list is src/data/certificates.js.
const Certificates = () => (
    <div className="hero-certs" id="certificates">
        <h2 className="section-title">Certificates<span className="title-period">.</span></h2>
        <ul className="cert-list">
            {certificates.map((c) => (
                <li className="cert-entry" key={c.id}>
                    <h3 className="cert-title">{c.title}</h3>
                    <p className="cert-meta">
                        <span>{c.issuer}, {c.year}</span>
                        <a className="cert-link text-link" href={c.url} target="_blank" rel="noreferrer">
                            Certificate
                        </a>
                    </p>
                </li>
            ))}
        </ul>
    </div>
);

export default Certificates;
