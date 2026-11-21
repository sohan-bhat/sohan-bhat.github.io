import React from 'react';
import Toolbar from './components/Toolbar';
import Header from './components/Header';
import Projects from './components/Projects';
import Blogs from './components/Blogs';
import Robotics from './components/Robotics';
import Footer from './components/Footer';
import './styles/App.css';

function App() {
    return (
        <div className="App">
            <Toolbar />
            <Header />
            <Projects />
            <Blogs />
            <Robotics />
            <Footer />
        </div>
    );
}

export default App;
