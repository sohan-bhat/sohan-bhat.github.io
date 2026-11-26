import React from 'react';
import Toolbar from '../components/Toolbar';
import Footer from '../components/Footer';
import { CertificateShot } from '../components/Certificates';
import certificates from '../data/certificates';
import '../styles/Pages.css';

// The Honors page: every certificate, newest first, as a compact gallery
// of pictures with each one's words under it. Certificates are the only honors
// so far, so they are the page's one heading.
const HonorsPage = () => (
    <>
        <Toolbar current="honors" />
        <main className="page">
            <div className="container">
                <h1 className="section-title">Certificates</h1>
                <ul className="cert-gallery">
                    {certificates.map((c, i) => (
                        <CertificateShot key={c.id} certificate={c} eager={i < 3} />
                    ))}
                </ul>
            </div>
        </main>
        <Footer />
    </>
);

export default HonorsPage;
