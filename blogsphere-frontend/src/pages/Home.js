// // src/pages/Home.js
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';


// function Home() {
//     const [blogs, setBlogs] = useState([]);

//     useEffect(() => {
//         axios.get('http://localhost:5000/api/blogs')
//             .then(res => setBlogs(res.data))
//             .catch(err => console.error(err));
//     }, []);

//     return (
//         <div>
//             <h2>All Blogs</h2>
//             {blogs.map((blog) => (
//                 <div key={blog._id} style={{ border: '1px solid #ccc', marginBottom: '10px', padding: '10px' }}>
//                     <Link to={`/blog/${blog._id}`}>
//                         <h3>{blog.title}</h3>
//                     </Link>
//                     <p>{blog.content}</p>
//                     <p><em>By: {blog.author.username}</em></p>
//                 </div>
//             ))}
//         </div>
//     );
// }

// export default Home;

import React, { useEffect, useState } from 'react';
import '../assets/styles/Home.css'; // Import the CSS file
import axios from 'axios';
import { Link } from 'react-router-dom';

function Home() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:5000/api/blogs')
            .then(res => {
                setBlogs(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    // Helper function to get author initials
    const getAuthorInitials = (username) => {
        return username ? username.slice(0, 2).toUpperCase() : 'UN';
    };

    // Helper function to calculate read time
    const calculateReadTime = (content) => {
        const wordsPerMinute = 200;
        const wordCount = content.split(' ').length;
        const readTime = Math.ceil(wordCount / wordsPerMinute);
        return `${readTime} min read`;
    };

    // Helper function to format date
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    if (loading) {
        return (
            <div className="home-container">
                <div className="home-content">
                    <div className="home-hero">
                        <h1 className="home-title">BlogSphere</h1>
                        <p className="home-subtitle">Discover amazing stories and insights from our community</p>
                    </div>

                    <div className="home-loading">
                        {[...Array(6)].map((_, index) => (
                            <div key={index} className="home-blog-skeleton">
                                <div className="home-skeleton-title"></div>
                                <div className="home-skeleton-text"></div>
                                <div className="home-skeleton-text"></div>
                                <div className="home-skeleton-text"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="home-container">
            <div className="home-content">
                {/* Hero Section */}
                <div className="home-hero">
                    <h1 className="home-title">BlogSphere</h1>
                    <p className="home-subtitle">
                        Discover amazing stories, insights, and perspectives from our vibrant community of writers
                    </p>
                    <div className="home-stats">
                        <div className="home-stat">
                            <span className="home-stat-number">{blogs.length}</span>
                            <span className="home-stat-label">Articles</span>
                        </div>
                        <div className="home-stat">
                            <span className="home-stat-number">{new Set(blogs.map(blog => blog.author?.username)).size}</span>
                            <span className="home-stat-label">Writers</span>
                        </div>
                        <div className="home-stat">
                            <span className="home-stat-number">∞</span>
                            <span className="home-stat-label">Ideas</span>
                        </div>
                    </div>
                </div>

                {/* Section Header */}
                <div className="home-section-header">
                    <div>
                        <h2 className="home-section-title">Latest Articles</h2>
                        <p className="home-section-subtitle">Fresh perspectives and stories from our community</p>
                    </div>
                </div>

                {/* Blog Grid */}
                {blogs.length > 0 ? (
                    <div className="home-blogs-grid">
                        {blogs.map((blog, index) => (
                            <article
                                key={blog._id}
                                className={`home-blog-card ${index === 0 ? 'featured' : ''}`}
                            >
                                <div className="home-blog-content">
                                    <div className="home-blog-header">
                                        <h3 className="home-blog-title">
                                            <Link
                                                to={`/blog/${blog._id}`}
                                                className="home-blog-title-link"
                                            >
                                                {blog.title}
                                            </Link>
                                        </h3>
                                    </div>

                                    <p className="home-blog-excerpt">{blog.content}</p>

                                    <div className="home-blog-meta">
                                        <div className="home-blog-author">
                                            <div className="home-blog-avatar">
                                                {getAuthorInitials(blog.author?.username)}
                                            </div>
                                            <div className="home-blog-author-info">
                                                <p className="home-blog-author-name">
                                                    {blog.author?.username || 'Anonymous'}
                                                </p>
                                                <p className="home-blog-date">
                                                    {blog.createdAt ? formatDate(blog.createdAt) : 'Recently'}
                                                </p>
                                            </div>
                                        </div>
                                        <span className="home-blog-read-time">
                                            {calculateReadTime(blog.content)}
                                        </span>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                ) : (
                    <div className="home-empty">
                        <div className="home-empty-icon">📝</div>
                        <h3 className="home-empty-title">No blogs yet</h3>
                        <p className="home-empty-text">
                            Be the first to share your story with the BlogSphere community!
                        </p>
                        <Link to="/create" className="home-empty-cta">
                            ✨ Write Your First Blog
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Home;
