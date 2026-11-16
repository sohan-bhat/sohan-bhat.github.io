import React from 'react';
import certificates from '../data/certificates';
import '../styles/Certificates.css';

// Certificates, in their own section after Robotics so the list can grow
// without pushing Projects down. Each one links to the issuer's own page for
// it. The list is src/data/certificates.js.
const Certificates = () => (
    <section className="certificates" id="certificates">
        <div className="container">
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
    </section>
);

export default Certificates;
