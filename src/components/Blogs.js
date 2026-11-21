import React from 'react';
import blogs from '../data/blogs.json';
import '../styles/Blogs.css';

// Blogs: one line per post, its title and when it was published. The title
// opens the post. The list is built from the Markdown files in blog/ by
// scripts/build-blog.js, newest first.
const Blogs = () => (
    <section className="blogs" id="blogs">
        <div className="container">
            <h2 className="section-title">Blogs<span className="title-period">.</span></h2>
            <ul className="blog-list">
                {blogs.map((post) => (
                    <li className="blog" key={post.name}>
                        <h3 className="blog-title">
                            <a href={post.url}>{post.title}</a>
                        </h3>
                        <p className="blog-date">{post.published}</p>
                    </li>
                ))}
            </ul>
        </div>
    </section>
);

export default Blogs;
