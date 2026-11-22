import React from 'react';
import Toolbar from '../components/Toolbar';
import Footer from '../components/Footer';
import { Certificate } from '../components/Certificates';
import certificates from '../data/certificates';
import '../styles/Pages.css';

// The Certificates page: every certificate, newest first, in the same rows
// as the home page, each with the arrow that downloads its PDF.
const CertificatesPage = () => (
    <>
        <Toolbar />
        <main className="page">
            <div className="container">
                <h1 className="section-title">Certificates<span className="title-period">.</span></h1>
                <ul className="cert-list cert-page">
                    {certificates.map((c) => (
                        <Certificate key={c.id} certificate={c} download Title="h2" />
                    ))}
                </ul>
            </div>
        </main>
        <Footer />
    </>
);

export default CertificatesPage;
