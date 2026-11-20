import React from 'react';
import Header from './components/Header';
import Work from './components/Work';
import Certificates from './components/Certificates';
import Robotics from './components/Robotics';
import Footer from './components/Footer';
import './styles/App.css';

function App() {
    return (
        <div className="App">
            <Header />
            <Work />
            <Certificates />
            <Robotics />
            <Footer />
        </div>
    );
}

export default App;
