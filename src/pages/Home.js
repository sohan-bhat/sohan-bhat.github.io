import React from 'react';
import Toolbar from '../components/Toolbar';
import Header from '../components/Header';
import WriteUps from '../components/WriteUps';
import Certificates from '../components/Certificates';
import Projects from '../components/Projects';
import Robotics from '../components/Robotics';
import Footer from '../components/Footer';

// The home page: the intro, the write-ups beside the certificates, then a
// short look at the projects and the robotics. Each part has its own page
// that shows it in full.
//
// On a phone the order is different, set in src/styles/Header.css: the
// projects come straight after the intro, so pictures of the work are the
// first thing under the name, then the write-ups, the robotics and the
// certificates, a block of words between two blocks of pictures.
const Home = () => (
    <>
        <Toolbar />
        <Header />
        <div className="container intro-more">
            <WriteUps />
            <Certificates />
        </div>
        <Projects />
        <Robotics />
        <Footer />
    </>
);

export default Home;
