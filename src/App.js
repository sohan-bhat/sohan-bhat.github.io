import React from 'react';
import Header from './components/Header';
import Projects from './components/Projects';
import Research from './components/Research';
import Robotics from './components/Robotics';
import Footer from './components/Footer';
import './styles/App.css';

function App() {
    return (
        <div className="App">
            <Header />
            <Projects />
            <Research />
            <Robotics />
            <Footer />
        </div>
    );
}

export default App;
