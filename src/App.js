import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Missing from './components/Missing';
import { missing, pageAt } from './pages';
import './styles/App.css';

function App() {
    const location = useLocation();
    const page = pageAt(location.pathname);
    const main = useRef(null);
    const [shown, setShown] = useState(location.key);
    const [moved, setMoved] = useState(false);

    if (location.key !== shown) {
        setShown(location.key);
        setMoved(true);
    }

    useLayoutEffect(() => {
        if (!moved) return;
        window.scrollTo(0, 0);
        main.current.focus({ preventScroll: true });
    }, [location.key, moved]);

    const title = page ? page.title : missing.title;
    useEffect(() => {
        document.title = title;
    }, [title]);

    const Content = page ? page.Content : Missing;
    const classes = ['page'];
    if (!page || page.path === '/') classes.push('page-center');

    return (
        <div className="App">
            <Nav current={page} />
            <main key={page ? page.path : 'missing'} ref={main} className={classes.join(' ')} tabIndex={-1}>
                <Content />
            </main>
            {page && <Footer links={page.path !== '/'} />}
        </div>
    );
}

export default App;
