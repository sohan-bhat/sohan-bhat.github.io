import React from 'react';
import Toolbar from '../components/Toolbar';
import Footer from '../components/Footer';
import writeUps from '../data/write-ups.json';
import '../styles/Cards.css';
import '../styles/Pages.css';

// The Write-ups page: every write-up, newest first, with its title, when it
// was published and its opening paragraph. The title opens it. The list is
// built from the Markdown files in write-ups/ by scripts/build-write-ups.js.
const WriteUpsPage = () => (
    <>
        <Toolbar current="write-ups" />
        <main className="page">
            <div className="container">
                <h1 className="section-title">Write-ups<span className="title-period">.</span></h1>
                <ul className="posts">
                    {writeUps.map((post) => (
                        <li className="post" key={post.name}>
                            <h2 className="show-title">
                                <a href={post.url}>{post.title}</a>
                            </h2>
                            <p className="show-facts">
                                <span>{post.published}</span>
                            </p>
                            <p className="show-line">{post.opening}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </main>
        <Footer />
    </>
);

export default WriteUpsPage;
