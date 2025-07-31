

// // src/pages/Dashboard.js
// import { Link } from 'react-router-dom';
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';


// function Dashboard() {
//     const [blogs, setBlogs] = useState([]);
//     const token = localStorage.getItem('token');

//     useEffect(() => {
//         axios.get('http://localhost:5000/api/blogs/my', {
//             headers: { Authorization: `Bearer ${token}` }
//         })
//             .then(res => setBlogs(res.data))
//             .catch(err => console.error(err));
//     }, [token]);

//     const handleDelete = async (id) => {
//         try {
//             await axios.delete(`http://localhost:5000/api/blogs/${id}`, {
//                 headers: { Authorization: `Bearer ${token}` },
//             });
//             setBlogs(blogs.filter(blog => blog._id !== id));
//         } catch (err) {
//             console.error(err);
//             alert('Unauthorized to delete');
//         }
//     };

//     return (
//         <div>
//             <h1>Hello</h1>
//             <Link to="/edit-profile">
//                 <button >
//                     Edit Profile
//                 </button>
//             </Link>
//             <h2>Your Blogs</h2>
//             {blogs.map((blog) => (
//                 <div key={blog._id} style={{ border: '1px solid gray', marginBottom: '10px', padding: '10px' }}>
//                     <Link to={`/blog/${blog._id}`}>
//                         <h3>{blog.title}</h3>
//                     </Link>
//                     <p>{blog.content}</p>
//                     <button onClick={() => handleDelete(blog._id)}>Delete</button>
//                     <Link to={`/edit/${blog._id}`}>
//                         <button>Edit</button>
//                     </Link>
//                 </div>
//             ))}
//         </div>
//     );
// }

// export default Dashboard;


import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import '../assets/styles/ViewBlog.css'; // Import the CSS file
import axios from 'axios';

function Dashboard() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleteModal, setDeleteModal] = useState({ show: false, blogId: null, blogTitle: '' });
    const token = localStorage.getItem('token');

    useEffect(() => {
        axios.get('http://localhost:5000/api/blogs/my', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => {
                setBlogs(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [token]);

    const handleDeleteClick = (blog) => {
        setDeleteModal({
            show: true,
            blogId: blog._id,
            blogTitle: blog.title
        });
    };

    const handleDeleteConfirm = async () => {
        try {
            await axios.delete(`http://localhost:5000/api/blogs/${deleteModal.blogId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setBlogs(blogs.filter(blog => blog._id !== deleteModal.blogId));
            setDeleteModal({ show: false, blogId: null, blogTitle: '' });
        } catch (err) {
            console.error(err);
            alert('Unauthorized to delete');
        }
    };

    const handleDeleteCancel = () => {
        setDeleteModal({ show: false, blogId: null, blogTitle: '' });
    };

    // Helper functions
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const calculateReadTime = (content) => {
        const wordsPerMinute = 200;
        const wordCount = content.split(' ').length;
        const readTime = Math.ceil(wordCount / wordsPerMinute);
        return `${readTime} min read`;
    };

    if (loading) {
        return (
            <div className="dashboard-container">
                <div className="dashboard-content">
                    <div className="dashboard-header">
                        <div className="dashboard-welcome">
                            <div className="dashboard-welcome-content">
                                <h1 className="dashboard-title">Welcome Back!</h1>
                                <p className="dashboard-subtitle">Loading your creative space...</p>
                            </div>
                        </div>
                    </div>

                    <div className="dashboard-loading">
                        {[...Array(3)].map((_, index) => (
                            <div key={index} className="dashboard-blog-skeleton">
                                <div className="dashboard-skeleton-title"></div>
                                <div className="dashboard-skeleton-meta">
                                    <div className="dashboard-skeleton-tag"></div>
                                    <div className="dashboard-skeleton-tag"></div>
                                </div>
                                <div className="dashboard-skeleton-text"></div>
                                <div className="dashboard-skeleton-text"></div>
                                <div className="dashboard-skeleton-text"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="dashboard-container">
            <div className="dashboard-content">
                {/* Dashboard Header */}
                <div className="dashboard-header">
                    <div className="dashboard-welcome">
                        <div className="dashboard-welcome-content">
                            <h1 className="dashboard-title">Welcome Back!</h1>
                            <p className="dashboard-subtitle">
                                Ready to create something amazing? Manage your blogs and profile here.
                            </p>

                            <div className="dashboard-stats">
                                <div className="dashboard-stat">
                                    <span className="dashboard-stat-number">{blogs.length}</span>
                                    <span className="dashboard-stat-label">Blogs</span>
                                </div>
                                <div className="dashboard-stat">
                                    <span className="dashboard-stat-number">
                                        {blogs.reduce((total, blog) => total + blog.content.split(' ').length, 0)}
                                    </span>
                                    <span className="dashboard-stat-label">Words</span>
                                </div>
                                <div className="dashboard-stat">
                                    <span className="dashboard-stat-number">
                                        {blogs.reduce((total, blog) => {
                                            const readTime = Math.ceil(blog.content.split(' ').length / 200);
                                            return total + readTime;
                                        }, 0)}
                                    </span>
                                    <span className="dashboard-stat-label">Min Read</span>
                                </div>
                            </div>
                        </div>

                        <div className="dashboard-actions">
                            <Link to="/edit-profile" className="dashboard-profile-btn">
                                ⚙️ Edit Profile
                            </Link>
                            <Link to="/create" className="dashboard-create-btn">
                                ✨ New Blog
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Blogs Section */}
                <div className="dashboard-blogs">
                    <div className="dashboard-section-header">
                        <h2 className="dashboard-section-title">
                            Your Blogs
                            <span className="dashboard-section-count">{blogs.length}</span>
                        </h2>
                    </div>

                    {blogs.length > 0 ? (
                        <div className="dashboard-blogs-grid">
                            {blogs.map((blog) => (
                                <article key={blog._id} className="dashboard-blog-card">
                                    <div className="dashboard-blog-header">
                                        <h3 className="dashboard-blog-title">
                                            <Link
                                                to={`/blog/${blog._id}`}
                                                className="dashboard-blog-title-link"
                                            >
                                                {blog.title}
                                            </Link>
                                        </h3>

                                        <div className="dashboard-blog-meta">
                                            <span className="dashboard-blog-date">
                                                📅 {blog.createdAt ? formatDate(blog.createdAt) : 'Recently'}
                                            </span>
                                            <span className="dashboard-blog-status">
                                                ✅ Published
                                            </span>
                                        </div>
                                    </div>

                                    <p className="dashboard-blog-excerpt">{blog.content}</p>

                                    <div className="dashboard-blog-actions">
                                        <Link
                                            to={`/blog/${blog._id}`}
                                            className="dashboard-blog-action dashboard-blog-view"
                                        >
                                            👁️ View
                                        </Link>
                                        <Link
                                            to={`/edit/${blog._id}`}
                                            className="dashboard-blog-action dashboard-blog-edit"
                                        >
                                            ✏️ Edit
                                        </Link>
                                        <button
                                            onClick={() => handleDeleteClick(blog)}
                                            className="dashboard-blog-action dashboard-blog-delete"
                                        >
                                            🗑️ Delete
                                        </button>
                                    </div>
                                </article>
                            ))}
                        </div>
                    ) : (
                        <div className="dashboard-empty">
                            <div className="dashboard-empty-icon">📝</div>
                            <h3 className="dashboard-empty-title">No blogs yet</h3>
                            <p className="dashboard-empty-text">
                                Your creative journey starts here! Write your first blog post and share your thoughts with the world.
                            </p>
                            <Link to="/create" className="dashboard-empty-cta">
                                ✨ Write Your First Blog
                            </Link>
                        </div>
                    )}
                </div>

                {/* Delete Confirmation Modal */}
                {deleteModal.show && (
                    <div className="dashboard-modal-overlay">
                        <div className="dashboard-modal">
                            <h3 className="dashboard-modal-title">Delete Blog</h3>
                            <p className="dashboard-modal-text">
                                Are you sure you want to delete "{deleteModal.blogTitle}"? This action cannot be undone.
                            </p>
                            <div className="dashboard-modal-actions">
                                <button
                                    onClick={handleDeleteCancel}
                                    className="dashboard-modal-btn dashboard-modal-cancel"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleDeleteConfirm}
                                    className="dashboard-modal-btn dashboard-modal-confirm"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Dashboard;