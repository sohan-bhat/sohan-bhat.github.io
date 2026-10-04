import React from 'react';
import SideNav from './components/SideNav';
import Header from './components/Header';
import About from './components/About';
import Projects from './components/Projects';
import Robotics from './components/Robotics';
import Footer from './components/Footer';
import './styles/App.css';

function App() {
    return (
        <div className="App">
            <SideNav />
            <Header />
            <About />
            <Projects />
            <Robotics />
            <Footer />
        </div>
    );
}

export default App;
