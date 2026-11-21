import React from 'react';
import Toolbar from '../components/Toolbar';
import Header from '../components/Header';
import Projects from '../components/Projects';
import WriteUps from '../components/WriteUps';
import Robotics from '../components/Robotics';
import Footer from '../components/Footer';

// The home page: the intro, then a short look at each part of the work.
// Each part has its own page that shows it in full.
const Home = () => (
    <>
        <Toolbar />
        <Header />
        <Projects />
        <WriteUps />
        <Robotics />
        <Footer />
    </>
);

export default Home;
