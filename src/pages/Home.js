import React from 'react';
import Toolbar from '../components/Toolbar';
import Header from '../components/Header';
import Projects from '../components/Projects';
import Robotics from '../components/Robotics';
import Footer from '../components/Footer';

// The home page: the intro, with the write-ups and certificates in it, then
// a short look at the projects and the robotics. Each part has its own page
// that shows it in full.
const Home = () => (
    <>
        <Toolbar />
        <Header />
        <Projects />
        <Robotics />
        <Footer />
    </>
);

export default Home;
