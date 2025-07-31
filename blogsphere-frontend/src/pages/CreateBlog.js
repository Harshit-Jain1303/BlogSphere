// // src/pages/CreateBlog.js
// import React, { useState } from 'react';
// import axios from 'axios';

// function CreateBlog() {
//     const [title, setTitle] = useState('');
//     const [content, setContent] = useState('');

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const token = localStorage.getItem('token');

//         try {
//             await axios.post(
//                 'http://localhost:5000/api/blogs',
//                 { title, content },
//                 {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 }
//             );

//             alert('Blog created!');
//             setTitle('');
//             setContent('');
//         } catch (err) {
//             console.error(err);
//             alert('Failed to create blog');
//         }
//     };

//     return (
//         <div>
//             <h2>Create Blog</h2>
//             <form onSubmit={handleSubmit}>
//                 <input
//                     type="text"
//                     placeholder="Blog Title"
//                     value={title}
//                     onChange={(e) => setTitle(e.target.value)}
//                     required
//                 />
//                 <br />
//                 <textarea
//                     placeholder="Blog Content"
//                     value={content}
//                     onChange={(e) => setContent(e.target.value)}
//                     required
//                 ></textarea>
//                 <br />
//                 <button type="submit">Create</button>
//             </form>
//         </div>
//     );
// }

// export default CreateBlog;

// src/pages/CreateBlog.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../assets/styles/CreateBlog.css';

function CreateBlog() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [wordCount, setWordCount] = useState(0);
    const [readTime, setReadTime] = useState(0);

    const navigate = useNavigate();

    // Calculate word count and reading time
    useEffect(() => {
        const words = content.trim().split(/\s+/).filter(word => word.length > 0);
        const count = content.trim() === '' ? 0 : words.length;
        setWordCount(count);

        // Estimate reading time (average 200 words per minute)
        const minutes = Math.ceil(count / 200);
        setReadTime(minutes);
    }, [content]);

    // Clear messages after timeout
    useEffect(() => {
        if (successMessage) {
            const timer = setTimeout(() => {
                setSuccessMessage('');
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [successMessage]);

    useEffect(() => {
        if (errorMessage) {
            const timer = setTimeout(() => {
                setErrorMessage('');
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [errorMessage]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        if (!title.trim()) {
            setErrorMessage('Please enter a blog title.');
            return;
        }

        if (!content.trim()) {
            setErrorMessage('Please enter blog content.');
            return;
        }

        if (title.trim().length < 5) {
            setErrorMessage('Blog title must be at least 5 characters long.');
            return;
        }

        if (content.trim().length < 50) {
            setErrorMessage('Blog content must be at least 50 characters long.');
            return;
        }

        const token = localStorage.getItem('token');

        if (!token) {
            setErrorMessage('You must be logged in to create a blog.');
            navigate('/login');
            return;
        }

        setLoading(true);
        setErrorMessage('');
        setSuccessMessage('');

        try {
            const response = await axios.post(
                'http://localhost:5000/api/blogs',
                {
                    title: title.trim(),
                    content: content.trim()
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            setSuccessMessage('🎉 Blog created successfully!');
            setTitle('');
            setContent('');

            // Navigate to the created blog after a short delay
            setTimeout(() => {
                navigate(`/blog/${response.data._id}`);
            }, 2000);

        } catch (err) {
            console.error('Error creating blog:', err);

            if (err.response?.status === 401) {
                setErrorMessage('Your session has expired. Please log in again.');
                localStorage.removeItem('token');
                navigate('/login');
            } else if (err.response?.status === 400) {
                setErrorMessage('Invalid blog data. Please check your input.');
            } else if (err.response?.status === 500) {
                setErrorMessage('Server error. Please try again later.');
            } else {
                setErrorMessage('Failed to create blog. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    const handlePreview = () => {
        if (!title.trim() && !content.trim()) {
            setErrorMessage('Please enter a title and content to preview.');
            return;
        }

        // You can implement a preview modal or navigate to a preview page
        console.log('Preview functionality - to be implemented');
        setErrorMessage('Preview feature coming soon!');
    };

    const handleSaveDraft = () => {
        // Save to localStorage as draft
        const draft = {
            title: title.trim(),
            content: content.trim(),
            timestamp: new Date().toISOString()
        };

        localStorage.setItem('blogDraft', JSON.stringify(draft));
        setSuccessMessage('💾 Draft saved locally!');
    };

    const handleLoadDraft = () => {
        const draft = localStorage.getItem('blogDraft');
        if (draft) {
            const { title: draftTitle, content: draftContent } = JSON.parse(draft);
            setTitle(draftTitle || '');
            setContent(draftContent || '');
            setSuccessMessage('📝 Draft loaded!');
        } else {
            setErrorMessage('No draft found.');
        }
    };

    const handleClear = () => {
        if (title.trim() || content.trim()) {
            const confirmClear = window.confirm('Are you sure you want to clear all content? This action cannot be undone.');
            if (confirmClear) {
                setTitle('');
                setContent('');
                setSuccessMessage('Content cleared.');
            }
        }
    };

    return (
        <div className="create-blog-container">
            <div className="create-blog-content">
                {/* Header */}
                <div className="create-blog-header">
                    <h1 className="create-blog-title">Create New Blog</h1>
                    <p className="create-blog-subtitle">
                        Share your thoughts and ideas with the BlogSphere community
                    </p>
                </div>

                {/* Form Wrapper */}
                <div className="create-blog-form-wrapper">
                    {/* Success Message */}
                    {successMessage && (
                        <div className="create-blog-success">
                            <span className="create-blog-success-icon">✅</span>
                            <span>{successMessage}</span>
                        </div>
                    )}

                    {/* Error Message */}
                    {errorMessage && (
                        <div className="create-blog-error">
                            <span className="create-blog-error-icon">⚠️</span>
                            <span>{errorMessage}</span>
                        </div>
                    )}

                    {/* Form */}
                    <form className="create-blog-form" onSubmit={handleSubmit}>
                        {/* Title Input */}
                        <div className="create-blog-form-group">
                            <label htmlFor="title" className="create-blog-label">
                                Blog Title
                            </label>
                            <input
                                id="title"
                                type="text"
                                className="create-blog-input"
                                placeholder="Enter an engaging title for your blog..."
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                maxLength={100}
                                disabled={loading}
                                required
                            />
                            <div className="create-blog-counter">
                                <span>{title.length}/100 characters</span>
                            </div>
                        </div>

                        {/* Content Textarea */}
                        <div className="create-blog-form-group">
                            <label htmlFor="content" className="create-blog-label">
                                Blog Content
                            </label>
                            <textarea
                                id="content"
                                className="create-blog-input create-blog-textarea"
                                placeholder="Write your blog content here... Share your thoughts, experiences, and insights with the community."
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                disabled={loading}
                                required
                            ></textarea>
                            <div className="create-blog-counter">
                                <div className="create-blog-word-count">
                                    {wordCount} words
                                </div>
                                <div className="create-blog-read-time">
                                    ~{readTime} min read
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="create-blog-actions">
                            {/* Draft Actions */}
                            <button
                                type="button"
                                className="create-blog-draft"
                                onClick={handleLoadDraft}
                                disabled={loading}
                            >
                                Load Draft
                            </button>

                            <button
                                type="button"
                                className="create-blog-draft"
                                onClick={handleSaveDraft}
                                disabled={loading || (!title.trim() && !content.trim())}
                            >
                                Save Draft
                            </button>

                            <button
                                type="button"
                                className="create-blog-draft"
                                onClick={handleClear}
                                disabled={loading || (!title.trim() && !content.trim())}
                            >
                                Clear
                            </button>

                            {/* Preview Button */}
                            <button
                                type="button"
                                className="create-blog-preview"
                                onClick={handlePreview}
                                disabled={loading}
                            >
                                Preview
                            </button>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="create-blog-submit"
                                disabled={loading || !title.trim() || !content.trim()}
                            >
                                {loading ? (
                                    <span className="create-blog-loading">
                                        <span className="create-blog-spinner"></span>
                                        Creating...
                                    </span>
                                ) : (
                                    'Publish Blog'
                                )}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Writing Tips */}
                <div className="create-blog-tips">
                    <h3 className="create-blog-tips-title">Writing Tips</h3>
                    <ul className="create-blog-tips-list">
                        <li className="create-blog-tips-item">
                            Keep your title clear and engaging - it's the first thing readers see
                        </li>
                        <li className="create-blog-tips-item">
                            Structure your content with clear paragraphs and logical flow
                        </li>
                        <li className="create-blog-tips-item">
                            Use personal examples and stories to connect with your audience
                        </li>
                        <li className="create-blog-tips-item">
                            Proofread your content before publishing for the best experience
                        </li>
                        <li className="create-blog-tips-item">
                            Save drafts regularly to avoid losing your work
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default CreateBlog;
