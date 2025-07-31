// // src/pages/AuthorProfile.js
// import React, { useEffect, useState } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import axios from 'axios';

// function AuthorProfile() {
//     const { id } = useParams();
//     const [author, setAuthor] = useState(null);
//     const [blogs, setBlogs] = useState([]);

//     useEffect(() => {
//         const fetchAuthorAndBlogs = async () => {
//             try {
//                 // Fetch all blogs
//                 const res = await axios.get('http://localhost:5000/api/blogs');
//                 const allBlogs = res.data;

//                 // Filter blogs by author ID
//                 const userBlogs = allBlogs.filter(blog => blog.author._id === id);

//                 // Set author info from one of the blogs
//                 if (userBlogs.length > 0) {
//                     setAuthor(userBlogs[0].author);
//                 }

//                 setBlogs(userBlogs);
//             } catch (err) {
//                 console.error('Error fetching author data:', err);
//             }
//         };

//         fetchAuthorAndBlogs();
//     }, [id]);

//     if (!author) return <div>Loading...</div>;

//     return (
//         <div>
//             <img
//                 src={`http://localhost:5000${encodeURI(author.profilePic)}`}
//                 alt={`${author.username}'s profile`}
//                 style={{ width: '150px', height: '150px', borderRadius: '50%' }}
//             />
//             <h2>{author.username}</h2>
//             <p>Email: {author.email}
//             </p>
//             <h3>Blogs by {author.username}:</h3>
//             {blogs.length === 0 ? (
//                 <p>No blogs by this author yet.</p>
//             ) : (
//                 blogs.map(blog => (
//                     <div key={blog._id}>
//                         <Link to={`/blog/${blog._id}`}>
//                             <h4>{blog.title}</h4>
//                         </Link>
//                         <p>{blog.content.substring(0, 100)}...</p>
//                     </div>
//                 ))
//             )}
//         </div>
//     );
// }

// export default AuthorProfile;

// src/pages/AuthorProfile.js
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import '../assets/styles/AuthorProfile.css';

function AuthorProfile() {
    const { id } = useParams();
    const [author, setAuthor] = useState(null);
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAuthorAndBlogs = async () => {
            try {
                setLoading(true);
                // Fetch all blogs
                const res = await axios.get('http://localhost:5000/api/blogs');
                const allBlogs = res.data;

                // Filter blogs by author ID
                const userBlogs = allBlogs.filter(blog => blog.author._id === id);

                // Set author info from one of the blogs
                if (userBlogs.length > 0) {
                    setAuthor(userBlogs[0].author);
                } else {
                    // If no blogs found, you might want to fetch author info separately
                    // For now, we'll show an error
                    setError('Author not found or has no blogs yet.');
                }

                setBlogs(userBlogs);
            } catch (err) {
                console.error('Error fetching author data:', err);
                setError('Failed to load author information. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchAuthorAndBlogs();
    }, [id]);

    // Helper function to format date
    const formatDate = (dateString) => {
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    // Helper function to calculate reading time
    const calculateReadTime = (content) => {
        const wordsPerMinute = 200;
        const wordCount = content.split(' ').length;
        const readTime = Math.ceil(wordCount / wordsPerMinute);
        return readTime;
    };

    // Helper function to get author initials for avatar fallback
    const getInitials = (name) => {
        return name
            .split(' ')
            .map(word => word.charAt(0))
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    // Loading state
    if (loading) {
        return (
            <div className="author-profile-container">
                <div className="author-profile-content">
                    <div className="author-profile-loading">
                        <div className="author-profile-loading-spinner"></div>
                        <p className="author-profile-loading-text">Loading author profile...</p>
                    </div>
                </div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="author-profile-container">
                <div className="author-profile-content">
                    <div className="author-blogs-empty">
                        <div className="author-blogs-empty-icon">⚠️</div>
                        <h2 className="author-blogs-empty-title">Unable to Load Profile</h2>
                        <p className="author-blogs-empty-text">{error}</p>
                    </div>
                </div>
            </div>
        );
    }

    // No author found
    if (!author) {
        return (
            <div className="author-profile-container">
                <div className="author-profile-content">
                    <div className="author-blogs-empty">
                        <div className="author-blogs-empty-icon">👤</div>
                        <h2 className="author-blogs-empty-title">Author Not Found</h2>
                        <p className="author-blogs-empty-text">The author you're looking for doesn't exist.</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="author-profile-container">
            <div className="author-profile-content">
                {/* Author Header Section */}
                <div className="author-profile-header">
                    <div className="author-profile-info">
                        {/* Profile Picture */}
                        {author.profilePic ? (
                            <img
                                src={`http://localhost:5000${encodeURI(author.profilePic)}`}
                                alt={`${author.username}'s profile`}
                                className="author-profile-pic"
                                onError={(e) => {
                                    // Fallback to initials if image fails to load
                                    e.target.style.display = 'none';
                                    e.target.nextSibling.style.display = 'flex';
                                }}
                            />
                        ) : null}

                        {/* Fallback avatar with initials */}
                        <div
                            className="author-profile-pic"
                            style={{
                                display: author.profilePic ? 'none' : 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                background: 'linear-gradient(135deg, var(--primary-orange), var(--primary-red-orange))',
                                color: 'white',
                                fontSize: '2.5rem',
                                fontWeight: '800'
                            }}
                        >
                            {getInitials(author.username)}
                        </div>

                        {/* Author Details */}
                        <div className="author-profile-details">
                            <h1 className="author-profile-name">{author.username}</h1>
                            <p className="author-profile-email">{author.email}</p>

                            {/* Author Stats */}
                            <div className="author-profile-stats">
                                <div className="author-stat">
                                    <span className="author-stat-number">{blogs.length}</span>
                                    <span className="author-stat-label">
                                        {blogs.length === 1 ? 'Blog' : 'Blogs'}
                                    </span>
                                </div>
                                <div className="author-stat">
                                    <span className="author-stat-number">
                                        {blogs.reduce((total, blog) => total + blog.content.split(' ').length, 0)}
                                    </span>
                                    <span className="author-stat-label">Words</span>
                                </div>
                                <div className="author-stat">
                                    <span className="author-stat-number">
                                        {blogs.reduce((total, blog) => total + calculateReadTime(blog.content), 0)}
                                    </span>
                                    <span className="author-stat-label">Min Read</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Blogs Section */}
                <div className="author-blogs-section">
                    <div className="author-blogs-header">
                        <div>
                            <h2 className="author-blogs-title">
                                Blogs by {author.username}
                            </h2>
                            <p className="author-blogs-subtitle">
                                {blogs.length === 0
                                    ? 'No blogs published yet'
                                    : `${blogs.length} ${blogs.length === 1 ? 'blog' : 'blogs'} published`
                                }
                            </p>
                        </div>
                    </div>

                    {/* Blogs Grid or Empty State */}
                    {blogs.length === 0 ? (
                        <div className="author-blogs-empty">
                            <div className="author-blogs-empty-icon">📝</div>
                            <h3 className="author-blogs-empty-title">
                                No Blogs Yet
                            </h3>
                            <p className="author-blogs-empty-text">
                                {author.username} hasn't published any blogs yet. Check back later!
                            </p>
                        </div>
                    ) : (
                        <div className="author-blogs-grid">
                            {blogs.map((blog, index) => (
                                <article key={blog._id} className="author-blog-card">
                                    <div className="author-blog-content">
                                        <div className="author-blog-header">
                                            <h3 className="author-blog-title">
                                                <Link
                                                    to={`/blog/${blog._id}`}
                                                    className="author-blog-title-link"
                                                >
                                                    {blog.title}
                                                </Link>
                                            </h3>
                                        </div>

                                        <p className="author-blog-excerpt">
                                            {blog.content.length > 150
                                                ? `${blog.content.substring(0, 150)}...`
                                                : blog.content
                                            }
                                        </p>

                                        <div className="author-blog-meta">
                                            <span className="author-blog-date">
                                                {formatDate(blog.createdAt)}
                                            </span>
                                            <Link
                                                to={`/blog/${blog._id}`}
                                                className="author-blog-read-more"
                                            >
                                                Read More
                                            </Link>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AuthorProfile;
