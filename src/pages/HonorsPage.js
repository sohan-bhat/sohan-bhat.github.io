import React from 'react';
import Toolbar from '../components/Toolbar';
import Footer from '../components/Footer';
import Awards from '../components/Awards';
import { CertificateShot } from '../components/Certificates';
import certificates from '../data/certificates';
import '../styles/Pages.css';

// The Honors page: the team's awards, then every certificate, newest
// first, as a compact gallery of pictures with each one's words under it.
// The page's own heading is read out and indexed but not shown, since the
// toolbar already says Honors.
const HonorsPage = () => (
    <>
        <Toolbar current="honors" />
        <main className="page">
            <div className="container">
                <h1 className="visually-hidden">Honors</h1>
                <Awards />
                <section className="page-group" id="certificates">
                    <h2 className="section-title">Certificates</h2>
                    <ul className="cert-gallery">
                        {certificates.map((c, i) => (
                            <CertificateShot key={c.id} certificate={c} eager={i < 3} />
                        ))}
                    </ul>
                </section>
            </div>
        </main>
        <Footer />
    </>
);

export default HonorsPage;
